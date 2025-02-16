import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles/Step2.scss";

const Step2 = () => {
  const navigate = useNavigate();

  return (
    <Container className="booking-step2 py-4">
      {/* 頁面標題 */}
      <h2 className="text-center mb-4">確認表單</h2>
      
      {/* 進度指示器 */}
      <div className="progress-steps d-flex justify-content-center mb-4">
        <Button variant="dark" className="me-2">1. 行程資料</Button>
        <Button variant="dark" className="me-2">2. 確認訂單</Button>
        <Button variant="outline-dark" className="me-2">3. 付款資料</Button>
        <Button variant="outline-dark">4. 完成預約</Button>
      </div>
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-3 confirmation-card">
            <Card.Body>
              <h4 className="mb-3">您想報名的是</h4>
              <Row>
                <Col md={6}>
                  <Card className="p-2">
                    <Card.Body>
                      <p><strong>台北101觀景台門票</strong></p>
                      <p>報名人數: 2 位成人, 1 位兒童</p>
                      <p>日期: 2024年9月20日</p>
                      <p>票價: 大人 150 / 張，兒童 120 / 張</p>
                      <p>時間: 10:00 - 17:00</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="p-2">
                    <Card.Body>
                      <h5>主題式導覽行程訂單</h5>
                      <p>地點: 台北101</p>
                      <p>時間: 10:00 - 17:00</p>
                      <p><strong>NT$ 1080</strong></p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              {/* 操作按鈕 */}
              <div className="mt-4 text-center">
                <Button variant="secondary" className="me-2" onClick={() => navigate("/booking/step1")}>返回行程資訊</Button>
                <Button variant="primary" className="px-4" onClick={() => navigate("/booking/step3")}>去結帳</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step2;