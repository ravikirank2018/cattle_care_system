import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import kn from '../translations/kn.json';
import te from '../translations/te.json';
import ta from '../translations/ta.json';
import ml from '../translations/ml.json';

const i18n = new I18n({
    en,
    'en-US': en,
    hi,
    'hi-IN': hi,
    kn,
    'kn-IN': kn,
    te,
    'te-IN': te,
    ta,
    'ta-IN': ta,
    ml,
    'ml-IN': ml,
});

// Set the locale once at the beginning of your app.
i18n.enableFallback = true;
i18n.locale = getLocales()[0].languageCode;

export default i18n;
