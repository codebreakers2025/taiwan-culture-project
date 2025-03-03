import React from "react";
import './ActivityList.scss';
import Breadcrumb from "@/components/Breadcrumb"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { addFavorites, getFavorites } from '@/utils/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { getActivityAll , getReviews } from '@/utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'

const PageNation = ({totalPage, setTotalPage, page, setPage}) => {
    const handlePageChange = (page) => {
      setPage(page);
    };

    const renderPaginationButtons = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
      
      return pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={page === pageNumber}
        >
          {pageNumber}
        </button>
));
};


    return(
      <div className="pagenation" >
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          <span className="material-icons">
          chevron_left
          </span>
          </button>
          <div className="currentPage">{renderPaginationButtons()}</div>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={page === totalPage}>
            <span className="material-icons">
            navigate_next
            </span>
          </button> 
        </div>
    )
}

const ActivityList = () => {
  const userId = Number(localStorage.getItem("userId"));
  const [searchResultsData, setSearchResultsData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchingValue , setSearchingValue] = useState([]);
  const [selectedStartDate, SelectedStartDate] = useState('');
  const [selectedEndDate, SelectedEndDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [reviewData, setReviewData] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [totalPage , setTotalPage] = useState(0)
  const [page, setPage] = useState(1); // 頁數狀態
  const limit = 2;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 轉址功能
  const navigate = useNavigate();
  const handleNavigate = (e , activity) => {
      e.preventDefault();
      navigate(`/activity-list/${activity.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" }); // 滑動到最上方
  };

  const fetchGetActivityAll = async () => {
    setLoading(true);
    setError(null);
    try {
        const response  = await getActivityAll();
        
        setSearchData(response)
        setTotalPage(Math.ceil(response.length/limit))
    } catch (error) {
        setError('Error fetching activity:', error);
    } 
};


  const fetchGetActivity = async (page = 1 , limit) => {
    setLoading(true);
    setError(null);
    try {
        const response  = await axios.get(`/api/activity?_page=${page}&_limit=${limit}`);
        setActivityData(response.data); 
    } catch (error) {
        setError('Error fetching activity:', error);
    } 
};
  useEffect(()=>{
    fetchGetActivity(page, limit)
  },[page , limit])
  
  useEffect(() => {
    fetchGetActivityAll()
    fetchGetReview();
    checkExistingFavorite()
}, []);

  const getSearchInput = (value) => {
    setSearchInput(value)

  }
  
  const getSelectedStartDate = (e) => {
    SelectedStartDate(e.target.value)
  };

  const getSelectedEndDate = (e) => { 
    SelectedEndDate(e.target.value);
  };

  const getSelectedType = (e) => {
    setSelectedType(e.target.value);
  };

  const getSelectedSite = (e) => {
    setSelectedSite(e.target.value);
  };

  const getSelectedPrice = (e) => {
    setSelectedPrice(e.target.value);
  };
  useEffect(()=>{
    searchActivity()
  },[page])
  
  const searchActivity = () => {
    if (!searchInput && !selectedStartDate && !selectedEndDate && !selectedType && !selectedSite && !selectedPrice) {
      setSearchResultsData([])
      setSearchingValue([])
      fetchGetActivityAll()
      return;
    }
    setSearchingValue([searchInput , selectedStartDate , selectedType, selectedEndDate, selectedSite, selectedPrice])
    
    const searchResults = searchData.filter((item) => {
      const matchesTitle = searchInput ? item.content?.title?.match(new RegExp(searchInput, 'i')) : true;
      const matchesDate =
      selectedStartDate || selectedEndDate
                ? new Date(item.startDate) >= new Date(selectedStartDate || "1970-01-01") &&
                new Date(item.startDate) <= new Date(selectedEndDate || "2099-12-31")
                : true;
      const matchesType = selectedType ? item.eventType === selectedType : true;
      const matchesSite = selectedSite ? item.city === selectedSite : true;
      const matchesPrice = selectedPrice ? item.price <= selectedPrice : true;
      
      return matchesTitle && matchesDate && matchesType && matchesSite && matchesPrice;
    });
    setTotalPage(Math.ceil(searchResults.length/limit))
    
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    
    const paginatedResults = searchResults.slice(startIdx, endIdx);

    setSearchResultsData(paginatedResults); // Log the filtered results
  };

  const searchBtn = () => {
    setPage(1)
    searchActivity()

  }

  const fetchGetReview = async () => {
    setLoading(true);
    setError(null);
    try{
      const response  = await getReviews();
      setReviewData(response)
    }catch(error){
      console.log(error);
      
    }
  }

  const checkExistingFavorite = async () => {
    try {
        const res = await getFavorites(userId);
        // console.log("收藏列表:", res);
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

const handleFavoriteClick =  async(id) => {
      const isAlreadyFavorited = await checkExistingFavorite();

      if(isAlreadyFavorited) {
        // 檢查是否已收藏
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
    <div className="test-container">
      <div className="content">
        <div className="container">
          {/* 麵包屑 */}
          <Breadcrumb />
          <div className="row">
            <div className="col-lg-3 col-12">
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
                          <input type="date" placeholder="請選擇開始日期" className="date-input" value={selectedStartDate} onChange={getSelectedStartDate}/>
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
                          <input type="date" placeholder="請選擇結束日期" className="date-input" value={selectedEndDate} onChange={getSelectedEndDate} />
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
                      <input type="text" className="form-control" placeholder="請選擇價格區間" value={selectedPrice} onChange={getSelectedPrice}/>
                    </div>
                  </div>
                  {/* 地區選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">地區</span>
                    <div className="list-content">
                      <span className="material-icons">location_on</span>
                      <div className="form-control-dropdown">
                        {/* <div className="dropdown-selected ">地區</div> */}
                        <select name="" id="" className="dropdown-selected " value={selectedSite} onChange={getSelectedSite}>
                          <option value="">請選擇地區</option>
                          <option value="台北">台北</option>
                          <option value="台中">台中</option>
                          <option value="高雄">高雄</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button type="button" className="btn btn-primary" onClick={searchBtn}>搜尋</button>
                </div>
              </div>
              <div className="mobile-bar">
                <button data-bs-toggle="modal" data-bs-target="#exampleModal">
                  篩選
                  <span className="material-icons">keyboard_arrow_down</span>
                </button>
              </div>
            </div>
            <div className="col-lg-9 col-12">
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
                                <p className="card-text">{activity.startDate}·{activity.eventType}</p>
                                <span className="rating">★ {(() => {
                                  const filteredReviews = reviewData.filter(item => item.activityId === activity.id);
                                  if (filteredReviews.length === 0) return 0;
                                  const totalRating = filteredReviews.reduce((sum, item) => sum + item.rating, 0);
                                  return (totalRating / filteredReviews.length).toFixed(1);
                                })()}</span>
                              </div>
                              <h5 className="card-title">{activity.content?.title}</h5>
                              <p className="card-text">{activity.content?.description}</p>
                              <span className={`material-icons favorite-icon ${favorite ? "favorite" : "favorite_border"} ${loading ? 'disabled' : ''}`}
                              onClick={(e)=>handleFavoriteClick(activity.id)}
                              style={{ cursor: loading ? 'default' : 'pointer' }}>{favorite ? "favorite" : "favorite_border"}</span>
                              <span className="paid mt-1">{activity.price}</span>
                              <button className="btn btn-primary activity-btn" onClick={(e) => handleNavigate(e, activity)}>查看更多</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
                <div className="row">
                    {/* Check if no search results and there are search criteria */}
                    {(searchResultsData.length === 0 && searchingValue.length > 0) ? (
                      ""
                    ) : (
                      <div className="col-12">
                        {/* Render Pagination only if there are results */}
                        <PageNation 
                          totalPage={totalPage} 
                          setTotalPage={setTotalPage} 
                          page={page} 
                          setPage={setPage} 
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
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
                          <input type="date" placeholder="請選擇開始日期" className="date-input" value={selectedStartDate} onChange={getSelectedStartDate}/>
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
                          <input type="date" placeholder="請選擇結束日期" className="date-input" value={selectedEndDate} onChange={getSelectedEndDate} />
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
                      <input type="text" className="form-control" placeholder="請選擇價格區間" value={selectedPrice} onChange={getSelectedPrice}/>
                    </div>
                  </div>
                  {/* 地區選擇 */}
                  <div className="mb-4 modal-body-list">
                    <span className="title">地區</span>
                    <div className="list-content">
                      <span className="material-icons">location_on</span>
                      <div className="form-control-dropdown">
                        {/* <div className="dropdown-selected ">地區</div> */}
                        <select name="" id="" className="dropdown-selected " value={selectedSite} onChange={getSelectedSite}>
                          <option value="">請選擇地區</option>
                          <option value="台北">台北</option>
                          <option value="台中">台中</option>
                          <option value="高雄">高雄</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <button type="button" className="btn btn-primary" onClick={searchBtn} data-bs-dismiss="modal">搜尋</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;