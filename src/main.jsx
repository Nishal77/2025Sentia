import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react"
import cleanupDefaultTeams from './utils/cleanupUtil'

// Run cleanup before rendering anything
cleanupDefaultTeams();

// Only clear cached data on first visit, not on refreshes
// This ensures added events persist after page refresh
const isFirstVisit = !localStorage.getItem('sentiaAppInitialized');
if (isFirstVisit) {
  localStorage.removeItem('sentiaLiveEvents');
  localStorage.removeItem('sentiaEvents');
  localStorage.setItem('sentiaAppInitialized', 'true');
  console.log('First visit: Cleared localStorage on application startup');
} else {
  console.log('Return visit: Preserving localStorage data');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
