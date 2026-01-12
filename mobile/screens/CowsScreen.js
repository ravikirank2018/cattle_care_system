import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import i18n from '../services/i18n';

// Mock API call for cows (since we don't have a dedicated endpoint in api.js yet, using mock for UI logic)
// In a real scenario, we would add getCows/postCow to api.js
const mockCows = [
    { id: 1, tag: 'COW-101', age: 4, health: 'Healthy', owner: 'Ravi' },
    { id: 2, tag: 'COW-102', age: 3, health: 'Sick', owner: 'Ravi' },
];

export default function CowsScreen({ language, onBack }) {
    const [cows, setCows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ tag: '', age: '', health: 'Healthy', owner: '' });

    useEffect(() => {
        // Simulate fetch
        setLoading(true);
        setTimeout(() => {
            setCows(mockCows);
            setLoading(false);
        }, 500);
    }, []);

    const handleAdd = () => {
        if (!form.tag || !form.age) {
            Alert.alert("Error", "Please fill required fields");
            return;
        }
        const newCow = { id: Date.now(), ...form };
        setCows([...cows, newCow]);
        setForm({ tag: '', age: '', health: 'Healthy', owner: '' });
        Alert.alert("Success", "Cow added successfully");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{i18n.t('cows_title')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>{i18n.t('btn_add_cow')}</Text>
                    <TextInput style={styles.input} placeholder={i18n.t('ph_tag')} value={form.tag} onChangeText={t => setForm({ ...form, tag: t })} />
                    <TextInput style={styles.input} placeholder={i18n.t('ph_age')} keyboardType="numeric" value={form.age} onChangeText={t => setForm({ ...form, age: t })} />
                    <TextInput style={styles.input} placeholder={i18n.t('ph_owner')} value={form.owner} onChangeText={t => setForm({ ...form, owner: t })} />

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => setForm({ ...form, health: 'Healthy' })} style={[styles.badge, form.health === 'Healthy' && styles.activeBadge, { backgroundColor: '#d1fae5' }]}>
                            <Text style={[styles.badgeText, { color: '#065f46' }]}>{i18n.t('opt_healthy')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setForm({ ...form, health: 'Sick' })} style={[styles.badge, form.health === 'Sick' && styles.activeBadge, { backgroundColor: '#fee2e2' }]}>
                            <Text style={[styles.badgeText, { color: '#991b1b' }]}>{i18n.t('opt_sick')}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.btn} onPress={handleAdd}>
                        <Text style={styles.btnText}>{i18n.t('btn_add_cow')}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>{i18n.t('hdr_herd_list')}</Text>
                {loading ? <ActivityIndicator color="#059669" /> : (
                    cows.map(cow => (
                        <View key={cow.id} style={styles.cowItem}>
                            <View>
                                <Text style={styles.cowTag}>#{cow.tag}</Text>
                                <Text style={styles.cowSub}>{i18n.t('tbl_age')}: {cow.age} | {cow.owner}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: cow.health === 'Healthy' ? '#d1fae5' : '#fee2e2' }]}>
                                <Text style={{ color: cow.health === 'Healthy' ? '#065f46' : '#991b1b', fontWeight: 'bold' }}>
                                    {cow.health === 'Healthy' ? i18n.t('opt_healthy') : i18n.t('opt_sick')}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f4f6' },
    header: { backgroundColor: '#064e3b', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
    backBtn: { marginRight: 20 },
    backText: { color: 'white', fontSize: 24 },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    content: { padding: 20 },
    card: { backgroundColor: 'white', padding: 15, borderRadius: 15, marginBottom: 20, elevation: 2 },
    cardHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#374151' },
    input: { backgroundColor: '#f9fafb', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e5e7eb' },
    row: { flexDirection: 'row', gap: 10, marginBottom: 15 },
    badge: { padding: 8, borderRadius: 20, borderWidth: 1, borderColor: 'transparent' },
    activeBadge: { borderColor: '#059669', borderWidth: 2 },
    badgeText: { fontWeight: 'bold' },
    btn: { backgroundColor: '#059669', padding: 15, borderRadius: 10, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#374151' },
    cowItem: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
    cowTag: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
    cowSub: { color: '#6b7280', fontSize: 12 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }
});
