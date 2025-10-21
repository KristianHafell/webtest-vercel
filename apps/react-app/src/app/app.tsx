// Uncomment this line to use CSS modules

import { useEffect, useState } from 'react';

export function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallable(false);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8fafc',
      }}
    >
      <h1
        style={{
          fontFamily: 'sans-serif',
          fontWeight: 700,
          fontSize: '2rem',
          marginBottom: '1.5rem',
          color: '#222',
        }}
      >
        Install Fryst.app
      </h1>
      <p
        style={{
          fontFamily: 'sans-serif',
          color: '#444',
          marginBottom: '2rem',
        }}
      >
        Get the Fryst.app for the best experience on your device.
      </p>
      <button
        onClick={handleInstall}
        disabled={!installable}
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          background: installable ? '#2563eb' : '#a5b4fc',
          color: '#fff',
          cursor: installable ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      >
        {installable ? 'Install Fryst.app' : 'Install Unavailable'}
      </button>
      <p style={{ marginTop: '2rem', color: '#888', fontSize: '0.95rem' }}>
        If you don&apos;t see the install prompt, add this site to your home
        screen from your browser menu.
      </p>
    </div>
  );
}

export default App;
