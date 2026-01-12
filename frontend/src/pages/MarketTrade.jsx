import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { DollarSign, TrendingUp } from 'lucide-react'

export default function MarketTrade() {
    const [trades, setTrades] = useState([])
    const [form, setForm] = useState({ cowId: '', seller: '', buyer: '', price: '' })

    useEffect(() => {
        // Mock data in case backend endpoint is missing
        api.get('/trade').then(res => setTrades(res.data)).catch(() => {
            setTrades([
                { _id: 1, cowId: 'COW-005', seller: 'Ravi', buyer: 'Suresh', price: 45000 },
                { _id: 2, cowId: 'COW-009', seller: 'Manoj', buyer: 'Ravi', price: 32000 }
            ])
        })
    }, [])

    const create = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/trade', form)
            setTrades([...trades, res.data])
            setForm({ cowId: '', seller: '', buyer: '', price: '' })
        } catch (e) {
            alert("Failed to record trade")
        }
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Trade Management</h1>
                        <p className="text-gray-500">Record and track cattle sales.</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 glass-card p-6 h-fit">
                    <h2 className="text-xl font-bold mb-4">Record New Trade</h2>
                    <form onSubmit={create} className="space-y-4">
                        <input className="w-full p-3 border rounded-lg" placeholder="Cow ID" value={form.cowId} onChange={e => setForm({ ...form, cowId: e.target.value })} />
                        <input className="w-full p-3 border rounded-lg" placeholder="Seller Name" value={form.seller} onChange={e => setForm({ ...form, seller: e.target.value })} />
                        <input className="w-full p-3 border rounded-lg" placeholder="Buyer Name" value={form.buyer} onChange={e => setForm({ ...form, buyer: e.target.value })} />
                        <div className="relative">
                            <span className="absolute left-3 top-3.5 text-gray-500">₹</span>
                            <input className="w-full p-3 pl-8 border rounded-lg" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition">Record Sale</button>
                    </form>
                </div>

                <div className="lg:col-span-2 glass-card p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                    <div className="space-y-3">
                        {trades.map((t, i) => (
                            <div key={t._id || i} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg px-6">
                                <div>
                                    <p className="font-bold text-gray-800">{t.cowId}</p>
                                    <p className="text-sm text-gray-500">{t.seller} ➔ {t.buyer}</p>
                                </div>
                                <div className="text-emerald-700 font-bold text-lg">
                                    ₹{t.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
