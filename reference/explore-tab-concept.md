!!! This is an experiment. Only use this file when explicitly told so and while working in the branch of the experiment itself.!!!

# Cursor Prompt: Mobile Explore — Full-Bleed Map with Floating UI

## Context

We're building a mobile Explore page for **Collection Toolbox (CT)** — a white-label cultural heritage collection browser. Two clients: **Archeo** (archaeological activities, map-first, list results) and **Etno** (ethnographic repository, grid-first with card thumbnails).

**Stack:** Vue 3 + Vite + TypeScript + Tailwind CSS + shadcn-vue

**Problem:** The current mobile Explore stacks a partial-height map above a scrollable results list. The map requires 2-finger scroll to avoid conflicting with page scroll. This is cumbersome. We want single-finger interaction everywhere.

**Solution:** Full-viewport map as the base layer, with all UI floating on top. A segmented tab control switches between Map view (map visible, interactive) and List view (results panel slides up and covers the map). No split viewport, no scroll conflicts.

---

## Design (from Figma mockup)

### Visual Reference

The design follows an "app-like" pattern similar to Apple Maps / Google Maps:

```
┌──────────────────────────────────┐
│         iOS Status Bar           │
├──────────────────────────────────┤
│                                  │
│  ┌─Filter─┐ ┌─Search EtnoExpl─┐ ☰│  ← Floating header over map
│  └────────┘ └─────────────────┘  │
│                                  │
│                                  │
│        FULL BLEED MAP            │  ← 100dvh, the entire viewport
│        (pins, clusters)          │
│                                  │
│                                  │
│                                  │
│                                  │
│                                  │
│     ┌─────────────────────┐      │
│     │  Map  │  List view  │      │  ← Floating pill segmented control
│     └─────────────────────┘      │
│                                  │
├──────────────────────────────────┤
│         Browser Chrome           │
└──────────────────────────────────┘
```

When "List view" is tapped, a results panel slides up from the bottom covering the map:

```
┌──────────────────────────────────┐
│         iOS Status Bar           │
├──────────────────────────────────┤
│  ┌─Filter─┐ ┌─Search EtnoExpl─┐ ☰│  ← Header stays in place
├──────────────────────────────────┤
│  Filter chips row (if active)    │
│  30 Objektov    Zoradiť podľa ▾ │
├──────────────────────────────────┤
│  ┌────────────┐ ┌────────────┐  │
│  │  Card 1    │ │  Card 2    │  │  ← Scrollable results grid
│  │  thumb     │ │  thumb     │  │     (Etno: 2-col grid / Archeo: list)
│  │  title     │ │  title     │  │
│  └────────────┘ └────────────┘  │
│  ┌────────────┐ ┌────────────┐  │
│  │  Card 3    │ │  Card 4    │  │
│  ...                             │
│     ┌─────────────────────┐      │
│     │  Map  │  List view  │      │  ← Tab control stays at bottom
│     └─────────────────────┘      │
└──────────────────────────────────┘
```

---

## Component Breakdown

### 1. MobileExploreView.vue (Page container)

The root layout for the mobile Explore page. Manages view state and composes all layers.

```
<template>
  <div class="mobile-explore">
    <!-- Layer 1: Map (always mounted, always full viewport) -->
    <MapLayer />

    <!-- Layer 2: Results panel (slides up when list view active) -->
    <ResultsPanel v-show="activeView === 'list'" />

    <!-- Layer 3: Floating UI (always visible on top) -->
    <FloatingHeader />
    <ViewSwitcher v-model="activeView" :resultCount="resultCount" />
  </div>
</template>
```

**CSS stacking:** All children are absolutely/fixed positioned. Map is the base layer. Results panel overlays it. Header and tab switcher float on top of everything via higher z-index.

```css
.mobile-explore {
  position: relative;
  width: 100%;
  height: 100dvh; /* dynamic viewport height — adapts to iOS Safari chrome */
  overflow: hidden;
}
```

### 2. MapLayer.vue

