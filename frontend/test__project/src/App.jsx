import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import style from './App.module.css'
import NewsItem from './components/NewsItem/NewsItem'

const news = [
  {
    id:1,
    name:'Новость 1',
    img:'../image1.png',
    text:'Описание новости 1',
    button:'link'
  },
    {
    id:2,
    name:'Новость 2',
    img:'../image1.png',
    text:'Описание новости 2',
    button:'link'
  },
    {
    id:3,
    name:'Новость 3',
    img:'../image1.png',
    text:'Описание новости 3',
    button:'link'
  },
    {
    id:4,
    name:'Новость 4',
    img:'../image1.png',
    text:'Описание новости 4',
    button:'link'
  },
    {
    id:5,
    name:'Новость 5',
    img:'../image1.png',
    text:'Описание новости 5',
    button:'link'
  },
]

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      {news.map((item)=> (
        <div className = {style.block} key = {item.id}>
          <NewsItem name = {item.name} img = {item.img} text = {item.text} button = {item.button}/> 
        </div>
      ))}
    </>
  )
}

export default App
