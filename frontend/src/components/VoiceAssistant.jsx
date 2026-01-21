import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Mic, MicOff, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VoiceAssistant = ({ currentLang, onNavigate }) => {
    const [isListening, setIsListening] = useState(false);
    const [status, setStatus] = useState(null);
    const [transcript, setTranscript] = useState('');
    const transcriptRef = useRef('');
    const recognitionRef = useRef(null);
    const { t } = useLanguage();

    // Reset status when language changes
    useEffect(() => {
        setStatus(null);
        setTranscript('');
        transcriptRef.current = '';
    }, [currentLang]);

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Browser not supported. Use Chrome.");
            return;
        }

        // Stop any existing speech
        window.speechSynthesis.cancel();

        setIsListening(true);
        setStatus("Listening... (Tap to Stop & Send)");
        setTranscript('');
        transcriptRef.current = '';

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = currentLang;
        recognition.continuous = true; // Keep listening until user stops
        recognition.interimResults = true; // Show results in real-time

        recognition.onstart = () => {
            console.log("Voice started");
        };

        recognition.onend = () => {
            console.log("Voice stopped naturally");
            if (isListening) {
                // If it stopped but we think we are listening (e.g. timeout), restart or just update state
                // But normally with continuous=true it goes on for a while.
                // We'll just update state if we haven't manually stopped.
                setIsListening(false);
            }
        };

        recognition.onerror = (e) => {
            console.error(e);
            setIsListening(false);
            setStatus("Error: " + e.error);
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            // We can also use interim results for visual feedback
            const current = event.results[event.results.length - 1][0].transcript;
            setTranscript(current);
            transcriptRef.current = current;
            setStatus(`Heard: "${current}"`);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);

            // Process captured transcript
            setStatus("Processing...");
            if (transcriptRef.current) {
                processVoice(transcriptRef.current);
            } else {
                setStatus("No speech detected.");
            }
        }
    };

    const processVoice = async (text) => {
        if (!text) return;

        try {
            // Call Flask Backend
            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
            const res = await axios.post(`${API_URL}/api/chat`, {
                transcript: text,
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

    const speak = async (text, lang) => {
        try {
            window.speechSynthesis.cancel();
            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
            const res = await axios.post(`${API_URL}/api/tts`, {
                text: text,
                language: lang
            });

            if (res.data.success && res.data.audio) {
                const audio = new Audio(res.data.audio);
                audio.play();
            } else {
                throw new Error("TTS failed");
            }
        } catch (err) {
            console.error("Backend TTS failed, falling back to browser synthesis:", err);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 1.0; // Slightly faster default
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="orb-container">
            {status && (
                <div className="voice-status animate-fade-in-up">
                    {status}
                </div>
            )}

            <button
                onClick={toggleListening}
                className={`voice-orb ${isListening ? 'listening' : ''}`}
                style={{ backgroundColor: isListening ? '#EF4444' : '' }} // Red when recording
            >
                {isListening ? <MicOff color="white" size={32} /> : <Mic color="white" size={32} />}
            </button>

            {isListening && <p className="text-white mt-2 text-xs font-medium">Tap to Stop & Send</p>}
        </div>
    );
};

export default VoiceAssistant;

