import PropTypes from "prop-types";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useForm, Controller  } from "react-hook-form";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const ActivityModal = ({ showModal, handleClose, handleSave, currentEvent, setCurrentEvent }) => {
  const { control, register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const cities = ["台北", "台中", "高雄"]; 
  const eventTypes = ["一日行程", "特色體驗", "戶外探索"]; 

  useEffect(() => {
    if (currentEvent && currentEvent.content) {
      setValue("content.title", currentEvent.content?.title || "");
      setValue("content.description", currentEvent.content?.description || "");
      setValue("city", currentEvent.city || "");
      setValue("startDate", currentEvent.startDate || null);
      setValue("endDate", currentEvent.endDate || null);
      setValue("images", currentEvent.images || "");
      setValue("eventType", currentEvent.eventType || "");
      setValue("rating", currentEvent.rating || 0);
    } else {
      reset();
    }
  }, [currentEvent, setValue, reset]);

  useEffect(() => {
    console.log('imagePreview updated:', imagePreview);
  }, [imagePreview]);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('handleImageChange triggered');
    console.log('files:', e.target.files);
    if (file) {
      console.log('Selected file:', file);
      setImageFile(file);
      // 創建預覽 URL
      const previewUrl = URL.createObjectURL(file);
      console.log('Preview URL:', previewUrl);
      setImagePreview(previewUrl);

      // setValue('images', file);
    }
  };


  const onSubmit = async(data) => {
    try {
    const updatedEvent = {
      ...data,
      startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(data.endDate), 'yyyy-MM-dd'),
      rating: Number(data.rating),
      id: currentEvent ? currentEvent?.id : null, // 保留 ID
    };
    // setCurrentEvent(updatedEvent); // 更新 currentEvent
    await handleSave(updatedEvent);
  } catch (error) {
    console.error("Form submission error:", error);
  }
  };



  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>新增活動</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>名稱</Form.Label>
            <Form.Control
              type="text"
              placeholder="活動名稱"
              {...register("content.title", { required: "活動名稱是必填的" })}
            />
            {errors["content.title"] && (
              <p className="text-danger">{errors["content.title"].message}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>描述</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("content.description", {
                required: "描述是必填的",
              })}
            />
            {errors["content.description"] && (
              <p className="text-danger">
                {errors["content.description"].message}
              </p>
            )}
          </Form.Group>

          {/* Event Type Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>活動類型</Form.Label>
            <Form.Control
              as="select"
              {...register("eventType", { required: "活動類型是必填的" })}
              placeholder="活動類型"
            >
              {eventTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
            {errors.eventType && (
              <p className="text-danger">{errors.eventType.message}</p>
            )}
          </Form.Group>

          {/* City Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>城市</Form.Label>
            <Form.Control
              as="select"
              {...register("city", { required: "城市是必填的" })}
              placeholder="城市"
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Form.Control>
            {errors.city && <p className="text-danger">{errors.city.message}</p>}
          </Form.Group>

          {/* Start Date Picker */}
          <Form.Group className="mb-3">
            <Form.Label>開始日期</Form.Label>
            <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
                placeholderText="選擇開始日期"
                showDateSelect
              />
            )}
          />
            {errors.startDate && <p className="text-danger">{errors.startDate.message}</p>}
          </Form.Group>

          {/* End Date Picker */}
          <Form.Group className="mb-3">
            <Form.Label>結束日期</Form.Label>
            <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
                placeholderText="選擇結束日期"
                showDateSelect
              />
            )}
          />
            {errors.endDate && <p className="text-danger">{errors.endDate.message}</p>}
          </Form.Group>

           {/* Image Upload */}
          {/* <Form.Group className="mb-3">
            <Form.Label>活動圖片</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
                // 如果使用 react-hook-form，需要手動設置值
                setValue('images', e.target.files[0]);
              }}
              placeholder="活動圖片"
              {...register("images", { required: "圖片 URL 是必填的" })}
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3"
                  style={{ width: "100%", height: "auto", maxHeight: "200px", objectFit: 'contain' }}
                />
              </div>
            )}
            {errors.images && (
              <p className="text-danger">{errors.images.message}</p>
            )}
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>評分</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating", { required: "評分是必填的" })}
            />
            {errors.rating && <p className="text-danger">{errors.rating.message}</p>}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>取消</Button>
          <Button variant="primary" type="submit">儲存</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};


ActivityModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  currentEvent: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    images: PropTypes.string,
    isFavorited: PropTypes.bool,
    rating: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    eventType: PropTypes.string,
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  setCurrentEvent: PropTypes.func.isRequired,
};

export default ActivityModal;
