import { useState, useMemo, useEffect, useRef } from "react";
import {
  Eye,
  EyeOff,
  Layers,
  ChevronDown,
  Check,
  Maximize,
  X,
  ArrowLeft,
  Plus,
  Minus,
  Copy,
  ExternalLink,
  Locate,
} from "lucide-react";
import { type Activity, ACTIVITIES } from "../../data/mockData";
import {
  toLatLng,
  getPinColor,
  getAccuracyLabel,
  getAccuracyRadiusMeters,
  haversineDistance,
  createPinSvg,
  TILE_LAYERS,
  LABELS_OVERLAY,
  LEAFLET_CUSTOM_CSS,
} from "../../data/mapUtils";
import { useIsMobile } from "../ui/use-mobile";
import { Button } from "../ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface DetailMapProps {
  compact?: boolean;
  activity?: Activity;
  openPopupOnLoad?: boolean;
  isFullscreen?: boolean;
  onRequestFullscreen?: () => void;
  onExitFullscreen?: () => void;
}

// Build white popup HTML for a pin (shown on click)
function pinPopupHtml(
  a: Activity,
  distLabel?: string,
  isCurrentLocation?: boolean
): string {
  const color = getPinColor(a.accuracy);
  const accLabel = `Stupeň lokalizácie - ${a.accuracy}`;
  const datingTags = a.dating
    .slice(0, 3)
    .map((d) => {
      return `<span style="font-size:10px;font-weight:500;padding:2px 7px;border-radius:4px;background:rgba(0,0,0,0.05);color:#4a5565;display:inline-block;">${d.period}</span>`;
    })
    .join(" ");

  const distRow = distLabel
    ? `<div style="display:flex;align-items:center;gap:4px;font-size:11px;color:#8b8f97;font-family:'Geist Mono',monospace;margin-bottom:8px;">
        <span>↗</span> <span>${distLabel} od aktuálnej</span>
      </div>`
    : "";

  const bottomSection = isCurrentLocation
    ? `<div style="
        width:100%;padding:8px 0;background:#f0f7ff;color:#1a62ff;border:1.5px solid #1a62ff;border-radius:8px;
        font-size:13px;font-weight:600;font-family:'Geist',sans-serif;text-align:center;
        display:flex;align-items:center;justify-content:center;gap:6px;
      ">
        <span style="width:8px;height:8px;border-radius:50%;background:#1a62ff;display:inline-block;"></span>
        Aktuálna lokalita
      </div>`
    : `<button class="archeo-detail-btn" data-ca="${a.ca}" style="
      width:100%;padding:8px 0;background:#1a62ff;color:white;border:none;border-radius:8px;
      font-size:13px;font-weight:600;cursor:pointer;font-family:'Geist',sans-serif;
      transition:background 0.15s;
    " onmouseover="this.style.background='#0235b0'" onmouseout="this.style.background='#1a62ff'">
      Zobraziť detail →
    </button>`;

  return `<div style="padding:14px 16px;min-width:220px;max-width:260px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <span style="font-family:'Geist Mono',monospace;font-weight:700;font-size:13px;color:#1a62ff;">ČA ${a.ca}</span>
      <div style="display:flex;align-items:center;gap:5px;">
        <div style="width:8px;height:8px;border-radius:50%;background:${color};"></div>
        <span style="font-size:11px;font-weight:500;color:#8b8f97;">${accLabel}</span>
      </div>
    </div>
    <div style="font-size:16px;font-weight:700;color:#0a0a0a;letter-spacing:-0.3px;margin-bottom:3px;line-height:1.25;">${a.name}</div>
    <div style="font-size:12px;font-weight:400;color:#6a7282;margin-bottom:8px;">okres ${a.okres}, ${a.kraj}</div>
    ${distRow}
    ${datingTags ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">${datingTags}</div>` : ""}
    ${bottomSection}
  </div>`;
}

export function DetailMap({ compact, activity, openPopupOnLoad, isFullscreen, onRequestFullscreen, onExitFullscreen }: DetailMapProps) {
  const [showNearby, setShowNearby] = useState(false);
  const [activeLayer, setActiveLayer] = useState<"satellite" | "normal">("satellite");
  const [layerDropdownOpen, setLayerDropdownOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollHintTimeout = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const linesRef = useRef<L.LayerGroup | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const mainMarkerRef = useRef<L.Marker | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const nearbyBtnRef = useRef<HTMLDivElement>(null);
  const gpsBtnRef = useRef<HTMLDivElement>(null);

  // On mobile default (compact, not fullscreen): map is static
  const isStaticMobile = isMobile && compact && !isFullscreen;

  const nearbyActivities = useMemo(() => {
    if (!activity) return [];
    return ACTIVITIES.filter((a) => {
      if (a.id === activity.id) return false;
      const dx = a.mapX - activity.mapX;
      const dy = a.mapY - activity.mapY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < 20;
    });
  }, [activity]);

  const activityLatLng = useMemo(() => {
    if (!activity) return null;
    return toLatLng(activity.mapX, activity.mapY);
  }, [activity]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLayerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Prevent Leaflet from capturing clicks on overlay UI buttons
  useEffect(() => {
    if (nearbyBtnRef.current) {
      L.DomEvent.disableClickPropagation(nearbyBtnRef.current);
    }
    if (dropdownRef.current) {
      L.DomEvent.disableClickPropagation(dropdownRef.current);
    }
    if (gpsBtnRef.current) {
      L.DomEvent.disableClickPropagation(gpsBtnRef.current);
    }
  });

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || !activityLatLng) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center: activityLatLng as L.LatLngExpression,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: isStaticMobile ? false : !isMobile,
      dragging: isStaticMobile ? false : (!isMobile || !compact || isFullscreen),
      touchZoom: isStaticMobile ? false : true,
    });

    const tileConfig = TILE_LAYERS[activeLayer];
    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);
    linesRef.current = L.layerGroup().addTo(map);

    // Add labels overlay for satellite view on init
    if (activeLayer === "satellite") {
      const labelsLayer = L.tileLayer(LABELS_OVERLAY.url, {
        attribution: LABELS_OVERLAY.attribution,
        maxZoom: 19,
        pane: "overlayPane",
      }).addTo(map);
      labelsLayerRef.current = labelsLayer;
    }

    // Accuracy circle (dashed area)
    const accuracyRadius = getAccuracyRadiusMeters(activity!.accuracy);
    const color = getPinColor(activity!.accuracy);
    const circle = L.circle(activityLatLng as L.LatLngExpression, {
      radius: accuracyRadius,
      color: color,
      fillColor: color,
      fillOpacity: 0.12,
      weight: 2,
      dashArray: "6, 4",
    }).addTo(map);
    circleRef.current = circle;

    // Gesture handling
    const mapContainer = map.getContainer();
    let wheelHandler: ((e: WheelEvent) => void) | null = null;
    let touchHandler: ((e: TouchEvent) => void) | null = null;
    if (!isStaticMobile && isMobile) {
      wheelHandler = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
          map.scrollWheelZoom.enable();
          clearTimeout((map as any)._gestureReEnableTimer);
          (map as any)._gestureReEnableTimer = setTimeout(() => {
            map.scrollWheelZoom.disable();
          }, 400);
        } else {
          setShowScrollHint(true);
          if (scrollHintTimeout.current) clearTimeout(scrollHintTimeout.current);
          scrollHintTimeout.current = setTimeout(() => setShowScrollHint(false), 1600);
        }
      };
      mapContainer.addEventListener("wheel", wheelHandler, { passive: true });

      if (compact && !isFullscreen) {
        touchHandler = (e: TouchEvent) => {
          if (e.touches.length === 1) {
            setShowScrollHint(true);
            if (scrollHintTimeout.current) clearTimeout(scrollHintTimeout.current);
            scrollHintTimeout.current = setTimeout(() => setShowScrollHint(false), 1600);
          }
        };
        mapContainer.addEventListener("touchstart", touchHandler, { passive: true });
      }
    }

    // Handle popup button clicks
    map.on("popupopen", () => {
      setTimeout(() => {
        document.querySelectorAll(".archeo-detail-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const ca = (e.currentTarget as HTMLElement).getAttribute("data-ca");
            if (ca) navigate(`/detail/${ca}`);
          });
        });
      }, 50);
    });

    return () => {
      if (wheelHandler) {
        mapContainer.removeEventListener("wheel", wheelHandler);
      }
      if (touchHandler) {
        mapContainer.removeEventListener("touchstart", touchHandler);
      }
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity?.id, isFullscreen]);

  // Cleanup hint timeout
  useEffect(() => {
    return () => {
      if (scrollHintTimeout.current) clearTimeout(scrollHintTimeout.current);
    };
  }, []);

  // Switch tile layer
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    mapRef.current.removeLayer(tileLayerRef.current);
    if (labelsLayerRef.current) {
      mapRef.current.removeLayer(labelsLayerRef.current);
      labelsLayerRef.current = null;
    }
    const tileConfig = TILE_LAYERS[activeLayer];
    const newLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 19,
    }).addTo(mapRef.current);
    tileLayerRef.current = newLayer;
    if (activeLayer === "satellite") {
      const labelsLayer = L.tileLayer(LABELS_OVERLAY.url, {
        attribution: LABELS_OVERLAY.attribution,
        maxZoom: 19,
        pane: "overlayPane",
      }).addTo(mapRef.current);
      labelsLayerRef.current = labelsLayer;
    }
  }, [activeLayer]);

  // Determine if pin should be shown (not on default hero, yes on fullscreen/desktop)
  const showPin = !compact || isFullscreen || !isMobile;

  // Update markers and lines
  useEffect(() => {
    if (!mapRef.current || !markersRef.current || !linesRef.current || !activity || !activityLatLng) return;

    const group = markersRef.current;
    const lineGroup = linesRef.current;
    group.clearLayers();
    lineGroup.clearLayers();

    const mainColor = getPinColor(activity.accuracy);
    const mainLatLng = activityLatLng;

    // Main pin — only show if not in static hero
    if (showPin) {
      const isTeardrop = activity.accuracy === 1;
      const mainSz = isMobile ? 52 : 48;
      const mainAnchorY = isTeardrop ? mainSz : mainSz / 2;
      const mainIcon = L.divIcon({
        html: createPinSvg(mainColor, true, mainSz, activity.accuracy),
        className: "archeo-pin",
        iconSize: [mainSz, mainSz],
        iconAnchor: [mainSz / 2, mainAnchorY],
      });

      const mainMarker = L.marker(mainLatLng as L.LatLngExpression, {
        icon: mainIcon,
        zIndexOffset: 1000,
      });

      mainMarker.bindPopup(pinPopupHtml(activity, undefined, true), {
        className: "archeo-popup",
        maxWidth: 280,
        offset: [0, isTeardrop ? -4 : -16],
      });

      mainMarker.addTo(group);
      mainMarkerRef.current = mainMarker;

      // Open popup on load (desktop only)
      if (openPopupOnLoad && !isMobile) {
        setTimeout(() => {
          mainMarker.openPopup();
        }, 300);
      }
    }

    // Nearby pins — just show pins, no lines or distances
    if (showNearby) {
      const bounds = L.latLngBounds([mainLatLng as L.LatLngExpression]);

      nearbyActivities.forEach((a) => {
        const nearbyLatLng = toLatLng(a.mapX, a.mapY);
        const nearbyColor = getPinColor(a.accuracy);

        const nearbySz = isMobile ? 36 : 32;
        const nearbyIsTeardrop = a.accuracy === 1;
        const nearbyAnchorY = nearbyIsTeardrop ? nearbySz : nearbySz / 2;
        const nearbyIcon = L.divIcon({
          html: createPinSvg(nearbyColor, false, nearbySz, a.accuracy),
          className: "archeo-pin",
          iconSize: [nearbySz, nearbySz],
          iconAnchor: [nearbySz / 2, nearbyAnchorY],
        });

        const marker = L.marker(nearbyLatLng as L.LatLngExpression, {
          icon: nearbyIcon,
          zIndexOffset: 500,
          opacity: 0.85,
        });

        marker.bindPopup(pinPopupHtml(a), {
          className: "archeo-popup",
          maxWidth: 280,
          offset: [0, nearbyIsTeardrop ? -4 : -8],
        });

        marker.addTo(group);
        bounds.extend(nearbyLatLng as L.LatLngExpression);
      });

      // Zoom out to fit all nearby activities
      if (nearbyActivities.length > 0 && mapRef.current) {
        mapRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
      }
    } else {
      // Zoom back to main activity
      if (mapRef.current) {
        mapRef.current.setView(mainLatLng as L.LatLngExpression, 14, { animate: true });
      }
    }
  }, [activity, activityLatLng, showNearby, nearbyActivities, navigate, openPopupOnLoad, isMobile, showPin]);

  if (!activity) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-[#1a1a2e]">
        <div className="absolute inset-0 flex items-center justify-center text-white/40">
          Žiadna aktivita
        </div>
      </div>
    );
  }

  // Hide all overlay buttons on mobile default (non-fullscreen) detail hero
  const showOverlayButtons = !isStaticMobile;

  const handleCopyGps = () => {
    if (!activity) return;
    const gps = `${activity.suradnicaX}, ${activity.suradnicaY}`;
    const textarea = document.createElement("textarea");
    textarea.value = gps;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      toast.success("GPS skopírované", { description: gps, duration: 2000 });
    } catch {
      toast.error("Kopírovanie zlyhalo");
    }
    document.body.removeChild(textarea);
  };

  const handleOpenMaps = () => {
    if (!activity) return;
    // Use converted lat/lng for Google Maps (mapX/mapY → WGS84)
    const [lat, lng] = toLatLng(activity.mapX, activity.mapY);
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0c1117]">
      {/* Leaflet map container */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Custom styles */}
      <style>{LEAFLET_CUSTOM_CSS}</style>

      {/* Mobile scroll gesture hint */}
      {showScrollHint && (
        <div className="absolute inset-0 flex items-center justify-center z-[4] pointer-events-none bg-black/10 backdrop-blur-[1px] transition-opacity duration-200">
          <div className="bg-[#171717]/80 backdrop-blur-sm text-white rounded-xl px-5 py-3 text-[14px] font-[500] shadow-lg animate-in fade-in duration-200">
            {isMobile ? (
              "Použite 2 prsty pre posúvanie mapy"
            ) : (
              <>
                Použite{" "}
                <kbd className="font-['Geist_Mono',monospace] bg-white/20 px-1.5 py-0.5 rounded mx-1 text-[13px]">
                  {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}
                </kbd>{" "}
                + scroll pre priblíženie mapy
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Overlay UI ── */}

      {/* Mobile: Fullscreen + GPS buttons (shown on static hero) */}
      {isStaticMobile && (
        <div className="absolute top-3 left-3 right-3 z-[5] flex items-center justify-between" ref={gpsBtnRef}>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyGps}
              className="bg-white/95 backdrop-blur-sm border-[#e5e5e5] shadow-sm h-9 px-3 gap-2 rounded-lg"
            >
              <Copy className="size-4" />
              <span className="text-[12px] font-[500]">GPS</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenMaps}
              className="bg-white/95 backdrop-blur-sm border-[#e5e5e5] shadow-sm h-9 px-3 gap-2 rounded-lg"
            >
              <ExternalLink className="size-4" />
              <span className="text-[12px] font-[500]">Maps</span>
            </Button>
          </div>
          {onRequestFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestFullscreen}
              className="bg-white/95 backdrop-blur-sm border-[#e5e5e5] shadow-sm h-9 px-3 gap-2 rounded-lg"
            >
              <Maximize className="size-4" />
              <span className="text-[12px] font-[500]">Zväčšiť mapu</span>
            </Button>
          )}
        </div>
      )}

      {/* Fullscreen mobile: top navbar like image viewer */}
      {isFullscreen && isMobile && onExitFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-[5] bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]">
          <div className="flex items-center justify-between px-2 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExitFullscreen}
              className="text-[#1a62ff] hover:text-[#034ae8] hover:bg-blue-50 gap-1 px-2 h-9"
            >
              <ArrowLeft className="size-4" />
              <span className="text-[14px] font-[500]">Zavrieť</span>
            </Button>
            <span className="text-[14px] font-[600] text-[#171717]">Mapa</span>
            <div className="w-[72px]" /> {/* spacer for centering */}
          </div>
        </div>
      )}

      {/* GPS buttons — shown on desktop map and fullscreen mobile */}
      {showOverlayButtons && (
        <div className={`absolute ${isFullscreen && isMobile ? "top-14 left-3" : compact ? "top-3 left-3" : "top-4 left-4"} z-[5] flex gap-1.5`}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyGps}
            className="bg-white/95 backdrop-blur-sm border-[#e5e5e5] shadow-sm h-9 px-3 gap-2 rounded-lg"
          >
            <Copy className="size-4" />
            <span className="text-[12px] font-[500]">Kopírovať GPS</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenMaps}
            className="bg-white/95 backdrop-blur-sm border-[#e5e5e5] shadow-sm h-9 px-3 gap-2 rounded-lg"
          >
            <ExternalLink className="size-4" />
            <span className="text-[12px] font-[500]">Otvoriť v Maps</span>
          </Button>
        </div>
      )}

      {/* Bottom-left: Nearby activities toggle — hide on static mobile */}
      {showOverlayButtons && nearbyActivities.length > 0 && (
        <div className={`absolute ${compact ? "bottom-2 left-2" : "bottom-4 left-4"} z-[5]`} ref={nearbyBtnRef}>
          <button
            onClick={() => setShowNearby(!showNearby)}
            className={`flex items-center gap-2 backdrop-blur-md text-[#171717] rounded-lg px-3 py-2 border shadow-sm hover:bg-white transition-colors cursor-pointer ${
              showNearby
                ? "bg-[#e5f0ff] border-[#1a62ff]"
                : "bg-white/95 border-[#e5e5e5]"
            }`}
          >
            {showNearby ? (
              <Eye className="size-3.5 text-[#1a62ff]" />
            ) : (
              <EyeOff className="size-3.5 text-[#6a7282]" />
            )}
            <span className={`text-[12px] font-[500] ${showNearby ? "text-[#1a62ff]" : "text-[#374151]"}`}>
              {nearbyActivities.length}{" "}
              {nearbyActivities.length === 1
                ? "blízka aktivita"
                : nearbyActivities.length < 5
                ? "blízke aktivity"
                : "blízkych aktivít"}
            </span>
          </button>
        </div>
      )}

      {/* Bottom-right: Layer dropdown + zoom — hide on static mobile */}
      {showOverlayButtons && (
        <div
          className={`absolute ${compact ? "bottom-2 right-2" : "bottom-4 right-3"} z-[5] flex flex-col gap-1.5 items-end`}
          ref={dropdownRef}
        >
          {/* Zoom in/out */}
          <div className="flex flex-col gap-0.5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => mapRef.current?.zoomIn()}
              className="bg-white/95 backdrop-blur-sm rounded-lg border-[#e5e5e5] shadow-sm size-9"
            >
              <Plus className="size-4 text-[#171717]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => mapRef.current?.zoomOut()}
              className="bg-white/95 backdrop-blur-sm rounded-lg border-[#e5e5e5] shadow-sm size-9"
            >
              <Minus className="size-4 text-[#171717]" />
            </Button>
          </div>
          {/* Layer switcher */}
          <button
            onClick={() => setLayerDropdownOpen(!layerDropdownOpen)}
            className="bg-white/95 backdrop-blur-sm rounded-lg border border-[#e5e5e5] flex items-center justify-between px-3 py-1.5 gap-2 h-9 shadow-sm cursor-pointer hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-[#171717]" />
              <span className="text-[12px] font-[500] tracking-[-0.14px] text-[#171717] whitespace-nowrap">
                {TILE_LAYERS[activeLayer].name}
              </span>
            </div>
            <ChevronDown
              className={`size-3.5 text-[#6a7282] transition-transform ${
                layerDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {layerDropdownOpen && (
            <div className="absolute bottom-full mb-1.5 right-0 bg-white rounded-lg border border-[#e5e5e5] shadow-lg overflow-hidden min-w-[190px]">
              {(Object.keys(TILE_LAYERS) as Array<"satellite" | "normal">).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveLayer(key);
                    setLayerDropdownOpen(false);
                  }}
                  className="flex items-center justify-between gap-3 w-full px-3 py-2.5 hover:bg-[#f5f7fa] transition-colors cursor-pointer text-left"
                >
                  <span
                    className={`text-[13px] font-[500] ${
                      activeLayer === key ? "text-[#1a62ff]" : "text-[#374151]"
                    }`}
                  >
                    {TILE_LAYERS[key].name}
                  </span>
                  {activeLayer === key && (
                    <Check className="size-4 text-[#1a62ff]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}