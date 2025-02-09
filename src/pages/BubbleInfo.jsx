import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/bubbleinfo.css'

const BubbleInfo = () => {
  return (
    <div className="bubble-info">
      <h1 className="header">HackNYU</h1>
      <div className="back-button">
        <NavLink to="/">
          <button>Back</button>
        </NavLink>
      </div>
      <NavLink to="/superbubble">
        <button>More Hackathons</button>
      </NavLink>
    </div>
  )
}

export default BubbleInfo