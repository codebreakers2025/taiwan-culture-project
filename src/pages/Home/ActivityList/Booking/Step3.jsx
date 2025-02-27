import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Step3.scss";

const Step3 = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    value = value.slice(0, 16); 
    value = value.replace(/(\d{4})/g, "$1-").replace(/-$/, ""); 

    setCardNumber(value);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    value = value.slice(0, 4); 
    if (value.length > 2) {
      value = value.replace(/(\d{2})/, "$1/"); 
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    value = value.slice(0, 3); 
    setCvv(value);
  };

  return (
    <Container className="payment-step py-4">
      {/* 頁面標題 */}
      <h2 className="text-center mb-4">付款資料</h2>

      {/* 進度指示器 */}
      <div className="progress-steps d-flex justify-content-center mb-4">
        <Button variant="dark" className="me-2">
          1. 行程資料
        </Button>
        <Button variant="dark" className="me-2">
          2. 確認訂單
        </Button>
        <Button variant="dark" className="me-2">
          3. 付款資料
        </Button>
        <Button variant="outline-dark">4. 完成預約</Button>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-3 payment-card">
            <Card.Body>
              <h4 className="mb-3">請輸入付款資料</h4>

              <Form>
                <Form.Group className="mb-3" controlId="cardName">
                  <Form.Label>持卡人姓名</Form.Label>
                  <Form.Control type="text" placeholder="輸入持卡人姓名" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>信用卡號</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="expiryDate">
                      <Form.Label>有效期限</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cvv">
                      <Form.Label>安全碼</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="XXX"
                        value={cvv}
                        onChange={handleCvvChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="輸入您的 Email" />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate("/activity-list/booking2")}
                  >
                    返回上一頁
                  </Button>
                  <Button
                    variant="primary"
                    className="px-4"
                    onClick={() => navigate("/activity-list/booking4")}
                  >
                    結帳
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step3;
