"use client";
import React from "react";
import { NavDemo } from "@prime/ui";
import { useRouter } from "next/navigation";

export function NavDemoWrapper() {
  const router = useRouter();

  return (
    <div className="bg-surface shadow-sm rounded-lg border border-[#222222] overflow-hidden">
      <NavDemo onLoginPress={() => router.push("/login")} />
    </div>
  );
}
