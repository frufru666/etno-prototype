# Etno Explorer — Architecture & Interaction Specification

> Adapted from the Archeo Explorer spec. Use this as the primary Cursor context document.
> **Core principle: Etno uses the SAME layout, filter, and interaction architecture as Archeo.**
> The differences are in content (data model, what fields exist) and results display (grid of cards instead of table rows). Everything else — filter behavior, map behavior, detail page layout — is identical.

---

## TECH STACK

```
Vue 3 (Composition API + <script setup>), vue-router 4,
Tailwind CSS v4, shadcn-vue (radix-vue primitives), @phosphor-icons/vue icons,
leaflet (maps), vue-sonner (toasts)
```

Responsive breakpoint: `useIsMobile()` composable at **768px**. Returns `Ref<boolean>`.

### Vue 3 Pattern Cheatsheet (adapting from Archeo React)

```
React                     → Vue 3 Composition API
─────────────────────────────────────────────────
useState(x)               → ref(x)
useMemo(fn, deps)         → computed(fn)
useEffect(fn, deps)       → watch(deps, fn) or onMounted(fn)
useNavigate()             → useRouter().push()
useParams()               → useRoute().params
useSearchParams()         → useRoute().query + router.replace()
{condition && <Comp />}   → <Comp v-if="condition" />
className={`${x}`}        → :class="[x]"
onClick={fn}              → @click="fn"
children                  → <slot />
```

---

## ROUTING

```
/                → ExploreView (grid + map)
/detail/:id      → DetailView (single document)
```

No layout wrapper — each view owns its own navbar. Navigation: `router.push()`.
Detail links from Explore use `router.push({ name: 'detail', params: { id } })`.
Back in Detail uses `router.push({ name: 'explore' })`.

---

## GLOBAL LAYOUT

**Navbar** (`TopNav` / `DetailTopNav`):
- `fixed top-0 left-0 right-0 z-50`, white bg, `border-b border-neutral-200`
- Height: **57px** (desktop) / **49px** (mobile)
- 3-column: left (branding + filter toggle) | center (search input) | right (Collections, Info, User, EN/SK)
- Mobile: hamburger → Sheet from right
- **Etno addition vs Archeo**: Search input in center (fulltext with lemmatization, placeholder "Hľadať v zbierke"). Archeo has NO search at all.
- **Etno addition vs Archeo**: Right side has Collections, Info, User, EN/SK buttons. Archeo has fewer nav items.

Content: `padding-top: navHeight`.

---

## PAGE 1: EXPLORE (Grid + Map)

### Layout — SAME AS ARCHEO

```
┌─────────────────────────────────────────────┐
│  TopNav (fixed)                             │
├─────────────────────────────────────────────┤
│  FilterSidebar │          MapView           │  ← map fills viewport height
│  (floating,    │          (full width)      │     filter floats OVER the map
│   fixed left)  │                            │
│                │                            │
├────────────────┴────────────────────────────┤
│  Aplikované filtre [chips]  Odstrániť filtre│  ← FilterChips row
├─────────────────────────────────────────────┤
│  30 Objektov           Zoradiť podľa: [▼]  │
│  ┌─────┐ ┌─────┐ ┌─────┐                   │  ← 3-column card grid
│  │Card │ │Card │ │Card │                   │     (this is the ONLY difference
│  └─────┘ └─────┘ └─────┘                   │      from Archeo which uses table)
│  ┌─────┐ ┌─────┐                            │
│  │Card │ │Card │                            │
│  └─────┘ └─────┘                            │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

**Map fills viewport height** below nav. Filter sidebar **floats over the map on the left** — identical to Archeo. When filter is closed, map is full-width. Grid margin-left adjusts when filter is open, same `transition-[margin]` pattern.

### Layout — Mobile (SAME AS ARCHEO)

```
┌─────────────────┐
│ TopNav (49px)    │
├─────────────────┤
│ MapView         │  ← compact, with popup card on pin click
├─────────────────┤
│ Aplikované      │  ← FilterChips (horizontal scroll)
│ filtre [chips]  │
├─────────────────┤
│ 30 Objektov     │  ← count + sort
│ ┌─────────────┐ │
│ │  Card       │ │  ← single column
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │  Card       │ │
│ └─────────────┘ │
├─────────────────┤
│ Footer          │
└─────────────────┘
```

Mobile: Filter opens as `Sheet` from top (fullscreen). Same step navigation as Archeo.

### State (ExploreView)

```typescript
const filterOpen = ref(true)          // desktop default open, mobile default closed
const subViewOpen = ref(false)        // tracks if filter sub-panel is open (desktop)
const activeFilters = ref<Record<string, string[]>>({})
const sortKey = ref('id')
const sortOrder = ref<'asc' | 'desc'>('asc')

