import React, { useState } from 'react';
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
import OrdersPage from './pages/OrdersPage';
import FavoritesPage from './pages/FavoritesPage';
import NewsPage from './pages/NewsPage';
import ProfilePage from './pages/ProfilePage';

// Modals
import AuthModal from './components/modals/AuthModal';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';

// Home Page Component
const HomePage = ({ onAddToCart }) => {
  return (
    <>
      <Hero />
      <Promotions onAddToCart={onAddToCart} />
      <News onAddToCart={onAddToCart} />
      <BuyAgo onAddToCart={onAddToCart} />
      <SpecialOffers />
      <OurStores />
      <Articles />
    </>
  );
};

function App() {
  const { user, login, register, logout } = useAuth();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => setIsAuthModalOpen(true);
  const handleCloseAuthModal = () => setIsAuthModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Header 
          user={user}
          onLoginClick={login}
          onRegister={register}
          onLogout={logout}
          cartCount={getTotalItems()}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route path="/cart" element={
              <CartPage 
                cart={cart} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity} 
                clearCart={clearCart}
                getTotalPrice={getTotalPrice}
                getTotalItems={getTotalItems}
              />
            } />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={handleCloseAuthModal}
            onLogin={login}
            onRegister={register}
          />
        )}
      </div>
    </Router>
  );
}

export default App;