'use client';

import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation('common');

  return {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
  };
};
