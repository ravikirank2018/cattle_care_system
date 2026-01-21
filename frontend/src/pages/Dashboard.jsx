import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, DollarSign, CloudSun, BarChart3, Video, Warehouse, Map, Droplets, Wheat, Stethoscope, MapPin, ScrollText, TrendingUp, CircleDollarSign, LayoutGrid } from 'lucide-react';
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
            backgroundColor: '#B6E63E', // Capital Lime
            borderRadius: 6
        }]
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <header className="flex justify-between items-end mb-8 animate-fade-in">
                <div>
                    <h1 className="text-4xl font-black text-[#253D2E] tracking-tight leading-tight">{t('title-dashboard')}</h1>
                    <p className="text-[#4A6741] font-medium mt-2 text-lg">{t('subtitle-dashboard')}</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#B6E63E] text-[#253D2E] p-2 px-4 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transform rotate-1">
                        <span className="w-2 h-2 rounded-full bg-[#253D2E] animate-pulse"></span> {t('status-db')}
                    </div>
                </div>
            </header>

            {/* HERO SECTION - 3D BLOCKS STYLE */}
            <div className="mb-12 animate-fade-in-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                    {/* Step 1 - Register */}
                    <Link to="/cows" className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <div className="bg-[#253D2E] rounded-3xl p-8 text-white h-full relative overflow-hidden shadow-[8px_8px_0px_#B6E63E] border border-[#2a4d3a]">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#4A6741] rounded-full blur-3xl opacity-20"></div>
                            <div className="w-16 h-16 bg-[#B6E63E] text-[#253D2E] rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-inner">
                                <ScrollText size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">{t('step-1-title') || 'Register Cattle'}</h3>
                            <p className="text-gray-300 font-medium leading-relaxed">{t('step-1-desc') || 'Add your herd details to the digital registry.'}</p>
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-[#B6E63E] text-[#253D2E] text-xs font-bold px-3 py-1 rounded-full">Start Now &rarr;</span>
                            </div>
                        </div>
                    </Link>

                    {/* Step 2 - Monitor */}
                    <Link to="/disease" className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <div className="bg-[#4A6741] rounded-3xl p-8 text-white h-full relative overflow-hidden shadow-[8px_8px_0px_#253D2E]">
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#B6E63E] rounded-full blur-3xl opacity-20"></div>
                            <div className="w-16 h-16 bg-white text-[#4A6741] rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-inner">
                                <Stethoscope size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">{t('step-2-title') || 'Monitor Health'}</h3>
                            <p className="text-green-50 font-medium leading-relaxed">{t('step-2-desc') || 'Use AI Disease Scanner to ensure well-being.'}</p>
                        </div>
                    </Link>

                    {/* Step 3 - Access */}
                    <Link to="/services" className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
                        <div className="bg-white rounded-3xl p-8 h-full relative overflow-hidden shadow-[8px_8px_0px_#4A6741] border border-[#253D2E]/10">
                            <div className="w-16 h-16 bg-[#253D2E] text-[#B6E63E] rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-xl">
                                <LayoutGrid size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#253D2E] mb-2 tracking-tight">{t('step-3-title') || 'Access Services'}</h3>
                            <p className="text-[#4A6741] font-medium leading-relaxed">{t('step-3-desc') || 'Get fair trade prices and government grants.'}</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* QUICK ACTIONS WIDGETS */}
            <div className="mb-8 hidden">
                {/* Hidden as duplicated by Hero 3D Blocks, cleaner UI */}
            </div>

            {/* 1. TOP STATS - 3D Minimal */}
            <h2 className="text-2xl font-bold text-[#253D2E] mb-6 flex items-center gap-2">
                <span className="w-3 h-8 bg-[#253D2E] rounded-r-full"></span> Farm Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#F4F7F4] p-6 rounded-3xl border border-[#253D2E]/10 hover:shadow-[5px_5px_0px_#B6E63E] transition-all cursor-default relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#B6E63E]/20 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
                    <div className="text-[#4A6741] font-bold uppercase text-xs tracking-wider mb-2">{t('total-cattle')}</div>
                    <div className="text-4xl font-black text-[#253D2E]">{data.stats.total_cattle}</div>
                    <Activity className="absolute bottom-6 right-6 text-[#253D2E]/10" size={48} />
                </div>

                <div className="bg-[#F4F7F4] p-6 rounded-3xl border border-[#253D2E]/10 hover:shadow-[5px_5px_0px_#ef4444] transition-all cursor-default relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
                    <div className="text-red-500 font-bold uppercase text-xs tracking-wider mb-2">{t('health-alerts')}</div>
                    <div className="text-4xl font-black text-[#253D2E]">{data.stats.health_alerts}</div>
                    <AlertTriangle className="absolute bottom-6 right-6 text-red-500/10" size={48} />
                </div>

                <div className="bg-[#253D2E] p-6 rounded-3xl text-white hover:shadow-[5px_5px_0px_#4A6741] transition-all cursor-default relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#B6E63E]/20 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
                    <div className="text-[#B6E63E] font-bold uppercase text-xs tracking-wider mb-2">{t('market-rate')}</div>
                    <div className="text-4xl font-black text-white flex items-baseline gap-1">₹{data.stats.market_rate}<span className="text-sm font-medium opacity-60">/kg</span></div>
                    <DollarSign className="absolute bottom-6 right-6 text-white/10" size={48} />
                </div>

                <div className="bg-[#B6E63E] p-6 rounded-3xl text-[#253D2E] hover:shadow-[5px_5px_0px_#253D2E] transition-all cursor-default relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/30 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110"></div>
                    <div className="text-[#253D2E]/80 font-bold uppercase text-xs tracking-wider mb-2">{t('weather')}</div>
                    <div className="text-4xl font-black text-[#253D2E]">{data.stats.weather}</div>
                    <CloudSun className="absolute bottom-6 right-6 text-[#253D2E]/10" size={48} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. INFRASTRUCTURE & RESOURCES */}
                <div className="glass-card p-6 lg:col-span-1 space-y-6">
                    <h2 className="text-lg font-bold text-[#253D2E] flex items-center gap-2"><Warehouse size={20} className="text-[#4A6741]" /> {t('dash-infra')}</h2>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <Map size={24} className="mx-auto text-[#253D2E] mb-1" />
                            <p className="text-xl font-bold">{data.infrastructure.acres}</p>
                            <p className="text-xs text-gray-500">{t('dash-acres')}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <Warehouse size={24} className="mx-auto text-[#4A6741] mb-1" />
                            <p className="text-xl font-bold">{data.infrastructure.sheds}</p>
                            <p className="text-xs text-gray-500">{t('dash-sheds')}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <div className="relative inline-block">
                                <Video size={24} className="mx-auto text-[#253D2E] mb-1" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            </div>
                            <p className="text-xs font-bold mt-1">CCTV</p>
                            <p className="text-[10px] text-[#4A6741] font-bold">{t('status-live')}</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div>
                            <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                                <span className="flex items-center gap-1"><Wheat size={14} /> {t('dash-feed')}</span> <span>{data.infrastructure.feed_stock}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#B6E63E]" style={{ width: `${data.infrastructure.feed_stock}%` }}></div></div>
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
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4"><BarChart3 size={20} className="text-indigo-500" /> {t('dash-trends')}</h2>
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
                <div className="glass-card p-6 bg-gradient-to-br from-[#F4F7F4] to-white">
                    <h2 className="text-lg font-bold text-[#253D2E] flex items-center gap-2 mb-4"><MapPin size={20} className="text-[#4A6741]" /> {t('dash-vets')}</h2>
                    <div className="space-y-3">
                        {data.nearby_vets.map((v, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div>
                                    <p className="font-bold text-[#253D2E]">{v.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{v.dist} away</span> • <span className="text-[#B6E63E] text-sm">★ {v.rating}</span>
                                    </div>
                                </div>
                                <button onClick={() => openMap()} className="px-3 py-1 bg-[#253D2E] text-[#B6E63E] text-xs font-bold rounded-full hover:bg-[#0D1A12] transition shadow-sm">
                                    {t('dash-nav')}
                                </button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => openMap()} className="w-full mt-4 py-2 bg-[#253D2E] text-white rounded-lg font-bold text-sm hover:bg-[#0D1A12] transition shadow-lg">
                        {t('dash-view-map')}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-2">{t('disclaimer-gps')}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

