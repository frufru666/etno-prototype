import { useState, useMemo, useEffect } from "react";
import { TopNav } from "../components/TopNav";
import { FilterSidebar } from "../components/FilterSidebar";
import { MapView } from "../components/MapView";
import { FilterChips } from "../components/FilterChips";
import { ResultsTable } from "../components/ResultsTable";
import { Footer } from "../components/Footer";
import { useIsMobile } from "../components/ui/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../components/ui/sheet";
import { ACTIVITIES, type Activity } from "../data/mockData";
import { useSearchParams } from "react-router";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";

const FILTER_OPEN_KEY = "archeo-filter-open";

export function ExplorerPage() {
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterOpen, setFilterOpen] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return false;
    const stored = sessionStorage.getItem(FILTER_OPEN_KEY);
    if (stored !== null) return stored === "true";
    return true;
  });
  const [subViewOpen, setSubViewOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    sessionStorage.setItem(FILTER_OPEN_KEY, String(filterOpen));
  }, [filterOpen]);

  useEffect(() => {
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      const colonIdx = filterParam.indexOf(":");
      if (colonIdx > 0) {
        const key = filterParam.slice(0, colonIdx);
        const value = filterParam.slice(colonIdx + 1);
        if (key && value) {
          setActiveFilters((prev) => {
            const existing = prev[key] || [];
            if (existing.includes(value)) return prev;
            return { ...prev, [key]: [...existing, value] };
          });
          setFilterOpen(true);
        }
      }
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const filteredActivities = useMemo(() => {
    let filtered = ACTIVITIES;
    for (const [key, values] of Object.entries(activeFilters)) {
      if (values.length > 0) {
        filtered = filtered.filter((a) =>
          values.includes(a[key as keyof Activity] as string)
        );
      }
    }
    return filtered;
  }, [activeFilters]);

  const handleRemoveFilter = (key: string, value: string) => {
    const current = activeFilters[key] || [];
    const next = current.filter((v) => v !== value);
    if (next.length === 0) {
      const updated = { ...activeFilters };
      delete updated[key];
      setActiveFilters(updated);
    } else {
      setActiveFilters({ ...activeFilters, [key]: next });
    }
  };

  const handleResetAllFilters = () => {
    setActiveFilters({});
  };

  // No search row on mobile anymore, nav is single row
  const navHeight = 57;

  const filterMainWidth = 304;
  const filterSubWidth = 332;
  const filterTotalWidth = filterOpen && !isMobile
    ? (subViewOpen ? filterMainWidth + filterSubWidth : filterMainWidth)
    : 0;

  const hasFilters = Object.values(activeFilters).some((arr) => arr.length > 0);
  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      <TopNav
        onFilterToggle={() => {
          setFilterOpen(!filterOpen);
          if (filterOpen) setSubViewOpen(false);
        }}
        filterOpen={filterOpen}
        activeFilterCount={activeFilterCount}
      />

      <div className="relative" style={{ paddingTop: navHeight }}>
        {!isMobile && filterOpen && (
          <div
            className="fixed left-3 z-30"
            style={{ top: navHeight + 12 }}
          >
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              onSubViewChange={setSubViewOpen}
            />
          </div>
        )}

        <div className={`relative ${isMobile && filterOpen ? "hidden" : ""}`}>
          <MapView filteredActivities={filteredActivities} />
        </div>

        <div
          className="transition-[margin] duration-300 ease-in-out"
          style={{ marginLeft: filterTotalWidth }}
        >
          <div className="border-b border-[#d9d9d9]" />
          <FilterChips
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onResetAll={handleResetAllFilters}
          />
          {/* Padding when no filters active */}
          {!hasFilters && <div className="h-6" />}
          <ResultsTable activities={filteredActivities} />
        </div>
      </div>
      <Footer />

      {isMobile && (
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetContent side="top" className="h-[100dvh] flex flex-col overflow-hidden p-0 [&>button.absolute]:hidden">
            <SheetHeader className="flex-row items-center justify-between px-4 pt-3 pb-2 shrink-0">
              <div className="flex items-center gap-3">
                <SheetTitle className="text-[18px] font-[700]">
                  Filter Aktivít
                </SheetTitle>
              </div>
              <SheetDescription className="sr-only">
                Filter activities
              </SheetDescription>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterOpen(false)}
                className="h-9 px-3 gap-2 rounded-lg border-[#e5e5e5] text-[#374151]"
              >
                <X className="size-4" />
                <span className="text-[13px] font-[500]">Zavrieť filter</span>
              </Button>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <FilterSidebar
                mobile
                onApply={() => setFilterOpen(false)}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}