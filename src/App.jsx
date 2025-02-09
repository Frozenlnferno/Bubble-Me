import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages'
import BubbleInfo from './pages/BubbleInfo'
import SuperBubble from './pages/superbubble'
import CommunityHub from './pages/communityhub'
import './css/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/BubbleInfo" element={<BubbleInfo />} />
        <Route path="/superbubble" element={<SuperBubble />} />
        <Route path="/communityhub" element={<CommunityHub />} />
      </Routes>
    </Router>
  )
}

export default App