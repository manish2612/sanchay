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
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background text-foreground selection:bg-primary/30 py-16">
      {/* Background Grid & Glow - Matching Reference */}
      <GridBackground className="opacity-60 fixed inset-0 z-0 pointer-events-none" />
      {/* <div className="absolute inset-0 z-0 bg-gradient-radial from-primary/10 via-background/0 to-background/0 opacity-0 pointer-events-none filter-[blur(10px)]" /> */}

      {/* Header Content */}
      <div className="text-center z-10 max-w-xl px-4 mb-8">
          <h1 className="text-4xl font-extrabold mb-2 font-heading tracking-tight text-white">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-lg font-body text-gray-400 font-normal">
            Theme & Density Demonstration 123456
          </p>
      </div>

      {/* Main Card Container - Fixed Width matching Reference */}
      <div className="w-[500px] z-10 flex flex-col gap-6 p-6 rounded-xl border border-[#333333] shadow-2xl relative">
        
        {/* Glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-100 -z-10 rounded-xl filter-[blur(60px)]" />

        {/* 1. Theme Mode Control Row */}
        <div className="flex justify-between items-center h-10">
            <span className="font-bold text-base text-white font-heading">Theme Mode</span>
            <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#333333]">
                <Button 
                    onClick={() => setMode('light')}
                    variant={mode === 'light' ? 'primary' : 'ghost'}
                >
                    Light
                </Button>
                <Button 
                    onClick={() => setMode('dark')}
                    variant={mode === 'dark' ? 'primary' : 'ghost'}
                >
                    Dark
                </Button>
            </div>
        </div>

        {/* 2. Density Control Row */}
        <div className="flex justify-between items-center h-10 mt-2">
            <span className="font-bold text-base text-white font-heading">Density</span>
            <div className="flex gap-2">
                {(['comfortable', 'compact', 'spacious'] as Density[]).map((d) => (
                    <Button 
                        key={d} 
                        onClick={() => setDensity(d)}
                        variant={density === d ? 'primary' : 'secondary'}
                    >
                        {d}
                    </Button>
                ))}
            </div>
        </div>

        {/* 3. Current State Box */}
        <div className="mt-2 p-5 bg-[#0A0A0A] rounded-lg border border-[#222222]">
            <strong className="text-white block mb-3 text-sm font-bold font-heading">Current State:</strong>
            <ul className="space-y-1 text-[13px] text-gray-300 font-mono leading-relaxed list-disc pl-4">
                <li>Base Unit: <span className="text-gray-400">var(--spacing-1)</span></li>
                <li>Button Height: <span className="text-gray-400">var(--sizes-buttonHeight)</span></li>
                <li>Mode: <span className="text-white font-bold">{mode.toUpperCase()}</span></li>
                <li>Body Font: <span className="text-gray-400">var(--typography-fontFamily-body)</span></li>
                <li>Heading Font: <span className="text-gray-400">var(--typography-fontFamily-heading)</span></li>
            </ul>
        </div>
        
        {/* 4. Font Demo Box */}
        <div className="p-5 bg-[#0A0A0A] rounded-lg border border-[#222222]">
            <strong className="text-white block mb-4 text-sm font-bold font-heading">Font Demo:</strong>
            
            <div className="space-y-6">
                <div>
                    <div className="text-[11px] font-bold text-gray-500 mb-2 font-heading">IBM Plex Sans (Body)</div>
                    <div className="space-y-1 text-white text-base">
                        <div className="font-body font-light">Light 300</div>
                        <div className="font-body font-light italic">Light Italic 300</div>
                        <div className="font-body font-normal">Regular 400</div>
                        <div className="font-body font-normal italic">Regular Italic 400</div>
                        <div className="font-body font-medium">Medium 500</div>
                        <div className="font-body font-medium italic">Medium Italic 500</div>
                    </div>
                </div>

                <div>
                    <div className="text-[11px] font-bold text-gray-500 mb-2 font-heading">Work Sans (Heading)</div>
                    <div className="space-y-1 text-white text-base">
                        <div className="font-heading font-normal">Regular 400</div>
                        <div className="font-heading font-medium">Medium 500</div>
                        <div className="font-heading font-semibold">SemiBold 600</div>
                        <div className="font-heading font-bold">Bold 700</div>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. Action Buttons */}
        <div className="flex gap-3 mt-2">
            <Button variant="primary">
                Primary Action
            </Button>
            <Button variant="secondary">
                Secondary
            </Button>
            <Button variant="outline">
                Outline
            </Button>
            <Button variant="ghost">
                Ghost
            </Button>
        </div>

      </div>
    </main>
  );
}
