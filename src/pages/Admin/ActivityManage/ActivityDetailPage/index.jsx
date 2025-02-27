import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";  // 取得動態路由參數
import { Modal, Button, Form, Card, Alert } from "react-bootstrap";
import { addActivitys, updatedActivitys, getActivitys } from '@/utils/api';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
      setActivityData((prev) => ({
        ...prev.images,
        images: [...prev.images, { url: "" }]
      }));
    };
  
    // 更新圖片
    const updateImage = (index, value) => {
      const newImages = [...activityData.images];
      newImages[index].url = value;
      setActivityData((prev) => ({ ...prev, images: newImages }));
    };

    // 更新活動圖片
    const updateImageInfo = (index, value) => {
      const newImages = [...activityData.sections];
      newImages[index].image = value;
      setActivityData((prev) => ({ ...prev, images: newImages }));
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
      <Card className="p-4 shadow-lg">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title>編輯行程</Card.Title>
          <Button variant="close" onClick={handleClose}></Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleSave)}>

            {/* 行程標題 */}
            <Form.Group className="mb-3">
              <Form.Label>行程標題</Form.Label>
              <Form.Control
                type="text"
                name="title"  // `name` 對應到 `trip.title`
                value={activityData.trip.title}
                onChange={handleChange} // 使用修正後的 `handleChange`
              />
            </Form.Group>

            {/* 行程特色 */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
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
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>圖片</Form.Label>
                <Button variant="secondary" onClick={addImage}>新增圖片</Button>
              </div>

              {activityData.images.map((img, index) => (
                <div key={index} className="d-flex flex-column mb-2">
                  {/* 圖片上傳 Input */}
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateImage(index, e)}
                  />

                  {/* 預覽區域 */}
                  {img.url && (
                    <div className="mt-2 d-flex align-items-center">
                      <img
                        src={img.url}
                        alt="預覽圖片"
                        className="img-thumbnail"
                        style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "contain" }}
                      />
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => removeImage(index)}
                      >
                        刪除
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </Form.Group>


            {/* 地圖連結 */}
            <Form.Group className="mb-3">
              <Form.Label>地圖連結</Form.Label>
              <Form.Control
                type="text"
                value={activityData.map.mapLink}
                onChange={handleMapChange}
              />
            </Form.Group>

            {/* 活動介紹 */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>活動介紹</Form.Label>
                <Button variant="secondary" onClick={addSection}>新增活動介紹</Button>
              </div>
              {activityData.sections.map((section, index) => (
                <div key={index} className="mb-3">
                  <Form.Label>圖片上傳</Form.Label>

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
                    刪除
                  </Button>
                </div>
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


