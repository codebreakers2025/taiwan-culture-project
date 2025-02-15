import './activitylist.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState , useEffect , useRef } from 'react';
import * as bootstrap from "bootstrap"; 
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3001'

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
    <div className="page-container">
      <div className="content">
        <div className="container">
          <div className="classification">
            <ul>
              <li>首頁</li>
              <li>所有活動</li>
            </ul>
          </div>
          <div className="showRow row no-gutters" > {/* 移除 gutter，自行控制間隔 */}
            <div className="mobile">
              <button type='button' className='filterList' onClick={openModal} data-bs-toggle="modal" data-bs-target="#exampleModal">篩選<i className="bi bi-caret-down-fill"></i></button>
            </div>
            <div className="searchDiv col-md-3">
              <div className="searchArea" >
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>關鍵字搜尋</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput" placeholder='請搜尋關鍵字' /><i className="inputBi bi bi-search inputBi" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>起始日期</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇開始日期'/><i className="inputBi bi bi-calendar-event " ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>結束日期</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇結束日期'/><i className="inputBi bi bi-calendar-event" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>活動類型</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇活動類型'/><i className="inputBi bi bi-person-walking" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>價格</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇價格區間'/><i className="inputBi bi bi-currency-dollar" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>地區</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text"  className="searchInput"  placeholder='請選擇地區'/><i className="inputBi bi bi-geo-alt-fill" ></i>
                            </div>
                          </div>
                          <div className="searchButton">
                            <button>搜尋</button>
                          </div>
              </div>
            </div>
                            <div className="col-md-9 productList">
                              <div className="container" >
                                <div className="row no-gutters" >
                                  <div className="col-md-4 productListDiv">

                                      <div className="image-container imageContainer">
                                        <img src="https://s3-alpha-sig.figma.com/img/9a12/71b5/8042b7ae7a35c50758a3e8c1b65c9db6?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RUmL99F3pPQnNvfEKAVtabQjgjDLXjf7PdwpdDxHA-aqme5WIo5bI9dzW-bI8fkYEvp3zYBegDlEAW090gt8YMKJjpqH2x6TuYPAP3dU~CQvkXZigtB875gvtMpywGAzIGCVyO7sNi6RgjWZQFzgAF-X602ncoCWCYFqRnG9hHJFsZ1R5BV5yJgmM4~WCbum52QJF0XnvE0sf3R2n8MsESTE~qV6yfMoVSJk3tos-va~DbuNkjlg7vbIqHsN3wsfemKXAZqePFVp33g8tjifT4NJQ~3niF-6x-pUypS0op2ys6UGr2zIhuXe4l-6ScGpLK9YVfbiPOS8IU~XXP-iCg__" alt="Image 1" className="img-fluid" style={{ width:'100%' , height:'100%', objectFit:'cover'}} />
                                      </div>
                                      <div className="text-content textContentDiv">
                                        <div className="date">2024/12/1-2024/12/31・一日行程<span> 4.8</span></div>
                                        <div className="title">台中:經典行程&高美濕地一日遊</div>
                                        <div className="description">
                                          探索台中之美，從經典出發!一日遊帶您走訪彩虹眷村的繽紛色彩，感受老兵的童心，最後漫步於高美濕地，欣賞夕陽與自然交織的絕美景色。
                                        </div>
                                        <div className="price">NT$ 666</div>
                                      </div>

                                  </div>

                                  <div className="col-md-4 productListDiv">

                                      <div className="image-container imageContainer">
                                        <img src="https://s3-alpha-sig.figma.com/img/5b88/656b/538f2142addada080f7cdadf383f4b55?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i25pQDMIzBisq1b5OdtoXNe~-qpt8Pr5BboJ1FttORlKzV~M6HQzLQK0BqFFqMRht7V2ADYActZwjAcOyxJu7GNO2y7EeRL3wmc4lrR4kilMPkA8RHusNoDC2OQHT49nITzooGYe3I0Oi~jEqzw1LwuBxRo6VV05X03RSBA3Spj7Lih-0C46ifIYpZayZ3FxmCfJVIUPu9XPNTBNPyQY9O6T6~VP8l68RLZAwMZim9u7RimIML1nWotfkUFo0x~s-mwlmvAWIcS3ZsVbhQu4tlFU9HoqCl0LwYxxm1RJutAGvLzJnTX5j~op-5Ke41-Itt-F9XBb8oFQBgfhwSkmXg__" alt="Image 1" className="img-fluid" style={{ width:'100%' , height:'100%', objectFit:'cover'}} />
                                      </div>
                                      <div className="text-content textContentDiv">
                                        <div className="date">2024/12/20 - 2025/1/30・一日行程<span> 4.8</span></div>
                                        <div className="title">台北：沉浸式 DIY 調製香水</div>
                                        <div className="description">
                                           在繁華的台北，體驗一場獨特的嗅覺之旅！透過沉浸式DIY調製香水，您將化身調香師，探索香氛的奧秘，打造屬於自己的專屬香氣，留下一段難...
                                        </div>
                                        <div className="price">NT$ 980</div>
                                      </div>

                                  </div>

                                  <div className="col-md-4 productListDiv">

                                      <div className="image-container imageContainer">
                                        <img src="https://s3-alpha-sig.figma.com/img/d8a0/2bed/952faeaccde54f3fee3768b85aff021b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FTSgw3od0q-P~9tmCwHUAoBYAMIaH8fOQiwx9eyicGsK52Bydlw8VeMjcs7iuPFLjBh-x5pde7-A9zWVU3FsNtyDjQdboW1tezU0UvhgCy6cI4TkTePgVncYCORwkErzxUGv2HVl15W2goSUD6zNd0RSTtrXvKHLUMt0ofLwTZy5hy1gOwI~6jPVSgExnrPEMHwaFiS~oszCie~as1z7Quz9qqNcp2mnl8PvY1MntrAiB6ir34CZu3ad9AiCf~GmbxQHbj2pRtqxHh-ZIAuc7mI~xCSslc2mXDSQ8ajR-quD-HKUs45f2rvWAhFwGJJboNqsRz-nc8DCssqQ5zDe~g__" alt="Image 1" className="img-fluid" style={{ width:'100%' , height:'100%', objectFit:'cover'}} />
                                      </div>
                                      <div className="text-content textContentDiv">
                                        <div className="date">2024/12/15 - 2024/12/20・一日行程<span> 4.8</span></div>
                                        <div className="title">宜蘭: 天送埤火車站 | 高空繩索體驗</div>
                                        <div className="description">
                                        來宜蘭天送埤火車站，挑戰您的膽量！體驗刺激的高空繩索，在安全防護下享受高空漫步的刺激感，並俯瞰周圍壯麗的自然景觀，感受心跳加速...
                                        </div>
                                        <div className="price">NT$ 350</div>
                                      </div>

                                  </div>

                                  <div className="col-md-4 productListDiv">

                                      <div className="image-container imageContainer">
                                        <img src="https://s3-alpha-sig.figma.com/img/665f/b1a8/2d0adf68f28e6c63ac31fc5bd0f59c44?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ap4XkAX~SNt5-M45VK-t57-sMPh3UEXSVIFzpELFXu4nQnBIbuKsaQwCo~dCnKBu2SAEcStJ9QZ8Hbbhk~d2AlHPnRt-QfVB0L9MI6Pz13m25ln1GS~w2tY95nSKqaOl4EiBCk3ggKHkr5YfumT61KuFxV7oImVM2EYSHJDHynaT50yZrYdTZjHHj1m8XEg~c~cVEj9FDCdqN-jWGfhytbr-87Y7X~1hZFGxcgkqajwnC5MPFg2Jd1-1a~WvtEkxbXFrdIqdIvaeNiYQSKAj6gMC~fUF1BG3cFGzVN-YnizjJodW9B0OHit2Y~BruaPVdZCb8VgC73-iIYgXtJk76w__" alt="Image 1" className="img-fluid" style={{ width:'100%' , height:'100%', objectFit:'cover'}} />
                                      </div>
                                      <div className="text-content textContentDiv">
                                        <div className="date">2024/12/2 - 2024/12/15・一日行程<span> 4.8</span></div>
                                        <div className="title">台北：101觀景台門﻿票</div>
                                        <div className="description" >
                                            登上台北101觀景台，俯瞰台北全景，感受都市與自然交織的壯麗景色！搭乘高速電梯，一次體驗世界級地標的震撼與魅力。
                                        </div>
                                        <div className="price">NT$ 420</div>
                                      </div>

                                  </div>

                                  <div className="col-md-4 productListDiv">

                                      <div className="image-container imageContainer">
                                        <img src="https://s3-alpha-sig.figma.com/img/c55d/fe6a/ab78ad025862b78e397c8280d07cfb1b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TCL7LhQPxjTz3Y0VbI6-W1G7RvoGG-qIz7qn~kudx-tEQzaP~evzOuvqIrOY0RhoZuoUh4MLYr9qMMgzQUfYktTtr4pQg3W00Bd8QGTzHXiCXg~y3QMgYpThKtBeEu2XhQNFHZC9nKYvadlOe05dk8BAgfbZdh61CKSB~H-XHgmzQqdGe9TAi4EIg-tuTPCQpfSrYi4i0Zdl2-6k8Mg4jbrkqd1zAK4wa6h5oqkTfhKxJWFVA6P99OujfVAaaPAzEMfYbDwqa4Az5-bu02qcP4-~lKVNzgPQ3ejm7NG2TCObDgJ~hxcUls4wFzRFhvDtht4BxBTsX3j-KjYdhUni2w__" alt="Image 1" className="img-fluid" style={{ width:'100%' , height:'100%', objectFit:'cover'}} />
                                      </div>
                                      <div className="text-content textContentDiv">
                                        <div className="date">2024/12/20 - 2025/1/15・一日行程<span> 4.8</span></div>
                                        <div className="title">花蓮：太魯閣國家公園深度體驗</div>
                                        <div className="description">
                                            深入太魯閣的壯麗峽谷，探訪清水斷崖的絕美海景，親身感受自然的偉大力量。這趟旅程適合喜歡冒險與大自然的旅人。
                                        </div>
                                        <div className="price">NT$1399</div>
                                      </div>

                                  </div>

                                  <div className="col-md-4 productListDiv">

                                      <div className="image-container imageContainer">
                                        <img src="https://s3-alpha-sig.figma.com/img/e7ed/f64f/802d6003bd77df25e2f8d686d07e0ddb?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mAUKIGgpr~XXsEMCJK711Fi0iQKXeAOwDMjpahNMO4KUqmpOyJCnjNUx1G9lBsyR1goPgA7-r1thWRkNfnx6qryNryjFp2OUdRoABWi6SY6N7nhKY-4gvbUQnnKPao6~EFYboH9fIBVBo~uQY4htrZJtkQ9bIt1d9V9SIrZ3VhIvcjNocihDx4dZpo4xk0fZsiEUUIrZA90iTqEc3SmUoFPWfsuoXMK57Pn3aleGeWS11JEo7Ils3WGsgtEKrfawrmbMvXsfv2yXLeQAHt8mDkiLdI1FBhyrNeicMoKTNSVL5JapvWBNZKZTtYITTHAM05c-sZKyZornmntWt5rsMw__" alt="Image 1" className="img-fluid" style={{ width:'100%' , height:'100%', objectFit:'cover'}} />
                                      </div>
                                      <div className="text-content textContentDiv">
                                        <div className="date">2024/12/15・一日行程<span> 4.8</span></div>
                                        <div className="title">南投：日月潭環湖＆﻿文武廟文化之旅</div>
                                        <div className="description">
                                            騎著自行車環湖，感受日月潭的靜謐美景，再參觀文武廟，了解台灣傳統宗教文化，一次結合自然與文化的完美旅程！
                                        </div>
                                        <div className="price">NT$2150</div>
                                      </div>

                                  </div>
                                </div>
                                
                                <div className='pageDiv'>
                                  <div className="pageContainer">
                                    <ul>
                                      <li><button><i class="bi bi-caret-left"></i></button></li>
                                      <li><button>1</button></li>
                                      <li><button>2</button></li>
                                      <li><button>3</button></li>
                                      <li><button>4</button></li>
                                      <li><button>5</button></li>
                                      <li><button><i class="bi bi-caret-right"></i></button></li>
                                    </ul>
                                  </div>
                                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modalBody">
            <div className="searchArea" >
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>關鍵字搜尋</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput" placeholder='請搜尋關鍵字' /><i className="inputBi bi bi-search inputBi" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>起始日期</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇開始日期'/><i className="inputBi bi bi-calendar-event " ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>結束日期</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇結束日期'/><i className="inputBi bi bi-calendar-event" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>活動類型</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇活動類型'/><i className="inputBi bi bi-person-walking" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>價格</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text" className="searchInput"  placeholder='請選擇價格區間'/><i className="inputBi bi bi-currency-dollar" ></i>
                            </div>
                          </div>
                          <div className="searchBox">
                            <div className="searchTitle">
                                <p>地區</p>
                            </div>
                            <div className="searchInputDiv">
                                <input type="text"  className="searchInput"  placeholder='請選擇地區'/><i className="inputBi bi bi-geo-alt-fill" ></i>
                            </div>
                          </div>
                          
              </div>
            </div>
            <div className="filterFooter">

                <button type="button" className="closeBtn" onClick={closeModal}>Close</button>
                <button type="button" className="searchBtn">搜尋</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}


export default About;