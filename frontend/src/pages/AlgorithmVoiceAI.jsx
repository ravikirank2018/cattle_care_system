import React from 'react';
import { ArrowLeft, Layers, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AlgorithmVoiceAI = () => {
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
                    <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                        {t('meth-title-3')}
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* 1. Overview Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h2 className="text-3xl font-extrabold mb-4 text-slate-900">{t('meth-title-3')}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                The Voice Assistant isn't just a transcriber; it's a <strong>Polyglot Intelligent Agent</strong>. It supports <strong>6 Indian Languages</strong> (English, Hindi, Telugu, Tamil, Kannada, Malayalam) using a 3-stage pipeline: <strong>Speech-to-Text (STT)</strong> input, <strong>Gemini 1.5 Flash</strong> for NLU, and <strong>Neural TTS</strong> for playback.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-fuchsia-50 text-fuchsia-700 rounded-full text-sm font-semibold border border-fuchsia-100">6+ Languages</span>
                                <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-semibold border border-pink-100">Zero-Shot NLU</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold border border-slate-200">Neural TTS</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-fuchsia-50 rounded-2xl p-6 border border-fuchsia-100">
                            <h3 className="font-bold text-fuchsia-900 mb-4 flex items-center gap-2">
                                <Layers size={20} /> Pipeline Stages
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-fuchsia-800"><span className="font-bold">1. Listen:</span> Webkit Speech Recognition</li>
                                <li className="flex items-center gap-2 text-sm text-fuchsia-800"><span className="font-bold">2. Think:</span> Gemini Intent Extract</li>
                                <li className="flex items-center gap-2 text-sm text-fuchsia-800"><span className="font-bold">3. Act:</span> Routing / Audio Gen</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Architecture Diagram */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-12 text-center">Voice Command & Control Flow</h3>

                    <div className="min-w-[800px] flex items-center justify-between relative gap-4">

                        {/* Stage 1: STT */}
                        <div className="w-48 text-center p-4 bg-slate-100 rounded-xl border border-slate-200">
                            <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center mb-3">
                                <Code size={24} className="text-slate-600" />
                            </div>
                            <h4 className="font-bold text-slate-800">Audio Stream</h4>
                            <div className="text-xs text-slate-500">Browser Native STT</div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Stage 2: NLU (Gemini) */}
                        <div className="w-72 p-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl shadow-lg text-white text-center relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-fuchsia-600 px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm">The Brain</div>
                            <Layers size={32} className="mx-auto mb-2 text-yellow-300 animate-pulse" />
                            <h4 className="font-bold text-lg">Sematic Analysis</h4>
                            <p className="text-xs opacity-90 mt-2">Classifies user intent (e.g., "NAVIGATE_DISEASE") and generates natural response.</p>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Stage 3: Output */}
                        <div className="flex flex-col gap-4 w-48">
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                                <Code size={20} className="mx-auto mb-1 text-emerald-600" />
                                <div className="font-bold text-xs text-emerald-800">Action: Route Change</div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                                <Code size={20} className="mx-auto mb-1 text-blue-600" />
                                <div className="font-bold text-xs text-blue-800">TTS Audio Response</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. Code Implementation */}
                <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 font-mono text-sm">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                        <span className="text-fuchsia-400 font-bold">Intent Classification Prompt</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-slate-600 rounded-full" />
                            <div className="w-3 h-3 bg-slate-600 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-2 opacity-90">
                        <div className="text-slate-500"># System Instruction for Gemini</div>
                        <div>system_prompt = f"""</div>
                        <div className="pl-4">Act as an intelligent agriculture assistant.</div>
                        <div className="pl-4">Language: <span className="text-green-400">{`{language_code}`}</span></div>
                        <div className="pl-4">Identify Intent from: <span className="text-yellow-400">[DASHBOARD, PRICE, DISEASE, ADVISORY]</span></div>
                        <div className="pl-4">Task:</div>
                        <div className="pl-8">1. Classify intent.</div>
                        <div className="pl-8">2. Generate helpful response in user's language.</div>
                        <div className="pl-4">Output JSON ONLY:</div>
                        <div className="pl-8 text-blue-300">{`{ "intent": "...", "response_text": "..." }`}</div>
                        <div>"""</div>

                        <div className="text-slate-500 mt-6"># Example Response Parsing</div>
                        <div><span className="text-pink-400">if</span> data['intent'] == 'PRICE':</div>
                        <div className="pl-4 text-fuchsia-300">navigate('/trade')</div>
                        <div className="pl-4 text-fuchsia-300">play_audio(data['response_text'])</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmVoiceAI;

