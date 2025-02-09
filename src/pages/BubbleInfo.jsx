import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/bubbleinfo.css'

const BubbleInfo = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1) // Navigate to the previous page
  }

  return (
    <div className="bubble-info">
      <h1 className="header">HackNYU</h1>
      <div className="back-button">
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  )
}

export default BubbleInfo