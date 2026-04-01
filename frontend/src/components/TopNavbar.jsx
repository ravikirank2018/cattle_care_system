import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coins, Stethoscope, Lightbulb, Bell, Settings, Menu, X, ScrollText, LayoutGrid, Mic } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
    const { t, currentLang, setCurrentLang } = useLanguage();
    const { logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path
        ? 'bg-[#B6E63E] text-[#253D2E] font-bold shadow-lg transform -translate-y-0.5'
        : 'text-white/80 hover:text-white hover:bg-white/10';

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#253D2E] text-white shadow-xl h-16 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">

                {/* Logo & Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B6E63E] text-[#253D2E] rounded-xl flex items-center justify-center text-2xl font-bold shadow-inner">
                        <span className="transform -rotate-6">🐄</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden md:block">Cattle<span className="text-[#B6E63E]">Care</span></span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar px-4">
                    <Link to="/" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/')}`}>
                        <LayoutDashboard size={18} /> {t('nav-dashboard') || 'Dashboard'}
                    </Link>
                    <Link to="/trade" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/trade')}`}>
                        <Coins size={18} /> {t('nav-trade') || 'Trade'}
                    </Link>
                    <Link to="/disease" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/disease')}`}>
                        <Stethoscope size={18} /> {t('nav-disease') || 'Health'}
                    </Link>
                    <Link to="/advisory" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/advisory')}`}>
                        <Lightbulb size={18} /> {t('nav-advisory') || 'Advisory'}
                    </Link>
                    <Link to="/cows" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/cows')}`}>
                        <ScrollText size={18} /> {t('nav-cows') || 'Cows'}
                    </Link>
                    <Link to="/acoustic-detection" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/acoustic-detection')}`}>
                        <Mic size={18} /> Audio
                    </Link>
                    <Link to="/services" className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${isActive('/services')}`}>
                        <LayoutGrid size={18} /> {t('nav-services') || 'Services'}
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <select
                        value={currentLang}
                        onChange={(e) => setCurrentLang(e.target.value)}
                        className="bg-white border-2 border-[#B6E63E] rounded-lg px-3 py-1.5 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#B6E63E] cursor-pointer hover:bg-gray-100 transition-colors shadow-md"
                    >
                        <option value="en-US" className="text-black bg-white font-bold">🇺🇸 English</option>
                        <option value="hi-IN" className="text-black bg-white font-bold">🇮🇳 Hindi</option>
                        <option value="te-IN" className="text-black bg-white font-bold">🇮🇳 Telugu</option>
                        <option value="ml-IN" className="text-black bg-white font-bold">🇮🇳 Malayalam</option>
                        <option value="ta-IN" className="text-black bg-white font-bold">🇮🇳 Tamil</option>
                        <option value="kn-IN" className="text-black bg-white font-bold">🇮🇳 Kannada</option>
                    </select>

                    <Link to="/alerts" className="relative p-2 hover:bg-white/10 rounded-full transition group">
                        <Bell size={20} className="group-hover:text-[#B6E63E] transition-colors" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </Link>

                    <Link to="/settings" className="p-2 hover:bg-white/10 rounded-full transition hidden sm:block">
                        <Settings size={20} />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-[#253D2E] border-t border-white/10 shadow-2xl p-4 flex flex-col gap-2 animate-fade-in-down z-50">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/')}`}>
                        <LayoutDashboard size={20} /> {t('nav-dashboard')}
                    </Link>
                    <Link to="/trade" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/trade')}`}>
                        <Coins size={20} /> {t('nav-trade')}
                    </Link>
                    <Link to="/disease" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/disease')}`}>
                        <Stethoscope size={20} /> {t('nav-disease')}
                    </Link>
                    <Link to="/advisory" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/advisory')}`}>
                        <Lightbulb size={20} /> {t('nav-advisory')}
                    </Link>
                    <Link to="/cows" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/cows')}`}>
                        <ScrollText size={20} /> {t('nav-cows')}
                    </Link>
                    <Link to="/acoustic-detection" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/acoustic-detection')}`}>
                        <Mic size={20} /> Audio Surveillance
                    </Link>
                    <Link to="/services" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/services')}`}>
                        <LayoutGrid size={20} /> {t('nav-services')}
                    </Link>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl flex items-center gap-4 ${isActive('/settings')}`}>
                        <Settings size={20} /> {t('nav-settings')}
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default TopNavbar;

