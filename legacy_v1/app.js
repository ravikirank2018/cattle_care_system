// App State & Data
const state = {
    currentView: 'dashboard',
    voiceActive: false,
    currentLang: 'en-US',
    chartInstance: null,
    isSpeaking: false,
    conversationMode: true,
    apiKey: 'AIzaSyDMbfdLh9SnuZ7ZXmyc9OmifgpvMU1L73o' // User Provided Key
};

// --- TRANSLATIONS (UI Only - Gemini handles spoken) ---
const translations = {
    'en-US': { 'logo': 'CattleCare AI', 'nav-dashboard': 'Dashboard', 'nav-disease': 'Disease Detection', 'nav-trade': 'Smart Trade', 'nav-advisory': 'Advisory', 'voice-btn': 'AI Assistant', 'title-dashboard': 'Farm Dashboard', 'title-disease': 'AI Disease Scanner', 'title-trade': 'Fair Price Calculator', 'title-advisory': 'Smart Advisory', 'lbl-weight': 'Weight (kg)', 'lbl-age': 'Age (months)', 'lbl-breed': 'Breed', 'lbl-milk': 'Milk Yield (Liters/day)', 'lbl-preg': 'Pregnancy (Months)', 'lbl-vac': 'Vaccinated?', 'lbl-region': 'Region (For AI History)', 'btn-calc': 'Calculate Fair Price & AI Trend', 'lbl-type': 'Cattle Type', 'lbl-goal': 'Goal', 'btn-advice': 'Get Advice', 'upload-text': 'Click/Drop Image to Scan', 'voice-listening': 'I am listening...', 'voice-set': 'Language Active', 'opt-jersey': 'Jersey', 'opt-holstein': 'Holstein', 'opt-gir': 'Gir (Indian)', 'opt-sahiwal': 'Sahiwal (Indian)', 'opt-redsindhi': 'Red Sindhi', 'opt-tharparkar': 'Tharparkar', 'opt-yes': 'Yes', 'opt-no': 'No', 'opt-north': 'North India', 'opt-south': 'South India', 'opt-east': 'East India', 'opt-west': 'West India', 'opt-lactating': 'Lactating Cow', 'opt-calf': 'Calf', 'opt-bull': 'Bull', 'opt-milk': 'Increase Milk', 'opt-weight': 'Gain Weight', 'opt-health': 'General Health' },
    'hi-IN': { 'logo': 'कैटल केयर एआई', 'nav-dashboard': 'डैशबोर्ड', 'nav-disease': 'बीमारी स्कैन (AI)', 'nav-trade': 'उचित मूल्य (AI)', 'nav-advisory': 'सलाह', 'voice-btn': 'एआई सहायक', 'title-dashboard': 'फार्म डैशबोर्ड', 'title-disease': 'एआई बीमारी स्कैनर', 'title-trade': 'उचित मूल्य कैलकुलेटर', 'title-advisory': 'स्मार्ट सलाह', 'lbl-weight': 'वजन (किग्रा)', 'lbl-age': 'उम्र (महीने)', 'lbl-breed': 'नस्ल', 'lbl-milk': 'दूध (लीटर/दिन)', 'lbl-preg': 'गर्भावस्था (महीने)', 'lbl-vac': 'टीकाकरण?', 'lbl-region': 'क्षेत्र', 'btn-calc': 'एआई द्वारा कीमत जानें', 'lbl-type': 'पशु का प्रकार', 'lbl-goal': 'लक्ष्य', 'btn-advice': 'सलाह लें', 'upload-text': 'स्कैन करने के लिए फोटो डालें', 'voice-listening': 'मैं सुन रहा हूँ...', 'voice-set': 'भाषा सक्रिय', 'opt-jersey': 'जर्सी', 'opt-holstein': 'होल्स्टीन', 'opt-gir': 'गिर (भारतीय)', 'opt-sahiwal': 'साहिवाल (भारतीय)', 'opt-redsindhi': 'लाल सिंधी', 'opt-tharparkar': 'थारपारकर', 'opt-yes': 'हाँ', 'opt-no': 'नहीं', 'opt-north': 'उत्तर भारत', 'opt-south': 'दक्षिण भारत', 'opt-east': 'पूर्व भारत', 'opt-west': 'पश्चिम भारत', 'opt-lactating': 'दुधारू गाय', 'opt-calf': 'बछड़ा', 'opt-bull': 'सांड', 'opt-milk': 'दूध बढ़ाएं', 'opt-weight': 'वजन बढ़ाएं', 'opt-health': 'सामान्य स्वास्थ्य' },
    'te-IN': { 'logo': 'కాటిల్ కేర్ AI', 'nav-dashboard': 'డాష్‌బోర్డ్', 'nav-disease': 'వ్యాధి స్కానర్', 'nav-trade': 'న్యాయమైన ధర', 'nav-advisory': 'సలహా', 'voice-btn': 'AI అసిస్టెంట్', 'title-dashboard': 'ఫార్మ్ డాష్‌బోర్డ్', 'title-disease': 'AI వ్యాధి స్కానర్', 'title-trade': 'ధర నిర్ణయించు', 'title-advisory': 'రైతు సలహా', 'lbl-weight': 'బరువు (kg)', 'lbl-age': 'వయస్సు (నెలలు)', 'lbl-breed': 'జాతి', 'lbl-milk': 'పాలు (లీటర్లు)', 'lbl-preg': 'గర్భం (నెలలు)', 'lbl-vac': 'టీకా వేసారా?', 'lbl-region': 'ప్రాంతం', 'btn-calc': 'ధర లెక్కించు', 'lbl-type': 'పశువు రకం', 'lbl-goal': 'లక్ష్యం', 'btn-advice': 'సలహా తీసుకోండి', 'upload-text': 'ఫోటో అప్‌లోడ్ చేయండి', 'voice-listening': 'వింటున్నాను...', 'voice-set': 'భాష మార్చబడింది', 'opt-jersey': 'జెర్సీ', 'opt-holstein': 'హోల్స్టీన్', 'opt-gir': 'గిర్ (భారతీయ)', 'opt-sahiwal': 'సాహివాల్ (భారతీయ)', 'opt-redsindhi': 'రెడ్ సింధి', 'opt-tharparkar': 'థార్పార్కర్', 'opt-yes': 'అవును', 'opt-no': 'కాదు', 'opt-north': 'ఉత్తర భారతదేశం', 'opt-south': 'దక్షిణ భారతదేశం', 'opt-east': 'తూర్పు భారతదేశం', 'opt-west': 'పశ్చిమ భారతదేశం', 'opt-lactating': 'పాడి ఆవు', 'opt-calf': 'దూడ', 'opt-bull': 'ఎద్దు', 'opt-milk': 'పాలు పెంచండి', 'opt-weight': 'బరువు పెంచండి', 'opt-health': 'సాధారణ ఆరోగ్యం' },
    'ta-IN': { 'logo': 'கால்நடை பராமரிப்பு AI', 'nav-dashboard': 'டாஷ்போர்டு', 'nav-disease': 'நோய் ஸ்கேனர்', 'nav-trade': 'விலை மதிப்பீடு', 'nav-advisory': 'ஆலோசனை', 'voice-btn': 'AI உதவியாளர்', 'title-dashboard': 'டாஷ்போர்டு', 'title-disease': 'AI நோய் ஸ்கேனர்', 'title-trade': 'ஸ்மார்ட் விலை', 'title-advisory': 'விவசாயி ஆலோசனை', 'lbl-weight': 'எடை (கிலோ)', 'lbl-age': 'வயது (மாதங்கள்)', 'lbl-breed': 'இனம்', 'lbl-milk': 'பால் (லிட்டர்)', 'lbl-preg': 'கர்ப்பம் (மாதங்கள்)', 'lbl-vac': 'தடுப்பூசி?', 'lbl-region': 'பகுதி', 'btn-calc': 'விலையை கணக்கிடு', 'lbl-type': 'வகை', 'lbl-goal': 'குறிக்கோள்', 'btn-advice': 'ஆலோசனை பெறு', 'upload-text': 'படத்தை பதிவேற்றவும்', 'voice-listening': 'கேட்கிறது...', 'voice-set': 'மொழி மாற்றப்பட்டது', 'opt-jersey': 'ஜெர்சி', 'opt-holstein': 'ஹோல்ஸ்டீன்', 'opt-gir': 'கிர் (இந்திய)', 'opt-sahiwal': 'சாஹிவால் (இந்திய)', 'opt-redsindhi': 'சிவப்பு சிந்தி', 'opt-tharparkar': 'தார்பர்க்கர்', 'opt-yes': 'ஆம்', 'opt-no': 'இல்லை', 'opt-north': 'வட இந்தியா', 'opt-south': 'தென் இந்தியா', 'opt-east': 'கிழக்கு இந்தியா', 'opt-west': 'மேற்கு இந்தியா', 'opt-lactating': 'கறவை மாடு', 'opt-calf': 'கன்று', 'opt-bull': 'காளை', 'opt-milk': 'பால் அதிகரிக்க', 'opt-weight': 'எடை அதிகரிக்க', 'opt-health': 'பொது சுகாதாரம்' },
    'kn-IN': { 'logo': 'ಕ್ಯಾಟಲ್ ಕೇರ್ AI', 'nav-dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'nav-disease': 'ರೋಗ ಸ್ಕ್ಯಾನರ್', 'nav-trade': 'ಬೆಲೆ ನಿರ್ಧಾರ', 'nav-advisory': 'ಸಲಹೆ', 'voice-btn': 'AI ಸಹಾಯಕ', 'title-dashboard': 'ಫಾರ್ಮ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'title-disease': 'AI ರೋಗ ಸ್ಕ್ಯಾನರ್', 'title-trade': 'ಸ್ಮಾರ್ಟ್ ಬೆಲೆ', 'title-advisory': 'ರೈತ ಸಲಹೆ', 'lbl-weight': 'ತೂಕ (ಕೆಜಿ)', 'lbl-age': 'ವಯಸ್ಸು (ತಿಂಗಳು)', 'lbl-breed': 'ತಳಿ', 'lbl-milk': 'ಹಾಲು (ಲೀಟರ್)', 'lbl-preg': 'ಗರ್ಭಾವಸ್ಥೆ (ತಿಂಗಳು)', 'lbl-vac': 'ಲಸಿಕೆ?', 'lbl-region': 'ಪ್ರದೇಶ', 'btn-calc': 'ಬೆಲೆ ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ', 'lbl-type': 'ಪ್ರಕಾರ', 'lbl-goal': 'ಗುರಿ', 'btn-advice': 'ಸಲಹೆ ಪಡೆಯಿರಿ', 'upload-text': 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', 'voice-listening': 'ಆಲಿಸುತ್ತಿದೆ...', 'voice-set': 'ಭಾಷೆ ಬದಲಾಗಿದೆ', 'opt-jersey': 'ಜೆರ್ಸಿ', 'opt-holstein': 'ಹೋಲ್ಸ್ಟೀನ್', 'opt-gir': 'ಗಿರ್', 'opt-sahiwal': 'ಸಾಹಿವಾಲ್', 'opt-redsindhi': 'ಕೆಂಪು ಸಿಂಧಿ', 'opt-tharparkar': 'ಥಾರ್ಪಾರ್ಕರ್', 'opt-yes': 'ಹೌದು', 'opt-no': 'ಇಲ್ಲ', 'opt-north': 'ಉತ್ತರ ಭಾರತ', 'opt-south': 'ದಕ್ಷಿಣ ಭಾರತ', 'opt-east': 'ಪೂರ್ವ ಭಾರತ', 'opt-west': 'ಪಶ್ಚಿಮ ಭಾರತ', 'opt-lactating': 'ಹಾಲು ಕರೆಯುವ ಹಸು', 'opt-calf': 'ಕರು', 'opt-bull': 'ಗೂಳಿ', 'opt-milk': 'ಹಾಲು ಹೆಚ್ಚಿಸಿ', 'opt-weight': 'ತೂಕ ಹೆಚ್ಚಿಸಿ', 'opt-health': 'ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ' },
    'ml-IN': { 'logo': 'കാറ്റിൽ കെയർ AI', 'nav-dashboard': 'ഡാഷ്ബോർഡ്', 'nav-disease': 'രോഗ സ്കാനർ', 'nav-trade': 'വില കാൽക്കുലേറ്റർ', 'nav-advisory': 'ഉപദേശം', 'voice-btn': 'AI അസിസ്റ്റന്റ്', 'title-dashboard': 'ഫാം ഡാഷ്ബോർഡ്', 'title-disease': 'AI രോഗ സ്കാനർ', 'title-trade': 'സ്മാർട്ട് പ്രൈസ്', 'title-advisory': 'കർഷക ഉപദേശം', 'lbl-weight': 'ഭാരം (കിലോ)', 'lbl-age': 'പ്രായം (മാസം)', 'lbl-breed': 'ഇനം', 'lbl-milk': 'പാൽ (ലിറ്റർ)', 'lbl-preg': 'ഗർഭം (മാസം)', 'lbl-vac': 'വാക്സിനേഷൻ?', 'lbl-region': 'പ്രദേശം', 'btn-calc': 'വില കണക്കാക്കുക', 'lbl-type': 'ഇനം', 'lbl-goal': 'ലക്ഷ്യം', 'btn-advice': 'ഉപദേശം നേടുക', 'upload-text': 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക', 'voice-listening': 'ശ്രദ്ധിക്കുന്നു...', 'voice-set': 'ഭാഷ മാറ്റി', 'opt-jersey': 'ജേഴ്സി', 'opt-holstein': 'ഹോൾസ്റ്റീൻ', 'opt-gir': 'ഗിರ್', 'opt-sahiwal': 'സാഹിവാൾ', 'opt-redsindhi': 'റെഡ് സിന്ധി', 'opt-tharparkar': 'താർപാർക്കർ', 'opt-yes': 'അതെ', 'opt-no': 'അല്ല', 'opt-north': 'ഉത്തരേന്ത്യ', 'opt-south': 'ദക്ഷിണേന്ത്യ', 'opt-east': 'കിഴക്കൻ ഇന്ത്യ', 'opt-west': 'പടിഞ്ഞാറൻ ഇന്ത്യ', 'opt-lactating': 'കറവപ്പശു', 'opt-calf': 'കിടാവ്', 'opt-bull': 'കാള', 'opt-milk': 'പാൽ വർദ്ധിപ്പിക്കുക', 'opt-weight': 'ഭാരം വർദ്ധിപ്പിക്കുക', 'opt-health': 'പൊതു ആരോഗ്യം' }
};

// DOM Elements
const contentArea = document.getElementById('content-area');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('.nav-links li');
const voiceBtn = document.getElementById('voice-btn');
const langSelect = document.getElementById('lang-select');

// Helper: Translate & Update UI
function t(key) { return translations[state.currentLang][key] || translations['en-US'][key] || key; }
function updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => el.innerText = t(el.dataset.i18n));
    const viewName = state.currentView;
    const titleMap = { 'dashboard': 'title-dashboard', 'disease-detection': 'title-disease', 'smart-trade': 'title-trade', 'advisory': 'title-advisory' };
    pageTitle.innerText = t(titleMap[viewName]);
    loadView(viewName, false);
}

