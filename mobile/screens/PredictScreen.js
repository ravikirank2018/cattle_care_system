import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import i18n from '../services/i18n';

export default function PredictScreen({ language, onBack }) {
    const [form, setForm] = useState({ temp: '', appetite: '', mobility: '' });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handlePredict = () => {
        setLoading(true);
        // Mock API
        setTimeout(() => {
            setResult({ prediction: 'Healthy', confidence: '98%', action: 'Routine Monitor' });
            setLoading(false);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{i18n.t('predict_title')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>{i18n.t('pred_enter_vitals')}</Text>

                    <Text style={styles.label}>{i18n.t('pred_temp')}</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="38.5" value={form.temp} onChangeText={t => setForm({ ...form, temp: t })} />

                    <Text style={styles.label}>{i18n.t('pred-appetite')}</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="1-10" value={form.appetite} onChangeText={t => setForm({ ...form, appetite: t })} />

                    <Text style={styles.label}>{i18n.t('pred-mobility')}</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="1-10" value={form.mobility} onChangeText={t => setForm({ ...form, mobility: t })} />

                    <TouchableOpacity style={styles.btn} onPress={handlePredict} disabled={loading}>
                        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>{i18n.t('pred_run')}</Text>}
                    </TouchableOpacity>
                </View>

                {result && (
                    <View style={styles.resultCard}>
                        <View style={styles.scoreCircle}>
                            <Text style={styles.scoreText}>{result.confidence}</Text>
                        </View>
                        <Text style={styles.resultTitle}>{result.prediction}</Text>
                        <Text style={styles.resultAction}>{result.action}</Text>
                        <Text style={styles.note}>{i18n.t('pred_note')}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#e0e7ff' }, // Indigo-50
    header: { backgroundColor: '#4338ca', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
    backBtn: { marginRight: 20 },
    backText: { color: 'white', fontSize: 24 },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    content: { padding: 20 },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 20, marginBottom: 20, elevation: 3 },
    cardHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#374151' },
    label: { fontWeight: '600', color: '#4b5563', marginBottom: 5 },
    input: { backgroundColor: '#f9fafb', padding: 12, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
    btn: { backgroundColor: '#4f46e5', padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold' },
    resultCard: { backgroundColor: 'white', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 3 },
    scoreCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#e0e7ff', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    scoreText: { color: '#4338ca', fontSize: 20, fontWeight: 'bold' },
    resultTitle: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 5 },
    resultAction: { fontSize: 16, color: '#6b7280', marginBottom: 20 },
    note: { fontSize: 12, color: '#9ca3af', textAlign: 'center', fontStyle: 'italic' }
});
