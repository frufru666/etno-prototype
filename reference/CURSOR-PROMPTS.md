# Cursor Prompt Sequence — Etno Explorer

> Use these prompts sequentially in Cursor. Each builds on the previous.
> Before starting, ensure:
> 1. `CURSORRULES.md` is renamed to `.cursorrules`
> 2. `mockData.ts` is placed in `src/data/`
> 3. `ETNO-SPEC.md` is placed in project root (or `/reference/`)
> 4. Wireframe PNGs are in `/reference/wireframes/`
> 5. shadcn-vue components are installed (see setup commands below)

---

## Setup (run once)

```bash
npm install
npx shadcn-vue@latest init
npx shadcn-vue@latest add button input checkbox card scroll-area select badge separator tabs collapsible toggle sheet aspect-ratio tooltip
npm install @phosphor-icons/vue
npm install vue-router@4
npm install vue-sonner
npm run dev
```

---

## Prompt 1: Router + Layout Shell + TopNav

**Context files to attach:**
- `ETNO-SPEC.md` (sections: ROUTING, GLOBAL LAYOUT)
- `src/data/mockData.ts`
- `.cursorrules`
- Archeo reference: paste the `TopNav.tsx` content from CT_shadcn_ui_demo as a comment block

**Prompt:**

```
Set up Vue Router with two routes:
- "/" → ExploreView
- "/detail/:id" → DetailView

Create:
1. `src/router/index.ts` — Vue Router setup with named routes "explore" and "detail"
2. Update `src/main.ts` to use the router
3. `src/components/ct/TopNav.vue` — Fixed navbar matching the ETNO-SPEC.md "GLOBAL LAYOUT" section

TopNav specs:
- Fixed top, z-50, white bg, border-b border-neutral-200
- Height: 57px desktop, 49px mobile
- Left: "Etno SAV Explorer" branding text + Filter toggle button (primary blue, with icon)
- Center: Search input with magnifying glass icon, placeholder "Hľadať v zbierke"
- Right: Collections, Info, User, EN/SK buttons (outlined style)
- Mobile: collapse right items into hamburger → Sheet from right

Props: filterOpen (boolean), activeFilterCount (number), onFilterToggle (emit)

Use shadcn-vue Button, Sheet. Use @phosphor-icons/vue for icons (PhSlidersHorizontal, PhMagnifyingGlass, PhList, PhX).
Follow CT design tokens from tailwind.config.js.

Reference the Archeo TopNav.tsx for the interaction pattern (filter toggle, mobile sheet) but adapt the content for Etno (search bar instead of just branding, additional nav items).
```

---

## Prompt 2: ExploreView + ObjectCard + ResultsGrid

**Context files to attach:**
- `ETNO-SPEC.md` (section: PAGE 1: EXPLORE)
- `src/data/mockData.ts`
- Wireframe: `reference/wireframes/WireframePreview__Etno_1440.png`
- Wireframe: `reference/wireframes/WireframeEtno_Explore.png` (mobile)
- Archeo reference: paste `ExplorerPage.tsx` as comment

**Prompt:**

