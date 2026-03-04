// Shared map utilities for both Explorer and Detail maps

// Convert mapX/mapY (0-100%) to approximate Slovak lat/lng
// Slovakia bounding box: ~47.7-49.6N, 16.8-22.5E
export function toLatLng(mapX: number, mapY: number): [number, number] {
  const lat = 49.6 - (mapY / 100) * (49.6 - 47.7);
  const lng = 16.8 + (mapX / 100) * (22.5 - 16.8);
  return [lat, lng];
}

// Updated pin colors — high-contrast on both satellite and map tiles
export function getPinColor(accuracy: number): string {
  switch (accuracy) {
    case 1: return "#00d4ff"; // bright cyan — presná
    case 2: return "#ff8a2b"; // vivid orange — orientačná
    case 3: return "#ff3b8b"; // hot pink — neurčená
    default: return "#a0a0a0";
  }
}

export const PIN_COLOR_MULTI = "#5b7cff"; // vivid blue — multi-activity

export function getAccuracyLabel(accuracy: number): string {
  switch (accuracy) {
    case 1: return "presná lokalizácia";
    case 2: return "orientačná";
    case 3: return "neurčená";
    default: return "neznáma";
  }
}

export function getAccuracyRadiusMeters(accuracy: number): number {
  switch (accuracy) {
    case 1: return 200;
    case 2: return 500;
    case 3: return 1000;
    default: return 400;
  }
}

// Haversine distance in km
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Distinct pin SVGs per accuracy level ──

// Accuracy 1 — PRECISE: classic teardrop/map-pin shape (cyan)
function createPrecisePinSvg(color: string, selected: boolean, size: number): string {
  const shadow = selected
    ? `<filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
    : "";
  const filterAttr = selected ? ' filter="url(#glow)"' : "";
  const ring = selected
    ? `<circle cx="20" cy="16" r="14" fill="none" stroke="white" stroke-width="2.5" opacity="0.9"/>`
    : "";
  // Classic map pin: teardrop pointing down
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 44">
    ${shadow ? `<defs>${shadow}</defs>` : ""}
    <g${filterAttr}>
      ${ring}
      <path d="M20 42 C20 42 4 24 4 16 C4 7.2 11.2 0 20 0 C28.8 0 36 7.2 36 16 C36 24 20 42 20 42Z"
        fill="${color}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <circle cx="20" cy="16" r="5.5" fill="white" opacity="0.95"/>
      <!-- Crosshair lines for "precise" -->
      <line x1="20" y1="8" x2="20" y2="12" stroke="white" stroke-width="1.5" opacity="0.7" stroke-linecap="round"/>
      <line x1="20" y1="20" x2="20" y2="24" stroke="white" stroke-width="1.5" opacity="0.7" stroke-linecap="round"/>
      <line x1="12" y1="16" x2="16" y2="16" stroke="white" stroke-width="1.5" opacity="0.7" stroke-linecap="round"/>
      <line x1="24" y1="16" x2="28" y2="16" stroke="white" stroke-width="1.5" opacity="0.7" stroke-linecap="round"/>
    </g>
  </svg>`;
}

// Accuracy 2 — APPROXIMATE: diamond/rhombus shape (orange)
function createApproxPinSvg(color: string, selected: boolean, size: number): string {
  const half = size / 2;
  const r = size * 0.38;
  const ring = selected
    ? `<rect x="${half - r - 2}" y="${half - r - 2}" width="${(r + 2) * 2}" height="${(r + 2) * 2}" rx="6" fill="none" stroke="white" stroke-width="2.5" opacity="0.9" transform="rotate(45 ${half} ${half})"/>`
    : "";
  // Diamond shape with ~ (approximate) symbol
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${ring}
    <rect x="${half - r}" y="${half - r}" width="${r * 2}" height="${r * 2}" rx="5"
      fill="${color}" stroke="rgba(0,0,0,0.2)" stroke-width="1"
      transform="rotate(45 ${half} ${half})"/>
    <text x="${half}" y="${half + 1}" text-anchor="middle" dominant-baseline="central"
      fill="white" font-family="'Geist',sans-serif" font-weight="700" font-size="${size * 0.38}" opacity="0.95">~</text>
  </svg>`;
}

// Accuracy 3 — UNKNOWN: circle with dashed border and ? (pink)
function createUnknownPinSvg(color: string, selected: boolean, size: number): string {
  const half = size / 2;
  const r = size * 0.36;
  const ring = selected
    ? `<circle cx="${half}" cy="${half}" r="${r + 3}" fill="none" stroke="white" stroke-width="2.5" opacity="0.9"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${ring}
    <circle cx="${half}" cy="${half}" r="${r}" fill="${color}" />
    <circle cx="${half}" cy="${half}" r="${r}" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-dasharray="4 3"/>
    <circle cx="${half}" cy="${half}" r="${r + 1}" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
    <text x="${half}" y="${half + 1}" text-anchor="middle" dominant-baseline="central"
      fill="white" font-family="'Geist',sans-serif" font-weight="700" font-size="${size * 0.36}" opacity="0.95">?</text>
  </svg>`;
}

// Create the right pin SVG based on accuracy level
export function createPinSvg(
  color: string,
  selected: boolean,
  size: number = 40,
  accuracy?: number
): string {
  switch (accuracy) {
    case 1: return createPrecisePinSvg(color, selected, size);
    case 2: return createApproxPinSvg(color, selected, size);
    case 3: return createUnknownPinSvg(color, selected, size);
    default:
      // Fallback: simple circle (for cases where accuracy isn't passed)
      return createUnknownPinSvg(color, selected, size);
  }
}

// Create cluster circle SVG
export function createClusterSvg(count: number, selected: boolean): string {
  const size = count > 50 ? 56 : count > 10 ? 48 : 42;
  const half = size / 2;
  const r = half - 3;
  const fontSize = count > 50 ? 15 : count > 10 ? 13 : 12;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${half}" cy="${half}" r="${r + 2}" fill="rgba(23,23,23,0.15)" />
    <circle cx="${half}" cy="${half}" r="${r}" fill="${selected ? "#171717" : "rgba(23,23,23,0.75)"}" />
    <circle cx="${half}" cy="${half}" r="${r}" fill="none" stroke="white" stroke-width="${selected ? 2.5 : 1.5}"/>
    <text x="${half}" y="${half}" text-anchor="middle" dominant-baseline="central"
      fill="white" font-family="'Geist Mono',monospace" font-weight="700" font-size="${fontSize}">
      ${count}
    </text>
  </svg>`;
}

