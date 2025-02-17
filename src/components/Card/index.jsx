// import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

export const ReviewCard = ({ avatar, name, rating, activityTitle, reviewContent }) => {
    // PropTypes for validation
  ReviewCard.propTypes = {
    avatar: PropTypes.string.isRequired, // 大頭照 URL
    name: PropTypes.string.isRequired, // 用戶名稱
    rating: PropTypes.number.isRequired, // 星星數 (0~5)
    activityTitle: PropTypes.string.isRequired, // 活動標題
    reviewContent: PropTypes.string.isRequired, // 評價內容
  };

  return (
    <div className="card mb-3" style={{ padding: "24px", borderRadius: "40px"}}>
        <div className="row g-0" >
            <div className="col-md-2">
              <img
                  src={avatar}
                  // alt={`${name} ${avatar}`}
                  className="rounded-circle"
                  style={{ width: "64px", height: "64px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-10">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center card-title-wrap">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-rating">
                      {Array.from({ length: 5 }, (_, i) => (
                      <span
                          key={i}
                          className="material-icons"
                      >
                          {i < Math.floor(rating) ? "star" : "star_border"}
                      </span>
                      ))}
                  </p>
                </div>
                <p className="card-text">{reviewContent}</p>
                <h6 className="card-subtitle mb-2">{activityTitle}</h6>
            </div>
            </div>
        </div>
        </div>
    );
};


export const BlogCard = ({ image, title, body, date }) => {
  // PropTypes for validation
  BlogCard.propTypes = {
    image: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    body: PropTypes.string.isRequired, 
  };

  return (
    <>
        <img src={image} alt={title} />
        <p className="card-date">{date}</p>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
    </>
  );
};
