"use client";
import { APP_NAME } from "@sanchay/config";
import { Button } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider/web";

export default function Home() {
  const { mode, setMode } = useTheme();

  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to {APP_NAME}</h1>
      <p>This is the walking skeleton.</p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
        <span>Current Mode: {mode}</span>
        <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          Toggle Theme
        </Button>
      </div>
      <div>
        <p>Current Brand Color: <span style={{ color: 'var(--colors-primary)' }}>Primary</span></p>
      </div>
      <Button onClick={() => console.log('Clicked')}>
        Shared UI Button
      </Button>
    </main>
  );
}
