import { useState } from "react";
import { Button } from "./ui/button";
import { Info, User, Menu, Pickaxe, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "./ui/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

interface TopNavProps {
  onFilterToggle?: () => void;
  filterOpen?: boolean;
  activeFilterCount?: number;
}

export function TopNav({
  onFilterToggle,
  filterOpen,
  activeFilterCount = 0,
}: TopNavProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e5e5]">
      <div className="flex items-center justify-between px-3 py-2">
        {/* Left side: Filter button */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onFilterToggle}
            variant="outline"
            className={`rounded-lg px-3 py-2 h-auto gap-2 ${
              filterOpen
                ? "bg-[#1a62ff] hover:bg-[#034ae8] text-white border-[#1a62ff]"
                : "border-[#e5e5e5] text-[#374151] hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal className="size-4" />
            <span className="text-[14px] font-[600] tracking-[-0.14px]">
              {isMobile ? "Filter" : "Filter"}
            </span>
            {activeFilterCount > 0 && (
              <span className={`text-[11px] font-[600] min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center ${
                filterOpen
                  ? "bg-white text-[#1a62ff]"
                  : "bg-[#1a62ff] text-white"
              }`}>
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Center: Archeo Explorer branding */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <Pickaxe className="size-5 text-[#171717]" />
          <span className="text-[16px] font-[700] tracking-[-0.36px] text-[#171717] whitespace-nowrap">
            {isMobile ? "Archeo SAV" : "Archeo Explorer"}
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isMobile ? (
            <>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg size-10 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetContent side="right" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                      Navigation menu
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-3 p-4">
                    <Button
                      variant="outline"
                      className="rounded-lg px-3 py-2 h-auto gap-2 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50 justify-start"
                    >
                      <Info className="size-5" />
                      <span className="text-[16px] font-[600] tracking-[-0.16px]">
                        Info
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-lg px-3 py-2 h-auto gap-2 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50 justify-start"
                    >
                      <User className="size-5" />
                      <span className="text-[16px] font-[600] tracking-[-0.16px]">
                        User
                      </span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-lg px-3 py-2 h-auto gap-2 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50"
              >
                <Info className="size-5" />
                <span className="text-[14px] font-[600] tracking-[-0.14px]">
                  Info
                </span>
              </Button>
              <Button
                variant="outline"
                className="rounded-lg px-3 py-2 h-auto gap-2 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50"
              >
                <User className="size-5" />
                <span className="text-[14px] font-[600] tracking-[-0.14px]">
                  User
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}