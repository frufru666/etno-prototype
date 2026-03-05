Here's a breakdown of every component and how they compose into the two main views.

---

## Filter Components (Explore page)

### `ExploreView.vue` — the page orchestrator

Owns all filter/search state (`activeFilters`, `searchQuery`, `filterOpen`, `openSubPanelKey`). Renders `FilterSidebar` in two different containers depending on breakpoint:

- **Desktop**: A `fixed` positioned div floating over the map (line 172-183). `FilterSidebar` renders without the `mobile` prop.
- **Mobile**: Inside a `Sheet` (full-screen slide-down overlay, lines 239-256). `FilterSidebar` receives `mobile` prop.

### `FilterSidebar.vue` (281 lines) — the filter orchestrator

A single component that handles both desktop and mobile layouts via a `v-if="!mobile"` / `v-else` branch in the template. It owns:

- `activePanelKey` — which category is currently expanded (shared state for both breakpoints)
- `searchQuery` per category, `setValue`, `clearCategory`, `clearAll`, `toggleCategory` logic

**Desktop layout** (lines 127-194): Two side-by-side floating cards:

| Panel 1 (280px) | Panel 2 (320px, conditional) |
|---|---|
| Header "Filter Aktivít" + "Reset all" | Back arrow + category label + "Reset" |
| `FilterCategoryList` in a `ScrollArea` | `FilterOptionsPanel` in a flex column |

Panel 2 only appears when `activePanelKey` is set. It closes on click-outside (handled by a `mousedown` listener).

**Mobile layout** (lines 197-278): A full-height view with two "screens" that toggle:

- **Screen 1** (no `activePanelKey`): Header bar + `FilterCategoryList` in `ScrollArea` + bottom CTA "Zobraziť N výsledkov"
- **Screen 2** (`activePanelKey` set): Header bar + back arrow + `FilterOptionsPanel` + bottom CTA

### `FilterCategoryList.vue` (84 lines)

Pure presentational. Renders the three category groups (Tematické, Geografické, Formálne) as a list of buttons. Each button shows the filter name, a count badge if filters are selected, and a chevron. Props: `activeFilters`, `activeKey`. Emits: `select(key)`.

### `FilterOptionsPanel.vue` (67 lines)

Renders the checkboxes for a single filter category. Has a `SearchInput` at the top for filtering options, then a `ScrollArea` with a list of `Checkbox` + label + count rows. Props: `filterKey`, `activeFilters`, `searchQuery`. Emits: `update:searchQuery`, `toggle(value, selected)`.

### `FilterChips.vue` (66 lines)

Renders active filter selections as dismissible `Badge` chips below the map on the Explore page. Not inside FilterSidebar — it's a sibling in ExploreView.

---

## Detail Components (Detail page)

### `DetailView.vue` (~164 lines) — the page orchestrator

Owns all detail state (`rightPanelOpen`, `leftPanelView`, `mobileViewerFullscreen`, `mobileMapFullscreen`). Two completely different layouts:

**Desktop** (lines 88-109 + 130-135): A side-by-side flex layout filling `100vh - 57px`:

| Left panel (flex-1) | Right panel (420px, toggleable) |
|---|---|
| `DetailMediaViewer` (layered with `DetailMap` on top when map view active) | `DetailRightPanel` inside a `ScrollArea` |

Both panels are fixed height. The left panel uses absolute positioning to layer media vs map.

**Mobile** (lines 112-127 + 138-160): A normal scrollable page (no `overflow-hidden`):

1. `DetailMobileHero` — grey thumbnail placeholder (280px) + header (ID, title, author, badge) + CTA button
2. `DetailRightPanel` with `mobile` and `hideHeader` — renders as a plain `<div>` (no `ScrollArea`), so its content flows into the page scroll

Plus two `fixed inset-0 z-[60]` fullscreen overlays that appear on demand:
- **Viewer overlay** (line 139): wraps `DetailMediaViewer` with `fullscreen` prop
- **Map overlay** (line 146): wraps `DetailMap` with close/action buttons

### `DetailMediaViewer.vue` (52 lines)

A thin dispatch component. Based on `document.mediaType`, renders one of:
- `ImageViewer` (image)
- `PdfViewer` (pdf)
- `AudioPlayer` (audio)
- `VideoPlayer` (video)
- Fallback text

Passes `document`, `imageCount`, `fullscreen` through and forwards the `close` emit.

### `DetailMobileHero.vue` (46 lines)

Mobile-only. The static hero area + document header + CTA button. A fragment component (two root divs). Emits `open-viewer` when the hero area or CTA is tapped.

### `DetailRightPanel.vue` (231 lines)

The metadata panel. Renders: header (ID/title/author), transcript preview card, keywords, metadata rows (Údaje sections), and a locality map.

Key responsive behavior: the root element uses `<component :is="mobile ? 'div' : ScrollArea">`. On desktop it's a `ScrollArea` with `h-full` (panel has fixed height, needs internal scroll). On mobile it's a plain `div` so content flows into the page's single scroll.

### `DetailMap.vue` (84 lines)

Mapbox GL map showing a single pin. Used inside `DetailRightPanel` (compact locality preview) and in the fullscreen map overlays.

---

## Shared Components (used across both)

| Component | Used by | Purpose |
|---|---|---|
| `TopNav.vue` | ExploreView | Filter toggle + SearchInput + NavActions + MobileMenu |
| `DetailTopNav.vue` | DetailView | Back link + SearchInput + NavActions + panel toggle + MobileMenu |
| `NavActions.vue` | TopNav, DetailTopNav | The 4 desktop action buttons (Collections, Info, User, EN/SK) |
| `MobileMenu.vue` | TopNav, DetailTopNav | Hamburger Sheet menu |
| `SearchInput.vue` | TopNav, DetailTopNav, FilterOptionsPanel | Search icon + input + clear X |
| `MediaTypeIcon.vue` | ObjectCard, SearchResultsPanel | Icon switch by media type |
| `PlaybackControls.vue` | AudioPlayer, VideoPlayer | Rewind/play/forward + progress bar |