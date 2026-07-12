"use client";

import React from "react";

export function BrandPanel() {
  return (
    <div className="hidden md:flex w-full h-full p-12 flex-col justify-center text-white bg-gradient-to-b from-[#007AFF] to-[#0055BB] rounded-[24px]">
      <div className="w-[50%]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Prime</h1>
        </div>
        <div className="mb-4">
          <h2 className="text-[40px] font-bold leading-[1.2]">
            Your business, better managed.
          </h2>
        </div>
        <div className="mb-4 opacity-90">
          <p className="text-lg leading-[1.6]">
            Experience the power of a unified platform designed to bring
            absolute precision to every stage of your accounting workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
