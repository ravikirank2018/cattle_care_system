import React from 'react'
import { Link } from 'react-router-dom'

export default function Health() {
  return (
    <div>
      <header className="service-hero">
        <div className="service-hero-inner">
          <h1>Cattle Health Prediction</h1>
          <p>AI models analyze temperature, activity, and feeding patterns to detect diseases early and suggest next steps.</p>
          <Link to="/predict" className="btn-voice">Run Prediction</Link>
        </div>
      </header>

      <main className="container">
        <section style={{ marginTop: 24 }}>
          <h2>About Cattle Health Prediction</h2>
          <p>This page contains details about how we collect health metrics, interpret signals, and provide actionable advisory for farmers.</p>
        </section>
      </main>
    </div>
  )
}
