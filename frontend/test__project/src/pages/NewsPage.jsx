import React from 'react';
import './NewsPage.css';

const NewsPage = () => {
  return (
    <div className="news-page">
      <div className="container">
        <h1>Новости</h1>
        <div className="news-content">
          <p>Здесь будут отображаться все новости</p>
          <div className="empty-state">
            <p>Новости скоро появятся</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
