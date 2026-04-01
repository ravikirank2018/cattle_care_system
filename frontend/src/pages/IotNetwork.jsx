import React, { useEffect } from 'react';
import { Network, WifiOff, Cpu, Radio, Smartphone, Server, CheckCircle2, Activity, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const IotNetwork = () => {
    const { t } = useLanguage();

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <header className="flex justify-between items-end mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#B6E63E] text-[#253D2E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Prototype</span>
                        <span className="flex items-center gap-1 text-slate-500 font-mono text-xs"><WifiOff size={14}/> Offline Mode Ready</span>
                    </div>
                    <h1 className="text-4xl font-black text-[#253D2E] tracking-tight leading-tight flex items-center gap-3">
                        <Network className="w-10 h-10 text-[#4A6741]" /> IoT Mesh Network
                    </h1>
                    <p className="text-[#4A6741] font-medium mt-2 text-lg max-w-2xl">
                        Our software is designed to be embedded directly into low-cost edge devices and smart collars. Even without internet, they form a self-healing local mesh network.
                    </p>
                </div>
            </header>

            {/* INTERACTIVE MESH SIMULATION */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-slate-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,200,100,0.05)_0%,transparent_70%)]"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 min-h-[400px]">
                    
                    {/* Left Panel: Edge Nodes */}
                    <div className="flex-1 space-y-6 w-full">
                        <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2"><Cpu size={18}/> Edge IoT Nodes</h3>
                        
                        {/* Node 1 */}
                        <div className="bg-black/40 backdrop-blur-sm border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between relative group hover:border-emerald-400 transition-colors cursor-default">
                            <div className="absolute -right-4 top-1/2 w-8 h-[1px] bg-emerald-500/50 hidden md:block group-hover:bg-emerald-400"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-500/50 relative">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-0 right-0 animate-ping"></span>
                                    <Radio className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Shed Collar #42</p>
                                    <p className="text-[10px] text-slate-400 font-mono">Status: Collecting Vitals</p>
                                </div>
                            </div>
                            <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                        </div>

                        {/* Node 2 */}
                        <div className="bg-black/40 backdrop-blur-sm border border-indigo-500/30 p-4 rounded-xl flex items-center justify-between relative group hover:border-indigo-400 transition-colors cursor-default">
                            <div className="absolute -right-4 top-1/2 w-8 h-[1px] bg-indigo-500/50 hidden md:block group-hover:bg-indigo-400"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-500/50 relative">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400 absolute top-0 right-0 animate-pulse"></span>
                                    <Radio className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Audio Gateway</p>
                                    <p className="text-[10px] text-slate-400 font-mono">Status: Edge Computing</p>
                                </div>
                            </div>
                            <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
                        </div>

                    </div>

                    {/* Center: Sync Connection */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full relative h-[200px] md:h-auto">
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2 hidden md:block"></div>
                        <div className="w-full md:w-auto flex justify-between md:hidden absolute top-1/2 -translate-y-1/2 left-0 px-10">
                            <div className="w-[2px] h-32 bg-slate-800"></div>
                            <div className="w-[2px] h-32 bg-slate-800"></div>
                        </div>

                        {/* Animated Data Packets */}
                        <div className="absolute top-1/2 left-[20%] w-2 h-2 bg-[#B6E63E] rounded-full shadow-[0_0_10px_#B6E63E] animate-[slide-right_2s_linear_infinite] hidden md:block z-10"></div>
                        <div className="absolute top-1/2 left-[60%] w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_10px_#38bdf8] animate-[slide-right_2.5s_linear_infinite] hidden md:block z-10"></div>
                        
                        <div className="bg-slate-800 border-2 border-slate-600 rounded-full p-4 relative z-20">
                            <Network className="w-12 h-12 text-[#B6E63E] animate-pulse" />
                            <div className="absolute -inset-4 border border-[#B6E63E]/30 rounded-full animate-ping"></div>
                        </div>
                        <p className="text-white text-xs mt-3 font-bold px-3 py-1 bg-black/50 rounded-full border border-slate-700 z-20">Ad-Hoc Network</p>
                    </div>

                    {/* Right Panel: Master Node */}
                    <div className="flex-1 w-full space-y-4 z-10">
                        <h3 className="text-[#B6E63E] font-bold uppercase tracking-widest text-sm flex flex-col gap-1 items-end md:items-start">
                            <Smartphone size={18}/> Parent Node (Farmer Phone)
                        </h3>
                        
                        <div className="bg-black/60 backdrop-blur-md border border-[#B6E63E]/30 rounded-2xl p-6 shadow-2xl relative">
                            <div className="absolute -inset-[1px] bg-gradient-to-br from-[#B6E63E]/30 to-transparent rounded-2xl opacity-50 z-0"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <p className="text-white font-bold text-lg">Syncing Database</p>
                                        <p className="text-[#B6E63E] text-xs font-mono bg-[#B6E63E]/10 px-2 py-0.5 rounded inline-block">Local Bluetooth / Wi-Fi</p>
                                    </div>
                                    <Server className="text-slate-500 w-6 h-6" />
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                                            <span>Vitals Sync</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-400 h-full w-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-300 mb-1 font-mono">
                                            <span>Acoustic Alerts</span>
                                            <span className="animate-pulse text-sky-400">76%</span>
                                        </div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-sky-400 h-full w-[76%] transition-all duration-1000"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between bg-emerald-900/20 border border-emerald-500/20 p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <CheckCircle2 size={16} />
                                        <span className="text-xs font-bold">Encrypted P2P</span>
                                    </div>
                                    <span className="text-white text-[10px] bg-slate-800 px-2 py-1 rounded shadow-inner">AES-256</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Internet: Disconnected</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#B6E63E]"></div> Mesh IoT: 24 Nodes Found</span>
                </div>
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="glass-card p-6 border-t-4 border-[#B6E63E]">
                    <Zap className="w-8 h-8 text-[#B6E63E] mb-4" />
                    <h3 className="text-xl font-bold text-[#253D2E] mb-2">Decentralized AI Inference</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Instead of sending raw audio or video to the cloud, the AI models (EfficientNet & Wav2Vec) execute directly on local microcontrollers or the farmer's smartphone.
                    </p>
                </div>
                
                <div className="glass-card p-6 border-t-4 border-sky-400">
                    <Radio className="w-8 h-8 text-sky-400 mb-4" />
                    <h3 className="text-xl font-bold text-[#253D2E] mb-2">Self-Healing Mesh</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        If one IoT collar loses connection, it passes data to nearby collars until it reaches the Gateway or Phone. No single point of failure in remote fields.
                    </p>
                </div>

                <div className="glass-card p-6 border-t-4 border-emerald-400">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="text-xl font-bold text-[#253D2E] mb-2">Asynchronous Cloud Sync</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        The entire database operates in an offline-first state. When the farmer travels to a town with 4G/5G, all encrypted local logs instantly batch queue and sync to the main ledger.
                    </p>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes slide-right {
                    0% { transform: translateX(0); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(200px); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default IotNetwork;
