import { getFavoriteAll, getActivityAll, deleteFavorites } from '@/utils/api';
import { useState, useEffect } from "react";
import { ActivityCard } from '@/components/Card/Activity';
import Swal from 'sweetalert2';


const CollectionList = () => {
  const userId = Number(localStorage.getItem("userId")); // 取得 userId
    const [activitiesData, setActivitiesData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        fetchFavorites(); 
  }, [userId]);

// 獲取所有收藏的活動做篩選
const fetchFavorites = async () => {
    setError(null);
    try {
        const favoriteResponse  = await getFavoriteAll();
        // 找出使用者的收藏清單
        const userFavorites = favoriteResponse.filter(fav => 
        fav.userId === userId && fav.isFavorited
      );
        
        fetchActivities(userFavorites);
    } catch (error) {
        setError('Error 無法獲取收藏資料:', error);

    }
};

// 獲取所有的活動資料做篩選
const fetchActivities = async (userFavorites) => {
    setError(null);
    try {
        const activityResponse  = await getActivityAll();
        // 標記已收藏的活動
        const favoritedActivities = activityResponse.filter(activity =>
        userFavorites.some(fav => fav.activityId === activity.id)
      ).map(activity => ({
        ...activity,
        isFavorited: true
      }));
      setActivitiesData(favoritedActivities);
    } catch (error) {
        setError('無法獲取活動資料:', error);

    }
};


 // 處理收藏狀態改變
 const handleFavorite = async (activityId, newState) => {
    // 如果取消收藏，從列表中移除該活動
    if (!newState) {
        await deleteFavorites(activityId);
         Swal.fire({
            title: "取消成功! 已移除我的收藏",
            icon: "success"
        })
        fetchFavorites();
    }
  };


  if (error) {
    return <div className="alert alert-danger">{error}</div>;
}

  return (
    <div className="page-container">
      <div className="main-text text-center">
            <h2 className="section-title">收藏清單</h2>
        </div>
        <div className="row main-body">
        {loading ? (
            <div className="col-12">
                <p className="text-center">載入中...</p>
            </div>
        ) : activitiesData.length > 0 ? (
            activitiesData.map((activity, index) => (
                <div className="col-md-6 col-lg-4" key={`${activity.id}-${index}`}>
                <ActivityCard
                    {...activity}
                    isFavorited={true}
                    onFavoriteToggle={handleFavorite}
                />
                </div>
            ))
        ) : (
            <div className="col-12">
                <p className="text-center">目前沒資料</p> {/* 顯示目前沒資料 */}
            </div>
        )}
        </div>
  </div>
  );
};

export default CollectionList;