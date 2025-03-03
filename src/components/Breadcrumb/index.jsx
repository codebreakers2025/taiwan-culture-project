import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Breadcrumb.scss";
import { getActivitys, getJournalSingle } from "@/utils/api"; // 假設有 API 可查詢活動名稱

const pathNameMap = {
  "activity-list": "活動列表",
  "journal-list": "慢活日誌",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { id } = useParams(); // 獲取活動或日誌 ID
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (!id) return; // 若 id 不存在則不發送請求
  
    // 檢查當前 URL 是否為 activity-list 或 journal-list
    if (pathnames.includes("activity-list")) {
      getActivitys(id)
        .then((data) => {
          if (data && data.content && data.content.title) { // 確保 data 和 data.content.title 有值
            setPageTitle(data.content.title);
          } else {
            console.log("No title found in activity data");
          }
        })
        .catch((error) => {
          console.error("Error fetching activity:", error);
        });
    } else if (pathnames.includes("journal-list")) {
      getJournalSingle(id)
        .then((data) => {
          if (data && data.title) { // 確保 data 和 data.title 有值
            setPageTitle(data.title);
          } else {
            console.log("No title found in journal data");
          }
        })
        .catch((error) => {
          console.error("Error fetching journal:", error);
        });
    }
  }, [id, pathnames]);

  return (
    <nav className="breadcrumb">
      <Link to="/" className="homeLink">首頁</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        
        let displayName = pathNameMap[name] || decodeURIComponent(name);
        if (id && isLast) {
          displayName = pageTitle || displayName;
        }

        return (
          <span key={routeTo} className="breadcrumbItem">
            {isLast ? (
              <span className="breadcrumbCurrent">{displayName}</span>
            ) : (
              <Link to={routeTo} className="breadcrumbLink">{displayName}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
