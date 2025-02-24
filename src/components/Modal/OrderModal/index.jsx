import PropTypes from "prop-types";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";  


const OrderModal = ({ showModal, handleClose, handleSave, currentOrder, setCurrentOrder }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [formData, setFormData] = useState(
    { 
      contactName: '',
      activityName: '',
      activityLocation: '',
      activityPeriod: {
        startDate: '',
        endDate: ''
      },
      timeSlot: '',
      adultCount: 0,
      childCount: 0,
      adultPrice: 200,
      childPrice: 150,
      paymentStatus: "PENDING",
      totalAmount: 0 
    });

    useEffect(() => {
      if (currentOrder) {
        setFormData({
          contactName: currentOrder.contactName || '',
          activityName: currentOrder.activityName || '',
          activityLocation: currentOrder.activityLocation || '',
          activityPeriod: {
            startDate: currentOrder.activityPeriod?.startDate || '',
            endDate: currentOrder.activityPeriod?.endDate || ''
          },
          timeSlot: currentOrder.timeSlot || [
            '09:00-12:00',
            '14:00-17:00',
            '09:00-17:00',
            '18:00-21:00'
          ],
          paymentStatus: currentOrder.paymentStatus || '',
          adultCount: currentOrder.adultCount || 0,
          childCount: currentOrder.childCount || 0,
          adultPrice: currentOrder.adultPrice || 200,
          childPrice: currentOrder.childPrice || 150,
          totalAmount: currentOrder.totalAmount || 0
        });
      }
    }, [currentOrder]); // 監聽 `currentOrder` 的變化


  const calculateTotal = () => {
    return formData.adultCount * formData.adultPrice +
           formData.childCount * formData.childPrice;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      // 處理巢狀結構
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (name === 'timeSlot') {
      setSelectedTimeSlot(e.target.value);
    } else {
      // 一般輸入 & 計算總金額
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          [name]: value,
        };
  
        if (['adultCount', 'childCount', 'adultPrice', 'childPrice'].includes(name)) {
          updatedData.totalAmount = calculateTotal(
            updatedData.adultCount,
            updatedData.childCount,
            updatedData.adultPrice,
            updatedData.childPrice
          );
        }
  
        return updatedData;
      });
    }
  };

  const handleClick = () => {
    handleSave(formData);
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
          <Form onSubmit={handleSubmit(handleClick)}>
          <Modal.Header closeButton>
        <Modal.Title>{currentOrder ? "查看訂單" : "新增訂單"}</Modal.Title>
      </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>聯絡人姓名</Form.Label>
            <Form.Control name="contactName" value={formData.contactName} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>活動名稱</Form.Label>
            <Form.Control name="activityName" value={formData.activityName} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>活動地點</Form.Label>
            <Form.Control name="activityLocation" value={formData.activityLocation} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>開始日期</Form.Label>
            <Form.Control type="date" name="activityPeriod.startDate" value={formData.activityPeriod.startDate} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>結束日期</Form.Label>
            <Form.Control type="date" name="activityPeriod.endDate" value={formData.activityPeriod.endDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
          <Form.Label>活動時段</Form.Label>
          <Form.Select name="timeSlot" value={selectedTimeSlot} onChange={handleChange}>
            <option disabled value="">
              請選擇時段
            </option>
            <option value="09:00-12:00">09:00-12:00</option>
            <option value="14:00-17:00">14:00-17:00</option>
            <option value="09:00-17:00">09:00-17:00</option>
            <option value="18:00-21:00">18:00-21:00</option>
          </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>成人人數</Form.Label>
            <Form.Control type="number" name="adultCount" value={formData.adultCount} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>兒童人數</Form.Label>
            <Form.Control type="number" name="childCount" value={formData.childCount} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>訂單狀態</Form.Label>
            <Form.Control type="text" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} />
          </Form.Group>

          <Form.Group>
            <p className="fs-4 fw-bold">總金額: ${calculateTotal()}</p>
          </Form.Group>
          
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>取消</Button>
            { !currentOrder && (
            <Button variant="primary" type="submit">建立訂單</Button>
          ) }
        </Modal.Footer>
          </Form>
    </Modal>
  );
};

OrderModal.propTypes = {
  showModal: PropTypes.bool.isRequired, // 是否顯示 Modal
  handleClose: PropTypes.func.isRequired, // 關閉 Modal 的函數
  handleSave: PropTypes.func.isRequired, // 儲存資料的函數
  currentOrder: PropTypes.shape({
      id: PropTypes.string,
      contactName: PropTypes.string,
      activityName: PropTypes.string,
      activityLocation: PropTypes.string,
      timeSlot: PropTypes.string,
      'activityPeriod.startDate': PropTypes.string,
      'activityPeriod.endDate': PropTypes.string,
      paymentStatus: PropTypes.string,
      adultCount: PropTypes.number,
      childCount: PropTypes.number,
      adultPrice: PropTypes.number,
      childPrice: PropTypes.number,
      totalAmount: PropTypes.number,
    }),
    setCurrentOrder: PropTypes.func.isRequired,
};

export default OrderModal;