// Create multi-activity pin SVG (blue hexagonal badge with count)
export function createMultiPinSvg(
  count: number,
  selected: boolean,
  size: number = 44
): string {
  const half = size / 2;
  const r = size * 0.38;
  const fontSize = size * 0.3;
  // Hexagon points
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${half + r * Math.cos(angle)},${half + r * Math.sin(angle)}`;
  }).join(" ");
  const ptsOuter = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${half + (r + 2) * Math.cos(angle)},${half + (r + 2) * Math.sin(angle)}`;
  }).join(" ");

  const ring = selected
    ? `<polygon points="${ptsOuter}" fill="none" stroke="white" stroke-width="2.5" opacity="0.9"/>`
    : `<polygon points="${ptsOuter}" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>`;
  const glow = selected
    ? `<polygon points="${ptsOuter}" fill="${PIN_COLOR_MULTI}" opacity="0.25"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${glow}
    <polygon points="${pts}" fill="${PIN_COLOR_MULTI}" />
    ${ring}
    <text x="${half}" y="${half + 1}" text-anchor="middle" dominant-baseline="central"
      fill="white" font-family="'Geist Mono',monospace" font-weight="700" font-size="${fontSize}">
      ${count}
    </text>
  </svg>`;
}

// Tile layer configurations
export const TILE_LAYERS = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
    name: "Ortofotomozaika",
  },
  normal: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
    name: "Štandardná mapa",
  },
};

// Labels-only overlay for satellite view (place names, roads, borders)
export const LABELS_OVERLAY = {
  url: "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
  attribution: "&copy; CartoDB",
};

// Shared Leaflet CSS overrides
// CRITICAL: Do NOT set `transform` on .archeo-pin — Leaflet uses inline
// transform:translate3d for positioning. Overriding it moves pins to (0,0).
// Instead, hover effects target the inner SVG element.
export const LEAFLET_CUSTOM_CSS = `
  .archeo-pin, .archeo-cluster {
    background: none !important;
    border: none !important;
  }
  .archeo-pin {
    cursor: pointer !important;
  }
  .archeo-pin svg {
    transition: transform 0.15s ease, filter 0.15s ease;
    transform-origin: center center;
  }
  .archeo-pin:hover svg {
    transform: scale(1.2);
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.35));
  }
  .archeo-cluster {
    cursor: pointer !important;
  }
  .archeo-cluster svg {
    transition: transform 0.15s ease;
    transform-origin: center center;
  }
  .archeo-cluster:hover svg {
    transform: scale(1.12);
  }
  .archeo-popup .leaflet-popup-content-wrapper {
    background: white;
    border-radius: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.16);
    border: 1px solid rgba(0,0,0,0.06);
    padding: 0;
  }
  .archeo-popup .leaflet-popup-content {
    margin: 0;
    font-family: 'Geist', sans-serif;
  }
  .archeo-popup .leaflet-popup-tip {
    background: white;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  }
  .archeo-popup .leaflet-popup-close-button {
    display: none;
  }
  .leaflet-container {
    background: #0c1117 !important;
    font-family: 'Geist', sans-serif !important;
  }
`;