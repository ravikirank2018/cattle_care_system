import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Send, Bot, User, Loader2, Mic } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Advisory = () => {
    const { t, currentLang } = useLanguage();
    const [advisoryType, setAdvisoryType] = useState('general'); // 'general' or 'nutrition'
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    // Initial Welcome Message
    useEffect(() => {
        setMessages([{
            role: 'model',
            content: t('adv-welcome-msg')
        }]);
    }, [currentLang, t]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const speakResponse = (text) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop previous
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLang;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { role: 'user', content: text };
        const newHistory = [...messages, userMsg];

        setMessages(newHistory);
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
            const res = await axios.post(`${API_URL}/api/advisory`, {
                history: newHistory,
                language: currentLang,
                type: advisoryType
            }, { timeout: 60000 });

            if (res.data.success) {
                const botReply = res.data.data;
                const botMsg = { role: 'model', content: botReply };
                setMessages(prev => [...prev, botMsg]);
                speakResponse(botReply);
            }
        } catch (err) {
            console.error("Chat Error", err);
            const errorMsg = "Connection timed out. Please try again.";
            setMessages(prev => [...prev, { role: 'model', content: errorMsg }]);
            speakResponse(errorMsg);
        }
        setLoading(false);
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Browser not supported. Use Chrome or Edge.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = currentLang;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleSend(transcript);
        };

        recognition.onend = () => setIsListening(false);
        recognition.onerror = (e) => {
            console.error(e);
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col animate-fade-in pb-4">
            <header className="mb-4 shrink-0">
                <h1 className="text-4xl font-bold text-gray-800">{t('title-advisory')}</h1>
                {/* TABS */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => setAdvisoryType('general')}
                        className={`flex-1 py-3 rounded-2xl font-bold transition-all ${advisoryType === 'general' ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 border hover:bg-indigo-50'}`}
                    >
                        🩺 {t('adv-tab-general')}
                    </button>
                    <button
                        onClick={() => setAdvisoryType('nutrition')}
                        className={`flex-1 py-3 rounded-2xl font-bold transition-all ${advisoryType === 'nutrition' ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 border hover:bg-emerald-50'}`}
                    >
                        🥗 {t('adv-tab-nutrition')}
                    </button>
                </div>
            </header>

            {/* CHAT AREA */}
            <div className={`flex-1 glass-card p-4 overflow-y-auto mb-4 flex flex-col gap-4 bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl transition-all duration-500 ${isSpeaking ? 'bg-indigo-50/80 ring-2 ring-indigo-200' : ''}`}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-gray-800 text-white' : advisoryType === 'nutrition' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'}`}>
                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`p-4 rounded-3xl max-w-[85%] text-base leading-relaxed shadow-sm ${msg.role === 'user'
                            ? 'bg-gray-800 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none font-medium'
                            }`}>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="flex flex-col items-center gap-3 animate-pulse">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <Loader2 size={24} className="animate-spin" />
                            </div>
                            <span className="text-gray-500 font-medium">{t('adv-processing')}</span>
                        </div>
                    </div>
                )}

                {isSpeaking && !loading && (
                    <div className="flex justify-center py-4 sticky bottom-0">
                        <div className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-3 animate-bounce">
                            <Mic size={16} /> {t('adv-replying')}
                        </div>
                    </div>
                )}

                <div ref={scrollRef} />
            </div>

            {/* VOICE INTERACTION AREA */}
            <div className="shrink-0 flex justify-center pb-8 pt-4">
                <button
                    onClick={startListening}
                    disabled={loading || isSpeaking}
                    className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl relative group ${isListening
                        ? 'bg-red-500 ring-8 ring-red-100 scale-110 animate-pulse'
                        : loading
                            ? 'bg-gray-200 cursor-not-allowed'
                            : advisoryType === 'nutrition'
                                ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 hover:scale-110 hover:shadow-emerald-500/40 hover:rotate-3'
                                : 'bg-gradient-to-br from-indigo-500 to-indigo-700 hover:scale-110 hover:shadow-indigo-500/40 hover:-rotate-3'
                        }`}
                >
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Mic size={44} className="text-white mb-2 drop-shadow-md" />
                    {isListening && <span className="text-[10px] font-black text-white uppercase tracking-widest animate-pulse">Listening</span>}
                </button>
            </div>
            <p className="text-center text-gray-400 text-sm font-medium animate-pulse">{isListening ? 'Listening...' : t('adv-speak-now')}</p>
        </div>
    );
};

export default Advisory;
