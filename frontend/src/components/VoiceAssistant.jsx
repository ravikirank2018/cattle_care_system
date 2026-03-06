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

    // Audio Recording
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

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

    const startListening = async () => {
        // Stop any existing speech
        window.speechSynthesis.cancel();

        setIsListening(true);
        setStatus("Listening... (Speak Clearly)");
        setTranscript('');
        transcriptRef.current = '';
        audioChunksRef.current = [];

        // 1. Audio Recording (For High Accuracy Backend)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start();
            mediaRecorderRef.current = mediaRecorder;
        } catch (err) {
            console.error("Mic Error:", err);
            setStatus("Mic Access Denied");
            setIsListening(false);
            return;
        }

        // 2. Web Speech API (For Visual Feedback Only)
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = currentLang;
            recognition.continuous = true;
            recognition.interimResults = true;

            const current = event.results[event.results.length - 1][0].transcript;
            setTranscript(current);
            transcriptRef.current = current; // Backup text
            // setStatus(`Heard: "${current}"...`); // Hiding live text as requested

            recognition.onerror = (e) => {
                console.warn("Speech API Error:", e.error);
                // Don't stop merely on speech error, rely on Audio Recorder
            };

            recognitionRef.current = recognition;
            recognition.start();
        }
    };

    const stopListening = () => {
        setIsListening(false);
        setStatus("Processing Audio...");

        // Stop Speech Recognition (Visual)
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        // Stop Audio Recorder & Send
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64Audio = reader.result;
                    processVoice(transcriptRef.current, base64Audio);
                };
            };
            mediaRecorderRef.current.stop();
            // Stop all tracks to release mic
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        } else {
            // Fallback if recorder failed but speech api worked
            processVoice(transcriptRef.current, null);
        }
    };

    const processVoice = async (text, audioBase64) => {
        if (!text && !audioBase64) {
            setStatus("No speech detected.");
            return;
        }

        try {
            setStatus("Analyzing...");
            // Call Flask Backend
            const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

            // Prefer Audio for accuracy, text as backup/hint
            const payload = {
                language: currentLang,
                transcript: text
            };

            if (audioBase64) {
                payload.audio = audioBase64; // Direct Gemini Audio Processing
            }

            const res = await axios.post(`${API_URL}/api/chat`, payload);

            const { intent, response_text } = res.data;
            setStatus(response_text);

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
            }
            setStatus(errMsg);
            speak("I had trouble connecting. Please try again.", 'en-US');
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
                await audio.play();
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

