import { ActivityCard, ReviewCard, BlogCard} from '@/components/Card';
import './ActivityList.scss';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { getActivity, getJournal, getReviews } from '@/utils/api';

const About = () => {
    return (
      <div className="page-container">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="left-searchBar">
                  <div>col-3</div>
                </div>
              </div>
              <div className="col-9">
                <div>col-9
                  <h1>正在開發中...</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;