import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { SentiaMain } from './components/SentiaMain'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { OldMemories } from './components/oldmemories'
import { AdminLogin } from './components/AdminLogin'
import { AdminHome } from './components/AdminHome'
import { NotFound } from './components/NotFound'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SentiaMain />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oldmemories" element={<OldMemories />} />
        
        {/* Admin Routes */}
        <Route path="/adminpanel" element={<AdminLogin />} />
        <Route path="/adminpanel/dashboard" element={<AdminHome />} />
        
        {/* Catch-all route to show 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
