import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

i18n.use(initReactI18next).init({
lng: 'vi',
fallbackLng: 'vi',
resources: {
	vi: vi,
	eng: eng,
},
interpolation: {
	escapeValue: false // react already safes from xss
}
});

export default i18n;