```
Build the ExploreView based on the wireframe and ETNO-SPEC section "PAGE 1: EXPLORE".

Create:
1. `src/views/ExploreView.vue` — Main explore page
2. `src/components/ct/ObjectCard.vue` — Grid card component
3. `src/components/ct/ResultsGrid.vue` — Grid layout wrapper
4. `src/components/ct/FilterChips.vue` — Active filter pills row
5. `src/components/ct/Footer.vue` — Simple footer placeholder
6. `src/composables/useIsMobile.ts` — 768px breakpoint composable

ExploreView layout (desktop):
- TopNav (fixed, 57px)
- MapView placeholder (full width, ~50vh height, gray bg with "Map placeholder" text)
- FilterChips row below map
- Below: 2-column layout — FilterSidebar placeholder (304px left) + ResultsGrid (right)
- Footer at bottom

ResultsGrid:
- Desktop: 3-column CSS grid, gap-4
- Mobile: single column
- Header row: "X Objektov" count (left) + "Zoradiť podľa: [select]" (right)

ObjectCard (from wireframe):
- Card with border, rounded-xl
- Header: ID badge (mono font, small) + "V mape" indicator (right) + bookmark icon
- Thumbnail area: AspectRatio 4:3, gray placeholder bg
  - Show media type icon overlay (Play for video, PDF icon for docs, waveform for audio)
- Title: line-clamp-2, font-medium
- Participants: up to 3 lines, each with icon prefix (Autor/Výskumník/Pôvodca)
- Bottom: document type Badge chip(s)

State management:
- filterOpen: ref(true) on desktop, ref(false) on mobile
- activeFilters: ref<Record<string, string[]>>({})
- filteredDocuments: computed using matchesFilters() from mockData

Use DOCUMENTS from mockData.ts as the data source.
Reference ExplorerPage.tsx for the state management pattern but adapt the layout.
The key difference: Etno uses a grid of cards (not a table), and the map is above the grid (not behind the filter sidebar).
```

---

## Prompt 3: FilterSidebar

**Context files to attach:**
- `ETNO-SPEC.md` (section: FilterSidebar)
- `src/data/mockData.ts` (FILTER_CATEGORIES + getUniqueValues)
- Wireframe: `reference/wireframes/WireframeDocasny_Dokument_Filter_view.png`
- Archeo reference: paste `FilterSidebar.tsx` as comment

**Prompt:**

```
Build the FilterSidebar component.

Create: `src/components/ct/FilterSidebar.vue`

Desktop behavior (key difference from Archeo):
- NOT floating/fixed. Inline in the page flow, 304px wide, left of the grid.
- Single panel with collapsible category groups (using shadcn Collapsible)
- Each category row: clickable, expands inline to show searchable checkbox list
- No secondary floating panel — everything expands within the same column
- Header: "Filter Aktivít" + "Reset all" button
- Three sections with section labels (icon + text):
  1. "Tematické a autorské údaje" (Tag icon) — Kľúčové slová, Výskumná zbierka, Autor
  2. "Geografické údaje" (MapPin icon) — Obec, Okres, Kraj, Štát
  3. "Formálne a technické údaje" (Settings icon) — Typ dokumentu, Čas realizácie, Spôsob zberu, Jazyk

Each filter category when expanded shows:
- Search input (with clear button)
- Scrollable checkbox list with option labels + counts
- Count badge on the category row showing number of selected values

Mobile behavior (same as Archeo mobile):
- Opens as Sheet from top, h-[100dvh]
- Step navigation: main list → sub-panel (replaces view)
- CTA at bottom: "Zobraziť X výsledkov"

Props: activeFilters, onFilterChange (emit), mobile (boolean), onApply (emit)

Use FILTER_CATEGORIES and getUniqueValues() from mockData.ts.
Reference FilterSidebar.tsx for:
- The FilterItem component (row with badge + chevron)
- The FilterSubPanel component (search + checkbox list)
- The mobile step navigation pattern
But adapt: desktop uses inline collapsible expansion, not a floating second panel.
```

---

## Prompt 4: DetailView (all media variants)

**Context files to attach:**
- `ETNO-SPEC.md` (section: PAGE 2: DETAIL)
- `src/data/mockData.ts`
- Wireframes:
  - `reference/wireframes/WireframeEtno_Single_Image_Desktop.png`
  - `reference/wireframes/WireframeEtno_Multi_Image_Desktop.png`
  - `reference/wireframes/WireframeEtno_PDF_Desktop.png`
  - `reference/wireframes/WireframeEtno_Audio_Desktop.png`
  - `reference/wireframes/WireframeEtno_Video_Desktop.png`
  - `reference/wireframes/WireframeEtno_Single_Image.png` (mobile)
- Archeo reference: paste `DetailPage.tsx` + `DetailRightPanel.tsx` as comments

**Prompt:**

