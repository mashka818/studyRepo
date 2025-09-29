import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../cards/ProductCard';
import './BuyAgo.css';

const BuyAgo = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Моковые данные для "Покупали раньше"
    const mockProducts = [
      {
        id: 10,
        title: 'Колбаса "Докторская"',
        price: 280,
        image: '/placeholder-product.svg',
        rating: 4.1
      },
      {
        id: 11,
        title: 'Сосиски "Молочные"',
        price: 195,
        image: '/placeholder-product.svg',
        rating: 4.0
      },
      {
        id: 12,
        title: 'Ветчина "Вкусная"',
        price: 320,
        image: '/placeholder-product.svg',
        rating: 4.2
      },
      {
        id: 13,
        title: 'Бекон копченый',
        price: 450,
        image: '/placeholder-product.svg',
        rating: 4.4
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
        // Берем товары с 9 по 12 для "покупали раньше"
        const boughtProducts = data.slice(8, 12).map(product => ({
          id: product._id || product.id,
          title: product.name || 'Товар',
          price: typeof product.price === 'number' ? product.price : 0,
          image: (product.image && product.image !== 'image1.png') ? product.image : '/placeholder-product.svg',
          rating: product.rating || 4.5
        }));
        setProducts(boughtProducts);
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
      <section className="buy-ago">
        <div className="container">
          <div className="section-header">
            <h2>Покупали раньше</h2>
            <Link to="/buyago" className="view-all-link">
              Все покупки →
            </Link>
          </div>
          <div className="loading">Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="buy-ago">
      <div className="container">
        <div className="section-header">
          <h2>Покупали раньше</h2>
          <Link to="/buyago" className="view-all-link">
            Все покупки →
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

export default BuyAgo;