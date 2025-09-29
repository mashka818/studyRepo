import React, { useState } from 'react';
import './OurStores.css';

const OurStores = () => {
  const [activeStore, setActiveStore] = useState('Щельяюр');

  const stores = [
    { id: 'Щельяюр', name: 'п. Щельяюр', active: true },
    { id: 'Вертеп', name: 'д. Вертеп', active: false },
    { id: 'Краснобор', name: 'с. Краснобор', active: false },
    { id: 'Диюр', name: 'д. Диюр', active: false }
  ];

  return (
    <section className="our-stores">
      <div className="container">
        <h2 className="section-title">Наши магазины</h2>
        
        <div className="store-tabs">
          {stores.map((store) => (
            <button
              key={store.id}
              className={`store-tab ${activeStore === store.id ? 'active' : ''}`}
              onClick={() => setActiveStore(store.id)}
            >
              {store.name}
            </button>
          ))}
        </div>

        <div className="map-container">
          <div className="map">
            <div className="map-background">
              <div className="map-roads">
                <div className="road horizontal road-1"></div>
                <div className="road horizontal road-2"></div>
                <div className="road vertical road-3"></div>
                <div className="road vertical road-4"></div>
              </div>
              
              <div className="map-features">
                <div className="river">
                  <div className="river-label">Курыя Кирульская</div>
                </div>
                
                <div className="location-label republic">Республика Коми</div>
                <div className="location-label city">Сыктывкар</div>
                
                <div className="map-icons">
                  <div className="map-icon metro">
                    <div className="icon-bg">M</div>
                  </div>
                  <div className="map-icon school">
                    <div className="icon-bg">S</div>
                  </div>
                </div>
              </div>
              
              <div className="store-pin">
                <div className="pin-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"
                      fill="#ff4444"
                    />
                  </svg>
                </div>
                <div className="pin-label">Республика Коми</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStores;