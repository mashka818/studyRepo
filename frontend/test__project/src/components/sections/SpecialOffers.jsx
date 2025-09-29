import React from 'react';
import './SpecialOffers.css';

const SpecialOffers = () => {
  return (
    <section className="special-offers">
      <div className="container">
        <h2 className="section-title">Специальные предложения</h2>
        
        <div className="offers-grid">
          <div className="offer-card loyalty-card">
            <div className="card-content">
              <h3>Оформите карту «Северяночка»</h3>
              <p>И получайте бонусы при покупке в магазинах и на сайте</p>
            </div>
            <div className="card-image">
              <div className="loyalty-card-visual">
                <div className="card-design">
                  <div className="card-logo">СЕВЕРЯНОЧКА</div>
                  <div className="card-illustration">
                    <div className="winter-scene">
                      <div className="tree"></div>
                      <div className="snow"></div>
                    </div>
                    <div className="smiley-face">😊</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="offer-card promo-card">
            <div className="card-content">
              <h3>Покупайте акционные товары</h3>
              <p>И получайте вдвое больше бонусов</p>
            </div>
            <div className="card-image">
              <div className="promo-visual">
                <div className="shopping-basket">
                  <div className="basket-items">
                    <div className="item milk"></div>
                    <div className="item bread"></div>
                    <div className="item fruit"></div>
                  </div>
                </div>
                <div className="bonus-symbols">
                  <div className="plus-sign">+</div>
                  <div className="money-symbol">₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;