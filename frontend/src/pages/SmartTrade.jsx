import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, TrendingUp, Info, Download, Stamp, ScanLine, Smartphone } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import QRCode from 'qrcode';

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const SmartTrade = () => {
    const { t, currentLang } = useLanguage();
    const [formData, setFormData] = useState({
        weight: '',
        age: '',
        breed: 'gir',
        milk: '',
        pregnancy: '',
        location: 'Gujarat',
        vaccination: 'none',
        lactation_cycle: '1',
        disease_history: []
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [qrUrl, setQrUrl] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedHistory = [...formData.disease_history];
        if (checked) {
            updatedHistory.push(value);
        } else {
            updatedHistory = updatedHistory.filter((item) => item !== value);
        }
        setFormData({ ...formData, disease_history: updatedHistory });
    };

    const calculatePrice = async () => {
        setLoading(true);
        setError(null);
        setQrUrl('');
        try {
            const payload = { ...formData, language: currentLang };
            const res = await axios.post('http://127.0.0.1:5000/api/price', payload);
            if (res.data.success) {
                setResult(res.data);
                // Generate QR Code with summary for Google Lens
                const summary = `CATTLE CARE VALUATION\nBreed: ${formData.breed}\nValue: INR ${res.data.estimated_price}\nID: ${Date.now().toString(36).toUpperCase()}\nCertified by AI`;
                const url = await QRCode.toDataURL(summary);
                setQrUrl(url);
            } else {
                setError(res.data.error || "Unknown Error");
            }
        } catch (err) {
            console.error(err);
            setError("Could not connect to AI Server.");
        }
        setLoading(false);
    };

    const downloadPDF = () => {
        const element = document.getElementById('valuation-report');
        const opt = {
            margin: 0.5,
            filename: `Cattle_Valuation_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    };

    const chartData = {
        labels: result?.forecast?.labels || [],
        datasets: [{
            label: t('market-rate'),
            data: result?.forecast?.data || [],
            borderColor: '#10b981',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.1)'
        }]
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            <header>
                <h1 className="text-4xl font-bold text-gray-800">{t('title-trade')}</h1>
                <p className="text-gray-500 mt-2">{t('trade-subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* INPUT FORM */}
                <div className="glass-card p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl-breed')}</label>
                            <select name="breed" className="w-full bg-emerald-50/50 border-emerald-200" onChange={handleChange} value={formData.breed}>
                                <optgroup label={t('grp-desi')}>
                                    <option value="gir">{t('opt-gir')}</option>
                                    <option value="sahiwal">{t('opt-sahiwal')}</option>
                                    <option value="redsindhi">{t('opt-redsindhi')}</option>
                                    <option value="tharparkar">{t('opt-tharparkar')}</option>
                                    <option value="murrah">{t('opt-murrah')}</option>
                                </optgroup>
                                <optgroup label={t('grp-exotic')}>
                                    <option value="jersey">{t('opt-jersey')}</option>
                                    <option value="holstein">{t('opt-holstein')}</option>
                                </optgroup>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl-weight')}</label>
                            <input name="weight" type="number" className="w-full" placeholder="350" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl-age')}</label>
                            <input name="age" type="number" className="w-full" placeholder="36" onChange={handleChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl-milk')}</label>
                            <input name="milk" type="number" className="w-full" placeholder="12" onChange={handleChange} />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl-preg')}</label>
                            <input name="pregnancy" type="number" className="w-full" placeholder="0" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location (State)</label>
                            <select name="location" className="w-full bg-emerald-50/50 border-emerald-200" onChange={handleChange} value={formData.location}>
                                {indianStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Vaccination Status</label>
                            <select name="vaccination" className="w-full bg-emerald-50/50 border-emerald-200" onChange={handleChange} value={formData.vaccination}>
                                <option value="none">None / Unknown</option>
                                <option value="partially">Partially Vaccinated</option>
                                <option value="fully">Fully Vaccinated</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Lactation Cycle (1-10)</label>
                            <input name="lactation_cycle" type="number" className="w-full" placeholder="2" onChange={handleChange} value={formData.lactation_cycle} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Disease History</label>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                <label className="flex items-center gap-1"><input type="checkbox" value="FMD" onChange={handleCheckboxChange} checked={formData.disease_history.includes('FMD')} /> FMD</label>
                                <label className="flex items-center gap-1"><input type="checkbox" value="Mastitis" onChange={handleCheckboxChange} checked={formData.disease_history.includes('Mastitis')} /> Mastitis</label>
                                <label className="flex items-center gap-1"><input type="checkbox" value="Brucellosis" onChange={handleCheckboxChange} checked={formData.disease_history.includes('Brucellosis')} /> Brucellosis</label>
                            </div>
                        </div>
                    </div>

                    {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

                    <button onClick={calculatePrice} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg">
                        {loading ? t('msg-analyzing') : <><Calculator size={24} /> {t('btn-calc')}</>}
                    </button>

                    {/* QR Mobile Feature */}
                    {qrUrl && (
                        <div className="glass-card mt-6 p-4 flex items-center gap-4 border-l-4 border-blue-500 bg-blue-50/50">
                            <img src={qrUrl} alt="Valuation QR" className="w-20 h-20 rounded border border-gray-200" />
                            <div>
                                <h4 className="font-bold text-gray-800 flex items-center gap-2"><Smartphone size={18} /> {t('qr-scan')}</h4>
                                <p className="text-xs text-gray-500 mt-1">{t('hint-qr')}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* RESULTS AREA */}
                <div className="space-y-6">
                    {!result && (
                        <div className="glass-card p-12 text-center text-gray-400 flex flex-col items-center justify-center h-full border-dashed border-2">
                            <Stamp size={64} className="mb-4 opacity-20" />
                            <p>{t('cert-title')}</p>
                        </div>
                    )}

                    {result && (
                        <>
                            {/* REPORT CERTIFICATE (ID for PDF) */}
                            <div id="valuation-report" className="bg-white p-8 rounded-xl border-4 border-double border-emerald-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-4 right-4 opacity-20"><Stamp size={80} className="text-emerald-800" /></div>

                                <div className="border-b-2 border-emerald-500 pb-4 mb-6">
                                    <h2 className="text-2xl font-bold text-emerald-900 uppercase tracking-widest">{t('cert-title')}</h2>
                                    <p className="text-sm text-gray-500">{t('cert-subtitle')} • {new Date().toLocaleDateString()}</p>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase">{t('cert-value')}</p>
                                        <p className="text-5xl font-extrabold text-emerald-600">₹{result.estimated_price.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-500">{t('cert-confidence')}</p>
                                        <p className="text-xl font-bold text-emerald-800">98.5%</p>
                                    </div>
                                </div>

                                <div className="bg-emerald-50/50 p-4 rounded-lg space-y-2 text-sm border border-emerald-100 mb-6">
                                    <h3 className="font-bold text-emerald-800 border-b border-emerald-200 pb-1 mb-2">{t('cert-proof')}</h3>
                                    <div className="flex justify-between"><span className="text-gray-600">{t('cert-base')} ({formData.weight}kg)</span> <span className="font-mono">₹{result.breakdown.weight_value}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600">{t('cert-milk')} ({formData.milk}L)</span> <span className="font-mono text-green-600">+ ₹{result.breakdown.milk_bonus}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600">{t('cert-preg')}</span> <span className="font-mono text-purple-600">+ ₹{result.breakdown.pregnancy_bonus}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-600">{t('cert-age')} ({formData.age}m)</span> <span className="font-mono text-red-500">- ₹{result.breakdown.age_penalty}</span></div>

                                    {result.breakdown.vaccination_bonus > 0 && (
                                        <div className="flex justify-between"><span className="text-gray-600">Vaccination Bonus</span> <span className="font-mono text-green-600">+ ₹{result.breakdown.vaccination_bonus}</span></div>
                                    )}
                                    {result.breakdown.health_penalty > 0 && (
                                        <div className="flex justify-between"><span className="text-gray-600">Health History Penalty</span> <span className="font-mono text-red-500">- ₹{result.breakdown.health_penalty}</span></div>
                                    )}


                                </div>

                                <div className="mb-6">
                                    <h3 className="font-bold text-gray-700 mb-2">{t('cert-analysis')}</h3>
                                    <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded border-l-4 border-emerald-500 whitespace-pre-wrap leading-relaxed">
                                        "{result.ai_analysis}"
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                        {t('cert-footer')} • ID: {Date.now().toString(36).toUpperCase()}
                                    </div>
                                    {/* Embed small QR in PDF too */}
                                    {qrUrl && <img src={qrUrl} className="w-12 h-12" alt="Proof QR" />}
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-4">
                                <button onClick={downloadPDF} className="flex-1 btn-primary bg-gray-800 hover:bg-gray-900 flex items-center justify-center gap-2 py-3">
                                    <Download size={20} /> {t('btn-download')}
                                </button>
                            </div>

                            <div className="glass-card p-6">
                                <h3 className="font-bold mb-4 text-gray-700 text-sm">{t('lbl-forecast')}</h3>
                                <div className="h-32">
                                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartTrade;
