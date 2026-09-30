# Design System: Oceanic Telemetry & Sonar AI
**Project:** SAMUDRARAKSHAK (Sonar AI Ocean Debris Detector)  
**Source:** Stitch Project `projects/13408505184457972433`  
**Theme:** High-Precision Deep-Sea Research Console & Bathymetric Telemetry  

---

## 1. Brand & Design Philosophy

The design system establishes a high-precision, technical aesthetic inspired by deep-sea research consoles, acoustic hydrophone telemetry, and naval bathymetric instrumentation. The core personality is authoritative, analytical, and luminous against deep oceanic voids.

* **Atmospheric Abyss:** Base surfaces mimic the bathypelagic zone—ultra-dark midnight tones (`#020E21` to `#0B192C`) that minimize eye fatigue in low-light vessel bridge environments while preserving maximum target contrast.
* **Bioluminescent Phosphor Highlights:** Crucial acoustic targets, anomaly contours, and confidence indicators emit sharp cyan (`#00F2FE`), hydro-teal (`#14B8A6`), and deep beacon blue (`#4FACFE`) pulses against the dark void.
* **Tactical Instrumentation:** Tight structural layouts, tabular numerical metrics, and delicate grid reticles evoke submarine sonar radar suites and vector signal processors.

---

## 2. Color Palette & Token Architecture

### 2.1 Core Palette

| Role | Token / Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Abyss Base** | `background` / `surface` | `#061426` | Deepest background layer |
| **Trench Zero** | `surface-container-lowest` | `#020E21` | Canvas base, viewport backdrop |
| **Sub-surface Layer 1** | `surface-container-low` | `#0E1C2F` | Sub-panels, docked sidebars |
| **Oceanic Container 2** | `surface-container` | `#132033` | Standard cards, telemetry widgets |
| **Elevated Surface** | `surface-container-high` | `#1D2A3E` | Modals, active cards, popovers |
| **Top Surface** | `surface-container-highest` | `#28354A` | Hover states, active tabs |
| **Primary Luminescence** | `primary` / `primary-container` | `#00F2FE` | Sonar Ping Cyan, key interactive CTA, high alerts |
| **Secondary Phosphor** | `secondary` | `#14B8A6` | Hydro-Teal, verified non-hazardous textures, normal status |
| **Tertiary Vector** | `tertiary` / `tertiary-fixed` | `#4FACFE` | Deep Beacon Blue, trajectory vectors, historical tracks |
| **Hazard Alert** | `error` / `debris-snag` | `#F43F5E` | Marine debris hazard, ghost net indicator, critical warning |
| **Acoustic Warning** | `warning` / `shadow-anomaly` | `#F59E0B` | Acoustic shadow anomaly, signal anomaly |
| **Success / Verified** | `success` | `#10B981` | Clean seafloor, system operational |

### 2.2 Neutral & Typography Colors

| Role | Hex Code | Usage |
| :--- | :--- | :--- |
| **Ice-White Text** | `#F0FDFA` / `#FFFFFF` | Headlines, primary metrics, high contrast zero-glare text |
| **On-Surface Text** | `#D6E3FE` | Standard body copy, labels, primary content |
| **On-Surface Variant** | `#B9CACB` | Secondary descriptions, subheadings |
| **Aero-Slate Muted** | `#64748B` – `#849495` | Inactive scales, watermarks, inactive tab indicators |
| **Outline Hairline** | `#3A494B` (`#06B6D4` @ 15–25%) | Hairline borders, grid lines, panel outlines |

---

## 3. Typography System

The typography system pairs industrial computation with rapid legibility in high-stress tactical environments.

### 3.1 Font Families
* **Display & Headlines:** `Space Grotesk`, sans-serif (cold, geometric, modern technical cadence)
* **Interface & Body:** `Inter`, sans-serif (neutral, high clarity neo-grotesque optimized for dense UI)
* **Telemetry & Coordinates:** `JetBrains Mono`, monospace (fixed-width tabular numbers for coordinates, kHz frequencies, confidence values)

### 3.2 Type Scale Specifications

| Style Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Space Grotesk | 48px | 700 (Bold) | 56px | -0.02em | Hero headers, splash titles |
| `display-lg-mobile`| Space Grotesk | 32px | 700 (Bold) | 40px | -0.01em | Mobile hero headers |
| `headline-xl` | Space Grotesk | 36px | 600 (SemiBold) | 44px | -0.01em | Section titles, dashboard headers |
| `headline-xl-mobile`| Space Grotesk | 26px | 600 (SemiBold) | 32px | 0em | Mobile section titles |
| `headline-lg` | Space Grotesk | 24px | 600 (SemiBold) | 32px | -0.01em | Panel headers, major card titles |
| `headline-md` | Space Grotesk | 20px | 500 (Medium) | 28px | 0em | Modal titles, sub-panel headers |
| `body-lg` | Inter | 16px | 400 (Regular) | 24px | 0em | Primary documentation, descriptions |
| `body-md` | Inter | 14px | 400 (Regular) | 20px | 0.01em | Default UI body copy, table text |
| `body-sm` | Inter | 12px | 400 (Regular) | 16px | 0.01em | Captions, secondary helper text |
| `label-telemetry` | JetBrains Mono | 13px | 500 (Medium) | 16px | 0.04em | Telemetry readouts, frequency (kHz) |
| `label-coord` | JetBrains Mono | 11px | 400 (Regular) | 14px | 0.06em | Lat/Long coordinates, depth ratings |
| `label-badge` | JetBrains Mono | 10px | 600 (SemiBold) | 12px | 0.08em | Confidence tags (`CONF: 98.4%`), status pills |

