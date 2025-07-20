# TicketMax Centralized Background Color System

## Overview

This documentation explains the centralized background color configuration system implemented for consistent, reusable,
and maintainable styling across the TicketMax application.

## Key Benefits

- **Consistency**: All background colors are defined in one place
- **Reusability**: Shared color system across all components
- **Maintainability**: Update colors globally by changing values in a single file
- **Theme Support**: Built-in light/dark mode support
- **Type Safety**: TypeScript utilities for programmatic access

## System Architecture

### 1. CSS Custom Properties (`src/index.css`)

The foundation of the system uses CSS custom properties (variables) defined in the root configuration:

```css
:root {
    /* Standard backgrounds */
    --background: oklch(1 0 0);
    --card: oklch(1 0 0);

    /* Custom app backgrounds */
    --app-gradient: linear-gradient(to bottom right, rgb(15 23 42), rgb(88 28 135), rgb(15 23 42));
    --app-surface: rgb(255 255 255 / 0.05);
    --app-surface-hover: rgb(255 255 255 / 0.1);
    --app-glass: rgb(255 255 255 / 0.05);
    --app-glass-hover: rgb(255 255 255 / 0.1);
}
```

### 2. Utility Classes

Custom Tailwind CSS utility classes for easy application:

```css
.bg-app-gradient {
    background: var(--app-gradient);
}

.bg-app-surface {
    background: var(--app-surface);
    backdrop-filter: blur(12px);
}

.bg-app-glass {
    background: var(--app-glass);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(255 255 255 / 0.1);
}
```

### 3. TypeScript Utilities (`src/lib/colors.ts`)

Programmatic access to colors with type safety:

```typescript
import {colors, backgroundClasses, themes, applyTheme} from '@/lib/colors';

// Use predefined color values
const bgColor = colors.appGradient;

// Use Tailwind classes
const className = backgroundClasses.gradient;

// Apply themes programmatically
applyTheme('dark');
```

## Usage Guide

### Using Tailwind Classes (Recommended)

```tsx
// Main gradient background
<div className="bg-app-gradient">

    // Glass effect surfaces
    <div className="bg-app-glass">

        // Interactive surfaces
        <div className="bg-app-surface hover:bg-app-surface-hover">
```

### Using TypeScript Utilities

```tsx
import {colors, backgroundClasses} from '@/lib/colors';

// In styled components or inline styles
<div style={{background: colors.appGradient}}>

    // Dynamic class assignment
    <div className={backgroundClasses.glass}>
```

### Available Background Classes

| Class Name             | Purpose                | Visual Effect                    |
|------------------------|------------------------|----------------------------------|
| `bg-app-gradient`      | Main page backgrounds  | Purple-blue gradient             |
| `bg-app-surface`       | Card/panel backgrounds | Semi-transparent with blur       |
| `bg-app-surface-hover` | Hover states           | Slightly more opaque             |
| `bg-app-glass`         | Glass morphism effect  | Transparent with border and blur |
| `bg-app-glass-hover`   | Glass hover states     | Enhanced glass effect            |

## Theme Configuration

### Light vs Dark Mode

The system automatically adjusts colors based on the theme:

```css
/* Light mode */
:root {
    --app-surface: rgb(0 0 0 / 0.05);
    --app-glass: rgb(255 255 255 / 0.8);
}

/* Dark mode */
.dark {
    --app-surface: rgb(255 255 255 / 0.05);
    --app-glass: rgb(255 255 255 / 0.1);
}
```

### Custom Theme Creation

Add new themes by extending the configuration:

```typescript
// In src/lib/colors.ts
export const themes = {
    light: { /* light theme colors */},
    dark: { /* dark theme colors */},
    custom: {
        '--app-gradient': 'linear-gradient(to bottom right, red, blue)',
        '--app-surface': 'rgb(255 0 0 / 0.1)',
        // ... other custom colors
    }
} as const;
```

## Migration Guide

### Converting Hardcoded Backgrounds

Replace hardcoded background styles with centralized classes:

**Before:**

```tsx
<div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
```

**After:**

```tsx
<div className="bg-app-gradient">
    <Card className="bg-app-glass">
```

### Updated Components

The following components have been migrated to use the centralized system:

- `src/pages/Home.tsx`
- `src/pages/Events.tsx`
- `src/pages/auth/Register.tsx`
- `src/pages/OrganizerOnboarding.tsx`

## Customization

### Updating Colors Globally

To change the app's color scheme, update the CSS variables in `src/index.css`:

```css
:root {
    /* Change the main gradient */
    --app-gradient: linear-gradient(to bottom right, #your-color1, #your-color2, #your-color3);

    /* Adjust surface opacity */
    --app-surface: rgb(255 255 255 / 0.08); /* More opaque */

    /* Modify glass effect */
    --app-glass: rgb(255 255 255 / 0.12);
}
```

### Adding New Background Variants

1. Add the CSS variable to `:root` and `.dark` in `src/index.css`
2. Create a utility class in the `@layer utilities` section
3. Export the new color in `src/lib/colors.ts`
4. Add the class name to `backgroundClasses`

Example:

```css
/* In src/index.css */
:root {
    --app-accent: rgb(147 51 234 / 0.2);
}

.bg-app-accent {
    background: var(--app-accent);
}
```

```typescript
// In src/lib/colors.ts
export const colors = {
    // ...existing colors
    appAccent: 'var(--app-accent)',
} as const;

export const backgroundClasses = {
    // ...existing classes
    accent: 'bg-app-accent',
} as const;
```

## Best Practices

1. **Always use centralized classes** instead of hardcoded values
2. **Test both light and dark themes** when adding new backgrounds
3. **Consider accessibility** - ensure sufficient contrast ratios
4. **Use semantic naming** for new background variants
5. **Document new additions** in this file

## Troubleshooting

### Colors Not Applying

1. Check if CSS custom properties are defined in both `:root` and `.dark`
2. Verify utility classes are created in the `@layer utilities` section
3. Ensure Tailwind CSS is processing the new classes

### Theme Switching Issues

1. Verify theme classes are being applied to the document element
2. Check if CSS variables are properly scoped
3. Use browser dev tools to inspect computed styles

## Future Enhancements

- [ ] Add color palette generator for brand consistency
- [ ] Implement CSS-in-JS support for dynamic theming
- [ ] Create visual style guide component
- [ ] Add animation presets for background transitions
- [ ] Integrate with design tokens system
