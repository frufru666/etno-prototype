import svgPaths from "./svg-vjar75l8f4";
import imgRectangle1450 from "figma:asset/5a87c180c1bd15d72e24a7a2c8967bda377c30c1.png";

function Statusbar() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Statusbar">
      <div className="-translate-y-1/2 absolute content-stretch flex gap-[7.33px] items-center justify-center right-[35px] top-[calc(50%+0.33px)]" data-name="Status/Pro">
        <div className="h-[12.333px] relative shrink-0 w-[19.333px]" data-name="Cellular">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3333 12.3333">
            <g id="Cellular">
              <path d={svgPaths.p8bdef00} fill="var(--fill-0, #171717)" />
              <path d={svgPaths.p12dc6500} fill="var(--fill-0, #171717)" />
              <path d={svgPaths.p5f0ea00} fill="var(--fill-0, #171717)" />
              <path d={svgPaths.p189c4440} fill="var(--fill-0, #171717)" />
            </g>
          </svg>
        </div>
        <div className="h-[12.333px] relative shrink-0 w-[17px]" data-name="Wifi">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 12.3333">
            <path clipRule="evenodd" d={svgPaths.p70af300} fill="var(--fill-0, #171717)" fillRule="evenodd" id="Wifi" />
          </svg>
        </div>
        <div className="h-[13.667px] relative shrink-0 w-[27.333px]" data-name="Battery/Percentage">
          <div className="-translate-y-1/2 absolute bg-[#171717] h-[9px] left-[2px] rounded-[2.667px] top-1/2 w-[21px]" data-name="percent" />
          <div className="-translate-y-1/2 absolute h-[13px] left-0 top-1/2 w-[27.333px]" data-name="battery">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.3333 13">
              <g id="battery" opacity="0.4">
                <path clipRule="evenodd" d={svgPaths.p2b410900} fill="var(--fill-0, #171717)" fillRule="evenodd" />
                <path d={svgPaths.p2c79ba00} fill="var(--fill-0, #171717)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#171717] h-[36px] left-1/2 rounded-[18px] top-1/2 w-[124px]" data-name="Dynamic Island" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Bold',sans-serif] leading-[normal] left-[77px] not-italic text-[#171717] text-[17px] text-center top-[calc(50%-9.67px)] tracking-[-0.4px] w-[122px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function Container() {
  return (
    <div className="cursor-pointer h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute content-stretch flex gap-[8px] items-center left-0 p-[8px] rounded-[8px] top-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Close">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0008 15.0008">
              <path d={svgPaths.p3bbf7480} fill="var(--fill-0, #1A62FF)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">{`Zavrieť `}</p>
        </div>
      </div>
      <div className="absolute bg-[#1a62ff] content-stretch flex gap-[8px] items-center opacity-0 p-[8px] right-0 rounded-[8px] top-0" data-name="Button">
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

function Frame1() {
  return (
    <div className="absolute bg-[#171717] content-stretch flex items-center justify-center left-[124px] p-[8px] top-[421px]">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.14px] w-[243px]">
        <p className="text-[14px] whitespace-pre-wrap">
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-white">Poznámka</span>
          <span className="leading-[normal]">
            <br aria-hidden="true" />
            {`P III S56 `}
          </span>
          <span className="font-['Inter:Italic',sans-serif] font-normal italic leading-[normal] text-white">Celkový pohľad na kontexty drevorezného valu kontrolného bloku</span>
        </p>
      </div>
    </div>
  );
}

function ImageContainer() {
  return (
    <div className="absolute bg-[#e5e5e5] h-[554px] left-0 top-[110px] w-[393px]" data-name="Image container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[518px] left-[-189px] top-[18px] w-[549px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1450} />
        </div>
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#8f8f8f] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[0px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] text-[14px]">Nálezisko / Terén (18)</p>
      </div>
    </div>
  );
}

export default function KategoriaImageViewerWCaption() {
  return (
    <div className="bg-white relative size-full" data-name="Kategoria / Image viewer w caption">
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[393px]" data-name="Status Bar">
        <Statusbar />
      </div>
      <div className="absolute bottom-[32px] content-stretch flex gap-[32px] items-center right-[7px]" data-name="Tabs Mode Compact">
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
      <div className="absolute bg-white content-stretch flex flex-col items-center left-0 pl-[8px] pr-[12px] py-[4px] top-[62px] w-[393px]" data-name="Mobile Header">
        <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
        <Container />
      </div>
      <ImageContainer />
      <div className="absolute left-[16px] pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px]" />
      </div>
      <div className="absolute left-[72px] opacity-30 pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[128px] opacity-30 pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[184px] opacity-30 pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[240px] opacity-30 pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[296px] opacity-30 pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[352px] opacity-30 pointer-events-none size-[48px] top-[685px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1450} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <button className="absolute bg-white cursor-pointer h-[40px] left-[135px] rounded-[8px] top-[62px] w-[243px]" data-name="Filter Dropdown">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[24px] relative size-full">
            <Frame />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/CaretDown">
              <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
                  <path d={svgPaths.p10c93a80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <div className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center left-[344px] p-[8px] rounded-[8px] top-[123px]" data-name="Button">
        <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Plus">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.pc4f6100} fill="var(--fill-0, #1A62FF)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center left-[344px] p-[8px] rounded-[8px] top-[170px]" data-name="Button">
        <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Minus">
          <div className="absolute inset-[46.88%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 1.5">
              <path d={svgPaths.p185fdf40} fill="var(--fill-0, #1A62FF)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <button className="absolute bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center left-[344px] p-[8px] rounded-[8px] top-[606px]" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Info">
          <div className="absolute inset-[9.38%_9.38%_9.37%_9.37%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
              <path d={svgPaths.p18982200} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}