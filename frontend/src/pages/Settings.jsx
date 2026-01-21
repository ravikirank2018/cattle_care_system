import { useLanguage } from '../context/LanguageContext'
import React, { useState } from 'react'
import { User, Bell, Globe, Shield, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
    const { t, currentLang, setCurrentLang } = useLanguage()
    const { logout, user } = useAuth()
    const [preferences, setPreferences] = useState({ notifications: true, language: 'en', theme: 'light' })

    const handleSave = () => {
        alert("Settings saved (Simulated)")
    }

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">{t('settings-title')}</h1>
                <p className="text-gray-500">{t('settings-subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-[#253D2E] rounded-full flex items-center justify-center text-4xl mb-4 text-[#B6E63E] font-bold border-4 border-white shadow-xl">
                            {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <h2 className="text-xl font-bold text-[#253D2E]">{user?.username || 'User'}</h2>
                        <p className="text-gray-500 text-sm">{t('stg-account')}</p>
                        <button onClick={logout} className="mt-6 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium w-full justify-center">
                            <LogOut size={18} /> {t('stg-signout')}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-[#253D2E] mb-4 flex items-center gap-2"><Globe size={20} /> {t('stg-pref')}</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-[#F4F7F4] rounded-lg border border-gray-100">
                                <span className="font-medium text-[#253D2E]">{t('stg-lang')}</span>
                                <select
                                    className="bg-white border border-gray-300 p-2 rounded-lg text-sm text-black font-bold"
                                    value={currentLang}
                                    onChange={(e) => setCurrentLang(e.target.value)}
                                >
                                    <option value="en-US" className="text-black font-bold">English</option>
                                    <option value="hi-IN" className="text-black font-bold">Hindi</option>
                                    <option value="te-IN" className="text-black font-bold">Telugu</option>
                                    <option value="ml-IN" className="text-black font-bold">Malayalam</option>
                                    <option value="ta-IN" className="text-black font-bold">Tamil</option>
                                    <option value="kn-IN" className="text-black font-bold">Kannada</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#F4F7F4] rounded-lg border border-gray-100">
                                <span className="font-medium text-[#253D2E]">{t('stg-theme')}</span>
                                <select className="bg-white border p-2 rounded-lg text-sm">
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="system">System</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-[#253D2E] mb-4 flex items-center gap-2"><Bell size={20} /> {t('stg-notif')}</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-[#F4F7F4] rounded-lg border border-gray-100">
                                <span className="font-medium text-[#253D2E]">{t('stg-push')}</span>
                                <input type="checkbox" checked={preferences.notifications} onChange={e => setPreferences({ ...preferences, notifications: e.target.checked })} className="accent-[#253D2E] w-5 h-5" />
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#F4F7F4] rounded-lg border border-gray-100">
                                <span className="font-medium text-[#253D2E]">{t('stg-email')}</span>
                                <input type="checkbox" defaultChecked className="accent-[#253D2E] w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-[#253D2E] mb-4 flex items-center gap-2"><Shield size={20} /> {t('stg-security')}</h3>
                        <button className="text-[#4A6741] font-bold hover:underline">{t('stg-change-pw')}</button>
                    </div>

                    <div className="text-right">
                        <button onClick={handleSave} className="bg-[#253D2E] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0D1A12] transition shadow-lg">{t('stg-save')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

