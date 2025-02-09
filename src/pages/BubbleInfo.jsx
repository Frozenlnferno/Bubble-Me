import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/bubbleinfo.css'
import backgroundImage from '../assets/bubbleinfo.png'

const BubbleInfo = () => {
  return (
    <div className="bubble-info" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavLink className='back-button' to="/">
        <button>Back</button>
      </NavLink>
      <NavLink className='forward-button' to="/superbubble">
        <button>More Hackathons</button>
      </NavLink>
    </div>
  )
}

export default BubbleInfo