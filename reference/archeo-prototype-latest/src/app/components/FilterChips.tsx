import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "./ui/use-mobile";

interface FilterChipsProps {
  activeFilters: Record<string, string[]>;
  onRemoveFilter: (key: string, value: string) => void;
  onResetAll?: () => void;
}

const FILTER_LABELS: Record<string, string> = {
  obec: "Obec",
  kataster: "Kataster",
  okres: "Okres",
  datovanie: "Datovanie",
  druhNaleziska: "Druh náleziska",
  stupenLokalizacie: "Stupeň lok.",
  autorNS: "Autor VS",
  institucia: "Inštitúcia",
  veduciVyskumu: "Vedúci výskumu",
  rokAktivity: "Rok výskumu",
  kraj: "Kraj",
  druhAktivity: "Druh aktivity",
  cvs: "ČVS",
};

export function FilterChips({ activeFilters, onRemoveFilter, onResetAll }: FilterChipsProps) {
  const isMobile = useIsMobile();

  const hasFilters = Object.values(activeFilters).some((arr) => arr.length > 0);
  if (!hasFilters) return null;

  return (
    <div
      className={`flex items-center gap-2 ${
        isMobile ? "px-4 py-3" : "px-8 py-4"
      } flex-wrap`}
    >
      <span className="text-[14px] font-[700] text-[#0f172b] tracking-[0.07px]">
        Aplikované filtre
      </span>
      {Object.entries(activeFilters).map(([key, values]) =>
        values.map((value) => (
          <div
            key={`${key}-${value}`}
            className="bg-[#cde0ff] flex items-center gap-1 px-2 py-1 rounded-full h-6"
          >
            <span className="text-[12px] text-[#034ae8]">
              <span className="font-[700]">{FILTER_LABELS[key] || key}:</span>{" "}
              <span className="font-[500]">{value}</span>
            </span>
            <button
              onClick={() => onRemoveFilter(key, value)}
              className="cursor-pointer hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[#034ae8] rounded-full"
              aria-label={`Remove filter ${FILTER_LABELS[key] || key} ${value}`}
            >
              <X className="size-4 text-[#034ae8]" />
            </button>
          </div>
        ))
      )}
      {onResetAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetAll}
          className="text-[12px] font-[600] text-[#ef4444] hover:text-[#dc2626] hover:bg-red-50 h-6 px-2 ml-1"
        >
          Zrušiť všetky
        </Button>
      )}
    </div>
  );
}
