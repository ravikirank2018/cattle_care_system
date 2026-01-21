import React from 'react';
import { ArrowLeft, Users, Smartphone, Server, Brain, Database, Activity, MessageSquare, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SystemArchitecture = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/algorithms')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} className="text-slate-600" />
                    </button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Design Strategy & System Architecture
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* 1. High Level Flow Diagram */}
                <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 mb-12 overflow-x-auto">
                    <h2 className="text-3xl font-extrabold mb-12 text-center text-slate-900">End-to-End Architecture</h2>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 min-w-[900px]">

                        {/* Node 1: Farmers */}
                        <div className="flex flex-col items-center gap-4 relative group">
                            <div className="w-40 h-32 bg-blue-50 border-2 border-blue-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-all">
                                <Users size={32} className="text-blue-600 mb-2" />
                                <h3 className="font-bold text-blue-900">Farmers</h3>
                                <p className="text-xs text-blue-600 text-center mt-1">Mobile/Web Interface Interaction</p>
                            </div>
                        </div>

                        <div className="text-slate-300">➜</div>

                        {/* Node 2: Frontend */}
                        <div className="flex flex-col items-center gap-4 relative group">
                            <div className="w-40 h-32 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-all">
                                <Smartphone size={32} className="text-emerald-600 mb-2" />
                                <h3 className="font-bold text-emerald-900">Frontend</h3>
                                <p className="text-xs text-emerald-600 text-center mt-1">React + Vite<br />(Interactive UI)</p>
                            </div>
                        </div>

                        <div className="text-slate-300">➜</div>

                        {/* Node 3: Backend */}
                        <div className="flex flex-col items-center gap-4 relative group">
                            <div className="w-40 h-32 bg-purple-50 border-2 border-purple-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-all">
                                <Server size={32} className="text-purple-600 mb-2" />
                                <h3 className="font-bold text-purple-900">Backend API</h3>
                                <p className="text-xs text-purple-600 text-center mt-1">Flask (Python)<br />+ REST API</p>
                            </div>
                        </div>

                        <div className="text-slate-300">➜</div>

                        {/* Node 4: Intelligence */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-56 h-40 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transform hover:scale-105 transition-all">
                                <Brain size={40} className="text-white mb-2 animate-pulse" />
                                <h3 className="font-bold text-lg">Hybrid Intelligence</h3>
                                <p className="text-xs text-white/90 text-center mt-2">Trained ML Model + Gemini AI<br />(Verification & Reasoning)</p>
                            </div>

                            {/* Connection to Data */}
                            <div className="h-8 border-l-2 border-dashed border-slate-300"></div>

                            {/* Node 5: Data Layer */}
                            <div className="w-48 h-32 bg-amber-50 border-2 border-amber-100 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm">
                                <Database size={32} className="text-amber-600 mb-2" />
                                <h3 className="font-bold text-amber-900">Data Layer</h3>
                                <p className="text-xs text-amber-600 text-center mt-1">In-Memory / MongoDB</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 2. Core Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Disease Detection */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">1. Disease Detection</h3>
                        <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">Hybrid Analysis Pipeline</p>
                        <ul className="space-y-3">
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">1. CNN Feature Extraction:</span> Local model identifies surface anomalies.
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">2. Gemini Vision Pro:</span> Verifies findings against dermatological dataset.
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">3. Confidence Scoring:</span> Final diagnosis with treatment protocols.
                            </li>
                        </ul>
                    </div>

                    {/* Advisory Chat */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">2. Advisory Chat</h3>
                        <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">NLP & RAG Engine</p>
                        <ul className="space-y-3">
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">1. Speech-to-Text:</span> Web Speech API converts dialect to text.
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">2. Context Awareness:</span> Backend retrieves cow health history.
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">3. Generative Response:</span> AI formulates advice based on veterinary guidelines.
                            </li>
                        </ul>
                    </div>

                    {/* Smart Trading */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6 text-amber-600">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">3. Smart Trading</h3>
                        <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wide">Multi-Factor Valuation</p>
                        <ul className="space-y-3">
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">1. Regression Model:</span> Base price from Age, Weight, Breed.
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">2. Zone Logic:</span> Adjusts for regional demand (North/South/West).
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <span className="font-bold text-slate-800">3. Health Depreciation:</span> Penalizes based on disease history severity.
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SystemArchitecture;

