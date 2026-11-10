import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='976536649462-i23bnvrio9olhip1kl7o7c606lb29mcb.apps.googleusercontent.com'>
       <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
