# Styling Guide for UI Components

This document contains essential styling information for maintaining consistency across the application's UI components.

---

## Color Palette

All admin UI components use the following CSS custom properties (defined in `src/app/globals.css`):

### Admin Sidebar Variables

```css
--admin-sidebar-bg: #FAFAF8;              /* Light warm gray background */
--admin-sidebar-bg-secondary: #F5F4F0;    /* Slightly darker secondary background */
--admin-sidebar-fg: #1A1A18;              /* Primary text color (dark gray) */
--admin-sidebar-fg-muted: #7A7A74;        /* Muted/secondary text color */
--admin-sidebar-accent: #C9A227;          /* Gold accent color */
--admin-sidebar-accent-soft: #F5EFC6;     /* Soft gold accent */
--admin-sidebar-border: #E5E4E0;          /* Border color */
--admin-sidebar-card: #FFFFFF;            /* Card background (white) */
--admin-sidebar-success: #4A7C59;         /* Success state green */
--admin-sidebar-warning: #B8860B;         /* Warning state gold */
--admin-sidebar-danger: #9B4444;          /* Error/danger state red */
```

### Font Variables

```css
--admin-sidebar-font-display: 'Cormorant Garamond', serif;  /* Display/headings font */
--admin-sidebar-font-sans: 'Outfit', sans-serif;            /* Body text font */
```

---

## Typography

### Font Families

1. **Outfit** (Sans-serif)
   - Used for: Body text, navigation items, labels, buttons
   - Weights: 200, 300, 400, 500, 600
   - Import from Google Fonts

2. **Cormorant Garamond** (Serif)
   - Used for: Logo, headings, stat values, decorative elements
   - Weights: 300, 400, 600 (and italic 300)
   - Import from Google Fonts

### Font Usage Pattern

```css
/* Body text */
font-family: var(--admin-sidebar-font-sans);
font-weight: 300; /* light */

/* Display/Heading text */
font-family: var(--admin-sidebar-font-display);
font-weight: 300; /* light */
```

---

## CSS Module Conventions

### File Naming

- Use `.module.css` extension for CSS Modules
- Name files after component: `ComponentName.module.css`

### Variable Naming Pattern

For new admin components, follow this naming convention:

```css
--admin-[component]-[property]
```

Example for a future admin header component:
```css
--admin-header-bg
--admin-header-fg
--admin-header-border
```

### Import Pattern

```tsx
import styles from "./ComponentName.module.css";

// Usage
<div className={styles.className}>
```

---

## Common Styling Patterns

### Sidebar Navigation Item

```css
.navItem {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 300;
  color: var(--admin-sidebar-fg-muted);
  transition: all 0.3s ease;
}

/* Active indicator bar */
.navItem::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: var(--admin-sidebar-accent);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.navItem:hover::before,
.navItemActive::before {
  transform: scaleY(1);
}

.navItem:hover,
.navItemActive {
  background-color: var(--admin-sidebar-bg-secondary);
  color: var(--admin-sidebar-fg);
}
```

### Logo Styling

```css
.logo {
  font-family: var(--admin-sidebar-font-display);
  font-size: 24px;
  color: var(--admin-sidebar-accent);
}

.logoStrong {
  font-weight: 600;
}

.logoLight {
  font-weight: 300;
}
```

### User Avatar

```css
.userAvatar {
  width: 40px;
  height: 40px;
  background-color: var(--admin-sidebar-bg-secondary);
  font-family: var(--admin-sidebar-font-display);
  font-size: 18px;
}
```

---

## Animation & Transitions

### Standard Transition Timing

```css
/* Smooth easing */
transition: all 0.3s ease;

/* Cubic-bezier for more refined motion */
transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
```

### Hover Effects

- Background color changes: `0.2s - 0.3s ease`
- Transform effects: `0.3s - 0.4s cubic-bezier(0.16, 1, 0.3, 1)`
- Accent bar animation: `0.3s ease`

### Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Focus States

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--admin-sidebar-accent);
  outline-offset: 2px;
}
```

---

## Scrollbar Styling

```css
.customScroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.customScroll::-webkit-scrollbar-track {
  background: var(--admin-sidebar-bg);
}

.customScroll::-webkit-scrollbar-thumb {
  background: var(--admin-sidebar-border);
}

.customScroll::-webkit-scrollbar-thumb:hover {
  background: var(--admin-sidebar-fg-muted);
}
```

---

## Layout Patterns

### Sidebar Layout

```css
.sidebar {
  width: 260px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  background-color: var(--admin-sidebar-card);
  border-right: 1px solid var(--admin-sidebar-border);
}

.mainContent {
  margin-left: 260px; /* Match sidebar width */
}
```

### Collapsible Sidebar

```css
.sidebarCollapsed {
  width: 80px;
}

.sidebarCollapsed .navText,
.sidebarCollapsed .logoText,
.sidebarCollapsed .userInfo {
  opacity: 0;
  visibility: hidden;
}
```

---

## Sharp Edges Policy

This design uses **sharp edges** (no border-radius):

```css
* {
  border-radius: 0 !important;
}
```

---

## Grain Texture Overlay (Optional)

For subtle texture effect:

```css
.grainOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.02;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

---

## File Structure

```
src/
├── app/
│   ├── globals.css          ← Global CSS variables (add admin-sidebar-* here)
│   └── (admin)/
│       └── admin/
│           └── layout.tsx   ← Admin layout with sidebar
├── components/
│   └── Admin/
│       ├── AdminSidebar.tsx
│       ├── AdminSidebar.module.css
│       └── admin.html       ← Reference HTML design
└── important/
    └── Styling.md          ← This file
```

---

## Quick Reference: Matching the HTML Design

When implementing new admin components:

1. **Check `admin.html`** for the reference design
2. **Use CSS variables** from `globals.css` (admin-sidebar-*)
3. **Apply correct fonts**: Outfit for body, Cormorant Garamond for display
4. **Match spacing**: Use consistent padding (12px, 16px, 24px)
5. **Include hover states**: Background + accent bar for nav items
6. **Add transitions**: 0.3s ease for most interactions
7. **Sharp edges**: No border-radius anywhere
8. **Focus states**: 2px accent outline

---

## Common Mistakes to Avoid

❌ Using Tailwind colors directly (use CSS variables)
❌ Forgetting font-family declarations
❌ Adding border-radius (design uses sharp edges)
❌ Missing hover/active states
❌ Skipping reduced-motion media query
❌ Using wrong variable prefix (use `--admin-sidebar-*` not `--admin-*`)

---

## Resources

- **Google Fonts**: 
  - [Outfit](https://fonts.google.com/specimen/Outfit)
  - [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- **Reference HTML**: `src/components/Admin/admin.html`
- **Sidebar Component**: `src/components/Admin/AdminSidebar.tsx`
- **Sidebar Styles**: `src/components/Admin/AdminSidebar.module.css`
