import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import UserContext from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContext>
  <UserContext>
    <App />
    <Toaster 
      position="top-right"
    />
  </UserContext>
  </AuthContext>
)
