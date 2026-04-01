import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Globe, Users, Target, Tractor, ShieldCheck, MapPin, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const MarketSize = () => {
    const { t } = useLanguage();

    // Market Size Data (Estimated users)
    const tamValue = 80; // Millions
    const samValue = 35; // Millions
    const somValue = 1;  // Millions

    const doughnutData = {
        labels: ['TAM (80M)', 'SAM (35M)', 'SOM (1M)'],
        datasets: [
            {
                data: [tamValue - samValue, samValue - somValue, somValue],
                backgroundColor: [
                    'rgba(14, 165, 233, 0.8)', // Sky
                    'rgba(168, 85, 247, 0.8)', // Purple
                    'rgba(182, 230, 62, 0.9)'  // Brand Lime Green
                ],
                borderColor: [
                    '#ffffff',
                    '#ffffff',
                    '#ffffff'
                ],
                borderWidth: 2,
                hoverOffset: 10
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#475569', // text-slate-600
                    font: {
                        family: 'Inter',
                        size: 14,
                        weight: '600'
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#0f172a',
                bodyColor: '#334155',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                titleFont: { family: 'Inter', size: 14, weight: 'bold' },
                bodyFont: { family: 'Inter', size: 14 },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' Million';
                        }
                        return label;
                    }
                }
            }
        },
        cutout: '70%',
    };

    const cards = [
        {
            title: "TAM (Total Addressable Market)",
            subtitle: "Total Indian Dairy Farmers",
            value: "80 Million",
            description: "The overarching Indian Dairy and Cattle Management Market. Represents every farm household engaged in dairying nationwide.",
            color: "from-sky-500 to-blue-600",
            icon: <Globe className="w-8 h-8 text-sky-500" />,
            bgGlow: "bg-sky-500/10",
            details: [
                "World's largest bovine population (300M+)",
                "$500M+ theoretical annual software market",
                "Includes all rural dairy households"
            ]
        },
        {
            title: "SAM (Serviceable Available Market)",
            subtitle: "Tech-Enabled Rural Farmers",
            value: "35 Million",
            description: "The segment of the TAM within technological reach—farmers with smartphone access, internet connectivity, and regional language preference.",
            color: "from-purple-500 to-fuchsia-600",
            icon: <Users className="w-8 h-8 text-purple-500" />,
            bgGlow: "bg-purple-500/10",
            details: [
                "40-50% smartphone penetration in rural areas",
                "Accessible via Voice Assistant & Localized UI",
                "Hardware capabilities for image uploads"
            ]
        },
        {
            title: "SOM (Serviceable Obtainable Market)",
            subtitle: "Immediate Target Adopters",
            value: "1 Million",
            description: "The portion of SAM realistically capturable in 1-3 years: progressive farmers, commercial dairies, and cattle traders in key hubs.",
            color: "from-[#8bb82d] to-green-600",
            icon: <Target className="w-8 h-8 text-[#8bb82d]" />,
            bgGlow: "bg-[#B6E63E]/20",
            details: [
                "Commercial dairies managing 20+ cattle",
                "High-value cattle traders needing 'Smart Trade'",
                "Initial focus: Gujarat, Punjab, Haryana, Maharashtra"
            ]
        }
    ];

    return (
        <div className="w-full animation-fade-in relative z-10">
            {/* Header Section */}
            <div className="mb-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold mb-4 shadow-sm">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span>Market Analysis Report</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Market Potential & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-[#8bb82d]">Scale</span>
                </h1>
                <p className="text-slate-600 text-lg max-w-3xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    A comprehensive breakdown of the addressable market for the AI-Powered Cattle Care System within the Indian Agritech landscape.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">

                {/* Left Column: Chart */}
                <div className="xl:col-span-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-8 relative z-10 self-start w-full text-center">Market Size Proportions</h3>
                    
                    <div className="relative w-full aspect-square max-w-[320px] mx-auto z-10">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-4xl font-extrabold text-slate-800 tracking-tight">80M</span>
                            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Total Market</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Cards */}
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] group relative overflow-hidden flex flex-col"
                        >
                            {/* Card Background Glow */}
                            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${card.bgGlow}`}></div>

                            {/* Header */}
                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                                    {card.icon}
                                </div>
                                <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r ${card.color}`}>
                                    {card.value}
                                </span>
                            </div>

                            {/* Title & Sub */}
                            <div className="mb-4 relative z-10">
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{card.title.split(' ')[0]}</h3>
                                <p className="text-sm text-slate-500 font-semibold">{card.subtitle}</p>
                            </div>

                            {/* Description */}
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow relative z-10 font-medium">
                                {card.description}
                            </p>

                            {/* Bullet Points */}
                            <div className="space-y-3 relative z-10 mt-auto pt-4 border-t border-slate-100">
                                {card.details.map((detail, dIdx) => (
                                    <div key={dIdx} className="flex items-start gap-2">
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.color} flex-shrink-0`}></div>
                                        <span className="text-xs text-slate-500 font-medium leading-snug">{detail}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section - Targeted Demographics */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-purple-400 to-[#8bb82d]"></div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <MapPin className="text-emerald-500 w-6 h-6" /> 
                    SOM Strategic Focus Areas
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <div className="bg-emerald-100 p-2 rounded-lg border border-emerald-200/50"><Tractor className="w-5 h-5 text-emerald-600" /></div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">Commercial Dairies</h4>
                            <p className="text-xs text-slate-500 font-medium">High volume yield tracking & health monitoring for 20+ cattle farms.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <div className="bg-amber-100 p-2 rounded-lg border border-amber-200/50"><ShieldCheck className="w-5 h-5 text-amber-600" /></div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">Cattle Brokers</h4>
                            <p className="text-xs text-slate-500 font-medium">Utilizing the 'Smart Trade' ML valuation for fair-market price discovery.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <div className="bg-blue-100 p-2 rounded-lg border border-blue-200/50"><Globe className="w-5 h-5 text-blue-600" /></div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">Regional Integration</h4>
                            <p className="text-xs text-slate-500 font-medium">Targeting high-yield states: Gujarat, Punjab, Haryana, & Maharashtra.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                        <div className="bg-purple-100 p-2 rounded-lg border border-purple-200/50"><Users className="w-5 h-5 text-purple-600" /></div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">Progressive Youth</h4>
                            <p className="text-xs text-slate-500 font-medium">Next-gen farmers open to adopting AI advisory and smartphone management.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MarketSize;
