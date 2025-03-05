import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";  // 取得動態路由參數
import { Modal, Button, Form, Card, Alert } from "react-bootstrap";
import { addActivitys, updatedActivitys, getActivitys, uploadImageToCloudinary } from '@/frontend/utils/api';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './ActivityDetilPage.scss';


const EventDetail = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');
  
    const { id } = useParams();
    const [initData ,setInitData] = useState({});

    const [previewCoverImages, setPreviewCoverImages] = useState([]);
    const [mainCoverImageFile, setMainCoverImageFile] = useState(null);
    const [previewSectionImages, setPreviewSectionImages] = useState([]);
    const [sectionImageFile, setSectionImageFile] = useState(null);

    const [activityData, setActivityData] = useState({  
      images: [],
      trip: { title: "", highlights: [] },
      map: { latitude: 0, longitude: 0, mapLink: "https://maps.google.com" },
      sections: []
    });



    useEffect(() => {
      const fetchData = async () => {
        try {
        const data = await getActivitys(id);
        setInitData(data);
        // 取第一筆 activityDetails（如果有資料）
        const firstActivity = data.activityDetails?.[0] || {
          images: [],
          trip: { title: "", highlights: [] },
          map: { latitude: 0, longitude: 0, mapLink: "" },
          sections: []
        };
  
      // 更新資料時保持原有資料不被清空
      setActivityData(prevState => ({
        ...prevState, // 保留之前的資料
        images: firstActivity.images.length ? firstActivity.images : prevState.images,
        trip: {
          title: firstActivity.trip.title || prevState.trip.title,
          highlights: firstActivity.trip.highlights.length ? firstActivity.trip.highlights : prevState.trip.highlights
        },
        map: {
          latitude: firstActivity.map.latitude || prevState.map.latitude,
          longitude: firstActivity.map.longitude || prevState.map.longitude,
          mapLink: firstActivity.map.mapLink || prevState.map.mapLink
        },
        sections: firstActivity.sections.length ? firstActivity.sections : prevState.sections
      }));
        } catch (err) {
        console.log("獲取資料錯誤:", err);
        } 
    };
    fetchData();
    }, [id]);

