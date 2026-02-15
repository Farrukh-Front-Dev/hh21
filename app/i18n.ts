import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const initI18n = async (lng: string = 'uz') => {
  await i18next
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../public/locales/${language}/${namespace}.json`)
      )
    )
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng: 'uz',
      ns: ['common', 'dashboard', 'candidates', 'postings', 'messages', 'notifications', 'invitations'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    });

  return i18next;
};

export default initI18n;
