import { ActivityCard, ReviewCard, BlogCard } from '@/components/Card';
import './ActivityList.scss';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { getActivity, getJournal, getReviews } from '@/utils/api';

const About = () => {
  return (
    <div className="test-container">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="left-searchBar">
                <div className="body">
                  {/* 搜尋關鍵字 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">關鍵字搜尋</span>
                    <div className="list-content">
                      <span className="material-icons">search</span>
                      <input type="text" className="form-control" placeholder="搜尋關鍵字" value="" />
                    </div>
                  </div>
                  {/* 日期選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">起始日期</span>
                    <div className="list-content">
                      <span className="material-icons">today</span>
                      <div className="react-datepicker-wrapper">
                        <div className="react-datepicker__input-container">
                          <input type="text" placeholder="請選擇開始日期" className="date-input" value="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 modal-body-list">
                    <span className="title">結束日期</span>
                    <div className="list-content">
                      <span className="material-icons">today</span>
                      <div className="react-datepicker-wrapper">
                        <div className="react-datepicker__input-container">
                          <input type="text" placeholder="請選擇結束日期" className="date-input" value="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 類型選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">活動類型</span>
                    <div className="list-content">
                      <span className="material-icons">directions_walk</span>
                      <div className="form-control-dropdown">
                        {/* <div className="dropdown-selected ">類型</div> */}
                        <select name="" id="" className="dropdown-selected ">
                          <option value="">請選擇活動類型</option>
                          <option value="">一日行程</option>
                          <option value="">特色體驗</option>
                          <option value="">戶外探索</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* 價格輸入 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">價格</span>
                    <div className="list-content">
                      <span className="material-icons">paid</span>
                      <input type="text" className="form-control" placeholder="請選擇價格區間" value="" />
                    </div>
                  </div>
                  {/* 地區選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">地區</span>
                    <div className="list-content">
                      <span className="material-icons">location_on</span>
                      <div className="form-control-dropdown">
                        {/* <div className="dropdown-selected ">地區</div> */}
                        <select name="" id="" className="dropdown-selected ">
                          <option value="">請選擇地區</option>
                          <option value="">台北</option>
                          <option value="">台中</option>
                          <option value="">高雄</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button type="button" className="btn btn-primary">搜尋</button>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="right-content">
                <div className="row">
                  <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                      <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text">2025-01-21·一日行程</p>
                          <span className="rating">★ 4.5</span>
                        </div>
                        <h5 className="card-title">台中: 經典行程＆高美濕地一日遊</h5>
                        <p className="card-text">探索台中之美，從經典出發！一日遊帶您走訪彩虹眷村的繽紛色彩，感受老兵的童心，最後漫步於高美濕地，欣賞夕陽與自然交織的絕美景色。</p>
                        <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                        <span className="paid mt-1">666</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                      <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-2.png" className="card-img-top" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text">2025-01-25·特色體驗</p>
                          <span className="rating">★ 4.8</span>
                        </div>
                        <h5 className="card-title">台北: 沉浸式 DIY 調製香水</h5>
                        <p className="card-text">在繁華的台北，體驗一場獨特的嗅覺之旅！透過沉浸式DIY調製香水，您將化身調香師，探索香氛的奧秘，打造屬於自己的專屬香氣，留下一段難忘的回憶。</p>
                        <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                        <span className="paid mt-1">980</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                      <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-3.png" className="card-img-top" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text">2025-01-26·特色體驗</p>
                          <span className="rating">★ 4.7</span>
                        </div>
                        <h5 className="card-title">宜蘭: 天送埤火車站 | 高空繩索體驗 </h5>
                        <p className="card-text">來宜蘭天送埤火車站，挑戰您的膽量！體驗刺激的高空繩索，在安全防護下享受高空漫步的刺激感，並俯瞰周圍壯麗的自然景觀，感受心跳加速的快感。</p>
                        <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                        <span className="paid mt-1">350</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                      <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text">2025-01-21·一日行程</p>
                          <span className="rating">★ 4.5</span>
                        </div>
                        <h5 className="card-title">台中: 經典行程＆高美濕地一日遊</h5>
                        <p className="card-text">探索台中之美，從經典出發！一日遊帶您走訪彩虹眷村的繽紛色彩，感受老兵的童心，最後漫步於高美濕地，欣賞夕陽與自然交織的絕美景色。</p>
                        <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                        <span className="paid mt-1">666</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                      <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-2.png" className="card-img-top" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text">2025-01-25·特色體驗</p>
                          <span className="rating">★ 4.8</span>
                        </div>
                        <h5 className="card-title">台北: 沉浸式 DIY 調製香水</h5>
                        <p className="card-text">在繁華的台北，體驗一場獨特的嗅覺之旅！透過沉浸式DIY調製香水，您將化身調香師，探索香氛的奧秘，打造屬於自己的專屬香氣，留下一段難忘的回憶。</p>
                        <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                        <span className="paid mt-1">980</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="card mb-3">
                      <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-3.png" className="card-img-top" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="card-text">2025-01-26·特色體驗</p>
                          <span className="rating">★ 4.7</span>
                        </div>
                        <h5 className="card-title">宜蘭: 天送埤火車站 | 高空繩索體驗 </h5>
                        <p className="card-text">來宜蘭天送埤火車站，挑戰您的膽量！體驗刺激的高空繩索，在安全防護下享受高空漫步的刺激感，並俯瞰周圍壯麗的自然景觀，感受心跳加速的快感。</p>
                        <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                        <span className="paid mt-1">350</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;