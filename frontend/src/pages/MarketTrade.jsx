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
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <TrendingUp size={36} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#253D2E] tracking-tight">Trade Management</h1>
                        <p className="text-[#4A6741] font-medium">Record and track cattle sales.</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 glass-card p-6 h-fit relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#B6E63E]/10 rounded-bl-full pointer-events-none"></div>
                    <h2 className="text-xl font-bold mb-4 text-[#253D2E]">Record New Trade</h2>
                    <form onSubmit={create} className="space-y-4">
                        <input className="input-field font-semibold text-[#253D2E]" placeholder="Cow ID" value={form.cowId} onChange={e => setForm({ ...form, cowId: e.target.value })} />
                        <input className="input-field font-semibold text-[#253D2E]" placeholder="Seller Name" value={form.seller} onChange={e => setForm({ ...form, seller: e.target.value })} />
                        <input className="input-field font-semibold text-[#253D2E]" placeholder="Buyer Name" value={form.buyer} onChange={e => setForm({ ...form, buyer: e.target.value })} />
                        <div className="relative">
                            <span className="absolute left-3 top-3.5 text-gray-500 font-bold">₹</span>
                            <input className="input-field pl-8 font-bold text-[#253D2E]" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                        </div>
                        <button type="submit" className="btn-primary w-full bg-[#253D2E] text-white hover:bg-[#0D1A12] shadow-lg">Record Sale</button>
                    </form>
                </div>

                <div className="lg:col-span-2 glass-card p-6">
                    <h2 className="text-xl font-bold mb-4 text-[#253D2E]">Recent Transactions</h2>
                    <div className="space-y-3">
                        {trades.map((t, i) => (
                            <div key={t._id || i} className="flex justify-between items-center p-4 bg-[#F4F7F4] border border-[#253D2E]/10 rounded-2xl px-6 hover:shadow-md transition-all group">
                                <div>
                                    <p className="font-black text-[#253D2E] group-hover:text-[#4A6741] transition-colors">{t.cowId}</p>
                                    <p className="text-sm text-gray-500 font-medium">{t.seller} ➔ {t.buyer}</p>
                                </div>
                                <div className="text-[#253D2E] font-black text-lg bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">
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

