import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'

// require("dotenv").config();

// const google_client = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const google_secret = import.meta.env.VITE_GOOGLE_SECRET;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId={google_client}> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </StrictMode>,
)
