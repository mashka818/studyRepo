import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Моковые данные для статей
    const mockArticles = [
      {
        id: 1,
        title: 'Как правильно выбирать молочные продукты',
        description: 'Полезные советы по выбору качественных молочных продуктов для всей семьи',
        date: '15 декабря 2024',
        image: '/placeholder-article.svg'
      },
      {
        id: 2,
        title: 'Здоровое питание зимой',
        description: 'Какие продукты помогут укрепить иммунитет в холодное время года',
        date: '12 декабря 2024',
        image: '/placeholder-article.svg'
      },
      {
        id: 3,
        title: 'Рецепты домашней выпечки',
        description: 'Простые и вкусные рецепты для приготовления дома',
        date: '10 декабря 2024',
        image: '/placeholder-article.svg'
      }
    ];

    // Попробуем загрузить с API, если не получится - используем моковые данные
    fetch('https://ivfedotovshopapi.netlify.app/.netlify/functions/app/news')
      .then(res => res.json())
      .then(data => {
        // Преобразуем данные новостей в нужный формат
        const formattedArticles = data.slice(0, 3).map(article => ({
          id: article._id || article.id,
          title: article.title,
          description: article.description,
          date: new Date(article.date).toLocaleDateString('ru-RU'),
          image: article.image || '/placeholder-article.svg'
        }));
        setArticles(formattedArticles);
        setLoading(false);
      })
      .catch(err => {
        console.log('API недоступен, используем моковые данные');
        setArticles(mockArticles);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="articles">
        <div className="container">
          <div className="section-header">
            <h2>Статьи</h2>
            <Link to="/articles" className="view-all-link">
              Все статьи →
            </Link>
          </div>
          <div className="loading">Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="articles">
      <div className="container">
        <div className="section-header">
          <h2>Статьи</h2>
          <Link to="/articles" className="view-all-link">
            Все статьи →
          </Link>
        </div>
        
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-image">
                <img 
                  src={article.image || '/placeholder-article.svg'} 
                  alt={article.title}
                />
              </div>
              <div className="article-content">
                <div className="article-date">{article.date}</div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <button className="read-more-btn">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;