import { ActivityCard} from '@/components/Card/Activity';
import './ActivityList.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { getActivityAll } from '@/utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ActivityList = () => {
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchingValue , setSearchingValue] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 轉址功能
  const navigate = useNavigate();
  const handleNavigate = (e , activity) => {
      navigate(`/activity-list/${activity.detailsId}`);
      window.scrollTo({ top: 0, behavior: "smooth" }); // 滑動到最上方
  };

  const fetchGetActivity = async () => {
    setLoading(true);
    setError(null);
    try {
        const response  = await getActivityAll(); 
        setActivityData(response); 
    } catch (error) {
        setError('Error fetching activity:', error);
    } 
};

  useEffect(() => {
    fetchGetActivity();
}, []);

  const getSearchInput = (value) => {
    setSearchInput(value)

  }
  
  const getSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const getSelectedType = (e) => {
    setSelectedType(e.target.value);
  };
  console.log(selectedType);

  const searchActivity = () => {
    console.log('Searching for:', { searchInput, selectedDate, selectedType });
    setSearchingValue([searchInput , selectedDate , selectedType])
    const searchResults = activityData.filter((item) => {
      const matchesTitle = searchInput ? item.content?.title?.match(new RegExp(searchInput, 'i')) : true;
      const matchesDate = selectedDate ? new Date(item.date).toISOString().slice(0, 10) === selectedDate : true;
      const matchesType = selectedType ? item.eventType === selectedType : true;
      
      return matchesTitle && matchesDate && matchesType;
    });
    console.log(searchResults);
    
    setSearchResultsData(searchResults); // Log the filtered results
  };
  
  console.log(searchingValue);
  
  const searchBtn = () => {
    searchActivity(searchInput)

  }
  
  return (
    <div className="test-container">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="left-searchBar">
                <div className="body">
                  {/* 搜尋關鍵字 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">關鍵字搜尋</span>
                    <div className="list-content">
                      <span className="material-icons">search</span>
                      <input type="text" className="form-control" placeholder="搜尋關鍵字" value={searchInput} onChange={(e) => getSearchInput(e.target.value)}   />
                    </div>
                  </div>
                  {/* 日期選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">起始日期</span>
                    <div className="list-content">
                      <span className="material-icons">today</span>
                      <div className="react-datepicker-wrapper">
                        <div className="react-datepicker__input-container">
                          <input type="date" placeholder="請選擇開始日期" className="date-input" value={selectedDate} onChange={getSelectedDate}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 modal-body-list">
                    <span className="title">結束日期</span>
                    <div className="list-content">
                      <span className="material-icons">today</span>
                      <div className="react-datepicker-wrapper">
                        <div className="react-datepicker__input-container">
                          <input type="text" placeholder="請選擇結束日期" className="date-input" value="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 類型選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">活動類型</span>
                    <div className="list-content">
                      <span className="material-icons">directions_walk</span>
                      <div className="form-control-dropdown">
                        {/* <div className="dropdown-selected ">類型</div> */}
                        <select name="" id="" className="dropdown-selected " value={selectedType} onChange={getSelectedType}>
                          <option value="">請選擇活動類型</option>
                          <option value="一日行程">一日行程</option>
                          <option value="特色體驗">特色體驗</option>
                          <option value="戶外探索">戶外探索</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* 價格輸入 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">價格</span>
                    <div className="list-content">
                      <span className="material-icons">paid</span>
                      <input type="text" className="form-control" placeholder="請選擇價格區間" value="" />
                    </div>
                  </div>
                  {/* 地區選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">地區</span>
                    <div className="list-content">
                      <span className="material-icons">location_on</span>
                      <div className="form-control-dropdown">
                        {/* <div className="dropdown-selected ">地區</div> */}
                        <select name="" id="" className="dropdown-selected ">
                          <option value="">請選擇地區</option>
                          <option value="">台北</option>
                          <option value="">台中</option>
                          <option value="">高雄</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button type="button" className="btn btn-primary" onClick={searchBtn}>搜尋</button>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="right-content">
              <div className="row">
                  {/* Check if no search results and there are search criteria */}
                  {(searchResultsData.length === 0 && searchingValue.length > 0) ? (
                    <div className="col-12">
                      <p>No activities found.</p>
                    </div>
                  ) : (
                    // If there are search results, show them; otherwise, show all activities
                    (searchResultsData.length > 0 ? searchResultsData : activityData).map((activity, index) => (
                      <div className="col-md-6 col-lg-4" key={index}>
                        <div className="card mb-3">
                          <img src={activity.images} className="card-img-top" alt="activity" />
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text">{activity.date}·{activity.eventType}</p>
                              <span className="rating">★ {activity.rating}</span>
                            </div>
                            <h5 className="card-title">{activity.content?.title}</h5>
                            <p className="card-text">{activity.content?.description}</p>
                            <span className="material-icons favorite-icon favorite_border">favorite_border</span>
                            <span className="paid mt-1">666</span>
                            <button className="btn btn-primary activity-btn" onClick={(e) => handleNavigate(e, activity)}>查看更多</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ActivityList;