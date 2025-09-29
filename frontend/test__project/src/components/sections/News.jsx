import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../cards/ProductCard';
import './News.css';

const News = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Моковые данные для новинок
    const mockProducts = [
      {
        id: 5,
        title: 'Кефир "Северяночка" 1%',
        price: 55,
        image: '/placeholder-product.svg',
        rating: 4.4
      },
      {
        id: 6,
        title: 'Творог "Домик в деревне" 5%',
        price: 78,
        image: '/placeholder-product.svg',
        rating: 4.6
      },
      {
        id: 7,
        title: 'Масло сливочное 82.5%',
        price: 120,
        image: '/placeholder-product.svg',
        rating: 4.8
      },
      {
        id: 8,
        title: 'Сметана 20%',
        price: 45,
        image: '/placeholder-product.svg',
        rating: 4.3
      },
      {
        id: 9,
        title: 'Ряженка 4%',
        price: 42,
        image: '/placeholder-product.svg',
        rating: 4.5
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
        // Берем товары с 5 по 9 для новинок
        const newProducts = data.slice(4, 9).map(product => ({
          id: product._id || product.id,
          title: product.name || 'Товар',
          price: typeof product.price === 'number' ? product.price : 0,
          image: (product.image && product.image !== 'image1.png') ? product.image : '/placeholder-product.svg',
          rating: product.rating || 4.5
        }));
        setProducts(newProducts);
        setLoading(false);
      })
      .catch(err => {
        console.log('API недоступен, используем моковые данные:', err.message);
        setProducts(mockProducts);
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
      <section className="news">
        <div className="container">
          <div className="section-header">
            <h2>Новинки</h2>
            <Link to="/news" className="view-all-link">
              Все новинки →
            </Link>
          </div>
          <div className="loading">Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="news">
      <div className="container">
        <div className="section-header">
          <h2>Новинки</h2>
          <Link to="/news" className="view-all-link">
            Все новинки →
          </Link>
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
              onToggleFavorite={() => handleToggleFavorite(product)}
              isFavorite={isFavorite(product)}
              showDiscount={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;