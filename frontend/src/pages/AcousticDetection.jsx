import React, { useState, useRef } from 'react';
import { Mic, Volume2, Activity, AlertTriangle, CheckCircle2, UploadCloud, Loader2, StopCircle, RefreshCw, FileAudio } from 'lucide-react';
import axios from 'axios';

const AcousticDetection = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Base URL for API
    const API_BASE_URL = 'http://localhost:5000/api';

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                audioChunksRef.current = [];
                // Automatically send to analysis when stopped
                analyzeAudio(blob);
            };

            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setResult(null);
            setError(null);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("Microphone access denied or unavailable.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioBlob(file);
            setAudioUrl(URL.createObjectURL(file));
            setResult(null);
            setError(null);
            analyzeAudio(file);
        }
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const analyzeAudio = async (blobToAnalyze) => {
        if (!blobToAnalyze) return;
        
        setIsAnalyzing(true);
        setError(null);
        setResult(null);
        
        try {
            const base64Audio = await blobToBase64(blobToAnalyze);
            
            const response = await axios.post(`${API_BASE_URL}/analyze_audio`, {
                audio: base64Audio
            });
            
            setResult(response.data);
        } catch (err) {
            console.error("Analysis Error:", err);
            setError(err.response?.data?.error || "Failed to analyze audio. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetState = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        setResult(null);
        setError(null);
    };

    const getStatusColors = (status) => {
        switch (status) {
            case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'Warning': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Normal': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Critical': return <AlertTriangle className="w-8 h-8 text-red-600" />;
            case 'Warning': return <AlertTriangle className="w-8 h-8 text-amber-600" />;
            case 'Normal': return <CheckCircle2 className="w-8 h-8 text-emerald-600" />;
            default: return <Activity className="w-8 h-8 text-slate-600" />;
        }
    };

    return (
        <div className="w-full animation-fade-in relative z-10 pb-16 min-h-[85vh]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-200/20 rounded-full blur-[80px] -z-10 mix-blend-multiply"></div>

            {/* Header Section */}
            <div className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Acoustic Event Detection</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Audio <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Surveillance</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium max-w-xl">
                        Upload or record cow sounds. AI will analyze the acoustic events to detect signs of pain, heat stress, or distress.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                
                {/* Left Panel - Input */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 p-8 rounded-3xl shadow-xl shadow-slate-200/40 flex flex-col items-center justify-center relative overflow-hidden h-[500px]">
                    
                    {/* Visualizer BG during recording */}
                    {isRecording && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <div className="w-48 h-48 bg-amber-500 rounded-full animate-ping"></div>
                        </div>
                    )}

                    {!audioUrl ? (
                        <div className="flex flex-col items-center w-full z-10 gap-8">
                            
                            {/* Record Button */}
                            <div className="flex flex-col items-center gap-4">
                                <button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className={`relative flex items-center justify-center w-32 h-32 rounded-full transition-all duration-300 shadow-xl ${
                                        isRecording 
                                            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30 animate-pulse' 
                                            : 'bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-105 hover:shadow-orange-500/30'
                                    }`}
                                >
                                    {isRecording ? (
                                        <StopCircle className="w-12 h-12 text-white" />
                                    ) : (
                                        <Mic className="w-12 h-12 text-white" />
                                    )}
                                </button>
                                <div className="text-center">
                                    <p className="text-lg font-bold text-slate-800">
                                        {isRecording ? 'Recording...' : 'Tap to Record Cow Sound'}
                                    </p>
                                    {isRecording && <p className="text-sm text-red-500 font-medium">Click to stop and analyze</p>}
                                </div>
                            </div>

                            <div className="flex items-center w-full max-w-sm">
                                <hr className="flex-1 border-slate-200" />
                                <span className="px-3 text-slate-400 font-medium text-sm text-center">OR</span>
                                <hr className="flex-1 border-slate-200" />
                            </div>

                            {/* Upload Button */}
                            <label className="flex flex-col items-center justify-center w-full max-w-sm h-32 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-amber-400 transition-colors cursor-pointer group">
                                <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-amber-500 mb-2 transition-colors" />
                                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">Upload Audio File</span>
                                <span className="text-xs text-slate-400 mt-1">MP3, WAV, OGG (Max 5MB)</span>
                                <input type="file" className="hidden" accept="audio/*" onChange={handleFileUpload} />
                            </label>

                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full z-10 gap-6">
                            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2 shadow-inner">
                                <FileAudio className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Audio Captured</h3>
                            
                            <audio controls src={audioUrl} className="w-full max-w-sm rounded-full shadow-md bg-slate-50 border border-slate-200" />
                            
                            <button 
                                onClick={resetState}
                                className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-2 transition-colors border border-slate-200 shadow-sm"
                            >
                                <RefreshCw className="w-4 h-4" /> Try another
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Panel - Results */}
                <div className="bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/40 p-8 h-[500px] overflow-y-auto flex flex-col relative">
                    
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex gap-3 text-sm font-medium mb-4 shadow-sm animate-pulse-fade">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {!isAnalyzing && !result && !error && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4 opacity-60">
                            <Activity className="w-16 h-16" />
                            <p className="font-semibold text-lg text-center max-w-xs leading-relaxed">System ready for acoustic analysis. Upload or record audio to begin.</p>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="flex flex-col items-center justify-center h-full text-amber-500 gap-6">
                            <div className="relative">
                                <Loader2 className="w-16 h-16 animate-spin" />
                                <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-20 filter blur-xl"></div>
                            </div>
                            <p className="font-bold text-xl text-slate-700 animate-pulse">Analyzing Acoustic Patterns...</p>
                            <p className="text-slate-500 text-sm font-medium">Extracting features via Gemini 2.5 Flash...</p>
                        </div>
                    )}

                    {result && !isAnalyzing && (
                        <div className="flex flex-col h-full animation-fade-in relative z-10">
                            
                            {/* Analysis Header */}
                            <div className={`p-6 rounded-2xl border ${getStatusColors(result.status)} flex items-start gap-5 mb-6 shadow-sm`}>
                                <div className="bg-white/50 p-3 rounded-2xl shadow-sm backdrop-blur-sm">
                                    {getStatusIcon(result.status)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-2xl font-black uppercase tracking-wide">{result.status}</h3>
                                        <span className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">{result.confidence} Confidence</span>
                                    </div>
                                    <p className="font-medium opacity-90 text-lg">{result.detected_event}</p>
                                </div>
                            </div>

                            {/* Detailed AI Output */}
                            <div className="flex-1 flex flex-col gap-6">
                                
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-full blur-[40px] -z-10 group-hover:scale-110 transition-transform"></div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Activity className="w-5 h-5 text-sky-500" />
                                        <h4 className="font-bold text-slate-800 tracking-wide">AI Analysis</h4>
                                    </div>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        {result.ai_suggestion}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-[40px] -z-10 group-hover:scale-110 transition-transform"></div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        <h4 className="font-bold text-slate-800 tracking-wide">Recommended Action</h4>
                                    </div>
                                    <p className="text-emerald-700 font-bold bg-emerald-100/50 p-4 rounded-xl border border-emerald-200/50 shadow-inner">
                                        {result.recommended_action}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcousticDetection;
