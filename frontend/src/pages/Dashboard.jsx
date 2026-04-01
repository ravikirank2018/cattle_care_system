import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, DollarSign, CloudSun, BarChart3, Video, Warehouse, Map, Droplets, Wheat, Stethoscope, MapPin, ScrollText, TrendingUp, CircleDollarSign, LayoutGrid, X, Camera, Plus, QrCode, MonitorSmartphone, BrainCircuit, Scan, Network, WifiOff, Cpu } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useLanguage } from '../context/LanguageContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    const { t } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // CCTV Modal State
    const [isCctvOpen, setIsCctvOpen] = useState(false);
    const [cameras, setCameras] = useState([
        { id: 1, name: "Shed 1 - Main Entrance", type: "cctv", active: true },
        { id: 2, name: "Shed 2 - Milking Zone", type: "cctv", active: true }
    ]);
    const [stream, setStream] = useState(null);
    const videoRef = React.useRef(null);
    const [showAddOptions, setShowAddOptions] = useState(false);
    const [ipInput, setIpInput] = useState('');
    const [showQr, setShowQr] = useState(false);

    const addIpCamera = () => {
        if(ipInput.trim()) {
            setCameras([...cameras, { id: Date.now(), name: `IP: ${ipInput}`, type: "cctv", active: true }]);
            setIpInput('');
            setShowAddOptions(false);
        }
    };

    // Stop webcam if modal closes
    useEffect(() => {
        if (!isCctvOpen && stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [isCctvOpen]);

    const startWebcam = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setCameras([...cameras, { id: Date.now(), name: `New Camera ${cameras.length + 1}`, type: "webcam", active: true }]);
        } catch (err) {
            console.error("Error accessing webcam", err);
            alert("Could not access camera. Please allow permissions.");
        }
    };

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
            
            {/* CCTV Modal */}
            {isCctvOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-[#253D2E] p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <Video className="w-6 h-6 text-[#B6E63E]" />
                                <h2 className="font-bold text-lg">Live Farm Monitoring</h2>
                            </div>
                            <button onClick={() => setIsCctvOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
                            
                            {/* Main Video Area */}
                            <div className="bg-black rounded-2xl aspect-video w-full mb-6 relative overflow-hidden group shadow-lg">
                                {stream ? (
                                    <video 
                                        ref={videoRef} 
                                        autoPlay 
                                        playsInline 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                                        <Camera className="w-16 h-16 animate-pulse opacity-50 mb-4" />
                                        <p className="font-medium tracking-wide">Select a camera or add a new feed</p>
                                    </div>
                                )}
                                
                                {/* Overlay Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> REC
                                    </div>
                                    <div className="bg-black/50 backdrop-blur-md text-white border border-white/10 text-[10px] font-bold px-2 py-1 rounded-sm uppercase">1080p 60fps</div>
                                </div>
                                <div className="absolute bottom-4 right-4 text-white/50 font-mono text-xs drop-shadow-md">
                                    {new Date().toLocaleString()} | LAT: 12.9716° N, LONG: 77.5946° E
                                </div>
                            </div>
                            
                            {/* QR Code Overlay inside Video Area (if triggered) */}
                            {showQr && (
                                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-lg border border-slate-200 mt-0 !h-[50%] top-1/2 -translate-y-1/2">
                                    <button onClick={() => setShowQr(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"><X className="w-5 h-5"/></button>
                                    <h3 className="text-xl font-bold text-[#253D2E] mb-2">Connect Phone Camera</h3>
                                    <p className="text-sm text-slate-600 mb-4 max-w-sm">Scan this QR code with your mobile device to temporarily use it as a live CCTV feed. Reduce & Reuse!</p>
                                    <div className="bg-white p-3 shadow-inner rounded-xl flex items-center justify-center border border-slate-100">
                                        <QRCode value={`${window.location.protocol}//${window.location.hostname}:5173/broadcast`} size={120} level="M" fgColor="#253D2E" />
                                    </div>
                                    <p className="mt-3 text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full animate-pulse">Waiting for WebRTC link...</p>
                                </div>
                            )}

                            {/* Grid Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                                
                                {/* Camera List */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <h3 className="font-bold text-[#253D2E] text-lg">Active Feeds</h3>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setShowAddOptions(!showAddOptions)}
                                                className="text-sm font-bold bg-[#B6E63E] text-[#253D2E] px-3 py-1.5 rounded-lg flex items-center gap-1 hover:brightness-105 transition-all shadow-sm z-10 relative"
                                            >
                                                <Plus className="w-4 h-4" /> Add Camera
                                            </button>

                                            {showAddOptions && (
                                                <div className="absolute right-0 bottom-[110%] mb-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-[60] flex flex-col gap-1 origin-bottom-right">
                                                    <button onClick={() => { startWebcam(); setShowAddOptions(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm font-bold text-slate-800 flex items-center gap-2">
                                                        <Camera className="w-4 h-4 text-indigo-500" /> Device Webcam
                                                    </button>
                                                    <hr className="border-slate-100 my-1" />
                                                    <div className="px-3 py-2">
                                                        <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1"><Video className="w-3 h-3" /> Add IP Camera (RTSP)</p>
                                                        <div className="flex gap-2">
                                                            <input 
                                                                value={ipInput} 
                                                                onChange={(e) => setIpInput(e.target.value)} 
                                                                type="text" 
                                                                placeholder="192.168.1.100" 
                                                                className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:border-[#B6E63E]"
                                                            />
                                                            <button onClick={addIpCamera} className="bg-[#253D2E] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1a2e22]">Add</button>
                                                        </div>
                                                    </div>
                                                    <hr className="border-slate-100 my-1" />
                                                    <button onClick={() => { setShowQr(true); setShowAddOptions(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm font-bold text-slate-800 flex items-center gap-2">
                                                        <MonitorSmartphone className="w-4 h-4 text-emerald-500" /> Connect Phone (Live)
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        {cameras.map((cam) => (
                                            <div key={cam.id} className="p-3 border border-slate-200 rounded-xl bg-white hover:border-[#B6E63E] hover:shadow-md cursor-pointer transition-all flex items-center gap-3">
                                                <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                                                    {cam.type === 'cctv' ? <Video className="w-5 h-5" /> : <Camera className="w-5 h-5 text-indigo-500" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-800 truncate">{cam.name}</p>
                                                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Online</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Location Details */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-[#253D2E] text-lg">Location Context</h3>
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">Shed Location</p>
                                                <p className="text-xs text-slate-500">12 Acres Campus, Plot 4B</p>
                                            </div>
                                        </div>
                                        <hr className="border-slate-100" />
                                        <div className="bg-slate-100 rounded-lg p-3 text-center cursor-pointer hover:bg-slate-200 transition-colors">
                                            <p className="text-xs font-bold text-[#4A6741]">View on Google Maps</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* LEFT COLUMN: INFRA & SIMULATION */}
                <div className="lg:col-span-1 space-y-6">
                    {/* 2. INFRASTRUCTURE & RESOURCES */}
                    <div className="glass-card p-6 border border-slate-200 shadow-[2px_2px_0px_#B6E63E] space-y-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-black text-[#253D2E] flex items-center gap-2 mb-4"><Warehouse size={20} className="text-[#B6E63E]" /> {t('dash-infra')}</h2>
                            <div className="grid grid-cols-3 gap-2 text-center mb-6">
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
                                <div 
                                    onClick={() => setIsCctvOpen(true)}
                                    className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-[#B6E63E] transition-all group"
                                >
                                    <div className="relative inline-block">
                                        <Video size={24} className="mx-auto text-[#253D2E] mb-1 group-hover:text-[#B6E63E] transition-colors" />
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    </div>
                                    <p className="text-xs font-bold mt-1 group-hover:text-[#253D2E]">CCTV</p>
                                    <p className="text-[10px] text-[#4A6741] font-bold group-hover:text-[#253D2E]">{t('status-live')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI 3D SHED SIMULATION */}
                    <div className="rounded-3xl p-0 bg-slate-900 relative overflow-hidden group shadow-[4px_4px_0px_rgba(37,61,46,0.3)] min-h-[300px] border border-slate-800">
                    
                    {/* Background CCTV Image */}
                    <img src="/cctv_realistic_shed.png" alt="CCTV Feed" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 pointer-events-none" />
                    
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50 pt-4 px-4 flex flex-col justify-between">
                        
                        {/* Header */}
                        <div className="flex justify-between items-start z-10 w-full">
                            <div>
                                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1 drop-shadow-md"><BrainCircuit size={20} className="text-[#B6E63E]" /> AI Shed Sandbox</h2>
                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest drop-shadow-md flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live 3D Inference</p>
                            </div>
                            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-mono border border-white/10 uppercase tracking-wider">Cam 02</div>
                        </div>
                        
                        {/* Realistic AI Bounding Box Overlay */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                            {/* Scanning Line */}
                            <div className="w-full h-1 bg-emerald-400/80 absolute top-0 shadow-[0_0_20px_#4ade80] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>

                            {/* Center Cow Bounding Box */}
                            <div className="absolute top-[35%] left-[25%] w-[45%] h-[40%] border-2 border-[#B6E63E] bg-[#B6E63E]/10 rounded shadow-[0_0_15px_rgba(182,230,62,0.3)] transition-all duration-300">
                                {/* Corner Accents */}
                                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white"></div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white"></div>
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white"></div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white"></div>
                                
                                {/* Label Tooltip */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded border border-[#B6E63E]/50 flex items-center gap-1.5 whitespace-nowrap shadow-xl">
                                    <span className="font-bold text-[#B6E63E]">ID:</span> 492
                                    <span className="w-px h-2 bg-white/30"></span>
                                    <span className="font-bold text-sky-400">Yield:</span> 12L
                                    <span className="w-px h-2 bg-white/30"></span>
                                    <span className="text-emerald-400 font-bold uppercase">Healthy</span>
                                </div>

                                {/* Heatmap Overlay (simulating thermal or depth data) */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-amber-500/10 mix-blend-overlay"></div>
                                
                                {/* Target Crosshair */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/50 flex flex-col justify-center items-center">
                                    <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                                </div>
                            </div>

                            {/* Distant Object Bounding Box */}
                            <div className="absolute top-[30%] right-[15%] w-[15%] h-[20%] border border-sky-400/50 bg-sky-400/10 rounded">
                                <div className="absolute -bottom-4 right-0 bg-black/70 text-[8px] text-sky-300 px-1 py-0.5 rounded whitespace-nowrap border border-sky-400/30">Worker detected (98%)</div>
                            </div>
                        </div>
                        
                        {/* Footer Overlay */}
                        <div className="mt-auto mb-4 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-[#B6E63E]/30 shadow-xl z-10 w-full relative overflow-hidden">
                            {/* Scanning Data Stream Effect */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B6E63E]/50 to-transparent"></div>
                            <div className="flex justify-between items-end text-[11px] text-slate-300 gap-2">
                                <div className="space-y-1 overflow-hidden min-w-0">
                                    <span className="flex items-center gap-1.5 font-mono text-white"><Scan size={12} className="text-[#B6E63E] animate-spin-slow"/> YOLOv8 Engine</span>
                                    <div className="font-mono text-[9px] text-slate-400 leading-tight">
                                        <div className="truncate">[LOG] TGT_DETECT CONF:0.94</div>
                                        <div className="truncate">[LOG] POS X:144 Y:90 Z:24</div>
                                        <div className="truncate">[LOG] THERMAL_OK: 38.6C</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0">
                                    <span className="text-emerald-400 font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-0.5 rounded inline-block mb-1 border border-emerald-400/20">Active</span>
                                    <span className="font-mono text-[9px]">24 FPS | 42 ms</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: TRENDS & MESH */}
                <div className="lg:col-span-3 space-y-6">
                    {/* 3. CHART */}
                    <div className="glass-card p-6 border border-slate-200 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                        <h2 className="text-lg font-black text-[#253D2E] flex items-center gap-2 mb-4"><BarChart3 size={20} className="text-indigo-500" /> {t('dash-trends')}</h2>
                        <div className="h-56">
                            <Bar data={chartConfig} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* 4. IOT MESH NETWORK PROTOTYPE */}
                    <Link to="/iot-network" className="glass-card p-6 border border-slate-200 shadow-[2px_2px_0px_#253D2E] hover:shadow-[4px_4px_0px_#B6E63E] transition-all cursor-pointer group flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-black text-[#253D2E] flex items-center gap-2"><Network size={20} className="text-[#4A6741]" /> IoT Mesh Network</h2>
                            <span className="bg-[#B6E63E]/20 text-[#253D2E] text-[10px] font-bold px-2 py-1 rounded border border-[#B6E63E]">OFFLINE PROTOTYPE</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center relative">
                                    <span className="absolute w-full h-full rounded-full border border-emerald-500 animate-ping opacity-50"></span>
                                    <Cpu size={20} className="text-slate-700" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">Edge Nodes Active</p>
                                    <p className="text-[10px] text-slate-500 font-mono">Forming ad-hoc network</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                                <p className="font-black text-xl text-[#253D2E]">24<span className="text-xs text-slate-500 font-normal ml-1">nodes</span></p>
                                <p className="text-[9px] font-bold text-emerald-600 uppercase flex items-center gap-1"><WifiOff size={10}/> Synced</p>
                            </div>
                        </div>
                        
                        <div className="mt-4 text-xs text-slate-500 flex items-center justify-between">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Click to view mesh simulation</span>
                            <TrendingUp size={14} className="text-[#4A6741] group-hover:text-[#B6E63E] transition-colors" />
                        </div>
                    </Link>
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

