import React from 'react';
import { ArrowLeft, Users, Smartphone, Server, Brain, Database, Activity, MessageSquare, TrendingUp, Mic, Cpu, Globe, Zap, ShieldCheck, UserCog, BrainCircuit, Terminal, BarChart3, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ReactMarkdown from 'react-markdown';

const SystemArchitectureDemo = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/algorithms')}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} className="text-slate-600" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-900">
                            {t('sys-header')}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">

                {/* ================================================================================== */}
                {/* SECTION 1: DESIGN STRATEGY & OBJECTIVES */}
                {/* ================================================================================== */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">1</span>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('sys-s1-title')}</h2>
                    </div>

                    {/* Objectives Banner */}
                    <div className="mb-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-[2.4rem] p-10 flex flex-col md:flex-row gap-8 items-center border border-white/10">
                            <div className="flex-1 space-y-4">
                                <span className="px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/30">Strategic Mission</span>
                                <h3 className="text-3xl font-bold text-white">{t('sys-obj-header')}</h3>
                                <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
                                <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                                    Our architecture is purposefully engineered to solve the most critical challenges in modern livestock management, ensuring every byte of data serves a human purpose.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full md:w-2/3">
                                <div
                                    onClick={() => navigate('/algorithms/disease-scanner')}
                                    className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/card hover:scale-105"
                                >
                                    <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 mb-3 border border-rose-500/30">
                                        <Activity size={20} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{t('sys-obj-1-t')}</h4>
                                    <p className="text-[10px] text-slate-400 leading-tight mb-2">{t('sys-obj-1-d')}</p>
                                    <div className="text-[9px] text-blue-400 font-bold opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        {t('sys-view-meth')}
                                    </div>
                                </div>
                                <div
                                    onClick={() => navigate('/algorithms/smart-trade')}
                                    className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/card hover:scale-105"
                                >
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-3 border border-emerald-500/30">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{t('sys-obj-2-t')}</h4>
                                    <p className="text-[10px] text-slate-400 leading-tight mb-2">{t('sys-obj-2-d')}</p>
                                    <div className="text-[9px] text-blue-400 font-bold opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        {t('sys-view-meth')}
                                    </div>
                                </div>
                                <div
                                    onClick={() => navigate('/algorithms/voice-ai')}
                                    className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/card hover:scale-105"
                                >
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-3 border border-amber-500/30">
                                        <Mic size={20} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{t('sys-obj-3-t')}</h4>
                                    <p className="text-[10px] text-slate-400 leading-tight mb-2">{t('sys-obj-3-d')}</p>
                                    <div className="text-[9px] text-blue-400 font-bold opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        {t('sys-view-meth')}
                                    </div>
                                </div>
                                <div
                                    onClick={() => navigate('/algorithms/dashboard')}
                                    className="p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/card hover:scale-105"
                                >
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-3 border border-blue-500/30">
                                        <BarChart3 size={20} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm mb-1">{t('sys-obj-4-t')}</h4>
                                    <p className="text-[10px] text-slate-400 leading-tight mb-2">{t('sys-obj-4-d')}</p>
                                    <div className="text-[9px] text-blue-400 font-bold opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        {t('sys-view-meth')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                            <h3 className="font-bold text-xl mb-4 text-blue-900">{t('sys-s1-subtitle')}</h3>
                            <div className="text-slate-600 leading-relaxed mb-6 prose max-w-none">
                                <ReactMarkdown>{t('sys-s1-desc-text')}</ReactMarkdown>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold uppercase tracking-wider border border-blue-100 italic">Indic-Aware</span>
                                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider border border-emerald-100 italic">Cloud-Native</span>
                                <span className="px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold uppercase tracking-wider border border-rose-100 italic">AI-First</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Globe size={20} />
                                    </div>
                                    <h4 className="font-bold text-slate-900">{t('sys-s1-p1-title')}</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">{t('sys-s1-p1-desc')}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <Zap size={20} />
                                    </div>
                                    <h4 className="font-bold text-slate-900">{t('sys-s1-p2-title')}</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">{t('sys-s1-p2-desc')}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-rose-300 transition-colors group">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h4 className="font-bold text-slate-900">{t('sys-s1-p3-title')}</h4>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">{t('sys-s1-p3-desc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 overflow-x-auto relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Zap size={200} className="text-blue-500" />
                        </div>

                        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 min-w-[900px]">
                            {/* Node 1: Farmers */}
                            <div className="flex flex-col items-center gap-4 relative">
                                <div className="w-56 h-36 bg-blue-50 border-2 border-blue-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                    <Users size={32} className="text-blue-600 mb-2" />
                                    <h3 className="font-bold text-blue-900">{t('sys-farmers')}</h3>
                                    <p className="text-[10px] text-blue-600 text-center mt-2 font-medium bg-white px-2 py-1 rounded-full border border-blue-50">{t('sys-farmers-desc')}</p>
                                </div>
                            </div>
                            <div className="text-slate-300 animate-pulse">➜</div>
                            {/* Node 2: Frontend */}
                            <div className="flex flex-col items-center gap-4 relative">
                                <div className="w-56 h-36 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                    <Smartphone size={32} className="text-emerald-600 mb-2" />
                                    <h3 className="font-bold text-emerald-900">{t('sys-frontend')}</h3>
                                    <p className="text-[10px] text-emerald-600 text-center mt-2 font-medium bg-white px-2 py-1 rounded-full border border-emerald-50">{t('sys-frontend-desc')}</p>
                                </div>
                            </div>
                            <div className="text-slate-300 animate-pulse">➜</div>
                            {/* Node 3: Backend */}
                            <div className="flex flex-col items-center gap-4 relative">
                                <div className="w-56 h-36 bg-purple-50 border-2 border-purple-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                    <Server size={32} className="text-purple-600 mb-2" />
                                    <h3 className="font-bold text-purple-900">{t('sys-backend')}</h3>
                                    <p className="text-[10px] text-purple-600 text-center mt-2 font-medium bg-white px-2 py-1 rounded-full border border-purple-50">{t('sys-backend-desc')}</p>
                                </div>
                            </div>
                            <div className="text-slate-300 animate-pulse">➜</div>
                            {/* Node 4: Intelligence */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-64 h-44 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-600 text-white rounded-2xl flex flex-col items-center justify-center p-6 shadow-xl hover:scale-105 transition-transform cursor-default ring-4 ring-blue-100">
                                    <Brain size={44} className="text-white mb-2 animate-bounce" />
                                    <h3 className="font-bold text-lg tracking-tight uppercase">{t('sys-hybrid')}</h3>
                                    <p className="text-[10px] text-white/90 text-center mt-2 font-medium border-t border-white/20 pt-2 w-full">{t('sys-intelligence-desc')}</p>
                                </div>
                                <div className="h-10 border-l-2 border-dashed border-slate-300"></div>
                                {/* Node 5: Data Layer */}
                                <div className="w-56 h-36 bg-amber-50 border-2 border-amber-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow cursor-default">
                                    <Database size={32} className="text-amber-600 mb-2" />
                                    <h3 className="font-bold text-amber-900">{t('sys-datalayer')}</h3>
                                    <p className="text-[10px] text-amber-600 text-center mt-2 font-medium bg-white px-2 py-1 rounded-full border border-amber-50">{t('sys-datalayer-desc')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Objective Interaction Box */}
                        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-3 text-blue-900 font-bold uppercase text-xs tracking-wider">
                                <Zap size={16} /> Objective Interaction
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed italic border-l-4 border-blue-500 pl-4">
                                <ReactMarkdown>{t('sys-obj-interaction')}</ReactMarkdown>
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================================================================================== */}
                {/* SECTION 2: END-TO-END INDIC MULTILINGUAL SYSTEM */}
                {/* ================================================================================== */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</span>
                        <h2 className="text-3xl font-extrabold text-slate-900">{t('sys-s2-title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                            <h3 className="font-bold text-lg mb-4">{t('sys-s2-hybrid-title')}</h3>
                            <div className="text-slate-600 leading-relaxed mb-6 prose">
                                <ReactMarkdown>{t('sys-s2-desc')}</ReactMarkdown>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase">IndicWav2Vec</span>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase">Gemini Polyglot Embeddings</span>
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100">
                            <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                                <Cpu size={20} /> {t('sys-s2-neural-stats')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-purple-800"><span className="font-bold">{t('sys-s2-model')}:</span> XLSR-53 (Fine-tuned)</li>
                                <li className="flex items-center gap-2 text-sm text-purple-800"><span className="font-bold">{t('sys-s2-params')}:</span> 317 Million</li>
                                <li className="flex items-center gap-2 text-sm text-purple-800"><span className="font-bold">{t('sys-s2-latency')}:</span> ~120ms</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 overflow-x-auto">
                        <h4 className="text-center font-bold mb-8 text-slate-500 uppercase tracking-widest text-sm">{t('sys-s2-pipeline-title')}</h4>
                        <div className="min-w-[900px] flex items-center justify-between relative gap-4">
                            {/* Node 1 */}
                            <div className="flex flex-col items-center gap-4 w-48">
                                <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-center w-full">
                                    <Mic size={32} className="mx-auto mb-2 text-slate-600" />
                                    <div className="font-bold text-slate-800">{t('sys-s2-raw-audio')}</div>
                                    <div className="text-xs text-slate-500 mt-1">16kHz PCM Stream</div>
                                </div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 2 */}
                            <div className="flex flex-col items-center gap-4 w-56">
                                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200 text-center w-full">
                                    <Zap size={32} className="mx-auto mb-2 text-orange-600" />
                                    <div className="font-bold text-orange-900">{t('sys-s2-feat-extract')}</div>
                                    <div className="text-xs text-orange-800 mt-1">MFCC / Spectrogram</div>
                                </div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 3 */}
                            <div className="w-80 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg text-white text-center">
                                <Globe size={40} className="mx-auto mb-3 text-white animate-pulse" />
                                <h4 className="font-bold text-lg mb-2">{t('sys-s2-phoneme-map')}</h4>
                                <p className="text-xs opacity-90">Phoneme-to-Semantics Mapping & Intent Classification</p>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 4 */}
                            <div className="flex flex-col items-center gap-4 w-48">
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center w-full">
                                    <Zap size={32} className="mx-auto mb-2 text-emerald-600" />
                                    <div className="font-bold text-emerald-900">{t('sys-s2-action')}</div>
                                    <div className="text-xs text-emerald-800 mt-1">JSON + Audio Response</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================================================================================== */}
                {/* SECTION 3: CONTEXT-AWARE GENERATIVE REASONING */}
                {/* ================================================================================== */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</span>
                        <h2 className="text-3xl font-extrabold text-slate-900">{t('sys-s3-title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                            <h3 className="font-bold text-lg mb-4">{t('sys-s3-role-prompt')}</h3>
                            <div className="text-slate-600 leading-relaxed mb-6 prose">
                                <p>{t('sys-s3-desc')}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase">Persona Adoption</span>
                                <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold uppercase">Context Memory</span>
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                <BrainCircuit size={20} /> {t('sys-s3-cog-func')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-blue-800"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {t('sys-s3-persona-switch')}</li>
                                <li className="flex items-center gap-2 text-sm text-blue-800"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {t('sys-s3-concise')}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 overflow-x-auto">
                        <h4 className="text-center font-bold mb-8 text-slate-500 uppercase tracking-widest text-sm">{t('sys-s3-pipe-title')}</h4>
                        <div className="min-w-[900px] flex items-center justify-between relative gap-6">
                            {/* Node 1 */}
                            <div className="flex flex-col items-center gap-4 w-40">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                                    <UserCog size={32} className="text-slate-600" />
                                </div>
                                <div className="font-bold text-slate-800">{t('sys-s3-user-query')}</div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 2 */}
                            <div className="flex flex-col items-center gap-4 w-64">
                                <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200 text-left w-full relative">
                                    <div className="absolute -top-3 left-4 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold uppercase">Assembler</div>
                                    <h4 className="font-bold text-blue-900 mb-2">{t('sys-s3-ctx-engine')}</h4>
                                    <div className="text-xs text-blue-700">Chat History + System Instructions</div>
                                </div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 3 */}
                            <div className="flex flex-col items-center gap-4 w-48">
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                                    <BrainCircuit size={40} className="text-white" />
                                </div>
                                <div className="font-bold text-indigo-900">{t('sys-s3-gemini-llm')}</div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 4 */}
                            <div className="flex flex-col items-center gap-4 w-40">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                                    <ShieldCheck size={32} className="text-emerald-600" />
                                </div>
                                <div className="font-bold text-slate-800">{t('sys-s3-expert-advice')}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================================================================================== */}
                {/* SECTION 4: PREDICTIVE FARM ANALYTICS */}
                {/* ================================================================================== */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold">4</span>
                        <h2 className="text-3xl font-extrabold text-slate-900">{t('sys-s4-title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200">
                            <h3 className="font-bold text-lg mb-4">{t('sys-s4-tft-title')}</h3>
                            <div className="text-slate-600 leading-relaxed mb-6 prose">
                                <ReactMarkdown>{t('sys-s4-desc')}</ReactMarkdown>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold uppercase">LSTM / TFT</span>
                                <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase">Time-Series</span>
                            </div>
                        </div>
                        <div className="bg-cyan-50 rounded-3xl p-8 border border-cyan-100">
                            <h3 className="font-bold text-cyan-900 mb-4 flex items-center gap-2">
                                <Cpu size={20} /> {t('sys-s4-model-specs')}
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-cyan-800"><span className="font-bold">{t('sys-s4-forecasting')}:</span> LSTM + Attention</li>
                                <li className="flex items-center gap-2 text-sm text-cyan-800"><span className="font-bold">{t('sys-s4-horizon')}:</span> 30 Days</li>
                                <li className="flex items-center gap-2 text-sm text-cyan-800"><span className="font-bold">{t('sys-s4-error-rate')}:</span> MAPE &lt; 5%</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border border-slate-200 overflow-x-auto">
                        <h4 className="text-center font-bold mb-8 text-slate-500 uppercase tracking-widest text-sm">{t('sys-s4-pipe-title')}</h4>
                        <div className="min-w-[900px] flex items-center justify-between relative gap-6">
                            {/* Node 1 */}
                            <div className="flex flex-col items-center gap-4 w-40">
                                <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center w-full">
                                    <Database size={24} className="mx-auto mb-2 text-slate-600" />
                                    <div className="font-bold text-slate-800">{t('sys-s4-hist-data')}</div>
                                    <div className="text-xs text-slate-500 mt-1">SQL Time-Series</div>
                                </div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 2 */}
                            <div className="flex flex-col items-center gap-4 w-56">
                                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-center w-full">
                                    <Activity size={24} className="mx-auto mb-2 text-orange-600" />
                                    <div className="font-bold text-orange-900">{t('sys-s4-sliding-win')}</div>
                                    <div className="text-xs text-orange-800 mt-1">Sequence (n=30)</div>
                                </div>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 3 */}
                            <div className="w-72 p-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg text-white text-center">
                                <BarChart3 size={32} className="mx-auto mb-3 text-yellow-300" />
                                <h4 className="font-bold text-lg mb-1">{t('sys-s4-ensemble')}</h4>
                                <p className="text-xs opacity-90">LSTM (Forecast) + Isolation Forest (Anomalies)</p>
                            </div>
                            <div className="text-slate-300 text-2xl">➜</div>
                            {/* Node 4 */}
                            <div className="flex flex-col items-center gap-4 w-48">
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center w-full">
                                    <TrendingUp size={24} className="mx-auto mb-2 text-emerald-600" />
                                    <div className="font-bold text-emerald-900">{t('sys-s4-smart-insight')}</div>
                                    <div className="text-xs text-emerald-800 mt-1">Yield Charts & Alerts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default SystemArchitectureDemo;

