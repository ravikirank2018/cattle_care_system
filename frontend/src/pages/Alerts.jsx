import { useLanguage } from '../context/LanguageContext'
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Bell, AlertTriangle } from 'lucide-react'

export default function Alerts() {
    const { t } = useLanguage()
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        // Try to fetch health metrics and convert to alerts if available
        api.get('/health/metrics').then(res => {
            const m = res.data || []
            const derived = m.slice(0, 10).map((item, i) => ({
                id: item._id || item.id || i,
                type: 'health',
                level: item.temperature > 40 ? 'critical' : 'warning',
                text: `Cow ID ${item.cowId}: High Temp ${item.temperature || 'N/A'}°C`,
                time: new Date(item.timestamp).toLocaleTimeString()
            }))
            setAlerts(derived.length ? derived : getDefaultAlerts())
        }).catch(() => {
            setAlerts(getDefaultAlerts())
        })
    }, [])

    const getDefaultAlerts = () => [
        { id: 1, type: 'health', level: 'critical', text: 'Cow ID #23: Early fever symptoms detected', time: '10:00 AM' },
        { id: 2, type: 'vaccine', level: 'warning', text: 'Cow ID #11: Vaccination due tomorrow', time: 'Yesterday' },
        { id: 3, type: 'yield', level: 'info', text: 'Milk yield dropped by 10% for Cow ID #07', time: '2 Days ago' }
    ]

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                        <Bell size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{t('alerts-title')}</h1>
                        <p className="text-gray-500">{t('alerts-subtitle')}</p>
                    </div>
                </div>
            </header>

            <div className="glass-card p-0 overflow-hidden">
                {alerts.map((a, i) => (
                    <div key={a.id} className={`p-4 border-b last:border-0 flex gap-4 hover:bg-gray-50 transition border-l-4 ${a.level === 'critical' ? 'border-l-red-500 bg-red-50/50' :
                        a.level === 'warning' ? 'border-l-amber-500 bg-amber-50/50' : 'border-l-blue-500'
                        }`}>
                        <div className={`mt-1 ${a.level === 'critical' ? 'text-red-500' :
                            a.level === 'warning' ? 'text-amber-500' : 'text-blue-500'
                            }`}>
                            <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium ${a.level === 'critical' ? 'text-red-900' : 'text-gray-800'}`}>{a.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                        </div>
                    </div>
                ))}
                {alerts.length === 0 && <div className="p-8 text-center text-gray-500">{t('alerts-empty')}</div>}
            </div>
        </div>
    )
}
