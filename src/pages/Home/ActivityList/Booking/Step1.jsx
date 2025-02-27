import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Step1.scss";
import { useLocation } from "react-router-dom";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    請選擇報名人數
  </Tooltip>
);

const Step1 = () => {
  const navigate = useNavigate();
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const location = useLocation();
  const submitData = location.state || {}; 

  console.log("收到的預約資料:", submitData);

  return (
    <Container className="booking-step1 py-4">
      {/* 頁面標題 */}
      <h2 className="text-center mb-4">預約行程表單</h2>

      {/* 進度指示器 */}
      <div className="progress-steps d-flex justify-content-center mb-4">
        <Button variant="dark" className="me-2">
          1. 行程資料
        </Button>
        <Button variant="outline-dark" className="me-2">
          2. 確認訂單
        </Button>
        <Button variant="outline-dark" className="me-2">
          3. 付款資料
        </Button>
        <Button variant="outline-dark">4. 完成預約</Button>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-3 booking-card">
            <Card.Body>
              <h4 className="mb-3 text-center">您的預約行程是</h4>

              <div className="booking-info">
                {/* 左側圖片區塊 */}
                <div className="img-placeholder">
                  <i className="bi bi-image" style={{ fontSize: "2rem", color: "#aaa" }}></i>
                </div>

                {/* 右側資訊卡片 */}
                <div className="info-card">
                  <h5 className="info-title">
                    <i className="bi bi-geo-alt"></i> 台北101觀景台門票
                  </h5>
                  <p className="info-item">
                    <i className="bi bi-calendar"></i> 2024年9月20日
                  </p>
                  <p className="info-item">
                    <i className="bi bi-ticket"></i> 景點/票券
                  </p>
                  <p className="info-item">
                    <i className="bi bi-hourglass-split"></i> 票券當日有效
                  </p>
                  <p className="info-item">
                    <i className="bi bi-cash"></i> 成人 150 / 張，兒童 120 / 張
                  </p>
                </div>
              </div>

              {/* 人數調整按鈕 */}
              <div className="people-counter mt-3">
                <div className="counter-item">
                  <span className="label">成人 (12 歲以上)</span>
                  <span className="price">NT$150 / 每人</span>
                  <div className="counter-control">
                    <Button
                      variant="outline-dark"
                      className="circle-btn"
                      onClick={() => setAdultCount(Math.max(adultCount - 1, 0))}
                    >
                      −
                    </Button>
                    <span className="count">{adultCount}</span>
                    <Button
                      variant="outline-dark"
                      className="circle-btn"
                      onClick={() => setAdultCount(adultCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="counter-item">
                  <span className="label">兒童 (6-11 歲)</span>
                  <span className="price">NT$120 / 每人</span>
                  <div className="counter-control">
                    <Button
                      variant="outline-dark"
                      className="circle-btn"
                      onClick={() => setChildCount(Math.max(childCount - 1, 0))}
                    >
                      −
                    </Button>
                    <span className="count">{childCount}</span>
                    <Button
                      variant="outline-dark"
                      className="circle-btn"
                      onClick={() => setChildCount(childCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              {/* 確認按鈕 */}
              <div className="mt-4 text-center">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => navigate("/activity-list/1")}
                >
                  返回上一頁
                </Button>
                <Button
                  variant="primary"
                  className="px-4"
                  onClick={() => navigate("/activity-list/booking2")}
                >
                  確認報名
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Step1;
