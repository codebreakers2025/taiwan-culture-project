import './PageNation.scss'
import { useEffect, useState } from 'react';


const PageNation = ({totalPage, setTotalPage, page, setPage}) => {

    console.log(totalPage);
    
    
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

export default PageNation