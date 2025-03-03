import React from "react";
import './JournalDetail.scss';
import Breadcrumb from "@/components/Breadcrumb"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { addFavorites, getFavorites } from '@/utils/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/components/DatePicker/DatePicker.scss";
import { getActivityAll, getReviews } from '@/utils/api';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

const About = () => {
    return (
      <div className="test-container">
        <div className="content">
          <div className="container">
            {/* 麵包屑 */}
            <Breadcrumb />
            <h1>正在開發中...</h1>
          </div>
        </div>
    </div>
    );
  };
  
  export default About;