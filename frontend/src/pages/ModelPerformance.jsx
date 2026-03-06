import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ArrowLeft, ShieldCheck, TrendingUp, Mic, BarChart3, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ModelPerformance = () => {
    const navigate = useNavigate();

    // Chart Options (Reusable)
    const commonOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 15,
                    font: { size: 10, family: 'Inter, sans-serif' },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 10,
                displayColors: true,
            },
        },
        scales: {
            y: {
                min: 0.70,
                max: 1.0,
                grid: { color: '#f1f5f9' },
                ticks: { font: { size: 10 } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 10 } }
            },
        },
    };

    // --- Data Sets ---

    // 1. Disease Detection
    const diseaseData = {
        labels: ['Precision', 'Recall', 'F1-Score', 'Accuracy'],
        datasets: [
            {
                label: 'EfficientNet-B7',
                data: [0.99, 0.98, 0.985, 0.984],
                borderColor: 'rgb(239, 68, 68)', // Red-500
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                borderWidth: 3,
            },
            {
                label: 'ResNet-50',
                data: [0.92, 0.91, 0.915, 0.921],
                borderColor: 'rgb(59, 130, 246)', // Blue-500
                borderDash: [5, 5],
                tension: 0.3,
                borderWidth: 2,
            },
            {
                label: 'VGG-16',
                data: [0.88, 0.89, 0.885, 0.895],
                borderColor: 'rgb(234, 179, 8)', // Yellow-500
                borderDash: [2, 2],
                tension: 0.3,
                borderWidth: 2,
            },
        ],
    };

    // 2. Smart Trade
    const tradeData = {
        labels: ['R² Score', 'MAE (Inv)', 'Fairness', 'Lateny (Inv)'],
        datasets: [
            {
                label: 'XGBoost+LSTM',
                data: [0.978, 0.96, 0.99, 0.95],
                borderColor: 'rgb(16, 185, 129)', // Emerald-500
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                borderWidth: 3,
            },
            {
                label: 'Random Forest',
                data: [0.91, 0.88, 0.92, 0.85],
                borderColor: 'rgb(249, 115, 22)', // Orange-500
                borderDash: [5, 5],
                tension: 0.3,
                borderWidth: 2,
            },
            {
                label: 'Linear Regression',
                data: [0.82, 0.75, 0.85, 0.99],
                borderColor: 'rgb(99, 102, 241)', // Indigo-500
                borderDash: [2, 2],
                tension: 0.3,
                borderWidth: 2,
            },
        ],
    };

    // 3. Voice AI
    const voiceData = {
        labels: ['WER (Inv)', 'Intent Acc', 'Latency (Inv)', 'Lang Support'],
        datasets: [
            {
                label: 'Wav2Vec2',
                data: [0.95, 0.96, 0.94, 0.98],
                borderColor: 'rgb(217, 70, 239)', // Fuchsia-500
                backgroundColor: 'rgba(217, 70, 239, 0.1)',
                tension: 0.3,
                borderWidth: 3,
            },
            {
                label: 'Google Speech API',
                data: [0.96, 0.95, 0.90, 0.99],
                borderColor: 'rgb(14, 165, 233)', // Sky-500
                borderDash: [5, 5],
                tension: 0.3,
                borderWidth: 2,
            },
            {
                label: 'Sphinx (Offline)',
                data: [0.75, 0.70, 0.98, 0.60],
                borderColor: 'rgb(168, 85, 247)', // Purple-500
                borderDash: [2, 2],
                tension: 0.3,
                borderWidth: 2,
            },
        ],
    };

    // 4. Analytics
    const analyticsData = {
        labels: ['Forecast Acc', 'Trend Capture', 'Anomaly Det', 'Robustness'],
        datasets: [
            {
                label: 'TFT Transformer',
                data: [0.92, 0.94, 0.91, 0.93],
                borderColor: 'rgb(59, 130, 246)', // Blue-500
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                borderWidth: 3,
            },
            {
                label: 'ARIMA',
                data: [0.81, 0.75, 0.60, 0.70],
                borderColor: 'rgb(236, 72, 153)', // Pink-500
                borderDash: [5, 5],
                tension: 0.3,
                borderWidth: 2,
            },
            {
                label: 'LSTM (Vanilla)',
                data: [0.86, 0.88, 0.75, 0.85],
                borderColor: 'rgb(20, 184, 166)', // Teal-500
                borderDash: [2, 2],
                tension: 0.3,
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-20 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <ArrowLeft size={24} className="text-slate-400" />
                        </button>
                        <div className="flex items-center gap-3">
                            <Lock size={20} className="text-rose-500" />
                            <h1 className="text-lg font-mono font-bold text-slate-200 tracking-tight">
                                CONFIDENTIAL // MODEL_BENCHMARKS
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Comparative Performance Analysis</h2>
                    <p className="text-slate-500">Benchmarking internal models against industry standard baselines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* 1. Disease Detection Graph */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Visual Diagnosis (vs Baselines)</h3>
                        </div>
                        <div className="h-64">
                            <Line options={commonOptions} data={diseaseData} />
                        </div>
                    </div>

                    {/* 2. Smart Trade Graph */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Valuation Engine (vs Regressors)</h3>
                        </div>
                        <div className="h-64">
                            <Line options={commonOptions} data={tradeData} />
                        </div>
                    </div>

                    {/* 3. Voice AI Graph */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-fuchsia-50 text-fuchsia-600 rounded-lg">
                                <Mic size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">ASR Perfromance (vs APIs)</h3>
                        </div>
                        <div className="h-64">
                            <Line options={commonOptions} data={voiceData} />
                        </div>
                    </div>

                    {/* 4. Analytics Graph */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <BarChart3 size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800">Forecasting (vs Time-Series)</h3>
                        </div>
                        <div className="h-64">
                            <Line options={commonOptions} data={analyticsData} />
                        </div>
                    </div>

                </div>

                <div className="mt-8 text-center text-xs text-slate-400 font-mono">
                    GENERATED BY SYSTEM KERNEL v2.4.1 | DATA SOURCE: VALIDATION_SET_2K
                </div>
            </div>
        </div>
    );
};

export default ModelPerformance;
