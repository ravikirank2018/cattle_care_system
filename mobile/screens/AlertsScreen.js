import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import i18n from '../services/i18n';

export default function AlertsScreen({ language, onBack }) {
    const alerts = [
        { id: 1, level: 'critical', text: 'Cow ID #23: Early fever symptoms detected', time: '10:00 AM' },
        { id: 2, level: 'warning', text: 'Cow ID #11: Vaccination due tomorrow', time: 'Yesterday' },
        { id: 3, level: 'info', text: 'Milk yield dropped by 10% for Cow ID #07', time: '2 Days ago' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{i18n.t('alerts_title')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {alerts.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>{i18n.t('alerts_empty')}</Text>
                ) : (
                    alerts.map(alert => (
                        <View key={alert.id} style={[styles.card,
                        alert.level === 'critical' ? { borderLeftColor: '#ef4444', backgroundColor: '#fef2f2' } :
                            alert.level === 'warning' ? { borderLeftColor: '#f59e0b', backgroundColor: '#fffbeb' } :
                                { borderLeftColor: '#3b82f6', backgroundColor: '#eff6ff' }
                        ]}>
                            <Text style={[styles.alertText,
                            alert.level === 'critical' ? { color: '#991b1b' } :
                                alert.level === 'warning' ? { color: '#92400e' } :
                                    { color: '#1e40af' }
                            ]}>{alert.text}</Text>
                            <Text style={styles.time}>{alert.time}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: { backgroundColor: '#dc2626', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
    backBtn: { marginRight: 20 },
    backText: { color: 'white', fontSize: 24 },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    content: { padding: 20 },
    card: { padding: 20, marginBottom: 15, borderRadius: 8, borderLeftWidth: 5, elevation: 2 },
    alertText: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
    time: { fontSize: 12, color: '#6b7280' }
});
