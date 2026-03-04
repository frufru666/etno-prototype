import { X } from "lucide-react";

interface VideoPlayerProps {
  onClose: () => void;
  mobile?: boolean;
}

export function VideoPlayer({ onClose, mobile }: VideoPlayerProps) {
  return (
    <div className="flex flex-col h-full bg-[#0f172a]">
      <div className={`flex items-center justify-between ${mobile ? 'px-3 py-2' : 'px-6 py-3'} bg-[#1e293b]`}>
        <button
          onClick={onClose}
          className="flex items-center gap-2 cursor-pointer text-white hover:text-gray-300"
        >
          <X className="size-5" />
          <span className={`${mobile ? 'text-[16px] font-[600]' : 'text-[14px] font-[500]'}`}>
            {mobile ? "Zavrieť" : "Zavrieť"}
          </span>
        </button>
        <span className="text-[14px] font-[500] text-white">Video Prehrávač</span>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <div
          className="w-full h-full absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(150deg, rgb(49, 65, 88) 0%, rgb(29, 41, 61) 50%, rgb(15, 23, 43) 100%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="bg-[#e7000b] rounded-xl px-6 py-4 cursor-pointer hover:bg-[#cc0009] transition-colors">
            <div className="border-l-[14px] border-t-[8px] border-b-[8px] border-l-white border-t-transparent border-b-transparent ml-0.5" />
          </div>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          <div className="bg-[rgba(255,255,255,0.2)] rounded-full size-8 flex items-center justify-center pl-0.5 cursor-pointer hover:bg-[rgba(255,255,255,0.3)]">
            <div className="border-l-[8px] border-t-[5px] border-b-[5px] border-l-white border-t-transparent border-b-transparent" />
          </div>
          <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.2)] rounded-full overflow-hidden">
            <div className="bg-[#fb2c36] h-full w-0 rounded-full" />
          </div>
          <span className="text-[12px] text-[rgba(255,255,255,0.6)] font-['Geist_Mono',monospace]">
            0:00 / 3:16
          </span>
        </div>
      </div>
    </div>
  );
}