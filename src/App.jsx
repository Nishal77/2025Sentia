import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { SentiaMain } from './components/SentiaMain'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { OldMemories } from './components/oldmemories'
import { AdminLogin } from './components/AdminLogin'
import { AdminDashboard } from './components/AdminDashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SentiaMain />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oldmemories" element={<OldMemories />} />
        
        {/* Admin Routes */}
        <Route path="/adminpanel" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
