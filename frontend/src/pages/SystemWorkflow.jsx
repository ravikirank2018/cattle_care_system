import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Server, Database, Smartphone, BrainCircuit, ArrowLeft, Globe, Cloud, Laptop, Code, ShieldCheck, X, FileJson, Terminal, Cpu } from 'lucide-react';

const SystemWorkflow = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [selectedNode, setSelectedNode] = useState(null);

    // Technical Details Data
    const nodeDetails = {
        'Mobile App': {
            title: 'Client Layer (Frontend)',
            specs: {
                role: 'User Interface & Input Capture',
                stack: 'React.js (Vite) + Tailwind CSS',
                process: [
                    'Captures high-res image via HTML5 Media API',
                    'Compresses & converts to Base64 string',
                    'Captures voice audio & initializes browser SpeechRecognition',
                    'Manages client-side state & loading indicators'
                ],
                codeSnippet: `// React State Logic
const runAnalysis = async () => {
  const image = webcamRef.current.getScreenshot();
  const res = await axios.post('/api/scan', { 
    image: image.split(',')[1], // Base64
    language: 'hi-IN' 
  });
  setResult(res.data);
}`
            }
        },
        'API Gateway': {
            title: 'Orchestration Layer (Backend)',
            specs: {
                role: 'Request Validation & Routing',
                stack: 'Python (Flask) + Gunicorn',
                process: [
                    'Validates incoming JSON payload size & type',
                    'Implements Rate Limiting & CORS security',
                    'Constructs dynamic "System Prompts" for AI',
                    'Parses AI response string into valid JSON'
                ],
                codeSnippet: `@app.route('/api/scan', methods=['POST'])
def scan_disease():
    data = request.json
    # Dynamic Prompt Construction
    prompt = f"Analyze image for {data['lang']} user..."
    
    # Call Gemini
    response = model.generate_content([prompt, img])
    return jsonify(json.loads(response.text))`
            }
        },
        'Gemini 2.5': {
            title: 'Intelligence Engine (Algo)',
            specs: {
                role: 'Multimodal Reasoning & Decision Making',
                stack: 'Google Gemini 1.5 Flash Model',
                process: [
                    'Visual Encoder: Breaks image into 16x16 patch embeddings',
                    'Cross-Attention: Maps visual features to text concepts',
                    'Safety Filters: Checks for harm/policy violations',
                    'Token Generation: Autoregressively generates diagnosis JSON'
                ],
                codeSnippet: `{
  "status": "Critical",
  "disease": "Lumpy Skin Disease",
  "confidence": 0.98,
  "remedy": "Isolate cattle immediately...",
  "medication": ["Paracetamol", "Antiseptic Spray"]
}`
            }
        },
        'Data Store': {
            title: 'Persistence Layer',
            specs: {
                role: 'Long-term Storage & Analytics',
                stack: 'SQLite (Production: PostgreSQL)',
                process: [
                    'Stores transactional metrics (milk yield, health logs)',
                    'Maintains relational integrity between Users and Cattle',
                    'Supports analytical queries for Dashboard charts'
                ],
                codeSnippet: `CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  endpoint TEXT,
  latency_ms INTEGER
);`
            }
        }
    };

    const handleNodeClick = (title) => {
        if (nodeDetails[title]) {
            setSelectedNode(nodeDetails[title]);
        }
    };

    const ArchNode = ({ icon: Icon, title, sub, color, delay }) => (
        <div className="relative group z-20 cursor-pointer" onClick={() => handleNodeClick(title)}>
            <div className={`w-32 h-32 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center border-2 ${color} transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-fade-in-up hover:ring-4 ring-offset-2 ring-${color.replace('border-', '')}`} style={{ animationDelay: `${delay}ms` }}>
                <div className={`p-3 rounded-full mb-2 ${color.replace('border-', 'bg-').replace('500', '100')} text-${color.replace('border-', '').replace('500', '600')}`}>
                    <Icon size={32} strokeWidth={2} />
                </div>
                <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </div>
            {/* Info Tooltip */}
            <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 w-48 bg-gray-900 text-white text-xs p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center shadow-xl">
                Click to view <strong>{title}</strong> algorithm details
                {/* Little triangle pointer */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
            </div>
        </div>
    );

    const ConnectionLabel = ({ label, top, left }) => (
        <div
            className="absolute z-10 connector-label pointer-events-none whitespace-nowrap"
            style={{ top, left, transform: 'translate(-50%, -50%)' }}
        >
            {label}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-8 overflow-x-hidden relative">

            {/* Header */}
            <header className="max-w-7xl mx-auto flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/')}
                        className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition text-gray-600"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Architecture</h1>
                        <p className="text-sm text-gray-500 font-mono mt-1">v.2.5.0-production</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        SYSTEM ONLINE
                    </div>
                </div>
            </header>

            {/* Architecture Diagram Canvas */}
            <div className="max-w-7xl mx-auto relative min-h-[600px] flex items-center justify-center">

                {/* SVG Layer for Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
                        </marker>
                    </defs>

                    {/* Client -> API */}
                    <path d="M 250 300 L 450 300" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" className="animate-dash" />

                    {/* API -> DB */}
                    <path d="M 580 300 L 580 450" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />

                    {/* API -> AI */}
                    <path d="M 700 300 L 900 300" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" className="animate-dash" />
                </svg>

                {/* Connection Labels */}
                <ConnectionLabel label="HTTPS / JSON" top="50%" left="35%" />
                <ConnectionLabel label="SQL Query" top="62%" left="50%" />
                <ConnectionLabel label="gRPC / API" top="50%" left="72%" />

                <div className="grid grid-cols-3 gap-24 w-full h-full items-center">

                    {/* ZONE 1: CLIENT */}
                    <div className="arch-zone p-10 h-[500px] flex flex-col items-center justify-center relative">
                        <div className="zone-label">CLIENT ZONE</div>
                        <div className="space-y-8">
                            <ArchNode icon={Smartphone} title="Mobile App" sub="React Native / PWA" color="border-emerald-500" delay={0} />
                            <ArchNode icon={Laptop} title="Web Dashboard" sub="React + Vite" color="border-emerald-400" delay={200} />
                        </div>
                    </div>

                    {/* ZONE 2: INFRASTRUCTURE */}
                    <div className="arch-zone p-10 h-[500px] flex flex-col items-center justify-center relative bg-white/40">
                        <div className="zone-label">INFRASTRUCTURE (AWS/LOCAL)</div>

                        <div className="relative">
                            <ArchNode icon={Server} title="API Gateway" sub="Flask / Python" color="border-blue-500" delay={400} />
                        </div>

                        <div className="mt-20">
                            <ArchNode icon={Database} title="Data Store" sub="SQLite / PostgreSQL" color="border-amber-500" delay={600} />
                        </div>
                    </div>

                    {/* ZONE 3: EXTERNAL SERVICES */}
                    <div className="arch-zone p-10 h-[500px] flex flex-col items-center justify-center relative bg-indigo-50/50 border-indigo-200">
                        <div className="zone-label text-indigo-600 border-indigo-200">EXTERNAL CLOUD</div>
                        <div className="space-y-12">
                            <ArchNode icon={BrainCircuit} title="Gemini 2.5" sub="Multimodal Reasoning" color="border-indigo-500" delay={800} />
                            <ArchNode icon={Globe} title="Weather API" sub="Real-time Updates" color="border-sky-400" delay={900} />
                        </div>
                    </div>

                </div>

            </div>

            {/* Footer Legend */}
            <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <Code className="text-gray-400" />
                    <div>
                        <h5 className="font-bold text-gray-800">Frontend Logic</h5>
                        <p className="text-xs text-gray-500">React Components, Context API, Axios</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <ShieldCheck className="text-gray-400" />
                    <div>
                        <h5 className="font-bold text-gray-800">Security Layer</h5>
                        <p className="text-xs text-gray-500">JWT Auth, CORS Policy, Input Validation</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <Cloud className="text-gray-400" />
                    <div>
                        <h5 className="font-bold text-gray-800">Cloud Services</h5>
                        <p className="text-xs text-gray-500">Gemini Pro Vision, Speech-to-Text</p>
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL OVERLAY */}
            {selectedNode && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedNode(null)}></div>
                    <div className="relative w-full max-w-lg bg-white h-full shadow-2xl p-0 animate-slide-in-right flex flex-col">

                        {/* Modal Header */}
                        <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold">{selectedNode.title}</h3>
                                <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                                    <Cpu size={14} /> {selectedNode.specs.stack}
                                </p>
                            </div>
                            <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-white/10 rounded-full transition">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 flex-1 overflow-y-auto space-y-8">

                            {/* Role Section */}
                            <div>
                                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                                    <Terminal size={20} className="text-blue-600" /> Core Function
                                </h4>
                                <p className="text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    {selectedNode.specs.role}
                                </p>
                            </div>

                            {/* Processing Logic */}
                            <div>
                                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                                    <BrainCircuit size={20} className="text-emerald-600" /> Decision Logic
                                </h4>
                                <ul className="space-y-3">
                                    {selectedNode.specs.process.map((step, i) => (
                                        <li key={i} className="flex gap-3 text-sm text-gray-700">
                                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                                {i + 1}
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Code Snippet */}
                            <div>
                                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                                    <FileJson size={20} className="text-amber-600" /> Data Structure / Code
                                </h4>
                                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto shadow-inner border border-gray-700">
                                    <pre className="text-xs text-green-400 font-mono leading-relaxed">
                                        <code>{selectedNode.specs.codeSnippet}</code>
                                    </pre>
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Confidential System Architecture</p>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default SystemWorkflow;
