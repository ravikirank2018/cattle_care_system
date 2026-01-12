import React, { useState } from 'react'
import api from '../services/api'

export default function Predict() {
  const [form, setForm] = useState({ temperature: '', appetite: '', mobility: '' })
  const [result, setResult] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const res = await api.post('/predict', form)
    setResult(res.data)
  }

  return (
    <div>
      <h2>Predictions</h2>
      <form onSubmit={submit}>
        <input placeholder="Temperature" value={form.temperature} onChange={e => setForm({ ...form, temperature: e.target.value })} />
        <input placeholder="Appetite" value={form.appetite} onChange={e => setForm({ ...form, appetite: e.target.value })} />
        <input placeholder="Mobility" value={form.mobility} onChange={e => setForm({ ...form, mobility: e.target.value })} />
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div>
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
