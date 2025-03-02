import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getActivitys } from '@/utils/api.js';
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";


const ActivityDetailModal = ({ showModal, handleClose, onSave, currentEvent, setCurrentEvent }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [activityData, setActivityData] = useState({
    images: [],
    trip: { title: "", highlights: [] },
    map: { latitude: 0, longitude: 0, mapLink: "" },
    sections: []
  });


  // 取得 API 資料
  useEffect(() => {
    if (showModal) {
      (async () => {
        const data = await getActivitys(currentEvent.id);

      // 取第一筆 activityDetails（如果有資料）
      const firstActivity = data.activityDetails?.[0] || {
        images: [],
        trip: { title: "", highlights: [] },
        map: { latitude: 0, longitude: 0, mapLink: "" },
        sections: []
      };

      setActivityData(firstActivity);

      })();
    }
  }, [showModal]);

  // 更新表單內容
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prev) => ({ ...prev, [name]: value }));
  };

  // 更新地圖連結
  const handleMapChange = (e) => {
    setActivityData((prev) => ({
      ...prev,
      map: { mapLink: e.target.value }
    }));
  };

  // 新增圖片
  const addImage = () => {
    setActivityData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "" }]
    }));
  };

  // 更新圖片
  const updateImage = (index, value) => {
    const newImages = [...activityData.images];
    newImages[index].url = value;
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
  const handleSave = () => {
    onSave(activityData);
    handleClose();
  };

  return (
    
    <Modal showModal={showModal} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>編輯行程</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleSave)}>
          {/* 行程標題 */}
          <Form.Group className="mb-3">
            <Form.Label>行程標題</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={activityData.title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 行程特色 */}
          <Form.Group className="mb-3">
            <Form.Label>行程特色</Form.Label>
            <Form.Control
              as="textarea"
              name="highlight"
              rows={3}
              value={activityData.highlight}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 圖片管理 */}
          <Form.Group className="mb-3">
            <Form.Label>圖片</Form.Label>
            {activityData.images.map((img, index) => (
              <div key={index} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={img.url}
                  onChange={(e) => updateImage(index, e.target.value)}
                />
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => removeImage(index)}
                >
                  刪除
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addImage}>
              新增圖片
            </Button>
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
            <Form.Label>活動介紹</Form.Label>
            {activityData.sections.map((section, index) => (
              <div key={index} className="mb-3">
                <Form.Control
                  type="text"
                  className="mb-2"
                  placeholder="活動標題"
                  value={section.title}
                  onChange={(e) => updateSection(index, "title", e.target.value)}
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
            <Button variant="secondary" onClick={addSection}>
              新增活動介紹
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          取消
        </Button>
        <Button variant="primary">
          儲存變更
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ActivityDetailModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  currentEvent: PropTypes.func.isRequired,
  setCurrentEvent: PropTypes.func.isRequired,
};

export default ActivityDetailModal;
