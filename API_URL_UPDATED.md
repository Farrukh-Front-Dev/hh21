# API URL Yangilandi ✅

## O'zgarish

API base URL yangilandi:

**Eski URL:**
```
http://89.236.218.90/api
```

**Yangi URL:**
```
http://77.42.75.94/django/api
```

## O'zgartirilgan Fayl

- `app/store/api/baseApi.ts` - Base URL yangilandi

## Build Status

✅ Build muvaffaqiyatli o'tdi
✅ Barcha endpointlar yangi URL bilan ishlaydi

## Endpoint'lar

Barcha API so'rovlar endi quyidagi base URL'dan foydalanadi:

```typescript
const baseUrl = "http://77.42.75.94/django/api";
```

### Misol Endpoint'lar:

- `POST http://77.42.75.94/django/api/auth/login/`
- `GET http://77.42.75.94/django/api/postings/`
- `GET http://77.42.75.94/django/api/candidates/`
- `GET http://77.42.75.94/django/api/employers/`
- `GET http://77.42.75.94/django/api/invitations/`
- `GET http://77.42.75.94/django/api/messages/`
- `GET http://77.42.75.94/django/api/notifications/`

## Ishga Tushirish

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Tekshirish

Agar API ishlamasa, quyidagilarni tekshiring:

1. Backend server ishlab turibmi: `http://77.42.75.94/django/api/`
2. CORS sozlamalari to'g'rimi
3. Network tab'da so'rovlarni ko'ring (Browser DevTools)

## Status

✅ **API URL yangilandi**
✅ **Build muvaffaqiyatli**
✅ **Barcha endpointlar tayyor**

**Date:** February 17, 2026
