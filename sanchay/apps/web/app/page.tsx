"use client";
import { APP_NAME } from "@sanchay/config";
import { Button, GridBackground } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider/web";
import { Density } from "@sanchay/design-tokens";

export default function Home() {
  const { mode, setMode, density, setDensity, theme } = useTheme();

  return (
    <main style={{ 
        padding: theme.spacing[8], 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: theme.spacing[6]
    }}>
      <GridBackground />
      
      <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
              fontSize: theme.typography.fontSize['4xl'], 
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[2] 
          }}>
            Welcome to {APP_NAME}
          </h1>
          <p style={{ fontSize: theme.typography.fontSize.lg, opacity: 0.8 }}>
            Theme & Density Demonstration
          </p>
      </div>

      <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: theme.spacing[4], 
          padding: theme.spacing[6],
          backgroundColor: theme.colors.surface || 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: theme.radii.lg,
          border: `1px solid ${theme.colors.border || 'rgba(0,0,0,0.1)'}`,
          width: '100%',
          maxWidth: '500px'
      }}>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: theme.spacing[4], justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>Theme Mode</span>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                <Button onClick={() => setMode('light')} style={{ opacity: mode === 'light' ? 1 : 0.5 }}>Light</Button>
                <Button onClick={() => setMode('dark')} style={{ opacity: mode === 'dark' ? 1 : 0.5 }}>Dark</Button>
            </div>
        </div>

        <div style={{ display: 'flex', gap: theme.spacing[4], justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>Density</span>
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                {(['comfortable', 'compact', 'spacious'] as Density[]).map((d) => (
                    <Button 
                        key={d} 
                        onClick={() => setDensity(d)}
                        style={{ 
                            opacity: density === d ? 1 : 0.6,
                            textTransform: 'capitalize'
                        }}
                    >
                        {d}
                    </Button>
                ))}
            </div>
        </div>

        {/* Demo Content */}
        <div style={{ marginTop: theme.spacing[4], display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            <div style={{ padding: theme.spacing[3], backgroundColor: theme.colors.background, borderRadius: theme.radii.md }}>
                <strong>Current State:</strong>
                <ul style={{ margin: 0, paddingLeft: theme.spacing[5], marginTop: theme.spacing[2] }}>
                    <li>Base Unit: {theme.spacing[1]}</li>
                    <li>Button Height: {theme.sizes.buttonHeight}</li>
                    <li>Mode: {mode.toUpperCase()}</li>
                </ul>
            </div>
            
            <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                <Button onClick={() => {}}>Primary Action</Button>
                <Button onClick={() => {}} style={{ backgroundColor: 'transparent', border: '1px solid currentColor', color: 'inherit' }}>Secondary</Button>
            </div>
        </div>

      </div>
    </main>
  );
}
