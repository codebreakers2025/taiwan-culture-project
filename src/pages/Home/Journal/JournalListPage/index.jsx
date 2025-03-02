import React from "react";
import './JournalList.scss';
import Breadcrumb from "@/components/Breadcrumb"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { getJournal } from '@/utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const PageNation = ({totalPage, page, setPage}) => {
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


  return (
    <div className="pagenation">
      <button 
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
        disabled={page === 1}
      >
        <span className="material-icons">chevron_left</span>
      </button>
      <div className="currentPage">{renderPaginationButtons()}</div>
      <button 
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))} 
        disabled={page === totalPage}
      >
        <span className="material-icons">navigate_next</span>
      </button>
    </div>
  );

}

const JournalListPage = () => {
    const [totalPage , setTotalPage] = useState(0)
    const [page, setPage] = useState(1); // 頁數狀態
    const limit = 6;
    const [journalData, setJournalData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  

      // 轉址功能
      const navigate = useNavigate();
      const handleNavigate = (e , journal) => {
        console.log(journal);
          e.preventDefault();
          navigate(`/journal-list/${journal.id}`);
          window.scrollTo({ top: 0, behavior: "smooth" }); // 滑動到最上方
      };

    useEffect(() => {
      const fetchGetJournal = async () => {
        setLoading(true);
        try {
          const response = await getJournal(page, limit); 
          setJournalData(response); 
          setTotalPage(response.totalPages || 1); // 需要確保 totalPage 設置
        } catch (error) {
          setError('Error fetching journal:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchGetJournal();
    }, [page]); // 監聽 `page`，確保換頁時觸發請求
    

  return (
    <div className="test-container">
      <div className="content">
        <div className="container">
          {/* 麵包屑 */}
          <Breadcrumb />
          <div className="row">
          {journalData.length > 0 ? (
            journalData.map((item) => (
              <div className="col-md-6 col-lg-3" key={item.id} onClick={(e) => handleNavigate(e, item)} style={{cursor:'pointer'}}>
                <div className="card mb-3">
                  <img src={item.images} className="card-img-top" alt="activity" />
                  <div className="card-body">
                    <p className="card-date">{item.date}</p>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">目前沒有資料</p>
          )}

          </div>
          <div className="row">
            <div className="col-12">
              {/* Render Pagination only if there are results */}
              <PageNation 
                totalPage={totalPage} 
                page={page} 
                setPage={setPage} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalListPage;
