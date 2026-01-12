import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VoiceAssistant = ({ currentLang, onNavigate }) => {
    const [isListening, setIsListening] = useState(false);
    const [status, setStatus] = useState(null);
    const { t } = useLanguage();

    // Reset status when language changes
    useEffect(() => {
        setStatus(null);
    }, [currentLang]);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Browser not supported. Use Chrome.");
            return;
        }

        // Stop any existing speech
        window.speechSynthesis.cancel();

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = currentLang;
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            setStatus("Thinking... (Listening)");
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (e) => {
            setIsListening(false);
            setStatus("Error: " + e.error);
        };

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            setStatus(`heard: "${transcript}"`);
            await processVoice(transcript);
        };

        recognition.start();
    };

    const processVoice = async (transcript) => {
        try {
            // Call Flask Backend
            const res = await axios.post('http://127.0.0.1:5000/api/chat', {
                transcript: transcript,
                language: currentLang
            });

            const { intent, response_text } = res.data;
            setStatus(response_text); // Show response text

            // TTS
            speak(response_text, currentLang);

            // Execute Action
            if (intent === 'DASHBOARD') onNavigate('/');
            if (intent === 'PRICE') onNavigate('/trade');
            if (intent === 'DISEASE') onNavigate('/disease');
            if (intent === 'ADVISORY') onNavigate('/advisory');

        } catch (err) {
            console.error(err);
            let errMsg = "Connection Failed";
            if (err.response) {
                errMsg = `Server Error (${err.response.status})`;
            } else if (err.request) {
                errMsg = "Network Error (Is Backend Running?)";
            }
            setStatus(errMsg);
            speak("I cannot reach the server. Please check if Python is running.", 'en-US');
        }
    };

    const speak = (text, lang) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;

        const voices = window.speechSynthesis.getVoices();
        // Prioritize Google voices for best quality
        const voice = voices.find(v => v.lang === lang && v.name.includes('Google'))
            || voices.find(v => v.lang === lang);
        if (voice) utterance.voice = voice;

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="orb-container">
            {status && (
                <div className="voice-status animate-fade-in-up">
                    {status}
                </div>
            )}

            <button
                onClick={startListening}
                className={`voice-orb ${isListening ? 'listening' : ''}`}
            >
                {isListening ? <MicOff color="white" size={32} /> : <Mic color="white" size={32} />}
            </button>
        </div>
    );
};

export default VoiceAssistant;
