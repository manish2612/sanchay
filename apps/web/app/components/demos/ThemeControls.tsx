"use client";
import React from "react";
import { Button } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider/web";
import { Density, Brand } from "@sanchay/design-tokens";

export function ThemeControls() {
  const { mode, setMode, density, setDensity, brand, setBrand } = useTheme();

  return (
    <div className="w-full flex flex-col gap-6 p-6 rounded-xl border border-[#333333] shadow-2xl relative bg-surface shadow-sm mb-8">
      {/* Glow behind card */}
      <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-purple-500/20 blur-xl opacity-100 -z-10 rounded-xl filter-[blur(60px)]" />

      {/* 1. Theme Mode Control Row */}
      <div className="flex justify-between items-center h-10">
        <span className="font-bold text-base text-foreground font-heading">
          Theme Mode
        </span>
        <div className="flex bg-surface shadow-sm p-1 rounded-lg border border-[#333333] ">
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
        <div className="flex bg-surface shadow-sm p-1 rounded-lg border border-[#333333] gap-2">
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
      <div className="mt-2 p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
        <strong className="text-foreground block mb-3 text-sm font-bold font-heading">
          Current State:
        </strong>
        <ul className="space-y-1 text-[13px] text-foreground font-mono leading-relaxed list-disc pl-4">
          <li>
            Base Unit: <span className="text-foreground">var(--spacing-1)</span>
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
              var(--fonts-body)
            </span>
          </li>
          <li>
            Heading Font:{" "}
            <span className="text-foreground">
              var(--fonts-heading)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
