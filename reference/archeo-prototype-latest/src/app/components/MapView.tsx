import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Info,
  Layers,
  ChevronDown,
  X,
  Check,
  ChevronRight,
  Locate,
  Plus,
  Minus,
} from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";
import { Button } from "./ui/button";
import {
  type Activity,
  ACTIVITIES,
  clusterActivities,
} from "../data/mockData";
import {
  toLatLng,
  getPinColor,
  createPinSvg,
  createClusterSvg,
  createMultiPinSvg,
  TILE_LAYERS,
  LABELS_OVERLAY,
  LEAFLET_CUSTOM_CSS,
} from "../data/mapUtils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  filteredActivities?: Activity[];
}

// Build popup HTML for a single activity
function singlePopupHtml(a: Activity): string {
  const color = getPinColor(a.accuracy);
  const accLabel = `Stupeň lokalizácie - ${a.accuracy}`;
  const datingTags = a.dating
    .slice(0, 3)
    .map((d) => {
      const bg = d.typeColor === "green" ? "#dcfce7" : d.typeColor === "red" ? "#ffe2e2" : "#f3f4f6";
      const fg = d.typeColor === "green" ? "#016630" : d.typeColor === "red" ? "#c10007" : "#6a7282";
      return `<span style="font-size:11px;font-weight:500;padding:2px 8px;border-radius:4px;background:${bg};color:${fg};display:inline-block;">${d.type}</span>`;
    })
    .join(" ");

  return `<div style="padding:14px 16px;min-width:240px;max-width:280px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <span style="font-family:'Geist Mono',monospace;font-weight:700;font-size:13px;color:#1a62ff;">ČA ${a.ca}</span>
      <div style="display:flex;align-items:center;gap:5px;">
        <div style="width:8px;height:8px;border-radius:50%;background:${color};"></div>
        <span style="font-size:11px;font-weight:500;color:#8b8f97;">${accLabel}</span>
      </div>
    </div>
    <div style="font-size:17px;font-weight:700;color:#0a0a0a;letter-spacing:-0.3px;margin-bottom:4px;line-height:1.25;">${a.name}</div>
    <div style="font-size:13px;font-weight:400;color:#6a7282;margin-bottom:10px;">okres ${a.okres}</div>
    ${datingTags ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">${datingTags}</div>` : ""}
    <button class="archeo-detail-btn" data-ca="${a.ca}" style="
      width:100%;padding:8px 0;background:#1a62ff;color:white;border:none;border-radius:8px;
      font-size:13px;font-weight:600;cursor:pointer;font-family:'Geist',sans-serif;
      transition:background 0.15s;
    " onmouseover="this.style.background='#0235b0'" onmouseout="this.style.background='#1a62ff'">
      Detail aktivity →
    </button>
  </div>`;
}

// Build popup HTML for a cluster/multi group
function clusterPopupHtml(activities: Activity[]): string {
  const count = activities.length;
  const label = count === 1 ? "aktivita" : count < 5 ? "aktivity" : "aktivít";
  const items = activities
    .slice(0, 8)
    .map((a) => {
      const color = getPinColor(a.accuracy);
      return `<button class="archeo-detail-btn" data-ca="${a.ca}" style="
        display:flex;flex-direction:column;gap:3px;padding:8px 10px;border-radius:8px;
        border:1px solid #f0f1f3;background:white;width:100%;cursor:pointer;text-align:left;
        font-family:'Geist',sans-serif;transition:background 0.15s;
      " onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
        <div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
          <span style="font-family:'Geist Mono',monospace;font-weight:700;font-size:12px;color:#1a62ff;">ČA ${a.ca}</span>
          <div style="display:flex;align-items:center;gap:4px;">
            <div style="width:7px;height:7px;border-radius:50%;background:${color};"></div>
            <span style="font-size:10px;font-weight:500;color:#8b8f97;">Stupeň ${a.accuracy}</span>
          </div>
        </div>
        <span style="font-size:13px;font-weight:600;color:#0a0a0a;">${a.name}</span>
        <span style="font-size:11px;font-weight:400;color:#6a7282;">okres ${a.okres}</span>
      </button>`;
    })
    .join("");

  const moreText = count > 8 ? `<div style="text-align:center;font-size:11px;color:#8b8f97;padding:4px;">+${count - 8} ďalších</div>` : "";

  return `<div style="padding:12px 14px;min-width:250px;max-width:280px;max-height:340px;overflow-y:auto;">
    <div style="font-size:12px;font-weight:600;color:#8b8f97;letter-spacing:0.4px;text-transform:uppercase;margin-bottom:8px;">
      ${count} ${label}
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;">${items}</div>
    ${moreText}
  </div>`;
}

export function MapView({ filteredActivities }: MapViewProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [infoDismissed, setInfoDismissed] = useState(false);
  const [activeLayer, setActiveLayer] = useState<"satellite" | "normal">("satellite");
  const [layerDropdownOpen, setLayerDropdownOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const scrollHintTimeout = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  const activities = filteredActivities || ACTIVITIES;
  const clusters = useMemo(() => clusterActivities(activities, 12), [activities]);

  const notOnMap = useMemo(() => {
    return activities.filter((a) => a.accuracy >= 4).length;
  }, [activities]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLayerDropdownOpen(false);
      }
      if (legendRef.current && !legendRef.current.contains(e.target as Node)) {
        setLegendOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Center of Slovakia
    const center: L.LatLngExpression = [48.7, 19.5];
    const map = L.map(containerRef.current, {
      center,
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: isMobile ? false : false, // Both: require gesture
      dragging: !isMobile, // Mobile: disable single-finger drag
      touchZoom: true, // Mobile: allow pinch zoom (2 fingers)
    });

    const tileConfig = TILE_LAYERS[activeLayer];
    const tileLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    // Add labels overlay for satellite view on init
    if (activeLayer === "satellite") {
      const labelsLayer = L.tileLayer(LABELS_OVERLAY.url, {
        attribution: LABELS_OVERLAY.attribution,
        maxZoom: 19,
        pane: "overlayPane",
      }).addTo(map);
      labelsLayerRef.current = labelsLayer;
    }

    // ── Cmd/Ctrl+scroll gesture handling (both desktop and mobile) ──
    const mapContainer = map.getContainer();
    const onWheel = (e: WheelEvent) => {
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
    mapContainer.addEventListener("wheel", onWheel, { passive: true });

    // Mobile: show 2-finger hint on single-finger touch
    let touchStartHandler: ((e: TouchEvent) => void) | null = null;
    if (isMobile) {
      touchStartHandler = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          setShowScrollHint(true);
          if (scrollHintTimeout.current) clearTimeout(scrollHintTimeout.current);
          scrollHintTimeout.current = setTimeout(() => setShowScrollHint(false), 1600);
        }
      };
      mapContainer.addEventListener("touchstart", touchStartHandler, { passive: true });
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
      mapContainer.removeEventListener("wheel", onWheel);
      if (touchStartHandler) {
        mapContainer.removeEventListener("touchstart", touchStartHandler);
      }
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const tileConfig = TILE_LAYERS[activeLayer];
    const newLayer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 19,
    }).addTo(mapRef.current);
    tileLayerRef.current = newLayer;

    // Add/remove labels overlay for satellite view
    if (activeLayer === "satellite") {
      if (!labelsLayerRef.current) {
        const labelsLayer = L.tileLayer(LABELS_OVERLAY.url, {
          attribution: LABELS_OVERLAY.attribution,
          maxZoom: 19,
          pane: "overlayPane",
        }).addTo(mapRef.current);
        labelsLayerRef.current = labelsLayer;
      }
    } else {
      if (labelsLayerRef.current) {
        mapRef.current.removeLayer(labelsLayerRef.current);
        labelsLayerRef.current = null;
      }
    }
  }, [activeLayer]);

  // Update markers when filtered activities change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    const group = markersRef.current;
    group.clearLayers();

    // Zoom to fit filtered pins
    const mappableActivities = activities.filter((a) => a.accuracy < 4);
    if (mappableActivities.length > 0) {
      const bounds = L.latLngBounds(
        mappableActivities.map((a) => toLatLng(a.mapX, a.mapY) as L.LatLngExpression)
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
    }

    clusters.forEach((cluster) => {
      const clusterActivitiesList = cluster.activityIds
        .map((id) => activities.find((a) => a.id === id)!)
        .filter(Boolean);

      const isSingle = cluster.count === 1;
      const singleActivity = isSingle ? clusterActivitiesList[0] : null;
      const isMulti = cluster.isMulti && cluster.count > 1;

      const latLng = toLatLng(cluster.x, cluster.y);

      let icon: L.DivIcon;
      if (isSingle && singleActivity) {
        const color = getPinColor(singleActivity.accuracy);
        const isTeardrop = singleActivity.accuracy === 1;
        const sz = isMobile ? 44 : 40;
        const anchorY = isTeardrop ? sz : sz / 2;
        icon = L.divIcon({
          html: createPinSvg(color, false, sz, singleActivity.accuracy),
          className: "archeo-pin",
          iconSize: [sz, sz],
          iconAnchor: [sz / 2, anchorY],
        });
      } else if (isMulti) {
        const sz = isMobile ? 48 : 44;
        icon = L.divIcon({
          html: createMultiPinSvg(cluster.count, false, sz),
          className: "archeo-pin",
          iconSize: [sz, sz],
          iconAnchor: [sz / 2, sz / 2],
        });
      } else {
        const sz = cluster.count > 50 ? 56 : cluster.count > 10 ? 48 : 42;
        icon = L.divIcon({
          html: createClusterSvg(cluster.count, false),
          className: "archeo-cluster",
          iconSize: [sz, sz],
          iconAnchor: [sz / 2, sz / 2],
        });
      }

      const marker = L.marker(latLng as L.LatLngExpression, {
        icon,
        zIndexOffset: isSingle ? 100 : isMulti ? 200 : 50,
      });

      // Clusters zoom in on click; only singles and multi-pins show popups
      if (isSingle && singleActivity) {
        marker.bindPopup(singlePopupHtml(singleActivity), {
          className: "archeo-popup",
          maxWidth: 300,
          offset: [0, -8],
        });
      } else if (isMulti) {
        marker.bindPopup(clusterPopupHtml(clusterActivitiesList), {
          className: "archeo-popup",
          maxWidth: 300,
          offset: [0, -8],
        });
      } else {
        // Cluster: zoom in on click to split
        marker.on("click", () => {
          if (mapRef.current) {
            mapRef.current.setView(latLng as L.LatLngExpression, mapRef.current.getZoom() + 3, { animate: true });
          }
        });
      }

      marker.addTo(group);
    });
  }, [clusters, activities, navigate, isMobile]);

  return (
    <div
      className={`relative w-full ${
        isMobile ? "h-[calc(100dvh-57px)]" : "h-[calc(100vh-57px)]"
      } overflow-hidden`}
    >
      {/* Leaflet container */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Custom CSS */}
      <style>{LEAFLET_CUSTOM_CSS}</style>

      {/* Scroll/touch gesture hint overlay */}
      {showScrollHint && (
        <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none bg-black/10 backdrop-blur-[1px] transition-opacity duration-200">
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

      {/* Bottom bar */}
      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-[10]">
        {/* Left: Info box */}
        <div className="flex flex-col gap-1.5">
          {!infoDismissed && notOnMap > 0 && (
            <div className="bg-[#e5f0ff]/95 backdrop-blur-sm flex items-center justify-between rounded-lg px-2.5 py-2 gap-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Info className="size-4 text-[#1a62ff] shrink-0" />
                <span
                  className={`${
                    isMobile ? "text-[12px]" : "text-[14px]"
                  } font-[500] tracking-[-0.14px] text-[#171717] whitespace-nowrap`}
                >
                  {notOnMap}{" "}
                  {notOnMap === 1
                    ? "výsledok nie je"
                    : notOnMap < 5
                    ? "výsledky nie sú"
                    : "výsledkov nie je"}{" "}
                  v mape
                </span>
              </div>
              <button
                onClick={() => setInfoDismissed(true)}
                className="p-0.5 rounded cursor-pointer hover:bg-blue-100 transition-colors"
                aria-label="Zavrieť"
              >
                <X className="size-4 text-[#1a62ff]" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Legend, Zoom, Layer+Locate — all grouped */}
        <div className="flex flex-col items-end gap-4" ref={dropdownRef}>
          {/* Legend popover */}
          <div className="relative" ref={legendRef}>
            <button
              onClick={() => setLegendOpen(!legendOpen)}
              className={`bg-white rounded-lg border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] size-9 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                legendOpen ? "border-[#1a62ff]" : "border-[#e4e4e7]"
              }`}
              title="Legenda"
            >
              <Info className={`size-4 ${legendOpen ? "text-[#1a62ff]" : "text-[#09090b]"}`} />
            </button>
            {legendOpen && (
              <div className="absolute bottom-full mb-1.5 right-0 bg-white rounded-lg border border-[#e5e5e5] shadow-lg p-3 min-w-[180px] z-[11]">
                <p className="text-[11px] font-[600] text-[#737373] uppercase tracking-[0.5px] mb-2">Legenda</p>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[#00d4ff]" />
                    <span className="text-[12px] text-[#374151]">Stupeň 1 – presná</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-[#ff8a2b] rotate-45" />
                    <span className="text-[12px] text-[#374151]">Stupeň 2 – orientačná</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[#ff3b8b] border border-dashed border-white" />
                    <span className="text-[12px] text-[#374151]">Stupeň 3 – neurčená</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[rgba(23,23,23,0.6)] border border-white" />
                    <span className="text-[12px] text-[#374151]">Klaster</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Zoom in/out */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => mapRef.current?.zoomIn()}
              className="bg-white rounded-lg border-[#e4e4e7] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] size-9"
            >
              <Plus className="size-4 text-[#09090b]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => mapRef.current?.zoomOut()}
              className="bg-white rounded-lg border-[#e4e4e7] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] size-9"
            >
              <Minus className="size-4 text-[#09090b]" />
            </Button>
          </div>

          {/* Layer switcher + Locate me — horizontal row */}
          <div className="flex items-center gap-2">
            {/* Layer switcher */}
            <div className="relative">
              <button
                onClick={() => setLayerDropdownOpen(!layerDropdownOpen)}
                className="bg-white rounded-lg border border-[#e4e4e7] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] flex items-center justify-between px-3 py-2 gap-2 h-9 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Layers className="size-4 text-[#09090b]" />
                <span className="text-[12px] font-[500] text-[#18181b] whitespace-nowrap">
                  {TILE_LAYERS[activeLayer].name}
                </span>
                <ChevronDown
                  className={`size-3.5 text-[#71717b] transition-transform ${
                    layerDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {layerDropdownOpen && (
                <div className="absolute bottom-full mb-1.5 right-0 bg-white rounded-lg border border-[#e5e5e5] shadow-lg overflow-hidden min-w-[200px] z-[11]">
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

            {/* Locate me */}
            <button
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.locate({ setView: true, maxZoom: 14 });
                }
              }}
              className="bg-white rounded-lg border border-[#e4e4e7] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] size-9 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              title="Moja poloha"
            >
              <Locate className="size-4 text-[#09090b]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}