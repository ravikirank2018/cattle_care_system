// Mobile API Service
// connects to the Faclask Backend
// NOTE: "10.0.2.2" is the special alias for "localhost" on Android Emulator.
// If testing on a Physical Device, replace this with your computer's LAN IP (e.g., 192.168.1.15)

const API_Base = 'http://10.87.177.241:5000/api';
// const API_Base = 'http://10.0.2.2:5000/api'; // Android Emulator Alias

const GEMINI_API_KEY = "AIzaSyBAxW_csgPuwKvPQ0OywEHxyxQAkpP_ZGg";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export const getDashboardData = async () => {
    try {
        console.log(`Fetching from ${API_Base}/dashboard...`);
        const response = await fetch(`${API_Base}/dashboard`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error", error);
        return null;
    }
};

const callGemini = async (contents) => {
    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
            })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
};

export const postVoice = async (transcript, audio = null, language = 'en-US') => {
    // Note: Direct audio processing requires specific formats. For simplicity in this "direct" migration,
    // we will prioritize text (transcript) if available, or basic audio if supported.
    // For robust audio, we'd typically use a dedicated speech-to-text service or ensure the audio format matches Gemini's expectations (wav/mp3/aiff/aac).

    let userPrompt = transcript;
    if (!userPrompt && audio) {
        // If we only have audio, we can try sending it to Gemini if it's a supported format (e.g. from Expo Audio).
        // However, mixing text and audio in one turn is powerful.
        // For now, let's assume transcript is the primary driver or we send a generic prompt with audio.
        userPrompt = "Please listen to this audio and respond.";
    }

    const sysPrompt = `You are a helpful Cattle Care Assistant. Respond concisely in ${language}.`;

    const parts = [{ text: sysPrompt + "\nUser says: " + (transcript || "") }];
    if (audio) {
        parts.push({
            inlineData: {
                mimeType: "audio/mp3", // Assuming MP3 or compatible format from client
                data: audio
            }
        });
    }

    const responseText = await callGemini([{ role: 'user', parts }]);
    return { response_text: responseText || "Sorry, I couldn't process that." };
};

export const postScan = async (base64Image, language = 'en-US') => {
    const prompt = `You are an expert veterinarian AI. Analyze this image of cattle. 
    Identify any potential diseases or health issues. 
    Format response as JSON with keys: "status" (Healthy/Issue), "disease_name", "advice".
    Respond in ${language}. 
    Only return the JSON.`;

    const parts = [
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
    ];

    const responseText = await callGemini([{ role: 'user', parts }]);

    try {
        // Clean markdown backticks if present
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (e) {
        console.error("JSON Parse Error", e);
        return {
            status: "Issue",
            disease_name: "Error parsing AI response",
            advice: responseText
        };
    }
};

export const postAdvisory = async (history, language = 'en-US') => {
    // Convert history format to Gemini format if needed, or just append new message.
    // History coming in is [{ role: 'user', content: '...' }, ...]

    const geminiHistory = history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    // Add system instruction as the first user message or modify the last one
    const systemInstruction = `You are an expert cattle farming advisor. Answer questions accurately in ${language}. Keep answers concise.`;

    // Prepend system instruction to the first message or added as context
    if (geminiHistory.length > 0 && geminiHistory[0].role === 'user') {
        geminiHistory[0].parts[0].text = systemInstruction + "\n" + geminiHistory[0].parts[0].text;
    } else {
        geminiHistory.unshift({ role: 'user', parts: [{ text: systemInstruction }] });
        // If history started with model, we need user first.
    }

    const responseText = await callGemini(geminiHistory);
    return { success: true, data: responseText };
};
