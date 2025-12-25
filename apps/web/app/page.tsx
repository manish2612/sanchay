"use client";
import { APP_NAME } from "@sanchay/config";
import React from "react";
import {
  Button,
  TextInput,
  GridBackground,
  Text,
  NavDemo,
  Icon,
} from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider/web";
import { Density, Brand } from "@sanchay/design-tokens";
import { useRouter } from "next/navigation";

export default function Home() {
  const { mode, setMode, density, setDensity, brand, setBrand } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

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
        <h1 className="text-4xl font-extrabold mb-2 font-heading tracking-tight text-foreground">
          Welcome to {APP_NAME}
        </h1>
        <p className="text-lg font-body text-gray-400 font-normal">
          Theme & Density Demonstration 123456
        </p>
      </div>

      {/* Main Card Container - Fixed Width matching Reference */}
      <div className="w-[500px] z-10 flex flex-col gap-6 p-6 rounded-xl border border-[#333333] shadow-2xl relative">
        {/* Glow behind card */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-purple-500/20 blur-xl opacity-100 -z-10 rounded-xl filter-[blur(60px)]" />

        {/* 1. Theme Mode Control Row */}
        <div className="flex justify-between items-center h-10">
          <span className="font-bold text-base text-foreground font-heading">
            Theme Mode
          </span>
          <div className="flex bg-background p-1 rounded-lg border border-[#333333] ">
            <Button
              onClick={() => setMode("light")}
              variant={mode === "light" ? "primary" : "ghost"}
            >
              Light
            </Button>
            <Button
              onClick={() => setMode("dark")}
              variant={mode === "dark" ? "primary" : "ghost"}
            >
              Dark
            </Button>
          </div>
        </div>

        {/* 1.1 Brand Control Row */}
        <div className="flex justify-between items-center h-10 mt-2">
          <span className="font-bold text-base text-foreground font-heading">
            Brand
          </span>
          <div className="flex bg-background p-1 rounded-lg border border-[#333333] gap-2">
            {(["default", "orange"] as Brand[]).map((b) => (
              <Button
                key={b}
                onClick={() => setBrand(b)}
                variant={brand === b ? "primary" : "ghost"}
              >
                {b.charAt(0).toUpperCase() + b.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* 2. Density Control Row */}
        <div className="flex justify-between items-center h-10 mt-2">
          <span className="font-bold text-base text-foreground font-heading">
            Density
          </span>
          <div className="flex gap-2">
            {(["comfortable", "compact", "spacious"] as Density[]).map((d) => (
              <Button
                key={d}
                onClick={() => setDensity(d)}
                variant={density === d ? "primary" : "secondary"}
              >
                {d}
              </Button>
            ))}
          </div>
        </div>

        {/* 3. Current State Box */}
        <div className="mt-2 p-5 bg-background rounded-lg border border-[#222222]">
          <strong className="text-foreground block mb-3 text-sm font-bold font-heading">
            Current State:
          </strong>
          <ul className="space-y-1 text-[13px] text-foreground font-mono leading-relaxed list-disc pl-4">
            <li>
              Base Unit:{" "}
              <span className="text-foreground">var(--spacing-1)</span>
            </li>
            <li>
              Button Height:{" "}
              <span className="text-foreground">var(--sizes-buttonHeight)</span>
            </li>
            <li>
              Mode:{" "}
              <span className="text-foreground font-bold">
                {mode.toUpperCase()}
              </span>
            </li>
            <li>
              Brand:{" "}
              <span className="text-foreground font-bold">
                {brand.toUpperCase()}
              </span>
            </li>
            <li>
              Body Font:{" "}
              <span className="text-foreground">
                var(--typography-fontFamily-body)
              </span>
            </li>
            <li>
              Heading Font:{" "}
              <span className="text-foreground">
                var(--typography-fontFamily-heading)
              </span>
            </li>
          </ul>
        </div>

        {/* 4. Font Demo Box */}
        <div className="p-5 bg-background rounded-lg border border-[#222222]">
          <strong className="text-foreground block mb-4 text-sm font-bold font-heading">
            Font Demo:
          </strong>

          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-gray-500 mb-2 font-heading">
                IBM Plex Sans (Body)
              </div>
              <div className="space-y-1 text-foreground text-base">
                <div className="font-body font-light">Light 300</div>
                <div className="font-body font-light italic">
                  Light Italic 300
                </div>
                <div className="font-body font-normal">Regular 400</div>
                <div className="font-body font-normal italic">
                  Regular Italic 400
                </div>
                <div className="font-body font-medium">Medium 500</div>
                <div className="font-body font-medium italic">
                  Medium Italic 500
                </div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold text-foreground mb-2 font-heading">
                Work Sans (Heading)
              </div>
              <div className="space-y-1 text-foreground text-base">
                <div className="font-heading font-normal">Regular 400</div>
                <div className="font-heading font-medium">Medium 500</div>
                <div className="font-heading font-semibold">SemiBold 600</div>
                <div className="font-heading font-bold">Bold 700</div>
              </div>
            </div>
          </div>
        </div>
        {/* 0. Nav Demo */}
        <div className="bg-background rounded-lg border border-[#222222] overflow-hidden">
          <NavDemo onLoginPress={() => router.push("/login")} />
        </div>

        {/* 5. Components Showcase */}
        <div className="space-y-8 mt-4">
          {/* 5.1 Buttons Section */}
          <div className="p-5 bg-background rounded-lg border border-[#222222]">
            <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
              Button Examples:
            </strong>

            <div className="space-y-4">
              {/* Variants */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
                  Variants
                </span>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
                  Sizes
                </span>
                <div className="flex items-center flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon" variant="outline">
                    <Icon name="add" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 5.2 TextInput Section */}
          <div className="p-5 bg-background rounded-lg border border-[#222222]">
            <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
              TextInput Examples:
            </strong>

            <div className="space-y-4 max-w-sm">
              {/* Default */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
                  Default
                </span>
                <TextInput.Root>
                  <TextInput.Input placeholder="Enter text..." />
                </TextInput.Root>
              </div>

              {/* With Icons */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
                  With Icons
                </span>
                <TextInput.Root>
                  <TextInput.Slot side="left">
                    <Icon name="search" size={18} />
                  </TextInput.Slot>
                  <TextInput.Input placeholder="Search..." />
                </TextInput.Root>
              </div>

              <div className="space-y-1">
                <TextInput.Root>
                  <TextInput.Input placeholder="Email address" />
                  <TextInput.Slot side="right">
                    <Icon name="mail" size={18} />
                  </TextInput.Slot>
                </TextInput.Root>
              </div>

              {/* States */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
                  Error State
                </span>
                <TextInput.Root variant="error">
                  <TextInput.Slot side="left">
                    <Icon name="error" size={18} />
                  </TextInput.Slot>
                  <TextInput.Input placeholder="Invalid input" />
                </TextInput.Root>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
                  Disabled
                </span>
                <TextInput.Root disabled>
                  <TextInput.Input placeholder="Disabled" disabled />
                </TextInput.Root>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
