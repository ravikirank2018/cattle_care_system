import React from 'react';
import { ArrowLeft, BarChart3, Database, Activity, TrendingUp, AlertTriangle, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AlgorithmDashboard = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/algorithms')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} className="text-slate-600" />
                    </button>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        {t('meth-title-4')}
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* 1. Overview Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h2 className="text-3xl font-extrabold mb-4 text-slate-900">{t('meth-title-4')}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                The Dashboard is powered by a <strong>Multi-Horizon Quantile Recurrent Neural Network</strong>. It uses a <strong>Temporal Fusion Transformer (TFT)</strong> to forecast milk yields and market trends, while an <strong>Isolation Forest</strong> algorithm runs in real-time to detect statistical anomalies in herd health data.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold border border-cyan-100">LSTM / TFT</span>
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">Anomaly Detection</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold border border-slate-200">Time-Series</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
                            <h3 className="font-bold text-cyan-900 mb-4 flex items-center gap-2">
                                <Cpu size={20} /> Model Specs
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-cyan-800"><span className="font-bold">Forecasting:</span> LSTM + Attention</li>
                                <li className="flex items-center gap-2 text-sm text-cyan-800"><span className="font-bold">Horizon:</span> 30 Days</li>
                                <li className="flex items-center gap-2 text-sm text-cyan-800"><span className="font-bold">Error Rate:</span> MAPE &lt; 5%</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Pipeline Diagram */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-12 text-center">Predictive Analytics Pipeline</h3>

                    <div className="min-w-[900px] flex items-center justify-between relative gap-6">

                        {/* Node 1: Historical Data */}
                        <div className="flex flex-col items-center gap-4 w-40">
                            <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-center w-full">
                                <Database size={24} className="mx-auto mb-2 text-slate-600" />
                                <div className="font-bold text-slate-800">Historical Data</div>
                                <div className="text-xs text-slate-500 mt-1">SQL Time-Series</div>
                            </div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Node 2: Sliding Window */}
                        <div className="flex flex-col items-center gap-4 w-56">
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-center w-full">
                                <Activity size={24} className="mx-auto mb-2 text-orange-600" />
                                <div className="font-bold text-orange-900">Sliding Window</div>
                                <div className="text-xs text-orange-800 mt-1">Sequence generation (n=30) & normalization</div>
                            </div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Node 3: Ensemble Core */}
                        <div className="w-72 p-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg text-white text-center relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-cyan-600 px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm">Inference</div>
                            <BarChart3 size={32} className="mx-auto mb-3 text-yellow-300" />
                            <h4 className="font-bold text-lg mb-1">Ensemble Core</h4>
                            <p className="text-xs opacity-90">LSTM (Forecast) + Isolation Forest (Anomalies)</p>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Node 4: Output */}
                        <div className="flex flex-col items-center gap-4 w-48">
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center w-full">
                                <TrendingUp size={24} className="mx-auto mb-2 text-emerald-600" />
                                <div className="font-bold text-emerald-900">Smart Insights</div>
                                <div className="text-xs text-emerald-800 mt-1">Yield Charts & Alerts</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. Technical Implementation Details */}
                <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 font-mono text-sm">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                        <span className="text-cyan-400 font-bold">Forecasting Pipeline Code</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-4 opacity-90">
                        <div className="text-slate-500"># 1. Load Time-Series Data</div>
                        <div>window = data[-30:] <span className="text-slate-500 text-xs">// Last 30 days context</span></div>

                        <div className="text-slate-500 mt-4"># 2. TFT Forecasting</div>
                        <div className="text-cyan-400">forecast = tft_model.predict(window, horizon=7)</div>

                        <div className="text-slate-500 mt-4"># 3. Anomaly Detection (Isolation Forest)</div>
                        <div>anomaly_score = iso_forest.decision_function(current_metrics)</div>
                        <div><span className="text-pink-400">if</span> anomaly_score &lt; -0.5:</div>
                        <div className="pl-4 text-yellow-400">trigger_alert("Abnormal Health Drop Detected")</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmDashboard;

