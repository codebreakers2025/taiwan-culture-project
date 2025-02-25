import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrderAll, getActivityAll } from '@/utils/api';
import './OderListPage.scss';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);

   // 標籤狀態
  const [activeTab, setActiveTab] = useState('已預約');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  // 根據標籤篩選訂單
  const filterOrdersByTab = (orders) => {
    switch (activeTab) {
      case '已預約':
        return orders.filter(order => order.reservedStatus === 'reserved');
      case '進行中':
        return orders.filter(order => order.reservedStatus === 'in_progress');
      case '已取消':
        return orders.filter(order => order.reservedStatus === 'cancel');
      default:
        return orders;
    }
  };


    // 時間格式化
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      const responseOrder = await getOrderAll();
      const responseActivity = await getActivityAll();

      // 將活動資料和圖片合併到訂單資料
      const updatedOrders = responseOrder.map(order => {
        const activity = responseActivity.find(
          activity => activity.id === order.activityId
        );
        return { ...order, activity };
      });

      setOrders(updatedOrders);
      } catch (err) {
      console.log("獲取活動資料錯誤:", err);
      } 
  };

  fetchData();
  }, []);

  return (
    <div className="page-container order-list-page">
        <div className="container py-4">
      <h2 className="mb-4 text-center">我的訂單</h2>
      
      {/* 標籤導航 */}
      <ul className="nav nav-tabs mb-4">
        {['已預約', '進行中', '已取消'].map(tab => (
          <li className="nav-item" key={tab}>
            <button 
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      
      {/* 訂單列表 */}
      <div className="row">
        {filterOrdersByTab(orders).length > 0 ? (
          filterOrdersByTab(orders).map(order => (
            <div className="col-lg-12 mb-4" key={order.id}>
              <div className="card h-100 shadow-sm">
                <div className="row g-0">
                  <div className="col-lg-5">
                    <div className="h-100 d-flex align-items-center justify-content-center">
                    {order.activity && order.activity.images && (
                      <img
                        src={order.activity.images}
                        alt={order.activity.name}
                        className="card-img"
                      />
                    )}
                      {/* <span className="text-white fw-bold">{order.activityName.substring(0, 2)}</span> */}
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="card-body d-flex flex-column h-100">
                      <h5 className="card-title">{order.activityName}</h5>
                      <p className="card-text mb-1">預約時間: {order.activityPeriod.startDate} {order.timeSlot}</p>
                      <p className="card-text mb-2">訂單編號: {order.id}</p>
                      <div className="mt-auto text-end">
                        <Link to={`/member-center/order-management/detail/${order.id}`} className="btn btn-sm custom-btn">查看詳情</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">目前沒有{activeTab}的訂單</p>
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default OrderListPage;


