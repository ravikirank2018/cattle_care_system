import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, StatusBar, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator, Modal, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { getDashboardData, postScan, postAdvisory, postVoice } from './services/api';
import i18n from './services/i18n';
import CowsScreen from './screens/CowsScreen';
import GrantsScreen from './screens/GrantsScreen';
import AlertsScreen from './screens/AlertsScreen';
import PredictScreen from './screens/PredictScreen';
import ServicesScreen from './screens/ServicesScreen';

// --- LANGUAGES ---
const LANGUAGES = [
  { code: 'en-US', name: 'English', label: '🇬🇧 English' },
  { code: 'hi-IN', name: 'Hindi', label: '🇮🇳 हिंदी' },
  { code: 'kn-IN', name: 'Kannada', label: '🇮🇳 ಕನ್ನಡ' },
  { code: 'te-IN', name: 'Telugu', label: '🇮🇳 తెలుగు' },
  { code: 'te-IN', name: 'Telugu', label: '🇮🇳 తెలుగు' },
  { code: 'ta-IN', name: 'Tamil', label: '🇮🇳 தமிழ்' },
  { code: 'ml-IN', name: 'Malayalam', label: '🇮🇳 മലയാളം' },
];

// Icons
const ICONS = {
  Home: "🏠",
  Scan: "📷",
  Voice: "🎙️",
  Chat: "💬",
  Services: "📱"
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [showLangModal, setShowLangModal] = useState(false);

  // Sync i18n locale with selected language
  i18n.locale = selectedLanguage.code;

  const renderContent = () => {
    switch (currentTab) {
      case 'Home': return <DashboardScreen language={selectedLanguage} />;
      case 'Scan': return <ScanScreen language={selectedLanguage} />;
      case 'Voice': return <VoiceScreen language={selectedLanguage} />;
      case 'Chat': return <AdvisoryScreen language={selectedLanguage} />;
      case 'Services': return <ServicesScreen language={selectedLanguage} navigation={setCurrentTab} />;
      case 'Cows': return <CowsScreen language={selectedLanguage} onBack={() => setCurrentTab('Services')} />;
      case 'Grants': return <GrantsScreen language={selectedLanguage} onBack={() => setCurrentTab('Services')} />;
      case 'Alerts': return <AlertsScreen language={selectedLanguage} onBack={() => setCurrentTab('Services')} />;
      case 'Predict': return <PredictScreen language={selectedLanguage} onBack={() => setCurrentTab('Services')} />;
      default: return <DashboardScreen language={selectedLanguage} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#064e3b" />

      {/* Dynamic Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.branding}>🐄 {i18n.t('app_name')}</Text>
          <Text style={styles.headerSubtitle}>{i18n.t('subtitle')} • {i18n.t(`tab_${currentTab.toLowerCase()}`)}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowLangModal(true)} style={styles.langBtn}>
          <Text style={styles.langBtnText}>{selectedLanguage.label.split(' ')[0]}</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {Object.keys(ICONS).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, currentTab === tab && styles.activeTab]}
            onPress={() => setCurrentTab(tab)}
          >
            <Text style={styles.tabIcon}>{ICONS[tab]}</Text>
            <Text style={[styles.tabLabel, currentTab === tab && styles.activeTabLabel]}>
              {i18n.t(`tab_${tab.toLowerCase()}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Language Modal */}
      <Modal visible={showLangModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('select_language')}</Text>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity key={lang.code} style={styles.langOption} onPress={() => { setSelectedLanguage(lang); setShowLangModal(false); }}>
                <Text style={styles.langOptionText}>{lang.label}</Text>
                {selectedLanguage.code === lang.code && <Text style={{ color: '#059669' }}>✓</Text>}
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowLangModal(false)} style={styles.closeBtn}>
              <Text style={{ color: '#666' }}>{i18n.t('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- SCREENS ---

// 1. DASHBOARD
const DashboardScreen = ({ language }) => {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = async () => {
    setRefreshing(true);
    const result = await getDashboardData();
    if (result) {
      setData(result);
      setLastUpdate(new Date().toLocaleTimeString());
    }
    setRefreshing(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} colors={['#059669']} />}
    >
      {!data && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>{i18n.t('connecting')}</Text>
          <Text style={styles.warningSub}>{i18n.t('connecting_sub')}</Text>
        </View>
      )}

      <View style={styles.bigCard}>
        <Text style={styles.cardTitle}>{i18n.t('total_cattle')}</Text>
        <Text style={styles.bigValue}>{data?.stats?.total_cattle || '--'}</Text>
        <Text style={styles.updateText}>{i18n.t('last_updated')} {lastUpdate || i18n.t('never')}</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, { flex: 1, marginRight: 15 }]}>
          <Text style={styles.cardTitle}>{i18n.t('avg_health')}</Text>
          <Text style={[styles.cardValue, { color: '#059669' }]}>{data?.stats?.avg_health || '--'}%</Text>
        </View>
        <View style={[styles.card, { flex: 1 }]}>
          <Text style={styles.cardTitle}>{i18n.t('milk_yield')}</Text>
          <Text style={[styles.cardValue, { color: '#2563eb' }]}>{data?.stats?.milk_yield || '--'} L</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{i18n.t('recent_alerts')}</Text>
      {data?.health_history?.map((alert, i) => (
        <View key={i} style={[styles.alertItem, { borderLeftColor: '#f59e0b' }]}>
          <Text style={styles.alertMessage}>{alert.details}</Text>
          <Text style={styles.alertTime}>{alert.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// 2. SCAN (DISEASE DETECTION)
const ScanScreen = ({ language }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centerView}>
        <Text>{i18n.t('camera_permission')}</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btnPrimary}><Text style={styles.btnText}>{i18n.t('grant_permission')}</Text></TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
      setImage(photo.uri);
      analyzeImage(photo.base64);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      analyzeImage(result.assets[0].base64);
    }
  };

  const analyzeImage = async (base64) => {
    setLoading(true);
    setAnalysis(null);
    const result = await postScan(base64, language.code);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <View style={styles.fullScreen}>
      {!image ? (
        <View style={styles.fullScreen}>
          <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} facing="back" />
          <View style={styles.cameraControls}>
            <TouchableOpacity onPress={pickImage} style={styles.camBtnSecondary}>
              <Text style={styles.camBtnText}>📁 {i18n.t('upload')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.camBtnPrimary}>
              <View style={styles.shutterCtx} />
            </TouchableOpacity>
            <View style={{ width: 60 }} />
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          <TouchableOpacity onPress={() => { setImage(null); setAnalysis(null); }} style={styles.btnSecondary}>
            <Text style={{ color: '#333' }}>{i18n.t('take_new_photo')}</Text>
          </TouchableOpacity>

          {loading && (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <ActivityIndicator size="large" color="#059669" />
              <Text style={{ marginTop: 10, color: '#059669' }}>{i18n.t('analyzing')}</Text>
            </View>
          )}

          {analysis && (
            <View style={styles.resultBox}>
              <Text style={[styles.resultTitle, { color: analysis.status === 'Healthy' ? '#059669' : '#dc2626' }]}>
                {analysis.status === 'Healthy' ? i18n.t('healthy') : i18n.t('issue')}
              </Text>
              <Text style={styles.resultDisease}>{analysis.disease_name}</Text>
              <Text style={styles.resultAdvice}>{analysis.advice}</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

// 3. VOICE ASSISTANT
const VoiceScreen = ({ language }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const recordingRef = useRef(null);

  const startRecording = async () => {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }

      if (recordingRef.current) {
        try { await recordingRef.current.stopAndUnloadAsync(); } catch (e) { }
        recordingRef.current = null;
      }

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      console.log('Starting Recording...');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping Recording...');
    setIsRecording(false);

    if (!recordingRef.current) return;

    try {
      const rec = recordingRef.current;
      recordingRef.current = null;

      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      console.log('Recording stored at', uri);

      handleSendAudio(uri);
    } catch (error) {
      console.log("Recording stopped too early or failed:", error);
    }
  };

  const handleSendAudio = async (uri) => {
    setLoading(true);
    setResponse('Listening...');

    try {
      const base64Audio = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
      const result = await postVoice('', base64Audio, language.code);

      if (result) {
        setResponse(result.response_text);
        Speech.speak(result.response_text, { language: language.code });
      }
    } catch (e) {
      console.error("Error sending audio", e);
      setResponse("Error processing audio.");
    }
    setLoading(false);
  };

  const handleSendText = async () => {
    if (!inputText) return;
    setTranscript(inputText);
    setResponse('Thinking...');
    setLoading(true);

    const result = await postVoice(inputText, null, language.code);
    if (result) {
      setResponse(result.response_text);
      Speech.speak(result.response_text, { language: language.code });
    }
    setInputText('');
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <View style={styles.chatContainer}>
        {transcript ? <Text style={styles.userMsg}>{transcript}</Text> : null}
        {response ? <Text style={styles.botMsg}>{response}</Text> : null}
        {loading && <ActivityIndicator size="small" color="#059669" />}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={`${i18n.t('type_or_speak')} (${language.name})...`}
        />
        <TouchableOpacity onPress={handleSendText} style={styles.sendBtn}>
          <Text style={{ color: 'white' }}>{i18n.t('send')}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity
          style={[styles.micBtn, isRecording && { backgroundColor: '#fecaca', borderWidth: 2, borderColor: 'red' }]}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Text style={{ fontSize: 40 }}>{isRecording ? '🔴' : '🎙️'}</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, color: '#666' }}>
          {isRecording ? i18n.t('hold_to_speak') : `${i18n.t('hold_to_speak')} (${language.name})`}
        </Text>
      </View>
    </View>
  );
};

// 4. ADVISORY (CHAT)
const AdvisoryScreen = ({ language }) => {
  const [history, setHistory] = useState([{ role: 'model', content: "Namaste! I am your AI Expert. How can I help?" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newHistory = [...history, { role: 'user', content: input }];
    setHistory(newHistory);
    setInput('');
    setLoading(true);

    const result = await postAdvisory(newHistory, language.code);
    if (result && result.success) {
      setHistory([...newHistory, { role: 'model', content: result.data }]);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {history.map((msg, i) => (
          <View key={i} style={[
            styles.msgBubble,
            msg.role === 'user' ? styles.msgUser : styles.msgModel
          ]}>
            <Text style={msg.role === 'user' ? { color: 'white' } : { color: '#1f2937' }}>{msg.content}</Text>
          </View>
        ))}
        {loading && <Text style={{ fontStyle: 'italic', color: '#666', marginLeft: 10 }}>Typing...</Text>}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder={`${i18n.t('type_question')} (${language.name})...`}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{i18n.t('send')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ECFDF5' }, // emerald-50
  header: {
    paddingTop: 40, paddingBottom: 15, paddingHorizontal: 20,
    backgroundColor: '#064e3b',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    elevation: 5,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  branding: { color: 'white', fontSize: 24, fontWeight: '800' },
  headerSubtitle: { color: '#6ee7b7', fontSize: 14 },
  langBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  langBtnText: { color: 'white', fontSize: 20 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  langOption: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', flexDirection: 'row', justifyContent: 'space-between' },
  langOptionText: { fontSize: 16, color: '#374151' },
  closeBtn: { marginTop: 15, alignItems: 'center', padding: 10 },

  tabBar: {
    flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10, paddingBottom: 20,
    borderTopWidth: 1, borderTopColor: '#e5e7eb', justifyContent: 'space-around'
  },
  tabItem: { alignItems: 'center', padding: 5 },
  tabIcon: { fontSize: 24 },
  tabLabel: { fontSize: 10, color: '#9ca3af', marginTop: 2 },
  activeTabLabel: { color: '#059669', fontWeight: 'bold' },

  content: { padding: 20, paddingBottom: 50 },
  centerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Dashboard Styles
  warningBox: { backgroundColor: '#fff7ed', padding: 15, borderRadius: 12, marginBottom: 20, borderColor: '#fdba74', borderWidth: 1 },
  warningText: { color: '#c2410c', fontWeight: 'bold' },
  warningSub: { color: '#ea580c', fontSize: 12 },
  bigCard: { backgroundColor: 'white', padding: 25, borderRadius: 24, marginBottom: 20, alignItems: 'center', elevation: 3 },
  cardTitle: { color: '#6b7280', fontSize: 12, textTransform: 'uppercase', fontWeight: '700' },
  bigValue: { fontSize: 48, fontWeight: '900', color: '#064e3b', marginVertical: 10 },
  updateText: { color: '#9ca3af', fontSize: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 20, elevation: 2 },
  cardValue: { fontSize: 24, fontWeight: '800', marginTop: 8 },
  sectionHeader: { fontSize: 20, fontWeight: '800', color: '#064e3b', marginBottom: 15 },
  alertItem: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 12, borderLeftWidth: 5, elevation: 1 },
  alertMessage: { color: '#1f2937', fontWeight: '600' },
  alertTime: { color: '#9ca3af', fontSize: 12, marginTop: 4 },

  // Camera Styles
  fullScreen: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1 },
  cameraControls: { position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  camBtnPrimary: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  shutterCtx: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white', borderWidth: 2, borderColor: '#000' },
  camBtnSecondary: { padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20 },
  camBtnText: { color: 'white', fontWeight: 'bold' },
  previewImage: { width: '100%', height: 300, borderRadius: 20, marginTop: 20 },
  resultBox: { marginTop: 20, padding: 20, backgroundColor: 'white', borderRadius: 20, elevation: 5 },
  resultTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  resultDisease: { fontSize: 18, color: '#374151', marginBottom: 10 },
  resultAdvice: { fontSize: 14, color: '#4b5563', lineHeight: 20 },

  // Chat/Voice Styles
  inputRow: { flexDirection: 'row', padding: 10, backgroundColor: 'white', alignItems: 'center' },
  textInput: { flex: 1, backgroundColor: '#f3f4f6', padding: 12, borderRadius: 20, marginRight: 10 },
  sendBtn: { backgroundColor: '#059669', padding: 12, borderRadius: 20 },
  msgBubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  msgUser: { backgroundColor: '#059669', alignSelf: 'flex-end', borderTopRightRadius: 2 },
  msgModel: { backgroundColor: 'white', alignSelf: 'flex-start', borderTopLeftRadius: 2 },
  micBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#d1fae5', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  btnPrimary: { backgroundColor: '#059669', padding: 15, borderRadius: 10, marginTop: 20 },
  btnSecondary: { backgroundColor: '#e5e7eb', padding: 15, borderRadius: 10, marginTop: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});
