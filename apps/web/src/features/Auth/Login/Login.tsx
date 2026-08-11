import React from 'react';
import { LoginGraphic } from './components/LoginGraphic';
import { LoginForm } from './components/LoginForm';
import { LoginHeaderGraphic } from './components/LoginHeaderGraphic';

export default function Login() {
  return (
    <main className="min-h-dvh flex w-full">
      {/* Left Panel - Login Form */}
      <section className="relative w-full lg:w-3/5 flex items-center justify-center p-8 bg-background overflow-hidden">
        {/* Ambient Glow Effects */}
        {/* Top Glow: Top-Right on mobile, Top-Left on desktop */}
        <div className="absolute -top-32 -right-32 lg:right-auto lg:-left-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px] transform-gpu pointer-events-none" />

        {/* Bottom Glow: Bottom-Left */}
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/15 rounded-full blur-[100px] transform-gpu pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile-only Graphic Header */}
          <div className="flex justify-center lg:hidden mb-6">
            <LoginHeaderGraphic className="w-64 h-auto" primaryOffset={{ x: 0, y: -16 }} />
          </div>

          <h1 className="text-3xl font-bold mb-2 text-foreground text-center lg:text-left">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground mb-16 text-center lg:text-left">
            Please enter your details to sign in.
          </p>

          <LoginForm />
        </div>
      </section>

      {/* Right Panel - Marketing / Graphic */}
      {/* Uses project's theme tokens for background and text colors */}
      <section className="hidden lg:flex lg:w-2/5 bg-primary items-center justify-center flex-col relative overflow-hidden">
        {/* The responsive Graphic Component */}
        <div className="w-full max-w-2xl px-12 z-10">
          <LoginGraphic />
        </div>

        {/* Captions below the graphic */}
        <div className="z-10 mt-12 text-center px-6">
          <h2 className="text-2xl font-bold text-primary-foreground mb-3">
            Connect with every application.
          </h2>
          <p className="text-primary-foreground/80 text-base leading-relaxed">
            Everything you need in an easily customizable dashboard. Streamline operations and
            manage your workflow seamlessly.
          </p>
        </div>

        {/* Optional Carousel Indicators matching the reference image */}
        <div className="flex space-x-2 mt-8 z-10">
          <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40"></div>
          <div className="w-2 h-2 rounded-full bg-primary-foreground/40"></div>
        </div>
      </section>
    </main>
  );
}
