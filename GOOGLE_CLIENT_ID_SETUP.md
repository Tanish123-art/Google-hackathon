# Google Client ID Setup Guide

## Steps to Get Your Google Client ID

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

### 2. Create or Select a Project
- Create a new project or select an existing one
- Note your project ID

### 3. Enable Google+ API
- Go to "APIs & Services" > "Library"
- Search for "Google+ API" and enable it
- Also enable "Google Identity" API

### 4. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client IDs"
- Choose "Web application"
- Add authorized origins:
  - `http://localhost:5173` (for development)
  - `http://localhost:3000` (if using different port)
- Add authorized redirect URIs:
  - `http://localhost:5173` (for development)

### 5. Copy Your Client ID
- After creating, copy the Client ID
- It looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

### 6. Update Your .env.local File
- Open `Frontend/.env.local`
- Replace `your-google-client-id-here.apps.googleusercontent.com` with your actual Client ID
- Save the file

### 7. Restart Your Development Server
- Stop your frontend server (Ctrl+C)
- Run `npm run dev` again
- The Google Sign-In button should now appear

## Example .env.local File
```
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

## Troubleshooting
- Make sure the Client ID is correct
- Ensure the authorized origins include your development URL
- Restart the development server after updating .env.local
- Check browser console for any error messages
