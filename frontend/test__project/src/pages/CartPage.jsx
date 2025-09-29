import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price).replace('₽', '₽');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Для оформления заказа необходимо войти в систему');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Корзина</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Ваша корзина пуста</h2>
            <p>Добавьте товары из каталога</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Корзина</h1>
          <button 
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Очистить корзину
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image || '/placeholder-product.png'} 
                    alt={item.title}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <div className="item-price">
                    {item.discount ? (
                      <>
                        <span className="current-price">
                          {formatPrice(item.price * (1 - item.discount / 100))}
                        </span>
                        <span className="original-price">
                          {formatPrice(item.price)}
                        </span>
                        <span className="discount-badge">-{item.discount}%</span>
                      </>
                    ) : (
                      <span className="current-price">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    {formatPrice(
                      (item.discount 
                        ? item.price * (1 - item.discount / 100)
                        : item.price
                      ) * item.quantity
                    )}
                  </div>

                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Итого</h3>
              <div className="summary-row">
                <span>Товаров: {getTotalItems()}</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="summary-row">
                <span>Доставка:</span>
                <span className="free-delivery">Бесплатно от 1000 ₽</span>
              </div>
              <div className="summary-total">
                <span>К оплате:</span>
                <span className="total-price">{formatPrice(getTotalPrice())}</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;