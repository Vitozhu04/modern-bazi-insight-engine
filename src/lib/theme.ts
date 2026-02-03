export const theme = {
  colors: {
    brand: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      accent: "hsl(var(--accent))",
    },
    surface: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: "hsl(var(--card))",
      muted: "hsl(var(--muted))",
    },
    ui: {
      border: "hsl(var(--border))",
      ring: "hsl(var(--ring))",
    },
  },
  typography: {
    fonts: {
      sans: "var(--font-sans)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)",
    },
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    leading: {
      tight: "1.2",
      normal: "1.5",
      relaxed: "1.7",
    },
    tracking: {
      tight: "-0.01em",
      normal: "0em",
      wide: "0.02em",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
} as const;
