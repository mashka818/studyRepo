import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserActions.css';

const UserActions = ({ user, cartCount, onLoginClick, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <div className="user-actions">
      <Link to="/favorites" className="action-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link to="/orders" className="action-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <Link to="/cart" className="action-btn cart-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span>
        )}
      </Link>

      {user ? (
        <div className="user-menu">
          <button
            className="user-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={user.avatar || '/default-avatar.svg'}
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item">
                Профиль
              </Link>
              <Link to="/orders" className="dropdown-item">
                Мои заказы
              </Link>
              <button onClick={handleLogout} className="dropdown-item logout">
                Выйти
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className="login-btn" onClick={onLoginClick}>
          Войти
        </button>
      )}
    </div>
  );
};

export default UserActions;