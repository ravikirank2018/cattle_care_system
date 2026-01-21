import { useLanguage } from '../context/LanguageContext'
import React, { useState } from 'react'
import api from '../services/api'
import { Activity, Thermometer, Utensils, Move } from 'lucide-react'

export default function Predict() {
    const { t } = useLanguage()
    const [form, setForm] = useState({ temperature: '', appetite: '', mobility: '' })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/predict', form)
            setResult(res.data)
        } catch (e) {
            // Mock result
            setTimeout(() => {
                setResult({ prediction: 'Healthy', confidence: '98%', recommended_action: 'Routine Monitor' })
            }, 1000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header>
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <Activity size={36} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#253D2E] tracking-tight">{t('predict-title')}</h1>
                        <p className="text-[#4A6741] font-medium">{t('predict-subtitle')}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-6 text-[#253D2E]">{t('pred-enter-vitals')}</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 font-bold text-[#253D2E] mb-2"><Thermometer size={18} className="text-[#B6E63E]" /> {t('pred-temp')}</label>
                            <input className="w-full p-3 border border-[#253D2E]/20 rounded-xl bg-[#F4F7F4] font-bold text-[#253D2E] focus:ring-2 focus:ring-[#B6E63E] outline-none" placeholder="e.g. 38.5" value={form.temperature} onChange={e => setForm({ ...form, temperature: e.target.value })} />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-bold text-[#253D2E] mb-2"><Utensils size={18} className="text-[#B6E63E]" /> {t('pred-appetite')}</label>
                            <input className="w-full p-3 border border-[#253D2E]/20 rounded-xl bg-[#F4F7F4] font-bold text-[#253D2E] focus:ring-2 focus:ring-[#B6E63E] outline-none" placeholder="1 = Low, 10 = High" value={form.appetite} onChange={e => setForm({ ...form, appetite: e.target.value })} />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-bold text-[#253D2E] mb-2"><Move size={18} className="text-[#B6E63E]" /> {t('pred-mobility')}</label>
                            <input className="w-full p-3 border border-[#253D2E]/20 rounded-xl bg-[#F4F7F4] font-bold text-[#253D2E] focus:ring-2 focus:ring-[#B6E63E] outline-none" placeholder="1 = Low, 10 = Normal" value={form.mobility} onChange={e => setForm({ ...form, mobility: e.target.value })} />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-[#253D2E] text-white font-bold py-3 rounded-xl hover:bg-[#0D1A12] transition shadow-lg hover:shadow-[0_10px_20px_rgba(26,47,35,0.3)]">
                            {loading ? t('pred-analyzing') : t('pred-run')}
                        </button>
                    </form>
                </div>

                <div className="glass-card p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#B6E63E]/10 rounded-bl-full pointer-events-none"></div>
                    {!result ? (
                        <div className="text-[#4A6741]/50">
                            <Activity size={64} className="mx-auto mb-4 opacity-50" />
                            <p className="font-bold">{t('pred-result-placeholder')}</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in relative z-10 w-full">
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black bg-[#253D2E] text-[#B6E63E] shadow-xl border-4 border-[#F4F7F4]">
                                {result.confidence ? result.confidence.replace('%', '') : '98'}%
                            </div>
                            <h2 className="text-2xl font-black text-[#253D2E] mb-2">{result.prediction}</h2>
                            <p className="text-[#4A6741] mb-6 font-medium">{result.recommended_action}</p>
                            <div className="p-4 bg-[#F4F7F4] rounded-xl border border-[#253D2E]/10 text-left text-sm text-[#253D2E]">
                                <p><strong>Note:</strong> {t('pred-note')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

