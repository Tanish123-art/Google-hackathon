# 🚀 Quick Google OAuth Setup Guide

## The Problem
You're getting a 400 error because your `.env.local` file has a placeholder Google Client ID instead of a real one.

## ✅ Solution (5 minutes)

### 1. Get Your Google Client ID
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add authorized origins: `http://localhost:5173`
7. Copy your Client ID (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)

### 2. Update .env.local File
Open `Frontend/.env.local` and replace:
```
VITE_GOOGLE_CLIENT_ID=REPLACE_WITH_YOUR_ACTUAL_CLIENT_ID
```

With your real Client ID:
```
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### 3. Restart Frontend Server
1. Stop the frontend server (Ctrl+C)
2. Run: `npm run dev`
3. Try "Continue with Google" again

## 🎯 Expected Result
- Google Sign-In button appears
- No more 400 errors
- Google authentication works properly

## 📞 Need Help?
If you still get errors, check:
- Client ID is correct (no typos)
- Authorized origins include `http://localhost:5173`
- Frontend server restarted after updating .env.local
