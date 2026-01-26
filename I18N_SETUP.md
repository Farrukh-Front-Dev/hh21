# Multi-Language Support (i18n) Configuration

## Qanday ishlaydi? (How it works?)

Bu loyihada 3 tilda (Uz, Ru, En) support qilish o'rnatildi. Asosiy til: **Uzbek (uz)**

### Translation Fayllar Joylashuvi:
```
public/locales/
├── uz/
│   └── common.json     # Uzbek translations
├── ru/
│   └── common.json     # Russian translations
└── en/
    └── common.json     # English translations
```

## Kompaniyalarda Foydalanish

### 1. React Components'da:

```tsx
'use client';
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation('common');
  
  return <h1>{t('navbar.home')}</h1>;
}
```

### 2. Til O'zgarish:

```tsx
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

// Navbar'iga qo'shing (allaqachon qo'shilgan):
<LanguageSwitcher />
```

**Xususiyat**: Til tanlamasi `localStorage`'da saqlanadi. Page refresh'dan keyin til saqlanib qoladi.

### 3. Hook Orqali:

```tsx
import { useI18n } from '@/app/hooks/useI18n';

export function MyComponent() {
  const { t, language, changeLanguage } = useI18n();
  
  return (
    <div>
      <p>{t('common.loading')}</p>
      <p>Current: {language}</p>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}
```

## New Translation Qo'shish

### 1. JSON Fayl'iga Yangi Key Qo'shing:

`public/locales/uz/common.json`:
```json
{
  "newSection": {
    "newKey": "Uzbek text"
  }
}
```

`public/locales/ru/common.json`:
```json
{
  "newSection": {
    "newKey": "Russian text"
  }
}
```

`public/locales/en/common.json`:
```json
{
  "newSection": {
    "newKey": "English text"
  }
}
```

### 2. Components'da Ishlatish:

```tsx
const { t } = useTranslation('common');
<span>{t('newSection.newKey')}</span>
```

## Muhim Files:

- **`middleware.ts`** - Faqat API request'larni boshqaradi (URL routing o'chirildi)
- **`i18n.config.ts`** - i18n konfiguratsiya
- **`app/i18n.ts`** - i18next initialization
- **`app/I18nProvider.tsx`** - React provider
- **`app/hooks/useI18n.ts`** - Custom hook
- **`app/components/LanguageSwitcher.tsx`** - Til o'zgarish komponenti

## Language Priority:

1. **localStorage**: `preferredLanguage` (agar mavjud bo'lsa)
2. **Browser accept-language header** (auto-detect)
3. **Default**: `uz` (Uzbek)

## Routing Struktura:

- **NO URL PREFIX** - Barcha routes oddiy: `/dashboard`, `/login`, `/postings` etc.
- **Locale detecting** - i18n provider orqali avtomatik tugannomalar yo'q
- **localStorage-based** - Til tanlamasi browser storage'da saqlanadi

## Key Translation Examples:

```typescript
// Navbar
t('navbar.home')          // "Bosh sahifa"
t('navbar.logout')        // "Chiqish"
t('navbar.login')         // "Kirish"

// Common actions
t('common.loading')       // "Yuklanmoqda..."
t('common.save')          // "Saqlash"
t('common.delete')        // "O'chirish"

// Auth
t('auth.email')           // "Email"
t('auth.password')        // "Parol"
t('auth.signIn')          // "Kirish"

// Jobs
t('jobs.title')           // "Vakansiyalar"
t('jobs.applyNow')        // "Ariza berish"
```

## Sinov

1. http://localhost:3000 ga boring
2. Navbar'da til o'zgartirgich tugmasini bosing (🇺🇿 / 🇷🇺 / 🇬🇧)
3. Sayt tulgan tilga o'zgaradi
4. Page refresh'ini qiling - til saqlanib qoladi
5. DevTools > Application > Local Storage'da `preferredLanguage` ko'ring

## Namespace Expansion (Kelajak):

Hozir `common.json` namespacedan foydalanyapti. Kelajakda yangi namespace'lar qo'shish mumkin:

```
public/locales/uz/
├── common.json
├── dashboard.json
├── jobs.json
└── auth.json
```

Keyin:
```tsx
const { t: tDash } = useTranslation('dashboard');
const { t: tJobs } = useTranslation('jobs');
```

---
**Status**: ✅ Production Ready
**Locales**: uz (Uzbek), ru (Russian), en (English)
**Last Updated**: 2026-01-26