---

## 4. Spacing, Shapes & Corner Geometry

### 4.1 Spacing Scale

| Token | Value | Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| `space-xs` | `0.25rem` | 4px | Micro padding, badge internal gaps |
| `space-sm` | `0.5rem` | 8px | Button inline gaps, icon-to-text spacing |
| `space-md` | `1rem` | 16px | Card standard padding, grid row gap |
| `space-lg` | `1.5rem` | 24px | Panel gutter, section separation |
| `space-xl` | `2.5rem` | 40px | Major container margins, modal inset |
| `gutter` | `1rem` | 16px | Mobile viewport gutter |
| `gutter-desktop` | `1.5rem` | 24px | Desktop column gutter |
| `margin-desktop` | `2rem` | 32px | Screen border margin |

### 4.2 Shapes & Corner Radii

* **Profile:** Calibrated technical corner profile (`roundedness: 1` / `ROUND_FOUR`)
* `rounded-sm` (`0.125rem` / 2px): Checkboxes, micro status indicators
* `rounded-md` (`0.375rem` / 4px–6px): Precision toggles, slider thumbs, telemetry badges, inputs
* `rounded-lg` (`0.5rem` / 8px): Primary cards, modal viewports, waterfall container frames
* `rounded-xl` (`0.75rem` / 12px): Floating floating HUD overlays, main app header containers
* `rounded-full` (`9999px`): Circular status LED beacons, vessel position pings

---

## 5. Layout & Viewport Rules

### 5.1 Grid & Viewport Architecture
* **Desktop (`>1024px`):** 12-column dense fluid grid with `1.5rem` (`24px`) gutters.
* **Tablet (`768px – 1023px`):** 6-column responsive grid with `1rem` gutters.
* **Mobile (`<768px`):** 4-column compact stacked grid with `1rem` margins.

### 5.2 Tactical Operational Zones
1. **Anchor Canvas (Central Area):** Dedicated to high-resolution Side-Scan Sonar (SSS) imagery, waterfall viewer, bathymetric overlays, and bounding box visualizations.
2. **Docked Diagnostic Sidebar (`320px` to `400px`):** Collapsible panel containing real-time detection cards, confidence sliders, class distribution charts, and GPS telemetry.
3. **Edge-Pinned Telemetry Shelf:** Bottom/top ribbon displaying live acoustic frequency, towfish altitude, ping rate, vessel coordinates, and system health status.

---

## 6. Component Specifications

### 6.1 Buttons & Interactive Controls
* **Primary Action ("Scan / Run Detection"):**
  * Background: `linear-gradient(135deg, #00F2FE 0%, #06B6D4 100%)`
  * Text: `#030712` (Ultra-dark slate), `font-medium`, uppercase tracking
  * Hover: Box-shadow glow `0 0 16px rgba(0, 242, 254, 0.40)`
* **Secondary Action ("Filter / Export / Mode"):**
  * Background: Frosted glass container `rgba(11, 25, 44, 0.60)` with backdrop blur (`backdrop-blur-md`)
  * Border: `1px solid rgba(6, 182, 212, 0.25)`
  * Text: `#E2E8F0`
  * Hover: Border transitions to `rgba(0, 242, 254, 0.60)` with cyan inner radiance
* **Utility / Ghost:**
  * Borderless `#94A3B8` icon buttons transitioning to `#00F2FE` on hover.

### 6.2 Cards & Telemetry Panels
* **Structure:**
  * Background: Glassmorphic dark surface `rgba(8, 17, 32, 0.75)` with `backdrop-blur-md`
  * Border: `1px solid rgba(6, 182, 212, 0.18)`
  * Header: Monospace coordinate header with sensor source ID, timestamp, and status beacon
* **Active Detection Card:**
  * Selected state pulses with `rgba(0, 242, 254, 0.50)` border and illuminated crosshairs.

### 6.3 Chips & Badges
* **Confidence Badge:**
  * Font: `JetBrains Mono`, `text-[10px]`, `font-semibold`
  * Fill: `rgba(0, 242, 254, 0.08)`
  * Border: `1px solid rgba(0, 242, 254, 0.30)`
  * Text: `#00F2FE`
* **Hazard Alert Badge (Ghost Net / Obstacle):**
  * Fill: `rgba(244, 63, 94, 0.12)`
  * Border: `1px solid rgba(244, 63, 94, 0.45)`
  * Text: `#FECDD3`

### 6.4 Inputs, Sliders & Forms
* **Input Field:** `bg-[#030712]/80`, `border border-slate-700/60`, focus ring `border-cyan-400` with subtle cyan glow. JetBrains Mono font for numerical thresholds, latitudes, and frequencies.
* **Gain & Threshold Sliders:** `2px` slate rail (`#1E293B`) with `#00F2FE` active track, faceted rectangular thumb with cyan glow.

### 6.5 Domain-Specific Sonar Visualizers
* **Bounding Box Reticle:** Translucent vector boxes framing detected seabed targets with corner bracket reticles, depth tag (e.g., `-142.4M`), and classification badge (`NET-SYNTHETIC-94%`).
* **Acoustic Signal Meter:** Segmented LED visualizer transitioning from `#14B8A6` (nominal baseline) to `#00F2FE` (acoustic highlight) and `#F43F5E` (saturation/clipping).
