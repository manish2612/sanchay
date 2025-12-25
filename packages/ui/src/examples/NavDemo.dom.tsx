"use client";
import React from "react";
import { UniversalLink } from "../primitives/Link";
import { Button } from "../primitives/Button";

interface NavDemoProps {
  onLoginPress: () => void;
}

export const NavDemo = ({ onLoginPress }: NavDemoProps) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Routing Strategy Demo</h2>

      <div style={styles.section}>
        <h3 style={styles.subtitle}>1. Universal Link (SEO Friendly)</h3>
        <p style={styles.description}>
          Uses &lt;UniversalLink&gt;. Renders &lt;a&gt; on Web, Link on Native.
        </p>
        <UniversalLink href="/about" style={styles.link as any}>
          Go to About Page (Link)
        </UniversalLink>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <h3 style={styles.subtitle}>2. Callback Pattern (Interactive)</h3>
        <p style={styles.description}>
          Uses Button + Callback. App Shell handles router.push().
        </p>
        <Button variant="primary" onClick={onLoginPress}>
          Go to Login (Button)
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.1)",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: 0,
    color: "inherit",
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: 0,
    color: "inherit",
  },
  description: {
    fontSize: "14px",
    opacity: 0.7,
    margin: "0 0 8px 0",
    color: "inherit",
  },
  link: {
    color: "#007AFF",
    fontSize: "16px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(0,0,0,0.1)",
    margin: "8px 0",
  },
};
