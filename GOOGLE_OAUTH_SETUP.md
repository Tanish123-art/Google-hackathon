# Google OAuth Setup Guide

## Backend Setup (Already Done)
✅ Google authentication endpoint created: `/api/auth/google`
✅ User model updated to support Google users
✅ JWT token generation for Google users

## Frontend Setup Required

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized origins:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)
7. Copy the Client ID

### 2. Environment Variables
Create a `.env.local` file in the Frontend directory with:

```
VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 3. Test the Setup
1. Start both backend and frontend servers
2. Go to signin/signup page
3. Click "Continue with Google"
4. Complete Google authentication
5. Should redirect to dashboard with navbar

## Troubleshooting

### 400 Error Solutions:
1. **Check Client ID**: Ensure VITE_GOOGLE_CLIENT_ID is set correctly
2. **Check Origins**: Make sure localhost:5173 is in authorized origins
3. **Check Backend**: Ensure backend server is running on port 5000
4. **Check Console**: Look for specific error messages in browser console

### Common Issues:
- **"Invalid client"**: Wrong Client ID or not in authorized origins
- **"Access blocked"**: Domain not authorized in Google Console
- **"Network error"**: Backend server not running or wrong URL

## Current Status
✅ Backend Google auth endpoint ready
✅ Frontend Google auth integration ready
⏳ Need Google Cloud Console setup
⏳ Need environment variables configured
