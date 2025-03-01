import React from "react";
import './JournalList.scss';
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
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card mb-3">
                <img src="https://raw.githubusercontent.com/codebreakers2025/taiwan-culture-project/refs/heads/dev-ben/public/img/activity/image-1.png" className="card-img-top" alt="activity" />
                <div className="card-body">
                  <p className="card-date">2024-08-01</p>
                  <h5 className="card-title">喚醒感官的茶道體驗之旅</h5>
                  <p className="card-text">在茶香縈繞的氛圍中，體驗台灣傳統茶道的魅力。由專業茶師帶領，親手泡製一壺好茶，學習如何感受茶葉的細膩風味與製茶過程中的文化傳承。讓每一口茶都喚醒你的感官，為生活增添一抹悠然的禪意。</p>
                </div>
              </div>
            </div>
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