```
Build the DetailView with all media type variants.

Create:
1. `src/views/DetailView.vue` — Main detail page (routes to /detail/:id)
2. `src/components/ct/DetailTopNav.vue` — Detail page navbar
3. `src/components/ct/detail/DetailRightPanel.vue` — Scrollable metadata panel
4. `src/components/ct/detail/ImageViewer.vue` — Image viewer (single + multi)
5. `src/components/ct/detail/PdfViewer.vue` — PDF/scan viewer (mock)
6. `src/components/ct/detail/AudioPlayer.vue` — Audio player + transcript
7. `src/components/ct/detail/VideoPlayer.vue` — Video player (mock)

DetailView (desktop):
- Same side-by-side layout as Archeo: left panel (flex-1) + right panel (420px)
- Left panel defaults to the media viewer (NOT map like Archeo)
- Right panel: ScrollArea with DetailRightPanel content
- Toggle right panel visibility via DetailTopNav button

DetailView (mobile):
- Stacked: media viewer inline → content scrolls below
- Media viewers expand to fullscreen overlay on button press

DetailRightPanel sections (from wireframe, top to bottom):
1. Header: ID badge (blue bg, mono font) + Title (h3) + Author line + Type chip
2. Transcript preview card (if hasTranscript): "TRANSCRIPT" header + "Zobraziť" link + page info + text preview
3. "KĽÚČOVÉ SLOVÁ" section: keyword Badge chips (outline, blue text), clickable → filter link
4. "ÚDAJE" with grouped metadata:
   - TEMATICKÉ ÚDAJE (keywords already shown above, skip here)
   - GEOGRAFICKÉ ÚDAJE: Obec, Okres, Kraj, Štát, Lokalita — values as filter links
   - FORMÁLNE ÚDAJE: Typ dokumentu, Čas realizácie, Spôsob zberu
   - ADMINISTRATÍVNE ÚDAJE: Projekt, Výskumná zbierka, Inštitúcia, Prístup, Licencia (link)
5. "LOKALITA" map section: map placeholder (200px), coordinates, "Fullscreen →" link. Hidden when hasMap is false.

ImageViewer:
- Full image in left panel, placeholder gray bg with "Image viewer" text
- Left toolbar: zoom in/out, arrows, fullscreen, close
- Multi-image: + bottom thumbnail strip (horizontal scroll)

PdfViewer:
- Gray bg with white "page" cards (mocked)
- Header: zoom controls + page nav (← 1/245 →)

AudioPlayer:
- Left panel: transcript text (scrollable)
- Pinned bottom bar: dark bg, 10s back/forward, play/pause circle, progress bar

VideoPlayer:
- Dark bg in left panel
- "Zobraziť Transcript" button top-right
- Bottom controls: same as audio

The media type shown is determined by the document's mediaType field from mockData.
Reference DetailPage.tsx for:
- LeftPanelView state pattern
- Desktop vs mobile conditional rendering
- Right panel toggle
Adapt: no map as default view, add transcript, add audio player.
```

---

## Prompt 5 (optional): Polish + Wiring

**Prompt:**

```
Review all components and:

1. Wire up FilterChips to show/remove active filters correctly
2. Wire up filter links in DetailRightPanel — clicking a geographic value opens Explore in new tab with that filter
3. Add loading/empty states:
   - ResultsGrid: "Žiadne výsledky" when filtered to 0
   - DetailView: redirect to Explore if document ID not found
4. Ensure mobile responsiveness at 1366px (key breakpoint — researchers' old hardware)
5. Check all shadcn-vue component imports are correct
6. Verify router-link navigation between Explore ↔ Detail works
```

---

## Tips for Cursor

- **Always attach the wireframe PNG** for the component you're building — Cursor can parse images
- **Attach the Archeo .tsx file** as a "reference" comment block — Cursor will pattern-match from it
- **Keep prompts focused**: one view/component per prompt works better than "build everything"
- **If Cursor generates React**: remind it "Use Vue 3 Composition API with <script setup>, not React"
- **If styling drifts**: reference specific design tokens: "Use primary-500 (#1A62FF) for active states"
