import React from 'react'
import { Link } from 'react-router-dom'
import cattleHealthImg from '../../images/Cattle Health Prediction.jpg'
import tradeImg from '../../images/Trade Management System.jpg'
import advisoryImg from '../../images/Personalized Advisory.jpg'
import grantsImg from '../../images/Government Grants.jpg'

export default function Services() {
  return (
    <div>
      <header className="service-hero">
        <div className="service-hero-inner">
          <h1>Our Core Services</h1>
          <p>Explore Cattle Health Prediction, Trade Management, Personalized Advisory, and Government Grants to support your farm.</p>
        </div>
      </header>

      <main className="container services">
        <div className="cards" style={{ marginTop: 24 }}>
          <Link to="/services/health" className="card link-card">
            <img src={cattleHealthImg} alt="Cattle Health"/>
            <div className="card-body">
              <h4>Cattle Health Prediction</h4>
              <p>AI models analyze temperature, activity, and feeding patterns to detect diseases.</p>
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
            <img src={grantsImg} alt="Grants"/>
            <div className="card-body">
              <h4>Government Grants</h4>
              <p>Find available grants and subsidies for vaccination and farm improvements.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
