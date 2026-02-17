# Backend Server Muammosi ⚠️

## Muammo

Backend Django API server ishlamayapti yoki noto'g'ri URL berilgan.

## Tekshirilgan URL'lar

❌ `http://77.42.75.94/django/api/` - 502 Bad Gateway
❌ `http://77.42.75.94/api/` - 502 Bad Gateway  
❌ `http://77.42.75.94:8000/api/` - Timeout (javob bermayapti)

## Topilgan

✅ `http://77.42.75.94/` - Next.js frontend server (port 80)

## Kerakli Ma'lumot

Backend Django API serverining to'g'ri URL'ini aniqlash kerak:

1. **Port raqami** - Qaysi portda ishlamoqda? (8000, 8080, 3001, boshqa?)
2. **Path** - API yo'li qanday? (`/api/`, `/django/api/`, `/backend/api/`, boshqa?)
3. **Protocol** - HTTP yoki HTTPS?

## Mumkin Bo'lgan URL'lar

Quyidagi URL'lardan birini tekshiring:

```
http://77.42.75.94:8000/api/
http://77.42.75.94:8080/api/
http://77.42.75.94:3001/api/
http://77.42.75.94/backend/api/
https://77.42.75.94/api/
```

## Tekshirish

Backend server ishlab turganini tekshirish uchun:

```bash
# Categories endpoint'ni tekshirish (authentication kerak emas)
curl http://YOUR_BACKEND_URL/api/categories/

# Yoki browser'da ochish
http://YOUR_BACKEND_URL/api/categories/
```

## Frontend Konfiguratsiya

Hozirda frontend quyidagi URL'dan foydalanmoqda:

```typescript
// app/store/api/baseApi.ts
const baseUrl = "http://77.42.75.94/django/api";
```

## Keyingi Qadamlar

1. ✅ Backend server to'g'ri URL'ini aniqlang
2. ✅ `app/store/api/baseApi.ts` faylida URL'ni yangilang
3. ✅ Frontend'ni qayta build qiling: `npm run build`
4. ✅ Test qiling

## Yordam

Agar backend server ishlamayotgan bo'lsa:

1. Backend serverni ishga tushiring
2. CORS sozlamalarini tekshiring (frontend URL'ni qo'shing)
3. Nginx/Apache konfiguratsiyasini tekshiring

---

**Status:** ⚠️ Backend server topilmadi
**Date:** February 17, 2026