// View Templates
const renderViews = () => ({
    dashboard: `
        <div class="grid-container">
            <div class="card"><h3><i class="fa-solid fa-cow"></i> Total Cattle</h3><div class="stat-value">45</div></div>
            <div class="card"><h3><i class="fa-solid fa-notes-medical"></i> Health Alerts</h3><div class="stat-value" style="color: #e74c3c;">3</div></div>
            <div class="card"><h3><i class="fa-solid fa-dollar-sign"></i> Market Rate</h3><div class="stat-value">₹85/kg</div></div>
            <div class="card"><h3><i class="fa-solid fa-cloud-sun"></i> Weather</h3><div class="stat-value">28°C</div></div>
        </div>
        <div class="card"><h3>Recent Activity</h3><p>Today: Vaccinated 5 calves.</p></div>
    `,
    'disease-detection': `
        <div class="card"><h3>${t('title-disease')}</h3>
            <div class="upload-box" onclick="document.getElementById('file-input').click()">
                <i class="fa-solid fa-cloud-arrow-up"></i><p>${t('upload-text')}</p>
                <input type="file" id="file-input" hidden accept="image/*" onchange="handleImageUpload(event)">
            </div>
            <div id="detection-result" class="result-card">
                <h4>Result</h4><p id="result-text"></p><p><strong>Confidence:</strong> <span id="confidence-score"></span></p>
            </div>
        </div>
    `,
    'smart-trade': `
        <div class="card" id="trade-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>${t('title-trade')}</h3>
                <button class="btn-primary" onclick="downloadReport()" style="background:#e74c3c; font-size:0.8rem;"><i class="fa-solid fa-file-pdf"></i> PDF</button>
            </div>
            <div class="grid-container" style="grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
                <div class="form-group"><label>${t('lbl-weight')}</label><input type="number" id="trade-weight" class="form-control" placeholder="350"></div>
                <div class="form-group"><label>${t('lbl-age')}</label><input type="number" id="trade-age" class="form-control" placeholder="24"></div>
                <div class="form-group"><label>${t('lbl-breed')}</label><select id="trade-breed" class="form-control" onchange="updateBreedImage()">
                    <option value="jersey">${t('opt-jersey')}</option><option value="holstein">${t('opt-holstein')}</option>
                    <option value="gir">${t('opt-gir')}</option><option value="sahiwal">${t('opt-sahiwal')}</option>
                    <option value="redsindhi">${t('opt-redsindhi')}</option><option value="tharparkar">${t('opt-tharparkar')}</option>
                </select></div>
            </div>
             <div id="breed-visual" style="margin-top: 5px; text-align: center; display:none;">
                <img src="assets/cow_breeds.png" style="max-height: 150px; object-fit: contain;">
            </div>
            <button class="btn-primary" onclick="calculatePrice()" style="margin-top:10px;">${t('btn-calc')}</button>
            <div id="price-result" class="result-card">
                <div style="display: flex; gap: 1rem;">
                     <div style="flex:1;"><h4 id="receipt-total"></h4><div id="receipt-body"></div></div>
                     <div style="flex:1;"><canvas id="priceChart"></canvas></div>
                </div>
            </div>
        </div>
    `,
    'advisory': `
        <div class="card"><h3>${t('title-advisory')}</h3><p>Advisory System Ready</p></div>
    `
});

