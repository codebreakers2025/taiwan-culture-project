import "./ActivityDetailPage.scss";
import { getActivitys , getUsers } from '@/utils/api';
import { useState , useEffect , useRef } from 'react'; 
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { Outlet, useParams , Link , useNavigate , useLocation} from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'


const MapComponent = ({activityDetailData}) => {

  if (!activityDetailData || !activityDetailData[0]?.location) {
    return <p style={{marginLeft:'auto'}}>找不到活動資訊</p>; // ✅ 這樣才對
  }

  const { latitude, longitude } = activityDetailData[0].location;

  useEffect(() => {
    if (!document.getElementById("map")._leaflet_id) {
    const map = L.map('map').setView([latitude, longitude], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
    }
  }, [latitude, longitude]);

  return <div id="map" style={{ height: '500px' }}></div>;
};

  
const ReviewBars = ({ reviewData }) => {
  const [reviewPercentage , setReviewPercentage] = useState([])
  
  useEffect(()=>{
    const ratingCounts = {};
    const totalReviews = reviewData.length;


    reviewData.length===0 ? {0:0} :   reviewData.map((item)=>{
      if ( !ratingCounts[item.rating] ) {
        ratingCounts[item.rating] = 1;
      }else{
        ratingCounts[item.rating] += 1
      }
    })
    
    const calculatedReviewData = Object.entries(ratingCounts).map(([rating, count]) => ({
      
      rating: Number(rating),
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    }));

  setReviewPercentage(calculatedReviewData.reverse())
  },[reviewData])


  return (
    <div style={{ width: "300px", marginLeft: "32px" }}>
      {reviewPercentage.map(({ rating, percentage }, index) => {
        return (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ width: "60px", textAlign: "right", marginRight: "8px" }}>
              {rating} ⭐
            </span>
            <div
              className="progress"
              style={{ width: "200px", height: "12px", backgroundColor: "#e9ecef", borderRadius: "4px" , marginBottom:'0px'}}
            >
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${percentage}%`,
                height: "100%",
                }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


const ActivityDetailPage = () => {

  const userId = Number(localStorage.getItem("userId"));
  const [activityData, setActivityData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [activityDetailDataImages, setActivityDetailDataImages] = useState([]);
  const [activityDetailData, setActivityDetailData] = useState({});
  const [showMainImage, setShowMainImage] = useState("");
  const [getReservationData , setGetReservationData] = useState({})
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [RatingstarAll , setRatingStarAll] = useState([])
  const [Ratingstar , setRatingStar] = useState(0)
  const [avgRatingstar , setAvgRatingStar] = useState(0)
  const [totalPage , setTotalPage] = useState(0)
  const [page, setPage] = useState(1); // 頁數狀態
  const limit = 2;
  const [submitdData, setSubmitData] = useState({
    "id": "ORD202402220001",
    "userId":"",
    "event_id": "",
    "createdAt": "2024-02-22 15:30:25",
    "contactName": "王小明",
    "activityName": "台北一日遊",
    "location": "",
    "image":"image",
    "last_bookable_date":"",
    "activityLocation": "台北市信義區信義路五段7號",
    "activityPeriod": {
      "startDate": "2024-03-15",
      "endDate": "2024-03-23"
    },
    "adultCount": 4,
    "childCount": 3,
    "adultPrice": 150,
    "childPrice": 120,
    "timeSlot": "09:00-17:00",
    "totalAmount": 960,
    "paymentStatus": "PAID"
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const  param  = useParams();
  const { id } = param
  const navigate = useNavigate();

  const getReverseData = async() => {
    try{
      const response = await axios.get(`/api/reservationData/${id}`)
      setGetReservationData(response.data) 
    }catch(error){
    }
  }

  const getUser = async() => {
    try{
      const response = await getUsers(userId);  
    }catch(error){
    }
  }

  const getReviewsAll = async (id) => {
    const response = await axios.get(`/api/reviews?activityId=${id}`);
    setTotalPage(Math.ceil(response.data.length/limit))
    setRatingStarAll(response.data)
    
};

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

useEffect(() => {
  fetchGetReview(id , page, limit); // 這裡傳遞 page 和 limit
}, [page]); // 監聽 page 變數，變更時重新獲取數據


const getReviews = async (id , page = 1, limit = 2) => {
  console.log(id);
  const response = await axios.get(`/api/reviews?activityId=${id}&_page=${page}&_limit=${limit}`);
  return response.data;

};
  


  useEffect(() => {
    fetchGetActivity(id);
    fetchGetReview(id);
    getReviewsAll(id);
    getReverseData(id);
  }, [id]); 
  useEffect(()=>{
    getUser();
  },[])

  const fetchGetReview = async (id, page = 1, limit) => {
    setLoading(true);
    setError(null);
    try {
        const response = await getReviews(id, page, limit) // 傳入當前頁數與每頁顯示數量
        setReviewData(response);
    } catch (error) {
        console.log(error);
        setError(error);
    } finally {
        setLoading(false);
    }
};

useEffect(()=>{
  reviewData.length === 0 ? setRatingStar(0) : setRatingStar(reviewData.reduce((sum , item)=> sum + item.rating, 0) / Number(reviewData.length))
  RatingstarAll.length === 0 ? setAvgRatingStar(0) : setAvgRatingStar((RatingstarAll.reduce((sum , item)=> sum + item.rating, 0) / Number(RatingstarAll.length)).toFixed(2))
},[reviewData , RatingstarAll])

  const fetchGetActivity = async (id) => {
    setLoading(true);
    setError(null);
    try {
        const response  = await getActivitys(id); 
        setActivityData(response); 
        response.activityDetails.length===0 ? " " : setActivityDetailData(response.activityDetails)
        response.activityDetails.length===0 ? " " : setActivityDetailDataImages(response.activityDetails?.[0]?.images)
        setShowMainImage(
          response?.activityDetails?.[0]?.images?.length > 0 
          ? response.activityDetails[0].images[0].description.image  // 取得第一張圖片
          : "Loading" )
    } catch (error) {
        console.error("Error fetching activity:", error);
        setError('Error fetching activity:', error);
    } 
};


const renderStars = (rating) => {
  
  const fullStars = Math.floor(rating); // 取得完整的星星數量
  const hasHalfStar = rating % 1 !== 0; // 是否有半顆星
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 剩餘的空星數量

  return (
    <>
      {/* 實心星星 */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={index} className="material-icons">star</span>
      ))}

      {/* 半顆星 */}
      {hasHalfStar && <span className="material-icons">star_half</span>}

      {/* 空星 */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={`empty-${index}`} className="material-icons">star_border</span>
      ))}
    </>
  );
};

const handleDateClick = (date) => {
  
  setSelectedDate(date);
  const dateData = getReservationData[date];
  setSelectedData(dateData);
  setSubmitData((preData) => ({
    ...preData,
    userId: userId,
    event_id: id,
    activityName: activityData.content?.title,
    image: activityData.images,
    location: activityData.city,
    last_bookable_date: date, // 更新最後可預約日期
  }));
};

const submitDateClick = () => {
  if(selectedData===null){
    alert("請輸入日期")
    return
  }

    setTimeout(() => {
      navigate("/activity-list/booking1" ,{ state: submitdData }); // 跳轉到預約頁面
    }, 300); // 帶著資料跳轉到預約頁面
};
const renderDay = (day) => {

  const date = `2025-01-${day < 10 ? `0${day}` : day}`;
  if (!getReservationData) return null; // 確保有資料
  const reservation = getReservationData[date];
  const isAvailable = !!reservation; 
  return (
    <div className="day" key={day} >
      <button 
        onClick={isAvailable ? () => handleDateClick(date) : null }
        disabled={!isAvailable}
        style={{
          backgroundColor: selectedDate === date ? '#4DAAB0' : 'transparent', // 當前選中的日期顯示背景顏色
          color: selectedDate === date ? 'white' : 'black', // 當前選中的日期顯示文字顏色
          borderRadius: '8px', // 圓角
          fontSize: '14px',
          display: 'inline-block',
          cursor: isAvailable ? 'pointer' : 'not-allowed', // 如果有資料，游標為指針，否則為禁止符號
          opacity: isAvailable ? 1 : 0.5
        }}
      >
        {day}
        {reservation && (
          <div style={{color:selectedDate === date ? 'white' : '#616161'}}>
            <small>價格 :666</small>
            <small>剩餘 :{reservation.remaining}</small>
          </div>
        )}
      </button>
    </div>
  );
};

return (
<div className="activity-detail-page container">

  <div className="showContainer">
    
      <div className="mainPic">

      {Array.isArray(activityDetailData) ? (
          activityDetailData.map((item, index) => (
            
          <div className="row no-gutter" key={index}>
            {/* 左邊大圖 */}
            <div className="col-12 col-lg-6 no-gutters mainImage-container">
              <img src={showMainImage} alt={`Main ${index}`} />
            </div>

            {/* 右邊 2x2 小圖 */}
            <div className="col-12 col-lg-6 rightSide">
              <div className="row no-gutters">
                {item.images?.slice(1).map((image, imgIndex) => (

                  <div className="col-6 no-gutters image-container" key={imgIndex}>
                    <img src={image?.description?.image} alt={`Thumbnail ${index}-${imgIndex}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          ))
        ) : (
          <p>Loading...</p>
      )}



      </div>
      <div className="mainContent">
      <div className="row g-0" >
              <div className="card col-lg-8 titleArea" >
                <div className="card-body actTitleBody">
                  <div className='actTitleDiv'>
                    <h2 className="actTitle" >{activityData.content?.title}

                      <button className='addFavorites'><span className="material-icons favoriteHeart">favorite_border</span><span>加入收藏</span></button>
                      
                    </h2>
                    <span className='rating'><span className="material-icons">star</span>{avgRatingstar}({RatingstarAll.length}) <span className='addFavorites'>{RatingstarAll.length} 人參加過</span></span>
                  </div>
                  <hr />
                  <div className='actContent'>
                      <div className='actContentTitle'>
                        <p>行程特色</p>
                      </div>
                      <p className="card-text">{activityData.content?.description}</p>
                        
                  </div>
                  <hr/>
                    
                </div>

                <div className="card-body actTitleBody">
                  <div className='siteContent'>
                      <div className='actContentTitle site'>
                        <p>地點</p>
                      </div>
                      <div className="siteMap">
                        <MapComponent activityDetailData={activityDetailData} />
                      </div>
                  </div>
                  <hr/>
                  <div className="activityContent">
                      <div className='actContentTitle site'>
                        <p>活動介紹</p>
                      </div>
                        {Array.isArray(activityDetailDataImages) ? (
                            activityDetailDataImages.map((item, index) => (
                                <div key={index}>
                                  <div className="actPic">
                                      <img src={item?.description?.image} 
                                        alt="" 
                                        className="card-img w-100"
                                        style={{objectFit:"cover"}}
                                      />
                                  
                                  </div>
                                  <div className='contentText'>
                                    <div className='contentTextsmall'>
                                      <span className="material-icons">arrow_drop_up</span><p>{item?.description?.descriptionOne}</p>
                                    </div>
                                    <p className="contentDescribute">{item?.description?.context}</p>
                                  </div>
                                </div>

                         ))
                            ) : (
                              <p>Loading...</p>
                          )}
                    
                  </div>

                  <hr/>
                {/*活動評價*/}
                <div className='actContent'>
                      {/*長條圖及星星*/ }
                      <h4 className="card-title ratingTitle">活動評價</h4>
                      <div className="d-flex align-items-center ratingStartDiv">
                      <div style={{ width: "176px", height: "105px" }}>
                        <span
                          className="fs-1 fw-bold"
                          style={{
                            fontSize: "40px",
                            fontWeight: "700",
                            lineHeight: "48px"
                          }}
                        >
                          {avgRatingstar}
                        </span>
                        <div className="d-flex ratingStart">
                          {renderStars(Ratingstar)} {/* ⭐ 渲染動態星星 */}
                        </div>
                        <p className="card-text small"style={{ marginTop:'4.6px',color:"#9E9E9E" }}>{reviewData.length} 則評論</p>
                      </div>

                          <div className="w-50" style={{marginLeft:"32px",height:'121px'}}>
                            <ReviewBars reviewData={reviewData} />
                          </div>

                       
                      </div>
                       {/*評論區塊 */}  
                       <div >
                          {(reviewData.length > 0) ? (reviewData.map((item,index)=>
                                
                            <div className="row reviewRow g-0" key={index}>
                              <div className="col-1 ratingerImg">
                                <div className="roundedCircle">
                                    <img src={item.user.avatar}
                                    alt="..." 
                                    />
                                </div>
                              </div>
                              {/*單一評論和星星 */}
                              <div className="col-10 ratingContext">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className='ratingName'>{item.user.name}</span>
                                  <div className='singleRating'>
                                  {renderStars(item.rating)}
                                  </div>
                     
                                </div>
                                <p>{item.reviewContent}</p>
                                
                              </div>
                              <div className="ratingImage">
                                  <div className='imageBox'>
                                    <img src="https://s3-alpha-sig.figma.com/img/e43c/4ddc/24e2eec1f3e6bac5d8bfafccf14caa44?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OaEACSJq6KxJtq7Qk0mwZ2RH8X7LRUHQUIFvj5K5XCjEcTorXtX4w5IREGZypQAhIMNS6BTfjqI0CtOjXzqpYSrC2x1khppSt17rxdCNGCr2r5oqsnSDnixWcKEf6kAtqyDY1LjUBFDbawtPSgVmAOwndyeNEG--cQounJl0DKgf-H7o5bStPIl7lCDgnmJT3aQMNNCWVf2XktLIuzv5dgdnIof2veJLhXn7UzN4D1w6qFh9mb7njhhT6dxNbUPo-4CdHOaynkQcAv6x3lckI-fQcB9kxLeaqmtpytvQRj952vbPlQqVokWG3FrbOd2BtsTGb~OnvnWEYXys9KsUbg__" alt=""  />
                                  </div>
                                  <div className='imageBox'>
                                    <img src="https://s3-alpha-sig.figma.com/img/9922/f9fd/3bd52448703b8cf5f15fb1df56141e94?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RyLBREEx4No7oLNSzIaQq41yZQjXXOk1RGCdwmnBhSCCLRaOkU9TOwhr2PbDa8ST09DJCjHIQf-d9T4UNBXyN1KJzniWe2DX1PozR6RQCORklrFUtan3reA8rD9uIoMh9-WxnSg8RuvWW9XbEIZ2tUcrAg1h82XZAZVODO73R2qcvPXWaF9a5AqAMaWcouS-~-ms0xWDhsc4p8Z8g2gIH6F442oGRwaZeiE26t3zb~V2u0jFsjtMYTExmBJH8fcwBsCqC6RE9d4gsFZ52UKM53Nvu-sf7gcoXsneM0XV67ZdoXOTHGfZYlItUTbIaPzSO9lqQd1l96ayC6QODspl8g__" alt=""  />
                                  </div>
                                </div>
                                
                            </div>
                            
                            
                          )) : (<p>No review found.</p> )}
                              <div className="pagenation" >

                              <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                              <span class="material-icons">
                              chevron_left
                              </span>
                              </button>
                              <div className="currentPage">{renderPaginationButtons()}</div>
                              <button onClick={() => setPage((prev) => prev + 1)}>
                                <span class="material-icons">
                                navigate_next
                                </span>
                              </button> 
                              </div>
                        </div>
                </div>

                {/*最上面的2個DIV*/ }
                </div>
              </div>
              {/*CallToAction */}
              <div className="card priceArea addDateTime col-lg-4">
                <div className="card-body priceAreatitle">
                  <h2 className="actTitle">NT$420起</h2>
                  <div className="callbutton">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    選擇日期
                  </button>
                </div>
                </div>
              </div>
            </div>
            
      </div>

      <div className="mobileView">
        <div className="card-body actTitleMobile">
          <h2 className="">NT$420起</h2>
          <div className="callbutton">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            選擇日期
          </button>
        </div>
        </div>
      </div>

  </div>



<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modalBody">
              <div className="getActDate" >
                      <div className="calendar">
                        <div className="calendar-header">
                            <p>2025年1月</p>
                        </div>
                        <div className="week-days">
                            <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
                        </div>
                        <div className="days">
                        {[...Array(31)].map((_, index) => renderDay(index + 1))}
                        </div>
                      </div>      
              </div>
            </div>
            <div className="getActDateFooter">
              <button type="button" data-bs-dismiss="modal" onClick={submitDateClick}>預約行程</button>
            </div>
    </div>
  </div>
</div>


                
</div>

  );
};
  
  export default ActivityDetailPage;