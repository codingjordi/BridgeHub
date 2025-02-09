import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App'
import './i18n/config'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import { ProfileProvider } from './contexts/ProfileContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="system" storageKey="bridgehub-theme">
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ProfileProvider>
  </React.StrictMode>,
)