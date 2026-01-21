import React from 'react';
import { Network, FileJson, Calculator, GitBranch, Binary, Layers, FileText, Activity, Globe, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const colorVariants = {
    red: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', hoverBorder: 'hover:border-red-500', iconBg: 'bg-red-100', iconBorder: 'border-red-200', btn: 'bg-red-50 text-red-700 hover:bg-red-100' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', hoverBorder: 'hover:border-amber-500', iconBg: 'bg-amber-100', iconBorder: 'border-amber-200', btn: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', hoverBorder: 'hover:border-blue-500', iconBg: 'bg-blue-100', iconBorder: 'border-blue-200', btn: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
    fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'text-fuchsia-600', hoverBorder: 'hover:border-fuchsia-500', iconBg: 'bg-fuchsia-100', iconBorder: 'border-fuchsia-200', btn: 'bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', hoverBorder: 'hover:border-emerald-500', iconBg: 'bg-emerald-100', iconBorder: 'border-emerald-200', btn: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-600', hoverBorder: 'hover:border-cyan-500', iconBg: 'bg-cyan-100', iconBorder: 'border-cyan-200', btn: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100' },
};

const AlgoCard = ({ title, icon: Icon, children, color, link, linkText }) => {
    const theme = colorVariants[color] || colorVariants.blue;
    const navigate = useNavigate();

    return (
        <div className={`bg-white border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group ${theme.hoverBorder} ${theme.border}`}>
            <div className={`absolute -right-6 -top-6 p-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity bg-current ${theme.text}`}>
                <Icon size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl ${theme.iconBg} ${theme.text}`}>
                        <Icon size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                </div>

                <div className="flex-grow">
                    {children}
                </div>

                <button
                    onClick={() => navigate(link)}
                    className={`mt-6 w-full py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ${theme.btn}`}
                >
                    {linkText} <span className="text-lg">→</span>
                </button>
            </div>
        </div>
    );
};

const CodeBlock = ({ code }) => (
    <div className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] leading-relaxed text-blue-300 my-4 shadow-inner overflow-hidden relative">
        <div className="absolute top-2 right-2 flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <pre>{code}</pre>
    </div>
);

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Component Error</h2>
                    <p className="text-slate-500 text-sm">Please refresh the page.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

const ProjectAlgorithms = () => {
    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-slate-50 p-8 pt-24 font-sans flex flex-col items-center">

                <div className="max-w-7xl w-full">
                    <div className="text-center mb-16">
                        <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                            Platform Methodology
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                            Core AI Engines
                        </h1>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
                            Explore the specialized frameworks powering Cattle Care. From multimodal vision to heuristic pricing, each design is optimized for accuracy and performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">

                        {/* 1. Disease Scanner */}
                        <AlgoCard
                            title="Hybrid Vision Diagnostics"
                            icon={Layers}
                            color="red"
                            link="/algorithms/disease-scanner"
                            linkText="View Hybrid Architecture"
                        >
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                <strong>EfficientNet-B7 + Gemini</strong> hybrid pipeline. Uses pre-trained CNN for feature extraction and LLM for clinical reasoning.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">EfficientNet-B7</span>
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Hybrid Model</span>
                            </div>
                            <CodeBlock code={`cnn = EfficientNetB7(weights='imagenet')
features = cnn.predict(img)
# Pass features to Gemini
diagnosis = model.generate([features, context])`} />
                        </AlgoCard>

                        {/* 2. Advisory System */}
                        <AlgoCard
                            title="Advisory Intelligence"
                            icon={FileText}
                            color="blue"
                            link="/algorithms/advisory"
                            linkText="View RAG Pipeline"
                        >
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                <strong>Context-Aware RAG</strong> system that switches personas (Vet vs Nutritionist) and injects history for personalized advice.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Prompt Engineering</span>
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Context Window</span>
                            </div>
                            <CodeBlock code={`sys_prompt = f"""
 Role: {role} (Vet/Nutritionist)
 History: {chat_history[-5:]}
 Constraints: No markdown, concise.
"""
return llm.predict(sys_prompt + query)`} />
                        </AlgoCard>

                        {/* 3. Smart Trade */}
                        <AlgoCard
                            title="Smart Valuation Hybrid"
                            icon={Calculator}
                            color="amber"
                            link="/algorithms/smart-trade"
                            linkText="View Hybrid Pipeline"
                        >
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                <strong>XGBoost + LSTM</strong> hybrid architecture. Combines structural biological features with temporal market trends, verified by Gemini AI.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Hybrid ML</span>
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Time-Series</span>
                            </div>
                            <CodeBlock code={`# Hybrid Prediction Pipeline
val = xgb_model.predict(structural_data)
trend = lstm_model.predict(temporal_data)
# Gemini Verification
final_price = gemini.verify(val + trend)`} />
                        </AlgoCard>

                        {/* 4. Voice AI */}
                        <AlgoCard
                            title="Voice Engine"
                            icon={Activity}
                            color="fuchsia"
                            link="/algorithms/voice-ai"
                            linkText="View Voice Pipeline"
                        >
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                <strong>Intent-Driven Architecture</strong> combining Web Speech API for input and Gemini NLU for semantic intent extraction and routing.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">NLU</span>
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Speech-to-Text</span>
                            </div>
                            <CodeBlock code={`input = stt.listen()
intent = gemini.extract(input)
if intent == 'NAV_TRADE':
  navigate('/trade')
  tts.speak("Opening marketplace")`} />
                        </AlgoCard>

                        {/* 5. Multilingual Neural Engine */}
                        <AlgoCard
                            title="Polyglot Neural Engine"
                            icon={Globe}
                            color="emerald"
                            link="/algorithms/multilingual"
                            linkText="View Neural Pipeline"
                        >
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                <strong>Pre-trained XLSR-53 Model</strong> architecture combined with Gemini 1.5 to provide cross-lingual semantic understanding for 6+ languages.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">IndicWav2Vec</span>
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Transformer</span>
                            </div>
                            <CodeBlock code={`model = Wav2Vec2.from_pretrained('xlsr-53')
logits = model(audio_input)
text = decode(logits)
// Semantic Hand-off
intent = gemini.predict(text)`} />
                        </AlgoCard>

                        {/* 6. Dashboard Analytics */}
                        <AlgoCard
                            title="Predictive Farm Analytics"
                            icon={BarChart3}
                            color="cyan"
                            link="/algorithms/dashboard"
                            linkText="View Forecasting Model"
                        >
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                <strong>Temporal Fusion Transformer</strong> & Isolation Forests for time-series forecasting of milk yields and real-time anomaly detection.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">LSTM / TFT</span>
                                <span className="px-2 py-1 bg-white border rounded text-xs font-semibold text-slate-600">Isolation Forest</span>
                            </div>
                            <CodeBlock code={`# Time-Series Forecasting
forecast = tft_model.predict(history_30d)
# Anomaly Detection
if iso_forest.score(current) < -0.5:
   alert("Abnormal Drop Detected")`} />
                        </AlgoCard>

                    </div>

                    <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
                            <GitBranch className="text-purple-600" />
                            Unified Data Flow
                        </h3>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-medium text-slate-600 max-w-4xl mx-auto">
                            <div className="px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 w-full">User Input</div>
                            <div className="text-slate-300">→</div>
                            <div className="px-6 py-4 bg-purple-50 text-purple-700 rounded-xl border border-purple-100 w-full">Preprocessing & Context</div>
                            <div className="text-slate-300">→</div>
                            <div className="px-6 py-4 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 w-full">Model Inference (Hub)</div>
                            <div className="text-slate-300">→</div>
                            <div className="px-6 py-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 w-full">Actionable Response</div>
                        </div>
                    </div>

                </div>
            </div>
        </ErrorBoundary>
    );
};

export default ProjectAlgorithms;

