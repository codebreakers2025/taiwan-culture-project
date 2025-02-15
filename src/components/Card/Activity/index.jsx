import PropTypes from 'prop-types';
import './Activity.scss';

export const ActivityCard = ({ id, city, images, isFavorited, rating, date, eventType, content, onFavoriteToggle }) => {
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
    onFavoriteToggle: PropTypes.func.isRequired
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
                className={`material-icons favorite-icon ${isFavorited ? "favorite" : "favorite_border"}`}
                onClick={() => onFavoriteToggle(id)}
            >
                {isFavorited ? "favorite" : "favorite_border"}
            </span>
        </div>
        </div>
    );
};