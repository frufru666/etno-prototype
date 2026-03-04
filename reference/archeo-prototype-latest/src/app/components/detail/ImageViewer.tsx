import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { ArrowLeft, Plus, Minus, ChevronDown, Info, Check } from "lucide-react";
import { Button } from "../ui/button";
import imgContainer from "figma:asset/773e9aeaa4bc8b135d36fc0267dab079aa2cff8d.png";
import imgContainer1 from "figma:asset/3a28314f6074d5c4f7f47306b99185456f73c97f.png";
import imgContainer2 from "figma:asset/d3fda19c92264b79ac4f36850c687362bfd21151.png";
import imgRectangle1460 from "figma:asset/0e6208e72ea285727d2d950112b4791c6472338d.png";
import imgRectangle1461 from "figma:asset/d29b1477119f8b1e3a3c8e9733ef7ea0745c5378.png";
import imgRectangle1451 from "figma:asset/4ae3cc154e96e1f28774605547be734d827eae27.png";
import imgRectangle1462 from "figma:asset/7158adb8a5328b1fe84ad84f214931c6cd715954.png";
import imgRectangle1463 from "figma:asset/43d0ed6c17aece1e9e6735b048c7d5803624ede6.png";
import imgRectangle1450 from "figma:asset/1482d14939e3e3907bafff50eaf613f2abddafca.png";

// ── Categories (no "Prehľad") ──
export const IMG_CATEGORIES = [
  { key: "nalezisko", label: "Nálezisko", fullLabel: "Nálezisko / Terén" },
  { key: "nalezy", label: "Nálezy", fullLabel: "Nálezy" },
  { key: "plany", label: "Plány", fullLabel: "Plány" },
  { key: "vizualizacie", label: "Vizualizácie", fullLabel: "Vizualizácie" },
] as const;

export type ImageCategory = (typeof IMG_CATEGORIES)[number]["key"];

// Each category uses a distinct set of images with varied counts
export const CATEGORY_IMAGES: Record<ImageCategory, string[]> = {
  // Ground / terrain photos — 8 images
  nalezisko: [
    imgContainer, imgRectangle1460, imgRectangle1461,
    imgRectangle1462, imgContainer,
    imgRectangle1460, imgRectangle1461, imgRectangle1462,
  ],
  // Stones / artifact finds — 8 images
  nalezy: [
    imgContainer1, imgContainer2, imgRectangle1463,
    imgContainer1, imgContainer2, imgRectangle1463,
    imgContainer1, imgContainer2,
  ],
  // White map / plan drawings — 5 images
  plany: [
    imgRectangle1450, imgRectangle1450, imgRectangle1450,
    imgRectangle1450, imgRectangle1450,
  ],
  // House with wooden fence / visualisations — 8 images
  vizualizacie: [
    imgRectangle1451, imgRectangle1451, imgRectangle1451,
    imgRectangle1451, imgRectangle1451, imgRectangle1451,
    imgRectangle1451, imgRectangle1451,
  ],
};

// Total count across all categories
export const TOTAL_IMAGE_COUNT = Object.values(CATEGORY_IMAGES).reduce((s, arr) => s + arr.length, 0);

interface ImageViewerProps {
  category?: ImageCategory;
  index?: number;
  onClose: () => void; // back to map/close
  onOpenGallery?: () => void; // back to gallery
  mobile?: boolean;
}

