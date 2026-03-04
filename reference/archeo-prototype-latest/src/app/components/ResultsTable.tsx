import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router";
import { useIsMobile } from "./ui/use-mobile";
import { type Activity, type DatingEntry } from "../data/mockData";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// Table accuracy dot colors (green/yellow/red)
function getTableDotColor(st: string): string {
  switch (st) {
    case "1": return "#22C55E";
    case "2": return "#F59E0B";
    case "3": return "#EF4444";
    default: return "#737373";
  }
}

function getTableDotLabel(st: string): string {
  switch (st) {
    case "1": return "presná";
    case "2": return "orientačná";
    case "3": return "neurčená";
    default: return st;
  }
}

// Sentence case utility
function toSentenceCase(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// Check if dating is negative/undatable
function isNegativeDating(d: DatingEntry): boolean {
  const p = d.period.toLowerCase();
  return p.includes("negatív") || p.includes("negativne") || p.includes("nedatov");
}

// Abbreviate dating period for compact mode
function abbreviatePeriod(period: string): string {
  const abbrevMap: Record<string, string> = {
    "doba bronzová": "DB",
    "mladšia doba bronzová": "MDB",
    "staršia doba bronzová": "SDB",
    "stredná doba bronzová": "StrDB",
    "neskorá doba bronzová": "NDB",
    "doba železná": "DŽ",
    "staršia doba železná": "SDŽ",
    "mladšia doba železná": "MDŽ",
    "doba rímska": "DR",
    "doba sťahovania národov": "DSN",
    "stredovek": "SV",
    "vrcholný stredovek": "VSV",
    "novovek": "NV",
    "doba kamenná": "DK",
    "neolit": "Neo",
    "eneolit": "Eneo",
    "paleolit": "Paleo",
    "mezolit": "Mezo",
    "pravek": "PV",
    "negativne": "neg.",
    "negatívne": "neg.",
    "nedatované": "n.d.",
    "neurčené": "n.u.",
  };
  const lower = period.toLowerCase();
  return abbrevMap[lower] || (period.length > 12 ? period.slice(0, 10) + "…" : period);
}

// Render dating chips for cards/table (mirrors Detail's Datovanie section)
function DatingChips({ dating, compact }: { dating: DatingEntry[]; compact?: boolean }) {
  if (!dating || dating.length === 0) return null;
  
  const fontSize = compact ? "text-[10px]" : "text-[11px]";
  const py = compact ? "py-[1px]" : "py-[2px]";
  
  return (
    <div className="flex flex-col gap-1">
      {dating.map((d, idx) => {
        const isNeg = isNegativeDating(d);
        return (
          <div key={`${d.period}-${idx}`} className="flex gap-1 flex-wrap items-center">
            {/* Period chip */}
            <span
              className={`${fontSize} font-[500] px-[7px] ${py} rounded leading-[18px]`}
              style={{
                backgroundColor: isNeg ? "#f5f5f5" : "#cce1ff",
                color: isNeg ? "#737373" : "#262626",
              }}
            >
              {d.period}
            </span>
            {/* Type chip — only if not negative and type exists */}
            {!isNeg && d.type && (
              <span
                className={`${fontSize} font-[500] px-[7px] ${py} rounded leading-[18px]`}
                style={{
                  backgroundColor: d.typeColor === "green" ? "#dcfce7" : d.typeColor === "red" ? "#ffe2e2" : "#f3f4f6",
                  color: d.typeColor === "green" ? "#016630" : d.typeColor === "red" ? "#c10007" : "#525252",
                }}
              >
                {toSentenceCase(d.type)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Compact dating: abbreviated period + type as a single line with tooltip
function CompactDatingChips({ dating }: { dating: DatingEntry[] }) {
  if (!dating || dating.length === 0) return null;

  // Build abbreviated summary
  const parts = dating.map((d) => {
    const isNeg = isNegativeDating(d);
    const abbr = abbreviatePeriod(d.period);
    if (isNeg) return abbr;
    if (d.type) return `${abbr} · ${toSentenceCase(d.type).slice(0, 8)}`;
    return abbr;
  });

  // Full text for tooltip
  const fullText = dating
    .map((d) => {
      const isNeg = isNegativeDating(d);
      if (isNeg) return d.period;
      if (d.type) return `${d.period} – ${toSentenceCase(d.type)}`;
      return d.period;
    })
    .join("; ");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex gap-1 flex-wrap items-center cursor-help max-w-[200px]">
            {parts.slice(0, 3).map((part, idx) => {
              const d = dating[idx];
              const isNeg = isNegativeDating(d);
              return (
                <span
                  key={idx}
                  className="text-[10px] font-[500] px-[6px] py-[1px] rounded leading-[16px] whitespace-nowrap"
                  style={{
                    backgroundColor: isNeg ? "#f5f5f5" : "#cce1ff",
                    color: isNeg ? "#737373" : "#262626",
                  }}
                >
                  {part}
                </span>
              );
            })}
            {parts.length > 3 && (
              <span className="text-[10px] text-[#a3a3a3]">+{parts.length - 3}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[300px]">
          <p className="text-[12px]">{fullText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface ResultsTableProps {
  activities: Activity[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

// ===== MOBILE CARD =====
function MobileActivityCard({
  activity,
  onClick,
}: {
  activity: Activity;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-[#e5e5e5] p-[13px] cursor-pointer hover:border-[#c5cad2] hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#1a62ff]"
    >
      {/* Top row: č.a. number + accuracy dot */}
      <div className="flex items-center justify-between mb-[5px]">
        <span className="text-[13px] font-[500] text-[#1a62ff] font-['Geist_Mono',monospace]">
          {activity.ca}
        </span>
        <div className="flex items-center gap-1">
          <div
            className="size-[7px] rounded-full shrink-0"
            style={{ backgroundColor: getTableDotColor(activity.st) }}
          />
          <span className="text-[11px] font-[400] text-[#737373] font-['Geist_Mono',monospace]">
            {getTableDotLabel(activity.st)}
          </span>
        </div>
      </div>

      {/* Location info */}
      <div className="flex flex-col gap-px mb-[5px]">
        <span className="text-[15px] font-[600] text-[#171717] tracking-[-0.15px]">
          {activity.obec}
        </span>
        {activity.kataster !== activity.obec && (
          <span className="text-[13px] font-[400] text-[#525252]">
            {activity.kataster}
          </span>
        )}
        <span className="text-[13px] font-[400] text-[#737373]">
          {activity.okres}
        </span>
        <span className="text-[12px] font-[400] text-[#a3a3a3] line-clamp-2">
          {activity.poloha}
        </span>
      </div>

      {/* Divider */}
      <div className="h-[5px] flex flex-col justify-center">
        <div className="h-px bg-[#f5f5f5]" />
      </div>

      {/* Dating/type — mirrors Detail Datovanie section */}
      {activity.dating.length > 0 && (
        <div className="mt-[5px]">
          <DatingChips dating={activity.dating} compact />
        </div>
      )}
    </button>
  );
}

type SortKey = "ca" | "st" | "obec" | "kataster" | "okres" | "poloha" | "datovanie";
type SortDir = "asc" | "desc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "ca", label: "Číslo aktivity" },
  { key: "st", label: "Stupeň lokalizácie" },
  { key: "obec", label: "Obec" },
  { key: "kataster", label: "Katastrálne územie" },
  { key: "okres", label: "Okres" },
  { key: "poloha", label: "Poloha" },
  { key: "datovanie", label: "Datovanie" },
];

function sortActivities(activities: Activity[], sortKey: SortKey, sortDir: SortDir): Activity[] {
  const sorted = [...activities].sort((a, b) => {
    let va = (a[sortKey] as string) || "";
    let vb = (b[sortKey] as string) || "";
    // Numeric sort for ca and st
    if (sortKey === "ca" || sortKey === "st") {
      return parseInt(va) - parseInt(vb);
    }
    return va.localeCompare(vb, "sk");
  });
  return sortDir === "desc" ? sorted.reverse() : sorted;
}

export function ResultsTable({
  activities,
}: ResultsTableProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sortKey, setSortKey] = useState<SortKey>("ca");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortedActivities = useMemo(() => sortActivities(activities, sortKey, sortDir), [activities, sortKey, sortDir]);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.key === sortKey)?.label || "Číslo aktivity";

  return (
    <div className={isMobile ? "px-4 pb-4" : "px-8 pb-8"}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`${
            isMobile ? "text-[18px]" : "text-[24px]"
          } font-[700] text-[#0f172b] tracking-[0.07px]`}
        >
          {activities.length} Aktivít
        </h2>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <span className="text-[13px] font-[500] text-[#737373]">Zoradiť podľa</span>
          )}
          <div className="relative flex items-center gap-1" ref={sortRef}>
            <Button
              variant="outline"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="h-9 rounded-lg px-3 gap-2 border-[#e5e5e5] text-[#0f172b] hover:bg-[#f1f5f9]"
            >
              <span className={`${isMobile ? "text-[12px]" : "text-[13px]"} font-[500] tracking-[-0.15px]`}>
                {currentSortLabel}
              </span>
              <ChevronDown className={`size-4 transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`} />
            </Button>
            {sortDropdownOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white rounded-lg border border-[#e5e5e5] shadow-lg overflow-hidden min-w-[200px] z-10">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSortKey(opt.key);
                      setSortDropdownOpen(false);
                    }}
                    className="flex items-center justify-between gap-3 w-full px-3 py-2.5 hover:bg-[#f5f7fa] transition-colors cursor-pointer text-left"
                  >
                    <span className={`text-[13px] font-[500] ${sortKey === opt.key ? "text-[#1a62ff]" : "text-[#374151]"}`}>
                      {opt.label}
                    </span>
                    {sortKey === opt.key && (
                      <span className="size-4 text-[#1a62ff]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              className="h-9 w-9 rounded-lg border-[#e5e5e5] hover:bg-[#f1f5f9]"
              title={sortDir === "asc" ? "Vzostupne" : "Zostupne"}
            >
              {sortDir === "asc" ? (
                <ArrowUp className="size-4 text-[#0f172b]" />
              ) : (
                <ArrowDown className="size-4 text-[#0f172b]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="flex flex-col gap-3">
          {sortedActivities.map((activity) => (
            <MobileActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => navigate(`/detail/${activity.ca}`)}
            />
          ))}
          {sortedActivities.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-[16px] font-[600] text-[#171717]">
                0 výsledkov vyhľadávania
              </p>
              <p className="text-[14px] text-[#737373] mt-1">
                Skúste zmeniť filter alebo vyhľadávanie
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-[#e5e5e5] rounded-xl bg-white shadow-sm">
          {sortedActivities.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[16px] font-[600] text-[#171717]">
                0 výsledkov vyhľadávania
              </p>
              <p className="text-[14px] text-[#737373] mt-1">
                Skúste zmeniť filter alebo vyhľadávanie
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="sticky top-[57px] z-[2]">
                <tr className="bg-[#fafafa] border-b border-[#e5e5e5] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] px-3 h-10 text-left w-[72px] whitespace-nowrap bg-[#fafafa]">
                    Č.A.
                  </th>
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] text-center px-2 h-10 w-[40px] bg-[#fafafa]">
                    St.
                  </th>
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] px-3 h-10 text-left bg-[#fafafa]" style={{ minWidth: 100 }}>
                    Obec
                  </th>
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] px-3 h-10 text-left bg-[#fafafa]" style={{ minWidth: 90 }}>
                    KÚ
                  </th>
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] px-3 h-10 text-left bg-[#fafafa]" style={{ minWidth: 90 }}>
                    Okres
                  </th>
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] px-3 h-10 text-left bg-[#fafafa]" style={{ minWidth: 120 }}>
                    Poloha
                  </th>
                  <th className="text-[11px] text-[#a3a3a3] font-[600] uppercase tracking-[0.05em] px-3 h-10 text-left bg-[#fafafa]" style={{ minWidth: 200 }}>
                    Datovanie – Druh
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedActivities.map((activity) => {
                  const kuSameAsObec = activity.kataster === activity.obec;
                  return (
                    <tr
                      key={activity.id}
                      className="border-b border-[#f0f0f0] hover:bg-[#f8fbff] cursor-pointer transition-colors"
                      onClick={() => navigate(`/detail/${activity.ca}`)}
                    >
                      <td className="text-[13px] font-[600] text-[#1a62ff] font-['Geist_Mono',monospace] whitespace-nowrap py-3 px-3 align-top">
                        {activity.ca}
                      </td>
                      <td className="text-center py-3 px-2 align-top">
                        {activity.st && (
                          <div className="flex items-center justify-center pt-1" title={`Stupeň lokalizácie - ${activity.st}`}>
                            <div
                              className="size-2.5 rounded-full"
                              style={{ backgroundColor: getTableDotColor(activity.st) }}
                            />
                          </div>
                        )}
                      </td>
                      <td className="text-[13px] font-[600] text-[#262626] py-3 px-3 align-top">
                        {activity.obec}
                      </td>
                      <td className={`text-[13px] py-3 px-3 align-top ${kuSameAsObec ? "text-[#d4d4d4]" : "text-[#737373]"}`}>
                        {activity.kataster}
                      </td>
                      <td className="text-[13px] text-[#737373] py-3 px-3 align-top">
                        {activity.okres}
                      </td>
                      <td className="text-[12px] text-[#a3a3a3] py-3 px-3 align-top">
                        <span className="line-clamp-2">{activity.poloha}</span>
                      </td>
                      <td className="py-3 px-3 align-top">
                        <DatingChips dating={activity.dating} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}