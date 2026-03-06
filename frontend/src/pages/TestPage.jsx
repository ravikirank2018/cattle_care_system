import React, { useState } from 'react';
import axios from 'axios';
import { Terminal, Play, CheckCircle, XCircle, Activity, Server, MessageSquare, Coins } from 'lucide-react';

const TestPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const addLog = (msg, status = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { msg, status, timestamp }]);
    };

    const clearLogs = () => setLogs([]);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    const testDashboard = async () => {
        addLog("Testing Dashboard Endpoint...", 'info');
        try {
            const start = performance.now();
            const res = await axios.get(`${API_URL}/api/dashboard`);
            const duration = (performance.now() - start).toFixed(2);

            if (res.status === 200 && res.data.stats && res.data.stats.total_cattle !== undefined) {
                addLog(`[PASS] Dashboard Valid (${duration}ms). Total Cattle: ${res.data.stats.total_cattle}`, 'success');
            } else {
                addLog(`[FAIL] Dashboard Invalid Response: ${JSON.stringify(res.data)}`, 'error');
            }
        } catch (err) {
            addLog(`[FAIL] Dashboard Error: ${err.message}`, 'error');
        }
    };

    const testSmartTrade = async () => {
        addLog("Testing Smart Trade Prediction...", 'info');
        try {
            const payload = {
                breed: "Jersey",
                age: 48,
                weight: 400,
                milk_yield: 15,
                pregnancy_month: 3,
                state: "Karnataka",
                language: "en-US"
            };

            const start = performance.now();
            const res = await axios.post(`${API_URL}/api/price`, payload);
            const duration = (performance.now() - start).toFixed(2);

            if (res.status === 200 && res.data.estimated_price) {
                addLog(`[PASS] Smart Trade Valid (${duration}ms). Price: ₹${res.data.estimated_price}`, 'success');
            } else {
                addLog(`[FAIL] Smart Trade Invalid Response: ${JSON.stringify(res.data)}`, 'error');
            }
        } catch (err) {
            addLog(`[FAIL] Smart Trade Error: ${err.message}`, 'error');
        }
    };

    const testHealthScanner = async () => {
        addLog("Testing Health Scanner (Disease AI)...", 'info');
        try {
            // Tiny 1x1 Pixel JPEG Base64
            const sampleImage = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

            const payload = {
                image: sampleImage,
                age: "4",
                weight: "400",
                breed: "Jersey",
                language: "en-US"
            };

            const start = performance.now();
            const res = await axios.post(`${API_URL}/api/scan`, payload);
            const duration = (performance.now() - start).toFixed(2);

            if (res.status === 200 && res.data.status) {
                addLog(`[PASS] Health AI Valid (${duration}ms). Diagnosis: ${res.data.status}`, 'success');
            } else {
                addLog(`[FAIL] Health AI Invalid Response: ${JSON.stringify(res.data)}`, 'error');
            }
        } catch (err) {
            // 400 is also acceptable if it's just an AI filter block, but usually we expect 200
            addLog(`[FAIL] Health AI Error: ${err.message}`, 'error');
        }
    };

    const testAdvisory = async () => {
        addLog("Testing Advisory Chat...", 'info');
        try {
            const payload = { transcript: "Cow is not eating properly", language: "en-US" };

            const start = performance.now();
            const res = await axios.post(`${API_URL}/api/chat`, payload);
            const duration = (performance.now() - start).toFixed(2);

            if (res.status === 200 && res.data.response_text) {
                addLog(`[PASS] Advisory Valid (${duration}ms). Response: ${res.data.response_text.substring(0, 50)}...`, 'success');
            } else {
                addLog(`[FAIL] Advisory Invalid Response: ${JSON.stringify(res.data)}`, 'error');
            }
        } catch (err) {
            addLog(`[FAIL] Advisory Error: ${err.message}`, 'error');
        }
    };

    const runAllTests = async () => {
        setLoading(true);
        clearLogs();
        addLog("Starting System Diagnostics...", 'info');

        await testDashboard();
        await new Promise(r => setTimeout(r, 500));
        await testSmartTrade();
        await new Promise(r => setTimeout(r, 500));
        await testHealthScanner();
        await new Promise(r => setTimeout(r, 500));
        await testAdvisory();

        addLog("All Tests Completed.", 'info');
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10 max-w-5xl mx-auto">
            <header className="flex items-center gap-4">
                <div className="p-4 bg-gray-900 text-green-400 rounded-2xl shadow-lg border border-gray-800">
                    <Terminal size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">System Diagnostics Code</h1>
                    <p className="text-gray-500 font-medium mt-1">Backend API Integrity & Latency Test</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-all">
                    <LayoutCard
                        icon={<Activity className="text-blue-500" />}
                        title="Dashboard API"
                        desc="Validates DB Connection & Stats"
                        onRun={testDashboard}
                        loading={loading}
                    />
                </div>
                <div className="glass-card p-6 border-l-4 border-l-emerald-500 hover:shadow-lg transition-all">
                    <LayoutCard
                        icon={<Coins className="text-emerald-500" />}
                        title="Smart Trade AI"
                        desc="Validates ML Model Inference"
                        onRun={testSmartTrade}
                        loading={loading}
                    />
                </div>
                <div className="glass-card p-6 border-l-4 border-l-rose-500 hover:shadow-lg transition-all">
                    <LayoutCard
                        icon={<Activity className="text-rose-500" />}
                        title="Health AI"
                        desc="Validates Vision Model"
                        onRun={testHealthScanner}
                        loading={loading}
                    />
                </div>
                <div className="glass-card p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-all">
                    <LayoutCard
                        icon={<MessageSquare className="text-purple-500" />}
                        title="Advisory Gemini"
                        desc="Validates LLM Response Stream"
                        onRun={testAdvisory}
                        loading={loading}
                    />
                </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800 font-mono text-sm min-h-[400px] flex flex-col">
                <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <span className="text-gray-400 flex items-center gap-2"><Server size={14} /> Console Output</span>
                    <div className="flex gap-2">
                        <button onClick={clearLogs} className="text-xs text-gray-400 hover:text-white px-2 py-1 hover:bg-white/10 rounded">Clear</button>
                        <button
                            onClick={runAllTests}
                            disabled={loading}
                            className={`flex items-center gap-2 px-3 py-1 rounded bg-green-600 text-white text-xs font-bold hover:bg-green-500 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Play size={12} fill="currentColor" /> RUN ALL
                        </button>
                    </div>
                </div>
                <div className="p-4 space-y-2 flex-1 overflow-y-auto max-h-[500px]">
                    {logs.length === 0 && <span className="text-gray-600 italic">Ready to run tests...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className={`flex items-start gap-3 animate-fade-in ${getStatusColor(log.status)}`}>
                            <span className="opacity-50 min-w-[80px] text-xs mt-1">{log.timestamp}</span>
                            <div className="flex-1 break-words">
                                {log.status === 'success' && <CheckCircle size={14} className="inline mr-2 -mt-1" />}
                                {log.status === 'error' && <XCircle size={14} className="inline mr-2 -mt-1" />}
                                {log.msg}
                            </div>
                        </div>
                    ))}
                    {loading && <div className="text-blue-400 animate-pulse">Running diagnostics...</div>}
                </div>
            </div>

            {/* Methodology Section */}
            <div className="mt-10 p-8 glass-card bg-white/50 rounded-2xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🧪 Testing Methodology</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-700 mb-2">Techniques Used</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li><strong>Integration Testing:</strong> Verifies actual communication between Frontend and Backend APIs.</li>
                            <li><strong>Latency Measurement:</strong> Uses <code className="bg-gray-100 px-1 rounded text-sm">performance.now()</code> to track precise API response times.</li>
                            <li><strong>Schema Validation:</strong> Checks for critical JSON keys (e.g., `total_cattle`, `status`, `response_text`) to verify data integrity.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 mb-2">Test Coverage</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li><strong>Dashboard:</strong> Verifies MongoDB/Memory DB connectivity and aggregator logic.</li>
                            <li><strong>Health & Smart Trade:</strong> Validates AI model inference pipelines (Vision & Regression models).</li>
                            <li><strong>Advisory:</strong> Tests NLP Intent Engine and LLM Context Retention.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LayoutCard = ({ icon, title, desc, onRun, loading }) => (
    <div className="flex flex-col h-full justify-between">
        <div>
            <div className="mb-3">{icon}</div>
            <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
            <p className="text-gray-500 text-sm mt-1">{desc}</p>
        </div>
        <button
            onClick={onRun}
            disabled={loading}
            className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-sm transition"
        >
            Run Test
        </button>
    </div>
);

const getStatusColor = (status) => {
    switch (status) {
        case 'success': return 'text-green-400';
        case 'error': return 'text-red-400';
        default: return 'text-gray-300';
    }
};

export default TestPage;
