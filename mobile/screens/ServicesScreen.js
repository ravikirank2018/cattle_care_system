import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import i18n from '../services/i18n';

export default function ServicesScreen({ language, navigation }) {
    const services = [
        { id: 'Cows', title: i18n.t('cows_title'), icon: '🐄', color: '#ecfdf5', border: '#10b981' },
        { id: 'Predict', title: i18n.t('predict_title'), icon: '🏥', color: '#e0e7ff', border: '#6366f1' },
        { id: 'Alerts', title: i18n.t('alerts_title'), icon: '🔔', color: '#fef2f2', border: '#ef4444' },
        { id: 'Grants', title: i18n.t('grants_title'), icon: '💰', color: '#fffbeb', border: '#f59e0b' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.header}>{i18n.t('nav_services')}</Text>
            <View style={styles.grid}>
                {services.map(srv => (
                    <TouchableOpacity
                        key={srv.id}
                        style={[styles.card, { backgroundColor: srv.color, borderColor: srv.border }]}
                        onPress={() => navigation(srv.id)}
                    >
                        <Text style={styles.icon}>{srv.icon}</Text>
                        <Text style={styles.title}>{srv.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#064e3b', marginBottom: 20 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    card: { width: '48%', padding: 20, borderRadius: 20, marginBottom: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center', height: 150 },
    icon: { fontSize: 40, marginBottom: 10 },
    title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#374151' }
});
