import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react"
import cleanupDefaultTeams from './utils/cleanupUtil'

// Run cleanup before rendering anything
cleanupDefaultTeams();

// Clear any cached data on every page load
localStorage.removeItem('sentiaLiveEvents');
localStorage.removeItem('sentiaEvents');
console.log('Cleared localStorage on application startup');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
