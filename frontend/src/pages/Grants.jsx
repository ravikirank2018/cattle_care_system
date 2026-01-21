import { useLanguage } from '../context/LanguageContext'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { FileText, DollarSign } from 'lucide-react'

export default function Grants() {
    const { t } = useLanguage()
    const [grants, setGrants] = useState([])
    const [form, setForm] = useState({ name: '', amount: '', description: '' })

    useEffect(() => {
        api.get('/grants').then(res => setGrants(res.data)).catch(() => {
            setGrants([
                { _id: 1, name: 'Fodder Subsidy', amount: '5000', description: 'Subsidy for purchasing dry fodder during drought.' },
                { _id: 2, name: 'Barn Construction', amount: '25000', description: 'Financial aid for building concrete sheds.' }
            ])
        })
    }, [])

    const create = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/grants', form)
            setGrants([...grants, res.data])
            setForm({ name: '', amount: '', description: '' })
        } catch (e) {
            alert("Failed to add grant (API might be missing)")
        }
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header>
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <DollarSign size={36} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#253D2E] tracking-tight">{t('grants-title')}</h1>
                        <p className="text-[#4A6741] font-medium">{t('grants-subtitle')}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 h-fit sticky top-24">
                    <h2 className="text-xl font-bold mb-4 text-[#253D2E]">{t('grants-new')}</h2>
                    <form onSubmit={create} className="space-y-4">
                        <input className="input-field font-semibold text-[#253D2E]" placeholder="Grant Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        <input className="input-field font-semibold text-[#253D2E]" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                        <textarea className="input-field font-semibold text-[#253D2E]" placeholder="Description" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        <button type="submit" className="btn-primary w-full bg-[#253D2E] text-white hover:bg-[#0D1A12] shadow-lg">Add Grant</button>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#253D2E]">{t('grants-schemes')}</h2>
                    {grants.map(g => (
                        <div key={g._id} className="glass-card p-6 flex flex-col gap-2 hover:shadow-lg transition border border-[#253D2E]/10">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-[#253D2E]">{g.name}</h3>
                                <span className="bg-[#B6E63E] text-[#253D2E] px-3 py-1 rounded-lg text-sm font-bold shadow-sm">₹{g.amount}</span>
                            </div>
                            <p className="text-[#4A6741] font-medium">{g.description}</p>
                            <button className="mt-2 text-[#253D2E] font-black text-sm self-start hover:underline flex items-center gap-1">
                                {t('grants-apply')} <span className="text-lg">→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

