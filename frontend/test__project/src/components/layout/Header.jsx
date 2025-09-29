import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../ui/Logo';
import SearchBar from '../ui/SearchBar';
import UserActions from '../ui/UserActions';
import AuthModal from '../modals/AuthModal';

const Header = ({ user, onLoginClick, onRegister, onLogout, cartCount }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const [localCartCount, setLocalCartCount] = useState(cartCount || 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
    if (cartCount !== undefined) {
      setLocalCartCount(cartCount);
    }
  }, [user, cartCount]);

  const handleLogin = async (credentials) => {
    // Используем переданные функции из App.jsx
    if (onLoginClick) {
      const result = await onLoginClick(credentials);
      if (result && result.success) {
        setIsAuthOpen(false);
      }
      return result;
    }
    return { success: false, error: 'Функция авторизации не передана' };
  };

  const handleRegister = async (userData) => {
    // Используем переданные функции из App.jsx
    if (onRegister) {
      const result = await onRegister(userData);
      if (result && result.success) {
        setIsAuthOpen(false);
      }
      return result;
    }
    return { success: false, error: 'Функция регистрации не передана' };
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setLocalUser(null);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <Logo />
            <button 
              className="catalog-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="catalog-icon">☰</span>
              Каталог
            </button>
          </div>

          <div className="header-center">
            <SearchBar />
          </div>

          <div className="header-right">
            <UserActions 
              user={localUser}
              cartCount={localCartCount}
              onLoginClick={() => setIsAuthOpen(true)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </header>

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </>
  );
};

export default Header;