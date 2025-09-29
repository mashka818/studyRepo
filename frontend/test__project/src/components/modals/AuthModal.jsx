import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authStep, setAuthStep] = useState('phone'); // phone, password, sms, newPassword
  const [regStep, setRegStep] = useState('personal'); // personal, sms
  const [formData, setFormData] = useState({
    phone: '+7 912',
    password: '',
    confirmPassword: '',
    smsCode: '',
    name: '',
    lastName: '',
    birthDate: '01.01.1980',
    region: 'Коми',
    locality: 'Усть-Ижма',
    gender: 'male',
    cardNumber: '',
    email: '',
    hasLoyaltyCard: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
    setSuccess('');
  };

  const handlePhoneSubmit = () => {
    if (!formData.phone || formData.phone.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }
    setAuthStep('password');
  };

  const handlePasswordSubmit = () => {
    if (!formData.password) {
      setError('Введите пароль');
      return;
    }
    // Здесь будет логика проверки пароля
    setAuthStep('sms');
  };

  const handleSmsSubmit = () => {
    if (!formData.smsCode) {
      setError('Введите код из SMS');
      return;
    }
    // Здесь будет логика проверки SMS кода
    setAuthStep('newPassword');
  };

  const handleNewPasswordSubmit = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('Заполните все поля');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    // Здесь будет логика создания нового пароля
    setSuccess('Пароль успешно создан!');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleRegistrationSubmit = () => {
    if (!formData.name || !formData.lastName || !formData.password) {
      setError('Заполните обязательные поля');
      return;
    }
    setRegStep('sms');
  };

  const handleRegSmsSubmit = () => {
    if (!formData.smsCode) {
      setError('Введите код из SMS');
      return;
    }
    // Здесь будет логика завершения регистрации
    setSuccess('Регистрация завершена успешно!');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Валидация полей
    if (!formData.email || !formData.password) {
      setError('Все поля обязательны для заполнения');
      setLoading(false);
      return;
    }

    if (!isLoginMode && !formData.name) {
      setError('Все поля обязательны для заполнения');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (isLoginMode) {
        result = await onLogin({
          login: formData.email,
          password: formData.password
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Пароли не совпадают');
          setLoading(false);
          return;
        }
        result = await onRegister({
          login: formData.name,
          email: formData.email,
          password: formData.password
        });
      }

      if (result.success) {
        setSuccess(result.message);
        // Закрываем модальное окно через 2 секунды после успешной авторизации
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setAuthStep('phone');
    setRegStep('personal');
    setFormData({
      phone: '+7 912',
      password: '',
      confirmPassword: '',
      smsCode: '',
      name: '',
      lastName: '',
      birthDate: '01.01.1980',
      region: 'Коми',
      locality: 'Усть-Ижма',
      gender: 'male',
      cardNumber: '',
      email: '',
      hasLoyaltyCard: false
    });
    setError('');
    setSuccess('');
  };

  const goBack = () => {
    if (isLoginMode) {
      if (authStep === 'password') {
        setAuthStep('phone');
      } else if (authStep === 'sms') {
        setAuthStep('password');
      } else if (authStep === 'newPassword') {
        setAuthStep('sms');
      }
    } else {
      if (regStep === 'sms') {
        setRegStep('personal');
      }
    }
  };

  if (!isOpen) return null;

  const renderAuthContent = () => {
    if (authStep === 'phone') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handlePhoneSubmit(); }} className="auth-form">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={formData.phone ? 'filled' : ''}
            />
          </div>

          <button type="submit" className="submit-btn">
            Вход
          </button>

          <div className="modal-footer">
            <button type="button" onClick={switchMode} className="switch-btn">
              Регистрация
            </button>
            <button type="button" className="forgot-password-btn">
              Забыли пароль?
            </button>
          </div>
        </form>
      );
    }

    if (authStep === 'password') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(); }} className="auth-form">
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={formData.password ? 'filled' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Подтвердить
          </button>

          <div className="modal-footer">
            <button type="button" onClick={goBack} className="back-btn">
              ← Вернуться
            </button>
            <button type="button" className="forgot-password-btn">
              Забыли пароль?
            </button>
          </div>
        </form>
      );
    }

    if (authStep === 'sms') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleSmsSubmit(); }} className="auth-form">
          <div className="form-group">
            <label htmlFor="smsCode">Код из СМС</label>
            <input
              type="text"
              id="smsCode"
              name="smsCode"
              value={formData.smsCode}
              onChange={handleInputChange}
              required
              className={formData.smsCode ? 'filled' : ''}
            />
          </div>

          <button type="submit" className="submit-btn">
            Подтвердить
          </button>

          <div className="modal-footer">
            <p className="sms-timer">Запросить код повторно можно через 45 секунд</p>
            <button type="button" onClick={goBack} className="back-btn">
              ← Вернуться
            </button>
          </div>
        </form>
      );
    }

    if (authStep === 'newPassword') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleNewPasswordSubmit(); }} className="auth-form">
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={formData.password ? 'filled' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="password-requirements">
              <div className="requirement">✓ Прописная буква</div>
              <div className="requirement">✗ Заглавная буква</div>
              <div className="requirement">✗ Цифра</div>
              <div className="requirement">✗ Больше 5 символов</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтверждение пароля</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className={formData.confirmPassword ? 'filled' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Подтвердить
          </button>

          <div className="modal-footer">
            <button type="button" onClick={goBack} className="back-btn">
              ← Вернуться
            </button>
          </div>
        </form>
      );
    }
  };

  const renderRegContent = () => {
    if (regStep === 'personal') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleRegistrationSubmit(); }} className="auth-form">
          <div className="form-section">
            <h3>Обязательные поля</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="filled"
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Дата рождения</label>
                <input
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="filled"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastName">Фамилия</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="region">Регион</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="filled"
                >
                  <option value="Коми">Коми</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="locality">Населенный пункт</label>
                <select
                  id="locality"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  className="filled"
                >
                  <option value="Усть-Ижма">Усть-Ижма</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Пол</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-custom"></span>
                  Мужской
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-custom"></span>
                  Женский
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Необязательные поля</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardNumber">Номер карты</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasLoyaltyCard"
                  checked={formData.hasLoyaltyCard}
                  onChange={handleInputChange}
                />
                <span className="checkbox-custom"></span>
                У меня нет карты лояльности
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            Продолжить
          </button>

          <div className="modal-footer">
            <button type="button" onClick={switchMode} className="switch-btn">
              Вход
            </button>
          </div>
        </form>
      );
    }

    if (regStep === 'sms') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); handleRegSmsSubmit(); }} className="auth-form">
          <div className="form-group">
            <label htmlFor="smsCode">Код из СМС</label>
            <input
              type="text"
              id="smsCode"
              name="smsCode"
              value={formData.smsCode}
              onChange={handleInputChange}
              required
              className={formData.smsCode ? 'filled' : ''}
            />
          </div>

          <button type="submit" className="submit-btn">
            Подтвердить
          </button>

          <div className="modal-footer">
            <p className="sms-timer">Запросить код повторно можно через 45 секунд</p>
            <button type="button" onClick={goBack} className="back-btn">
              ← Вернуться
            </button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2>{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
        </div>

        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {isLoginMode ? renderAuthContent() : renderRegContent()}
      </div>
    </div>
  );
};

export default AuthModal;