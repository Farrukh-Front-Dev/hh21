# REST API Implementation - Complete ✅

## Summary

Successfully implemented a complete REST API for the Job Matching Platform using Django REST Framework with JWT authentication.

## What Was Implemented

### 1. Authentication & User Management
✅ **JWT Token-Based Authentication**
- Access tokens (60 minutes lifespan)
- Refresh tokens (7 days lifespan)
- Token rotation for security

✅ **Authentication Endpoints:**
- `POST /api/auth/register/` - User registration (candidate/employer)
- `POST /api/auth/login/` - Login and receive JWT tokens
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Get current user info
- `POST /api/auth/verify-email/<token>/` - Email verification
- `POST /api/auth/password-reset/request/` - Request password reset
- `POST /api/auth/password-reset/confirm/<token>/` - Confirm password reset
- `POST /api/auth/token/refresh/` - Refresh access token

### 2. Profile Management

✅ **Candidate Profile Endpoints:**
- `GET /api/candidates/` - List candidate profiles
- `GET /api/candidates/<id>/` - Get specific candidate
- `GET /api/candidates/me/` - Get current candidate's profile
- `POST /api/candidates/complete/` - Complete profile after registration
- `PUT /api/candidates/<id>/` - Update candidate profile
- `GET /api/candidates/dashboard/` - Get dashboard statistics

✅ **Employer Profile Endpoints:**
- `GET /api/employers/` - List employer profiles
- `GET /api/employers/<id>/` - Get specific employer
- `GET /api/employers/me/` - Get current employer's profile
- `POST /api/employers/complete/` - Complete profile after registration
- `PUT /api/employers/<id>/` - Update employer profile
- `GET /api/employers/dashboard/` - Get dashboard statistics

### 3. Job Postings

✅ **Job Posting Endpoints:**
- `GET /api/postings/` - List all job postings (with filters)
  - Filters: search, category, city, availability, min_exp
  - Public access (no authentication required)
- `GET /api/postings/<id>/` - Get specific posting details
- `POST /api/postings/` - Create new posting (candidate only)
- `PUT /api/postings/<id>/` - Update posting (candidate only)
- `DELETE /api/postings/<id>/` - Delete posting (candidate only)
- `GET /api/postings/my_postings/` - Get current candidate's postings
- `POST /api/postings/<id>/toggle_status/` - Activate/deactivate posting

✅ **Categories:**
- `GET /api/categories/` - List all job categories (public access)

### 4. Interactions

✅ **Likes:**
- `GET /api/likes/` - List employer's likes
- `POST /api/likes/toggle/` - Like/unlike a job posting (employer only)

✅ **Invitations:**
- `GET /api/invitations/` - List invitations
- `POST /api/invitations/` - Send invitation (employer only)
- `POST /api/invitations/<id>/accept/` - Accept invitation (candidate only)
- `POST /api/invitations/<id>/reject/` - Reject invitation (candidate only)
- `GET /api/invitations/pending/` - Get pending invitations (candidate only)

### 5. Messaging

✅ **Conversations & Messages:**
- `GET /api/conversations/` - List all conversations
- `GET /api/conversations/<id>/` - Get conversation with messages
- `POST /api/conversations/start/` - Start new conversation
- `GET /api/messages/?conversation=<id>` - Get messages for a conversation
- `POST /api/messages/` - Send a message

### 6. Notifications

✅ **Notification Endpoints:**
- `GET /api/notifications/` - List all notifications
- `POST /api/notifications/<id>/mark_read/` - Mark notification as read
- `POST /api/notifications/mark_all_read/` - Mark all as read
- `GET /api/notifications/unread_count/` - Get unread count

### 7. API Documentation

✅ **Interactive Documentation:**
- Swagger UI available at: `http://localhost:8000/api/docs/`
- OpenAPI schema at: `http://localhost:8000/api/schema/`

## Technologies Used

- **Django REST Framework 3.14.0** - REST API framework
- **djangorestframework-simplejwt 5.3.1** - JWT authentication
- **drf-spectacular 0.27.1** - OpenAPI documentation
- **django-cors-headers 4.3.1** - CORS support for frontend

## Configuration

