import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Send, Bot, User, Loader2, Mic } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Advisory = () => {
    const { t, currentLang } = useLanguage();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
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

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        const newHistory = [...messages, userMsg];

        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            // Send entire history for context
            const res = await axios.post('http://127.0.0.1:5000/api/advisory', {
                history: newHistory,
                language: currentLang
            }, { timeout: 60000 });

            if (res.data.success) {
                const botMsg = { role: 'model', content: res.data.data };
                setMessages(prev => [...prev, botMsg]);
            }
        } catch (err) {
            console.error("Chat Error", err);
            setMessages(prev => [...prev, { role: 'model', content: err.response?.data?.error || "Connection timed out. Please wait a moment and try again." }]);
        }
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
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

        recognition.onstart = () => setLoading(true); // Re-use loading state to show activity or add specific state

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev + (prev ? ' ' : '') + transcript);
        };

        recognition.onend = () => setLoading(false);
        recognition.onerror = (e) => {
            console.error(e);
            setLoading(false);
        };

        recognition.start();
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col animate-fade-in pb-4">
            <header className="mb-4 shrink-0">
                <h1 className="text-4xl font-bold text-gray-800">{t('title-advisory')}</h1>
                <p className="text-gray-500 mt-2">{t('trade-subtitle')}</p>
            </header>

            {/* CHAT AREA */}
            <div className="flex-1 glass-card p-4 overflow-y-auto mb-4 flex flex-col gap-4 bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'}`}>
                            {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>
                        <div className={`p-3 px-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                            ? 'bg-emerald-600 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-indigo-100 rounded-tl-none'
                            }`}>
                            {/* Simple rendering for now, can be upgraded to Markdown */}
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0"><Bot size={18} /></div>
                        <div className="p-3 px-4 rounded-2xl bg-gray-100 text-gray-500 text-xs italic flex items-center gap-2">
                            <Loader2 size={14} className="animate-spin" /> {t('adv-typing')}
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* INPUT AREA */}
            <div className="glass-card p-2 flex gap-2 items-center shrink-0 pr-24">
                <button
                    onClick={startListening}
                    disabled={loading}
                    className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all disabled:opacity-50"
                    title="Speak"
                >
                    <Mic size={20} />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 px-4"
                    placeholder={t('adv-chat-placeholder')}
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default Advisory;
