import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { IMG_CATEGORIES, CATEGORY_IMAGES, type ImageCategory, TOTAL_IMAGE_COUNT } from "./ImageViewer";

interface GalleryOverviewProps {
  onClose: () => void;
  onImageClick: (category: ImageCategory, index: number) => void;
  mobile?: boolean;
}

function GallerySection({
  title,
  categoryKey,
  images,
  onImageClick,
  mobile,
}: {
  title: string;
  categoryKey: ImageCategory;
  images: string[];
  onImageClick: (category: ImageCategory, index: number) => void;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "mb-10" : "mb-8"}>
      <h3
        className={`${
          mobile ? "text-[18px]" : "text-[16px]"
        } font-[700] text-[#171717] ${mobile ? "tracking-[-0.18px]" : ""} mb-4`}
      >
        {title} ({images.length})
      </h3>
      <div className={`grid ${mobile ? "grid-cols-2" : "grid-cols-5"} gap-3`}>
        {images.map((img, i) => (
          <button
            key={`${categoryKey}-${i}`}
            onClick={() => onImageClick(categoryKey, i)}
            className={`${
              mobile ? "aspect-[1.03]" : "aspect-square rounded-lg"
            } overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-[#e5e5e5]`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function GalleryOverview({ onClose, onImageClick, mobile }: GalleryOverviewProps) {
  if (mobile) {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-2 py-2 border-b border-[#e5e5e5]">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#1a62ff] hover:text-[#034ae8] hover:bg-blue-50 gap-1 px-2 h-9"
          >
            <ArrowLeft className="size-4" />
            <span className="text-[14px] font-[500]">Zavrieť</span>
          </Button>
          <span className="text-[14px] font-[600] text-[#171717]">
            Galéria ({TOTAL_IMAGE_COUNT})
          </span>
          <div className="w-[72px]" />
        </div>
        <div className="px-4 py-5">
          {IMG_CATEGORIES.map((cat) => (
            <GallerySection
              key={cat.key}
              title={cat.fullLabel}
              categoryKey={cat.key}
              images={CATEGORY_IMAGES[cat.key]}
              onImageClick={onImageClick}
              mobile
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#e5e5e5]">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-[#171717] hover:text-[#737373] gap-1 px-2 h-9"
        >
          <ArrowLeft className="size-4" />
          <span className="text-[14px] font-[500]">Zavrieť</span>
        </Button>
        <span className="text-[14px] font-[600] text-[#171717]">
          Galéria ({TOTAL_IMAGE_COUNT})
        </span>
        <div className="w-[72px]" />
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {IMG_CATEGORIES.map((cat) => (
          <GallerySection
            key={cat.key}
            title={cat.fullLabel}
            categoryKey={cat.key}
            images={CATEGORY_IMAGES[cat.key]}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  );
}