### Settings (config/settings.py)

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    ...
    'apps.api',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # React/Next.js frontend
    'http://localhost:8000',  # Django templates
]
```

## Usage Examples

### 1. Register a New Candidate

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "securepass123",
    "password_confirm": "securepass123",
    "role": "candidate"
  }'
```

### 2. Login and Get JWT Tokens

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "candidate@example.com",
    "password": "securepass123"
  }'
```

Response:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "candidate@example.com",
    "role": "candidate",
    "is_verified": true
  }
}
```

### 3. Access Protected Endpoint

```bash
curl http://localhost:8000/api/postings/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

### 4. Browse Job Postings (Public)

```bash
# No authentication required
curl "http://localhost:8000/api/postings/?search=developer&category=2&city=tashkent"
```

### 5. Create a Job Posting (Candidate Only)

```bash
curl -X POST http://localhost:8000/api/postings/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Backend Developer",
    "description": "Looking for opportunities in backend development",
    "category": 2,
    "skills": "Python, Django, PostgreSQL",
    "programming_languages": "Python, SQL",
    "years_of_experience": 5,
    "salary_expectations": "3000-5000 USD",
    "is_active": true
  }'
```

### 6. Like a Job Posting (Employer Only)

```bash
curl -X POST http://localhost:8000/api/likes/toggle/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "posting_id": 10
  }'
```

### 7. Send Invitation (Employer Only)

```bash
curl -X POST http://localhost:8000/api/invitations/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "candidate": 5,
    "message": "We would like to invite you for an interview"
  }'
```

### 8. Refresh Access Token

```bash
curl -X POST http://localhost:8000/api/auth/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }'
```

## Testing

### Run the Test Script

```bash
chmod +x test_api.sh
./test_api.sh
```

### Manual Testing with cURL

All endpoints can be tested using cURL as shown in the examples above.

### Using API Documentation

Visit `http://localhost:8000/api/docs/` for interactive Swagger documentation where you can:
- View all available endpoints
- Test endpoints directly from the browser
- See request/response schemas
- Authorize with JWT tokens

## Features

### ✅ Public Endpoints
- Job postings listing (with search and filters)
- Job categories
- Individual posting details

### ✅ Authentication Required
- Profile management
- Creating/editing/deleting job postings
- Likes and invitations
- Messaging
- Notifications

### ✅ Role-Based Access Control
- **Candidates**: Can create job postings, accept/reject invitations
- **Employers**: Can like postings, send invitations, browse candidates

### ✅ Advanced Features
- Pagination (10 items per page by default)
- Filtering (search, category, city, experience, availability)
- Sorting
- Multi-language support (categories in Uzbek, Russian, English)
- Email notifications (for invitations, messages, etc.)
- Real-time messaging support

## Security

✅ **Implemented Security Measures:**
- JWT token-based authentication
- Token rotation and refresh
- Password hashing with Django's default PBKDF2
- CORS configuration for frontend origins
- Role-based access control
- Email verification for new accounts
- Password reset with secure tokens

## Migration from Django Templates

The REST API is now ready for React/Next.js frontend migration:

1. **Keep Django templates** as admin panel/internal tool
2. **Use REST API** for public-facing React/Next.js app
3. **JWT authentication** for stateless API access
4. **CORS configured** for localhost:3000 (React dev server)

## Next Steps for Frontend Development

1. **Install React/Next.js** in a separate directory
2. **Configure API base URL** (http://localhost:8000/api)
3. **Implement JWT token storage** (localStorage or httpOnly cookies)
4. **Create API client** using axios or fetch
5. **Build components** that consume the API endpoints
6. **Handle authentication** (login, token refresh, logout)

## File Structure

```
apps/api/
├── __init__.py
├── apps.py
├── serializers.py     # All model serializers
├── views.py           # All ViewSets and API views
└── urls.py            # API URL routing
```

## API Status

🟢 **Fully Functional** - All endpoints tested and working
🟢 **Documentation Available** - Swagger UI at /api/docs/
🟢 **Authentication Configured** - JWT tokens working
🟢 **CORS Enabled** - Ready for frontend integration
🟢 **Permissions Set** - Role-based access control implemented

## Support

For detailed endpoint documentation, visit:
- Swagger UI: http://localhost:8000/api/docs/
- OpenAPI Schema: http://localhost:8000/api/schema/

---

**Implementation Date:** December 10, 2025
**Status:** ✅ COMPLETE AND TESTED
