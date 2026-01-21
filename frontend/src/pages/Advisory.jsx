import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Send, Bot, User, Loader2, Mic, GraduationCap, MessageSquareText, Wheat } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

    const speakResponse = async (text) => {
        try {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel(); // Stop previous

            setIsSpeaking(true);
            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
            const res = await axios.post(`${API_URL}/api/tts`, {
                text: text,
                language: currentLang
            });

            if (res.data.success && res.data.audio) {
                const audio = new Audio(res.data.audio);
                audio.onended = () => setIsSpeaking(false);
                audio.play();
            } else {
                throw new Error("Backend TTS failed");
            }
        } catch (err) {
            console.error("Backend TTS failed, falling back to browser synthesis:", err);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLang;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
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

                // Strip markdown table and limit text for MUCH faster TTS
                const speechSafeText = botReply
                    .replace(/\|(.+?)\|/g, '') // Remove tables
                    .replace(/[-]{3,}/g, '')  // Remove dash dividers
                    .split('\n')[0]; // Just speak the first paragraph/line for speed

                speakResponse(speechSafeText);
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
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-4 bg-[#253D2E] text-[#B6E63E] rounded-2xl shadow-[6px_6px_0px_#B6E63E] border border-[#2a4d3a]">
                        <GraduationCap size={36} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-[#253D2E] tracking-tight">{t('title-advisory')}</h1>
                        <p className="text-[#4A6741] font-medium">{t('srv-advisory-desc')}</p>
                    </div>
                </div>
                {/* TABS */}
                <div className="flex gap-4 mt-2">
                    <button
                        onClick={() => setAdvisoryType('general')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${advisoryType === 'general' ? 'bg-[#253D2E] text-[#B6E63E] shadow-lg scale-105 ring-2 ring-[#B6E63E]' : 'bg-white text-gray-500 border border-gray-100 hover:bg-[#F4F7F4]'}`}
                    >
                        <MessageSquareText size={20} /> {t('adv-tab-general')}
                    </button>
                    <button
                        onClick={() => setAdvisoryType('nutrition')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${advisoryType === 'nutrition' ? 'bg-[#4A6741] text-white shadow-lg scale-105 ring-2 ring-[#B6E63E]' : 'bg-white text-gray-500 border hover:bg-[#F4F7F4]'}`}
                    >
                        <Wheat size={20} /> {t('adv-tab-nutrition')}
                    </button>
                </div>
            </header>

            {/* CHAT AREA */}
            <div className={`flex-1 glass-card p-4 overflow-y-auto mb-4 flex flex-col gap-4 bg-white/50 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl transition-all duration-500 ${isSpeaking ? 'bg-[#B6E63E]/10 ring-2 ring-[#B6E63E]' : ''}`}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-[#253D2E] text-[#B6E63E]' : 'bg-[#4A6741] text-white'}`}>
                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`p-4 rounded-3xl max-w-[85%] text-base leading-relaxed shadow-sm ${msg.role === 'user'
                            ? 'bg-[#253D2E] text-white rounded-tr-none'
                            : 'bg-white text-[#253D2E] border border-[#B6E63E]/30 rounded-tl-none font-medium'
                            }`}>
                            <div className="markdown-content prose-sm">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-center py-8">
                        <div className="flex flex-col items-center gap-3 animate-pulse">
                            <div className="w-12 h-12 rounded-full bg-[#253D2E]/10 flex items-center justify-center text-[#253D2E]">
                                <Loader2 size={24} className="animate-spin" />
                            </div>
                            <span className="text-[#4A6741] font-bold">{t('adv-processing')}</span>
                        </div>
                    </div>
                )}

                {isSpeaking && !loading && (
                    <div className="flex justify-center py-4 sticky bottom-0">
                        <div className="bg-[#B6E63E] text-[#253D2E] px-6 py-2 rounded-full shadow-lg flex items-center gap-3 animate-bounce font-bold border border-[#253D2E]">
                            <Mic size={18} /> {t('adv-replying')}
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
                                ? 'bg-[#4A6741] hover:scale-110 hover:shadow-lg hover:rotate-3 border-4 border-[#B6E63E]'
                                : 'bg-[#253D2E] hover:scale-110 hover:shadow-lg hover:-rotate-3 border-4 border-[#B6E63E]'
                        }`}
                >
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <Mic size={44} className="text-[#B6E63E] mb-2 drop-shadow-md" />
                    {isListening && <span className="text-[10px] font-black text-white uppercase tracking-widest animate-pulse">Listening</span>}
                </button>
            </div>
            <p className="text-center text-[#4A6741] text-sm font-bold animate-pulse">{isListening ? 'Listening...' : t('adv-speak-now')}</p>
        </div>
    );
};

export default Advisory;

