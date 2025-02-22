import PropTypes from 'prop-types';
import './Activity.scss';
import { addFavorites, getFavorites } from '@/utils/api';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';

export const ActivityCard = ({ id, city, images, isFavorited, rating, date, eventType, content, onFavoriteToggle }) => {

const [loading, setLoading] = useState(false);
const [favorite, setFavorite] = useState(false);
const userId = Number(localStorage.getItem("userId"));


const checkExistingFavorite = async () => {
    try {
        const res = await getFavorites(userId);
        console.log("收藏列表:", res);
        return res.some(item => item.isFavorited);
    } catch (error) {
        console.error("檢查收藏狀態出錯:", error);
        return false; // 預設為未收藏
    }
};

const handerAddFavorites = async () => {
    try {
        setLoading(true);

        // 執行新增收藏
        const favoriteData = {
            activityId: id,
            userId: userId,
            isFavorited: true
        };
        await addFavorites(favoriteData);
        setFavorite(true);

        Swal.fire({
            title: "新增成功! 已加入我的收藏",
            icon: "success"
        });

    } catch (error) {
        console.error("收藏操作出錯:", error);
        Swal.fire({
            title: "收藏操作失敗",
            icon: "error"
        });
    } finally {
        setLoading(false);
    }
}

const handleFavoriteClick = async () => {
    if (loading) return; // 防止重複點擊

    console.log("onFavoriteToggle 是:", onFavoriteToggle?.name); // 檢查是哪個函數

    // 通知父組件更新狀態
    onFavoriteToggle?.(id, !favorite);

    const isAlreadyFavorited = await checkExistingFavorite();

    if(isAlreadyFavorited) {
        // 檢查是否已收藏
        console.log("是否已收藏:", isAlreadyFavorited);
        Swal.fire({
            title: "已加入過收藏!",
            text: "請勿重複收藏",
            icon: "warning"
        });
    } else {
        await handerAddFavorites();
    }
};


return (
        <div className="activity-card card mb-3" key={id}>
        <img src={images} className="card-img-top" />
        <div className="activity-card-body card-body">
            <div className="d-flex justify-content-between align-items-center">
            <p className="card-text">{date}·{eventType}</p>
            <span className="rating">★ {rating}</span>
            </div>
            <h5 className="card-title">{city}: {content.title}</h5>
            <p className="card-text">{content.description}</p>
            <span
            className={`material-icons favorite-icon ${favorite ? "favorite" : "favorite_border"} ${loading ? 'disabled' : ''}`}
            onClick={loading ? undefined : handleFavoriteClick}
            style={{ cursor: loading ? 'default' : 'pointer' }}
            >
        {favorite ? "favorite" : "favorite_border"}
        </span>
        </div>
        </div>
    );
};


// PropTypes for validation
ActivityCard.propTypes = {
    id: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    isFavorited: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
    }).isRequired,
    onFavoriteToggle: PropTypes.func.isRequired,
};