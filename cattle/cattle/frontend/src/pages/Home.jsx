import React from 'react'
import { Link } from 'react-router-dom'
import cattleHealthImg from '../../images/Cattle Health Prediction.jpg'
import tradeImg from '../../images/Trade Management System.jpg'
import advisoryImg from '../../images/Personalized Advisory.jpg'
import grantsImg from '../../images/Government Grants.jpg'

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-inner">
          <h1>Empowering Farmers with AI-Driven Solutions</h1>
          <p className="lead">A unified smart cattle management platform that predicts cattle health, ensures fair trade pricing,<br/>and delivers personalized AI advisory through voice assistance.</p>
          <div className="hero-cta-wrap">
            <button className="btn-voice" aria-label="Talk to Voice Assistant">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="#fff" />
                <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="#fff" />
              </svg>
              <span className="btn-label">Talk to Voice Assistant</span>
            </button>
          </div>
        </div>
      </header>

      <section id="services" className="services container">
        <h2>Our Core Services</h2>
        <div className="cards">
          <Link to="/services/health" className="card link-card">
            <img src={cattleHealthImg} alt="Cattle Health"/>
            <div className="card-body">
              <h4>Cattle Health Prediction</h4>
              <p>AI models analyze temperature, activity, and feeding patterns to detect diseases early.</p>
            </div>
          </Link>

          <Link to="/trade" className="card link-card">
            <img src={tradeImg} alt="Trade"/>
            <div className="card-body">
              <h4>Trade Management System</h4>
              <p>Transparent cattle trading with fair price estimation using market intelligence.</p>
            </div>
          </Link>

          <Link to="/advisory" className="card link-card">
            <img src={advisoryImg} alt="Advisory"/>
            <div className="card-body">
              <h4>Personalized Advisory</h4>
              <p>Get feeding, breeding, and vaccination advice in your local language.</p>
            </div>
          </Link>

          <Link to="/grants" className="card link-card">
            <img src={grantsImg} alt="Government Grants"/>
            <div className="card-body">
              <h4>Government Grants</h4>
              <p>Find available grants and subsidies for vaccination, feed, and farm improvements to support smallholders.</p>
            </div>
          </Link>
        </div>
      </section>

      <section id="alerts" className="alerts container">
        <h3>Health Notifications & Alerts</h3>
        <ul className="alerts-list">
          <li className="alert alert-warning">⚠️ Cow ID #23: Early fever symptoms detected</li>
          <li className="alert alert-info">✏️ Cow ID #11: Vaccination due tomorrow</li>
          <li className="alert alert-note">🧾 Milk yield dropped for Cow ID #07</li>
        </ul>
      </section>
    </div>
  )
}
