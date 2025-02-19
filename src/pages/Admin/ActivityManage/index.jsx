// 活動管理組件
import { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { getActivityAll } from '@/utils/api';
import './ActivityManage.scss';

const EventManagement = () => {
  const [events, setEvents] = useState([]);

    const AdminEventManagement = async() => {
        try{
            const getEvent = await getActivityAll();
            setEvents(getEvent);
        } catch(error){
            console.log(error);
        }
    }

  

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({ id: null, name: "", date: "", status: "" });

  const handleShow = (event = { id: null, name: "", date: "", status: "" }) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (currentEvent.id) {
      setEvents(events.map(e => (e.id === currentEvent.id ? currentEvent : e)));
    } else {
      setEvents([...events, { ...currentEvent, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

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
            <th className="py-3 px-4">日期</th>
            {/* <th>狀態</th> */}
            <th className="py-3 px-4 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="py-3 px-4">{event.id}</td>
              <td className="py-3 px-4">{event.content.title}</td>
              <td className="py-3 px-4">{event.date}</td>
              {/* <td>{event.status}</td> */}
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



      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvent.id ? "編輯活動" : "新增活動"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>活動名稱</Form.Label>
              <Form.Control
                type="text"
                value={currentEvent.name}
                onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>活動日期</Form.Label>
              <Form.Control
                type="date"
                value={currentEvent.date}
                onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>活動狀態</Form.Label>
              <Form.Select
                value={currentEvent.status}
                onChange={(e) => setCurrentEvent({ ...currentEvent, status: e.target.value })}
              >
                <option value="進行中">進行中</option>
                <option value="已結束">已結束</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>取消</Button>
          <Button variant="primary" onClick={handleSave}>儲存</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventManagement;
