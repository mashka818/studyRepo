import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-text">СЕВЕРЯНОЧКА</div>
    </Link>
  );
};

export default Logo;