'use client';

import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="flex justify-center items-center min-h-dvh bg-surface p-6">
      <div className="flex w-full max-w-[1200px] relative shadow-2xl">{children}</div>
    </div>
  );
}
