import { useLanguage } from '../context/LanguageContext'
import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, CircleDollarSign, GraduationCap, Coins, ChevronRight, LayoutGrid } from 'lucide-react'

export default function Services() {
    const { t } = useLanguage()
    const services = [
        {
            title: t('srv-health-hub'),
            desc: t('srv-health-desc'),
            icon: <Activity size={32} />,
            path: '/health',
            color: 'bg-[#253D2E] text-[#B6E63E]',
            border: 'border-l-[#253D2E]'
        },
        {
            title: t('srv-trade'),
            desc: t('srv-trade-desc'),
            icon: <Coins size={32} />,
            path: '/trade',
            color: 'bg-[#4A6741] text-white',
            border: 'border-l-[#4A6741]'
        },
        {
            title: t('srv-advisory'),
            desc: t('srv-advisory-desc'),
            icon: <GraduationCap size={32} />,
            path: '/advisory',
            color: 'bg-[#B6E63E] text-[#253D2E]',
            border: 'border-l-[#B6E63E]'
        },
        {
            title: t('srv-grants'),
            desc: t('srv-grants-desc'),
            icon: <CircleDollarSign size={32} />,
            path: '/grants',
            color: 'bg-[#F4F7F4] text-[#253D2E] ring-1 ring-[#253D2E]/20',
            border: 'border-l-[#253D2E]/50'
        }
    ]

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header className="mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <LayoutGrid size={36} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#253D2E] tracking-tight">{t('srv-title')}</h1>
                        <p className="text-[#4A6741] font-medium">{t('srv-subtitle')}</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {services.map((s, i) => (
                    <Link key={i} to={s.path} className={`glass-card p-6 hover:shadow-xl transition group border-l-4 ${s.border}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-xl shadow-md ${s.color}`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#253D2E] group-hover:text-[#4A6741] transition">{s.title}</h3>
                                    <p className="text-[#4A6741] text-sm font-medium">{s.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-[#253D2E]/30 group-hover:text-[#253D2E] group-hover:translate-x-1 transition" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

