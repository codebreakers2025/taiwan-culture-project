import { ActivityCard, ReviewCard, BlogCard} from '@/components/Card';
import './Home.scss';
import { useTranslation } from 'react-i18next';

import beach from '@/assets/images/choosing/beach.svg';
import communication from '@/assets/images/choosing/communication.svg';
import fishing from '@/assets/images/choosing/fishing.svg';
import travel from '@/assets/images/choosing/travel.svg';



import React, { useEffect, useState } from 'react';
import { getActivity, getJournal, getReviews } from '@/utils/api';


const Home = () => {
    const [activityData, setActivityData] = useState([]);
    const [journalData, setJournalData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGetActivity = async () => {
            try {
                const response  = await getActivity(); // 呼叫 API 函數
                setActivityData(response); // 將取得的資料設置到 state
                // console.log(response);
            } catch (err) {
                setError('Failed to fetch users');
            } 
        };
        const fetchGetJournal = async () => {
            try {
                const response  = await getJournal(); // 呼叫 API 函數
                setJournalData(response); // 將取得的資料設置到 state
                // console.log(response);
            } catch (err) {
                setError('Failed to fetch users');
            } 
        };
        const fetchReviews = async () => {
            try {
                const response = await getReviews();
                setReviews(response); // 將 API 資料存入 reviews
                // console.log(response);
            } catch (err) {
                setError("Failed to fetch reviews");
                console.error(err);
            }
        };

        fetchGetActivity();
        fetchGetJournal();
        fetchReviews();
    }, []); // 空陣列表示只在組件加載時呼叫一次

    const { t } = useTranslation();

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="home">
            <section className="banner-section">
                <div className="container">
                    <h2 className="banner-section-title" dangerouslySetInnerHTML={{ __html: t('searchViewInfo') }}></h2>
                    <div className="search-wrapper">
                        <div className="search-header">
                            <div className="search-input-group">
                                <span className="material-icons search-icon">search</span>
                                <input type="text" className="search-input form-control" placeholder={t('banner.searchPlacehoder')} />
                                <div className="d-flex search-input-inner">
                                    <div className="search-button-more-wrap">
                                        <span className="material-icons search-button-more">tune</span>
                                        <p>{t('banner.search')}</p>
                                    </div>
                                    <span className="material-icons search-button">search</span>
                                </div>
                            </div>
                            <div className="quick-filters">
                                <span className="quick-filter">{t('banner.taichung')}</span>
                                <span className="quick-filter">{t('banner.taipei')}</span>
                                <span className="quick-filter">{t('banner.kaohsiung')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section popular-event-section">
                <div className="container">
                    <div className="main-text text-center">
                        <h2 className="section-title">{t('popularEventTitle')}</h2>
                        <p className="section-subtitle">{t('popularEventSubTitle')}</p>
                    </div>
                    <div className="row main-body">
                        {activityData.length > 0 ? (
                            activityData.map((item) => (
                            <div className="col-md-6 col-lg-4" key={item.id}>
                                <ActivityCard
                                {...item}
                                onFavoriteToggle={(id) => {
                                    setActivityData((prevData) =>
                                        prevData.map((activity) =>
                                            activity.id === id
                                            ? { ...activity, isFavorited: !activity.isFavorited }
                                            : activity
                                        )
                                    );
                                }}
                                />
                            </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p className="text-center">載入中...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="section choosing-section">
                <div className="container">
                    <h2 className="section-title text-center py-4">{t('choosing.mainTitle')}</h2>
                    <div className="main-body">
                        <div className="main-body-section row">
                            <div className="col-md-5 text-center choosing-section-content-wrap">
                                <div className="choosing-section-content">
                                    <img src={ beach } alt="..." />
                                    <div className="main-card-content">
                                        <h5 className="card-title">{t('choosing.content.culturalExperienceTitle')}</h5>
                                        <p className="card-text">{t('choosing.content.culturalExperienceText')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 text-center choosing-section-content-wrap">
                                <div className="choosing-section-content">
                                    <img src={ communication } alt="..." />
                                    <div className="main-card-content">
                                        <h5 className="card-title">{t('choosing.content.reservationPlatformTitle')}</h5>
                                        <p className="card-text">{t('choosing.content.reservationPlatformText')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-body-section row">
                            <div className="col-md-5 text-center choosing-section-content-wrap">
                                <div className="choosing-section-content">
                                    <img src={ fishing } alt="..." />
                                    <div className="main-card-content">
                                        <h5 className="card-title">{t('choosing.content.recommendationsTitle')}</h5>
                                        <p className="card-text">{t('choosing.content.recommendationsText')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 text-center choosing-section-content-wrap">
                                <div className="choosing-section-content">
                                    <img src={ travel } alt="..." />
                                    <div className="main-card-content">
                                        <h5 className="card-title">{t('choosing.content.DeepConnectionTitle')}</h5>
                                        <p className="card-text">{t('choosing.content.DeepConnectionText')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section journal-section">
                <div className="container">
                    <div className="main-text text-center">
                        <h2 className="section-title">{t('journalTitle')}</h2>
                        <p className="section-subtitle">{t('journalSubTitle')}</p>
                    </div>
                    <div className="row main-body">
                        {journalData.length > 0 ? (
                            journalData.map((item) => (
                                <BlogCard
                                    key={item.id}
                                    image={item.images}
                                    date={item.date}
                                    title={item.title}
                                    body={item.body}
                                />
                            ))
                        ) : (
                            <div className="col-12">
                                <p className="text-center">載入中...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="section reviews-section">
                <div className="container">
                    <h2 className="section-title text-center">{t('eventReviews')}</h2>
                    <div className="row main-body">
                        {reviews.length > 0 ? ( 
                            reviews.map((review) => (
                            <div className="col-md-6 col-lg-4" key={review.id}>
                                <ReviewCard
                                    key={review.id}
                                    avatar={review.user.avatar}
                                    name={review.user.name}
                                    rating={review.rating}
                                    activityTitle={review.activityTitle}
                                    reviewContent={review.reviewContent}
                                />
                            </div>
                            ))
                        ) : (
                            <p className='text-center'>目前沒有好評。</p>
                        )}
                       
                    </div>
                </div>
            </section>
    </div>
  );
};

export default Home;