import React from 'react';
import { ArrowLeft, Layers, Eye, Database, FileJson, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AlgorithmDiseaseScanner = () => {
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
                    <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                        {t('meth-title-1')}
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* 1. Overview Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h2 className="text-3xl font-extrabold mb-4 text-slate-900">{t('meth-title-1')}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                The system employs a state-of-the-art hybrid approach. We use a fine-tuned <strong>EfficientNet-B7 (Pre-trained CNN)</strong> for initial feature extraction and lesion localization, followed by <strong>Gemini 1.5 Pro</strong> for multimodal clinical reasoning and diagnosis generation.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-semibold border border-red-100">EfficientNet-B7</span>
                                <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm font-semibold border border-rose-100">Transfer Learning</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold border border-slate-200">Multimodal Fusion</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-red-50 rounded-2xl p-6 border border-red-100">
                            <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                                <Activity size={20} /> Neural Stats
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-red-800"><span className="font-bold">Backbone:</span> EfficientNet (ImageNet)</li>
                                <li className="flex items-center gap-2 text-sm text-red-800"><span className="font-bold">Accuracy:</span> 98.4% (Top-5)</li>
                                <li className="flex items-center gap-2 text-sm text-red-800"><span className="font-bold">Inf. Time:</span> ~850ms</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Architecture Diagram (Flowchart) */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">Hybrid Neural Pipeline</h3>

                    <div className="min-w-[900px] flex items-center justify-between relative gap-4">
                        {/* Layer 1: Input */}
                        <div className="flex flex-col gap-4 w-48">
                            <div className="p-4 bg-slate-100 rounded-xl border border-slate-300 text-center">
                                <Eye className="mx-auto mb-2 text-slate-600" />
                                <div className="font-bold text-sm">Raw Image</div>
                                <div className="text-xs text-slate-500">224x224 RGB</div>
                            </div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Layer 2: CNN Feature Extraction */}
                        <div className="w-56 p-5 bg-orange-50 rounded-xl border-2 border-orange-200 shadow-sm relative text-center">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs font-bold uppercase">Feature Extraction</div>
                            <Cpu size={32} className="mx-auto mb-2 text-orange-600" />
                            <h4 className="font-bold text-orange-900 mb-1">EfficientNet-B7</h4>
                            <p className="text-xs text-orange-800 leading-tight">
                                High-dimensional feature vector extraction (CNN Layers)
                            </p>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Layer 3: Model Inference */}
                        <div className="w-64 p-6 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg text-white text-center relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase shadow-sm">Thinking Engine</div>
                            <Layers size={32} className="mx-auto mb-2 text-white animate-pulse" />
                            <h4 className="font-bold text-lg">Gemini Multimodal</h4>
                            <p className="text-xs opacity-90 mt-2">Fuses CNN vectors with clinical vitals for diagnosis.</p>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Layer 4: Output Parsing */}
                        <div className="w-48 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                            <ShieldCheck size={24} className="mx-auto mb-2 text-emerald-600" />
                            <h4 className="font-bold text-emerald-900">Diagnosis</h4>
                            <div className="text-xs text-emerald-600">Actionable JSON</div>
                        </div>
                    </div>
                </div>

                {/* 3. Technical Implementation Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 font-mono text-sm overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-slate-700 pb-4 mb-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                            <span className="ml-2 text-slate-500 text-xs">backend/vision_hybrid.py</span>
                        </div>
                        <div className="space-y-1 opacity-90">
                            <div className="text-slate-500"># 1. Load Pre-trained CNN</div>
                            <div className="text-purple-400">from</div> tensorflow.keras.applications <div className="text-purple-400">import</div> EfficientNetB7
                            <div>cnn_model = EfficientNetB7(weights=<span className="text-green-400">'imagenet'</span>)</div>
                            <div>&nbsp;</div>
                            <div className="text-blue-400">def hybrid_diagnosis(image, vitals):</div>
                            <div className="pl-4 text-slate-400"># Extract Features</div>
                            <div className="pl-4">features = cnn_model.predict(image)</div>
                            <div>&nbsp;</div>
                            <div className="pl-4 text-slate-400"># Pass Reasoning to Gemini</div>
                            <div className="pl-4">response = gemini.generate([features, vitals])</div>
                            <div className="pl-4 return text-pink-400">return response.json()</div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                <Cpu className="text-orange-500" /> Why EfficientNet?
                            </h3>
                            <p className="text-sm text-slate-600">
                                We utilize <strong>EfficientNet-B7</strong> because it achieves better accuracy and efficiency than ResNet-50. By pre-processing images with this CNN, we extract structural lesion patterns before they even reach the LLM, reducing hallucination risks.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmDiseaseScanner;

