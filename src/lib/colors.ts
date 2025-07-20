/**
 * Centralized color configuration for the TicketMax app
 * This file provides programmatic access to CSS custom properties
 * for consistent color usage across components
 */

export const colors = {
    // Main backgrounds
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",

    // Card backgrounds
    card: "hsl(var(--card))",
    cardForeground: "hsl(var(--card-foreground))",

    // App-specific backgrounds
    appGradient: "var(--app-gradient)",
    appSurface: "var(--app-surface)",
    appSurfaceHover: "var(--app-surface-hover)",
    appGlass: "var(--app-glass)",
    appGlassHover: "var(--app-glass-hover)",

    // Theme colors
    primary: "hsl(var(--primary))",
    primaryForeground: "hsl(var(--primary-foreground))",
    secondary: "hsl(var(--secondary))",
    secondaryForeground: "hsl(var(--secondary-foreground))",
    muted: "hsl(var(--muted))",
    mutedForeground: "hsl(var(--muted-foreground))",
    accent: "hsl(var(--accent))",
    accentForeground: "hsl(var(--accent-foreground))",

    // Utility colors
    destructive: "hsl(var(--destructive))",
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
} as const;

/**
 * Tailwind CSS class names for consistent background usage
 */
export const backgroundClasses = {
    // Standard backgrounds
    default: "bg-background",
    card: "bg-card",
    muted: "bg-muted",
    accent: "bg-accent",
    primary: "bg-primary",
    secondary: "bg-secondary",

    // App-specific backgrounds
    gradient: "bg-app-gradient",
    surface: "bg-app-surface",
    surfaceHover: "bg-app-surface-hover",
    glass: "bg-app-glass",
    glassHover: "bg-app-glass-hover",

    // Legacy support for gradients (will be replaced with centralized versions)
    legacyGradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
} as const;

/**
 * Get a CSS custom property value at runtime
 */
export const getCSSVariable = (variable: string): string => {
    if (typeof window !== "undefined") {
        return getComputedStyle(document.documentElement).getPropertyValue(variable);
    }
    return "";
};

/**
 * Set a CSS custom property value at runtime
 * Useful for dynamic theme switching
 */
export const setCSSVariable = (variable: string, value: string): void => {
    if (typeof window !== "undefined") {
        document.documentElement.style.setProperty(variable, value);
    }
};

/**
 * Theme configuration object for easy theme switching
 */
export const themes = {
    light: {
        "--app-gradient": "linear-gradient(to bottom right, rgb(248 250 252), rgb(233 213 255), rgb(248 250 252))",
        "--app-surface": "rgb(0 0 0 / 0.05)",
        "--app-surface-hover": "rgb(0 0 0 / 0.1)",
        "--app-glass": "rgb(255 255 255 / 0.8)",
        "--app-glass-hover": "rgb(255 255 255 / 0.9)",
    },
    dark: {
        "--app-gradient": "linear-gradient(to bottom right, rgb(15 23 42), rgb(88 28 135), rgb(15 23 42))",
        "--app-surface": "rgb(255 255 255 / 0.05)",
        "--app-surface-hover": "rgb(255 255 255 / 0.1)",
        "--app-glass": "rgb(255 255 255 / 0.1)",
        "--app-glass-hover": "rgb(255 255 255 / 0.15)",
    },
} as const;

/**
 * Apply a theme programmatically
 */
export const applyTheme = (theme: keyof typeof themes): void => {
    const themeColors = themes[theme];
    Object.entries(themeColors).forEach(([variable, value]) => {
        setCSSVariable(variable, value);
    });
};
