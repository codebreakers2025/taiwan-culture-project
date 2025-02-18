import "./ActivityDetailPage.scss";
import { getActivitys } from '@/utils/api';
import { useState , useEffect , useRef } from 'react'; 
import { useParams } from "react-router-dom";

const ActivityDetailPage = () => {

  const [activityData, setActivityData] = useState([]);
  const [activityDetailData, setActivityDetailData] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const  param  = useParams();
  const { id } = param

  const myModal = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    fetchGetActivity(id);
  }, [id]); 


  const fetchGetActivity = async (id) => {
    setLoading(true);
    setError(null);
    try {
        const response  = await getActivitys(id); 
        console.log("API response:", response);
        setActivityData(response); 
        setActivityDetailData(response.activityDetails)
    } catch (error) {
        console.error("Error fetching activity:", error);
        setError('Error fetching activity:', error);
    } 
};




console.log(activityDetailData);
console.log(activityData);




return (
<div className="activity-detail-page container">
<div className="classification">
            <ul>
              <li>首頁</li>
              <li>所有活動</li>
            </ul>
          </div>
  <div className="showContainer">
      <div className="mainPic">

      {Array.isArray(activityDetailData) ? (
          activityDetailData.map((item, index) => (
          <div className="row no-gutter" key={index}>
            {/* 左邊大圖 */}
            <div className="col-12 col-lg-6 no-gutters mainImage-container">
              <img src={item.mainImage} alt={`Main ${index}`} />
            </div>

            {/* 右邊 2x2 小圖 */}
            <div className="col-12 col-lg-6 rightSide">
              <div className="row no-gutters">
                {item.images?.map((image, imgIndex) => (
                  <div className="col-6 no-gutters image-container" key={imgIndex}>
                    <img src={image} alt={`Thumbnail ${index}-${imgIndex}`} />
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
                    <h2 className="actTitle">{activityData.content?.title}<span className='addFavorites'><i className="bi bi-heart" ></i>加入收藏</span></h2>
                    <span className='rating'><span class="material-icons">star</span>{activityData.rating}(2577) <span className='addFavorites'>3K 人參加過</span></span>
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
                      <img src="https://s3-alpha-sig.figma.com/img/102d/84ae/717ca2e741d0f50da08e477670211d7b?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BqQMyptHZ~PNys2QeXVNrKWY4oaL7WiVY7WEgOBntDg5mC-m-TIltecVSpxlaIq6tuXBdZEgiBu1aYQYsc9bB1Clj~A4NwMrChXgD1xoXLpWw4Yyp1patmLcpgyD0NcCAyBmjVnviu2Z2nAtPXo5GDbxBw2qDpufSnaYrJKepgsu6n6SEavwSyiTcJU99H7nMe4NrOecFJ~v3~e-VRFAQ5oCggFFu-um2wWoLYROQBpq3BTBIRmvaR8yMgmIRCPx8mgLRMZSylqgOL9l3qvXIvRBdnlX8DaSeGOA7XRloFcc8mcGyelmEvnZ2vyXNH6~hz3Fei5hc9Gr7xS0zL5Hxw__" 
                      alt="" 
                      className="card-img w-100"
                      style={{objectFit: "cover"}}
                      />
                      </div>
                  </div>
                  <hr/>
                  
                  {Array.isArray(activityDetailData) ? (
                      activityDetailData.map((item, index) => (
                          <div className='activityContent'>
                              <div className='actContentTitle site'>
                                <p>活動介紹</p>
                              </div>
                                  <div className="actPic">
                                      <img src={activityDetailData[0].images[0]} 
                                        alt="" 
                                        className="card-img w-100"
                                        style={{objectFit: "cover"}}
                                      />
                                  
                                  </div>
                                  <div className='contentText'>
                                    <div className='contentTextsmall'>
                                      <p><i className="bi bi-caret-up-fill"></i>高空咖啡廳與紀念品店</p>
                                    </div>
                                    <p className="contentDescribute">{item.sectionOne.description}</p>
                                  </div>

                                  <div className="actPic">
                                      <img src={activityDetailData[0].images[1]} 
                                        alt="" 
                                        className="card-img w-100"
                                        style={{objectFit: "cover"}}
                                      />
                                  
                                  </div>
                                  <div className='contentText'>
                                    <div className='contentTextsmall'>
                                      <p><i className="bi bi-caret-up-fill"></i>夜景時光的浪漫與感動</p>
                                    </div>
                                    <p className="contentDescribute">{item.sectionTwo.description}</p>
                                  </div>
                          </div>

                        ))
                      ) : (
                        <p>Loading...</p>
                    )}

                  <hr/>
                {/*活動評價*/}
                <div className='actContent'>
                      {/*長條圖及星星*/ }
                      <h4 className="card-title ratingTitle">活動評價</h4>
                      <div className="d-flex align-items-center ratingStartDiv">
                        <div style={{width:"176px", height:"105px"}}>
                          <span className="fs-1 fw-bold" style=
                          {{fontSize:"40px", 
                            fontWeight:"700",
                            lineHeight:"48px"
                          }}>4.5</span>
                          <div className="d-flex ratingStart">
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-half text-warning"></i>
                            <i className="bi bi-star"></i>
                          </div>
                          <p className="card-text small"style={{ marginTop:'4.6px',color:"#9E9E9E" }}>2577 則評論</p>
                        </div>

                          <div className="w-50" style={{marginLeft:"32px",height:'121px'}}>
                            <div className="progress" style={{ height: '8px'}}>
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: '90%' }}
                                aria-valuenow="90"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: '80%' }}
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: '60%' }}
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: '40%' }}
                                aria-valuenow="40"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: '20%' }}
                                aria-valuenow="20"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>

                       
                      </div>
                       {/*評論區塊 */}  
                       <div >
                            <div className="row g-0">
                              <div className="col-1 ratingerImg">
                                <div className="roundedCircle">
                                    <img src="https://s3-alpha-sig.figma.com/img/28ff/c488/a36c3a90ed375d62f520a3fb538cd06a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kzISCUDyLGt-j4Sh3wafK-nS1FOnmKl0VzWPgystVuw6c3SeyFmunVFLCPkRlCxcVEqy1qKpTCNIAIU5YD8Qx3dlA8g2MTjUadrc9OXbQvNwMZZi40WSRp5OnILdKPZ7fFDgmhvrfBu8l1Mna5SyD~4wjXBMAvdgT9Vn2safNSm260AEetwb9Be6rfxE7eKSjNHN0aDx2sDbPf5Tc5Rzv41Zo21ECYYTmqQ-SRUzJeGppbW2z1n7222e6nY5EXe9KCpgskWxG2bsrBDgtT6wxhCurCgGZa~oJmJ8lSFr7TTzZwZiAOj0ubmmARgeckwh59mmq0EfljOwClrKHgR4Qw__"
                                    alt="..." 
                                    />
                                </div>
                              </div>
                              {/*單一評論和星星 */}
                              <div className="col-10 ratingContext">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className='ratingName'>技安</span>
                                  <div className='singleRating'>
                                  <i className="bi bi-star-fill text-warning"></i>
                                  <i className="bi bi-star-fill text-warning"></i>
                                  <i className="bi bi-star-fill text-warning"></i>
                                  <i className="bi bi-star-half text-warning"></i>
                                  <i className="bi bi-star"></i>
                                  </div>
                     
                                </div>
                                <p>101裡面的購物中心非常高級,名牌店一應俱全。另外,地下的美食街也非常值得一試,有各式台灣小吃與國際料理,非常方便!</p>
                                
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
                  <button href="#" className="btn btn-primary">選擇日期</button>
                </div>
                </div>
              </div>
            </div>
            
      </div>

      <div className="mobileView">
        <div className="card-body actTitleMobile">
          <h2 className="">NT$420起</h2>
          <div className="callbutton">
          <button href="#" className="btn btn-primary">選擇日期</button>
        </div>
        </div>
      </div>

  </div>


                
</div>

  );
};
  
  export default ActivityDetailPage;