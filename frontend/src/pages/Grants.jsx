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
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                        <DollarSign size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{t('grants-title')}</h1>
                        <p className="text-gray-500">{t('grants-subtitle')}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 h-fit sticky top-24">
                    <h2 className="text-xl font-bold mb-4">{t('grants-new')}</h2>
                    <form onSubmit={create} className="space-y-4">
                        <input className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Grant Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        <input className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Amount (₹)" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                        <textarea className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Description" rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        <button type="submit" className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition">Add Grant</button>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">{t('grants-schemes')}</h2>
                    {grants.map(g => (
                        <div key={g._id} className="glass-card p-6 flex flex-col gap-2 hover:shadow-lg transition">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-emerald-900">{g.name}</h3>
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">₹{g.amount}</span>
                            </div>
                            <p className="text-gray-600">{g.description}</p>
                            <button className="mt-2 text-amber-600 font-bold text-sm self-start hover:underline">{t('grants-apply')} →</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
