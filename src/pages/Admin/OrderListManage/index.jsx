import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getOrderAll, createOrder, updateOrder, deleteOrder } from '@/utils/api';
import { Button, Table, Modal, Form } from "react-bootstrap";
import OrderModal from '@/components/Modal/OrderModal';


const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    getDataFetch();
  }, []);

  const getDataFetch = async () => {
    const response = await getOrderAll();
    setOrders(response);
  };

  const handleShow = (order = null) => {
    // console.log(order);
    setCurrentOrder(order);
    setShowModal(true);
  };

  const handleClose = () => {
    setCurrentOrder({
      contactName: '',
      activityName: '',
      activityLocation: '',
      activityPeriod: {
        startDate: '',
        endDate: ''
      },
      timeSlot: '',
      adultCount: 0,
      childCount: 0,
      adultPrice: 200,
      childPrice: 150,
      paymentStatus: "",
      reservedStatus: "",
      totalAmount: 0 
    });
    setShowModal(false);
    // setCurrentOrder(null);
  };

  const handleSave = async (order) => {
    if (order.id){
      await updateOrder(order.id, order);
      Swal.fire({ title: "新成功", icon: "success" });
    }else {
      await createOrder(order);
      Swal.fire({ title: "新增成功", icon: "success" });
    }
    getDataFetch();
    setShowModal(false);
  };

  const handleDelete = async (orderId) => {
    const result = await Swal.fire({
      title: "確定刪除?",
      text: "此操作無法恢復!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "是的, 刪除!",
      cancelButtonText: "取消",
    });
    if (result.isConfirmed) {
      await deleteOrder(orderId);
      getDataFetch();
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="d-flex align-items-center gap-2 fw-bold fs-4 mb-0">訂單管理</h2>
            <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => handleShow()}>新增訂單</button>
        </div>
      
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>下單時間</th>
            <th>活動名稱</th>
            <th>活動期間</th>
            <th>活動時段</th>
            <th>預約人數</th>
            <th>預約狀態</th>
            <th>訂單金額</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.createdAt}</td>
              <td>{order.activityName}</td>
              <td>{order.activityPeriod.startDate} - {order.activityPeriod.endDate}</td>
              <td>{order.timeSlot}</td>
              <td>成人: {order.adultCount}, 兒童: {order.childCount}</td>
              <td>{order.reservedStatus === "reserved" ? "預約中" : order.reservedStatus === "in_progress" ? "進行中" : order.reservedStatus === "cancel" ? "已取消" : "未知的狀態"}</td>
              <td>{order.totalAmount}</td>
              <td>{order.paymentStatus === "PAID" ? "已付款" : order.paymentStatus === "PENDING" ? "尚未付款" : "未知的狀態"}</td>
              <td>
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleShow(order)}>查看</button>{' '}
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(order.id)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <OrderModal 
        showModal ={showModal} 
        handleClose={handleClose}
        handleSave={handleSave} 
        currentOrder={currentOrder}
        setCurrentOrder={setCurrentOrder}
        />
    </div>
  );
  
};

export default OrderManagement;