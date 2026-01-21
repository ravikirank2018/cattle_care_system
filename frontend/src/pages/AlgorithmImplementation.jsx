import React from 'react';
import { ArrowLeft, Layers, Database, Calculator, GitBranch, Terminal, Cpu, Network, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlgorithmImplementation = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/system-arch-demo')}
                            className="p-2 hover:bg-slate-100 rounded-full transition-all active:scale-95 text-slate-500"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Core Implementation Details
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
                        <Terminal size={12} /> Tech Implementation
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* 3 Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                    {/* Card 1: Visual Diagnosis (CNN) */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-rose-200 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                                    <Layers size={24} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Visual Diagnosis (CNN)</h2>
                            </div>

                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                <strong className="text-slate-700">Convolutional Neural Network</strong> based on InceptionV3 architecture for feature map extraction.
                            </p>

                            <div className="bg-slate-900 rounded-xl p-4 text-[10px] font-mono text-slate-300 leading-relaxed shadow-inner">
                                <div className="text-rose-400 mb-2">model = Sequential([</div>
                                <div className="pl-4">Conv2D(32, (3,3), activation='relu'),</div>
                                <div className="pl-4">MaxPooling2D(2,2),</div>
                                <div className="pl-4">Conv2D(64, (3,3), activation='relu'),</div>
                                <div className="pl-4">Flatten(),</div>
                                <div className="pl-4">Dense(128, activation='relu'),</div>
                                <div className="pl-4">Dense(num_diseases, activation='softmax')</div>
                                <div className="text-rose-400">])</div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">Relu Activation</span>
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">Max Pooling</span>
                                <span className="px-2 py-1 bg-rose-50 text-rose-600 rounded-md text-[10px] font-bold border border-rose-100">Softmax</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Advisory RAG Pipeline */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-200 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                                    <GitBranch size={24} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Advisory RAG Pipeline</h2>
                            </div>

                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                <strong className="text-slate-700">Retrieval-Augmented Generation</strong> combines vector search with generative modeling for grounded advice.
                            </p>

                            <div className="bg-slate-900 rounded-xl p-4 text-[10px] font-mono text-slate-300 leading-relaxed shadow-inner">
                                <div className="text-blue-400 mb-1">def generate_advice(query, cow_id):</div>
                                <div className="pl-4">context = db.get_vitals(cow_id)</div>
                                <div className="pl-4 mb-2">history = db.get_medical_history(cow_id)</div>
                                <div className="pl-4 text-emerald-400">prompt = f"""</div>
                                <div className="pl-6 text-emerald-300">Role: Vet AI</div>
                                <div className="pl-6 text-emerald-300">Context: {'{context}'}</div>
                                <div className="pl-6 text-emerald-300">History: {'{history}'}</div>
                                <div className="pl-6 text-emerald-300">Query: {'{query}'}</div>
                                <div className="pl-4 text-emerald-400">"""</div>
                                <div className="pl-4 mt-1 text-purple-400">return gemini.generate(prompt)</div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">Vector DB</span>
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold border border-blue-100">Context Injection</span>
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">LLM</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Price Valuation Model */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-amber-200 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                                    <Calculator size={24} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900">Price Valuation Model</h2>
                            </div>

                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                <strong className="text-slate-700">Multi-Variable Regression</strong> algorithm with dynamic weight adjustments for market fluctuations.
                            </p>

                            <div className="bg-slate-900 rounded-xl p-4 text-[10px] font-mono text-slate-300 leading-relaxed shadow-inner">
                                <div className="text-amber-400 mb-2">Price = (w1 * Age) +</div>
                                <div className="pl-12">(w2 * Weight) +</div>
                                <div className="pl-12">(w3 * Yield) -</div>
                                <div className="pl-12">(w4 * Health_Issues)</div>
                                <div className="mt-4 mb-1 text-purple-400">if Region == 'North':</div>
                                <div className="pl-4 text-slate-400">Price *= 1.15  # Demand Factor</div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">Linear Regression</span>
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold border border-slate-200">Weights & Biases</span>
                                <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-md text-[10px] font-bold border border-amber-100">Heuristic Rules</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Workflow Flowchart */}
                <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="p-2 bg-fuchsia-50 text-fuchsia-600 rounded-lg">
                            <Network size={20} />
                        </div>
                        <h3 className="font-bold text-xl text-slate-900">Integrated Workflow Flowchart</h3>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                        {/* Step 1 */}
                        <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
                            <span className="text-xs font-bold text-slate-500 mb-1 block">Step 01</span>
                            <h4 className="font-bold text-slate-800 text-sm">User Input (Image/Audio)</h4>
                        </div>

                        <ArrowRight className="text-slate-300 rotate-90 md:rotate-0" />

                        {/* Step 2 */}
                        <div className="flex-1 w-full bg-fuchsia-50 border border-fuchsia-100 rounded-xl p-6 text-center shadow-sm">
                            <span className="text-xs font-bold text-fuchsia-500 mb-1 block">Step 02</span>
                            <h4 className="font-bold text-fuchsia-900 text-sm">Preprocessing & Normalization</h4>
                        </div>

                        <ArrowRight className="text-slate-300 rotate-90 md:rotate-0" />

                        {/* Step 3 */}
                        <div className="flex-1 w-full bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center shadow-sm">
                            <span className="text-xs font-bold text-indigo-500 mb-1 block">Step 03</span>
                            <h4 className="font-bold text-indigo-900 text-sm">Model Inference (CNN / LLM / Regressor)</h4>
                        </div>

                        <ArrowRight className="text-slate-300 rotate-90 md:rotate-0" />

                        {/* Step 4 */}
                        <div className="flex-1 w-full bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center shadow-sm">
                            <span className="text-xs font-bold text-emerald-500 mb-1 block">Step 04</span>
                            <h4 className="font-bold text-emerald-900 text-sm">Actionable Output (Diagnosis / Advice / Price)</h4>
                        </div>
                    </div>

                    {/* Decorative Background Line */}
                    <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-100 -z-0 hidden md:block"></div>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmImplementation;

