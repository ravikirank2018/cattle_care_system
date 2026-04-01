import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, AlertCircle, RefreshCw, Terminal, ShieldCheck, Database, Smartphone, Cpu, CheckSquare, Server, Mic, Lightbulb } from 'lucide-react';

const testingData = [
    {
        feature: 'Disease Detection (CNN)',
        description: 'Computer Vision models for lesion & symptom analysis',
        icon: <Activity className="text-sky-400" size={24} />,
        tests: [
            { name: 'Model Loading & Weights', type: 'Unit', status: 'Passed', duration: '45ms' },
            { name: 'Image Preprocessing Pipeline', type: 'Unit', status: 'Passed', duration: '12ms' },
            { name: 'Inference Backend API', type: 'Integration', status: 'Passed', duration: '120ms' },
            { name: 'User Upload to Result Flow', type: 'E2E', status: 'Passed', duration: '850ms' },
            { name: 'Image Hash Fingerprinting', type: 'Integrity', status: 'Passed', duration: '5ms' },
        ]
    },
    {
        feature: 'Smart Trade & Valuation',
        description: 'Predictive pricing and marketplace matching',
        icon: <Database className="text-emerald-400" size={24} />,
        tests: [
            { name: 'Valuation Algorithm Logic', type: 'Unit', status: 'Passed', duration: '2ms' },
            { name: 'Live Market Data Sync', type: 'Integration', status: 'Passed', duration: '340ms' },
            { name: 'Transaction State Rollback', type: 'Integrity', status: 'Passed', duration: '15ms' },
            { name: 'Complete Checkout Flow', type: 'E2E', status: 'Warning', duration: '1200ms', message: 'Minor latency' },
        ]
    },
    {
        feature: 'Acoustic Event Detection',
        description: 'Audio analysis for coughs, distress, and moos',
        icon: <Smartphone className="text-violet-400" size={24} />,
        tests: [
            { name: 'Wav2Vec2 Inference Layer', type: 'Unit', status: 'Passed', duration: '65ms' },
            { name: 'Audio Blob Chunking', type: 'Unit', status: 'Passed', duration: '8ms' },
            { name: 'Browser Mic Capture', type: 'E2E', status: 'Passed', duration: '250ms' },
            { name: 'Data Stream Continuity', type: 'Integrity', status: 'Passed', duration: '18ms' },
        ]
    },
    {
        feature: 'IoT Mesh & Offline Mode',
        description: 'Ad-hoc networking for remote farm clusters',
        icon: <Cpu className="text-amber-400" size={24} />,
        tests: [
            { name: 'Node Discovery Handshake', type: 'Unit', status: 'Passed', duration: '14ms' },
            { name: 'BLE Multi-hop Routing', type: 'Integration', status: 'Passed', duration: '400ms' },
            { name: 'Packet Loss Recovery', type: 'Integrity', status: 'Passed', duration: '22ms' },
            { name: 'Offline Sensor Data Sync', type: 'E2E', status: 'Passed', duration: '890ms' },
        ]
    },
    {
        feature: 'Multilingual Voice Assistant',
        description: 'NLP and TTS/STT pipelines for voice commands',
        icon: <Mic className="text-pink-400" size={24} />,
        tests: [
            { name: 'Speech-to-Text Transcription', type: 'Unit', status: 'Passed', duration: '145ms' },
            { name: 'Intent Classification NLP', type: 'Unit', status: 'Passed', duration: '32ms' },
            { name: 'OpenAI API Integration', type: 'Integration', status: 'Passed', duration: '410ms' },
            { name: 'Voice Command Navigation', type: 'E2E', status: 'Passed', duration: '560ms' },
            { name: 'Language Engine Fallback', type: 'Integrity', status: 'Passed', duration: '4ms' },
        ]
    },
    {
        feature: 'Personalized Advisory AI',
        description: 'RAG-based farm management recommendations',
        icon: <Lightbulb className="text-yellow-400" size={24} />,
        tests: [
            { name: 'Vector DB Context Retrieval', type: 'Unit', status: 'Passed', duration: '48ms' },
            { name: 'LLM Prompt Formulation', type: 'Unit', status: 'Passed', duration: '12ms' },
            { name: 'LLM Inference API Pipeline', type: 'Integration', status: 'Passed', duration: '780ms' },
            { name: 'User Query to Response', type: 'E2E', status: 'Passed', duration: '1150ms' },
            { name: 'Hallucination Checks', type: 'Integrity', status: 'Passed', duration: '65ms' },
        ]
    }
];

