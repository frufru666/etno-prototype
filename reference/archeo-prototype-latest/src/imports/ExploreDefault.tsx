import svgPaths from "./svg-5s2rkfjgne";
import imgMapImage from "figma:asset/67afffbbf52d5b38b4c3eec89522328b1e26acd5.png";

function Statusbar() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Statusbar">
      <div className="-translate-y-1/2 absolute content-stretch flex gap-[7.33px] items-center justify-center right-[35px] top-[calc(50%+0.33px)]" data-name="Status/Pro">
        <div className="h-[12.333px] relative shrink-0 w-[19.333px]" data-name="Cellular">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3333 12.3333">
            <g id="Cellular">
              <path d={svgPaths.p8bdef00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p12dc6500} fill="var(--fill-0, black)" />
              <path d={svgPaths.p5f0ea00} fill="var(--fill-0, black)" />
              <path d={svgPaths.p189c4440} fill="var(--fill-0, black)" />
            </g>
          </svg>
        </div>
        <div className="h-[12.333px] relative shrink-0 w-[17px]" data-name="Wifi">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 12.3333">
            <path clipRule="evenodd" d={svgPaths.p70af300} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
          </svg>
        </div>
        <div className="h-[13.667px] relative shrink-0 w-[27.333px]" data-name="Battery/Percentage">
          <div className="-translate-y-1/2 absolute bg-black h-[9px] left-[2px] rounded-[2.667px] top-1/2 w-[21px]" data-name="percent" />
          <div className="-translate-y-1/2 absolute h-[13px] left-0 top-1/2 w-[27.333px]" data-name="battery">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3333 13">
              <g id="battery" opacity="0.4">
                <path clipRule="evenodd" d={svgPaths.p2b410900} fill="var(--fill-0, black)" fillRule="evenodd" />
                <path d={svgPaths.p2c79ba00} fill="var(--fill-0, black)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-black h-[36px] left-1/2 rounded-[18px] top-1/2 w-[124px]" data-name="Dynamic Island" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Bold',sans-serif] leading-[normal] left-[77px] not-italic text-[17px] text-black text-center top-[calc(50%-9.67px)] tracking-[-0.4px] w-[122px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function CheckSquare() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="CheckSquare">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_8162)" id="CheckSquare">
          <g id="Vector" />
          <path d={svgPaths.pef74b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_8_8162">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Crosshair() {
  return (
    <div className="absolute left-0 size-[24px] top-0" data-name="Crosshair">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_8125)" id="Crosshair">
          <g id="Vector" />
          <path d="M12 21.75V18.75" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7786280} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 2.25L12 21.75" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 12H5.25" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M21.75 12L2.25 12" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_8_8125">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center left-0 p-[8px] rounded-[8px] top-0" data-name="Button">
        <div className="relative shrink-0 size-[24px]" data-name="IconPlaceholder">
          <CheckSquare />
          <Crosshair />
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e5f0ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Filter</p>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+1px)] not-italic text-[#171717] text-[18px] text-center top-[20px] tracking-[-0.36px] whitespace-nowrap">
        <p className="leading-[24px]">Filter interaction</p>
      </div>
      <div className="absolute bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center p-[8px] right-0 rounded-[8px] top-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/List">
          <div className="absolute inset-[21.88%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13.5">
              <path d={svgPaths.p186000} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreDefault() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] size-full" data-name="Explore default">
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[393px]" data-name="Status Bar">
        <Statusbar />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center left-0 px-[8px] py-[4px] top-[62px] w-[393px]" data-name="Mobile Header">
        <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
        <Container />
      </div>
      <div className="-translate-x-1/2 absolute bottom-[34px] content-stretch flex gap-[32px] items-center left-[calc(50%+0.5px)]" data-name="Tabs Mode Compact">
        <div className="backdrop-blur-[12px] bg-[rgba(250,250,250,0.7)] content-stretch flex items-center justify-center py-[9px] relative rounded-[24px] shrink-0 size-[48px]" data-name="Button">
          <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_2px_40px_0px_rgba(0,0,0,0.1)]" />
          <div className="flex flex-col font-['SF_Compact:Light',sans-serif] font-[350.52398681640625] justify-center leading-[0] relative shrink-0 size-[24px] text-[#1b1b1b] text-[23px] text-center">
            <p className="leading-[normal] whitespace-pre-wrap">􀯶</p>
          </div>
        </div>
        <div className="backdrop-blur-[12px] bg-[rgba(250,250,250,0.7)] h-[48px] relative rounded-[24px] shrink-0 w-[218px]" data-name="Search Bar">
          <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_2px_42px_0px_rgba(0,0,0,0.1)]" />
          <div className="-translate-y-1/2 absolute h-[17.982px] right-[13.24px] top-[calc(50%-0.31px)] w-[14.757px]" data-name="reload">
            <div className="absolute inset-[-0.56%_-0.68%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9568 18.1824">
                <path d={svgPaths.p35cf2300} fill="var(--fill-0, #1B1B1B)" id="reload" stroke="var(--stroke-0, #1B1B1B)" strokeWidth="0.2" />
              </svg>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Medium',sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[#1b1b1b] text-[17px] text-center top-1/2 whitespace-nowrap">
            <p className="leading-[normal]">metafori.com</p>
          </div>
          <div className="-translate-y-1/2 absolute h-[18px] left-[15px] top-1/2 w-[15px]" data-name="site settings">
            <div className="absolute inset-[-0.56%_-0.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2 18.2">
                <path clipRule="evenodd" d={svgPaths.p1e0de700} fill="var(--fill-0, #1B1B1B)" fillRule="evenodd" id="site settings" stroke="var(--stroke-0, #1B1B1B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2" />
              </svg>
            </div>
          </div>
        </div>
        <div className="backdrop-blur-[12px] bg-[rgba(250,250,250,0.7)] content-stretch flex items-center justify-center py-[9px] relative rounded-[24px] shrink-0 size-[48px]" data-name="Button">
          <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_2px_40px_0px_rgba(0,0,0,0.1)]" />
          <div className="flex flex-col font-['SF_Compact:Light',sans-serif] font-[350.52398681640625] justify-center leading-[0] relative shrink-0 size-[24px] text-[#1b1b1b] text-[23px] text-center">
            <p className="leading-[normal] whitespace-pre-wrap">􀍠</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[858px] left-0 top-[108px] w-[393px]" data-name="Map Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMapImage} />
      </div>
    </div>
  );
}