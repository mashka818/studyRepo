import React from 'react';
import './OrdersPage.css';

const OrdersPage = () => {
  return (
    <div className="orders-page">
      <div className="container">
        <h1>Мои заказы</h1>
        <div className="orders-content">
          <p>Здесь будут отображаться ваши заказы</p>
          <div className="empty-state">
            <p>У вас пока нет заказов</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
