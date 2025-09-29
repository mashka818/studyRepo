import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      fetchUserData(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch('https://ivfedotovshopapi.netlify.app/.netlify/functions/app/users/me', {
        headers: { 
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Токен недействителен
        localStorage.removeItem('authToken');
        setToken(null);
      }
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error);
      localStorage.removeItem('authToken');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Подготавливаем данные для входа
      const requestData = {
        login: credentials.login,
        password: credentials.password
      };
      
      console.log('Отправляем данные входа:', requestData);
      
      const response = await fetch('https://ivfedotovshopapi.netlify.app/.netlify/functions/app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Ответ сервера:', data);
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: 'Вход выполнен успешно!' };
      } else {
        return { success: false, error: data.message || 'Ошибка входа' };
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { success: false, error: 'Ошибка подключения к серверу' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Подготавливаем данные согласно модели User
      const requestData = {
        login: userData.login,
        password: userData.password,
        email: userData.email,
        name: userData.login, // Используем login как name
        avatar: '' // Пустой аватар по умолчанию
      };
      
      console.log('Отправляем данные регистрации:', requestData);
      
      const response = await fetch('https://ivfedotovshopapi.netlify.app/.netlify/functions/app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Ответ сервера:', data);
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true, message: 'Регистрация выполнена успешно! Вы автоматически авторизованы.' };
      } else {
        return { success: false, error: data.message || 'Ошибка регистрации' };
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return { success: false, error: 'Ошибка подключения к серверу' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    if (!token) return { success: false, error: 'Не авторизован' };

    try {
      setLoading(true);
      const response = await fetch(`https://ivfedotovshopapi.netlify.app/.netlify/functions/app/users/${user.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Ошибка обновления профиля' };
      }
    } catch (error) {
      return { success: false, error: 'Ошибка подключения к серверу' };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    token,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
};
