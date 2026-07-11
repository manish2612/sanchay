
export const colorsOrangeLight = {
    // Base
    background: "hsl(210, 40%, 98%)",
    foreground: "hsl(222, 22%, 5%)", // Dark for text

    // Surfaces (Standard light mode surfaces)
    surface: "hsl(0, 0%, 100%)",
    surfaceVariant: "hsl(210, 40%, 96%)",
    surfaceVariantForeground: "hsl(222, 22%, 5%)",
    popover: "hsl(0, 0%, 100%)",
    popoverForeground: "hsl(222, 22%, 5%)",
    surfaceHover: "hsl(0, 0%, 96%)",
    surfaceActive: "hsl(0, 0%, 93%)",
    surfaceBorder: "hsl(0, 0%, 90%)",

    // Primary - Brand Orange #F27F0C
    // HSL: 30, 91%, 50% approx
    primary: "#F27F0C",
    primaryHover: "#F7AD19", // Yellow-Orange from palette
    primaryActive: "#D96C00", // Darker Orange
    primaryForeground: "hsl(0, 0%, 100%)",

    // Secondary - Light Blue #9FE7F5
    secondary: "#9FE7F5",
    secondaryHover: "#429EBD", // Medium Blue
    secondaryForeground: "hsl(222, 22%, 5%)",

    // Neutral
    muted: "hsl(210, 40%, 96%)",
    mutedForeground: "hsl(215, 16%, 47%)",

    // Borders / Focus
    border: "hsl(24, 32%, 91%)",
    input: "hsl(24, 32%, 91%)",
    focusRing: "hsl(24, 83%, 53%)", // Match Primary

    // States
    disabled: "hsl(214, 32%, 93%)",
    disabledForeground: "hsl(215, 16%, 65%)",
    outline: "hsl(214, 32%, 82%)",

    // Semantic
    success: "hsl(142, 71%, 45%)",
    successForeground: "hsl(0, 0%, 100%)",
    warning: "hsl(38, 92%, 50%)",
    warningForeground: "hsl(222, 22%, 5%)",
    danger: "hsl(0, 84%, 60%)",
    dangerForeground: "hsl(0, 0%, 100%)",
    info: "#429EBD", // Using Medium Blue from palette
    infoForeground: "hsl(0, 0%, 100%)",
};

export const colorsOrangeDark = {
    // Base - Deep Blue #053F5C
    background: "#053F5C",
    foreground: "hsl(0, 0%, 100%)",

    // Surfaces - Derived from Deep Blue
    surface: "#043249", // Darker
    surfaceVariant: "#032537",
    surfaceVariantForeground: "hsl(0, 0%, 100%)",
    popover: "#064C6E",
    popoverForeground: "hsl(0, 0%, 100%)",
    surfaceHover: "#064C6E", // Lighter
    surfaceActive: "#075980",
    surfaceBorder: "#086692",

    // Primary - Brand Orange #F27F0C
    primary: "#F27F0C",
    primaryHover: "#F7AD19", // Lighter Orange for Hover
    primaryActive: "#D96C00", // Darker for Active
    primaryForeground: "#053F5C", // Deep Blue text on Orange

    // Secondary - Medium Blue #429EBD
    secondary: "#429EBD",
    secondaryHover: "#9FE7F5", // Light Blue
    secondaryForeground: "hsl(0, 0%, 100%)",

    // Neutral - Adjusted for Deep Blue context
    muted: "#043249",
    mutedForeground: "#9FE7F5", // Light Blue text

    // Borders / Focus
    border: "#086692",
    input: "#086692",
    focusRing: "#F7AD19",

    // States
    disabled: "#043249",
    disabledForeground: "#086692",
    outline: "#064C6E",

    // Semantic
    success: "hsl(142, 71%, 45%)",
    successForeground: "hsl(0, 0%, 100%)",
    warning: "hsl(38, 92%, 50%)",
    warningForeground: "hsl(222, 22%, 5%)",
    danger: "hsl(0, 84%, 60%)",
    dangerForeground: "hsl(0, 0%, 100%)",
    info: "#9FE7F5", // Light Blue
    infoForeground: "#053F5C",
};
