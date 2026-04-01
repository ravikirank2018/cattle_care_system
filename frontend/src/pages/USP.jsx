import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Mic, ShieldCheck, Stethoscope, LineChart, Cpu, Globe2 } from 'lucide-react';

const USP = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const usps = [
        {
            id: 1,
            title: "Multilingual Voice AI",
            subtitle: "Rural Literacy Barrier Elimination",
            description: "A first-of-its-kind vernacular voice assistant powered by Gemini 2.5 Pro. Farmers can ask complex health or nutrition questions in Hindi, Telugu, Tamil, and more, without needing to type or navigate complex menus.",
            icon: <Mic className="w-8 h-8 text-white" />,
            gradient: "from-sky-500 to-indigo-600",
            image: "/usp_voice_ai.png",
            features: ["Phonetic Auto-Correction", "Regional Dialect Support", "Audio-First UX"]
        },
        {
            id: 2,
            title: "Smart Trade Valuation",
            subtitle: "Algorithm-Driven Fair Pricing",
            description: "Bypassing traditional middlemen exploiting informational asymmetry. Our XGBoost model evaluates precise cattle value based on live inputs (breed, location, milk yield, age) and real-time regional market data.",
            icon: <LineChart className="w-8 h-8 text-white" />,
            gradient: "from-emerald-500 to-teal-600",
            image: "/usp_smart_trade.png",
            features: ["Zone-Based Breed Premiums", "Disease Depreciation", "Lactation Cycle Bonuses"]
        },
        {
            id: 3,
            title: "Computer Vision Diagnosis",
            subtitle: "Instant Expert Dermatological Analysis",
            description: "Utilizing EfficientNet-B7 to instantly analyze smartphone images for severe bovine diseases like FMD and Lumpy Skin Disease, providing immediate treatment and quarantine protocols before spread occurs.",
            icon: <Stethoscope className="w-8 h-8 text-white" />,
            gradient: "from-fuchsia-500 to-rose-500",
            image: "/usp_vision_diagnosis.png",
            features: ["High Accuracy CNNs", "Real-Time Confidence Scoring", "Infectious Risk Alerts"]
        },
        {
            id: 4,
            title: "Acoustic Event Detection",
            subtitle: "Continuous Audio Surveillance",
            description: "Deploying Wav2Vec logic to analyze ambient shed sounds. Automatically detects pain vocalizations, abnormal breathing, or heat stress panting, alerting farmers even when they aren't physically present.",
            icon: <Globe2 className="w-8 h-8 text-white" />,
            gradient: "from-amber-500 to-orange-600",
            image: "/usp_acoustic_detection.png",
            features: ["Continuous Monitoring", "Pain Threshold Alerts", "Low-Compute Edge Ready"]
        }
    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % usps.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + usps.length) % usps.length);
    };

    // Auto rotate slides
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full animation-fade-in relative z-10 pb-16 min-h-[85vh] flex flex-col items-center justify-center">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-sky-100/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            {/* Header Section */}
            <div className="mb-10 text-center relative z-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-teal-600 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Unique Selling Propositions</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-4">
                    Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500">Innovations</span>
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl leading-relaxed mx-auto font-medium">
                    The advanced technological pillars that differentiate the Cattle Care platform in the Agritech space.
                </p>
            </div>

            {/* Premium 3D Carousel Container */}
            <div className="relative w-full max-w-6xl mx-auto px-4 h-[550px] perspective-[2000px]">
                
                {usps.map((usp, index) => {
                    // Calculate 3D positioning
                    let offset = index - activeIndex;
                    // Handle wrap around for smooth infinite appearance
                    if (offset < -1) offset += usps.length;
                    if (offset > 2) offset -= usps.length;

                    // Display states based on offset
                    const isActive = offset === 0;
                    const isPrev = offset === -1;
                    const isNext = offset === 1;
                    // Hide others
                    const isHidden = !isActive && !isPrev && !isNext;

                    // 3D Transform calculations
                    let transformStr = '';
                    let opacity = 0;
                    let zIndex = 0;
                    
                    if (isActive) {
                        transformStr = 'translateX(0) scale(1) translateZ(0) rotateY(0deg)';
                        opacity = 1;
                        zIndex = 30;
                    } else if (isPrev) {
                        transformStr = 'translateX(-35%) scale(0.85) translateZ(-150px) rotateY(15deg)';
                        opacity = 0.5;
                        zIndex = 20;
                    } else if (isNext) {
                        transformStr = 'translateX(35%) scale(0.85) translateZ(-150px) rotateY(-15deg)';
                        opacity = 0.5;
                        zIndex = 20;
                    } else {
                        transformStr = 'translateX(0) scale(0.6) translateZ(-400px)';
                        opacity = 0;
                        zIndex = 10;
                    }

                    return (
                        <div 
                            key={usp.id}
                            className={`absolute top-0 left-0 right-0 mx-auto w-full max-w-4xl h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.15)] bg-white border border-slate-100 flex flex-col cursor-pointer ${isHidden ? 'pointer-events-none' : ''}`}
                            style={{ 
                                transform: transformStr, 
                                opacity: opacity,
                                zIndex: zIndex,
                                transformStyle: 'preserve-3d'
                            }}
                            onClick={() => !isActive && setActiveIndex(index)}
                        >
                            
                            {/* Content */}
                            <div className="w-full p-8 md:p-12 flex flex-col justify-center relative bg-white z-30 h-full">
                                
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${usp.gradient} shadow-lg mb-6 w-min`}>
                                    {usp.icon}
                                </div>
                                
                                <h4 className={`text-sm font-bold tracking-widest uppercase mb-2 text-transparent bg-clip-text bg-gradient-to-r ${usp.gradient}`}>
                                    {usp.subtitle}
                                </h4>
                                
                                <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mb-6 leading-tight">
                                    {usp.title}
                                </h2>
                                
                                <p className="text-slate-600 text-[15px] md:text-base leading-relaxed mb-8 font-medium">
                                    {usp.description}
                                </p>

                                {/* Features List */}
                                <div className="space-y-4 mb-4">
                                    {usp.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${usp.gradient}`}></div>
                                            </div>
                                            <span className="text-slate-700 font-bold text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Active Slide Indicator (Subtle decoration) */}
                                <div className="absolute top-12 right-12 hidden md:flex gap-1.5 opacity-30">
                                    <div className="w-1.5 h-6 rounded-full bg-slate-300"></div>
                                    <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${usp.gradient}`}></div>
                                    <div className="w-1.5 h-8 rounded-full bg-slate-200"></div>
                                </div>
                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Navigation Controls */}
            <div className="mt-12 flex items-center justify-center gap-6 relative z-30">
                <button 
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-slate-600 hover:text-slate-900 group"
                >
                    <ArrowLeft className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
                </button>
                
                {/* Dots indicator */}
                <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-full border border-slate-200/50">
                    {usps.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${activeIndex === idx ? 'w-8 h-2.5 bg-sky-500 shadow-md shadow-sky-500/30' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button 
                    onClick={handleNext}
                    className="p-4 rounded-full bg-white border border-slate-200 shadow-[0_4px_15px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.1)] hover:border-slate-300 transition-all text-slate-600 hover:text-slate-900 group"
                >
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Inject minimal CSS for the 3D perspective to work flawlessly */}
            <style jsx>{`
                .perspective-[2000px] {
                    perspective: 2000px;
                }
            `}</style>

        </div>
    );
};

export default USP;
