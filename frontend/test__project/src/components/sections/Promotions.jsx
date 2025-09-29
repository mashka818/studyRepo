import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../cards/ProductCard';
import './Promotions.css';

const Promotions = ({ onAddToCart }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Моковые данные для акций
    const mockPromotions = [
      {
        id: 1,
        title: 'Молоко "Северяночка" 3.2%',
        price: 89,
        discount: 15,
        image: '/placeholder-product.svg',
        rating: 4.5
      },
      {
        id: 2,
        title: 'Хлеб "Бородинский"',
        price: 45,
        discount: 20,
        image: '/placeholder-product.svg',
        rating: 4.2
      },
      {
        id: 3,
        title: 'Сыр "Российский" 45%',
        price: 320,
        discount: 10,
        image: '/placeholder-product.svg',
        rating: 4.7
      },
      {
        id: 4,
        title: 'Йогурт "Активия"',
        price: 65,
        discount: 25,
        image: '/placeholder-product.svg',
        rating: 4.3
      }
    ];

    // Попробуем загрузить с API, если не получится - используем моковые данные
    fetch('https://ivfedotovshopapi.netlify.app/.netlify/functions/app/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Фильтруем товары с скидкой или берем первые 4
        const promotionalProducts = data.slice(0, 4).map(product => ({
          id: product._id || product.id,
          title: product.name || 'Товар',
          price: typeof product.price === 'number' ? product.price : 0,
          discount: Math.floor(Math.random() * 30) + 10, // Генерируем случайную скидку
          image: (product.image && product.image !== 'image1.png') ? product.image : '/placeholder-product.svg',
          rating: product.rating || 4.5
        }));
        setPromotions(promotionalProducts);
        setLoading(false);
      })
      .catch(err => {
        console.log('API недоступен, используем моковые данные:', err.message);
        setPromotions(mockPromotions);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      if (window.updateCartCount) {
        window.updateCartCount();
      }
    }
  };

  const handleToggleFavorite = (product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const existingIndex = favorites.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      favorites.splice(existingIndex, 1);
    } else {
      favorites.push(product);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const isFavorite = (product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(item => item.id === product.id);
  };

  if (loading) {
    return (
      <section className="promotions">
        <div className="container">
          <div className="section-header">
            <h2>Акции</h2>
            <Link to="/promotions" className="view-all-link">
              Все акции →
            </Link>
          </div>
          <div className="loading">Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="promotions">
      <div className="container">
        <div className="section-header">
          <h2>Акции</h2>
          <Link to="/promotions" className="view-all-link">
            Все акции →
          </Link>
        </div>
        
        <div className="products-grid">
          {promotions.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onToggleFavorite={() => handleToggleFavorite(product)}
              isFavorite={isFavorite(product)}
              showDiscount={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;