export function ImageViewer({ category: initCategory, index: initIndex, onClose, onOpenGallery, mobile }: ImageViewerProps) {
  const [category, setCategory] = useState<ImageCategory>(initCategory || "nalezisko");
  const [imageIndex, setImageIndex] = useState(initIndex || 0);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const catRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const images = CATEGORY_IMAGES[category];
  const currentImage = images[imageIndex] || images[0];
  const catDef = IMG_CATEGORIES.find((c) => c.key === category)!;

  // When category changes via dropdown, show first image
  const handleCategoryChange = (newCat: ImageCategory) => {
    setCategory(newCat);
    setImageIndex(0);
    setCatDropdownOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Reset zoom/pan when switching images
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [imageIndex]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbRef.current && carouselRef.current) {
      activeThumbRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [imageIndex]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(z - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    },
    [zoom, pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setPan({ x: panStart.current.panX + dx, y: panStart.current.panY + dy });
    },
    [isPanning]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 0.25, 5));
    } else {
      setZoom((z) => {
        const next = Math.max(z - 0.25, 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  }, []);

  // ── Category dropdown ──
  const CategoryDropdown = (
    <div className="relative" ref={catRef}>
      <Button
        variant="outline"
        onClick={() => setCatDropdownOpen(!catDropdownOpen)}
        className="rounded-lg border-[#e5e5e5] h-9 px-3 gap-2"
      >
        <span className="text-[13px] font-[600] text-[#171717]">
          {catDef.label} ({images.length})
        </span>
        <ChevronDown className={`size-4 text-[#6a7282] transition-transform ${catDropdownOpen ? "rotate-180" : ""}`} />
      </Button>
      {catDropdownOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white rounded-lg border border-[#e5e5e5] shadow-lg overflow-hidden min-w-[220px] z-10">
          {IMG_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className="flex items-center justify-between gap-3 w-full px-3 py-2.5 hover:bg-[#f5f7fa] transition-colors cursor-pointer text-left"
            >
              <span className={`text-[13px] font-[500] ${category === cat.key ? "text-[#1a62ff]" : "text-[#374151]"}`}>
                {cat.fullLabel} ({CATEGORY_IMAGES[cat.key].length})
              </span>
              {category === cat.key && <Check className="size-4 text-[#1a62ff]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Build flat carousel items: label badges + thumbnails across ALL categories
  const allCarouselItems = useMemo(() => {
    const items: Array<
      | { type: "label"; catKey: ImageCategory; label: string; count: number }
      | { type: "thumb"; catKey: ImageCategory; index: number; src: string }
    > = [];
    IMG_CATEGORIES.forEach((cat) => {
      const imgs = CATEGORY_IMAGES[cat.key];
      items.push({ type: "label", catKey: cat.key, label: cat.label, count: imgs.length });
      imgs.forEach((src, i) => {
        items.push({ type: "thumb", catKey: cat.key, index: i, src });
      });
    });
    return items;
  }, []);

  // ── Thumbnail carousel with category labels ──
  const CarouselStrip = (
    <div ref={carouselRef} className="flex items-center gap-1 px-4 py-3 bg-white overflow-x-auto shrink-0">
      {allCarouselItems.map((item, idx) => {
        if (item.type === "label") {
          const isActive = category === item.catKey;
          return (
            <div
              key={`label-${item.catKey}`}
              className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-md ${idx > 0 ? "ml-2" : ""} ${
                isActive ? "bg-[#e5f0ff]" : "bg-[#f5f5f5]"
              }`}
            >
              <span className={`text-[10px] font-[600] whitespace-nowrap ${
                isActive ? "text-[#1a62ff]" : "text-[#8b8f97]"
              }`}>
                {item.label}
              </span>
              <span className={`text-[9px] font-[500] ${
                isActive ? "text-[#1a62ff]/60" : "text-[#8b8f97]/60"
              }`}>
                {item.count}
              </span>
            </div>
          );
        }
        const isActive = category === item.catKey && imageIndex === item.index;
        return (
          <button
            key={`thumb-${item.catKey}-${item.index}`}
            ref={isActive ? activeThumbRef : undefined}
            onClick={() => {
              if (item.catKey !== category) {
                setCategory(item.catKey);
              }
              setImageIndex(item.index);
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className={`size-12 shrink-0 overflow-hidden cursor-pointer transition-all rounded ${
              isActive
                ? "ring-2 ring-[#171717] ring-offset-1"
                : category === item.catKey
                ? "opacity-60 hover:opacity-90"
                : "opacity-30 hover:opacity-60"
            }`}
          >
            <img src={item.src} alt="" className="w-full h-full object-cover" />
          </button>
        );
      })}
    </div>
  );

  // ── Annotation line ──
  const annotationText = `${catDef.fullLabel} — obrázok ${imageIndex + 1} z ${images.length}`;

  // ── Mobile layout ──
  if (mobile) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-2 border-b border-[#e5e5e5] shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenGallery || onClose}
            className="text-[#1a62ff] hover:text-[#034ae8] hover:bg-blue-50 gap-1 px-2 h-9"
          >
            <ArrowLeft className="size-4" />
            <span className="text-[14px] font-[500]">Naspäť do galérie</span>
          </Button>
          {CategoryDropdown}
        </div>

        {/* Main image */}
        <div
          className="flex-1 relative flex items-center justify-center bg-[#e5e5e5] overflow-hidden select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default" }}
        >
          <img
            src={currentImage}
            alt=""
            className="max-w-full max-h-full object-contain pointer-events-none"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transition: isPanning ? "none" : "transform 0.2s ease",
            }}
            draggable={false}
          />

          {/* Zoom controls */}
          <div className="absolute right-3 top-3 flex flex-col gap-1 z-10">
            <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-white shadow-sm rounded-lg size-9 border-[#e5e5e5]">
              <Plus className="size-4 text-[#171717]" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-white shadow-sm rounded-lg size-9 border-[#e5e5e5]">
              <Minus className="size-4 text-[#171717]" />
            </Button>
          </div>

          {/* Info toggle */}
          <Button
            variant={showAnnotation ? "default" : "outline"}
            size="icon"
            onClick={() => setShowAnnotation(!showAnnotation)}
            className={`absolute right-3 bottom-3 z-10 rounded-lg size-9 ${
              showAnnotation ? "bg-[#171717] hover:bg-[#333] text-white border-0" : "bg-white border-[#e5e5e5]"
            }`}
          >
            <Info className="size-4" />
          </Button>
        </div>

        {/* Annotation */}
        {showAnnotation && (
          <div className="bg-[#171717] text-white px-4 py-3 shrink-0">
            <span className="text-[14px] leading-[18px]">
              <span className="font-[700]">Poznámka</span>{" "}
              <span className="italic">{annotationText}</span>
            </span>
          </div>
        )}

        {/* Thumbnails */}
        {CarouselStrip}
      </div>
    );
  }

  // ── Desktop layout ──
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#e5e5e5] shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenGallery || onClose}
          className="text-[#171717] hover:text-[#737373] gap-1 px-2 h-9"
        >
          <ArrowLeft className="size-4" />
          <span className="text-[14px] font-[500]">Naspäť do galérie</span>
        </Button>
        {CategoryDropdown}
      </div>

      {/* Main image */}
      <div
        className="flex-1 relative flex items-center justify-center bg-[#fafafa] p-8 overflow-hidden select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default" }}
      >
        <img
          src={currentImage}
          alt=""
          className="max-w-full max-h-full object-contain rounded-lg pointer-events-none"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isPanning ? "none" : "transform 0.2s ease",
          }}
          draggable={false}
        />

        {/* Zoom controls */}
        <div className="absolute right-4 top-1/3 flex flex-col gap-1 z-10">
          <Button variant="outline" size="icon" onClick={handleZoomIn} className="bg-white shadow-sm rounded-lg size-8 border-[#e5e5e5]">
            <Plus className="size-4 text-[#171717]" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut} className="bg-white shadow-sm rounded-lg size-8 border-[#e5e5e5]">
            <Minus className="size-4 text-[#171717]" />
          </Button>
        </div>

        {/* Info toggle */}
        <Button
          variant={showAnnotation ? "default" : "outline"}
          size="icon"
          onClick={() => setShowAnnotation(!showAnnotation)}
          className={`absolute right-4 bottom-4 z-10 rounded-lg size-8 ${
            showAnnotation ? "bg-[#171717] hover:bg-[#333] text-white border-0" : "bg-white border-[#e5e5e5]"
          }`}
        >
          <Info className="size-4" />
        </Button>
      </div>

      {/* Annotation */}
      {showAnnotation && (
        <div className="bg-[#1e293b] text-white px-6 py-3 shrink-0">
          <span className="text-[13px] font-[500] leading-[18px]">
            <span className="font-[700]">Poznámka</span>{" "}
            <span>{annotationText}</span>
          </span>
        </div>
      )}

      {/* Thumbnails */}
      <div className="border-t border-[#e5e5e5]">
        {CarouselStrip}
      </div>
    </div>
  );
}