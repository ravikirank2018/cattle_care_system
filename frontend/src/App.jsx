import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import VoiceAssistant from './components/VoiceAssistant';
import Dashboard from './pages/Dashboard';
import SmartTrade from './pages/SmartTrade';
import DiseaseDetection from './pages/DiseaseDetection';
import Advisory from './pages/Advisory';
import Login from './pages/Login';
import Cows from './pages/Cows';
import Grants from './pages/Grants';
import Health from './pages/Health';
import Services from './pages/Services';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Predict from './pages/Predict';
import MarketTrade from './pages/MarketTrade';
import ProjectWorkflow from './pages/ProjectWorkflow';
import ProjectAlgorithms from './pages/ProjectAlgorithms';
import AlgorithmDiseaseScanner from './pages/AlgorithmDiseaseScanner';
import AlgorithmSmartTrade from './pages/AlgorithmSmartTrade';
import AlgorithmAdvisory from './pages/AlgorithmAdvisory';
import AlgorithmVoiceAI from './pages/AlgorithmVoiceAI';
import AlgorithmMultiLang from './pages/AlgorithmMultiLang';
import AlgorithmDashboard from './pages/AlgorithmDashboard';
import Methodology from './pages/Methodology';
import AlgorithmImplementation from './pages/AlgorithmImplementation';
import AlgorithmObjectives from './pages/AlgorithmObjectives';
import ProblemStatement from './pages/ProblemStatement';
import SystemArchitectureDemo from './pages/SystemArchitectureDemo';
import ModelPerformance from './pages/ModelPerformance';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import { LayoutDashboard, Coins, Stethoscope, Lightbulb, LogOut, Menu, X, Bell, Settings as SettingsIcon, LayoutGrid, ScrollText } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const { t, currentLang, setCurrentLang } = useLanguage();
    const { logout } = useAuth();
    const location = useLocation();

    // Helper to highlight active link
    const isActive = (path) => location.pathname === path
        ? 'bg-[#253D2E] text-[#B6E63E] font-bold shadow-md' // Capital Dark BG + Lime Text
        : 'hover:bg-gray-50 text-gray-500 hover:text-[#253D2E] font-medium transition-colors';

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`w-72 h-screen fixed left-0 top-0 flex flex-col z-40 transition-transform duration-300 border-r border-gray-100 bg-white shadow-soft overflow-y-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Brand Header Area */}
                <div className="bg-[#FFFFFF] p-6 mb-6 flex items-center gap-3 border-b border-gray-100">
                    <div className="w-10 h-10 bg-[#253D2E] text-[#B6E63E] rounded-full flex items-center justify-center text-xl shadow-md">🐄</div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#253D2E]">{t('logo')}</h1>

                    {/* Close button for Mobile */}
                    <button onClick={onClose} className="lg:hidden ml-auto text-[#212529] hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    <Link to="/" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/')}`}>
                        <LayoutDashboard size={20} /> <span className="font-medium">{t('nav-dashboard')}</span>
                    </Link>
                    <Link to="/trade" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/trade')}`}>
                        <Coins size={20} /> <span className="font-medium">{t('nav-trade')}</span>
                    </Link>
                    <Link to="/disease" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/disease')}`}>
                        <Stethoscope size={20} /> <span className="font-medium">{t('nav-disease')}</span>
                    </Link>
                    <Link to="/advisory" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/advisory')}`}>
                        <Lightbulb size={20} /> <span className="font-medium">{t('nav-advisory')}</span>
                    </Link>
                    <Link to="/cows" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/cows')}`}>
                        <ScrollText size={20} /> <span className="font-medium">{t('nav-cows')}</span>
                    </Link>
                    <Link to="/services" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/services')}`}>
                        <LayoutGrid size={20} /> <span className="font-medium">{t('nav-services')}</span>
                    </Link>
                    <Link to="/alerts" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/alerts')}`}>
                        <Bell size={20} /> <span className="font-medium">{t('nav-alerts')}</span>
                    </Link>
                    <Link to="/settings" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 ${isActive('/settings')}`}>
                        <SettingsIcon size={20} /> <span className="font-medium">{t('nav-settings')}</span>
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    {/* Logout Button Removed */}

                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-3 ml-2">Language / ഭാഷ / भाषा</p>
                    <select
                        value={currentLang}
                        onChange={(e) => setCurrentLang(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 cursor-pointer hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        style={{ fontSize: '0.9rem' }}
                    >
                        <option value="en-US">English</option>
                        <option value="hi-IN">Hindi (हिंदी)</option>
                        <option value="te-IN">Telugu (తెలుగు)</option>
                        <option value="ta-IN">Tamil (தமிழ்)</option>
                        <option value="ml-IN">Malayalam (മലയാളം)</option>
                        <option value="kn-IN">Kannada (ಕನ್ನಡ)</option>
                    </select>
                </div>
            </aside >
        </>
    );
};

const ProtectedRoute = ({ children }) => {
    // Auth Check removed
    return children;
};

import TopNavbar from './components/TopNavbar';

import TestPage from './pages/TestPage'; // Auto-imported

const MainContent = () => {
    return (
        <div className="min-h-screen bg-3d-depth pt-28 px-6 md:px-12 pb-12 transition-all duration-300 max-w-[1800px] mx-auto page-transition">
            <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/trade" element={<ProtectedRoute><SmartTrade /></ProtectedRoute>} />
                <Route path="/disease" element={<ProtectedRoute><DiseaseDetection /></ProtectedRoute>} />
                <Route path="/advisory" element={<ProtectedRoute><Advisory /></ProtectedRoute>} />
                <Route path="/cows" element={<ProtectedRoute><Cows /></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/grants" element={<ProtectedRoute><Grants /></ProtectedRoute>} />
                <Route path="/health" element={<ProtectedRoute><Health /></ProtectedRoute>} />
                <Route path="/predict" element={<ProtectedRoute><Predict /></ProtectedRoute>} />
                <Route path="/market-trade" element={<ProtectedRoute><MarketTrade /></ProtectedRoute>} />
                <Route path="/algorithms" element={<ProjectAlgorithms />} />
                <Route path="/algorithms/disease-scanner" element={<AlgorithmDiseaseScanner />} />
                <Route path="/algorithms/smart-trade" element={<AlgorithmSmartTrade />} />
                <Route path="/algorithms/advisory" element={<AlgorithmAdvisory />} />

                <Route path="/algorithms/voice-ai" element={<AlgorithmVoiceAI />} />
                <Route path="/algorithms/multilingual" element={<AlgorithmMultiLang />} />
                <Route path="/algorithms/dashboard" element={<AlgorithmDashboard />} />
                <Route path="/methodology" element={<Methodology />} />
                <Route path="/algorithm-implementation" element={<AlgorithmImplementation />} />
                <Route path="/algorithms/objectives" element={<AlgorithmObjectives />} />
                <Route path="/problem-statement" element={<ProblemStatement />} />
                <Route path="/system-arch-demo" element={<SystemArchitectureDemo />} />
                <Route path="/workflow" element={<ProjectWorkflow />} />

                {/* Hidden Test Page */}
                <Route path="/test-api" element={<TestPage />} />
                <Route path="/secret-metrics" element={<ModelPerformance />} />
            </Routes>
        </div>
    );
}

const AppLayout = () => {
    return (
        <>
            <TopNavbar />
            <MainContent />
            <NavHandler>
                {(navigate) => <VoiceAssistantWithContext navigate={navigate} />}
            </NavHandler>
        </>
    );
};

// Wrapper to provide Context
const App = () => {
    return (
        <AuthProvider>
            <LanguageProvider>
                <Router>
                    <Routes>
                        <Route path="/*" element={<AppLayout />} />
                    </Routes>
                </Router>
            </LanguageProvider>
        </AuthProvider>
    );
};

// Hook bridge for Voice Assistant
const VoiceAssistantWithContext = ({ navigate }) => {
    const { currentLang } = useLanguage();
    return <VoiceAssistant currentLang={currentLang} onNavigate={navigate} />;
}

const NavHandler = ({ children }) => {
    const navigate = useNavigate();
    return children(navigate);
};

export default App;

