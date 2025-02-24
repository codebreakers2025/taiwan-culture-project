import { useState } from 'react';

const ActivityPoints = () => {
  // 模擬用戶數據
  const [userData] = useState({
    totalPoints: 2500,
    recentActivities: [
      { id: 1, name: '台北101觀光', points: 100, date: '2025-02-15' },
      { id: 2, name: '九份老街導覽', points: 150, date: '2025-02-14' },
      { id: 3, name: '陽明山健行', points: 200, date: '2025-02-13' }
    ],
    nextReward: {
      points: 3000,
      reward: '免費一日遊'
    }
  });

  return (
   <div className="page-container">
     <div className="container py-4">
      {/* 點數總覽卡片 */}
      <div className="card mb-4 bg-primary text-white">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-8">
              <h3 className="mb-0">我的點數</h3>
              <h2 className="display-4 fw-bold mb-0">{userData.totalPoints}</h2>
            </div>
            <div className="col-4 text-end">
              <i className="bi bi-star-fill fs-1"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 進度條 */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">距離下個獎勵</h5>
          <p className="text-muted">再 {userData.nextReward.points - userData.totalPoints} 點可獲得{userData.nextReward.reward}</p>
          <div className="progress">
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{
                width: `${(userData.totalPoints / userData.nextReward.points) * 100}%`
              }}
              aria-valuenow={userData.totalPoints}
              aria-valuemin="0" 
              aria-valuemax={userData.nextReward.points}
            ></div>
          </div>
        </div>
      </div>

      {/* 最近活動列表 */}
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="mb-0">最近活動</h5>
        </div>
        <div className="list-group list-group-flush">
          {userData.recentActivities.map(activity => (
            <div key={activity.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{activity.name}</h6>
                  <small className="text-muted">{activity.date}</small>
                </div>
                <span className="badge bg-success rounded-pill">
                  +{activity.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default ActivityPoints;