import React from 'react';
import { Layers, MonitorSmartphone, ServerCog, Database, BrainCircuit, ArrowDown, Cpu, Network, ShieldCheck, Zap } from 'lucide-react';

const Architecture = () => {
    const layers = [
        {
            id: "presentation",
            title: "Presentation Layer (Client)",
            subtitle: "User Interface & Experience",
            icon: <MonitorSmartphone className="w-8 h-8 text-white relative z-10" />,
            gradient: "from-sky-500 to-blue-600",
            shadow: "shadow-sky-500/20",
            items: [
                { name: "React 18 SPA", desc: "Responsive Web/Mobile PWA" },
                { name: "Tailwind CSS", desc: "Design System & Styling" },
                { name: "Voice Interface", desc: "Multilingual Audio I/O" }
            ]
        },
        {
            id: "application",
            title: "Application Layer (API Backend)",
            subtitle: "Business Logic & Routing",
            icon: <ServerCog className="w-8 h-8 text-white relative z-10" />,
            gradient: "from-indigo-500 to-purple-600",
            shadow: "shadow-indigo-500/20",
            items: [
                { name: "Flask REST API", desc: "Python-based Core Router" },
                { name: "Rate Limiter", desc: "Custom Token-Bucket Auth" },
                { name: "Service Handlers", desc: "Image/Audio Processors" }
            ]
        },
        {
            id: "intelligence",
            title: "Intelligence Layer (AI Models)",
            subtitle: "Processing & Inference Engine",
            icon: <BrainCircuit className="w-8 h-8 text-white relative z-10" />,
            gradient: "from-fuchsia-500 to-rose-500",
            shadow: "shadow-fuchsia-500/20",
            items: [
                { name: "Gemini 2.5 Pro", desc: "Multimodal LLM Reasoning" },
                { name: "EfficientNet-B7", desc: "Disease Image Classification" },
                { name: "Hybrid ML Ops", desc: "XGBoost Pricing Estimates" }
            ]
        },
        {
            id: "data",
            title: "Data Layer (Persistence)",
            subtitle: "Storage & State Management",
            icon: <Database className="w-8 h-8 text-white relative z-10" />,
            gradient: "from-teal-500 to-emerald-500",
            shadow: "shadow-teal-500/20",
            items: [
                { name: "In-Memory Store", desc: "High-Speed Redis-like Volatility" },
                { name: "Bcrypt Hash", desc: "Secure Credential Encryption" },
                { name: "Log Structs", desc: "Health & Production History" }
            ]
        }
    ];

    return (
        <div className="w-full animation-fade-in relative z-10 pb-16">
            
            {/* Global Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>

            {/* Header Section */}
            <div className="mb-14 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm hover:shadow-md transition-shadow">
                    <Layers className="w-4 h-4" />
                    <span>System Architecture Overview</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
                    Layered <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-rose-500">Design</span>
                </h1>
                <p className="text-slate-600 text-xl max-w-2xl leading-relaxed mx-auto font-medium">
                    The structural foundation of the Cattle Care platform, divided into modular layers ensuring secure data flow and rapid AI inference.
                </p>
            </div>

            {/* Architecture Diagram Container */}
            <div className="max-w-5xl mx-auto relative px-4">
                <div className="relative z-10 flex flex-col items-center w-full">
                    
                    {layers.map((layer, index) => (
                        <React.Fragment key={layer.id}>
                            {/* Layer Card */}
                            <div className="w-full bg-white rounded-[2rem] p-1 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden">
                                
                                <div className="bg-white rounded-[1.8rem] p-6 sm:p-8 h-full flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                                    
                                    {/* Icon & Title Block */}
                                    <div className="flex-shrink-0 flex items-center gap-5 w-full md:w-[35%] relative">
                                        <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${layer.gradient} ${layer.shadow} shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
                                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                                            {layer.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-800 leading-tight mb-1.5">{layer.title}</h3>
                                            <div className="inline-block px-2.5 py-1 bg-slate-100 rounded-md">
                                                <p className={`text-[11px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${layer.gradient}`}>{layer.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider for Desktop */}
                                    <div className="hidden md:block w-px h-16 bg-slate-100"></div>

                                    {/* Items Block */}
                                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {layer.items.map((item, iIdx) => (
                                            <div key={iIdx} className="group/item relative bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-100 hover:border-slate-300 transition-all duration-300 flex flex-col justify-center hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)]">
                                                <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl bg-gradient-to-b ${layer.gradient} opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`}></div>
                                                <span className="font-bold text-slate-800 text-sm mb-1">{item.name}</span>
                                                <span className="text-xs text-slate-500 font-medium leading-snug">{item.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Connector Arrow */}
                            {index < layers.length - 1 && (
                                <div className="flex flex-col items-center justify-center py-4 h-16 relative w-full">
                                    {/* Flowing line effect */}
                                    <div className="w-[3px] h-full bg-gradient-to-b from-slate-200 to-slate-300 absolute rounded-full overflow-hidden">
                                        <div className="w-full h-1/2 bg-slate-400 absolute top-0 animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                    <div className="bg-white rounded-full p-2 z-10 shadow-[0_4px_10px_rgb(0,0,0,0.05)] text-slate-400 border border-slate-100 relative group">
                                        <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                </div>
            </div>

            {/* Bottom Traits */}
            <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {[
                    { icon: <Zap className="w-6 h-6 text-emerald-500" />, title: "Low Latency", desc: "Direct routing to in-memory datasets ensures instant dashboard updates.", border: "hover:border-emerald-300" },
                    { icon: <Network className="w-6 h-6 text-sky-500" />, title: "Decoupled APIs", desc: "Frontend and AI inference engines operate completely independently.", border: "hover:border-sky-300" },
                    { icon: <ShieldCheck className="w-6 h-6 text-purple-500" />, title: "Secure Isolation", desc: "Sensitive API keys and token logic remain hidden in the Application layer.", border: "hover:border-purple-300" }
                ].map((trait, idx) => (
                    <div key={idx} className={`bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-start gap-4 ${trait.border} group`}>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">{trait.icon}</div>
                        <div>
                            <h4 className="font-extrabold text-slate-800 text-lg mb-2">{trait.title}</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{trait.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
            `}</style>
        </div>
    );
};

export default Architecture;