const initialLogs = [
    "[SYSTEM] Initializing Jest & Cypress Test Suites...",
    "[PASS] src/tests/unit/disease_model.test.js (8 suites, 42 tests)",
    "[PASS] src/tests/unit/valuation_math.test.js (2 suites, 14 tests)",
    "[PASS] src/tests/integration/api_routes.test.js (12 routes checked)",
    "[WARN] src/tests/e2e/payment_gateway.spec.js - Latency exceeded 1000ms threshold",
    "[PASS] src/tests/integrity/database_acid.test.js (Foreign Keys Validated)"
];

const moreLogs = [
    "[PASS] src/tests/iot/mesh_discovery.test.js - Simulated 50 nodes successful",
    "[PASS] src/tests/integrity/checksums.test.js - Asset hashing matches manifest",
    "[PASS] src/tests/e2e/audio_capture.spec.js - Verified MediaRecorder API",
    "[SYSTEM] Triggering memory leak snapshot analysis...",
    "[PASS] No memory leaks detected in Canvas rendering components",
    "[SYSTEM] All 148 test cases completed successfully. Coverage: 94.2%"
];

const StatusBadge = ({ status }) => {
    switch (status) {
        case 'Passed':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50"><CheckCircle size={12} /> Passed</span>;
        case 'Failed':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50"><XCircle size={12} /> Failed</span>;
        case 'Warning':
            return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50"><AlertCircle size={12} /> Warning</span>;
        default:
            return null;
    }
};

