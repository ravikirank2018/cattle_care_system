import React from 'react';
import { ArrowLeft, Clock, AlertTriangle, Scale, ShieldCheck, CheckCircle2, TrendingUp, HelpCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProblemStatement = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-95 text-slate-500"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Project Context
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Main Problem Text (From Image) */}
                <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm mb-16 text-center">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">Problem Statement</h2>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-5xl mx-auto font-medium">
                        Farmers face issues like <span className="text-red-500 font-bold">delayed disease detection</span>, <span className="text-amber-500 font-bold">unfair cattle pricing</span>, and <span className="text-orange-500 font-bold">limited expert support</span>. Our AI/ML-based system predicts cattle health, ensures fair pricing, and provides personalized advisory through a multilingual voice assistant. The unified, low-cost dashboard is scalable and accessible for rural farmers.
                    </p>
                </div>

                {/* Pictorial Impact Representation */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Impact Area 1: Disease Detection */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-emerald-400"></div>
                        <h3 className="text-lg font-bold text-slate-900 mb-8 text-center uppercase tracking-wider">Disease Detection Impact</h3>

                        <div className="flex items-center justify-between gap-4">
                            {/* Before */}
                            <div className="flex flex-col items-center group-hover:opacity-50 transition-opacity">
                                <div className="p-4 bg-red-50 text-red-500 rounded-2xl mb-3">
                                    <Clock size={40} />
                                </div>
                                <span className="text-sm font-bold text-red-600">Delayed</span>
                            </div>

                            {/* Arrow */}
                            <div className="text-slate-300 font-black text-2xl">→</div>

                            {/* After */}
                            <div className="flex flex-col items-center transform group-hover:scale-110 transition-transform">
                                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-3 border-2 border-emerald-100 shadow-md">
                                    <ShieldCheck size={48} />
                                </div>
                                <span className="text-sm font-bold text-emerald-700">Predictive</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 text-center mt-6 font-medium">
                            Shift from reactive treatment to proactive AI prevention.
                        </p>
                    </div>

                    {/* Impact Area 2: Pricing Fairness */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-blue-400"></div>
                        <h3 className="text-lg font-bold text-slate-900 mb-8 text-center uppercase tracking-wider">Economic Impact</h3>

                        <div className="flex items-center justify-between gap-4">
                            {/* Before */}
                            <div className="flex flex-col items-center group-hover:opacity-50 transition-opacity">
                                <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl mb-3">
                                    <AlertTriangle size={40} />
                                </div>
                                <span className="text-sm font-bold text-amber-600">Unfair / Bias</span>
                            </div>

                            {/* Arrow */}
                            <div className="text-slate-300 font-black text-2xl">→</div>

                            {/* After */}
                            <div className="flex flex-col items-center transform group-hover:scale-110 transition-transform">
                                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-3 border-2 border-blue-100 shadow-md">
                                    <Scale size={48} />
                                </div>
                                <span className="text-sm font-bold text-blue-700">Transparent</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 text-center mt-6 font-medium">
                            Data-driven valuation replacing arbitrary manual pricing.
                        </p>
                    </div>

                    {/* Impact Area 3: Expert Support */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-fuchsia-400"></div>
                        <h3 className="text-lg font-bold text-slate-900 mb-8 text-center uppercase tracking-wider">Expert Accessibility</h3>

                        <div className="flex items-center justify-between gap-4">
                            {/* Before */}
                            <div className="flex flex-col items-center group-hover:opacity-50 transition-opacity">
                                <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl mb-3">
                                    <HelpCircle size={40} />
                                </div>
                                <span className="text-sm font-bold text-orange-600">Limited</span>
                            </div>

                            {/* Arrow */}
                            <div className="text-slate-300 font-black text-2xl">→</div>

                            {/* After */}
                            <div className="flex flex-col items-center transform group-hover:scale-110 transition-transform">
                                <div className="p-4 bg-fuchsia-50 text-fuchsia-600 rounded-2xl mb-3 border-2 border-fuchsia-100 shadow-md">
                                    <MessageSquare size={48} />
                                </div>
                                <span className="text-sm font-bold text-fuchsia-700">24/7 AI Voice</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 text-center mt-6 font-medium">
                            Instant multilingual advisory bridging the rural literacy gap.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProblemStatement;

