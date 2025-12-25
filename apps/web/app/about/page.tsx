import { UniversalLink } from "@sanchay/ui";

export default function AboutPage() {
  return (
    <div style={{ padding: 40, fontFamily: "var(--font-ibm-plex-sans)" }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>About Sanchay (Web)</h1>
      <p style={{ marginBottom: 20 }}>
        This is a dummy about page to verify routing.
      </p>

      <UniversalLink
        href="/"
        style={{ color: "#007AFF", textDecorationLine: "underline" }}
      >
        &larr; Back to Home
      </UniversalLink>
    </div>
  );
}
