import svgPaths from "./svg-rn0m48u5lg";

function MapPinArea() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="MapPinArea">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="MapPinArea">
          <path d={svgPaths.p1576b500} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function MapPin() {
  return (
    <div className="bg-[#ef4444] content-stretch flex flex-col items-center justify-center px-[15.2px] py-[8px] relative rounded-[19.2px] size-full" data-name="Map pin">
      <MapPinArea />
    </div>
  );
}