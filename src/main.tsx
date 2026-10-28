import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import App from './App';
import './enviroment';
import { Buffer } from 'buffer'

window.Buffer = Buffer

// Initialize the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)


// This will set light / dark mode on load...
initializeTheme();