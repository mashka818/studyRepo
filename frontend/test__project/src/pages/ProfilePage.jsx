import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    login: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        login: user.login || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage('Профиль успешно обновлен!');
        setIsEditing(false);
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      setMessage('Произошла ошибка при обновлении профиля');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="not-authorized">
            <h2>Необходима авторизация</h2>
            <p>Для просмотра профиля необходимо войти в систему</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Мой профиль</h1>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <img 
                src={user.avatar || '/default-avatar.svg'} 
                alt="Аватар"
                className="avatar-image"
              />
              {isEditing && (
                <button className="change-avatar-btn">
                  Изменить фото
                </button>
              )}
            </div>

            <div className="profile-info">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
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
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="login">Логин</label>
                    <input
                      type="text"
                      id="login"
                      name="login"
                      value={formData.login}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {message && (
                    <div className={`message ${message.includes('успешно') ? 'success' : 'error'}`}>
                      {message}
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-secondary"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="label">Имя:</span>
                    <span className="value">{user.name || 'Не указано'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email:</span>
                    <span className="value">{user.email || 'Не указано'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Логин:</span>
                    <span className="value">{user.login || 'Не указано'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Дата регистрации:</span>
                    <span className="value">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'Не указано'}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary edit-btn"
                  >
                    Редактировать профиль
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-info">
                <div className="stat-number">0</div>
                <div className="stat-label">Заказов</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❤️</div>
              <div className="stat-info">
                <div className="stat-number">0</div>
                <div className="stat-label">Избранное</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <div className="stat-number">0</div>
                <div className="stat-label">Отзывов</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
