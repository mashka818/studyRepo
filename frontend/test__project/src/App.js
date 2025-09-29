import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Promotions from './components/sections/Promotions';
import News from './components/sections/News';
import BuyAgo from './components/sections/BuyAgo';
import SpecialOffers from './components/sections/SpecialOffers';
import OurStores from './components/sections/OurStores';
import Articles from './components/sections/Articles';

// Pages
import CartPage from './pages/CartPage';

// Home Page Component
const HomePage = () => {
  return (
    <>
      <Hero />
      <Promotions />
      <News />
      <BuyAgo />
      <SpecialOffers />
      <OurStores />
      <Articles />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Добавьте другие маршруты по мере необходимости */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
