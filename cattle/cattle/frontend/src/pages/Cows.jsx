import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Cows() {
  const [cows, setCows] = useState([])
  const [form, setForm] = useState({ tag: '', age: 0, healthStatus: '', owner: '' })

  useEffect(() => {
    api.get('/cows').then(res => setCows(res.data)).catch(() => {})
  }, [])

  const create = async (e) => {
    e.preventDefault()
    const res = await api.post('/cows', form)
    setCows([...cows, res.data])
    setForm({ tag: '', age: 0, healthStatus: '', owner: '' })
  }

  return (
    <div>
      <h2>Cows</h2>
      <form onSubmit={create}>
        <input placeholder="Tag" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} />
        <input type="number" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: +e.target.value })} />
        <input placeholder="Health" value={form.healthStatus} onChange={e => setForm({ ...form, healthStatus: e.target.value })} />
        <input placeholder="Owner" value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {cows.map(c => (
          <li key={c.id}>{c.tag} - {c.healthStatus} - Owner: {c.owner}</li>
        ))}
      </ul>
    </div>
  )
}
