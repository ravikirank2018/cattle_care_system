import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Trade() {
  const [trades, setTrades] = useState([])
  const [form, setForm] = useState({ cowId: '', seller: '', buyer: '', price: '' })

  useEffect(() => { api.get('/trade').then(res => setTrades(res.data)).catch(() => {}) }, [])

  const create = async (e) => {
    e.preventDefault()
    const res = await api.post('/trade', form)
    setTrades([...trades, res.data])
    setForm({ cowId: '', seller: '', buyer: '', price: '' })
  }

  return (
    <div>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Trade Management System</h1>
          <p>Transparent cattle trading with fair price estimation using market intelligence.</p>
          <a className="btn-voice" href="#trades">View Trades</a>
        </div>
      </header>

      <main className="container" id="trades">
        <section style={{ marginTop: 24 }}>
          <h2>Trade Records</h2>
          <form onSubmit={create}>
            <input placeholder="Cow ID" value={form.cowId} onChange={e => setForm({ ...form, cowId: e.target.value })} />
            <input placeholder="Seller" value={form.seller} onChange={e => setForm({ ...form, seller: e.target.value })} />
            <input placeholder="Buyer" value={form.buyer} onChange={e => setForm({ ...form, buyer: e.target.value })} />
            <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <button type="submit">Record Trade</button>
          </form>

          <ul style={{ marginTop: 18 }}>
            {trades.map(t => <li key={t._id}>Cow {t.cowId} : {t.seller} → {t.buyer} (${t.price})</li>)}
          </ul>
        </section>
      </main>
    </div>
  )
}
