import PropTypes from "prop-types";
import { Button, Table, Modal, Form, Alert} from "react-bootstrap";
import { useForm, Controller  } from "react-hook-form";
import { useState, useEffect, useRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { uploadImageToCloudinary } from '@/utils/api.js';


const ActivityModal = ({ showModal, handleClose, handleSave, currentEvent, setCurrentEvent }) => {
  const { control, watch, register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  const [previewImages, setPreviewImages] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const mainImageFileRef = useRef(null);
const previewImagesRef = useRef([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cities = ["台北", "台中", "高雄"]; 
  const eventTypes = ["一日行程", "特色體驗", "戶外探索"]; 

  // 監聽 `eventType、citie` 的值，讓它受控
  const selectedEventType = watch("eventType", ""); // 預設值為空
  const selectedCity = watch("city", ""); // 預設值為空

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
      setValue("price", currentEvent.price || 0);

      if (currentEvent && typeof currentEvent.images) {
        const imageString = typeof currentEvent.images === "string"
        ? currentEvent.images
        : JSON.stringify(currentEvent.images); // 確保為字串

        setPreviewImages([imageString]); 
        setValue("images", imageString);
      }
    } else {
      reset();
      setPreviewImages([]);
    }
  }, [currentEvent, setValue, reset]);

  // 處理主圖片上傳
  const handleMainImageChange = async(e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      mainImageFileRef.current = file;  // 不使用 useState，避免觸發重新渲染
      // setMainImageFile(file);

      // 預覽圖片
      const reader = new FileReader();
      reader.onload = (event) => {
        previewImagesRef.current = [event.target.result]; 
        // setPreviewImages([event.target.result]);
      };
      reader.readAsDataURL(file);
      
      try {
        // 上傳圖片
        const imageUrl = await uploadImageToCloudinary(file);
        setCurrentEvent((prev) => ({
          ...prev,
          images: imageUrl || prev.images,
        }));
        setValue("images", imageUrl);
      } catch (error) {
        console.error("上傳圖片失敗", error);
      }
      
    }
  };

  const onSubmit = async(data) => {
    console.log(data);
    try {
    const updatedEvent = {
      ...data,
      startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(data.endDate), 'yyyy-MM-dd'),
      rating: Number(data.rating),
      id: currentEvent ? currentEvent?.id : null, // 保留 ID
      images: currentEvent.images,
      activityDetails: []
    };
    console.log(updatedEvent);
    // setCurrentEvent(updatedEvent); // 更新 currentEvent
    await handleSave(updatedEvent);

  } catch (error) {
    console.error("Form submission error:", error);
  }
  };

  {error && <Alert variant="danger">{error}</Alert>}
  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvent ? "編輯活動" : "新增活動"}</Modal.Title>
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
              placeholder="活動內容"
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
            <Form.Select
              {...register("eventType", { required: "活動類型是必填的" })}
              value={selectedEventType}
              onChange={(e) => setValue("eventType", e.target.value)}
            >
              <option value="" disabled selected className="placeholder-option">請選擇活動類型</option>
              {eventTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
            {errors.eventType && (
              <p className="text-danger">{errors.eventType.message}</p>
            )}
          </Form.Group>

          {/* City Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>城市</Form.Label>
            <Form.Select
              {...register("city", { required: "城市是必填的" })}
              value={selectedCity}
              onChange={(e) => setValue("city", e.target.value)}
            >
              <option value="" disabled selected className="placeholder-option">請選擇城市</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
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
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="選擇開始日期"
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

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label>價格</Form.Label>
            <Form.Control
              type="number"
              {...register("price", { required: "價錢是必填的" })}
            />
            {errors.price && <p className="text-danger">{errors.price.message}</p>}
          </Form.Group>

           {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>活動主圖</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              placeholder="活動主圖"
            />
           {previewImages.length > 0 && (
              <div className="mt-3">
                <img
                  src={previewImages[0]}
                  alt="主圖預覽"
                  className="mt-3"
                  style={{ width: "75%", objectFit: "cover" }}
                />
              </div>
            )}
          </Form.Group>

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
    images: PropTypes.oneOfType([
      PropTypes.string, 
      PropTypes.oneOf([null]) // 允許 null
    ]),
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
