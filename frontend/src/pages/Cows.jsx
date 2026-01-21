import { useLanguage } from '../context/LanguageContext'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Plus, Search, ScrollText } from 'lucide-react'

export default function Cows() {
    const { t } = useLanguage()
    const [cows, setCows] = useState([])
    const [form, setForm] = useState({ tag: '', age: 0, healthStatus: '', owner: '' })

    useEffect(() => {
        // Mock data if API fails for demo
        api.get('/cows').then(res => setCows(res.data)).catch(() => {
            setCows([
                { id: 1, tag: 'COW-101', age: 3, healthStatus: 'Healthy', owner: 'Ravi' },
                { id: 2, tag: 'COW-102', age: 4, healthStatus: 'Sick', owner: 'Ravi' }
            ])
        })
    }, [])

    const create = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/cows', form)
            setCows([...cows, res.data])
            setForm({ tag: '', age: 0, healthStatus: '', owner: '' })
        } catch (e) {
            alert('Failed to add cow (Backend might be missing /cows endpoint)')
        }
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header>
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <ScrollText size={36} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#253D2E] tracking-tight">{t('cows-title')}</h1>
                        <p className="text-[#4A6741] font-medium">{t('cows-subtitle')}</p>
                    </div>
                </div>
            </header>

            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-[#4A6741]" /> {t('btn-add-cow')}
                </h2>
                <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input className="input-field font-semibold text-[#253D2E]" placeholder={t('ph-tag')} value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} />
                    <input className="input-field font-semibold text-[#253D2E]" type="number" placeholder={t('ph-age')} value={form.age} onChange={e => setForm({ ...form, age: +e.target.value })} />
                    <select className="input-field font-semibold text-[#253D2E]" value={form.healthStatus} onChange={e => setForm({ ...form, healthStatus: e.target.value })}>
                        <option value="">{t('opt-select-status')}</option>
                        <option value="Healthy">{t('opt-healthy')}</option>
                        <option value="Sick">{t('opt-sick')}</option>
                        <option value="Pregnant">{t('opt-pregnant')}</option>
                    </select>
                    <input className="input-field font-semibold text-[#253D2E]" placeholder={t('ph-owner')} value={form.owner} onChange={e => setForm({ ...form, owner: e.target.value })} />
                    <button type="submit" className="btn-primary w-full shadow-glow disabled:opacity-50 flex items-center justify-center h-[52px] bg-[#253D2E] hover:bg-[#0D1A12] text-white">
                        {t('btn-add-cow')}
                    </button>
                </form>
            </div>

            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4">{t('hdr-herd-list')}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3 font-semibold text-gray-600">{t('tbl-tag')}</th>
                                <th className="p-3 font-semibold text-gray-600">{t('tbl-age')}</th>
                                <th className="p-3 font-semibold text-gray-600">{t('tbl-health')}</th>
                                <th className="p-3 font-semibold text-gray-600">{t('tbl-owner')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cows.map((c, i) => (
                                <tr key={c.id || i} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3 font-medium">{c.tag}</td>
                                    <td className="p-3">{c.age} years</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${c.healthStatus === 'Healthy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {c.healthStatus}
                                        </span>
                                    </td>
                                    <td className="p-3 text-gray-500">{c.owner}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {cows.length === 0 && <p className="text-center p-4 text-gray-500">No cows found.</p>}
                </div>
            </div>
        </div>
    )
}

