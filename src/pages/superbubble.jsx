import React from 'react'
import '../css/superbubble.css'
import { NavLink } from 'react-router-dom'
import backgroundImage from '../assets/superbubble.png'

const SuperBubble = () => {
  return (
    <div className='super-bubble' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <NavLink className='back-button' to="/bubbleinfo">
            <button>HackNYU</button>
        </NavLink>
    </div>
  )
}

export default SuperBubble