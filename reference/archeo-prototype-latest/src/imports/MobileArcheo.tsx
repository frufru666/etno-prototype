import svgPaths from "./svg-smnvnol5t6";
import imgMapComponentMobile from "figma:asset/67afffbbf52d5b38b4c3eec89522328b1e26acd5.png";

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

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Text">
      <p className="flex-[1_0_0] font-['Geist:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px overflow-hidden relative text-[#18181b] text-[14px] text-ellipsis whitespace-nowrap">Ortofotomozaika</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="phosphor/caret-down">
        <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
            <g id="Vector">
              <mask fill="white" id="path-1-inside-1_60_940">
                <path d={svgPaths.p10c93a80} />
              </mask>
              <path d={svgPaths.p2b013200} fill="var(--stroke-0, #71717B)" mask="url(#path-1-inside-1_60_940)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function MapPinLine() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="MapPinLine">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="MapPinLine">
          <path d={svgPaths.p563d380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MapPin() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="MapPin">
          <path d={svgPaths.p34cef800} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

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

function MapPin1() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="MapPin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="MapPin">
          <path d={svgPaths.p9771880} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MapComponentMobile() {
  return (
    <div className="absolute h-[747px] left-0 overflow-clip top-[106px] w-[393px]" data-name="Map component mobile">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMapComponentMobile} />
      <div className="absolute bg-white content-stretch flex h-[36px] items-center justify-between left-[12px] px-[12px] py-[8px] rounded-[8px] top-[694px] w-[180px]" data-name="Select">
        <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
        <Text />
        <Icon />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[346px] rounded-[8px] size-[36px] top-[694px]" data-name="Buttons">
        <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="phosphor/caret-right">
          <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
              <g id="Vector">
                <mask fill="white" id="path-1-inside-1_60_938">
                  <path d={svgPaths.p1f520d80} />
                </mask>
                <path d={svgPaths.p3173cb80} fill="var(--stroke-0, #09090B)" mask="url(#path-1-inside-1_60_938)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[346px] rounded-[8px] size-[36px] top-[649px]" data-name="Buttons">
        <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="phosphor/caret-right">
          <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
              <g id="Vector">
                <mask fill="white" id="path-1-inside-1_60_938">
                  <path d={svgPaths.p1f520d80} />
                </mask>
                <path d={svgPaths.p3173cb80} fill="var(--stroke-0, #09090B)" mask="url(#path-1-inside-1_60_938)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#f59e0b] content-stretch flex flex-col items-center justify-center left-[134px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[296px]" data-name="Map pin">
        <MapPinLine />
      </div>
      <div className="absolute bg-[#12b24d] content-stretch flex flex-col items-center justify-center left-[248px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[386px]" data-name="Map pin">
        <MapPin />
      </div>
      <div className="absolute bg-[#ef4444] content-stretch flex flex-col items-center justify-center left-[252px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[174px]" data-name="Map pin">
        <MapPinArea />
      </div>
      <div className="absolute bg-[rgba(23,23,23,0.6)] content-stretch flex flex-col items-center justify-center left-[74px] px-[15.2px] py-[8px] rounded-[999px] size-[40px] top-[113px]" data-name="Map cluster">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[999px]" />
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.14px] whitespace-nowrap">
          <p className="leading-[24px]">123</p>
        </div>
      </div>
      <div className="absolute bg-[#12b24d] content-stretch flex flex-col items-center justify-center left-[102px] px-[22.8px] py-[12px] rounded-[28.8px] size-[48px] top-[487px]" data-name="Map pin">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[28.8px]" />
        <MapPin1 />
      </div>
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
        <p className="leading-[24px]">Archeo SAV</p>
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

export default function MobileArcheo() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] size-full" data-name="Mobile Archeo">
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[402px]" data-name="Status Bar">
        <Statusbar />
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
      <MapComponentMobile />
      <div className="absolute bg-white content-stretch flex flex-col items-center left-0 px-[8px] py-[4px] top-[58px] w-[393px]" data-name="Mobile Header">
        <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
        <Container />
      </div>
    </div>
  );
}