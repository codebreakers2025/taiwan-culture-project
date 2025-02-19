// 評價管理組件
import { useState, useEffect, Fragment } from "react";
import { getReviews, getActivityAll, addReviews, deleteReviews } from '@/utils/api';
import ActivityReviewModal from '@/components/Modal/ActivityReview';
import './EvaluationManage.scss';

const EvaluationManage = () => {
  const [reviews, setReviews] = useState([]);
  const [activities, setActivities] = useState([]);
  const userName = localStorage.getItem("userName");

  const initialReviewState = {
    reviewContent: "",
    rating: 5,
    activityTitle: "",
    avatar: "https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/avatar/default.png",
    name: userName
  };

  const [newReview, setNewReview] = useState(initialReviewState);


    const AdminReviewManagement = async() => {
        try{
            const getReview = await getReviews();
            setReviews(getReview);
        } catch(error){
            console.log(error);
        }
    }
  

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    status: "進行中",
  });

  const handleShow = async(data) => {
    const getActivity = await getActivityAll();
    setActivities(getActivity);
    if(data){
      setNewReview(data);
    } else {
      setNewReview(initialReviewState);
    }
    
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = async() => {
    if (currentEvent.id) {
      setEvents(events.map(e => (e.id === currentEvent.id ? currentEvent : e)));
    } else {
      setEvents([...events, { ...currentEvent, id: Date.now() }]);
    }
    handleClose();

  };

  const handleAdd = async () => {
     if (!newReview.reviewContent || !newReview.activityTitle) {
              return alert("請輸入評價內容並選擇活動");
            }
  
          await addReviews(newReview);
          const data = {
            reviewContent: newReview.reviewContent, 
            activityTitle: newReview.activityTitle, 
            rating: newReview.rating, 
            avatar: "https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/avatar/default.png",
            name: userName
          }
          
          setNewReview(data);
          handleClose();
          AdminReviewManagement();

  }

  const handleDelete = async(id) => {
    if(id){
      await deleteReviews(id);
      alert("刪除評價成功!");
      AdminReviewManagement();
    }

  };

  useEffect(() => {
    AdminReviewManagement();
}, []); 

  return (
    <div className="admin-review-management container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="d-flex align-items-center gap-2 fw-bold fs-4 mb-0">評價管理</h2>
        <button className="btn btn-primary d-flex align-items-center shadow-sm" onClick={() => handleShow()}>新增評價</button>
      </div>
      <div className="card shadow-sm border-0">
      <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr className="bg-light border-bottom">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">使用者名稱</th>
            <th className="py-3 px-4">活動名稱</th>
            <th className="py-3 px-4">評價內容</th>
            {/* <th>狀態</th> */}
            <th className="py-3 px-4 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
              <tr key={review.id}>
                <td className="py-3 px-4">{review.id}</td>
                <td className="py-3 px-4">{review.name}</td>
                <td className="py-3 px-4">{review.activityTitle}</td>
                <td className="py-3 px-4 single-ellipsis">{review.reviewContent}</td>
                <td className="py-3 px-4">
                  <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleShow(review)}>查看</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(review.id)}>刪除</button>
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
          <ActivityReviewModal 
            showModal={showModal}
            handleClose={handleClose}
            handleSave={handleAdd}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
            newReview={newReview}
            setNewReview={setNewReview}
            activities= {activities}
            setActivities = {setActivities}
          />
     
    </div>
  );
};

export default EvaluationManage;
