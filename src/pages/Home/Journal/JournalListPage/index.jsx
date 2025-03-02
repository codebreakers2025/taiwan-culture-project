import React from "react";
import './JournalList.scss';
import Breadcrumb from "@/components/Breadcrumb"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { addFavorites, getFavorites } from '@/utils/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { getJournal } from '@/utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'

const About = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getJournalDataaAll , setGetJournalDataAll] = useState([])
  const [totalPage , setTotalPage] = useState(0)
  const [page, setPage] = useState(1); // 頁數狀態
  const limit = 16;

   const navigate = useNavigate();
    const handleNavigate = (e , item) => {
        e.preventDefault();
        navigate(`/journal-list/${item.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" }); // 滑動到最上方
    };

  const getJournalData = async() => {
    setLoading(true)
    try{
      const response = await axios.get(`/api/journal?_page=${page}&_limit=${limit}`);
      setGetJournalDataAll(response.data)
    }catch(error){
  
    }
  }
  
  useEffect(()=>{
    getJournalData();
  },[])

  console.log(getJournalDataaAll);
  

  return (
    <div className="test-container">
      <div className="content">
        <div className="container">
          {/* 麵包屑 */}
          <Breadcrumb />
          <div className="row">
            {loading ===true ? ( 
               getJournalDataaAll.map((item , index)=>
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
          <div class="pagenation">
            <button disabled="">
              <span class="material-icons">chevron_left</span>
            </button>
            <div class="currentPage">
              <button disabled>1</button>
              <button>2</button>
            </div>
            <button>
              <span class="material-icons">navigate_next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;