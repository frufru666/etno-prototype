import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Menu, PanelRightClose, PanelRightOpen, Pickaxe } from "lucide-react";
import { useNavigate } from "react-router";
import { useIsMobile } from "../ui/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";

interface DetailTopNavProps {
  activityName?: string;
  rightPanelVisible?: boolean;
  onToggleRightPanel?: () => void;
}

export function DetailTopNav({ activityName, rightPanelVisible = true, onToggleRightPanel }: DetailTopNavProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2 bg-white border-b border-[#e5e5e5]">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-[#1a62ff] hover:text-[#034ae8] hover:bg-blue-50 gap-1 px-2 h-9"
        >
          <ArrowLeft className="size-4" />
          <span className="text-[14px] font-[500]">Späť</span>
        </Button>
        <span className="text-[14px] font-[600] text-[#171717] truncate max-w-[180px] text-center">
          {activityName || "Detail"}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg size-9 border-[#1a62ff] text-[#1a62ff] bg-white hover:bg-blue-50"
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
                className="rounded-lg px-3 py-2 h-auto gap-2 border-[#1a62ff] text-[#1a62ff] bg-white hover:bg-blue-50 justify-start"
              >
                <span className="text-[16px] font-[600] tracking-[-0.16px]">
                  Info
                </span>
              </Button>
              <Button
                variant="outline"
                className="rounded-lg px-3 py-2 h-auto gap-2 border-[#1a62ff] text-[#1a62ff] bg-white hover:bg-blue-50 justify-start"
              >
                <span className="text-[16px] font-[600] tracking-[-0.16px]">
                  User
                </span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-2 bg-white border-b border-[#e5e5e5]">
      {/* Left: Logo + Späť button */}
      <div className="flex items-center gap-3">
        <Pickaxe className="size-5 text-[#171717]" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-[#1a62ff] hover:text-[#034ae8] hover:bg-blue-50 gap-1 px-2 h-9"
        >
          <ArrowLeft className="size-4" />
          <span className="text-[14px] font-[500]">Späť do Explore</span>
        </Button>
      </div>

      {/* Center: Locality name */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-[16px] font-[700] tracking-[-0.2px] text-[#171717] whitespace-nowrap max-w-[400px] truncate">
          {activityName || "Detail aktivity"}
        </span>
      </div>

      {/* Right: Toggle panel + buttons */}
      <div className="flex items-center gap-2">
        {onToggleRightPanel && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleRightPanel}
            className="rounded-lg h-9 px-3 gap-2 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50"
          >
            {rightPanelVisible ? (
              <PanelRightClose className="size-4" />
            ) : (
              <PanelRightOpen className="size-4" />
            )}
            <span className="text-[13px] font-[500]">
              {rightPanelVisible ? "Skryť panel" : "Zobraziť panel"}
            </span>
          </Button>
        )}
        <Button
          variant="outline"
          className="rounded-lg px-3 py-1.5 h-9 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50"
        >
          <span className="text-[14px] font-[600] tracking-[-0.14px]">
            Info
          </span>
        </Button>
        <Button
          variant="outline"
          className="rounded-lg px-3 py-1.5 h-9 border-[#e5e5e5] text-[#374151] bg-white hover:bg-gray-50"
        >
          <span className="text-[14px] font-[600] tracking-[-0.14px]">
            User
          </span>
        </Button>
      </div>
    </header>
  );
}