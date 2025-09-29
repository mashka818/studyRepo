import React from 'react'

function NewsItem({name, img, text, button}) {
  return (
    <div>
        <h1>{name}</h1>
        <img src = {img} alt = "image1"/>
        <p>{text}</p>
        <button>{button}</button>
      </div>
  )
}

export default NewsItem