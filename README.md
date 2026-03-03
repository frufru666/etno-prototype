# Etno SAV Prototype

Vue 3 + Tailwind + shadcn-vue prototype for the Etno Collection Toolbox.

## Quick Start

```bash
# Install dependencies
npm install

# Install shadcn-vue CLI and components
npx shadcn-vue@latest init
# Answer: TypeScript: Yes, Framework: Vite, Style: Default, Base color: Slate, CSS variables: Yes

# Add required shadcn components
npx shadcn-vue@latest add button input checkbox card scroll-area select badge separator tabs collapsible

# Run dev server
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn-vue components (auto-generated)
│   └── ct/          # CT-specific components (you build these)
├── views/           # Page views
├── layouts/         # Layout wrappers
├── lib/utils.ts     # Utility functions
└── data/mockData.ts # Sample Etno data
```

## Build Order

Use Cursor to build views in this order:

1. **ExploreView** — Grid + map + filter sidebar
2. **ObjectCard** — Extract from ExploreView
3. **FilterPanel** — Collapsible filter groups
4. **DetailView (Image)** — Single image variant
5. **DetailView (Audio)** — Audio player with transcript
6. **DetailView (Multi-image)** — Gallery variant

## Cursor Prompts

### First prompt (Explore grid):

> Look at the wireframe `reference/WireframePreview__Etno_1440.png`. Build the ExploreView with:
> - Fixed top nav with logo, search, and nav links
> - Main content area with results count, sort dropdown, and view toggles
> - Grid of ObjectCard components (3 columns)
> - Use shadcn-vue components and CT design tokens from tailwind.config.js

### Second prompt (Filter sidebar):

> Add a filter sidebar to ExploreView based on `reference/WireframeDocasny_Dokument_Filter_view.png`. 
> - Sticky sidebar on the left
> - Collapsible filter groups (Tematicke, Geograficke, Formalne)
> - Checkbox filters with counts
> - Reset buttons per group and global

## Reference Files

Copy your Etno wireframes to the `reference/` folder:
- WireframeEtno_Explore.png
- WireframePreview__Etno_1440.png
- WireframeDocasny_Dokument_Filter_view.png
- WireframeEtno_Single_Image.png
- WireframeEtno_Audio.png
- etc.

## Design Tokens

CT design tokens are configured in `tailwind.config.js`:
- Colors: primary-500 (#1A62FF), secondary-500 (#FF877A)
- Typography: heading-1 through data
- Spacing: Tailwind defaults + CT additions

## Notes

- This is a prototype for dev evaluation, not production code
- Focus on visual accuracy and component structure
- Interactions and state management are secondary
- Test at 1366px width 