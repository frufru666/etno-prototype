import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { FileText, ExternalLink, Info, X, Mail } from "lucide-react";
import { type Activity } from "../../data/mockData";
import { getPinColor } from "../../data/mapUtils";
import { toast } from "sonner";
import { CATEGORY_IMAGES, IMG_CATEGORIES, TOTAL_IMAGE_COUNT, type ImageCategory } from "./ImageViewer";

type TagColor = "green" | "red" | "gray";

function isNegativeDating(period: string): boolean {
  const p = period.toLowerCase();
  return p.includes("negatív") || p.includes("negativne") || p.includes("nedatov");
}

function toSentenceCase(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// Clickable blue value that opens Explorer in new tab
function FilterLink({
  filterKey,
  value,
}: {
  filterKey: string;
  value: string;
}) {
  const handleClick = () => {
    const url = `/?filter=${encodeURIComponent(filterKey)}:${encodeURIComponent(value)}`;
    window.open(url, "_blank");
    toast.success("Otvorené v novom tabe", {
      description: `${value}`,
      duration: 2000,
    });
  };

  return (
    <button
      onClick={handleClick}
      className="text-[14px] font-[500] text-[#034ae8] tracking-[-0.08px] hover:text-[#0235b0] hover:underline underline-offset-2 transition-colors cursor-pointer text-left inline-flex items-center gap-1 group"
    >
      <span>{value}</span>
      <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

interface DetailRightPanelProps {
  onOpenGallery: () => void;
  onOpenImage: (category: ImageCategory, index: number) => void;
  onOpenVideo: () => void;
  onOpenPdf: (title: string, size: string) => void;
  mobile?: boolean;
  activity: Activity;
}

function DataRow({
  label,
  value,
  filterKey,
  mobile,
}: {
  label: string;
  value: string;
  filterKey?: string;
  mobile?: boolean;
}) {
  return (
    <div className="flex items-baseline py-2.5 border-b border-[#f0f1f3] last:border-0">
      <span
        className={`${
          mobile ? "w-[130px]" : "w-[152px]"
        } shrink-0 text-[13px] font-[400] text-[#8b8f97]`}
      >
        {label}
      </span>
      {filterKey ? (
        <FilterLink filterKey={filterKey} value={value} />
      ) : (
        <span className="text-[14px] font-[500] text-[#171717] tracking-[-0.08px]">
          {value}
        </span>
      )}
    </div>
  );
}

// Na vyžiadanie modal with mailto CTA
function RequestModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-[90%] p-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 size-8 text-[#737373] hover:text-[#171717]"
        >
          <X className="size-5" />
        </Button>
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 bg-[#f0f4ff] rounded-2xl flex items-center justify-center">
            <Info className="size-8 text-[#034ae8]" />
          </div>
          <h3 className="text-[18px] font-[700] text-[#171717] text-center">
            Dokument na vyžiadanie
          </h3>
          <p className="text-[14px] text-[#6a7282] text-center">
            Tento dokument nie je voľne dostupný. Pre jeho získanie kontaktujte:
          </p>
          <div className="bg-[#f9fafb] rounded-lg p-4 w-full">
            <p className="text-[14px] font-[600] text-[#171717]">
              Archeologický ústav SAV, v. v. i.
            </p>
            <p className="text-[13px] text-[#6a7282] mt-1">
              Akademická 2, 949 21 Nitra
            </p>
            <p className="text-[13px] text-[#034ae8] mt-1">
              sekretariat@savba.sk
            </p>
            <p className="text-[13px] text-[#6a7282] mt-1">
              +421 37 6943 473
            </p>
          </div>
          <Button asChild className="w-full bg-[#1a62ff] hover:bg-[#034ae8] text-white gap-2">
            <a href="mailto:sekretariat@savba.sk?subject=Žiadosť o dokument">
              <Mail className="size-4" />
              Napísať e-mail
            </a>
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full border-[#e5e5e5]">
            Zavrieť
          </Button>
        </div>
      </div>
    </div>
  );
}

function PanelContent({
  onOpenGallery,
  onOpenImage,
  onOpenVideo,
  onOpenPdf,
  mobile,
  activity,
}: DetailRightPanelProps) {
  const a = activity;
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  // Ensure every detail has one PDF available  
  const pdfSize = a.media.vyskumnaSpravaSize || "2.4 MB";
  const pdfPages = a.media.vyskumnaSpravaPages || 24;

  return (
    <div className={mobile ? "px-4 py-5" : "p-6"}>
      {/* ── Activity header ── */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-['Geist_Mono',monospace] font-[500] text-[13px] text-[#1a62ff] bg-[#eef4ff] px-2 py-0.5 rounded">
          č.a. {a.ca}
        </span>
        <div className="flex items-center gap-2">
          <div
            className="size-2.5 rounded-full"
            style={{ backgroundColor: getPinColor(a.accuracy) }}
          />
          <span className="text-[13px] font-[500] text-[#6a7282]">
            Stupeň lokalizácie - {a.accuracy}
          </span>
        </div>
      </div>
      <h2
        className={`${
          mobile ? "text-[22px]" : "text-[24px]"
        } font-[700] text-[#0a0a0a] tracking-[-0.5px] mb-1`}
      >
        {a.name}
      </h2>
      <p className="text-[15px] font-[400] text-[#4a5565] mb-0.5">
        okres {a.okres}
      </p>
      <p className="text-[13px] font-[400] text-[#9ca3af] mb-5">
        {a.poloha}
      </p>

      {/* ── DOKUMENTY ── */}
      <div className="mb-7">
        <h3 className="text-[12px] font-[700] text-[#374151] tracking-[0.8px] uppercase mb-3">
          Dokumenty
        </h3>
        <div className="flex flex-col gap-2">
          {/* Always show one available PDF for demo */}
          <button
            onClick={() => onOpenPdf("Výskumná správa", `${pdfSize} · ${pdfPages} strán`)}
            className="bg-white rounded-xl border border-[#e5e7eb] flex items-center justify-between px-3.5 py-3.5 w-full cursor-pointer hover:border-[#c5cad2] hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#f0f4ff] rounded-lg size-10 flex items-center justify-center">
                <FileText className="size-[18px] text-[#034ae8]" />
              </div>
              <div className="text-left">
                <p className="text-[14px] font-[600] text-[#0a0a0a] tracking-[-0.1px]">
                  Výskumná správa
                </p>
                <p className="text-[12px] font-[400] text-[#9ca3af] font-['Geist_Mono',monospace]">
                  {pdfSize} · {pdfPages} strán
                </p>
              </div>
            </div>
            <span className="text-[13px] font-[600] text-[#034ae8] group-hover:underline">
              Otvoriť PDF
            </span>
          </button>

          {/* Always show one "na vyžiadanie" for demo */}
          <button
            onClick={() => setShowRequestModal(true)}
            className="bg-white rounded-xl border border-[#e5e7eb] flex items-center justify-between px-3.5 py-3.5 w-full cursor-pointer hover:border-[#c5cad2] hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#f3f4f6] rounded-lg size-10 flex items-center justify-center">
                <FileText className="size-[18px] text-[#6a7282]" />
              </div>
              <div className="text-left">
                <p className="text-[14px] font-[600] text-[#0a0a0a] tracking-[-0.1px]">
                  Nálezová správa
                </p>
                <p className="text-[12px] font-[400] text-[#9ca3af]">
                  na vyžiadanie
                </p>
              </div>
            </div>
            <span className="text-[13px] font-[600] text-[#6a7282] group-hover:underline">
              Vyžiadať
            </span>
          </button>
        </div>
      </div>

      {/* ── OBRÁZKY — category buttons ── */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[12px] font-[700] text-[#374151] tracking-[0.8px] uppercase">
            Obrázky ({TOTAL_IMAGE_COUNT})
          </h3>
          <Button
            variant="link"
            onClick={onOpenGallery}
            className="text-[13px] font-[600] text-[#034ae8] hover:text-[#0235b0] p-0 h-auto"
          >
            Otvoriť galériu →
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {IMG_CATEGORIES.map((cat) => {
            const count = CATEGORY_IMAGES[cat.key].length;
            const thumbSrc = CATEGORY_IMAGES[cat.key][0]; // First image as preview
            return (
              <button
                key={cat.key}
                onClick={() => onOpenImage(cat.key, 0)}
                className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden text-left cursor-pointer hover:border-[#c5cad2] hover:shadow-sm transition-all group"
              >
                <div className="w-full h-[72px] overflow-hidden bg-[#f3f4f6]">
                  <img
                    src={thumbSrc}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="px-2.5 py-2">
                  <span className="text-[13px] font-[600] text-[#171717] block">{cat.label}</span>
                  <span className="text-[12px] font-[400] text-[#9ca3af]">{count} obrázkov</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── VIDEO ── */}
      {a.media.hasVideo && (
        <div className="mb-7">
          <h3 className="text-[12px] font-[700] text-[#374151] tracking-[0.8px] uppercase mb-3">
            Video
          </h3>
          <button
            onClick={onOpenVideo}
            className="bg-[#101828] rounded-xl w-full h-[192px] relative overflow-hidden cursor-pointer group"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(150deg, rgb(49, 65, 88) 0%, rgb(29, 41, 61) 50%, rgb(15, 23, 43) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#e7000b] rounded-lg px-4 py-2 group-hover:bg-[#cc0009] transition-colors">
                <div className="border-l-[10px] border-t-[6px] border-b-[6px] border-l-white border-t-transparent border-b-transparent ml-0.5" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* ── DATOVANIE ── */}
      {a.dating.length > 0 && (
        <div className="mb-7">
          <h3 className="text-[12px] font-[700] text-[#374151] tracking-[0.8px] uppercase mb-3">
            Datovanie a druh náleziska
          </h3>
          <div className="flex flex-col gap-2">
            {a.dating.map((d, idx) => {
              const isNeg = isNegativeDating(d.period);
              return (
                <div key={`${d.period}-${idx}`} className="flex gap-2 items-stretch">
                  {/* Period chip */}
                  <button
                    onClick={() => {
                      const url = `/?filter=${encodeURIComponent("datovanie")}:${encodeURIComponent(d.period)}`;
                      window.open(url, "_blank");
                      toast.success("Otvorené v novom tabe", {
                        description: d.period,
                        duration: 2000,
                      });
                    }}
                    className="bg-[#e5f0ff] text-[#1a62ff] text-[13px] font-[500] px-3 py-1.5 rounded-md hover:bg-[#d4e5ff] transition-colors cursor-pointer text-left flex items-center min-h-[32px]"
                  >
                    {d.period}
                  </button>
                  {/* Type chip — only if NOT negative and type exists */}
                  {!isNeg && d.type && (
                    <span
                      className={`text-[12px] font-[500] px-2.5 py-1.5 rounded-md tracking-[0.02px] flex items-center min-h-[32px] ${
                        d.typeColor === "green"
                          ? "bg-[#dcfce7] text-[#016630]"
                          : d.typeColor === "red"
                          ? "bg-[#ffe2e2] text-[#c10007]"
                          : "bg-[#f3f4f6] text-[#4a5565]"
                      }`}
                    >
                      {toSentenceCase(d.type)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ÚDAJE ── */}
      <div className="mb-4">
        <h3 className="text-[16px] font-[700] text-[#0a0a0a] tracking-[-0.2px] mb-5 pb-3 border-b-2 border-[#0a0a0a]">
          Údaje
        </h3>

        <h4 className="text-[13px] font-[700] text-[#374151] tracking-[0.3px] uppercase mb-1">
          Identifikačné údaje
        </h4>
        <div className="flex flex-col mb-6">
          <DataRow label="Číslo aktivity" value={`č.a. ${a.ca}`} mobile={mobile} />
          <DataRow label="ČVS" value={a.cvs} filterKey="cvs" mobile={mobile} />
          <DataRow label="Rok zaevidovania" value={a.rokZaevidovania} filterKey="rokAktivity" mobile={mobile} />
          <DataRow label="Rok aktivity" value={a.rokAktivity} filterKey="rokAktivity" mobile={mobile} />
          <DataRow label="Druh aktivity" value={a.druhAktivity} filterKey="druhAktivity" mobile={mobile} />
          <DataRow label="Číslo akcie" value={a.cisloAkcie} mobile={mobile} />
        </div>

        <h4 className="text-[13px] font-[700] text-[#374151] tracking-[0.3px] uppercase mb-1">
          Geografické údaje
        </h4>
        <div className="flex flex-col mb-6">
          <DataRow label="Katastrálne územie" value={a.kataster} filterKey="kataster" mobile={mobile} />
          <DataRow label="Obec" value={a.obec} filterKey="obec" mobile={mobile} />
          <DataRow label="Poloha" value={a.poloha} mobile={mobile} />
          <DataRow label="Okres" value={a.okres} filterKey="okres" mobile={mobile} />
        </div>

        <h4 className="text-[13px] font-[700] text-[#374151] tracking-[0.3px] uppercase mb-1">
          Personálne údaje
        </h4>
        <div className="flex flex-col mb-6">
          <DataRow label="Vedúci výskumu" value={a.veduciVyskumu} filterKey="veduciVyskumu" mobile={mobile} />
          <DataRow label="Autor – NS" value={a.autorNS} filterKey="autorNS" mobile={mobile} />
          <DataRow label="Inštitúcia" value={a.institucia} filterKey="institucia" mobile={mobile} />
        </div>

        <h4 className="text-[13px] font-[700] text-[#374151] tracking-[0.3px] uppercase mb-1">
          Lokalizácia
        </h4>
        <div className="flex flex-col mb-6">
          <DataRow label="Stupeň lokalizácie" value={`Stupeň lokalizácie - ${a.st}`} filterKey="stupenLokalizacie" mobile={mobile} />
          <DataRow label="Existuje GIS vrstva" value={a.existujeGIS} mobile={mobile} />
          <DataRow label="Súradnica X" value={a.suradnicaX} mobile={mobile} />
          <DataRow label="Súradnica Y" value={a.suradnicaY} mobile={mobile} />
        </div>

        <h4 className="text-[13px] font-[700] text-[#374151] tracking-[0.3px] uppercase mb-1">
          Formálne údaje
        </h4>
        <div className="flex flex-col mb-4">
          <DataRow label="Mati/veľká NS" value={a.matiVelkaNS} mobile={mobile} />
        </div>
      </div>

      {showRequestModal && (
        <RequestModal onClose={() => setShowRequestModal(false)} />
      )}
    </div>
  );
}

export function DetailRightPanel(props: DetailRightPanelProps) {
  if (props.mobile) {
    return (
      <div className="bg-white">
        <PanelContent {...props} />
      </div>
    );
  }

  return (
    <div className="w-[420px] shrink-0 border-l border-[#e5e5e5] bg-white">
      <ScrollArea className="h-full">
        <PanelContent {...props} />
      </ScrollArea>
    </div>
  );
}