const filteredDocuments = computed(() => {
  return DOCUMENTS.filter(doc => matchesFilters(doc, activeFilters.value))
})
```

Filter state readable from URL query params — same `?filter=key:value` pattern as Archeo.

### FilterSidebar — SAME BEHAVIOR AS ARCHEO

**Desktop** (`DesktopFilterContent`):
- Two side-by-side **floating** panels, both `fixed left-3`, stacked horizontally
- Panel 1 (~280px): Category list with section labels (icon + text) and FilterItem buttons
- Panel 2 (~320px): Opens when a category is clicked — shows searchable checkbox list
- Click outside (mousedown listener on document) closes Panel 2
- `max-h-[calc(100vh-90px)]` with `ScrollArea` inside
- Filter changes are **live** — no apply button on desktop
- **Not collapsible, not inline.** Exact same two-panel drill-down as Archeo.

**Three filter groups** (different from Archeo's two):

```
⊞ Tematické a autorské údaje     ← section label (Tag icon)
  Kľúčové slová          →  [count]
  Výskumná zbierka        →  [count]
  Autor                   →  [count]

⊞ Geografické údaje               ← section label (MapPin icon)
  Obec                    →  [count]
  Okres                   →  [count]
  Kraj                    →  [count]
  Štát                    →  [count]

⊞ Formálne a technické údaje      ← section label (Settings icon)
  Typ dokumentu           →  [count]
  Čas realizácie          →  [count]
  Spôsob zberu            →  [count]
  Jazyk                   →  [count]
```

**Mobile** (SAME AS ARCHEO): Sheet from top, `h-[100dvh]`. Step navigation: list → sub-panel (replaces view). CTA at bottom: "Zobraziť X výsledkov". "Resetovať všetky filtre" below CTA.

**FilterItem** states: same as Archeo (default white border, active blue border-2, has-selections light blue bg, badge count, ChevronRight).

**FilterSubPanel**: same as Archeo (search input, ScrollArea, checkboxes + labels + counts, Reset per category, back button).

### ObjectCard (Grid Card) — Etno-specific component

Per wireframe, each card:

```
┌──────────────────────────────────┐
│ ⊡ ID 123456      V mape ⊡       │  ← header: ID (mono) + map indicator + bookmark
│ ┌──────────────────────────────┐ │
│ │      Thumbnail               │ │  ← AspectRatio ~4:3
│ │      (photo / doc scan /     │ │     - image: photo thumbnail
│ │       play icon / PDF icon / │ │     - video: play button overlay on still
│ │       waveform placeholder)  │ │     - pdf/doc: scan thumbnail or icon
│ └──────────────────────────────┘ │     - audio: waveform placeholder
│ Title text, wrapping to          │  ← title (line-clamp-2, font-medium)
│ maximum 2 lines                 │
│ ⊡ Autor: Name                   │  ← participants (icon + label + name, line-clamp-1)
│ ⊡ Výskumník: Name               │     show whichever exist (author, researcher, originator)
│ ⊡ Pôvodca: Name                 │
│ [fotografia] [výsk. správa]     │  ← document type + format Badge chip(s)
└──────────────────────────────────┘
```

**"Nie je v mape"** shown in red when `hasMap === false` (replaces "V mape").
Card click → `router.push({ name: 'detail', params: { id: doc.id } })`.

### ResultsGrid

- Desktop: 3-column CSS grid, `gap-4`
- Grid area starts at full content width, with `margin-left` offset when filter is open (same as Archeo's ResultsTable)
- Mobile: single column
- Header row: "X Objektov" count (left) + "Zoradiť podľa:" + Select dropdown (right)

### MapView — SAME AS ARCHEO

- Leaflet map, **full viewport height below nav**: `h-[calc(100vh-57px)]`
- Same tile layers, gesture handling, pin clustering, popups as Archeo
- Single pin type (all same color — Etno has no accuracy levels)
- Pin popup: card with thumbnail + title + author + type chip + "Zobraziť detail →" button (see WireframeEtno_Map_pin.png)
- Controls: zoom, layers, locate — same as Archeo

### FilterChips — SAME AS ARCHEO

Horizontal wrap of active filter pills. "Aplikované filtre" label + blue pills + "Odstrániť filtre" reset link.

---

## PAGE 2: DETAIL

### Layout — Desktop (SAME SKELETON AS ARCHEO)

```
┌───────────────────────────────────────────────┐
│  DetailTopNav (fixed)                         │
├─────────────────────────┬─────────────────────┤
│  Left Panel             │  Right Panel        │
│  (flex-1, relative)     │  (420px, fixed w,   │
│                         │   border-l,         │
│  Default view varies    │   ScrollArea)       │
│  by media type:         │                     │
│  - ImageViewer          │  Document header    │
│  - PdfViewer            │  Kľúčové slová      │
│  - AudioPlayer+Transcript│  Údaje (metadata)  │
│  - VideoPlayer          │  Lokalita (map      │
│  - Map (from Fullscreen)│   preview)          │
│                         │  Súčasť dokumentu   │
│                         │  Zbierka            │
├─────────────────────────┴─────────────────────┤
```

Same left/right split as Archeo. Left panel view state:

```typescript
type LeftPanelView =
  | { type: 'image'; index: number }       // single or multi-image viewer
  | { type: 'pdf' }                        // PDF/scan viewer
  | { type: 'audio' }                      // audio player + transcript
  | { type: 'video' }                      // video player
  | { type: 'map' }                        // map fullscreen (from right panel "Fullscreen →")
