import { useEffect, useState } from "react";
import { getReviews, addReviews, updateReviews, deleteFavorites, getActivityAll } from '@/utils/api';

const ActivityReview = () => {
    const [reviews, setReviews] = useState([]);
    const [activities, setActivities] = useState([]);
    const [newReview, setNewReview] = useState({
        reviewContent: "",
        rating: 5,
        activityTitle: "",
        user: {
          avatar: "https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/avatar/default.png",
          name: "訪客"
        }
      });

    useEffect(() => {
        // getReview();
        getActivies();
    }, []);


    const getReview = async () => {
        const res = await getReviews();
        setReviews(res);
    };

    const getActivies= async () => {
        const res = await getActivityAll();
        setActivities(res);
    };

    const addReview = async () => {
        // if (!newReview.reviewContent || !newReview.activityTitle) {
        //     return alert("請輸入評價內容並選擇活動");
        //   }

          await addReviews(newReview);
        //   getReview();

        setNewReview({ 
            reviewContent: "", 
            rating: 5, 
            activityType: "", 
            user: {
                avatar: "https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/avatar/default.png",
                name: "訪客"
            },
         });
    };

    const deleteReview = async (id) => {
        await deleteFavorites(id);
        // getReview();
    };

    const updateReview = async (id) => {
        const updatedReview = reviews.find((review) => review.id === id);
        if (!updatedReview) return;
      
        const newContent = prompt("請輸入新的評價內容", updatedReview.reviewContent);
        if (newContent === null || newContent.trim() === "") return;
      
        await updateReviews(id, { ...updatedReview, reviewContent: newContent });
        // getReview();
      };
      

    return (
    <div className="page-container">
        <div className="container">
        <h2>評價留言</h2>

{/* 新增評價 */}
<div className="card mb-3">
    <div className="card-body">
    <div className="mb-3">
        <label className="form-label">活動類型</label>
        <select
            className="form-select"
            value={newReview.eventType}
            onChange={(e) => setNewReview({ ...newReview, eventType: e.target.value })}
        >
            <option value="">請選擇類型</option>
            {[...new Set(activities.map((a) => a.eventType))].map((type) => (
            <option key={type} value={type}>{type}</option>
            ))}
        </select>
        </div>
        <div className="mb-3">
        <label className="form-label">活動名稱</label>
        <select
            className="form-select"
            value={newReview.id}
            onChange={(e) => setNewReview({ ...newReview, activityTitle: e.target.value })}
            disabled={!newReview.eventType}
        >
            <option value="">請選擇活動</option>
            {activities.map((activity) => (
                <option key={activity.id} value={activity.content.title}>
                { activity.content.title}
                </option>
            ))}
        </select>
        </div>
        <div className="mb-3">
        <label className="form-label">評價內容</label>
        <textarea
            className="form-control"
            value={newReview.reviewContent}
            onChange={(e) => setNewReview({ ...newReview, reviewContent: e.target.value })}
        ></textarea>
        </div>
        <div className="mb-3">
        <label className="form-label">評分</label>
        <select
            className="form-select"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
        >
            {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{"⭐".repeat(star)}</option>
            ))}
        </select>
        </div>
        <button className="btn btn-primary" onClick={addReview}>提交評價</button>
    </div>
</div>

{/* 評價列表 */}
{/* <ul className="list-group">
    {reviews.map((review) => {
        const activity = activities.find(a => a.id === review.id);
        return (
        <li key={review.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
            <div><strong>{review.user}</strong> - {"⭐".repeat(review.rating)}</div>
            {activity && <p className="fw-bold">{activity.type} - {activity.name}</p>}
            <p>{review.text}</p>
            {review.reply && <p className="text-muted">管理員回覆: {review.reply}</p>}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteReview(review.id)}>刪除</button>
        </li>
        );
    })}
</ul> */}


        </div>
    </div>
    );
}

export default ActivityReview;