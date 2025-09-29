import React from 'react'

function Button({text, text_color}) {
  return (
    <div>
        <button style = {{color:text_color}}>{text}</button>
    </div>
  )
}

export default Button