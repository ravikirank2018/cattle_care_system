import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, DollarSign, CloudSun, BarChart3, Video, Warehouse, Map, Droplets, Wheat, Stethoscope, MapPin, ScrollText, TrendingUp, CircleDollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    const { t } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
                const res = await axios.get(`${API_URL}/api/dashboard`);
                setData(res.data);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 429) {
                    setData({ error: "quota_exceeded" });
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const openMap = (lat, lng) => {
        // Mock Geo-Location (Opens Google Maps searching for Vets nearby)
        window.open(`https://www.google.com/maps/search/veterinary+hospital+near+me`, '_blank');
    };

    if (loading) return <div className="p-10 text-center animate-pulse">Loading Farm Intelligence...</div>;

    // Handle Quota Error specifically
    if (data && data.error === "quota_exceeded") {
        return (
            <div className="p-10 text-center space-y-4">
                <div className="text-amber-500 font-bold text-xl">⚠️ AI Service Busy (Quota Exceeded)</div>
                <p className="text-gray-600">The free AI tier has reached its minute limit.<br />Please wait a moment and refresh.</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200">Retry Now</button>
            </div>
        );
    }

    if (!data) return <div className="p-10 text-center text-red-500">System Offline.</div>;

    const chartConfig = {
        labels: data.milk_chart.map(m => m.date.slice(5)),
        datasets: [{
            label: t('chart-milk') || 'Milk Yield (Liters)',
            data: data.milk_chart.map(m => m.value),
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderRadius: 8
        }]
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{t('title-dashboard')}</h1>
                    <p className="text-gray-500 mt-2">{t('subtitle-dashboard')}</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white/80 p-2 px-4 rounded-full text-xs font-bold border shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {t('status-db')}
                    </div>
                </div>
            </header>

            {/* QUICK ACTIONS WIDGETS */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-indigo-600 rounded-full"></span> Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/cows" className="glass-card p-6 group hover:-translate-y-2 transition duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-emerald-500/20"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition duration-300 shadow-sm"><ScrollText size={28} /></div>
                            <span className="bg-emerald-100/50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/50">{data.stats.total_cattle} Total</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-700 transition">{t('nav-cows')}</h3>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">Manage herd registry & health records</p>
                        </div>
                    </Link>

                    <Link to="/market-trade" className="glass-card p-6 group hover:-translate-y-2 transition duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-blue-500/20"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition duration-300 shadow-sm"><TrendingUp size={28} /></div>
                            <span className="bg-blue-100/50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200/50">{data.stats.active_trades || 3} Active</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition">{t('dash-active-trades')}</h3>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">Fair price calculator & sales</p>
                        </div>
                    </Link>

                    <Link to="/grants" className="glass-card p-6 group hover:-translate-y-2 transition duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-amber-500/20"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-4 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition duration-300 shadow-sm"><CircleDollarSign size={28} /></div>
                            <span className="bg-amber-100/50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200/50">{data.stats.available_grants || 4} New</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-700 transition">{t('dash-govt-grants')}</h3>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">View available subsidies</p>
                        </div>
                    </Link>

                    <Link to="/health" className="glass-card p-6 group hover:-translate-y-2 transition duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition group-hover:bg-red-500/20"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-4 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl text-red-600 group-hover:scale-110 transition duration-300 shadow-sm"><Activity size={28} /></div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${data.stats.health_risk_level === 'Low' ? 'bg-green-100/50 text-green-700 border-green-200/50' : 'bg-red-100/50 text-red-700 border-red-200/50'}`}>
                                {data.stats.health_risk_level || 'Normal'} Risk
                            </span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition">{t('dash-health-ai')}</h3>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">Predictive analysis & checks</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* 1. TOP STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 flex items-center gap-5 border-l-4 border-emerald-500">
                    <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full"><Activity size={24} /></div>
                    <div><p className="text-gray-500 text-sm font-bold uppercase">{t('total-cattle')}</p><p className="text-3xl font-bold">{data.stats.total_cattle}</p></div>
                </div>
                <div className="glass-card p-6 flex items-center gap-5 border-l-4 border-red-500">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full"><AlertTriangle size={24} /></div>
                    <div><p className="text-gray-500 text-sm font-bold uppercase">{t('health-alerts')}</p><p className="text-3xl font-bold text-red-600">{data.stats.health_alerts}</p></div>
                </div>
                {/* Updated Market Price Label */}
                <div className="glass-card p-6 flex items-center gap-5 border-l-4 border-blue-500">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><DollarSign size={24} /></div>
                    <div><p className="text-gray-500 text-sm font-bold uppercase">{t('market-rate')}</p><p className="text-3xl font-bold text-gray-800">₹{data.stats.market_rate}<span className="text-xs font-normal text-gray-400">{t('unit-kg')}</span></p></div>
                </div>
                <div className="glass-card p-6 flex items-center gap-5 border-l-4 border-amber-500">
                    <div className="bg-amber-100 text-amber-600 p-3 rounded-full"><CloudSun size={24} /></div>
                    <div><p className="text-gray-500 text-sm font-bold uppercase">{t('weather')}</p><p className="text-3xl font-bold text-gray-800">{data.stats.weather}</p></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. INFRASTRUCTURE & RESOURCES */}
                <div className="glass-card p-6 lg:col-span-1 space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Warehouse size={20} className="text-indigo-500" /> {t('dash-infra')}</h2>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded-lg border">
                            <Map size={24} className="mx-auto text-green-600 mb-1" />
                            <p className="text-xl font-bold">{data.infrastructure.acres}</p>
                            <p className="text-xs text-gray-500">{t('dash-acres')}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                            <Warehouse size={24} className="mx-auto text-orange-600 mb-1" />
                            <p className="text-xl font-bold">{data.infrastructure.sheds}</p>
                            <p className="text-xs text-gray-500">{t('dash-sheds')}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                            <div className="relative inline-block">
                                <Video size={24} className="mx-auto text-blue-600 mb-1" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            </div>
                            <p className="text-xs font-bold mt-1">CCTV</p>
                            <p className="text-[10px] text-green-600 font-bold">{t('status-live')}</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                                <span className="flex items-center gap-1"><Wheat size={14} /> {t('dash-feed')}</span> <span>{data.infrastructure.feed_stock}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${data.infrastructure.feed_stock}%` }}></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                                <span className="flex items-center gap-1"><Droplets size={14} /> {t('dash-water')}</span> <span>{data.infrastructure.water_tank}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${data.infrastructure.water_tank}%` }}></div></div>
                        </div>
                    </div>
                </div>

                {/* 3. CHART */}
                <div className="glass-card p-6 lg:col-span-2">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4"><BarChart3 size={20} className="text-emerald-500" /> {t('dash-trends')}</h2>
                    <div className="h-56">
                        <Bar data={chartConfig} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 4. HEALTH HISTORY */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4"><Stethoscope size={20} className="text-red-500" /> {t('dash-sick')}</h2>
                    <div className="space-y-4 max-h-48 overflow-auto">
                        {data.health_history && data.health_history.length > 0 ? (
                            data.health_history.map((h, i) => (
                                <div key={i} className="flex gap-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                                    <div className="text-xs font-bold text-red-400 shrink-0 w-20">{h.date}</div>
                                    <div className="text-sm text-gray-700 font-medium">{h.details}</div>
                                </div>
                            ))
                        ) : <p className="text-gray-400 text-sm">{t('dash-no-sick')}</p>}
                    </div>
                </div>

                {/* 5. NEARBY VETS */}
                <div className="glass-card p-6 bg-gradient-to-br from-indigo-50 to-white">
                    <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4"><MapPin size={20} className="text-indigo-600" /> {t('dash-vets')}</h2>
                    <div className="space-y-3">
                        {data.nearby_vets.map((v, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-indigo-100">
                                <div>
                                    <p className="font-bold text-gray-800">{v.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{v.dist} away</span> • <span className="text-yellow-500">★ {v.rating}</span>
                                    </div>
                                </div>
                                <button onClick={() => openMap()} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full hover:bg-indigo-200 transition">
                                    {t('dash-nav')}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => openMap()} className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        {t('dash-view-map')}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-2">{t('disclaimer-gps')}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
