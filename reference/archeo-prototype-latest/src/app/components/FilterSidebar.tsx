import { useState, useMemo, useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import {
  ChevronRight,
  ArrowLeft,
  MapPin,
  Building2,
  Search,
  X,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  ACTIVITIES,
  FILTER_CATEGORIES,
  getUniqueValues,
  type Activity,
} from "../data/mockData";

interface FilterSidebarProps {
  mobile?: boolean;
  onApply?: () => void;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
  onSubViewChange?: (isOpen: boolean) => void;
}

type FilterKey = keyof Activity;

// Section label with icon
function SectionLabel({
  label,
  icon,
}: {
  label: string;
  icon: "geo" | "inst";
}) {
  return (
    <div className="flex items-center gap-1 pr-1">
      {icon === "geo" ? (
        <MapPin className="size-4 text-[#737373]" />
      ) : (
        <Building2 className="size-4 text-[#737373]" />
      )}
      <span className="text-[12px] font-[500] text-[#737373]">{label}</span>
    </div>
  );
}

// Filter category row
function FilterItem({
  label,
  selectedCount,
  onClick,
  isActive,
  hasSelection,
}: {
  label: string;
  selectedCount: number;
  onClick: () => void;
  isActive: boolean;
  hasSelection: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-9 rounded-lg relative flex items-center justify-between px-3 cursor-pointer transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a62ff] ${
        isActive
          ? "border-2 border-[#034ae8] bg-white"
          : hasSelection
          ? "bg-[#e6f0ff] border border-[#b3d1ff]"
          : "bg-white border border-[#e5e5e5]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[14px] font-[500] tracking-[-0.14px] ${
            isActive ? "text-[#034ae8]" : "text-[#171717]"
          }`}
        >
          {label}
        </span>
        {selectedCount > 0 && (
          <span className="bg-[#1a62ff] text-white text-[11px] font-[600] min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </div>
      <ChevronRight
        className={`size-4 ${isActive ? "text-[#034ae8]" : "text-[#171717]"}`}
      />
    </button>
  );
}

// Sub-view panel (options list with checkboxes)
function FilterSubPanel({
  filterKey,
  label,
  type,
  selected,
  onBack,
  onToggle,
  onReset,
  isMobile,
  hideReset,
  onApply,
  filteredCount,
}: {
  filterKey: FilterKey;
  label: string;
  type: "checkbox" | "radio";
  selected: string[];
  onBack: () => void;
  onToggle: (value: string) => void;
  onReset: () => void;
  isMobile?: boolean;
  hideReset?: boolean;
  onApply?: () => void;
  filteredCount?: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const options = useMemo(() => {
    const values = getUniqueValues(filterKey);
    const counts: Record<string, number> = {};
    for (const a of ACTIVITIES) {
      const val = a[filterKey] as string;
      if (val) counts[val] = (counts[val] || 0) + 1;
    }
    return values.map((v) => ({ value: v, count: counts[v] || 0 }));
  }, [filterKey]);

  const filtered = searchQuery
    ? options.filter((o) =>
        o.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <div className={`flex flex-col ${isMobile ? "h-[calc(100dvh-120px)]" : "h-full"}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="bg-[#1a62ff] text-white rounded-lg p-2 cursor-pointer hover:bg-[#034ae8] transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <span className="text-[16px] font-[600] tracking-[-0.16px] text-[#171717]">
            {label}
          </span>
        </div>
        {!hideReset && (
          <button
            onClick={onReset}
            className={`text-[14px] font-[600] tracking-[-0.14px] text-[#ef4444] px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity ${
              selected.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Reset
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#a3a3a3]" />
        <input
          type="text"
          placeholder="Hľadať..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 rounded-lg border border-[#d4d4d4] pl-10 pr-8 text-[14px] font-[500] text-[#171717] placeholder:text-[#a3a3a3] focus:outline-2 focus:outline-[#1a62ff] focus:border-[#1a62ff]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="size-4 text-[#737373]" />
          </button>
        )}
      </div>

      {/* Options list — scrollable */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col">
          {filtered.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => onToggle(opt.value)}
                className="flex items-center justify-between py-2.5 px-1 border-b border-[#f3f4f6] cursor-pointer hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {type === "checkbox" ? (
                    <div
                      className={`size-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${
                        isSelected
                          ? "bg-[#1a62ff] border-[#1a62ff]"
                          : "border-[#d4d4d4] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <Check className="size-3.5 text-white" />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                        isSelected ? "border-[#1a62ff]" : "border-[#d4d4d4]"
                      }`}
                    >
                      {isSelected && (
                        <div className="size-2.5 rounded-full bg-[#1a62ff]" />
                      )}
                    </div>
                  )}
                  <span className="text-[14px] font-[500] text-[#171717]">
                    {opt.value}
                  </span>
                </div>
                <span className="text-[14px] font-[500] text-[#1a62ff] shrink-0 ml-2">
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Mobile: CTA at bottom of sub-panel */}
      {isMobile && onApply && (
        <div className="pt-3 shrink-0">
          <Button
            onClick={onApply}
            className="w-full bg-[#1a62ff] hover:bg-[#034ae8] text-white rounded-lg h-10 gap-2"
          >
            <span>Zobraziť {filteredCount ?? 0} výsledkov</span>
            <MapPin className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ===== DESKTOP: Two-panel filter =====
function DesktopFilterContent({
  activeFilters,
  onFilterChange,
  onSubViewChange,
}: FilterSidebarProps) {
  const [subView, setSubView] = useState<{
    key: FilterKey;
    label: string;
    type: "checkbox" | "radio";
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSetSubView = (
    view: { key: FilterKey; label: string; type: "checkbox" | "radio" } | null
  ) => {
    setSubView(view);
    onSubViewChange?.(view !== null);
  };

  // Close sub-view on outside click (desktop)
  useEffect(() => {
    if (!subView) return;
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleSetSubView(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subView]);

  const handleToggle = (filterKey: string, value: string) => {
    const currentCat = [
      ...FILTER_CATEGORIES.geographic,
      ...FILTER_CATEGORIES.institutional,
    ].find((c) => c.key === filterKey);
    const isRadio = currentCat?.type === "radio";

    const current = activeFilters[filterKey] || [];
    let next: string[];

    if (isRadio) {
      next = current.includes(value) ? [] : [value];
    } else {
      next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
    }

    onFilterChange({ ...activeFilters, [filterKey]: next });
  };

  const handleResetFilter = (filterKey: string) => {
    const updated = { ...activeFilters };
    delete updated[filterKey];
    onFilterChange(updated);
  };

  const handleResetAll = () => {
    onFilterChange({});
  };

  const totalActive = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="flex items-start gap-3" ref={containerRef}>
      {/* Panel 1: Category list — wider 280px */}
      <div className="w-[280px] bg-white rounded-xl shadow-lg border border-[#e5e5e5] flex flex-col max-h-[calc(100vh-90px)] overflow-hidden">
        <div className="p-4 pb-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="size-5 text-[#171717]" />
              <span className="text-[18px] font-[700] tracking-[-0.36px] text-[#171717]">
                Filter Aktivít
              </span>
            </div>
            <button
              onClick={handleResetAll}
              className={`text-[14px] font-[600] tracking-[-0.14px] text-[#ef4444] px-1 py-0.5 cursor-pointer hover:opacity-80 transition-opacity ${
                totalActive === 0 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Reset all
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 pb-4">
          <div className="flex flex-col gap-4">
            {/* Geographic filters */}
            <div className="flex flex-col gap-2">
              <SectionLabel label="Geografické filtre" icon="geo" />
              <div className="flex flex-col gap-2">
                {FILTER_CATEGORIES.geographic.map((cat) => (
                  <FilterItem
                    key={cat.key}
                    label={cat.label}
                    selectedCount={(activeFilters[cat.key] || []).length}
                    hasSelection={(activeFilters[cat.key] || []).length > 0}
                    isActive={subView?.key === cat.key}
                    onClick={() =>
                      handleSetSubView(
                        subView?.key === cat.key
                          ? null
                          : {
                              key: cat.key as FilterKey,
                              label: cat.label,
                              type: cat.type,
                            }
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Institutional filters */}
            <div className="flex flex-col gap-2">
              <SectionLabel label="Inštitucionálne filtre" icon="inst" />
              <div className="flex flex-col gap-2">
                {FILTER_CATEGORIES.institutional.map((cat) => (
                  <FilterItem
                    key={cat.key}
                    label={cat.label}
                    selectedCount={(activeFilters[cat.key] || []).length}
                    hasSelection={(activeFilters[cat.key] || []).length > 0}
                    isActive={subView?.key === cat.key}
                    onClick={() =>
                      handleSetSubView(
                        subView?.key === cat.key
                          ? null
                          : {
                              key: cat.key as FilterKey,
                              label: cat.label,
                              type: cat.type,
                            }
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Panel 2: Sub-view (options list) — scrollable within max-height */}
      {subView && (
        <div className="w-[320px] bg-white rounded-xl shadow-lg border border-[#e5e5e5] max-h-[calc(100vh-90px)] overflow-hidden flex flex-col">
          <div className="p-4 flex-1 min-h-0 flex flex-col">
            <FilterSubPanel
              filterKey={subView.key}
              label={subView.label}
              type={subView.type}
              selected={activeFilters[subView.key] || []}
              onBack={() => handleSetSubView(null)}
              onToggle={(value) => handleToggle(subView.key, value)}
              onReset={() => handleResetFilter(subView.key)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MOBILE: Step-by-step filter =====
function MobileFilterContent({
  activeFilters,
  onFilterChange,
  onApply,
}: FilterSidebarProps) {
  const [subView, setSubView] = useState<{
    key: FilterKey;
    label: string;
    type: "checkbox" | "radio";
  } | null>(null);

  const handleToggle = (filterKey: string, value: string) => {
    const currentCat = [
      ...FILTER_CATEGORIES.geographic,
      ...FILTER_CATEGORIES.institutional,
    ].find((c) => c.key === filterKey);
    const isRadio = currentCat?.type === "radio";

    const current = activeFilters[filterKey] || [];
    let next: string[];

    if (isRadio) {
      next = current.includes(value) ? [] : [value];
    } else {
      next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
    }

    onFilterChange({ ...activeFilters, [filterKey]: next });
  };

  const handleResetFilter = (filterKey: string) => {
    const updated = { ...activeFilters };
    delete updated[filterKey];
    onFilterChange(updated);
  };

  const handleResetAll = () => {
    onFilterChange({});
  };

  const totalActive = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const filteredCount = useMemo(() => {
    let filtered = ACTIVITIES;
    for (const [key, values] of Object.entries(activeFilters)) {
      if (values.length > 0) {
        filtered = filtered.filter((a) =>
          values.includes(a[key as keyof Activity] as string)
        );
      }
    }
    return filtered.length;
  }, [activeFilters]);

  // Sub-view (replaces main view on mobile)
  if (subView) {
    return (
      <FilterSubPanel
        filterKey={subView.key}
        label={subView.label}
        type={subView.type}
        selected={activeFilters[subView.key] || []}
        onBack={() => setSubView(null)}
        onToggle={(value) => handleToggle(subView.key, value)}
        onReset={() => handleResetFilter(subView.key)}
        isMobile
        hideReset
        onApply={onApply}
        filteredCount={filteredCount}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Geographic filters */}
      <div className="flex flex-col gap-2">
        <SectionLabel label="Geografické filtre" icon="geo" />
        <div className="flex flex-col gap-2">
          {FILTER_CATEGORIES.geographic.map((cat) => (
            <FilterItem
              key={cat.key}
              label={cat.label}
              selectedCount={(activeFilters[cat.key] || []).length}
              hasSelection={(activeFilters[cat.key] || []).length > 0}
              isActive={false}
              onClick={() =>
                setSubView({
                  key: cat.key as FilterKey,
                  label: cat.label,
                  type: cat.type,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Institutional filters */}
      <div className="flex flex-col gap-2">
        <SectionLabel label="Inštitucionálne filtre" icon="inst" />
        <div className="flex flex-col gap-2">
          {FILTER_CATEGORIES.institutional.map((cat) => (
            <FilterItem
              key={cat.key}
              label={cat.label}
              selectedCount={(activeFilters[cat.key] || []).length}
              hasSelection={(activeFilters[cat.key] || []).length > 0}
              isActive={false}
              onClick={() =>
                setSubView({
                  key: cat.key as FilterKey,
                  label: cat.label,
                  type: cat.type,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Apply button */}
      <Button
        onClick={onApply}
        className="w-full bg-[#1a62ff] hover:bg-[#034ae8] text-white rounded-lg mt-4 h-10 gap-2"
      >
        <span>Zobraziť {filteredCount} výsledkov</span>
        <MapPin className="size-4" />
      </Button>

      {/* Reset all — below CTA */}
      {totalActive > 0 && (
        <button
          onClick={handleResetAll}
          className="w-full text-center text-[14px] font-[600] text-[#ef4444] py-2 mt-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          Resetovať všetky filtre ({totalActive})
        </button>
      )}
    </div>
  );
}

// ===== Main export =====
export function FilterSidebar(props: FilterSidebarProps) {
  if (props.mobile) {
    return <MobileFilterContent {...props} />;
  }

  return <DesktopFilterContent {...props} />;
}