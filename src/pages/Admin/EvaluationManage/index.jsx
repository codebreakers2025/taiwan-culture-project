// 評價管理組件
import { useState, useEffect } from "react";
import { getReviews, getActivityAll, addReviews, updateReviews, deleteReviews } from '@/utils/api';
import ActivityReviewModal from '@/components/Modal/ActivityReviewModal';
import './EvaluationManage.scss';
import Swal from 'sweetalert2';

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
    try {
      const getActivity = await getActivityAll();
      setActivities(getActivity);

      if (data) {
        setNewReview({
            ...data,
            rating: data.rating ?? 5,  // 預設 rating 為 5（避免 undefined）
        });
      } else {
        setNewReview({
            ...initialReviewState,
            rating: 5,  // 預設 rating
        });
      }

      setShowModal(true);
    } catch (error) {
        console.error("Error fetching activities:", error);
    }
  };

  const handleClose = () => {
    setNewReview({ reviewContent: "", activityTitle: "", rating: 0 });
    setShowModal(false);
  };

  const handleSave = async () => {

    if (!newReview.reviewContent || !newReview.activityTitle) {
      Swal.fire({
        icon: "warning",
        title: "請輸入評價內容並選擇活動",
        confirmButtonText: "確定",
      });
      return;
    }
  
    const data = {
      reviewContent: newReview.reviewContent,
      activityTitle: newReview.activityTitle,
      rating: newReview.rating,
      avatar: "https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/avatar/default.png",
      name: userName,
    };
  
    try {
      if (newReview.id) {
        await updateReviews(newReview.id, data);
        Swal.fire({ title: "編輯成功", icon: "success" });
      } else {
        await addReviews(data);
        Swal.fire({ title: "新增成功", icon: "success" });
      }
  
      handleClose();
      await AdminReviewManagement();
    } catch (error) {
      console.error("儲存評價失敗:", error);
    }
    if(id){
      await deleteReviews(id);
      Swal.fire({
        title: "刪除評價成功",
        icon: "success",
      });
      AdminReviewManagement();
    }

  };

  const handleDelete = async (id) => {
    await deleteReviews(id);
    Swal.fire({
      icon: "warning",
      title: "確定是否刪除評論",
      confirmButtonText: "確定",
    });
    await AdminReviewManagement();
  }

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
            <th className="py-3 px-4 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
              <tr key={review.id}>
                <td className="py-3 px-4">{review.id}</td>
                <td className="py-3 px-4 d-flex align-items-center">
                    <div className="avatar-container me-1">
                      <img src={review.avatar} alt="User Avatar" className="avatar-img" />
                    </div>
                    <span className="fw-bold text-dark">{review.name}</span>    
                </td>
                <td className="py-3 px-4">{review.activityTitle}</td>
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
            handleSave={handleSave}
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
