import React from 'react'
import '../css/superbubble.css'
import backgroundImage from '../assets/superbubble.png'

const SuperBubble = () => {
  return (
    <div className='super-bubble' style={{ backgroundImage: `url(${backgroundImage})` }}>
    </div>
  )
}

export default SuperBubble