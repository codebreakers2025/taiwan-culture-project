import React, { useState, useEffect } from 'react';
import '../OrderDetailPage/OrderDetail.scss';
import OrderDetailImg from '@/assets/images/OrderManagement-img/OrderDetail-img.jpeg';

const OrderDetailPage = () => {

  useEffect(() => {
    
  }, []);

  return (
    <div className="order-detail-style page-container">
        <div className="order-info">
            <div className="order-info-box order-detail">
                <div className="order-detail-info">
                    <h3 className="order-title">訂單資訊</h3>
                    <div className="reservation">已預約</div>
                </div>
                <table>
                    <tr className="d-block mt-4 mb-3">
                        <td className="field-label-name">訂單編號</td>
                        <td className="ps-3">#202501﻿2200000001</td>
                    </tr>
                    <tr className="d-block mt-3 mb-">
                        <td className="field-label-name">訂購姓名</td>
                        <td className="ps-3">漩渦鳴人</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">電子郵件</td>
                        <td className="ps-3">ming@gmail.com</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">電話號碼</td>
                        <td className="ps-3">002-81-90-1234-5678</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">訂購日期</td>
                        <td className="ps-3">2025/02/10 23:10 (GMT+9)</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">預約日期</td>
                        <td className="ps-3">2025/03/15 13:00</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">活動名稱</td>
                        <td className="ps-3">染上屬於你的藍：靛藍染布體驗 ｜ 台中</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">活動地點</td>
                        <td className="ps-3">台中市西區向上北路136號2樓(自己做烘焙聚樂部-台中草悟道店)</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">活動時長</td>
                        <td className="ps-3">2 小時</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">訂購人數</td>
                        <td className="ps-3">1 人</td>
                    </tr>
                    <tr className="d-block mt-3 mb-3">
                        <td className="field-label-name">訂單金額</td>
                        <td className="ps-3">800 元</td>
                    </tr>
                </table>
            </div>
            <div className="notes-list order-detail notes-order-detail">
                <div className="notes-info">
                    <h3 className="notes-title">預約與注意事項</h3>
                </div>
                <table>
                    <tr className="reservation-method d-block mt-3 mb-3">
                        <td className="field-label-name">預約方式</td>
                        <td className="ps-3">#202501﻿2200000001</td>
                    </tr>
                    <tr className="notice d-block mt-3 mb-3">
                        <td className="field-label-name">注意事項</td>
                        <td className="notice-list-box">
                            <li className="notice-list">活動提供所有工具及材料，參加者僅需穿著適合手作的輕便衣物</li>
                            <li className="notice-list">每場次最多容納15人，建議提前預約</li>
                            <li className="notice-list">因涉及天然染料操作，活動現場禁止攜帶外食，建議自備水壺</li>
                            <li className="notice-list">活動開始前7天可免費取消或更改場次，7天內取消將酌收50%手續費</li>
                        </td>
                    </tr>
                    <tr className="location d-block mt-3 mb-3">
                        <td className="field-label-name">活動地點</td>
                        <td className="ps-3">台中市西區向上北路136號2樓(自己做烘焙聚樂部-台中草悟道店)</td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="activities order-detail">
            <div className="activities-info">
                <h3 className="activities-title">活動資訊</h3>
            </div>
            <table>
            <tr>
              <td className='activities-img'>
                <img src={OrderDetailImg} alt="藍染布掛曬圖"/>
              </td>
            </tr>
                <tr className="d-block mt-3 mb-3">
                    <td className="field-label-name">活動名稱</td>
                    <td className="ps-3">染上屬於你的藍：靛藍染布體驗 ｜ 台中</td>
                </tr>
                <tr className="d-block mt-3 mb-3">
                    <td className="field-label-name">活動介紹</td>
                    <td className="ps-3">
                        靛藍染布是一種源遠流長的傳統工藝，以天然靛藍染料創造出獨一無二的布料藝術。在這次體驗活動中，我們將帶領參加者親手製作專屬於自己的靛藍染布，感受自然與藝術的結合。無論你是手作初學者，還是工藝愛好者，都可以在這裡找到樂趣與成就感。
                    </td>
                </tr>
                <tr className="d-block mt-3 mb-3">
                    <td className="field-label-name">活動亮點</td>
                    <td className="activities-label-name-box">
                        <li className="activities-label-name">專業指導：由經驗豐富的染布老師帶領，深入了解靛藍染布的歷史、染料製作過程及技巧。</li>
                        <li className="activities-label-name">獨特設計：提供多種染布技法（如夾染、綁染、浸染等），自由創作個人專屬圖案。</li>
                        <li className="activities-label-name">天然材料：採用100%天然靛藍染料，環保無毒，對人體無害。</li>
                        <li className="activities-label-name">手作紀念品：完成的作品可帶回家，成為日常生活中的藝術品或送禮佳品。</li>
                    </td>
                </tr>
                <tr className="d-block mt-3 mb-3">
                    <td className="field-label-name">活動時長</td>
                    <td className="ps-3">2 小時</td>
                </tr>
                <tr className="d-block mt-3 mb-3">
                    <td className="field-label-name">活動費用</td>
                    <td className="ps-3">800 元 / 人</td>
                </tr>
                <tr className="d-block mt-3 mb-3">
                    <td className="field-label-name">人數上限</td>
                    <td className="ps-3">10 人</td>
                </tr>
            </table>
        </div>
    </div>
  );
};

export default OrderDetailPage;