// 用於初始化預覽圖片
useEffect(() => {
 
}, [activityData]); // 監聽 activityData 變化
    

    // 新增圖片
    const addImage = () => {
      if (activityData.images.length >= 5) {
        alert("最多只能上傳 5 張圖片");
        return;
      }

      setActivityData((prevData) => ({
        ...prevData, // 保持其他資料
        images: [...prevData.images, null], // 新增一個空的圖片欄位
      }));
    
      setPreviewCoverImages((prev) => [...prev, ""]); // 確保新增預覽圖片的陣列
    };
  
    // 更新封面圖片
    const updateImage = (index, event) => {
      const file = event?.target?.files[0];
      if (!file) return;
    
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCoverImages((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[index] = reader.result || ""; // ✅ 確保不是 undefined
          return updatedPreviews;
        });

       
    
        setActivityData((prevState) => {
          const updatedImages = [...prevState.images];
          updatedImages[index] = file; // 🚀 暫存 File，不馬上上傳
          return { ...prevState, images: updatedImages };
        });
      };
      reader.readAsDataURL(file);
    };

    // 更新活動圖片
    const updateSectionImage = (index, event) => {
      const file = event?.target?.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSectionImages((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result; // ✅ 預覽圖片

          return newPreviews;
        });

        setActivityData((prev) => {
          const updatedSections = [...prev.sections];
          updatedSections[index] = { ...updatedSections[index], image: file }; // ✅ 存 File
          return { ...prev, sections: updatedSections };
        });

        
      };
      reader.readAsDataURL(file);
    };

    // 上傳圖片
    const handleUploadImage = async(file, index = null) => {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        if (!imageUrl) {
          console.error("圖片上傳失敗，無法取得圖片網址");
          return null;
        }
        return imageUrl;
      } catch (error) {
        console.error("上傳圖片失敗", error);
        return null;
      }
    }
  
    // 新增活動介紹
    const addSection = () => {
      setActivityData((prev) => ({
        ...prev,
        sections: [
          ...(prev.sections || []), // 確保 sections 是陣列
          { image: "", imageCaption: "", description: "" }
        ]
      }));
    };

    // 新增行程特色
    const addTripHighlight = () => {
      setActivityData((prev) => ({
        ...prev,
        trip: {
          ...prev.trip,
          highlights: [...(prev.trip.highlights || []), ""] // 確保 highlights 是陣列
        }
      }));
    };
    
    // 移除行程特色
    const removeTripHighlight = (index) => {
      setActivityData((prev) => ({
        ...prev,
        trip: { ...prev?.trip, highlights: prev?.trip?.highlights.filter((_, i) => i !== index) }
      }));
    };
    
    // 更新活動介紹
    const updateSection = (index, field, value) => {
      const newSections = [...activityData.sections];
      newSections[index][field] = value;
      setActivityData((prev) => ({ ...prev, sections: newSections }));
    };
  
    // 移除活動介紹
    const removeSection = (index) => {
      const newSections = activityData.sections.filter((_, i) => i !== index);
      setActivityData((prev) => ({ ...prev, sections: newSections }));
    };
  
    // 儲存變更
    const handleSave = async() => {

      let submitData = {
        ...activityData, // 包含所有資料
        trip: { title: activityData.trip?.title, highlights: activityData.trip?.highlights },
        map: { latitude: activityData.map?.latitude, longitude: activityData.map?.longitude, mapLink: activityData.map?.mapLink },
        images: [...activityData.images], // 複製 images 陣列
        sections: [...activityData.sections] // 複製 sections
      }

      // 🔄 **上傳 `images[]`**
      for (let i = 0; i < submitData.images.length; i++) {
        if (submitData.images[i] instanceof File) {
          const uploadedImageUrl = await handleUploadImage(submitData.images[i]);
          if (uploadedImageUrl) {
            submitData.images[i].url = uploadedImageUrl; // ✅ 替換 `File` → `URL`
          }
        }
      }

      // 🔄 **上傳 `sections[].image`**
      for (let i = 0; i < submitData.sections.length; i++) {
        if (submitData.sections[i].image instanceof File) {
          const uploadedImageUrl = await handleUploadImage(submitData.sections[i].image);
          if (uploadedImageUrl) {
            submitData.sections[i].image = uploadedImageUrl; // ✅ 替換 `File` → `URL`
          }
        }
      }

    
      // **更新 activityData 狀態**
      setActivityData(submitData);



      if(initData.activityDetails){
        await updatedActivitys(id, {
          activityDetails: [submitData]
        });
        Swal.fire({ title: "編輯成功", icon: "success" });
        
      } else {
        await addActivitys({
          activityDetails: [submitData]
        });
        Swal.fire({ title: "新增成功", icon: "success" });
      }

    };

    // 返回
    const handleClose = () => {
      navigate("/admin/activity-list");
      window.scrollTo({ top: 0, behavior: "smooth" }); // 滑動到最上方
    };

    // 更新表單內容
    const handleChange = (e) => {
      const { name, value } = e.target;
      setActivityData((prev) => ({
        ...prev,
        trip: {
          ...prev.trip, // 保持 trip 的原有結構
          [name]: value, // 更新 trip 內對應的屬性
        },
      }));
    };

    // 更新地圖連結
    const handleMapChange = (e) => {
      const { name, value } = e.target; // 取得 input 的 name 和 value
      setActivityData((prev) => ({
        ...prev,
        map: {
          ...(prev.map || { latitude: 0, longitude: 0, mapLink: "https://maps.google.com" }), // 確保 map 存在
          [name]: value, // 動態更新 latitude 或 longitude
        },
      }));
    };
    

    // 更新 行程特色
    const handleTripChange = (e, index) => {
      const { value } = e.target;
      setActivityData((prev) => {
        const newHighlights = [...(prev.trip?.highlights || [])]; // 避免 prev.trip 為 undefined
        newHighlights[index] = value; // 只更新對應索引的值
      
        return {
          ...prev,
          trip: { 
            ...prev.trip, 
            highlights: newHighlights 
          },
        };
      });
    };


    

  {error && <Alert variant="danger">{error}</Alert>}
  return (
      <Card className="p-4 shadow-lg activity-detail-page">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>編輯行程</Card.Title>
          <Button variant="close" onClick={handleClose}></Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleSave)}>

            {/* 行程標題 */}
            <Form.Group className="mb-4 trip-title">
              <Form.Label>行程標題</Form.Label>
              <Form.Control
                type="text"
                name="title"  // `name` 對應到 `trip.title`
                value={activityData.trip?.title}
                onChange={handleChange} // 使用修正後的 `handleChange`
              />
            </Form.Group>

            {/* 行程特色 */}
            <Form.Group className="mb-4 trip-highlights">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label>行程特色</Form.Label>
                <Button variant="secondary" onClick={addTripHighlight}>新增行程特色</Button>
              </div>
              <ul>
                {activityData.trip?.highlights.map((highlight, index) => (
                  <li key={index} className="d-flex">
                    <Form.Control
                      name={`highlight-${index}`}
                      value={highlight}
                      onChange={(e) => handleTripChange(e, index)}
                    />
                    <Button variant="danger" onClick={() => removeTripHighlight(index)}>刪除</Button>
                  </li>
                ))}
              </ul>
            </Form.Group>

            {/* 圖片管理 */}
            <Form.Group className="mb-4 trip-images">
              <div className="d-flex justify-content-between">
                <Form.Label>封面圖片</Form.Label>
                {activityData.images?.length < 5 && ( // 限制最多 5 張圖片
                <Button 
                  variant="secondary" 
                  onClick={addImage} 
                >
                  新增圖片
                </Button>
                )}
              </div>

              <div className="d-flex justify-content-start flex-wrap">
                {activityData.images?.map((img, index) => (
                  <div key={index} className="position-relative mb-2 me-2 d-flex flex-column align-items-center">
                      {/* 圖片預覽區域 */}
                      <div 
                        className="img-thumbnail position-relative"
                        style={{
                          width: "200px",
                          height: "200px",
                          overflow: "hidden",
                          cursor: "pointer"
                        }}
                        onClick={() => document.getElementById(`file-input-${index}`).click()} // 點擊圖片觸發 file input
                      >
                        {/* 圖片預覽 */}
                        {previewCoverImages[index] && (
                           <img
                           src={previewCoverImages[index]}
                           alt={`圖片 ${index + 1}`}
                           className="img-thumbnail"
                         />
                        )}
                        {/* 隱藏的 file input */}
                        <input
                          id={`file-input-${index}`}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }} // 隱藏 file input 元素
                          onChange={(e) => updateImage(index, e)}
                        />
                      </div>
                    </div>
                  ))}
              </div>

            </Form.Group>

            {/* 地圖連結 */}
            <Form.Group className="mb-4 trip-map">
              <Form.Label>地圖座標</Form.Label>

              <div className="d-flex gap-3">
                {/* 緯度 Latitude */}
                <div className="flex-grow-1">
                  <Form.Label className="small text-muted">緯度 (Latitude)</Form.Label>
                  <Form.Control
                    type="text"
                    name="latitude"
                    value={activityData.map?.latitude || ""}
                    onChange={handleMapChange}
                    placeholder="輸入緯度，如 24.1947"
                  />
                </div>

                {/* 經度 Longitude */}
                <div className="flex-grow-1">
                  <Form.Label className="small text-muted">經度 (Longitude)</Form.Label>
                  <Form.Control
                    type="text"
                    name="longitude"
                    value={activityData.map?.longitude || ""}
                    onChange={handleMapChange}
                    placeholder="輸入經度，如 120.6354"
                  />
                </div>
              </div>

              <Form.Text className="text-muted">
                輸入地圖座標，格式：緯度 (Latitude) / 經度 (Longitude)
              </Form.Text>
            </Form.Group>

            {/* 活動介紹 */}
            <Form.Group className="mb-4 trip-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label>活動介紹</Form.Label>
                <Button variant="secondary" onClick={addSection}>新增活動介紹</Button>
              </div>
              {activityData.sections?.map((section, index) => (
                <Card key={index} className=" shadow-sm p-3 mb-3 bg-body rounded">
                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                      {/* 圖片上傳 Input */}
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateSectionImage(index, e)}
                      />
                    </div>

                  {/* 預覽區域 */}
                    {previewSectionImages.length > 0 && (
                      <div className="mt-3">
                        <img
                          src={previewSectionImages[0]}
                          alt="預覽圖片"
                          className="img-thumbnail"
                          style={{ maxWidth: "300px", maxHeight: "200px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </Form.Group>

                  <Form.Control
                    type="text"
                    className="mb-2"
                    placeholder="圖片描述"
                    value={section.imageCaption}
                    onChange={(e) => updateSection(index, "imageCaption", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="活動內容"
                    value={section.description}
                    onChange={(e) => updateSection(index, "description", e.target.value)}
                  />
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => removeSection(index)}
                  >
                    刪除區塊
                  </Button>
                </Card>
              ))}
            </Form.Group>

          </Form>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>取消</Button>
          <Button variant="primary" onClick={handleSave}>儲存變更</Button>
        </Card.Footer>
      </Card>
  );
};

export default EventDetail;


