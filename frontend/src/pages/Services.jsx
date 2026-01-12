import { useLanguage } from '../context/LanguageContext'
import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, CircleDollarSign, GraduationCap, Coins, ChevronRight } from 'lucide-react'

export default function Services() {
    const { t } = useLanguage()
    const services = [
        {
            title: t('srv-health-hub'),
            desc: t('srv-health-desc'),
            icon: <Activity size={32} />,
            path: '/health',
            color: 'bg-red-100 text-red-600',
            border: 'border-l-red-500'
        },
        {
            title: t('srv-trade'),
            desc: t('srv-trade-desc'),
            icon: <Coins size={32} />,
            path: '/trade',
            color: 'bg-emerald-100 text-emerald-600',
            border: 'border-l-emerald-500'
        },
        {
            title: t('srv-advisory'),
            desc: t('srv-advisory-desc'),
            icon: <GraduationCap size={32} />,
            path: '/advisory',
            color: 'bg-blue-100 text-blue-600',
            border: 'border-l-blue-500'
        },
        {
            title: t('srv-grants'),
            desc: t('srv-grants-desc'),
            icon: <CircleDollarSign size={32} />,
            path: '/grants',
            color: 'bg-amber-100 text-amber-600',
            border: 'border-l-amber-500'
        }
    ]

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{t('srv-title')}</h1>
                <p className="text-gray-500">{t('srv-subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {services.map((s, i) => (
                    <Link key={i} to={s.path} className={`glass-card p-6 hover:shadow-xl transition group border-l-4 ${s.border}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-xl ${s.color}`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition">{s.title}</h3>
                                    <p className="text-gray-500 text-sm">{s.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