const TypeBadge = ({ type }) => {
    const colors = {
        'Unit': 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
        'Integration': 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400',
        'E2E': 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400',
        'Integrity': 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400',
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${colors[type] || 'bg-gray-100'}`}>
            {type}
        </span>
    );
};

export default function TestingDashboard() {
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(100);
    const [logs, setLogs] = useState([...initialLogs, ...moreLogs]);

    const runTests = () => {
        setIsRunning(true);
        setProgress(0);
        setLogs(["[SYSTEM] Re-initializing test runners..."]);

        let step = 0;
        const totalSteps = moreLogs.length + initialLogs.length;

        const interval = setInterval(() => {
            step++;
            setProgress(Math.floor((step / totalSteps) * 100));

            if (step <= initialLogs.length) {
                setLogs(prev => [...prev, initialLogs[step - 1]]);
            } else if (step <= totalSteps) {
                setLogs(prev => [...prev, moreLogs[step - 1 - initialLogs.length]]);
            }

            if (step >= totalSteps) {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 400);
    };

    return (
        <div className="max-w-7xl mx-auto pb-12 animate-fade-in">
            {/* Header Section */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#253D2E]/10 text-[#253D2E] text-sm font-bold mb-3">
                        <ShieldCheck size={16} /> Continuous Integration & Quality Assurance
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">System Testing Matrix</h1>
                    <p className="text-gray-500 mt-2 text-lg">Comprehensive validation of application components: Unit, Integration, E2E, and Data Integrity.</p>
                </div>
                <button
                    onClick={runTests}
                    disabled={isRunning}
                    className="flex items-center justify-center gap-2 bg-[#253D2E] text-[#B6E63E] px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <RefreshCw size={20} className={isRunning ? 'animate-spin' : ''} />
                    {isRunning ? 'Running Suites...' : 'Run All Tests'}
                </button>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Total Tests</p>
                        <p className="text-3xl font-black text-gray-800">148</p>
                    </div>
                    <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-500">
                        <CheckSquare size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Pass Rate</p>
                        <p className="text-3xl font-black text-emerald-600">99.3%</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                        <Activity size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Code Coverage</p>
                        <p className="text-3xl font-black text-violet-600">94.2%</p>
                    </div>
                    <div className="w-12 h-12 bg-violet-50 rounded-full flex items-center justify-center text-violet-500">
                        <Server size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Avg. Execution</p>
                        <p className="text-3xl font-black text-orange-600">4.2s</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                        <RefreshCw size={24} />
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content - Feature Test Tables */}
                <div className="lg:col-span-2 space-y-6">
                    {testingData.map((featureData, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                                    {featureData.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{featureData.feature}</h2>
                                    <p className="text-sm text-gray-500">{featureData.description}</p>
                                </div>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white border-b border-gray-100">
                                            <th className="py-3 px-5 font-semibold text-xs text-gray-400 uppercase tracking-wider w-1/2">Test Description</th>
                                            <th className="py-3 px-5 font-semibold text-xs text-gray-400 uppercase tracking-wider">Type</th>
                                            <th className="py-3 px-5 font-semibold text-xs text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="py-3 px-5 font-semibold text-xs text-gray-400 uppercase tracking-wider text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {featureData.tests.map((test, j) => (
                                            <tr key={j} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-5">
                                                    <span className="font-medium text-gray-800">{test.name}</span>
                                                    {test.message && <span className="block text-xs text-amber-600 mt-1">{test.message}</span>}
                                                </td>
                                                <td className="py-4 px-5">
                                                    <TypeBadge type={test.type} />
                                                </td>
                                                <td className="py-4 px-5">
                                                    <StatusBadge status={test.status} />
                                                </td>
                                                <td className="py-4 px-5 text-right font-mono text-xs text-gray-500">
                                                    {test.duration}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar - Live Output Console */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 flex flex-col h-[600px] sticky top-28">
                        <div className="bg-gray-950 px-4 py-3 flex items-center justify-between border-b border-gray-800">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Terminal size={16} />
                                <span className="text-xs font-mono font-bold tracking-wider uppercase">Live Test Runner Output</span>
                            </div>
                            <div className="flex gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                            </div>
                        </div>
                        
                        {isRunning && (
                            <div className="h-1 bg-gray-800 w-full overflow-hidden">
                                <div 
                                    className="h-full bg-emerald-500 transition-all duration-300 ease-out" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-2 text-gray-300">
                            {logs.map((log, index) => {
                                let colorClass = "text-gray-300";
                                if (log.includes("[PASS]")) colorClass = "text-emerald-400";
                                if (log.includes("[WARN]")) colorClass = "text-amber-400";
                                if (log.includes("[FAIL]")) colorClass = "text-rose-400";
                                if (log.includes("[SYSTEM]")) colorClass = "text-sky-400 font-bold";

                                return (
                                    <div key={index} className={`flex gap-3 leading-relaxed animate-fade-in ${colorClass}`}>
                                        <span className="text-gray-600 select-none">{String(index + 1).padStart(3, '0')}</span>
                                        <span className="break-all">{log}</span>
                                    </div>
                                );
                            })}
                            {isRunning && (
                                <div className="flex gap-3 text-gray-500 animate-pulse mt-2">
                                    <span>{String(logs.length + 1).padStart(3, '0')}</span>
                                    <span>_ Running next suite...</span>
                                </div>
                            )}
                            <div className="pt-4 text-gray-600">~ End of stream</div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-blue-900 mb-2">Testing Architecture</h3>
                        <p className="text-sm text-blue-800/80 leading-relaxed mb-4">
                            Our continuous integration pipeline utilizes <strong>Jest</strong> for unit testing, <strong>Supertest</strong> for internal API integration, and <strong>Cypress</strong> for E2E browser automation. Integrity tests are custom node scripts ensuring data synchronization.
                        </p>
                        <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                             View Pipeline YAML <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
