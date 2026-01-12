import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-col">
          <h4>Smart Cattle AI</h4>
          <p className="muted">AI-driven tools for smallholder farmers — health prediction, fair trade, and advisory.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p className="muted">support@smartcattle.local<br/>+1 (555) 010-2020</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">© {year} Smart Cattle AI — Built for farmers & communities</div>
      </div>
    </footer>
  )
}