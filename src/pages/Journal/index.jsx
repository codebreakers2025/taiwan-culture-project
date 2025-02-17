import { ActivityCard, ReviewCard, BlogCard} from '@/components/Card';
import "./Journal.scss";
import { useState , useEffect , useRef } from 'react'; 
import axios from 'axios';
import * as bootstrap from "bootstrap"; 

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'

const About = () => {

const myModal = useRef(null)
  const modalRef = useRef(null)
  

  useEffect(()=>{
    myModal.current = new bootstrap.Modal(modalRef.current);
  },[])

  const openModal = () => {
    myModal.current.show()
  }

  const closeModal = () => {
    myModal.current.hide()
  }
  

return (
<div className="container">
<div className="classification">
            <ul>
              <li>首頁</li>
              <li>所有活動</li>
            </ul>
          </div>
  <div className="showContainer">
      <div className="mainPic">
        <div className="row no-gutter" >
            {/* 左邊大圖 */}
            <div className="col-12 col-lg-6 no-gutters mainImage-container">
            <img src="https://s3-alpha-sig.figma.com/img/665f/b1a8/2d0adf68f28e6c63ac31fc5bd0f59c44?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ap4XkAX~SNt5-M45VK-t57-sMPh3UEXSVIFzpELFXu4nQnBIbuKsaQwCo~dCnKBu2SAEcStJ9QZ8Hbbhk~d2AlHPnRt-QfVB0L9MI6Pz13m25ln1GS~w2tY95nSKqaOl4EiBCk3ggKHkr5YfumT61KuFxV7oImVM2EYSHJDHynaT50yZrYdTZjHHj1m8XEg~c~cVEj9FDCdqN-jWGfhytbr-87Y7X~1hZFGxcgkqajwnC5MPFg2Jd1-1a~WvtEkxbXFrdIqdIvaeNiYQSKAj6gMC~fUF1BG3cFGzVN-YnizjJodW9B0OHit2Y~BruaPVdZCb8VgC73-iIYgXtJk76w__"/>
            </div>

            {/* 右邊 2x2 小圖 */}
            <div className="col-12 col-lg-6 rightSide">
                <div className="row no-gutters">
                  <div className="col-6 no-gutters image-container">
                    <img src="https://s3-alpha-sig.figma.com/img/6e7a/4ca8/249b7d739c498c36aea46edfb7374312?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cr3lD7b~ONk7wHBtc66guxcvbgYn-SZfWW5VkxEAeGh4C87EMyOFMTDFrPfyNqEh24lI3m4Zjy9W4OoNrTbUEZA6nX7FlXqoRAf~-KUa46WO8MytW4h0k42ydT-7QX94wp21UDnGBuuXbxDm-HoQyzCsKtP4kUUsVkZvCBM2~8UyRLI7RLk1~Lieu-BzKjXU4dojzQzH18srlfGA-ZHyceVT9SfepD39uA3OSDczwvKtvOOe2PUgwTKlg6gCUr0vj2d9S3E7ODNPcg2IUvMQjLs003~AMnxINLfZvkVIA~tk921oyC~wt23KuCIptdgAfJPztefcwS9PPEjz4GbWIA__" /> {/* 添加 alt 属性 */}
                  </div>
                  <div className="col-6 no-gutters image-container">
                    <img src="https://s3-alpha-sig.figma.com/img/fa61/f654/75a71a516edd356bd7a19bfa84b3892c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=McNTyd~L82EyUY~3zO-1HBAocly6JUuZUt6rJpep8cHshZa~ZTZM1rqnw6M886obOFGs8kj5ub5sKMvHQGCcmPwg9rfLSaJklQ5OPOnfmsD~YyNS2J7v65RmH8YqxV3vkR0~yZYR9pylVJTUonFRNpXSRfR3lcSXWg9AbRVPJJZ9lAvJ3cDN8pY~yqMamnKgRCvNBmJi3Ha1ZGnkvs8RuYWxoio0zDnyxzaiZ8f~kOVwHZ0cC8etYDFZ1fk4102w4p8bmvBNVAxdqDp4ACnmdfACrGKqt4pDPIbbQvzQnReL4fMX3YbeF8qEV9eIL93Odrr248pTLoJ8UD4EyCFolA__" /> {/* 添加 alt 属性 */}
                  </div>
                  <div className="col-6 no-gutters image-container">
                    <img src="https://s3-alpha-sig.figma.com/img/36a1/37b7/b0e4b81b6a0434bd190934ab66a4b50b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=b5orXYM-Y4o3iI1lPAYt-GX-jp4CcGtkMiaBveJtLg~L9pYg98cfgbx4iORDg1Y3zv~RqimmHjH6lE6o79htEcBNSMWICu6ucQQmsd6cMP8o60RHLvnRgpUMATEEDZU8bLyzpitIxhXzB-u4kh9bQMcGYom2E9wqgVXtL-FVyknDeFIwQyfutepxNtEL5LLSqZbjFbZAPRixqCj0f3X-qS2jXnIvcQgdErJ~Kaa4Ov4lt72iq0yGOPleB~hb3CrYK8k1mR3abAc1f1Sv1buT1prEYFi3tjeSCBAdDopQaVnP8AQkZcL2CJSazaoB4mx911E3fD0wLIl6iAw7~1270g__" /> {/* 添加 alt 属性 */}
                  </div>
                  <div className="col-6 no-gutters image-container">
                    <img src="https://s3-alpha-sig.figma.com/img/00dd/5c61/5ab96211e580817298a18eb07f1f2247?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qwG8bL618nwhpqWsVSmX3f5Isxn7QguaIwPMGKN-slj~-rW2Krs-uK9jkf1QPtFrXr-SwGYGHm6kTqr2PGaQ1r9JdqJSpdblNmfDCw7KhkiWcEGJByM-OYmZSx6ZVDeolFo8-rUUFedDOASg44dQkuRNl4ayHptSWd1mwS32vcQi1hyW5J5aVCDeuyWuF5vQjwubb8u2Ctt0rzPdSNgwLJwnczX9L~AwZej4fNl~~S6jpzfBBodjUequwjShaMHhiN-5SJP-fMoUnuZQ-w2sYPxECZe7qWGToKf~IRyfR1XEDHGFb4T4OkWPWLbqO958qpWXIkIWbKZm7jdTVPrxnw__" /> {/* 添加 alt 属性 */}
                  </div>
                </div>
            </div>
        </div>
      </div>
      {/* 詳細活動 */}
      <div className="mainContent">
      <div className="row g-0" >
              <div className="card col-lg-8 titleArea" >
                <div className="card-body actTitleBody">
                  <div className='actTitleDiv'>
                    <h2 className="actTitle">經典行程＆高美濕地一日遊<span className='addFavorites'><i className="bi bi-heart" ></i>加入收藏</span></h2>
                    <span className='rating'><i className="bi bi-star-fill"></i>4.5(2577) <span className='addFavorites'>3K 人參加過</span></span>
                  </div>
                  <hr />
                  <div className='actContent'>
                      <div className='actContentTitle'>
                        <p>行程特色</p>
                      </div>
                      <p className="card-text">即訂即出台北101觀景台門票，掃 QR-Code 快速入場！搭乘世界超快速度電梯，抵達觀景台，登上台灣第一高樓，俯瞰大台北城市夜景，盡享全視野景觀！</p>
                        <p>【限時特展活動】</p>
                        <p>101 x 大谷翔平「50/50紀念球」</p>
                        <p>夢想高飛特展 ⚾ 89樓觀景台｜即日起至2025/3/2 必看亮點:</p>
                        <li>
                        1.大谷翔平「50/50紀念球」
                      </li>
                      <li>
                        2.Team Taiwan全員簽名球
                      </li>
                      <li>
                        3.冠軍隊簽名球衣
                      </li>
                      <li>
                        4.比賽實戰壘包
                      </li>
                  </div>
                  <hr/>
                    
                </div>
                {/* 地點 */}
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
                  {/* 活動介紹 */}
                  <div className='activityContent'>
                      <div className='actContentTitle site'>
                        <p>活動介紹</p>
                      </div>
                          <div className="actPic">
                              <img src="https://s3-alpha-sig.figma.com/img/7966/a3f7/3513d7ca29ca28799852ad5e65964237?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SvotFjXr89s5YMJt5W3MEufGzyMHknWaQdKOkwPl3CSquABl1pcFhD9qlA8CIlkJzbPyizGxeErtiA7NXvCgfPEKAnVmfKFvNf11g6iDA25BEeHBGredEr52BX~gPtNQiIZ4OjBS2vclMOjl4CbH1AvOuXPe5JJjyYTG8PFB-UPobfL7SRxcrb-3rLmgHoa5hlJvCZ6wPn2BXS6H8peo0xKvF~lc~INgTpBWQ6yZ5tMsgww3aStauEvmQ4YXpRgYoZkvSavyuyNF5uVGAxDVB6d5mtDCPVEY3X8e3k2oOqYogJabciuTEQXKmeU2q8gAUIQV9bX0akAxMHGVwTlq3w__" 
                                alt="" 
                                className="card-img w-100"
                                style={{objectFit: "cover"}}
                              />
                          
                          </div>
                          <div className='contentText'>
                            <div className='contentTextsmall'>
                              <p><i className="bi bi-caret-up-fill"></i>高空咖啡廳與紀念品店</p>
                            </div>
                             <p className="contentDescribute">在高空咖啡廳享受一杯咖啡，細味人生；或於紀念品店挑選限量的台北101周邊商品，為這次獨一無二的旅程畫下完美句點。</p>
                          </div>

                          <div className="actPic">
                              <img src="https://s3-alpha-sig.figma.com/img/7966/a3f7/3513d7ca29ca28799852ad5e65964237?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SvotFjXr89s5YMJt5W3MEufGzyMHknWaQdKOkwPl3CSquABl1pcFhD9qlA8CIlkJzbPyizGxeErtiA7NXvCgfPEKAnVmfKFvNf11g6iDA25BEeHBGredEr52BX~gPtNQiIZ4OjBS2vclMOjl4CbH1AvOuXPe5JJjyYTG8PFB-UPobfL7SRxcrb-3rLmgHoa5hlJvCZ6wPn2BXS6H8peo0xKvF~lc~INgTpBWQ6yZ5tMsgww3aStauEvmQ4YXpRgYoZkvSavyuyNF5uVGAxDVB6d5mtDCPVEY3X8e3k2oOqYogJabciuTEQXKmeU2q8gAUIQV9bX0akAxMHGVwTlq3w__" 
                                alt="" 
                                className="card-img w-100"
                                style={{objectFit: "cover"}}
                              />
                          
                          </div>
                          <div className='contentText'>
                            <div className='contentTextsmall'>
                              <p><i className="bi bi-caret-up-fill"></i>夜景時光的浪漫與感動</p>
                            </div>
                             <p className="contentDescribute">傍晚時分登上觀景台，欣賞夕陽從地平線緩緩隱去，城市燈火逐漸點亮的絕美過程。夜晚的台北，是無數遊人最深刻的記憶。 快來感受台北101觀景台，讓視野無限延展，與城市天空更近一步！</p>
                          </div>
                  </div>
                  <div className="">
                    <hr/>
                  </div>
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
                            <span class="material-icons">star</span>
                            <span class="material-icons">star</span>
                            <span class="material-icons">star</span>
                            <span class="material-icons">star</span>
                            <span class="material-icons">star_half</span>
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
                                    <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/avatar/image-1.png"
                                    alt="..." 
                                    />
                                </div>
                              </div>
                              {/*單一評論和星星 */}
                              <div className="col-10">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className='ratingName'>技安</span>
                                  <div className='singleRating'>
                                  <span class="material-icons">★</span>
                                  <span class="material-icons">★</span>
                                  <span class="material-icons">★</span>
                                  <span class="material-icons">★</span>
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
                  <button href="#" type="button" className="btn btn-primary" onClick={openModal}>選擇日期</button>
                </div>
                </div>
              </div>
            </div>
            
      </div>

      <div className="mobileView">
        <div className="card-body actTitleMobile">
          <h2 className="">NT$420起</h2>
          <div className="callbutton">
          <button href="#" type="button" className="btn btn-primary" onClick={openModal}>選擇日期</button>
        </div>
        </div>
      </div>

  </div>
  
  <div className="modal fade" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content modalContent">
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
                          <div class="day"><button>1</button></div>
                          <div class="day"><button>2</button></div>
                          <div class="day"><button>3</button></div>
                          <div class="day"><button>4</button></div>
                          <div class="day"><button>5</button></div>
                          <div class="day"><button>6</button></div>
                          <div class="day"><button>7</button></div>
                          <div class="day"><button>8</button></div>
                          <div class="day"><button>9</button></div>
                          <div class="day"><button>10</button></div>
                          <div class="day"><button>11</button></div>
                          <div class="day"><button>12</button></div>
                          <div class="day"><button>13</button></div>
                          <div class="day"><button>14</button></div>
                          <div class="day"><button>15</button></div>
                          <div class="day"><button>16</button></div>
                          <div class="day"><button>17</button></div>
                          <div class="day"><button>18</button></div>
                          <div class="day"><button>19</button></div>
                          <div class="day"><button>20</button></div>
                          <div class="day"><button>21</button></div>
                          <div class="day"><button>22</button></div>
                          <div class="day"><button>23</button></div>
                          <div class="day"><button>24</button></div>
                          <div class="day"><button>25</button></div>
                          <div class="day"><button>26</button></div>
                          <div class="day"><button>27</button></div>
                          <div class="day"><button>28</button></div>
                          <div class="day"><button>29</button></div>
                          <div class="day"><button>30</button></div>
                          <div class="day"><button>31</button></div>
                        </div>
                      </div>
                        
                          
              </div>
            </div>
            <div className="getActDateFooter">
              <button type="button" >預約行程</button>
            </div>
          </div>
        </div>
      </div>
                
</div>

  );
};
  
  export default About;