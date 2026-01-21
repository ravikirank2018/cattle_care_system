import React from 'react';
import { Camera, Mic, TrendingUp, Sparkles, ArrowRight, Smartphone, CheckCircle, Component, Layers, Cpu } from 'lucide-react';

const MegaNode = ({ icon: Icon, label, subIcons = [], color, details = [] }) => (
    <div className="flex flex-col items-center gap-4 relative z-10 w-48 group">
        <div className={`w-28 h-28 rounded-full bg-white border-8 border-${color}-400 flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-105 z-20`}>
            <Icon size={48} className={`text-${color}-600`} />
        </div>
        <div className="text-center w-full">
            <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-tight mb-3">{label}</h3>

            {/* Tech Specs List */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 shadow-inner w-full">
                <div className="flex justify-center gap-2 mb-2 border-b border-slate-200 pb-2">
                    {subIcons.map((SubIcon, i) => (
                        <SubIcon key={i} size={14} className={`text-${color}-500`} />
                    ))}
                </div>
                <ul className="text-[10px] text-slate-600 font-medium space-y-1 text-left px-2">
                    {details.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                            <span className={`mt-0.5 w-1 h-1 rounded-full bg-${color}-400 shrink-0`}></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const MegaArrow = ({ label, sub, color }) => (
    <div className="flex-1 flex flex-col items-center justify-center relative -mt-24 px-4 min-w-[100px]">
        <span className={`text-xs font-black text-${color}-600 uppercase tracking-widest mb-1 whitespace-nowrap bg-${color}-50 px-2 py-1 rounded`}>
            {label}
        </span>
        <div className="w-full h-1 bg-slate-800 relative flex items-center my-1">
            <div className="absolute right-0 -mr-2 top-1/2 transform -translate-y-1/2 text-slate-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" transform="rotate(90 12 12)" />
                </svg>
            </div>
        </div>
        <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wide">
            {sub}
        </span>
    </div>
);

const ProjectWorkflow = () => {
    return (
        <div className="min-h-screen bg-white p-8 font-sans flex items-center justify-center">
            <div className="max-w-[1400px] w-full">

                <div className="text-center mb-24">
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-2 uppercase tracking-tighter">
                        Complete System Pipeline
                    </h1>
                    <div className="h-2 w-32 bg-slate-900 mx-auto"></div>
                    <p className="text-slate-500 mt-4 font-medium uppercase tracking-widest">Single-Stream Application Architecture</p>
                </div>

                {/* THE SINGLE LINEAR FLOW */}
                <div className="flex items-start justify-between px-8 gap-4">

                    {/* STEP 1: INPUT */}
                    <MegaNode
                        icon={Smartphone}
                        label="Multi-Modal Input"
                        color="red"
                        subIcons={[Camera, Mic, TrendingUp]}
                        details={[
                            "High-Res Image Capture",
                            "Regional Voice Input (Hi/Te)",
                            "Cattle Vital Statistics",
                            "User Geolocation"
                        ]}
                    />

                    <MegaArrow label="Secure Stream" sub="HTTPS / WSS / REST" color="slate" />

                    {/* STEP 2: PROCESSING */}
                    <MegaNode
                        icon={Layers}
                        label="Preprocessing"
                        color="blue"
                        subIcons={[Component, Component, Component]}
                        details={[
                            "Image Resizing (224px)",
                            "Audio Noise Reduction",
                            "Token Authentication",
                            "Request Validation"
                        ]}
                    />

                    <MegaArrow label="Context Injection" sub="RAG & Normalization" color="slate" />

                    {/* STEP 3: CORE AI */}
                    <MegaNode
                        icon={Sparkles}
                        label="Hybrid Intelligence"
                        color="purple"
                        subIcons={[Cpu, Sparkles, Cpu]}
                        details={[
                            "Gemini 1.5 Pro (Vision)",
                            "Speech-to-Text (STT)",
                            "Contextual RAG Lookup",
                            "Regression Logic"
                        ]}
                    />

                    <MegaArrow label="Generative Logic" sub="Neural Inference" color="slate" />

                    {/* STEP 4: OUTPUT */}
                    <MegaNode
                        icon={CheckCircle}
                        label="Smart Response"
                        color="emerald"
                        subIcons={[CheckCircle, CheckCircle, CheckCircle]}
                        details={[
                            "Diagnosis Report",
                            "Translated Audio Output",
                            "Fair Market Valuation",
                            "Veterinary Advice"
                        ]}
                    />

                </div>

            </div>
        </div>
    );
};

export default ProjectWorkflow;

