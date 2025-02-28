import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Step2.scss";
import { useLocation } from "react-router-dom";

const Step2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const submitData = location.state || {}; 

  console.log("Step2 submitData:", submitData);
  
  
  const date = new Date(submitData.last_bookable_date);

  const formattedDate = `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, '0')}月${date.getDate().toString().padStart(2, '0')}日`;

  return (
    <Container className="booking-step2 py-4">
      {/* 頁面標題 */}
      <h2 className="text-center mb-4">確認表單</h2>

      {/* 進度指示器 */}
      <div className="progress-steps d-flex justify-content-center mb-4">
        <Button variant="dark" className="me-2">
          1. 行程資料
        </Button>
        <Button variant="dark" className="me-2">
          2. 確認訂單
        </Button>
        <Button variant="outline-dark" className="me-2">
          3. 付款資料
        </Button>
        <Button variant="outline-dark">4. 完成預約</Button>
      </div>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 confirmation-card">
            <Card.Body>
              <h4 className="mb-3 text-center">您想報名的是</h4>
              <Row>
                <Col md={6}>
                  <Card className="p-2">
                    <Card.Body>
                      <p><strong>{submitData.activityName}</strong></p>
                      <p>報名人數: {submitData.adultCount} 位成人, {submitData.childCount} 位兒童</p>
                      <p>日期: {formattedDate}</p>
                      <p>票價: 大人 150 / 張，兒童 120 / 張</p>
                      <p>時間: 10:00 - 17:00</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="p-2">
                    <Card.Body>
                      <h5>行程訂單</h5>
                      <p>地點: {submitData.activityLocation}</p>
                      <p>時間: {submitData.last_bookable_date}</p>
                      <p><strong>NT$ {submitData.totalAmount}</strong></p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* 操作按鈕 */}
              <div className="mt-4 text-center">
                <Button variant="secondary" className="me-2" onClick={() => navigate("/activity-list/booking1", { state: submitData })}>返回行程資訊</Button>
                <Button variant="primary" className="px-4" onClick={() => navigate("/activity-list/booking3", { state: submitData })}>去結帳</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step2;
