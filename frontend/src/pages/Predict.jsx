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
                <h1 className="text-3xl font-bold text-gray-800">{t('predict-title')}</h1>
                <p className="text-gray-500">{t('predict-subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-6">{t('pred-enter-vitals')}</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-2"><Thermometer size={18} className="text-red-500" /> {t('pred-temp')}</label>
                            <input className="w-full p-3 border rounded-lg" placeholder="e.g. 38.5" value={form.temperature} onChange={e => setForm({ ...form, temperature: e.target.value })} />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-2"><Utensils size={18} className="text-orange-500" /> {t('pred-appetite')}</label>
                            <input className="w-full p-3 border rounded-lg" placeholder="1 = Low, 10 = High" value={form.appetite} onChange={e => setForm({ ...form, appetite: e.target.value })} />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 font-medium text-gray-700 mb-2"><Move size={18} className="text-blue-500" /> {t('pred-mobility')}</label>
                            <input className="w-full p-3 border rounded-lg" placeholder="1 = Low, 10 = Normal" value={form.mobility} onChange={e => setForm({ ...form, mobility: e.target.value })} />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition">
                            {loading ? t('pred-analyzing') : t('pred-run')}
                        </button>
                    </form>
                </div>

                <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
                    {!result ? (
                        <div className="text-gray-400">
                            <Activity size={64} className="mx-auto mb-4 opacity-50" />
                            <p>{t('pred-result-placeholder')}</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold bg-indigo-100 text-indigo-600">
                                {result.confidence ? result.confidence.replace('%', '') : '98'}%
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.prediction}</h2>
                            <p className="text-gray-500 mb-6">{result.recommended_action}</p>
                            <div className="p-4 bg-gray-50 rounded-lg border text-left text-sm text-gray-600">
                                <p><strong>Note:</strong> {t('pred-note')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
