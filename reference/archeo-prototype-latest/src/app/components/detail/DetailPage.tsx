import { useState } from "react";
import { useParams } from "react-router";
import { DetailTopNav } from "./DetailTopNav";
import { DetailMap } from "./DetailMap";
import { DetailRightPanel } from "./DetailRightPanel";
import { GalleryOverview } from "./GalleryOverview";
import { ImageViewer, type ImageCategory } from "./ImageViewer";
import { VideoPlayer } from "./VideoPlayer";
import { PdfViewer } from "./PdfViewer";
import { useIsMobile } from "../ui/use-mobile";
import { ACTIVITIES } from "../../data/mockData";

type LeftPanelView =
  | { type: "map" }
  | { type: "gallery" }
  | { type: "imageViewer"; category: ImageCategory; index: number }
  | { type: "video" }
  | { type: "pdf"; title: string; size: string };

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [leftPanel, setLeftPanel] = useState<LeftPanelView>({ type: "map" });
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const isMobile = useIsMobile();

  // Find activity by ca number
  const activity = ACTIVITIES.find((a) => a.ca === id) || ACTIVITIES[0];

  const handleOpenGallery = () => {
    setLeftPanel({ type: "gallery" });
  };

  const handleOpenImage = (category: ImageCategory, index: number) => {
    setLeftPanel({ type: "imageViewer", category, index });
  };

  const handleOpenVideo = () => {
    setLeftPanel({ type: "video" });
  };

  const handleOpenPdf = (title: string, size: string) => {
    setLeftPanel({ type: "pdf", title, size });
  };

  const handleCloseOverlay = () => {
    setLeftPanel({ type: "map" });
  };

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <DetailTopNav activityName={activity.name} />

        <div className="pt-[49px]">
          <div className={`relative w-full h-[280px] ${mapFullscreen ? "invisible" : ""}`}>
            <DetailMap
              compact
              activity={activity}
              isFullscreen={false}
              onRequestFullscreen={() => setMapFullscreen(true)}
            />
          </div>
        </div>

        <div className="flex-1">
          <DetailRightPanel
            onOpenGallery={handleOpenGallery}
            onOpenImage={handleOpenImage}
            onOpenVideo={handleOpenVideo}
            onOpenPdf={handleOpenPdf}
            mobile
            activity={activity}
          />
        </div>

        {/* Fullscreen map overlay */}
        {mapFullscreen && (
          <div className="fixed inset-0 z-[60] bg-black">
            <DetailMap
              activity={activity}
              isFullscreen
              onExitFullscreen={() => setMapFullscreen(false)}
            />
          </div>
        )}

        {leftPanel.type === "gallery" && (
          <div className="fixed inset-0 z-[60] bg-white overflow-y-auto">
            <GalleryOverview
              onClose={handleCloseOverlay}
              onImageClick={handleOpenImage}
              mobile
            />
          </div>
        )}

        {leftPanel.type === "imageViewer" && (
          <div className="fixed inset-0 z-[60] bg-white">
            <ImageViewer
              category={leftPanel.category}
              index={leftPanel.index}
              onClose={handleCloseOverlay}
              onOpenGallery={handleOpenGallery}
              mobile
            />
          </div>
        )}

        {leftPanel.type === "video" && (
          <div className="fixed inset-0 z-[60]">
            <VideoPlayer onClose={handleCloseOverlay} mobile />
          </div>
        )}

        {leftPanel.type === "pdf" && (
          <div className="fixed inset-0 z-[60] bg-white">
            <PdfViewer
              title={leftPanel.title}
              size={leftPanel.size}
              onClose={handleCloseOverlay}
              mobile
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="h-screen flex flex-col">
      <DetailTopNav
        activityName={activity.name}
        rightPanelVisible={rightPanelVisible}
        onToggleRightPanel={() => setRightPanelVisible(!rightPanelVisible)}
      />

      <div className="flex flex-1 pt-[57px] overflow-hidden">
        {/* Left panel - expands to full when right panel hidden */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className={`absolute inset-0 ${
              leftPanel.type !== "map" ? "hidden" : ""
            }`}
          >
            <DetailMap activity={activity} openPopupOnLoad />
          </div>

          {leftPanel.type === "gallery" && (
            <div className="absolute inset-0 z-30 bg-white">
              <GalleryOverview
                onClose={handleCloseOverlay}
                onImageClick={handleOpenImage}
              />
            </div>
          )}

          {leftPanel.type === "imageViewer" && (
            <div className="absolute inset-0 z-30 bg-white">
              <ImageViewer
                category={leftPanel.category}
                index={leftPanel.index}
                onClose={handleCloseOverlay}
                onOpenGallery={handleOpenGallery}
              />
            </div>
          )}

          {leftPanel.type === "video" && (
            <div className="absolute inset-0 z-30">
              <VideoPlayer onClose={handleCloseOverlay} />
            </div>
          )}

          {leftPanel.type === "pdf" && (
            <div className="absolute inset-0 z-30 bg-white">
              <PdfViewer
                title={leftPanel.title}
                size={leftPanel.size}
                onClose={handleCloseOverlay}
              />
            </div>
          )}
        </div>

        {/* Right scrollable panel - collapsible */}
        {rightPanelVisible && (
          <DetailRightPanel
            onOpenGallery={handleOpenGallery}
            onOpenImage={handleOpenImage}
            onOpenVideo={handleOpenVideo}
            onOpenPdf={handleOpenPdf}
            activity={activity}
          />
        )}
      </div>
    </div>
  );
}