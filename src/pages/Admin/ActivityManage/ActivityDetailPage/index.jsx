import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";  // 取得動態路由參數
import { Modal, Button, Form, Card, Alert } from "react-bootstrap";
import { addActivitys, updatedActivitys, getActivitys, uploadImageToCloudinary } from '@/utils/api';
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

    const [activityData, setActivityData] = useState({
      images: [],
      trip: { title: "", highlights: [] },
      map: { latitude: 0, longitude: 0, mapLink: "" },
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
        ...firstActivity // 只更新需要的資料
      }));
        } catch (err) {
        console.log("獲取資料錯誤:", err);
        } 
    };
    fetchData();
    }, [id]);

    // 新增圖片
    const addImage = () => {
      if (activityData.images.length >= 5) {
        alert("最多只能上傳 5 張圖片");
        return;
      }

      setActivityData((prev) => ({
        ...prev.images,
        images: [...prev.images, { url: "" }]
      }));
    };
  
    // 更新圖片
    const updateImage = async(index, value) => {
      const file = value?.target?.files[0]; // 確保取得檔案
      if(file){
        // 上傳圖片
        const imageUrl = await uploadImageToCloudinary(file);
        const newImages = [...activityData.images]; // 更新 images 陣列
        newImages[index].url = imageUrl; // 更新對應的 url
        setActivityData((prev) => ({ ...prev, images: newImages })); // 更新 images 屬性
      }
    };

    // 更新活動圖片
    const updateImageInfo = async(index, value) => {
      const file = value?.target?.files[0]; // 確保取得檔案
      if(file){
         // 上傳圖片
        const imageUrl = await uploadImageToCloudinary(file);
        const newSections = [...activityData.sections]; // 更新 sections 陣列
        newSections[index].image = imageUrl; // 更新對應的 image
        setActivityData((prev) => ({ ...prev, sections: newSections })); // 更新 sections 屬性
      }
    };
  
    // 移除圖片
    const removeImage = (index) => {
      const newImages = activityData.images.filter((_, i) => i !== index);
      setActivityData((prev) => ({ ...prev, images: newImages }));
    };
  
    // 新增活動介紹
    const addSection = () => {
      setActivityData((prev) => ({
        ...prev,
        sections: [...prev.sections, { title: "", description: "" }]
      }));
    };

    // 新增行程特色
    const addTripHighlight = () => {
      setActivityData((prev) => ({
        ...prev,
        trip: { ...prev.trip, highlights: [...prev.trip.highlights, ""] } // 保留原有資料，新增一個空字串
      }));
    };
    
    // 移除行程特色
    const removeTripHighlight = (index) => {
      setActivityData((prev) => ({
        ...prev,
        trip: { ...prev.trip, highlights: prev.trip.highlights.filter((_, i) => i !== index) }
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

      const submitData = {
        ...activityData, // 包含所有資料
        trip: { title: activityData.trip.title, highlights: activityData.trip.highlights },
        map: { latitude: activityData.map.latitude, longitude: activityData.map.longitude, mapLink: activityData.map.mapLink },
        sections: activityData.sections,
        images: activityData.images
      }

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
      setActivityData((prev) => ({
        ...prev,
        map: { mapLink: e.target.value }
      }));
    };

    // 更新 行程特色
    const handleTripChange = (e, index) => {
      const { value } = e.target;
      setActivityData((prev) => {
        const newHighlights = [...prev.trip.highlights];
        newHighlights[index] = value; // 只更新對應索引的值
    
        return {
          ...prev,
          trip: { ...prev.trip, highlights: newHighlights }
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
                value={activityData.trip.title}
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
                {activityData.trip.highlights.map((highlight, index) => (
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
                {activityData.images.length < 5 && ( // 限制最多 5 張圖片
                <Button 
                  variant="secondary" 
                  onClick={addImage} 
                >
                  新增圖片
                </Button>
                )}
              </div>

              <div className="d-flex justify-content-start flex-wrap">
                {activityData.images.map((img, index) => (
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
                        {img.url && (
                          <img
                            src={img.url}
                            alt={`預覽圖片 ${index + 1}`}
                            className="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
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
              <Form.Label>地圖連結</Form.Label>
              <Form.Control
                type="text"
                value={activityData.map.mapLink}
                onChange={handleMapChange}
              />
            </Form.Group>

            {/* 活動介紹 */}
            <Form.Group className="mb-4 trip-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label>活動介紹</Form.Label>
                <Button variant="secondary" onClick={addSection}>新增活動介紹</Button>
              </div>
              {activityData.sections.map((section, index) => (
                <Card key={index} className=" shadow-sm p-3 mb-3 bg-body rounded">
                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center">
                      {/* 圖片上傳 Input */}
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => updateImageInfo(index, e)}
                      />
                    </div>

                  {/* 預覽區域 */}
                    {section.image && (
                      <div className="mt-3">
                        <img
                          src={section.image}
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


