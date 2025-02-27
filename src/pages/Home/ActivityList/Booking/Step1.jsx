import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Step1.scss";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    請選擇報名人數
  </Tooltip>
);

const Step1 = () => {

  const location = useLocation();
  const submitData = location.state || {}; // 確保有資料

  const navigate = useNavigate();
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [selectValue , setSelectValue] = useState('')

  //react-hook-form
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      adultCount: selectValue || "",  // 預設為空，讓選項顯示 "請選擇報名人數"
    },
    mode: "onTouched"
  });
  
  useEffect(() => {
    if (Object.keys(submitData).length > 0) {
      reset({
        ...submitData,
        adultCount: selectValue || "", // 確保 `adultCount` 預設為 ""
      });
    }
  }, [submitData, reset]);

  const onSubmit = (data) => {
    const adultCount = Number(data.adultCount); // 转换为数字
    console.log(adultCount);
    
    console.log({ ...data, adultCount }); // 确保 adultCount 为数字
    
    // 當表單提交時，將資料傳遞給 Step2 頁面
    navigate("/activity-list/booking2", { state: data });
  };
  
  console.log(watch());
  
  return (
    <Container className="booking-step1 py-4">
      {/* 頁面標題 */}
      <h2 className="text-center mb-4">預約行程表單</h2>
      
      {/* 進度指示器 */}
      <div className="progress-steps d-flex justify-content-center mb-4">
        <Button variant="dark" className="me-2">1. 行程資料</Button>
        <Button variant="outline-dark" className="me-2">2. 確認訂單</Button>
        <Button variant="outline-dark" className="me-2">3. 付款資料</Button>
        <Button variant="outline-dark">4. 完成預約</Button>
      </div>
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-3 booking-card">
            <Card.Body>
              <h4 className="mb-3">您的預約行程是</h4>
              
              <Row>
                <Col md={4}>
                  <div className="img-placeholder"><img src="" alt="" /></div>
                </Col>
                <Col md={8}>
                  <p><strong>台北101觀景台門票</strong></p>
                  <p><i className="bi bi-calendar"></i> 2024年9月20日</p>
                  <p><i className="bi bi-ticket"></i> 景點/票券</p>
                  <p><i className="bi bi-clock"></i> 票券當日有效</p>
                  <p><i className="bi bi-cash"></i> 大人 150 / 張，兒童 120 / 張</p>
                </Col>
              </Row>
              
              {/* 報名人數選擇 */}
              <div className="mt-3">
                <label>人數：</label>
                <OverlayTrigger placement="top" overlay={renderTooltip}>
                  <Form.Select {...register("adultCount", { 
                    required: "請選擇報名人數",
                    onChange: (e) => {
                      const value = e.target.value;
                      setSelectValue(value); // 更新 selectValue
                      setValue("adultCount", value); // 更新 react-hook-form 表单的值
                    },
                  })} 
                  value={selectValue}  >
                    <option value="" disabled>請選擇報名人數</option>
                    <option value="1">1 人</option>
                    <option value="2">2 人</option>
                    <option value="3">3 人</option>
                  </Form.Select>
                </OverlayTrigger>
              </div>
              
              {/* 人數調整按鈕 */}
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <span>成人：</span>
                  <Button variant="outline-dark" onClick={() => setAdultCount(Math.max(adultCount - 1, 0))}>-</Button>
                  <span className="px-2">{adultCount}</span>
                  <Button variant="outline-dark" onClick={() => setAdultCount(adultCount + 1)}>+</Button>
                </div>
                <div>
                  <span>孩童：</span>
                  <Button variant="outline-dark" onClick={() => setChildCount(Math.max(childCount - 1, 0))}>-</Button>
                  <span className="px-2">{childCount}</span>
                  <Button variant="outline-dark" onClick={() => setChildCount(childCount + 1)}>+</Button>
                </div>
              </div>
              
              {/* 確認按鈕 */}
              <div className="mt-4 text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button variant="primary" type="submit" className="px-4">確認報名</Button>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step1;