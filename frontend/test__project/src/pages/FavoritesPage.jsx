import React from 'react';
import './FavoritesPage.css';

const FavoritesPage = () => {
  return (
    <div className="favorites-page">
      <div className="container">
        <h1>Избранное</h1>
        <div className="favorites-content">
          <p>Здесь будут отображаться ваши избранные товары</p>
          <div className="empty-state">
            <p>У вас пока нет избранных товаров</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