- **Position:** `position: absolute; inset: 0` — fills entire viewport.
- **Always mounted** — never use `v-if`, always `v-show` or just keep visible. Map is expensive to initialize and must retain its viewport/zoom/popup state when switching views.
- Full single-finger pan, pinch-to-zoom. No 2-finger restriction needed because the map owns the entire screen — there's no competing page scroll.
- Map pins with clustering:
  - **Archeo:** 3 pin color variants by locality type (red ✕-style markers as in the mockup), gray clusters with count badge.
  - **Etno:** Single green pin style, clusters.
- Tap pin → popup card: thumbnail, title, author, doc type badge, "Zobraziť detail ›" CTA button.
- Map controls (zoom +/−) positioned top-right, below the floating header (approximately `top: 72px; right: 16px`).
- Layer switcher (Archeo: Ortofoto / ZBGIS / DMR; Etno: standard basemap) — small floating control, bottom-left above the tab switcher.

### 3. FloatingHeader.vue

A transparent/blurred header bar floating over the map. From the mockup, left to right:

**Left: Filter button**

- Pill-shaped button: blue background (`#1A62FF`), white text, "+" icon + "Filter" label.
- Tap → opens full-screen filter `Sheet` sliding up from bottom (same filter sheet as current wireframes — this prompt does not redesign that).
- When filters are active, show a count badge on the pill: "+ Filter (3)".

**Center: Search bar**

- Rounded input field with search icon, placeholder: "Search **EtnoExplorer**" (or "Search **ArcheoExplorer**" per client).
- The bold client name in the placeholder doubles as branding.
- Background: `rgba(255, 255, 255, 0.9)` with `backdrop-filter: blur(8px)` — semi-transparent over the map.
- Tap → expand to full-width search overlay or open search Sheet.
- Magnifier icon left, clear/voice icon right (optional).

**Right: Menu button**

- Hamburger icon (☰), same blurred white pill/circle treatment as the search bar.
- Tap → opens navigation drawer from the right (same as current wireframes).

**Header container styling:**

```css
.floating-header {
  position: fixed;
  top: env(safe-area-inset-top, 0px); /* below iOS status bar */
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  /* NO background on the header bar itself — individual elements have their own bg */
}
```

Each element (filter pill, search bar, menu button) has its own background treatment so the map shows through between them.

### 4. ViewSwitcher.vue (Segmented Tab Control)

The floating pill at the bottom that switches between Map and List view. From the mockup:

- **Shape:** Pill-shaped (full rounded corners), 2 segments side by side.
- **Size:** approximately `width: 240px; height: 48px`, centered horizontally.
- **Position:** Fixed at bottom, above safe area: `bottom: calc(16px + env(safe-area-inset-bottom, 0px))`.
- **Active segment:** White/light background with primary blue border or fill. The mockup shows "Map" as active with a blue outline/background.
- **Inactive segment:** Gray/transparent text on the same pill background.
- **Background:** White pill with subtle shadow for visibility over the map: `background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.15); border: 1.5px solid #E5E5E5`.
- **Active indicator:** The active segment gets `background: white; border: 2px solid #1A62FF; border-radius: 999px` (pill within a pill), with blue text. Inactive segment has no border, gray text.

**Labels:**

- Left segment: "Map" (or "Mapa" in SK)
- Right segment: "List view" (or "Zoznam" in SK) — for Etno could also be "Grid" / "Mriežka"

**Interaction:**

- Tap to switch views. No swipe gesture — swipe is reserved for map panning / list scrolling.
- Animate the active indicator sliding between segments (subtle, ~200ms ease).
- `z-index: 40` — above everything including the results panel.

### 5. ResultsPanel.vue

When "List view" is active, this panel covers the map area below the header.

**Layout:**

