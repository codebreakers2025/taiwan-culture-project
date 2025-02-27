import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Step2.scss";

const Step2 = () => {
  const navigate = useNavigate();

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
                {/* 左側行程資訊 */}
                <Col md={6} className="order-summary">
                  <div className="order-header">
                    <h5 className="order-title">台北101觀景台門票</h5>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>報名人：</strong> 漩渦鳴人
                    </p>
                    <p>
                      <strong>啟程日期：</strong> 2024年9月20日
                    </p>
                    <p>
                      <strong>人數：</strong> 4 位成人, 4 位兒童
                    </p>
                    <p>
                      <strong>價格：</strong> 大人 150 / 張，兒童 120 / 張
                    </p>
                    <p>
                      <strong>行程時段：</strong> 10:00 - 17:00
                    </p>
                  </div>
                </Col>

                {/* 右側付款資訊 */}
                <Col md={6} className="payment-summary">
                  <h5 className="order-title">
                    <i className="bi bi-geo-alt"></i> 主題式導覽行程訂單
                  </h5>
                  <p>
                    <i className="bi bi-calendar"></i> 2024年9月20日
                  </p>
                  <p>
                    <i className="bi bi-people"></i> 4 位成人, 4 位兒童
                  </p>
                  <p>
                    <i className="bi bi-clock"></i> 10:00 - 17:00
                  </p>
                  <hr />
                  <div className="d-flex justify-content-between total-summary">
                    <strong>小計</strong>
                    <strong>NT$ 1080</strong>
                  </div>
                </Col>
              </Row>

              {/* 操作按鈕 */}
              <div className="mt-4 text-center">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => navigate("/activity-list/booking1")}
                >
                  取消報名
                </Button>
                <Button
                  variant="primary"
                  className="px-4"
                  onClick={() => navigate("/activity-list/booking3")}
                >
                  送出
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step2;
