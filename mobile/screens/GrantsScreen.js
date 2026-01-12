import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import i18n from '../services/i18n';

export default function GrantsScreen({ language, onBack }) {
    const grants = [
        { id: 1, name: 'Fodder Subsidy', amount: '₹5000', desc: 'Subsidy for purchasing dry fodder during drought.' },
        { id: 2, name: 'Barn Construction', amount: '₹25000', desc: 'Financial aid for building concrete sheds.' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{i18n.t('grants_title')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>{i18n.t('grants_schemes')}</Text>

                {grants.map(grant => (
                    <View key={grant.id} style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.grantName}>{grant.name}</Text>
                            <View style={styles.amountBadge}>
                                <Text style={styles.amountText}>{grant.amount}</Text>
                            </View>
                        </View>
                        <Text style={styles.desc}>{grant.desc}</Text>
                        <TouchableOpacity style={styles.applyBtn}>
                            <Text style={styles.applyText}>{i18n.t('grants_apply')} →</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fef3c7' }, // Amber-50
    header: { backgroundColor: '#d97706', padding: 20, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
    backBtn: { marginRight: 20 },
    backText: { color: 'white', fontSize: 24 },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    content: { padding: 20 },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#92400e' },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 3 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
    grantName: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', flex: 1 },
    amountBadge: { backgroundColor: '#d1fae5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    amountText: { color: '#065f46', fontWeight: 'bold' },
    desc: { color: '#4b5563', marginBottom: 15, lineHeight: 20 },
    applyBtn: { alignSelf: 'flex-start' },
    applyText: { color: '#d97706', fontWeight: 'bold' }
});
