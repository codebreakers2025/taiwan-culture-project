import React from "react";
import './JournalList.scss';
import Breadcrumb from "@/components/Breadcrumb"
import PageNation from "@/components/PageNation"
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'

const About = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getJournalDataAll , setGetJournalDataAll] = useState([])
  const [totalPage , setTotalPage] = useState(0)
  const [page, setPage] = useState(1); // 頁數狀態
  const limit = 16;

   const navigate = useNavigate();
    const handleNavigate = (e , item) => {
        e.preventDefault();
        navigate(`/journal-list/${item.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" }); // 滑動到最上方
    };

    const getJournalDataAllPage = async() => {
      setLoading(true)
      try{
        const response = await axios.get(`/api/journal/`);
        console.log(response.data);
        setTotalPage(Math.ceil(response.data.length/limit))
      }catch(error){
    
      }
    }

  const getJournalData = async() => {
    setLoading(true)
    try{
      const response = await axios.get(`/api/journal?_page=${page}&_limit=${limit}`);
      setGetJournalDataAll(response.data)

    }catch(error){
  
    }
  }
  useEffect(()=>{
    getJournalDataAllPage();
  },[])
  
  useEffect(()=>{
    getJournalData(page);
  },[page])

  console.log(totalPage);
  

  return (
    <div className="test-container">
      <div className="content">
        <div className="container">
          {/* 麵包屑 */}
          <Breadcrumb />
          <div className="row">
            {loading ===true ? ( 
               getJournalDataAll.map((item , index)=>
                <div className="col-md-6 col-lg-3" key={index} onClick={(e) => handleNavigate(e, item)}>
                  <div className="card mb-3">
                    <img src={item.images} className="card-img-top" alt="activity" />
                    <div className="card-body">
                      <p className="card-date">{item.date}</p>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.content}</p>
                    </div>
                  </div>
                </div>)) : (<div>日誌載入中</div>) }
           
          
          </div>
          <div className="row">
                    {/* Check if no search results and there are search criteria */}
                    {(getJournalDataAll.length === 0) ? (
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
  );
};

export default About;