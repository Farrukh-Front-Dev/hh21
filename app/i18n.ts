import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Initialize i18next immediately
i18next
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../public/locales/${language}/${namespace}.json`)
    )
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: typeof window !== 'undefined' ? localStorage.getItem('preferredLanguage') || 'uz' : 'uz',
    fallbackLng: 'uz',
    ns: ['common', 'dashboard', 'candidates', 'postings', 'messages', 'notifications', 'invitations'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
