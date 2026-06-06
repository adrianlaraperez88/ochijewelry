# Ochi Jewelry — Brand Guidelines & Style Guide

Welcome to the official Brand Guidelines for **Ochi Jewelry**. This document serves as the single source of truth for the Ochi Jewelry design system, defining the visual identity, typography, color palette, UI patterns, and styling tokens.

---

## 1. Brand Identity & Personality

Ochi Jewelry stands for elegance, quality, and expert craftsmanship. The design system reflects a **premium, luxury aesthetic** through minimal layouts, high-contrast gold accents against dark backdrops, refined serif headings, and glassmorphism elements.

---

## 2. Color Palette

Our colors define the luxury and precision of our brand. Use these exact color variables defined in `src/styles.scss`:

### Primary Brand Colors
*   **Gold (Brand Primary)**
    *   **Hex:** `#C9A84C`
    *   **Variable:** `--color-gold`
    *   **Usage:** Primary buttons, icons, section labels, borders of highlighted components.
*   **Light Gold**
    *   **Hex:** `#E8C96D`
    *   **Variable:** `--color-gold-light`
    *   **Usage:** Hover states for primary gold buttons.
*   **Dark Gold**
    *   **Hex:** `#9A7A30`
    *   **Variable:** `--color-gold-dark`
    *   **Usage:** Gradients, secondary highlights, borders.
*   **Gold Muted (15% Alpha)**
    *   **RGBA:** `rgba(201, 168, 76, 0.15)`
    *   **Variable:** `--color-gold-muted`
    *   **Usage:** Card backgrounds, button hover states.

### Background Colors
*   **Deep Obsidian (Main Background)**
    *   **Hex:** `#0A0A0A`
    *   **Variable:** `--color-black`
    *   **Usage:** Default body background.
*   **Obsidian Dark**
    *   **Hex:** `#111111`
    *   **Variable:** `--color-dark`
    *   **Usage:** Secondary sections (e.g. features/services grids).
*   **Obsidian Accent**
    *   **Hex:** `#1A1A1A` / `#222222` / `#2A2A2A`
    *   **Variables:** `--color-dark-2` / `--color-dark-3` / `--color-dark-4`
    *   **Usage:** Component cards, borders, input fields.

### Text Colors
*   **Alabaster (Main Text)**
    *   **Hex:** `#F5F0E8`
    *   **Variable:** `--color-text`
    *   **Usage:** Titles, body copy, active text.
*   **Muted Alabaster (60% Alpha)**
    *   **RGBA:** `rgba(245, 240, 232, 0.6)`
    *   **Variable:** `--color-text-muted`
    *   **Usage:** Secondary body text, descriptions.
*   **Dim Alabaster (35% Alpha)**
    *   **RGBA:** `rgba(245, 240, 232, 0.35)`
    *   **Variable:** `--color-text-dim`
    *   **Usage:** Placeholders, inactive items.

---

## 3. Typography

Ochi Jewelry combines an elegant, high-end serif typeface for headings with a clean, highly readable sans-serif typeface for body copy.

### Display Typeface (Headings)
*   **Font Family:** `'Cormorant Garamond', Georgia, serif`
*   **Variable:** `--font-display`
*   **Weight:** `300` (Light), `400` (Regular), `600` (Semi-Bold)
*   **Usage:** Used for `h1`, `h2`, `h3`, `h4` page and section headers. Regular weight, spacious letter spacing (`0.02em`), and low line height.

### Body Typeface (UI & Copy)
*   **Font Family:** `'Inter', system-ui, -apple-system, sans-serif`
*   **Variable:** `--font-body`
*   **Weight:** `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-Bold)
*   **Usage:** Used for general body copy, navigation, buttons, and form controls.

---

## 4. Spacing System

Layouts should feel open, clean, and balanced. Avoid cluttering elements.

| Variable | Value | Usage |
| :--- | :--- | :--- |
| `--spacing-xs` | `0.5rem` (8px) | Small labels, card padding details |
| `--spacing-sm` | `1.0rem` (16px) | Inner card padding, text spacing |
| `--spacing-md` | `1.5rem` (24px) | Card gaps, grid spacing |
| `--spacing-lg` | `2.5rem` (40px) | Container margins, header spacing |
| `--spacing-xl` | `4.0rem` (64px) | Section spacing, layout transitions |
| `--spacing-2xl` | `6.0rem` (96px) | Main section padding, large hero heights |
| `--spacing-3xl` | `8.0rem` (128px) | Landing page margins, large header padding |

---

## 5. UI Elements & Layout Guidelines

### 5.1 Glassmorphism Cards (`.glass-card`)
Cards should feel floating, semi-translucent, and layered over background glows.
*   **Background:** `rgba(255, 255, 255, 0.04)`
*   **Borders:** `1px solid var(--color-border)` (20% gold opacity)
*   **Backdrop Filter:** `blur(12px)`
*   **Hover State:** Transition borders to `50%` gold opacity, background to `6%` opacity, and add `--shadow-gold`.

### 5.2 Buttons
*   **Primary Button (`.btn-primary`)**
    *   **Shape:** Pill (`--radius-pill`)
    *   **Color:** Gold-to-Dark Gold linear gradient.
    *   **Hover:** Translate `-2px` vertically, transition to Light Gold gradient, increase shadow.
*   **Outline Button (`.btn-outline`)**
    *   **Shape:** Pill (`--radius-pill`)
    *   **Color:** Transparent background, `1px solid var(--color-border-hover)` (50% gold).
    *   **Hover:** Translate `-2px` vertically, change background to `15%` gold opacity, change border to primary gold.

### 5.3 Micro-Animations
All interactive items should transition smoothly using CSS keyframes:
*   `fadeInUp`: Moves elements upwards from 30px with opacity (0.7s duration).
*   `float`: Seamless floating motion for icons and visual components.
*   `shimmer`: Smooth reflection effects.
