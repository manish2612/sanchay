"use client";
import React from "react";
import { ComponentDemos } from "./components/ComponentDemos";

export default function Home() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ComponentDemos />;
}
