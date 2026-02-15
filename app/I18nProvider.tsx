'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

interface I18nProviderProps {
  children: ReactNode;
}

let i18nInstance: typeof i18next | null = null;
let initPromise: Promise<typeof i18next> | null = null;

const initializeI18n = async () => {
  if (i18nInstance && i18next.isInitialized) {
    return i18next;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const savedLanguage = 
        typeof window !== 'undefined' 
          ? localStorage.getItem('preferredLanguage') || 'uz'
          : 'uz';

      await i18next
        .use(
          resourcesToBackend(
            (language: string, namespace: string) =>
              import(`../public/locales/${language}/${namespace}.json`)
          )
        )
        .use(LanguageDetector)
        .init({
          lng: savedLanguage,
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

      i18nInstance = i18next;
      return i18next;
    } catch (error) {
      console.error('i18n initialization error:', error);
      throw error;
    }
  })();

  return initPromise;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeI18n().then(() => {
      setReady(true);
    });
  }, []);

  if (!ready || !i18next.isInitialized) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}


