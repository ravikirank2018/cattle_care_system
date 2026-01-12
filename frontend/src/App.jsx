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
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import { LayoutDashboard, Coins, Stethoscope, Lightbulb, LogOut, Menu, X, Bell, Settings as SettingsIcon, LayoutGrid, ScrollText } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const { t, currentLang, setCurrentLang } = useLanguage();
    const { logout } = useAuth();
    const location = useLocation();

    // Helper to highlight active link
    const isActive = (path) => location.pathname === path ? 'bg-emerald-800 shadow-inner' : 'hover:bg-emerald-800';

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
                className={`w-72 h-screen fixed left-0 top-0 flex flex-col p-6 z-40 transition-transform duration-300 border-r border-white/10 backdrop-blur-xl bg-emerald-950/80 shadow-[10px_0_30px_rgba(0,0,0,0.1)] overflow-y-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-10 pl-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">🐄</div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">{t('logo')}</h1>
                    </div>
                    {/* Close button - Visible on all screens now */}
                    <button onClick={onClose} className="text-white hover:text-emerald-200">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 flex flex-col gap-2">
                    <Link to="/" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/')}`}>
                        <LayoutDashboard size={20} /> <span className="font-medium">{t('nav-dashboard')}</span>
                    </Link>
                    <Link to="/trade" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/trade')}`}>
                        <Coins size={20} /> <span className="font-medium">{t('nav-trade')}</span>
                    </Link>
                    <Link to="/disease" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/disease')}`}>
                        <Stethoscope size={20} /> <span className="font-medium">{t('nav-disease')}</span>
                    </Link>
                    <Link to="/advisory" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/advisory')}`}>
                        <Lightbulb size={20} /> <span className="font-medium">{t('nav-advisory')}</span>
                    </Link>
                    <Link to="/cows" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/cows')}`}>
                        <ScrollText size={20} /> <span className="font-medium">{t('nav-cows')}</span>
                    </Link>
                    <Link to="/services" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/services')}`}>
                        <LayoutGrid size={20} /> <span className="font-medium">{t('nav-services')}</span>
                    </Link>
                    <Link to="/alerts" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/alerts')}`}>
                        <Bell size={20} /> <span className="font-medium">{t('nav-alerts')}</span>
                    </Link>
                    <Link to="/settings" onClick={onClose} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-200 text-white ${isActive('/settings')}`}>
                        <SettingsIcon size={20} /> <span className="font-medium">{t('nav-settings')}</span>
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-emerald-800">
                    <button
                        onClick={logout}
                        className="w-full p-3 rounded-xl flex items-center gap-3 text-red-200 hover:bg-red-900/30 transition-all mb-4"
                    >
                        <LogOut size={18} /> <span className="font-medium">Logout</span>
                    </button>

                    <p className="text-xs text-emerald-300 uppercase font-bold tracking-wider mb-3 ml-2">Language / ഭാഷ / भाषा</p>
                    <select
                        value={currentLang}
                        onChange={(e) => setCurrentLang(e.target.value)}
                        className="w-full bg-emerald-900 border-none text-white cursor-pointer hover:bg-emerald-800"
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
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

const MainContent = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div
            className={`min-h-screen transition-all duration-300 
            ${isSidebarOpen ? 'ml-72' : 'ml-0'} 
            p-8 pt-24`}
        >
            <button
                onClick={toggleSidebar}
                className="fixed top-6 left-6 z-30 p-2 bg-white/80 backdrop-blur-md shadow-lg rounded-full hover:bg-white text-emerald-800 transition-all hover:scale-105"
                title="Toggle Menu"
            >
                <Menu size={20} />
            </button>

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
            </Routes>
        </div>
    );
}

const AppLayout = () => {
    // Default open for better desktop experience, but togglable
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <MainContent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
                        <Route path="/login" element={<Login />} />
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
