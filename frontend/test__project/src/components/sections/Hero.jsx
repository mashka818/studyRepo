import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-banner">
            <div className="banner-background">
              <div className="banner-pattern"></div>
              <div className="banner-image">
                <div className="food-items">
                  <div className="food-item cheese"></div>
                  <div className="food-item apple"></div>
                  <div className="food-item orange"></div>
                  <div className="food-item tomato"></div>
                  <div className="food-item avocado"></div>
                  <div className="food-item bread"></div>
                </div>
              </div>
            </div>
            <div className="banner-text">
              <h1>Доставка бесплатно от 1000 ₽</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;