```css
.results-panel {
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + 56px); /* below floating header */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20; /* above map, below header and tab switcher */
  background: #fafafa;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

**Content structure (top to bottom):**

1. **Active filter chips** (if any) — horizontal scrollable row with × dismiss. "Resetovať" link to clear all.
2. **Results bar** — result count ("30 Objektov") left, sort dropdown ("Zoradiť podľa ▾") right.
3. **Results content:**
   - **Etno:** 2-column grid of object cards (`ObjectCard.vue`). Each card: thumbnail (aspect-ratio 4:3 or 1:1), ID, title, author, doc type badge. Small "V mape" icon button on each card.
   - **Archeo:** Single-column list of activity rows (`ListCard.vue`). Each row: thumbnail, ID, title, dating badges, location. "V mape" link.
4. **Pagination:** Infinite scroll with loading skeleton, or "Načítať ďalšie" (Load more) button.

**Bottom padding:** The results list needs `padding-bottom: calc(80px + env(safe-area-inset-bottom))` so the last cards aren't hidden behind the floating tab switcher.

---

## Interaction Flows

### Map → List view

1. User taps "List view" segment.
2. `activeView` changes to `'list'`.
3. `ResultsPanel` becomes visible (slide-up animation, ~250ms ease-out).
4. Map stays mounted underneath but is covered and non-interactive.
5. If returning to list, restore previous scroll position.

### List → Map

1. User taps "Map" segment.
2. `ResultsPanel` hides (slide-down animation, ~200ms ease-in).
3. Map is revealed and immediately interactive. Retains previous center/zoom.
4. Store current results scroll position in a ref for later restore.

### "V mape" (Show on map) from a result card

1. User taps "V mape" icon/link on a result card.
2. Switch `activeView` to `'map'`.
3. Fly/animate the map to the object's coordinates.
4. Open the pin popup for that object.
5. Store `highlightedObjectId` so the pin appears selected/highlighted.

### Pin tap on map

1. User taps a pin on the map.
2. Popup card appears anchored to the pin: thumbnail, title, author, doc type, "Zobraziť detail ›" CTA.
3. Tapping CTA navigates to the Detail page (standard route push).

### Filter flow

1. User taps "+ Filter" pill in the header.
2. Full-screen `Sheet` slides up with filter groups (unchanged from current wireframe design).
3. User applies filters, sheet closes.
4. Filter chips appear in the results panel toolbar (visible when in list view).
5. Map pins update to reflect filtered results.
6. Filter pill shows count badge: "+ Filter (3)".
7. Result count updates.

---

## State Management

Use a composable `useExploreView()` or Pinia store:

```ts
interface ExploreViewState {
  // View
  activeView: "map" | "list";
  resultsScrollY: number; // stored when switching away from list

  // Filters & results
  filters: ActiveFilter[];
  resultCount: number;
  sortBy: string;
  sortOrder: "asc" | "desc";

  // Map
  mapCenter: [number, number]; // [lat, lng]
  mapZoom: number;
  highlightedObjectId: string | null; // set when navigating from "V mape"

  // Results
  results: CollectionObject[];
  isLoading: boolean;
  page: number;
}
```

---

## Implementation Notes

### Critical: `dvh` viewport units

Use `100dvh` (with `100vh` fallback) for the root container. On iOS Safari, the address bar appears/disappears and `dvh` adapts dynamically. Without this, the layout will either overflow or leave gaps.

```css
.mobile-explore {
  height: 100dvh;
  height: 100vh; /* fallback */
}
```

### Critical: Map persistence

The map component must use `v-show` (not `v-if`) or simply always be visible behind the results panel. Destroying and recreating the map on every tab switch would be expensive and lose the user's viewport state.

### Safe area handling

Add `viewport-fit=cover` to the HTML meta viewport tag:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

Then use `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for header and tab bar positioning on notched iPhones.

### Z-index stack

```
z-index: 10  — MapLayer (base)
z-index: 20  — ResultsPanel (covers map when active)
z-index: 30  — FloatingHeader (always on top)
z-index: 35  — Map controls (zoom buttons — above results panel, below header)
z-index: 40  — ViewSwitcher (always on top of everything)
z-index: 50  — Sheet overlays (filter sheet, search sheet, menu drawer)
```