```

**Left panel defaults to the primary media viewer** for the document type (NOT map — unlike Archeo where map is the default). Map opens in the left panel when user clicks "Fullscreen →" from the map preview in the right panel.

Right panel toggle: same "Skryť/Zobraziť panel" button in DetailTopNav.

### Layout — Mobile (SAME SKELETON AS ARCHEO)

```
┌─────────────────────┐
│ ← Späť    Menu ≡    │
├─────────────────────┤
│ Media Viewer        │  ← inline, varies by type (compact)
├─────────────────────┤
│ ID badge            │
│ Title               │
│ Autor: Name         │
│ [type chip]         │
│                     │
│ [Zobraziť galériu]  │  ← button if multi-image
│                     │
│ ABSTRAKT            │  ← prominent, outside metadata table
│ Full abstract text  │
│                     │
│ ÚDAJE               │
│ ... metadata ...    │
│                     │
│ LOKALITA            │
│ [Map preview]       │
│ Coords  Fullscreen→ │
│                     │
│ SÚČASŤ DOKUMENTU   │
│ [parent doc card]   │
│                     │
│ ZBIERKA             │
│ [collection ref]    │
└─────────────────────┘
```

**Mobile map**: Clicking "Fullscreen →" opens map as `fixed inset-0 z-[60]` overlay (same pattern as Archeo mobile map fullscreen). Has "× Zavrieť" header, zoom controls, GPS coords, "Otvoriť v Maps" + "Kopírovať GPS" buttons at bottom.

### DetailTopNav

- Desktop: Logo + "← Späť do Explore" | Center: "Search in collection" input | Right: Collections, Info, User, EN/SK + panel toggle
- Mobile: "← Späť do Explore" | Right: "Menu ≡"

### Right Panel Sections (DetailRightPanel)

Sections top to bottom — **from wireframes**:

1. **Document header**
   - ID badge (mono font, primary-500 bg, white text) — e.g. "AT01408"
   - Title (Heading 3)
   - Author line: "Autor: Name"
   - Document type chip (Badge, outline)

2. **Transcript preview** (only for types with transcript: výskumná správa, audio, multi-image scans)
   - Card with light bg, "TRANSCRIPT" header (left) + "Zobraziť" link (right, blue)
   - Shows: "Strana 1/28" or "Obrázok 1/28"
   - Preview text (3-4 lines, truncated)
   - Click "Zobraziť" → switches left panel to transcript view

3. **Kľúčové slová** (Keywords — PROMINENT section, not part of metadata table)
   - Section header: "KĽÚČOVÉ SLOVÁ"
   - Wrap of keyword Badge chips (outline style, blue text on white bg)
   - Each keyword is clickable → opens Explore with that keyword filter (same FilterLink pattern)
   - **Archeo has no equivalent** — this section doesn't exist on Archeo

4. **Údaje** (Metadata — grouped key-value rows)

   **TEMATICKÉ ÚDAJE**
   - Kľúčové slová row (if keywords exist — values shown as chips inline)

   **GEOGRAFICKÉ ÚDAJE**
   - Obec | Okres | Kraj | Štát | Lokalita
   - Values with `filterable` flag render as blue links → FilterLink pattern

   **FORMÁLNE ÚDAJE**
   - Typ dokumentu | Čas realizácie | Spôsob zberu

   **ADMINISTRATÍVNE ÚDAJE**
   - Projekt | Výskumná zbierka | Inštitúcia | Prístup | Licencia
   - Licencia renders as blue external link (e.g. "CC BY-NC-ND 4.0")

5. **Lokalita** (Map preview — at bottom of metadata area)
   - Section header: "LOKALITA"
   - Map embed — full width of right panel, proportional height (roughly square aspect in the 420px panel)
   - Coordinates badge (mono font) at bottom-left of map
   - "Fullscreen →" link at bottom-right
   - **Desktop**: Clicking "Fullscreen →" opens map in the LEFT PANEL (same overlay pattern as Archeo's Gallery/Image/Video viewers — replaces left panel content)
   - **Mobile**: Clicking "Fullscreen →" opens map as fullscreen overlay (`fixed inset-0 z-[60]`)
   - **Hidden entirely when `hasMap === false`**

6. **Súčasť dokumentu** (Document membership — Etno-specific, no Archeo equivalent)
   - Section header: "SÚČASŤ DOKUMENTU"
   - Clickable card showing the parent document this item belongs to
   - Card: thumbnail (scan/photo) + title of parent document
   - Click → navigates to the parent document's detail page
   - Only shown when the item has a parent document relationship

7. **Zbierka** (Collection membership — Etno-specific, no Archeo equivalent)
   - Section header: "ZBIERKA ARCHÍVNYCH LÍSTKOV" (or whichever collection name)
   - Text or link indicating which collection this item belongs to
   - Click → opens Explore filtered to that collection, or navigates to Collection detail page
   - Only shown when the item belongs to a named collection

### Content Viewers (Left Panel Overlays) — SAME PATTERN AS ARCHEO

All viewers follow the same pattern as Archeo:
- **Desktop:** `absolute inset-0 z-30` inside left panel container, replacing previous content visually
- **Mobile:** `fixed inset-0 z-[60]` fullscreen overlay
- Each has a header bar with close/back button + title
- Close → back to default media view (or map view if opened from Fullscreen)

**ImageViewer** (single image):
- Full-bleed image in left panel
- Toolbar (left side): zoom in/out, pan arrows (up/down/left/right), fullscreen, close (×), menu (≡)
- Active arrow highlighted in primary blue

**ImageViewer** (multi-image):
- Same viewer as single
- "Zobraziť Transcript" button (top-right overlay, blue outline) → switches to transcript view
- Bottom: "OBRÁZKY (28)" label + horizontal thumbnail strip (scrollable, active thumb has border)

**PdfViewer**:
- Gray bg with white "page" cards (mock pages)
- Header: zoom controls (🔍 − +) + page nav (← 1 / 245 →)
- Pages scroll vertically

**AudioPlayer**:
- Left panel: transcript text on light/cream bg (scrollable, full width)
- Pinned bottom bar: dark bg
  - 10s back (⏪) | play/pause (⏯) | 10s forward (⏩)
  - Progress bar (draggable)
  - Timestamps: current / total (e.g. "0:15" / "1:33")

**VideoPlayer**:
- Dark theme background (`bg-slate-900`)
- "Zobraziť Transcript" button (top-right, blue outline)
- Bottom controls: same layout as audio (10s, play/pause, 10s, progress bar, timestamps)

---

## METADATA SECTION GROUPS (for DetailRightPanel)

```typescript
const METADATA_SECTIONS = [
  {
    key: 'thematic',
    label: 'TEMATICKÉ ÚDAJE',
    fields: [
      { key: 'keywords', label: 'Kľúčové slová', display: 'chips', filterable: true },
    ],
  },
  {
    key: 'geographic',
    label: 'GEOGRAFICKÉ ÚDAJE',
    fields: [
      { key: 'obec', label: 'Obec', filterable: true },
      { key: 'okres', label: 'Okres', filterable: true },
      { key: 'kraj', label: 'Kraj', filterable: true },
      { key: 'stat', label: 'Štát', filterable: true },
      { key: 'lokalita', label: 'Lokalita' },
    ],
  },
  {
    key: 'formal',
    label: 'FORMÁLNE ÚDAJE',
    fields: [
      { key: 'type', label: 'Typ dokumentu', filterable: true },
      { key: 'studyPeriod', label: 'Čas realizácie' },
      { key: 'collectionMethod', label: 'Spôsob zberu', filterable: true },
    ],
  },
  {
    key: 'admin',
    label: 'ADMINISTRATÍVNE ÚDAJE',
    fields: [
      { key: 'project', label: 'Projekt' },
      { key: 'researchCollection', label: 'Výskumná zbierka', filterable: true },
      { key: 'institution', label: 'Inštitúcia' },
      { key: 'accessRight', label: 'Prístup' },
      { key: 'license', label: 'Licencia', isLink: true },
    ],
  },
] as const;
```

**FilterLink pattern**: Same as Archeo — `window.open(`/?filter=${key}:${value}`, '_blank')` + toast.

---

## SHADCN-VUE COMPONENTS USED

From `@/components/ui/`:
- `Button` (variant: outline, ghost, link; size: sm, icon, default)
- `Sheet` + `SheetContent` + `SheetHeader` + `SheetTitle` (mobile filter + mobile menu)
- `ScrollArea` (right panel, filter lists)
- `Card` + `CardContent` (object cards in grid)
- `Badge` (ID badges, keyword chips, type chips, filter count badges)
- `Separator` (between metadata sections)
- `Checkbox` (filter option checkboxes)
- `Select` + `SelectTrigger` + `SelectContent` + `SelectItem` (sort dropdown)
- `AspectRatio` (card thumbnails)
- `Tooltip` (optional, for truncated text)

---

## UX PATTERNS SUMMARY

| Pattern | Desktop | Mobile |
|---------|---------|--------|
| Filter | **Same as Archeo**: floating side panel over map, 2-panel drill-down | **Same as Archeo**: fullscreen Sheet, step navigation |
| Filter close | Click outside (mousedown) | Sheet close button or CTA |
| Results display | **3-column grid of cards** (Archeo uses table rows) | **Single column cards** (Archeo uses card list too) |
| Map | **Same as Archeo**: full viewport height, filter floats over it | **Same as Archeo**: compact above cards |
| Detail layout | **Same as Archeo**: side-by-side (left panel + right panel 420px) | **Same as Archeo**: stacked (media top → content scroll below) |
| Detail left panel default | Media viewer (image/pdf/audio/video) | Media viewer inline |
| Detail map | Preview in right panel. "Fullscreen →" opens in **left panel** | Preview in scroll. "Fullscreen →" opens as **fullscreen overlay** |
| Content viewers | **Same as Archeo**: replace left panel, keep right panel | **Same as Archeo**: fullscreen overlay (z-60) |
| Viewer close | Back button in viewer header | Back button in viewer header |
| Cross-reference | Blue link → window.open new tab with filter | Same |
| Navbar search | Fulltext "Hľadať v zbierke" | Same |
| Navbar menu | Inline buttons (Collections, Info, User, EN/SK) | Hamburger → Sheet |

---

## WHAT'S DIFFERENT FROM ARCHEO (accurate list)

| Aspect | Archeo | Etno |
|--------|--------|------|
| **Results format** | Table rows (sticky header, sortable columns) | **Grid of cards with thumbnails** (3-col desktop, 1-col mobile) |
| **Search** | **No search at all** | Fulltext with lemmatization in navbar |
| **Detail left panel default** | Map (hero) | Media viewer (image/pdf/audio/video) |
| **Detail map** | Map IS the left panel (always present, hero element) | Map is a **preview in right panel** with "Fullscreen →" to open in left panel |
| **Keywords** | **Don't exist in Archeo** | Prominent section in detail right panel + filterable chips |
| **Abstract** | **Doesn't exist in Archeo** | Prominent block in mobile detail, part of metadata |
| **Dating/periods** | Multi-period timeline with colored type chips | Not applicable — Etno uses "Čas realizácie" as simple date/range |
| **Document type diversity** | PDFs + images + video (all archaeological activity docs) | PDFs + images + video + **audio** |
| **Transcript** | Not applicable | Transcript view for audio, video, and images|
| **Localization** | SK only | SK/EN (prototype: SK only) |
| **Navbar items** | Branding + filter toggle | Branding + filter + **search** + **Collections, Info, User, EN/SK** |
| **Filter categories** | 2 groups (Geographic + Institutional) | **3 groups** (Thematic + Geographic + Formal) |
| **Parent document / Collection** | Not applicable | **"Súčasť dokumentu" + "Zbierka" sections** in detail right panel |
| **Pin map styling** | 3 accuracy levels → 3 pin shapes/colors | Single pin type (no accuracy levels) |

**Everything else is the same**: filter sidebar behavior (floating, two-panel drill-down), filter chip behavior, map gesture handling, detail page left/right split, viewer overlay pattern, mobile Sheet pattern, right panel toggle, FilterLink cross-referencing.

---

## FILE STRUCTURE

```
src/
├── components/
│   ├── ui/                    # shadcn-vue primitives (installed via CLI)
│   ├── ct/                    # CT-specific compositions
│   │   ├── TopNav.vue
│   │   ├── DetailTopNav.vue
│   │   ├── FilterSidebar.vue  # SAME behavior as Archeo, different filter categories
│   │   ├── FilterChips.vue
│   │   ├── ObjectCard.vue     # NEW — replaces Archeo's ResultsTable rows
│   │   ├── ResultsGrid.vue    # NEW — grid layout wrapper
│   │   ├── MapView.vue
│   │   ├── Footer.vue
│   │   └── detail/
│   │       ├── DetailRightPanel.vue
│   │       ├── ImageViewer.vue
│   │       ├── PdfViewer.vue
│   │       ├── AudioPlayer.vue     # NEW — no Archeo equivalent
│   │       ├── VideoPlayer.vue
│   │       ├── TranscriptView.vue  # NEW — no Archeo equivalent
│   │       └── DetailMap.vue       # Preview + fullscreen (adapted from Archeo)
│   └── figma/                 # Helper components (placeholders etc.)
├── views/
│   ├── ExploreView.vue
│   └── DetailView.vue
├── data/
│   └── mockData.ts            # Types + sample data + filter config
├── composables/
│   ├── useIsMobile.ts         # 768px breakpoint
│   └── useFilters.ts          # Filter state management (optional extract)
├── layouts/
│   └── DefaultLayout.vue      # If needed later
└── router/
    └── index.ts               # Vue Router setup
```

---

## DESIGN TOKENS (Tailwind config)

```javascript
colors: {
  primary: {
    50: '#E5F0FF',
    100: '#CCE0FF',
    200: '#99C2FF',
    300: '#66A3FF',
    400: '#3385FF',
    500: '#1A62FF',   // main
    600: '#034AE8',
    700: '#0A3AB8',
    800: '#0A2D8A',
    900: '#05205D',
  },
  secondary: {
    500: '#FF877A',   // coral accent
  },
}
```

Typography: Inter (body/UI), Geist Mono (IDs, codes, data).

---

This spec + `mockData.ts` + the Etno wireframe PNGs + the Archeo React source code give Cursor everything needed to build each view.