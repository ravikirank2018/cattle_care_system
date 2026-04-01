import React from 'react';
import { Search, Server, Monitor, Brain, Database, LayoutTemplate, Layers, Lock, Mic, Globe2, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TechStack = () => {
    const { t } = useLanguage();

    const stackCategories = [
        {
            title: "Frontend Engineering",
            icon: <Monitor className="w-6 h-6 text-sky-500" />,
            bgColor: "bg-sky-50 border-sky-100",
            technologies: [
                { name: "React 18", desc: "Core component-based UI library ensuring rapid, dynamic updates.", icon: "⚛️" },
                { name: "Tailwind CSS", desc: "Utility-first CSS framework for rapid, responsive, and modern enterprise styling.", icon: "🎨" },
                { name: "Lucide React", desc: "Lightweight, scalable vector graphic icons for a polished interface.", icon: "✨" },
                { name: "Chart.js", desc: "Interactive, canvas-based data visualizations for the analytics dashboards.", icon: "📊" }
            ]
        },
        {
            title: "Backend Infrastructure",
            icon: <Server className="w-6 h-6 text-emerald-500" />,
            bgColor: "bg-emerald-50 border-emerald-100",
            technologies: [
                { name: "Python 3", desc: "Robust backend language driving complex ML and processing logic.", icon: "🐍" },
                { name: "Flask", desc: "Lightweight WSGI web application framework for high-speed API endpoints.", icon: "🌶️" },
                { name: "REST APIs", desc: "Stateless architecture pattern for seamless frontend-backend communication.", icon: "🔌" },
                { name: "Flask-CORS", desc: "Handling Cross-Origin Resource Sharing for secure module interactions.", icon: "🛡️" }
            ]
        },
        {
            title: "AI & Machine Learning",
            icon: <Brain className="w-6 h-6 text-purple-500" />,
            bgColor: "bg-purple-50 border-purple-100",
            technologies: [
                { name: "Gemini 1.5/2.5 Pro", desc: "Google's advanced multimodal LLM powering the Voice Assistant and Disease Analysis.", icon: "🤖" },
                { name: "EfficientNet-B7", desc: "State-of-the-art CNN architecture used for high-accuracy bovine skin disease detection.", icon: "👁️" },
                { name: "Wav2Vec 2.0", desc: "Advanced acoustic modeling framework analyzing semantic audio events.", icon: "🎙️" },
                { name: "XGBoost + LSTM", desc: "Hybrid model predicting market value based on historical trends and live parameters.", icon: "📈" }
            ]
        },
        {
            title: "Data & Security",
            icon: <Database className="w-6 h-6 text-amber-500" />,
            bgColor: "bg-amber-50 border-amber-100",
            technologies: [
                { name: "In-Memory Store", desc: "High-speed runtime structures managing volatile health and production logs.", icon: "⚡" },
                { name: "Bcrypt", desc: "Industry-standard cryptographic hash function for secure payload handling.", icon: "🔒" },
                { name: "Dotenv", desc: "Environment variable management ensuring API keys remain completely secure.", icon: "🔑" },
                { name: "Rate Limiting", desc: "Custom token-bucket algorithms protecting API endpoints from exhaustion.", icon: "⏱️" }
            ]
        }
    ];

    const specificTools = [
        { name: "Vite", role: "Build Tool", description: "Next-generation frontend tooling for ultra-fast HMR.", icon: <Layers className="w-5 h-5 text-indigo-500" /> },
        { name: "gTTS", role: "Audio Generation", description: "Google Text-to-Speech library providing multilingual localized voice output.", icon: <Mic className="w-5 h-5 text-rose-500" /> },
        { name: "html2pdf.js", role: "Report Generation", description: "Client-side PDF rendering for health and analysis reports.", icon: <LayoutTemplate className="w-5 h-5 text-teal-500" /> },
        { name: "React Router", role: "Navigation", description: "Declarative routing component managing application state.", icon: <Globe2 className="w-5 h-5 text-blue-500" /> }
    ];

    return (
        <div className="w-full animation-fade-in relative z-10 pb-16">
            {/* Header Section */}
            <div className="mb-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold mb-4 shadow-sm">
                    <Activity className="w-4 h-4 text-sky-600" />
                    <span>System Architecture</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Tech Stack & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Tools</span>
                </h1>
                <p className="text-slate-600 text-lg max-w-3xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    A comprehensive overview of the modern, scalable technologies and AI models powering the Cattle Care platform.
                </p>
            </div>

            {/* Core Stack Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {stackCategories.map((category, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] flex flex-col"
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-2xl border ${category.bgColor}`}>
                                {category.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                {category.title}
                            </h2>
                        </div>

                        {/* Technologies List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                            {category.technologies.map((tech, tIdx) => (
                                <div key={tIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">{tech.icon}</span>
                                        <h3 className="font-bold text-slate-800 text-sm">{tech.name}</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        {tech.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Specialized Tools & Integrations row */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-teal-400"></div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <Layers className="text-indigo-500 w-6 h-6" /> 
                    Specialized Libraries & Build Tools
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specificTools.map((tool, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                            <div className="bg-white p-2 text-slate-700 rounded-lg border border-slate-200 shadow-sm">
                                {tool.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm mb-0.5">{tool.name}</h4>
                                <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold tracking-wider uppercase mb-1.5">
                                    {tool.role}
                                </span>
                                <p className="text-xs text-slate-500 font-medium">{tool.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TechStack;
