// 活動管理組件
import { useState, useEffect } from "react";
import { getActivityAll, addActivitys, updatedActivitys, deleteActivitys } from '@/utils/api';
import './ActivityManage.scss';
import ActivityModal from '@/components/Modal/ActivityModal';
import Swal from 'sweetalert2';


const EventManagement = () => {

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleShow = (event = null) => {
    // console.log(event);
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleClose = () => {

    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleSave = async(currentEvent) => {
    try {
      if (currentEvent.id) {
        await updatedActivitys(currentEvent.id, currentEvent);
        setEvents(
          events.map((event) =>
            event.id === currentEvent.id ? currentEvent : event
          )
        );
        Swal.fire({ title: "編輯成功", icon: "success" });
      } else {
        const newEvent  = await addActivitys(currentEvent);
        setEvents((prevEvents) => [...prevEvents, newEvent ]);
        Swal.fire({ title: "新增成功", icon: "success" });
      }
    } catch(error) {
      console.log("Error adding event", error);
    }
    handleClose();
  };

  const handleDelete = async(id) => {
    try {
      await deleteActivitys(id);
      setEvents(events.filter(event => event.id !== id));
      Swal.fire({ title: "刪除成功", icon: "success" });
    } catch (error) {
      console.log("Error deleting event", error)
    }
  };

  const AdminEventManagement = async() => {
    try{
        const getEvent = await getActivityAll();
        setEvents(getEvent);
    } catch(error){
        console.log(error);
    }
}

  useEffect(() => {
    AdminEventManagement();
}, []); 

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="d-flex align-items-center gap-2 fw-bold fs-4 mb-0">活動管理</h2>
        <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => handleShow()}>新增活動</button>
      </div>

      <div className="card shadow-sm border-0">
      <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr className="bg-light border-bottom">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">名稱</th>
            <th className="py-3 px-4">開始日期</th>
            <th className="py-3 px-4">結束日期</th>
            <th className="py-3 px-4">城市</th>
            <th className="py-3 px-4 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="py-3 px-4">{event.id}</td>
              <td className="py-3 px-4">{event.content?.title}</td>
              <td className="py-3 px-4">{event.startDate}</td>
              <td className="py-3 px-4">{event.endDate}</td>
              <td className="py-3 px-4">{event.city}</td>
              <td className="py-3 px-4">
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleShow(event)}>編輯</button>{' '}
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(event.id)}>刪除</button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>

      <ActivityModal 
        showModal={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />


      
    </div>
  );
};

export default EventManagement;
