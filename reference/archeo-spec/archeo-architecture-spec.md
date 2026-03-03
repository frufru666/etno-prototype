### Prompt I used for Figma Make to generate this spec:

- I need to do a fork of this app for a different client, ethnologists that have a different set of requirements, but 90% of the app is the same. Can you generate a specification of how the app works in terms of layout, interaction, concept of object viewers in terms of desktop and layout, how they open and how they are closed on a component level? I intend to have this as a boilerplate for a different repo I work on with cursor using shadcn components. Dont integrate it into the product, just write it out here in a way that is the best for Cursor to parse and develop upon.

## Live version

[ct-shacdn-proto](https://gold-lyric-22170302.figma.site/)

## **Archeo Explorer — Architecture & Interaction Specification**

Use this as a Cursor boilerplate spec. Replace domain-specific terms (archaeological) with your domain. All components use **shadcn/ui** primitives, **Tailwind CSS v4**, **Leaflet** maps, **React Router v7 (data mode)**, and **lucide-react** icons.

---

### **TECH STACK & DEPENDENCIES**

```
react 18, react-router 7 (data mode with createBrowserRouter + RouterProvider),
tailwind css v4, shadcn/ui components (radix primitives), lucide-react icons,
leaflet (maps), sonner (toasts), motion (animations if needed)
```

Responsive breakpoint: `useIsMobile()` hook at **768px** (`window.matchMedia`). Returns boolean. Every component conditionally renders desktop vs mobile layout based on this hook.

---

### **ROUTING**

```
/                → ExplorerPage (list + map view)
/detail/:id      → DetailPage (single record view)
```

No layout wrapper route — each page owns its own navbar. Navigation between pages: `useNavigate()` from react-router. Detail links from Explorer use `navigate(/detail/${record.id})`. Back button in Detail uses `navigate("/")`.

---

### **GLOBAL LAYOUT PATTERN**

**Navbar** (`TopNav` / `DetailTopNav`):

- `fixed top-0 left-0 right-0 z-50`, white bg, border-bottom
- Height: **57px** (desktop) / **49px** (mobile)
- 3-column layout: left action | center branding (absolutely centered) | right actions
- Mobile: hamburger → `Sheet` (shadcn) slide-in from right for menu
- Desktop: inline buttons

Content sits below navbar via `paddingTop: navHeight`.

---

### **PAGE 1: EXPLORER (List + Map)**

**Layout structure:**

```
┌─────────────────────────────────────────┐
│  TopNav (fixed)                         │
├─────────────────────────────────────────┤
│  FilterSidebar │   MapView              │  ← map fills viewport height
│  (fixed, left) │   (full width)         │
│                │                        │
├────────────────┴────────────────────────┤
│  FilterChips (active filter pills)      │
│  ResultsTable (scrolls with page)       │
│  Footer                                │
└─────────────────────────────────────────┘
```

**State management (ExplorerPage):**

```tsx
filterOpen: boolean          // persisted to sessionStorage
subViewOpen: boolean         // tracks if filter sub-panel is open (desktop)
activeFilters: Record<string, string[]>  // key=field, value=selected values
```

Filter state is also readable from URL query params (`?filter=key:value`) — parsed on mount, then cleared from URL. This enables cross-linking from Detail page ("show all records with this value").

**Filtered data flow:**

```
ACTIVITIES (all mock data)
  → filteredActivities = useMemo(filter by activeFilters)
    → passed to MapView (pins)
    → passed to ResultsTable (rows/cards)
```

### **FilterSidebar**

**Desktop** (`DesktopFilterContent`):

- Two side-by-side floating panels, both `fixed left-3`, stacked horizontally
- Panel 1 (280px): Category list with section labels (icon + text) and FilterItem buttons
- Panel 2 (320px): Opens when a category is clicked — shows searchable checkbox/radio list
- Click outside (mousedown listener on document) closes Panel 2
- `max-h-[calc(100vh-90px)]` with `ScrollArea` inside
- Filter changes are **live** — no apply button on desktop

**Mobile** (`MobileFilterContent`):

- Opens as `Sheet` (shadcn) from top, `h-[100dvh]`, fullscreen
- Default Sheet close button hidden via `[&>button.absolute]:hidden`
- Custom close button in SheetHeader
- Step navigation: main list → sub-panel (replaces main view, not side-by-side)
- Sub-panel has back arrow (ArrowLeft) button
- Fixed CTA at bottom: "Zobraziť X výsledkov" — closes Sheet on click
- "Reset All" link below CTA when filters active

**FilterItem** (category row):

- States: default (white border), active/selected-panel (blue border-2), has-selections (light blue bg)
- Shows badge count of selected values
- ChevronRight arrow

**FilterSubPanel** (options list):

- Search input at top with clear button
- ScrollArea for options
- Each option: checkbox (square) or radio (circle) + label + count
- Reset button per category

### **MapView**

- Leaflet map, full viewport height below nav: `h-[calc(100vh-57px)]`
- Tile layers: ESRI satellite (default) + OSM normal, with CartoDB labels overlay on satellite
- **Gesture handling:**
    - Desktop: `scrollWheelZoom: false`, enabled only with Cmd/Ctrl held (re-disabled after 400ms timeout)
    - Mobile: `dragging: false` (single finger scrolls page), `touchZoom: true` (pinch works)
    - Shows hint overlay on wrong gesture ("Use Cmd+scroll" / "Use 2 fingers")
- **Pins:** 3 accuracy levels → 3 distinct SVG shapes+colors (teardrop/diamond/circle)
- **Clusters:** Grid-based clustering, cluster pins zoom in on click (no popup), multi-pins (same GPS) show list popup
- **Popups:** HTML-based (not React), contain "Detail aktivity →" button linked via `data-ca` attribute + popupopen event listener
- **Controls** (bottom-right, `z-[10]`):
    - Legend popover (Info icon, opens upward)
    - Zoom +/- buttons
    - Layer switcher dropdown + Locate button (horizontal row)
- **Info box** (bottom-left): dismissible notice about records not on map
- **Auto-zoom:** `fitBounds` on filtered pins with padding

### **FilterChips**

- Horizontal wrap of active filter pills below map
- Each pill: blue bg, "Key: Value" text + X remove button
- "Zrušiť všetky" (Reset all) link at end

### **ResultsTable**

**Desktop:**

- Raw `<table>` (not shadcn Table — to allow sticky header without scroll container conflicts)
- `<thead>` is `sticky top-[57px] z-[2]` (sticks below fixed navbar during page scroll)
- Each `<th>` has own `bg-[#fafafa]` to prevent content bleed-through
- Columns: fixed-width (ID 72px, Status 40px) + flexible text columns with `minWidth`
- Text wraps naturally (no truncate), cells use `align-top`
- Row click → `navigate(/detail/${id})`
- Sorting: dropdown with sort key options + asc/desc toggle button

**Mobile:**

- Card-based layout (`MobileActivityCard`), stacked vertically
- Each card: bordered rounded-xl button, shows ID + accuracy dot + location + dating chips
- Card click → navigate to detail

---

### **PAGE 2: DETAIL**

**Layout structure — Desktop:**

```
┌──────────────────────────────────────────┐
│  DetailTopNav (fixed)                    │
├──────────────────────┬───────────────────┤
│  Left Panel          │  Right Panel      │
│  (flex-1, relative)  │  (420px, fixed    │
│                      │   width, border-l,│
│  ┌────────────────┐  │   ScrollArea)     │
│  │ DetailMap      │  │                   │
│  │ (absolute fill)│  │  Activity header  │
│  └────────────────┘  │  Dokumenty section│
│                      │  Obrázky section  │
│  Overlays replace    │  Video section    │
│  map content:        │  Datovanie section│
│  - GalleryOverview   │  Údaje section    │
│  - ImageViewer       │                   │
│  - VideoPlayer       │                   │
│  - PdfViewer         │                   │
├──────────────────────┴───────────────────┤
```

**Layout structure — Mobile:**

```
┌─────────────────────┐
│ DetailTopNav        │
├─────────────────────┤
│ DetailMap (280px h) │
├─────────────────────┤
│ DetailRightPanel    │
│ (scrolls naturally) │
│                     │
│ ... all sections    │
│     inline ...      │
└─────────────────────┘

Overlays: fixed inset-0 z-[60]
- Gallery, ImageViewer, Video, PDF
  all open as fullscreen overlays
```

**Left panel view state** (`LeftPanelView` discriminated union):

```tsx
type LeftPanelView =
  | { type: "map" }
  | { type: "gallery" }
  | { type: "imageViewer"; category: ImageCategory; index: number }
  | { type: "video" }
  | { type: "pdf"; title: string; size: string };
```

State lives in `DetailPage`. Switching view replaces the left panel content. Map stays mounted but hidden (`hidden` class) so it doesn't re-initialize.

**Desktop: Right panel toggle:**

- TopNav has "Skryť panel" / "Zobraziť panel" button with PanelRightClose/PanelRightOpen icons
- `rightPanelVisible` state → conditionally renders `DetailRightPanel`
- Left panel expands to full width when right panel hidden

### **DetailTopNav**

- Desktop: Logo + "Späť do Explore" (back link) | Center: record name | Right: panel toggle + action buttons
- Mobile: "Späť" back button | Center: record name (truncated) | Hamburger → Sheet menu

### **DetailMap**

- Leaflet map showing current record pin + nearby pins (within radius)
- Nearby pins: different activities within haversine distance, clickable popups with "Detail aktivity" navigation
- Accuracy circle: colored circle overlay showing localization precision radius
- **Controls** (bottom, `z-[5]`):
    - GPS coordinate copy button (frosted glass style, `backdrop-blur`)
    - "Open in Maps" external link button (frosted glass)
    - Layer switcher + Locate button (horizontal, same pattern as Explorer)
    - Zoom +/- buttons
- **Mobile compact mode:** smaller height (280px), fullscreen expand button
- **Mobile fullscreen:** `fixed inset-0 z-[60]`, with exit button, separate DetailMap instance
- Pin tooltip on hover (Leaflet tooltip, not popup)
- `openPopupOnLoad` prop: auto-opens current record's popup on desktop

### **DetailRightPanel**

- Desktop: `w-[420px] shrink-0`, `ScrollArea` wrapping content, `border-l`
- Mobile: inline in page flow, no fixed width, no ScrollArea

**Sections (top to bottom):**

1. **Activity header:** ID badge (mono font, blue bg) + accuracy dot + name + location
2. **Dokumenty:** Clickable card rows for PDFs (→ opens PdfViewer in left panel) and "na vyžiadanie" docs (→ opens RequestModal)
3. **Obrázky:** 2x2 grid of category thumbnail buttons + "Otvoriť galériu" link. Click category → ImageViewer. Click gallery → GalleryOverview.
4. **Video:** Dark preview card with play button → VideoPlayer
5. **Datovanie:** Period + type chip pairs (period is clickable → opens Explorer with filter in new tab via `window.open`)
6. **Údaje:** Key-value data rows grouped by section (Identifikačné, Geografické, Personálne, Lokalizácia, Formálne). Values with `filterKey` prop render as blue clickable links → open Explorer filtered in new tab.

**FilterLink pattern:** `window.open(/?filter=key:value, "_blank")` + sonner toast confirmation. Enables cross-referencing from detail back to explorer.

**RequestModal:** Centered modal (`fixed inset-0 z-[100]`, backdrop blur), shows contact info + mailto CTA button.

### **Content Viewers (Left Panel Overlays)**

All viewers follow the same pattern:

- **Desktop:** `absolute inset-0 z-30` inside left panel container, replacing map visually
- **Mobile:** `fixed inset-0 z-[60]` fullscreen overlay
- Each has a header bar with close/back button + title
- Close → `setLeftPanel({ type: "map" })` (back to map)

**GalleryOverview:**

- Header: "Zavrieť" back button + "Galéria (N)" title
- Grid of images organized by category sections
- Desktop: 5-column grid. Mobile: 2-column grid
- Click image → opens ImageViewer with that category+index

**ImageViewer:**

- Header: Back button + category dropdown (to switch between categories) + zoom controls
- Main area: zoomable/pannable image (mouse drag when zoomed, scroll wheel zoom)
- Bottom: horizontal thumbnail carousel strip (scrollable, active thumb highlighted)
- Category dropdown: shadcn-style custom dropdown with check marks
- Desktop: arrow key navigation between images
- Mobile: simpler layout, swipe-friendly

**PdfViewer:**

- Header: "Zavrieť" back button + document title + size info
- Yellow security banner: "Tento dokument nie je možné stiahnuť — dáta sú chránené"
- Scrollable mock PDF pages (styled white cards on gray background)
- Each page: header with doc title + page number, body content, footer

**VideoPlayer:**

- Dark theme (`bg-[#0f172a]`)
- Header: X close button + title
- Centered play button (YouTube-style red)
- Bottom progress bar (non-functional mock)

---

### **DATA MODEL**

```tsx
interface Record {
  id: string;
  // List/table display fields
  primaryId: string;        // e.g. activity number
  status: string;           // accuracy/quality indicator (renders as colored dot)
  name: string;             // primary display name
  location: string;         // municipality/city
  subLocation: string;      // cadastral area
  region: string;           // district/county
  position: string;         // specific location description

  // Map fields
  mapX: number;             // 0-100 percentage → converted to lat/lng
  mapY: number;             // 0-100 percentage → converted to lat/lng
  accuracy: number;         // 1-3, determines pin shape + color + radius

  // Detail metadata (key-value pairs, grouped by category)
  // ... domain-specific fields

  // Categorization/dating (array of tagged entries)
  categories: Array<{
    period: string;
    type: string;
    typeColor: "green" | "red" | "gray";
  }>;

  // Media
  media: {
    documents: Array<{ title: string; size: string; pages: number; available: boolean }>;
    imageCategories: Array<{ key: string; label: string; images: string[] }>;
    hasVideo: boolean;
  };

  // Filter fields (string values matchable by filter sidebar)
  [filterableField: string]: string;
}
```

**Clustering:** Grid-based spatial clustering. Activities in same grid cell → cluster pin. Activities at exact same coordinates → "multi-pin" (distinct from cluster). Clusters zoom on click. Multi-pins show popup list.

**Filter categories** are defined as a config object:

```tsx
const FILTER_CATEGORIES = {
  sectionA: [
    { key: "fieldName", label: "Display Label", type: "checkbox" | "radio" },
    ...
  ],
  sectionB: [...],
};
```

`getUniqueValues(key)` scans all records to build filter option lists dynamically.

---

### **MAP UTILITIES (`mapUtils.ts`)**

- `toLatLng(x, y)`: converts percentage coords to real lat/lng within a bounding box
- `getPinColor(accuracy)`: returns hex color per accuracy level
- `createPinSvg(color, selected, size, accuracy)`: generates inline SVG string per accuracy type
- `createClusterSvg(count)`: cluster circle SVG
- `createMultiPinSvg(count)`: multi-activity pin SVG
- `haversineDistance(lat1, lng1, lat2, lng2)`: km distance between two points
- `TILE_LAYERS`: config object `{ satellite: {url, attribution, name}, normal: {...} }`
- `LABELS_OVERLAY`: CartoDB label tiles for satellite view
- `LEAFLET_CUSTOM_CSS`: injected `<style>` for popup styling

---

### **SHADCN COMPONENTS USED**

From `/src/app/components/ui/`:

- `Button` (variant: outline, ghost, link; size: sm, icon, default)
- `Sheet` + `SheetContent` + `SheetHeader` + `SheetTitle` + `SheetDescription` (mobile menus + filter panel)
- `ScrollArea` (right panel, filter lists)
- `Tooltip` + `TooltipProvider` + `TooltipContent` + `TooltipTrigger` (table dating abbreviations)

Custom components (not shadcn):

- All dropdowns are custom-built `div` + `button` with `mousedown` outside-click listeners (not shadcn DropdownMenu)
- Modals are custom `fixed inset-0` divs (not shadcn Dialog)
- Toasts via `sonner` (`toast.success()`)

---

### **UX PATTERNS SUMMARY**

| Pattern | Desktop | Mobile |
| --- | --- | --- |
| Filter | Fixed side panel, 2-column drill-down | Fullscreen Sheet, step navigation |
| Filter close | Click outside (mousedown) | Sheet close button or CTA |
| Table | Sticky header table, row click navigates | Card list, card click navigates |
| Map gestures | Cmd/Ctrl+scroll to zoom | 2-finger drag, pinch zoom |
| Detail layout | Side-by-side (map + panel) | Stacked (map top, panel below) |
| Content viewers | Replace left panel, keep right panel | Fullscreen overlay (z-60) |
| Viewer close | Back button in viewer header | Back button in viewer header |
| Cross-reference | Blue link → window.open new tab with filter param | Same |
| Unavailable docs | Modal with contact info + mailto | Same |
| Navbar menu | Inline buttons | Hamburger → Sheet |
| Map fullscreen | N/A (map already fills left panel) | Expand button → fixed overlay |

---

This spec covers the full component tree, state flow, layout mechanics, and interaction patterns. Swap the `Activity` data model for your ethnological records, adjust filter categories, rename sections, and the architectural skeleton remains identical.