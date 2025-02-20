import React, { useState, useEffect } from 'react';

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div className="page-container">
      <h2>訂單資訊</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              訂單號: {order.orderNumber} - 狀態: {order.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>尚無訂單資訊。</p>
      )}
    </div>
  );
};

export default OrderDetail;


