import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Upload, CheckCircle, XCircle, ScanSearch, Camera, RefreshCw, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DiseaseDetection = () => {
    const { t, currentLang } = useLanguage();
    const [mode, setMode] = useState('upload'); // 'upload' or 'camera'
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // New Vitals State
    const [vitals, setVitals] = useState({
        age: '',
        weight: '',
        breed: 'gir',
        location: 'Karnataka',
        temperature: '',
        pregnancy: 'Unknown',
        waterIntake: '',
        milkYield: '',
        fever: false,
        foodIntake: false, // false = Normal, true = Reduced
        runningNose: false,
        breathingSound: false,
        history: ''
    });

    // ...



    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    // Webcam Refs
    const webcamRef = useRef(null);

    // Initial Camera Mode
    const handleCameraMode = () => {
        setMode('camera');
        setImage(null);
        setResult(null);
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setMode('upload');
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const runAnalysis = async () => {
        if (!image) return;

        setLoading(true);
        try {
            // Send to Backend Gemini Vision
            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
            const res = await axios.post(`${API_URL}/api/scan`, {
                image: image,
                language: currentLang,
                ...vitals,
                food_intake: vitals.foodIntake,
                running_nose: vitals.runningNose,
                breathing_sound: vitals.breathingSound,
                water_intake: vitals.waterIntake,
                milk_yield: vitals.milkYield
            });
            setResult(res.data);
        } catch (err) {
            console.error("Scan Error", err);
            setResult({
                status: 'Error',
                advice: 'Could not connect to AI server. Please check connection.'
            });
        }
        setLoading(false);
    };

    const reset = () => {
        setImage(null);
        setResult(null);
        if (mode === 'camera') setMode('camera'); // Keep camera open
    };

    const [skinCheckStep, setSkinCheckStep] = useState(0); // 0: Q1, 1: Q2, 2: Q3, 3: Result, -1: Completed
    const [skinCheckResult, setSkinCheckResult] = useState(null); // 'benign' or 'needs_scan'

    // ... existing functions ...

    const handleSkinCheckAnswer = (params) => {
        const { question, answer } = params;

        if (question === 'rash') {
            if (answer === 'yes') setSkinCheckStep(1); // Go to Q2
            else setSkinCheckStep(-1); // Skip to Scan
        } else if (question === 'birth') {
            if (answer === 'yes') setSkinCheckStep(2); // Go to Q3
            else {
                setSkinCheckResult('needs_scan');
                setSkinCheckStep(3); // Result
            }
        } else if (question === 'change') {
            if (answer === 'yes') {
                setSkinCheckResult('needs_scan');
                setSkinCheckStep(3);
            } else {
                setSkinCheckResult('benign');
                setSkinCheckStep(3);
            }
        }
    };

    const resetSkinCheck = () => {
        setSkinCheckStep(0);
        setSkinCheckResult(null);
        setResult(null);
        setImage(null);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{t('title-disease')}</h1>
                    <p className="text-gray-500 mt-2">AI-Powered Veterinary Dermatologist</p>
                </div>
                {skinCheckStep === -1 && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => { resetSkinCheck(); }}
                            className="px-4 py-2 rounded-xl text-sm font-bold bg-white text-gray-600 border hover:bg-gray-50 transition"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button
                            onClick={() => setMode('upload')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'upload' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-600 border'}`}
                        >
                            Upload Photo
                        </button>
                        <button
                            onClick={handleCameraMode}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'camera' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 border'}`}
                        >
                            <Camera size={16} /> Live Camera
                        </button>
                    </div>
                )}
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px]">
                {/* INPUT AREA */}
                <div className="glass-card flex flex-col items-center justify-center p-6 bg-white/40 overflow-hidden relative">

                    {/* SKIN PRE-CHECK QUESTIONNAIRE */}
                    {skinCheckStep >= 0 && (
                        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 animate-fade-in-up">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <ScanSearch className="text-emerald-600" /> {t('skin-check-title')}
                            </h3>

                            {skinCheckStep === 0 && (
                                <div className="space-y-6">
                                    <p className="text-lg font-medium text-gray-700">{t('q-skin-rash')}</p>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleSkinCheckAnswer({ question: 'rash', answer: 'yes' })} className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 border border-red-200 transition">
                                            {t('opt-yes')}
                                        </button>
                                        <button onClick={() => handleSkinCheckAnswer({ question: 'rash', answer: 'no' })} className="flex-1 py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 border border-emerald-200 transition">
                                            {t('opt-no')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {skinCheckStep === 1 && (
                                <div className="space-y-6 animate-fade-in">
                                    <p className="text-lg font-medium text-gray-700">{t('q-from-birth')}</p>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleSkinCheckAnswer({ question: 'birth', answer: 'yes' })} className="flex-1 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 border border-blue-200 transition">
                                            {t('opt-yes')}
                                        </button>
                                        <button onClick={() => handleSkinCheckAnswer({ question: 'birth', answer: 'no' })} className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 border border-red-200 transition">
                                            {t('opt-no')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {skinCheckStep === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    <p className="text-lg font-medium text-gray-700">{t('q-skin-change')}</p>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleSkinCheckAnswer({ question: 'change', answer: 'yes' })} className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 border border-red-200 transition">
                                            {t('opt-yes')}
                                        </button>
                                        <button onClick={() => handleSkinCheckAnswer({ question: 'change', answer: 'no' })} className="flex-1 py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl hover:bg-emerald-100 border border-emerald-200 transition">
                                            {t('opt-no')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {skinCheckStep === 3 && (
                                <div className="space-y-6 animate-fade-in text-center">
                                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${skinCheckResult === 'benign' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                        {skinCheckResult === 'benign' ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                                    </div>
                                    <p className="text-lg font-medium text-gray-800">
                                        {skinCheckResult === 'benign' ? t('msg-benign') : t('msg-consult')}
                                    </p>
                                    <button onClick={() => setSkinCheckStep(-1)} className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition">
                                        {skinCheckResult === 'benign' ? t('btn-continue') : t('btn-check-disease')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CAMERA VIEW */}
                    {skinCheckStep === -1 && mode === 'camera' && !image && (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 animate-fade-in">
                            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 border-2 border-white/30 rounded-2xl pointer-events-none"></div>
                                {/* Scanning Overlay */}
                                <div className="absolute inset-0 bg-scan-line pointer-events-none opacity-20"></div>
                            </div>
                            <button onClick={capture} className="btn-primary bg-blue-600 flex items-center gap-2 px-8 py-3 text-lg shadow-blue-500/30 shadow-lg">
                                <Camera size={24} /> {t('btn-capture')}
                            </button>
                            <p className="text-xs text-gray-500">{t('p-disease-guide')}</p>
                        </div>
                    )}

                    {/* UPLOAD VIEW */}
                    {skinCheckStep === -1 && mode === 'upload' && !image && (
                        <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl hover:border-emerald-400 transition-colors p-10 animate-fade-in">
                            <input type="file" id="img-upload" hidden onChange={handleUpload} accept="image/*" />
                            <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center gap-6 text-gray-400 hover:text-emerald-600 transition group">
                                <div className="p-6 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform"><Upload size={40} /></div>
                                <span className="text-xl font-medium">{t('upload-text')}</span>
                                <span className="text-sm text-gray-400 max-w-xs text-center">{t('upload-instruction')}</span>
                            </label>
                        </div>
                    )}

                    {/* PREVIEW & ACTIONS */}
                    {image && (
                        <div className="w-full space-y-6 text-center animate-fade-in">
                            <img src={image} className="h-64 mx-auto rounded-xl shadow-2xl object-cover ring-4 ring-white" />
                            <div className="flex justify-center gap-4">
                                {mode === 'camera' && (
                                    <button onClick={reset} className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition">
                                        {t('btn-retake')}
                                    </button>
                                )}
                                {mode === 'upload' && (
                                    <button onClick={() => setImage(null)} className="px-6 py-3 text-gray-500 font-bold hover:text-red-500 transition">
                                        Remove
                                    </button>
                                )}

                                <button onClick={runAnalysis} disabled={loading || result} className={`btn-primary flex items-center gap-2 px-8 ${loading ? 'opacity-80' : ''}`}>
                                    {loading ? t('lbl-analyzing') : <><ScanSearch size={20} /> Run AI Analysis</>}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* VITALS INPUT FORM */}
                <div className="glass-card p-6 bg-white/50">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">📝 {t('pred-enter-vitals')} & {t('lbl-history')}</h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-breed')}</label>
                            <select
                                value={vitals.breed}
                                onChange={(e) => setVitals({ ...vitals, breed: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                            >
                                <optgroup label={t('grp-desi')}>
                                    <option value="gir">Gir</option>
                                    <option value="sahiwal">Sahiwal</option>
                                    <option value="redsindhi">Red Sindhi</option>
                                    <option value="tharparkar">Tharparkar</option>
                                    <option value="murrah">Murrah (Buffalo)</option>
                                </optgroup>
                                <optgroup label="Exotic/Cross">
                                    <option value="jersey">Jersey</option>
                                    <option value="holstein">Holstein Friesian</option>
                                    <option value="hf_cross">HF Cross</option>
                                </optgroup>
                                <option value="unknown">Unknown / Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-location')}</label>
                            <select
                                value={vitals.location}
                                onChange={(e) => setVitals({ ...vitals, location: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                            >
                                {indianStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-age')}</label>
                            <input
                                type="number"
                                value={vitals.age}
                                onChange={(e) => setVitals({ ...vitals, age: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="e.g. 4"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-weight')}</label>
                            <input
                                type="number"
                                value={vitals.weight}
                                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="kg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-temperature')}</label>
                            <input
                                type="number"
                                value={vitals.temperature}
                                onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="°F"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-milk-yield')}</label>
                            <input
                                type="number"
                                value={vitals.milkYield}
                                onChange={(e) => setVitals({ ...vitals, milkYield: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                                placeholder="Liters"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('lbl-pregnancy')}</label>
                            <select
                                value={vitals.pregnancy}
                                onChange={(e) => setVitals({ ...vitals, pregnancy: e.target.value })}
                                className="mt-1 w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Unknown">{t('opt-select-status')}</option>
                                <option value="Not Pregnant">{t('opt-no')}</option>
                                <option value="Pregnant">{t('opt-yes')}</option>
                            </select>
                        </div>
                    </div>

                    {/* SYMPTOMS TOGGLES */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${vitals.fever ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200 hover:bg-emerald-50'}`}>
                            <input
                                type="checkbox"
                                checked={vitals.fever}
                                onChange={(e) => setVitals({ ...vitals, fever: e.target.checked })}
                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                            />
                            <span className="font-medium text-gray-700">🤒 {t('pred-temp') > 0 ? 'High Fever' : 'Fever?'}</span>
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${vitals.foodIntake ? 'bg-orange-50 border-orange-300' : 'bg-gray-50 border-gray-200 hover:bg-emerald-50'}`}>
                            <input
                                type="checkbox"
                                checked={vitals.foodIntake}
                                onChange={(e) => setVitals({ ...vitals, foodIntake: e.target.checked })}
                                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                            />
                            <span className="font-medium text-gray-700">📉 Low Appetite?</span>
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${vitals.runningNose ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200 hover:bg-emerald-50'}`}>
                            <input
                                type="checkbox"
                                checked={vitals.runningNose}
                                onChange={(e) => setVitals({ ...vitals, runningNose: e.target.checked })}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="font-medium text-gray-700">💧 {t('lbl-nose')}</span>
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${vitals.breathingSound ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200 hover:bg-emerald-50'}`}>
                            <input
                                type="checkbox"
                                checked={vitals.breathingSound}
                                onChange={(e) => setVitals({ ...vitals, breathingSound: e.target.checked })}
                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                            />
                            <span className="font-medium text-gray-700">🫁 {t('lbl-breath')}</span>
                        </label>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">{t('lbl-history')}</label>
                        <textarea
                            value={vitals.history}
                            onChange={(e) => setVitals({ ...vitals, history: e.target.value })}
                            className="mt-1 w-full p-2 border rounded-lg h-24"
                            placeholder="e.g. Previous infection in left leg..."
                        />
                    </div>
                </div>

                {/* RESULTS AREA */}
                <div className="glass-card p-8 flex items-center justify-center relative overflow-hidden bg-white/60 col-span-1 lg:col-span-2">
                    {loading && (
                        <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-6 relative">
                                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                                <ScanSearch size={32} className="absolute inset-0 m-auto text-emerald-600 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 animate-pulse">{t('lbl-analyzing')}</h3>
                            <p className="text-gray-500 mt-2">Connecting to Gemini Vision...</p>
                        </div>
                    )}

                    {result && !loading && (
                        <div className="text-center w-full animate-fade-in-up">
                            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ${result.status === 'Healthy' ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white' :
                                result.status === 'Critical' ? 'bg-gradient-to-br from-red-500 to-rose-700 text-white' :
                                    'bg-gradient-to-br from-amber-400 to-orange-600 text-white'
                                }`}>
                                {result.status === 'Healthy' ? <CheckCircle size={48} /> : result.status === 'Critical' ? <XCircle size={48} /> : <AlertTriangle size={48} />}
                            </div>

                            <h2 className="text-4xl font-bold text-gray-800 mb-2">{result.status}</h2>
                            <p className="text-gray-500 font-medium mb-6 uppercase tracking-wider text-sm">{result.confidence} Confidence</p>

                            {result.disease_name && result.disease_name !== 'None' && (
                                <div className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-6">
                                    Detected: {result.disease_name}
                                </div>
                            )}

                            {/* BASIS OF DIAGNOSIS */}
                            {result.basis_of_diagnosis && (
                                <div className="bg-blue-50 p-6 rounded-2xl text-left border border-blue-100 shadow-sm mb-4">
                                    <h3 className="font-bold text-xs text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <ScanSearch size={14} /> {t('lbl-diagnosis-basis')}
                                    </h3>
                                    <p className="text-gray-800 text-md leading-relaxed whitespace-pre-wrap">
                                        {result.basis_of_diagnosis}
                                    </p>
                                </div>
                            )}

                            <div className="bg-white/80 p-6 rounded-2xl text-left border border-white shadow-sm">
                                <h3 className="font-bold text-xs text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <ScanSearch size={14} /> AI Recommendation
                                </h3>
                                <p className="text-gray-800 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                                    {result.advice}
                                </p>
                            </div>
                        </div>
                    )}

                    {!image && !loading && !result && (
                        <div className="text-center text-gray-400">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100/50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                                <ScanSearch size={48} className="opacity-20" />
                            </div>
                            <p className="font-medium text-lg text-gray-500">Ready to Scan</p>
                            {skinCheckStep < 0 ? (
                                <p className="text-sm mt-1">Upload a photo to start AI Analysis</p>
                            ) : (
                                <p className="text-sm mt-1">Complete the pre-check to enable scanning</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default DiseaseDetection;
