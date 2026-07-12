export const colors = {
    // Base
    background: "#F6F7ED", // Praxeti White
    foreground: "#001F3F", // Midnight Mirage

    // Surfaces (Using Alpha of Midnight Mirage for shading)
    surface: "#FFFFFF",
    surfaceVariant: "rgba(0, 31, 63, 0.05)", // 5% Midnight Mirage
    surfaceVariantForeground: "#001F3F",
    popover: "#FFFFFF",
    popoverForeground: "#001F3F",
    surfaceHover: "rgba(0, 31, 63, 0.08)",
    surfaceActive: "rgba(0, 31, 63, 0.12)",
    surfaceBorder: "rgba(0, 31, 63, 0.15)",

    // Primary - Nuit Blanche (Vibrant Blue)
    primary: "#1E488F",
    primaryHover: "rgba(30, 72, 143, 0.9)", 
    primaryActive: "rgba(30, 72, 143, 0.8)", 
    primaryForeground: "#FFFFFF",

    // Secondary - Alpha of Nuit Blanche (Whisper quiet)
    secondary: "rgba(30, 72, 143, 0.1)", // 10% Nuit Blanche
    secondaryHover: "rgba(30, 72, 143, 0.15)",
    secondaryForeground: "#1E488F", // Nuit Blanche text

    // Neutral (Alpha of Midnight Mirage)
    muted: "rgba(0, 31, 63, 0.05)",
    mutedForeground: "rgba(0, 31, 63, 0.6)",

    // Borders / Focus
    border: "rgba(0, 31, 63, 0.15)",
    input: "rgba(0, 31, 63, 0.2)",
    focusRing: "rgba(30, 72, 143, 0.5)", // Nuit Blanche Glow

    // States
    disabled: "rgba(0, 31, 63, 0.05)",
    disabledForeground: "rgba(0, 31, 63, 0.4)",
    outline: "rgba(0, 31, 63, 0.25)",

    // Semantic (Derived from array where possible)
    success: "#74C365", // Mantis
    successForeground: "#001F3F",
    warning: "#DBE64C", // First Colors of Spring
    warningForeground: "#001F3F",
    danger: "#E74C3C", // Universal standard red required for destructive actions
    dangerForeground: "#FFFFFF",
    info: "#1E488F", // Nuit Blanche
    infoForeground: "#FFFFFF",

    // Primary Action (Specialized CTA)
    actionPrimary: "#00804C", // Picture Book Green
    actionPrimaryHover: "rgba(0, 128, 76, 0.9)",
    actionPrimaryForeground: "#FFFFFF",
};
