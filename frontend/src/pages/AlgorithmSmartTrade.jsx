import React from 'react';
import { ArrowLeft, Calculator, TrendingUp, History, Zap, ShieldCheck, Cpu, Search, CheckCircle2, Database, Layers, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AlgorithmSmartTrade = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/algorithms')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-95"
                    >
                        <ArrowLeft size={24} className="text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {t('meth-title-2')}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* 1. Overview Section */}
                <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-12">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100">
                                <Zap size={14} /> {t('sys-obj-2-t')}
                            </div>
                            <h2 className="text-4xl font-extrabold mb-6 text-slate-900 tracking-tight">{t('meth-title-2')}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                The Smart Trade system moves beyond simple linear regression. It utilizes a <strong>Multi-Stage Hybrid Pipeline</strong> that combines structural biological features with temporal market trends, verified by <strong>Gemini AI</strong> to ensure ethical and fair pricing.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border border-emerald-100">XGBoost Core</span>
                                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border border-blue-100">LSTM Time-Series</span>
                                <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold border border-indigo-100">Gemini Reasoning</span>
                            </div>
                        </div>
                        <div className="w-full md:w-80 bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Activity size={20} className="text-emerald-400" /> Neural Stats
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Accuracy</span>
                                    <span className="text-lg font-bold">97.8% (R²)</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Inference</span>
                                    <span className="text-lg font-bold">~420ms</span>
                                </li>
                                <li className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Verified by</span>
                                    <span className="text-lg font-bold italic">Gemini 1.5 Pro</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Horizontal Pipeline Diagram */}
                <div className="bg-white rounded-[3rem] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-12 overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-12 text-center text-slate-900">Hybrid Valuation Pipeline</h3>

                    <div className="min-w-[1000px] flex items-center justify-between gap-6 relative">
                        {/* Phase 1: Input */}
                        <div className="flex flex-col items-center gap-4 w-56 group">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg">
                                <Database size={32} className="text-slate-500" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-sm text-slate-900">Input Data</h4>
                                <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1 font-bold">Biological Features</p>
                            </div>
                        </div>

                        <div className="flex-1 h-[2px] bg-slate-100 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <div className="text-slate-300 text-xl font-light">➜</div>
                            </div>
                        </div>

                        {/* Phase 2: Historical analysis */}
                        <div className="flex flex-col items-center gap-4 w-56 group">
                            <div className="w-24 h-24 bg-blue-50 rounded-[2rem] border-2 border-blue-100 shadow-sm flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-blue-100 group-hover:border-blue-200">
                                <div className="flex flex-col items-center gap-1">
                                    <History size={32} className="text-blue-600" />
                                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-tighter">LSTM Engine</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-sm text-blue-900">Historical Filter</h4>
                                <p className="text-[10px] text-blue-500 uppercase tracking-tighter mt-1 font-bold">Past Price Trends</p>
                            </div>
                        </div>

                        <div className="flex-1 h-[2px] bg-slate-100 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <div className="text-slate-300 text-xl font-light">➜</div>
                            </div>
                        </div>

                        {/* Phase 3: Future Forecasting - Bold Gradient */}
                        <div className="flex flex-col items-center gap-4 w-64 group relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-amber-200 z-10 transition-transform group-hover:scale-110">
                                Predictive Core
                            </div>
                            <div className="w-28 h-28 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2.5rem] flex flex-col items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-2xl shadow-xl shadow-amber-500/20 text-white p-4">
                                <Cpu size={40} className="mb-2" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-lg text-slate-900">XGBoost Layers</h4>
                                <p className="text-[10px] text-amber-600 uppercase tracking-widest mt-1 font-black">Future Forecasting</p>
                            </div>
                        </div>

                        <div className="flex-1 h-[2px] bg-slate-100 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                <div className="text-slate-300 text-xl font-light">➜</div>
                            </div>
                        </div>

                        {/* Phase 4: Gemini Verification */}
                        <div className="flex flex-col items-center gap-4 w-60 group">
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-500 rounded-3xl p-[2px] shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3">
                                <div className="w-full h-full bg-white rounded-[calc(1.5rem-2px)] flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-700 italic relative z-10">G</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-sm text-indigo-900">Gemini LLM</h4>
                                <div className="flex items-center gap-2 justify-center mt-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <p className="text-[10px] text-indigo-600 uppercase tracking-tighter font-bold">Verification Layer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Technical Implementation & KPI */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-slate-300 font-mono text-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <div className="w-3 h-3 bg-amber-500 rounded-full" />
                            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                            <span className="ml-4 text-slate-500">hybrid_valuation.py</span>
                        </div>
                        <div className="space-y-4">
                            <div className="text-slate-500"># Parallel Model Execution</div>
                            <div><span className="text-emerald-400">def</span> <span className="text-blue-400">predict_price</span>(data):</div>
                            <div className="pl-6">structural = xgb.predict(data.features)</div>
                            <div className="pl-6">temporal = lstm.forecast(data.history)</div>

                            <div className="pl-6 text-slate-500 mt-4"># LLM Cross-Verification</div>
                            <div className="pl-6">val = (structural + temporal) / <span className="text-emerald-400">2</span></div>
                            <div className="pl-6">result = <span className="text-blue-300">gemini.verify</span>(val, news_context)</div>

                            <div className="pl-6 mt-4 text-emerald-400 italic">return result.final_valuation</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                            <Layers size={150} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">Performance Metrics</h3>
                        <div className="space-y-12">
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <div className="font-bold text-xs text-slate-400 uppercase tracking-widest">Model Fidelity</div>
                                    <div className="text-2xl font-black text-emerald-600">0.984 Accuracy</div>
                                </div>
                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[98.4%]" />
                                </div>
                            </div>

                            <div className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100 flex items-center gap-6">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600">
                                    <ShieldCheck size={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-slate-900 mb-1">Confidence Guardrails</div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Logic gates automatically reject predictions that deviate by more than 15% from the moving market average, triggered by Gemini sensors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-24 text-center">
                    <div className="h-12 w-px bg-slate-100 mx-auto mb-8" />
                    <p className="text-slate-400 text-sm italic font-medium">Built with Predictive AI & Geometric Deep Learning</p>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmSmartTrade;