function loadView(viewName, updateTitle = true) {
    state.currentView = viewName;
    contentArea.innerHTML = renderViews()[viewName];
    if (updateTitle) pageTitle.innerText = t({ 'dashboard': 'title-dashboard', 'disease-detection': 'title-disease', 'smart-trade': 'title-trade', 'advisory': 'title-advisory' }[viewName]);
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.target === viewName));
}
navLinks.forEach(link => link.addEventListener('click', () => loadView(link.dataset.target)));

// --- GEMINI AI INTEGRATION ---
async function askGemini(transcript, lang) {
    // Note: API Key is already in State
    const systemPrompt = `
    You are an intelligent Cattle Care Voice Assistant for Indian Farmers.
    Your task:
    1. Analyze the User's Voice Input: "${transcript}"
    2. Input Language Code: "${lang}"
    3. Determine the user's intent from these options:
       - 'DASHBOARD' (Go to home, main menu)
       - 'PRICE' (Check price, sell cow, value, rate, kimat, vilai, bele, ethra)
       - 'DISEASE' (Check health, sick, doctor, bimari, noi, roga, asukham)
       - 'ADVISORY' (Help, advice, tips, food)
    4. Generate a short, natural, polite spoken response in the SAME language as the input.
    5. Return strictly JSON format:
    {
      "intent": "PRICE",
      "response_text": "Sure, opening the Price Calculator. Please tell me the weight."
    }
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${state.apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] })
        });
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Gemini API Error:", e);
        speakAI("Network error. Using basic mode.");
        return null;
    }
}

// --- VOICE LOGIC ---
function speakAI(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    state.isSpeaking = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower for clarity

    // Voice Selection (Strict Google Priority)
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang === state.currentLang && v.name.includes('Google'))
        || voices.find(v => v.lang === state.currentLang)
        || voices.find(v => v.lang.startsWith(state.currentLang.split('-')[0]));

    if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
    } else {
        utterance.lang = state.currentLang;
    }

    utterance.onend = () => {
        state.isSpeaking = false;
        if (state.conversationMode && !state.voiceActive) {
            setTimeout(() => { if (state.conversationMode) recognition.start(); }, 800);
        }
    };
    window.speechSynthesis.speak(utterance);
}

// Check if voice is available
function checkVoiceAvailability(langCode) {
    const voices = window.speechSynthesis.getVoices();
    return voices.some(v => v.lang === langCode || v.lang.startsWith(langCode.split('-')[0]));
}

// MAIN RECOGNITION LOOP
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Debug Element
    const nav = document.querySelector('.sidebar');
    const debugEl = document.getElementById('voice-debug') || document.createElement('div');
    if (!debugEl.id) {
        debugEl.id = 'voice-debug'; debugEl.style.padding = '10px'; debugEl.style.color = '#fff'; debugEl.style.fontSize = '0.8rem';
        debugEl.style.marginTop = '10px'; debugEl.style.backgroundColor = 'rgba(255,255,255,0.1)'; debugEl.style.borderRadius = '8px';
        nav.appendChild(debugEl);
    }

    langSelect.addEventListener('change', (e) => {
        state.currentLang = e.target.value;

        // FORCE RESET RECOGNITION
        if (state.voiceActive) {
            recognition.stop();
            state.conversationMode = false;
            state.voiceActive = false;
            voiceBtn.classList.remove('listening');
        }

        recognition.lang = state.currentLang;
        updateUI();

        // Voice Diagnostic
        setTimeout(() => {
            if (!checkVoiceAvailability(state.currentLang)) {
                alert(`⚠️ Warning: No voice pack found for ${state.currentLang}. AI speech may be silent.`);
            }
            speakAI(t('voice-set'));
        }, 500);
    });

    // Initial
    recognition.lang = state.currentLang;

    voiceBtn.addEventListener('click', () => {
        if (state.voiceActive) {
            recognition.stop();
            state.conversationMode = false;
        } else {
            if (state.isSpeaking) window.speechSynthesis.cancel();
            state.conversationMode = true;
            recognition.start();
        }
    });

    recognition.onstart = () => {
        state.voiceActive = true;
        voiceBtn.classList.add('listening');
        debugEl.innerHTML = `<strong>Listening (${state.currentLang})...</strong>`;
        voiceBtn.querySelector('span').innerText = t('voice-listening');
    };

    recognition.onend = () => {
        state.voiceActive = false;
        voiceBtn.classList.remove('listening');
        if (!state.conversationMode) voiceBtn.querySelector('span').innerText = t('voice-btn');
    };

    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        debugEl.innerHTML = `Heard: "<em>${transcript}</em>"<br>Thinking...`;

        // API Call
        const aiResult = await askGemini(transcript, state.currentLang);

        if (aiResult) {
            debugEl.innerHTML = `Action: ${aiResult.intent}<br>Reply: "${aiResult.response_text}"`;
            if (aiResult.intent === 'DASHBOARD') loadView('dashboard');
            if (aiResult.intent === 'PRICE') loadView('smart-trade');
            if (aiResult.intent === 'DISEASE') loadView('disease-detection');
            if (aiResult.intent === 'ADVISORY') loadView('advisory');
            speakAI(aiResult.response_text);
        } else {
            debugEl.innerText = "Error: Could not understand.";
            // Basic Fallback
            if (transcript.toLowerCase().includes('price')) loadView('smart-trade');
        }
    };
}

// Logic Utils
window.updateBreedImage = () => { const b = document.getElementById('trade-breed').value; if (b) document.getElementById('breed-visual').style.display = 'block'; };
window.calculatePrice = () => {
    const weight = document.getElementById('trade-weight').value || 350;
    const total = weight * 100; // Mock
    document.getElementById('receipt-total').innerText = "₹" + total;
    document.getElementById('price-result').classList.add('visible');
    speakAI(t('speak-price') + total);
}
window.handleImageUpload = () => {
    setTimeout(() => {
        document.getElementById('detection-result').classList.add('visible');
        document.getElementById('result-text').innerText = "Healthy Cow";
        speakAI(t('speak-disease') + "Healthy");
    }, 1000);
}

// Init
loadView('dashboard');
