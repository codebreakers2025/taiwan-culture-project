import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Step4.scss";

const Step4 = () => {
  const navigate = useNavigate();

  return (
    <Container className="completion-page py-4">
      {/* 頁面標題 */}
      <h2 className="text-center mb-4">報名成功！</h2>
      
      {/* 進度指示器 */}
      <div className="progress-steps d-flex justify-content-center mb-4">
        <Button variant="dark" className="me-2">1. 行程資料</Button>
        <Button variant="dark" className="me-2">2. 確認訂單</Button>
        <Button variant="dark" className="me-2">3. 付款資料</Button>
        <Button variant="dark">4. 完成預約</Button>
      </div>
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-3 completion-card text-center">
            <Card.Body>
              <h4 className="mb-3">您的預約行程已確認！</h4>
              <p>我們已經發送報名確認通知至您的 Email，請查收。</p>
              <p>如果您需要修改行程或有任何問題，請聯繫客服。</p>
              
              <Card className="p-2 mt-3">
                <Card.Body>
                  <h5>您的行程</h5>
                  <p><strong>台北101觀景台門票</strong></p>
                  <p>日期：2024年9月20日</p>
                  <p>人數：4 位成人</p>
                  <p>行程時間：10:00 - 17:00</p>
                  <p>訂單編號：ABC-123-456</p>
                </Card.Body>
              </Card>
              
              {/* 返回按鈕 */}
              <div className="mt-4">
                <Button variant="primary" className="px-4 me-2" onClick={() => navigate("/member-center/personal-data")}>前往會員中心</Button>
                <Button variant="outline-dark" className="px-4" onClick={() => navigate("/")}>回到首頁</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step4;