import React from "react";
import { LoginGraphic } from "./components/LoginGraphic";

export default function Login() {
  return (
    <main className="min-h-screen flex w-full">
      {/* Left Panel - Login Form (Placeholder) */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Placeholder for actual login form components */}
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>
          
          <div className="space-y-4">
            <div className="h-12 bg-gray-100 rounded-md w-full animate-pulse border border-gray-200"></div>
            <div className="h-12 bg-gray-100 rounded-md w-full animate-pulse border border-gray-200"></div>
            <div className="h-12 bg-blue-600 rounded-md w-full flex items-center justify-center mt-6">
              <span className="text-white font-medium text-lg">Login Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel - Marketing / Graphic */}
      {/* Uses a CSS variable or Tailwind bg class. Assuming a blue theme for now, 
          but can easily be overridden with style={{ backgroundColor: 'var(--primary-color)' }} */}
      <section className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center flex-col relative overflow-hidden">
        {/* The responsive Graphic Component */}
        <div className="w-full max-w-2xl px-12 z-10">
          <LoginGraphic />
        </div>
        
        {/* Captions below the graphic */}
        <div className="z-10 mt-12 text-center max-w-md px-6">
          <h2 className="text-2xl font-bold text-white mb-3">
            Connect with every application.
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            Everything you need in an easily customizable dashboard. Streamline operations and manage your workflow seamlessly.
          </p>
        </div>
        
        {/* Optional Carousel Indicators matching the reference image */}
        <div className="flex space-x-2 mt-8 z-10">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
        </div>
      </section>
    </main>
  );
}
