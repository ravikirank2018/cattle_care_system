import React from 'react';
import { ArrowLeft, ArrowDown, Activity, TrendingUp, Mic, BarChart3, Scan, Brain, CheckCircle2, Cloud, Zap, Languages, Database, Search, LineChart, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Methodology = () => {
    const navigate = useNavigate();

    const objectives = [
        {
            id: 1,
            title: "Health Security",
            icon: <Activity size={48} />,
            color: "red",
            secondaryColor: "rose",
            steps: [
                {
                    title: "Input Acquisition",
                    desc: "Camera Capture / Upload",
                    icon: <Scan size={40} />
                },
                {
                    title: "Hybrid Inference",
                    desc: "EfficientNet + Gemini 1.5 Pro",
                    icon: <Brain size={40} />
                },
                {
                    title: "Verification",
                    desc: "Symptom Heatmap Cross-Check",
                    icon: <CheckCircle2 size={40} />
                }
            ],
            keyAlgo: {
                title: "Two-Stage Validation",
                desc: "A lightweight CNN acts as a first filter, followed by a Multi-modal LLM (Gemini) which analyzes specific visual features (lesions, texture) closer to human expert diagnosis."
            }
        },
        {
            id: 2,
            title: "Fair Market Trade",
            icon: <TrendingUp size={48} />,
            color: "emerald",
            secondaryColor: "emerald",
            steps: [
                {
                    title: "Data Entry",
                    desc: "Breed, Age, Weight, Milk Yield",
                    icon: <Database size={40} />
                },
                {
                    title: "Market Analysis",
                    desc: "Real-time Fusion of Trends",
                    icon: <LineChart size={40} />
                },
                {
                    title: "Valuation",
                    desc: "Fair Price Estimation",
                    icon: <Zap size={40} />
                }
            ],
            keyAlgo: {
                title: "Hybrid Valuation Engine",
                desc: "Combines XGBoost for structural biological pricing with LSTM networks for temporal market correction, avoiding undervaluation by verifying against local zone data."
            }
        },
        {
            id: 3,
            title: "Rural Accessibility",
            icon: <Mic size={48} />,
            color: "fuchsia",
            secondaryColor: "fuchsia",
            steps: [
                {
                    title: "Voice Command",
                    desc: "6 Indic Languages Input",
                    icon: <Mic size={40} />
                },
                {
                    title: "Intent Extraction",
                    desc: "Gemini 1.5 Flash NLU",
                    icon: <Brain size={40} />
                },
                {
                    title: "Action & Response",
                    desc: "Execution + Neural TTS",
                    icon: <Languages size={40} />
                }
            ],
            keyAlgo: {
                title: "Polyglot Intent Pipeline",
                desc: "A zero-shot semantic router that translates vernacular speech directly into application actions, bypassing complex distinct language models for a unified fluid experience."
            }
        },
        {
            id: 4,
            title: "Data-Driven Insights",
            icon: <BarChart3 size={48} />,
            color: "blue",
            secondaryColor: "blue",
            steps: [
                {
                    title: "Data Aggregation",
                    desc: "Farm Logs & Health History",
                    icon: <Cloud size={40} />
                },
                {
                    title: "Pattern Detection",
                    desc: "Isolation Forest Algorithm",
                    icon: <Search size={40} />
                },
                {
                    title: "Forecasting",
                    desc: "Yield & Profit Prediction",
                    icon: <TrendingUp size={40} />
                }
            ],
            keyAlgo: {
                title: "Temporal Fusion Transformer",
                desc: "Uses a Multi-Horizon Quantile Recurrent configuration to predict future milk production ranges with 95% confidence intervals, adapting to seasonal variations."
            }
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/system-arch-demo')}
                            className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-95 text-slate-500"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Platform Methodology
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Powered By</h3>
                            <h2 className="text-sm font-bold text-slate-800">Cattle Care Logic Core</h2>
                        </div>
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                            CC
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {objectives.map((obj) => (
                        <div key={obj.id} className={`bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative group border-l-[6px] border-l-${obj.color}-500 transition-transform hover:-translate-y-1`}>

                            {/* Card Header */}
                            <div className="p-8 pb-4 flex items-center gap-4 border-b border-slate-50">
                                <div className={`w-20 h-20 bg-${obj.color}-50 text-${obj.color}-600 rounded-2xl flex items-center justify-center`}>
                                    {obj.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{obj.title}</h2>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest text-${obj.color}-500 bg-${obj.color}-50 px-2 py-0.5 rounded-full`}>
                                        Objective 0{obj.id}
                                    </span>
                                </div>
                            </div>

                            {/* Flowchart Steps */}
                            <div className="p-8 space-y-4">
                                {obj.steps.map((step, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center text-center relative group/step hover:bg-white hover:shadow-md transition-all">
                                            <div className={`mb-2 text-${obj.color}-500`}>
                                                {step.icon}
                                            </div>
                                            <h3 className="font-bold text-sm text-slate-800">{step.title}</h3>
                                            <p className="text-xs text-slate-500 font-medium">{step.desc}</p>
                                        </div>
                                        {idx < obj.steps.length - 1 && (
                                            <div className="flex justify-center -my-2 py-1">
                                                <ArrowDown size={20} className="text-slate-300" />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Key Algorithm Footer */}
                            <div className={`mx-8 mb-8 p-5 bg-${obj.secondaryColor}-50 rounded-xl border border-${obj.secondaryColor}-100`}>
                                <div className={`text-[10px] font-black uppercase tracking-widest text-${obj.color}-700 mb-2`}>
                                    Key Algorithm
                                </div>
                                <h4 className="font-bold text-sm text-slate-900 mb-1">{obj.keyAlgo.title}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {obj.keyAlgo.desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-400 text-sm font-medium">
                        Standardized Logic Flow • 2026 Edition
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Methodology;

