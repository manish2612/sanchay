"use client";
import { APP_NAME } from "@sanchay/config";
import React from "react";
import { Button, GridBackground } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider/web";
import { Density } from "@sanchay/design-tokens";

export default function Home() {
  const { mode, setMode, density, setDensity, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-12 relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <GridBackground />
      
      <div className="text-center z-10 max-w-2xl px-4">
          <h1 className="text-5xl font-extrabold mb-4 font-heading text-foreground tracking-tight">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-xl font-body text-muted-foreground leading-relaxed">
            A demonstration of our unified design system, featuring adaptive themes, typography, and density aware components.
          </p>
      </div>

      <div className="flex flex-col gap-6 p-8 bg-card/50 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl w-full max-w-lg z-10">
        
        {/* Controls */}
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="font-semibold text-foreground text-sm uppercase tracking-wider">Theme Mode</span>
                <div className="flex gap-2">
                    <Button 
                        variant={mode === 'light' ? 'primary' : 'outline'} 
                        onClick={() => setMode('light')}
                        size="sm"
                    >
                        Light
                    </Button>
                    <Button 
                        variant={mode === 'dark' ? 'primary' : 'outline'} 
                        onClick={() => setMode('dark')}
                        size="sm"
                    >
                        Dark
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-border/50">
                <span className="font-semibold text-foreground text-sm uppercase tracking-wider">Density</span>
                <div className="flex gap-2">
                    {(['comfortable', 'compact', 'spacious'] as Density[]).map((d) => (
                        <Button 
                            key={d} 
                            variant={density === d ? 'primary' : 'outline'}
                            onClick={() => setDensity(d)}
                            className="capitalize"
                            size="sm"
                        >
                            {d}
                        </Button>
                    ))}
                </div>
            </div>
        </div>

        {/* Demo Content */}
        <div className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <strong className="text-foreground block mb-2 text-sm font-semibold">Current Theme State</strong>
                <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex justify-between"><span>Base Unit:</span> <span className="font-mono text-foreground">{theme.spacing[1]}</span></li>
                    <li className="flex justify-between"><span>Button Height:</span> <span className="font-mono text-foreground">{theme.sizes.buttonHeight}</span></li>
                    <li className="flex justify-between"><span>Mode:</span> <span className="font-mono text-foreground">{mode.toUpperCase()}</span></li>
                </ul>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <strong className="text-foreground block mb-4 text-sm font-semibold">Typography System</strong>
                
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Body (IBM Plex Sans)</div>
                        <div className="space-y-2 text-sm">
                            <div className="font-body font-light">Light 300</div>
                            <div className="font-body font-normal">Regular 400</div>
                            <div className="font-body font-medium">Medium 500</div>
                        </div>
                    </div>

                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Heading (Work Sans)</div>
                        <div className="space-y-2 text-sm">
                            <div className="font-heading font-normal">Regular 400</div>
                            <div className="font-heading font-medium">Medium 500</div>
                            <div className="font-heading font-bold">Bold 700</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                <Button onClick={() => {}} className="w-full">Primary Action</Button>
                <Button variant="outline" onClick={() => {}} className="w-full">Secondary</Button>
            </div>
        </div>

      </div>
    </main>
  );
}
