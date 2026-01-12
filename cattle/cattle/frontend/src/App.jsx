import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Cows from './pages/Cows'
import Trade from './pages/Trade'
import Predict from './pages/Predict'
import Advisory from './pages/Advisory'
import Grants from './pages/Grants'
import Health from './pages/Health'
import Services from './pages/Services'
import Alerts from './pages/Alerts'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileIcon from './components/ProfileIcon'
import Notifications from './components/Notifications'
import Settings from './pages/Settings'
import { getUser, clearAuth } from './services/auth'
import Toast from './components/Toast'

export default function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser())

  const location = useLocation()

  useEffect(() => {
    function onAuth() { setUser(getUser()) }
    window.addEventListener('authChanged', onAuth)

    function onSessionExpired(e) {
      // Preserve the current location so user can be redirected back after login
      const from = location && location.pathname ? location : { pathname: window.location.pathname }
      navigate('/login', { state: { from }, replace: true })
    }

    window.addEventListener('sessionExpired', onSessionExpired)

    return () => {
      window.removeEventListener('authChanged', onAuth)
      window.removeEventListener('sessionExpired', onSessionExpired)
    }
  }, [location, navigate])

  function handleLogout() {
    clearAuth()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="brand">Smart Cattle AI</h1>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            {user ? (
              <>
                <li style={{ fontWeight: 700 }}>Welcome, {user.name ? user.name.split(' ')[0] : (user.email || 'User')}</li>
                <li><Notifications unread={3} /></li>
                <li><ProfileIcon user={user} onSignOut={handleLogout} /></li>
              </>
            ) : (
              <li><Link to="/login">Login / Register</Link></li>
            )}
          </ul>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/cows" element={<ProtectedRoute><Cows /></ProtectedRoute>} />
          <Route path="/trade" element={<ProtectedRoute><Trade /></ProtectedRoute>} />
          <Route path="/predict" element={<ProtectedRoute><Predict /></ProtectedRoute>} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/services/health" element={<Health />} />
          <Route path="/services" element={<Services />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Toast />
      <Footer />
    </div>
  )
}
