export function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google script')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google script'));
    document.head.appendChild(script);
  });
}

export function parseJwt(token: string): any | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export async function initGoogleSignIn(callback: (credential: string) => void) {
  await loadGoogleScript();
  const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string;
  
  if (!clientId || clientId === 'demo-client-id.apps.googleusercontent.com') {
    console.warn('VITE_GOOGLE_CLIENT_ID not found or using demo ID. Google authentication disabled.');
    // Don't initialize Google auth with invalid client ID
    return;
  }
  
  (window as any).google.accounts.id.initialize({
    client_id: clientId,
    callback: (response: any) => callback(response.credential),
    auto_select: false,
    ux_mode: 'popup'
  });
}

export function renderGoogleButton(container: HTMLElement) {
  const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string;
  
  if (!clientId || clientId === 'demo-client-id.apps.googleusercontent.com') {
    // Show a disabled button with setup instructions
    container.innerHTML = `
      <div style="
        border: 2px dashed #ccc; 
        padding: 12px; 
        text-align: center; 
        border-radius: 8px; 
        color: #666; 
        font-size: 14px;
        background: #f9f9f9;
      ">
        <div style="margin-bottom: 8px;">🔧 Google Auth Setup Required</div>
        <div style="font-size: 12px;">
          Configure VITE_GOOGLE_CLIENT_ID in .env.local
        </div>
      </div>
    `;
    return;
  }

  (window as any).google.accounts.id.renderButton(container, {
    theme: 'outline',
    size: 'large',
    type: 'standard',
    text: 'continue_with',
    shape: 'pill'
  });
}

export function promptOneTap() {
  (window as any).google.accounts.id.prompt();
}
