import React from 'react';
import { Activity, TrendingUp, Mic, BarChart3, ArrowLeft, Layers, Calculator, GitBranch, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlgorithmObjectives = () => {
    const navigate = useNavigate();

    const objectives = [
        {
            id: 1,
            title: "Health Security",
            icon: <Activity size={24} />,
            largeIcon: <Activity size={120} />,
            color: "red",
            bg: "bg-red-50",
            border: "border-red-100",
            text: "text-red-600",
            hoverBorder: "hover:border-red-200",
            iconBg: "bg-red-50",
            description: "Early detection of Lumpy Skin Disease using Hybrid Vision Transformers (EfficientNet-B7).",
            code: [
                "model = EfficientNetB7(weights='imagenet')",
                "features = model.extract_features(img)",
                "diagnosis = gemini.analyze(features)",
                "return diagnosis.severity_score"
            ],
            codeColor: "text-red-400",
            tags: ["Computer Vision", "Hybrid Model", "Recall@99"]
        },
        {
            id: 2,
            title: "Fair Market Trade",
            icon: <TrendingUp size={24} />,
            largeIcon: <TrendingUp size={120} />,
            color: "emerald",
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            text: "text-emerald-600",
            hoverBorder: "hover:border-emerald-200",
            iconBg: "bg-emerald-50",
            description: "Algorithmic valuation eliminating broker bias for transparent cattle pricing.",
            code: [
                "price = xgb_model.predict([",
                "  weight, age, milk_yield,",
                "  breed_score, health_index",
                "])",
                "price = enforce_fairness(price)"
            ],
            codeColor: "text-emerald-400",
            tags: ["Regression", "Bias Elimination", "Fairness"]
        },
        {
            id: 3,
            title: "Rural Accessibility",
            icon: <Mic size={24} />,
            largeIcon: <Mic size={120} />,
            color: "fuchsia",
            bg: "bg-fuchsia-50",
            border: "border-fuchsia-100",
            text: "text-fuchsia-600",
            hoverBorder: "hover:border-fuchsia-200",
            iconBg: "bg-fuchsia-50",
            description: "Voice-first interaction in 6+ Indic languages for zero-literacy usage.",
            code: [
                "audio = mic.listen()",
                "text = wav2vec2.decode(audio)",
                "intent = nlp.extract_intent(text)",
                "response = tts.speak(intent.action)"
            ],
            codeColor: "text-fuchsia-400",
            tags: ["NLP", "Speech-to-Text", "Indic-Trans"]
        },
        {
            id: 4,
            title: "Data-Driven Insights",
            icon: <BarChart3 size={24} />,
            largeIcon: <BarChart3 size={120} />,
            color: "blue",
            bg: "bg-blue-50",
            border: "border-blue-100",
            text: "text-blue-600",
            hoverBorder: "hover:border-blue-200",
            iconBg: "bg-blue-50",
            description: "Predictive analytics for milk yield and long-term farm profitability.",
            code: [
                "forecast = tft_model.predict(",
                "  history=past_30_days,",
                "  static=[breed, region]",
                ")",
                "alert = anomaly_detector.check(forecast)"
            ],
            codeColor: "text-blue-400",
            tags: ["Forecasting", "Anomaly Detection", "Analytics"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
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
                            Core Objectives
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="text-center mb-16">
                    <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                        Mission Critical
                    </span>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Technical Implementation of Goals</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        How our theoretical objectives translate into production-grade algorithmic pipelines.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {objectives.map((obj) => (
                        <div key={obj.id} className={`bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group ${obj.hoverBorder} transition-colors`}>
                            {/* Decorative Background Blob */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${obj.bg} rounded-bl-full -mr-8 -mt-8 z-0 opacity-50`}></div>

                            <div className="relative z-10">
                                {/* Header: Icon + Title */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-3 ${obj.iconBg} ${obj.text} rounded-xl border ${obj.border}`}>
                                        {obj.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">{obj.title}</h2>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">
                                    {obj.description}
                                </p>

                                {/* Code Block */}
                                <div className="bg-slate-900 rounded-xl p-5 text-[11px] font-mono text-slate-300 leading-relaxed shadow-inner mb-6 border border-slate-800">
                                    {obj.code.map((line, index) => (
                                        <div key={index} className={`${index === 0 || index === obj.code.length - 1 ? obj.codeColor : 'pl-4'}`}>
                                            {line}
                                        </div>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {obj.tags.map((tag, i) => (
                                        <span key={i} className={`px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200 uppercase tracking-wide`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AlgorithmObjectives;