### Animation

- Results panel enter: `transform: translateY(100%)` → `translateY(0)`, ~250ms ease-out.
- Results panel exit: `translateY(0)` → `translateY(100%)`, ~200ms ease-in.
- Tab active indicator: animated `left` position or `transform: translateX()`, ~200ms ease.
- Map fly-to on "V mape": use the map library's built-in flyTo animation (Leaflet/Mapbox).

### Touch handling

- **Map view:** All touch events pass through to the map. Single-finger pan, pinch zoom — no restrictions.
- **List view:** Standard single-finger vertical scroll on the results panel. The map underneath doesn't receive any touch events because the panel covers it.
- **Tab switcher:** Tap only, no swipe-between-tabs gesture (avoids conflicts with both map pan and list scroll).

---

## Design Tokens

| Token          | Value                         | Usage                                        |
| -------------- | ----------------------------- | -------------------------------------------- |
| Primary        | `#1A62FF`                     | Filter pill bg, active tab border/text, CTAs |
| White          | `#FFFFFF`                     | Tab pill bg, card bg, search bar bg          |
| Neutral 50     | `#FAFAFA`                     | Results panel bg                             |
| Neutral 200    | `#E5E5E5`                     | Borders, inactive elements                   |
| Neutral 500    | `#737373`                     | Inactive tab text, secondary text            |
| Neutral 900    | `#171717`                     | Primary text                                 |
| Radius pill    | `999px`                       | Tab switcher, filter pill, search bar        |
| Radius card    | `8px`                         | Result cards                                 |
| Shadow float   | `0 2px 12px rgba(0,0,0,0.15)` | Tab switcher, header elements                |
| Blur           | `backdrop-filter: blur(8px)`  | Search bar, menu button backgrounds          |
| Font UI        | `Inter`                       | All interface text                           |
| Font Data      | `Geist Mono`                  | IDs, coordinates, counts                     |
| Touch target   | `min 44×44px`                 | All interactive elements                     |
| Tab bar height | `48px`                        | ViewSwitcher                                 |
| Header height  | `56px` (including padding)    | FloatingHeader                               |

---

## Scope & What This Does NOT Cover

- **Filter sheet internals** — same as current wireframes, no redesign.
- **Detail page** — unchanged, navigated to from pin popup or card tap.
- **Desktop layout** — this is a mobile-only (<768px) redesign. Desktop keeps the current side-by-side layout.
- **Search sheet** — existing pattern, just triggered from the new floating search bar.
- **Map library choice** — prompt is agnostic; works with Leaflet, Mapbox GL, or Google Maps.
- **Specific pin icons** — the red ✕-style markers from the mockup need SVG assets; reference the Figma file for exact icons.

---

## Acceptance Criteria

- [ ] Map fills 100% of the viewport with single-finger pan (no 2-finger restriction)
- [ ] All UI (header, tabs) floats over the map with proper blur/shadow treatment
- [ ] Tab switcher is a centered floating pill at the bottom, above safe area
- [ ] Tapping "List view" slides up results panel covering the map
- [ ] Tapping "Map" slides results panel down, revealing map in its previous state
- [ ] Map instance is never destroyed/recreated between view switches
- [ ] Results scroll position is restored when returning to list view
- [ ] "V mape" on a card switches to map and flies to the correct pin
- [ ] Layout adapts to dynamic viewport changes (iOS Safari address bar)
- [ ] Filter pill shows active count badge when filters are applied
- [ ] Works at <768px width, respects safe-area-inset on notched devices
- [ ] Both Archeo (list) and Etno (grid) result variants work in the results panel

---

## Figma Reference

**File:** `https://www.figma.com/design/XcTN3nkBODbiFRfu0y6RZB/🟡-WIP?node-id=4040-3780`

Use Cursor's Figma MCP to pull design context directly:

```
@https://www.figma.com/design/XcTN3nkBODbiFRfu0y6RZB/%F0%9F%9F%A1-WIP?node-id=4040-3780&m=dev
```
