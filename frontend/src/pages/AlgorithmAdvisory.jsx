import React from 'react';
import { ArrowLeft, MessageSquare, Database, ShieldCheck, UserCog, BrainCircuit, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AlgorithmAdvisory = () => {
    const navigate = useNavigate();

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
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Algorithm Deep Dive: Context-Aware Generative Reasoning
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* 1. Overview Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Role-Based Prompt Engineering</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                The Advisory system goes beyond simple chatbots by implementing <strong>Role-Based Prompt Engineering</strong> and <strong>Context Injection</strong>. It transforms a standard LLM into a specialized Veterinary or Nutrition expert by feeding it structured history and strict behavioral instructions.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">Persona Adoption</span>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">Conversation Memory</span>
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold border border-slate-200">Safety Guardrails</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                <BrainCircuit size={20} /> Cognitive Functions
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-blue-800"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Dynamic Persona Switching (Vet vs Nutritionist)</li>
                                <li className="flex items-center gap-2 text-sm text-blue-800"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Multi-Turn Context Retention</li>
                                <li className="flex items-center gap-2 text-sm text-blue-800"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Concise Output for Voice Readability</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Conversation Pipeline Diagram */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 overflow-x-auto">
                    <h3 className="text-2xl font-bold mb-12 text-center">Conversation Pipeline</h3>

                    <div className="min-w-[900px] flex items-center justify-between relative gap-6">

                        {/* Node 1: User Query */}
                        <div className="flex flex-col items-center gap-4 w-40">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                                <UserCog size={32} className="text-slate-600" />
                            </div>
                            <div className="font-bold text-slate-800">User Query</div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Node 2: Context Assembler */}
                        <div className="flex flex-col items-center gap-4 w-64">
                            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200 text-left w-full relative">
                                <div className="absolute -top-3 left-4 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold uppercase">Prompt Engineering</div>
                                <h4 className="font-bold text-blue-900 mb-3">Context Assembler</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-blue-100 text-blue-700">
                                        <Database size={12} /> Chat History
                                    </div>
                                    <div className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-blue-100 text-blue-700">
                                        <Terminal size={12} /> System Instruction
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Node 3: Gemini LLM */}
                        <div className="flex flex-col items-center gap-4 w-48">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                                <BrainCircuit size={40} className="text-white" />
                            </div>
                            <div className="text-center">
                                <div className="font-bold text-purple-900">Gemini LLM</div>
                                <div className="text-xs text-purple-600">Inference Engine</div>
                            </div>
                        </div>

                        <div className="text-slate-300 text-2xl">➜</div>

                        {/* Node 4: Expert Advice */}
                        <div className="flex flex-col items-center gap-4 w-40">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                                <ShieldCheck size={32} className="text-emerald-600" />
                            </div>
                            <div className="font-bold text-slate-800">Expert Advice</div>
                        </div>

                    </div>
                </div>

                {/* 3. Technical Implementation Details */}
                <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 font-mono text-sm">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                        <span className="text-blue-400 font-bold">Context Injection Code</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-3 opacity-90">
                        <div className="text-slate-500"># 1. Select Persona</div>
                        <div>role_desc = <span className="text-green-400">"You are an expert Veterinary Doctor..."</span></div>

                        <div className="text-slate-500 mt-4"># 2. Assemble Context Prompt</div>
                        <div className="text-blue-400">system_instruction = f"""</div>
                        <div className="pl-4">{`{role_desc}`}</div>
                        <div className="pl-4">Constraints: Keep response concise (max 3 sentences).</div>
                        <div className="pl-4">Language: {`{user_language}`}</div>
                        <div className="pl-4">User History: {`{history_context}`}</div>
                        <div>"""</div>

                        <div className="text-slate-500 mt-4"># 3. Generate Response</div>
                        <div>response = model.generate_content([system_instruction, user_query])</div>
                        <div className="return text-pink-400">return response.text</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AlgorithmAdvisory;

