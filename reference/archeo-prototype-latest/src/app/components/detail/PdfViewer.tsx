import { useState } from "react";
import { ArrowLeft, FileText, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";

interface PdfViewerProps {
  title: string;
  size: string;
  onClose: () => void;
  mobile?: boolean;
}

// Generate mock PDF page content
function MockPdfPage({ pageNum, total }: { pageNum: number; total: number }) {
  const headings = [
    "1. Úvod a ciele výskumu",
    "2. Metodika terénneho výskumu",
    "3. Opis skúmaného územia",
    "4. Stratigrafická situácia",
    "5. Opis objektov a nálezov",
    "6. Keramický materiál",
    "7. Kovové nálezy",
    "8. Osteologický materiál",
    "9. Datovanie a interpretácia",
    "10. Záver a odporúčania",
    "11. Prílohy – plány a rezy",
    "12. Katalóg nálezov",
    "13. Fotodokumentácia",
    "14. Zoznam použitej literatúry",
    "15. Geodetické zameranie",
    "16. Tabuľky a grafy",
    "17. Súhrnná správa",
    "18. Pôdorysy a profily",
    "19. Digitálna dokumentácia",
    "20. Záverečné zhodnotenie",
    "21. Doplnkové materiály",
    "22. Poznámky autora",
    "23. Technické parametre",
    "24. Registračné údaje",
  ];

  const heading = headings[(pageNum - 1) % headings.length];

  const bodyLines = [
    "Archeologický výskum bol realizovaný na základe rozhodnutia Krajského pamiatkového úradu v Nitre.",
    "Terénna časť výskumu prebiehala v mesiacoch jún až september sledovaného roku.",
    "Na skúmanej ploche boli identifikované kultúrne vrstvy datované do obdobia neskorej doby bronzovej.",
    "Objekt č. 1 predstavuje sídliskovú jamu s nálezmi keramiky a zvieracích kostí.",
    "Stratigrafická situácia naznačuje viacfázové osídlenie lokality.",
    "Medzi najvýznamnejšie nálezy patrí fragmenty zdobenej keramiky a bronzová spona.",
    "Vzorky boli odobraté pre rádiouhlíkové datovanie v laboratóriu SAV.",
    "Podrobná analýza keramického materiálu bude predmetom samostatnej štúdie.",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-[#e5e5e5] p-8 max-w-[680px] w-full mx-auto mb-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#e5e5e5]">
        <span className="text-[11px] text-[#a3a3a3] font-['Geist_Mono',monospace]">
          Výskumná správa — Archeologický ústav SAV
        </span>
        <span className="text-[11px] text-[#a3a3a3] font-['Geist_Mono',monospace]">
          {pageNum}/{total}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-[18px] font-[700] text-[#171717] mb-4">{heading}</h3>

      <div className="flex flex-col gap-3">
        {bodyLines.slice(0, 4 + (pageNum % 4)).map((line, i) => (
          <p key={i} className="text-[13px] text-[#525252] leading-[20px]">
            {line}
          </p>
        ))}
      </div>

      {/* Fake table on some pages */}
      {pageNum % 3 === 0 && (
        <div className="mt-5 border border-[#e5e5e5] rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 bg-[#f9fafb] text-[11px] font-[600] text-[#737373] uppercase">
            <div className="px-3 py-2 border-r border-[#e5e5e5]">Obj. č.</div>
            <div className="px-3 py-2 border-r border-[#e5e5e5]">Typ</div>
            <div className="px-3 py-2 border-r border-[#e5e5e5]">Datovanie</div>
            <div className="px-3 py-2">Nálezy</div>
          </div>
          {[1, 2, 3].map((r) => (
            <div key={r} className="grid grid-cols-4 text-[12px] text-[#525252] border-t border-[#e5e5e5]">
              <div className="px-3 py-2 border-r border-[#e5e5e5]">{r + pageNum}</div>
              <div className="px-3 py-2 border-r border-[#e5e5e5]">{r % 2 === 0 ? "jama" : "priekopa"}</div>
              <div className="px-3 py-2 border-r border-[#e5e5e5]">{r % 2 === 0 ? "doba bronzová" : "stredovek"}</div>
              <div className="px-3 py-2">{r * 3 + pageNum} ks</div>
            </div>
          ))}
        </div>
      )}

      {/* Page footer */}
      <div className="mt-8 pt-3 border-t border-[#e5e5e5] flex items-center justify-center">
        <span className="text-[11px] text-[#a3a3a3]">{pageNum}</span>
      </div>
    </div>
  );
}

export function PdfViewer({ title, size, onClose, mobile }: PdfViewerProps) {
  const totalPages = 24;
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header bar */}
      <div className={`flex items-center justify-between ${mobile ? "px-3 py-2" : "px-6 py-3"} border-b border-[#e5e5e5] shrink-0`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`gap-1 px-2 h-9 ${mobile ? "text-[#1a62ff] hover:text-[#034ae8] hover:bg-blue-50" : "text-[#171717] hover:text-[#737373]"}`}
        >
          <ArrowLeft className="size-4" />
          <span className={`${mobile ? "text-[14px] font-[600]" : "text-[14px] font-[500]"}`}>
            Zavrieť
          </span>
        </Button>
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-[#6a7282]" />
          <span className={`${mobile ? "text-[13px]" : "text-[14px]"} font-[500] text-[#171717]`}>{title}</span>
          {!mobile && <span className="text-[12px] text-[#6a7282]">({size})</span>}
        </div>
        <div className="w-9" /> {/* spacer to balance header */}
      </div>

      {/* Security notice */}
      <div className={`flex items-center justify-center gap-2 ${mobile ? "px-3 py-2" : "px-6 py-2.5"} bg-[#fef9e7] border-b border-[#f5e6a3]`}>
        <ShieldCheck className="size-4 text-[#92700c] shrink-0" />
        <span className={`${mobile ? "text-[12px]" : "text-[13px]"} font-[500] text-[#92700c]`}>
          Tento dokument nie je možné stiahnuť — dáta sú chránené
        </span>
      </div>

      {/* Scrollable PDF pages */}
      <div className={`flex-1 overflow-y-auto bg-[#f0f0f0] ${mobile ? "p-4" : "p-8"}`}>
        {Array.from({ length: totalPages }, (_, i) => (
          <MockPdfPage key={i} pageNum={i + 1} total={totalPages} />
        ))}
      </div>
    </div>
  );
}