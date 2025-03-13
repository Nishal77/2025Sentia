import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { SentiaMain } from './components/SentiaMain'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SentiaMain />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
