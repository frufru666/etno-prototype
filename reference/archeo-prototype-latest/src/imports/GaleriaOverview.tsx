import svgPaths from "./svg-m93elsoace";
import imgRectangle1450 from "figma:asset/773e9aeaa4bc8b135d36fc0267dab079aa2cff8d.png";
import imgRectangle1460 from "figma:asset/0e6208e72ea285727d2d950112b4791c6472338d.png";
import imgRectangle1461 from "figma:asset/d29b1477119f8b1e3a3c8e9733ef7ea0745c5378.png";
import imgRectangle1462 from "figma:asset/7158adb8a5328b1fe84ad84f214931c6cd715954.png";
import imgRectangle1451 from "figma:asset/3a28314f6074d5c4f7f47306b99185456f73c97f.png";
import imgRectangle1463 from "figma:asset/d3fda19c92264b79ac4f36850c687362bfd21151.png";
import imgRectangle1464 from "figma:asset/43d0ed6c17aece1e9e6735b048c7d5803624ede6.png";
import imgRectangle1452 from "figma:asset/1482d14939e3e3907bafff50eaf613f2abddafca.png";
import imgRectangle1453 from "figma:asset/4ae3cc154e96e1f28774605547be734d827eae27.png";

function Container() {
  return (
    <div className="cursor-pointer flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Container">
      <div className="absolute content-stretch flex gap-[8px] items-center left-0 p-[8px] rounded-[8px] top-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Close">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0008 15.0008">
              <path d={svgPaths.p3bbf7480} fill="var(--fill-0, #1A62FF)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Zavrieť galériu</p>
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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Prehľad</p>
      </div>
    </div>
  );
}

function MobileHeader() {
  return (
    <div className="absolute bg-white content-stretch flex items-start justify-center left-0 pl-[8px] pr-[12px] py-[4px] top-[62px] w-[393px]" data-name="Mobile Header">
      <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <Container />
      <button className="bg-white cursor-pointer h-[40px] relative rounded-[8px] shrink-0 w-[162px]" data-name="Filter Dropdown">
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
    </div>
  );
}

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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Prehľad</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] items-start relative shrink-0 w-full">
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1450} />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1460} />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1461} />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1462} />
      </div>
    </div>
  );
}

function Kategoria() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Kategoria">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[-0.18px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Nálezisko / Terén (5)</p>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] items-start pointer-events-none relative shrink-0 w-full">
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1451} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1463} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1464} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
      </div>
    </div>
  );
}

function Kategoria1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Kategoria">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[-0.18px] whitespace-nowrap">
        <p className="leading-[24px]">Nálezy</p>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-start flex flex-wrap gap-y-[12px] items-start relative shrink-0 w-full">
      <div className="h-[170px] pointer-events-none relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1452} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
      </div>
    </div>
  );
}

function Kategoria2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Kategoria">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[-0.18px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Plány</p>
      </div>
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] items-start relative shrink-0 w-full">
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1453} />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1453} />
      </div>
      <div className="h-[170px] relative shrink-0 w-[176px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1453} />
      </div>
    </div>
  );
}

function Kategoria3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Kategoria">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[-0.18px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Vizualizácie</p>
      </div>
      <Frame6 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[17px] top-[192px] w-[364px]">
      <Kategoria />
      <Kategoria1 />
      <Kategoria2 />
      <Kategoria3 />
    </div>
  );
}

export default function GaleriaOverview() {
  return (
    <div className="bg-white relative size-full" data-name="Galeria overview">
      <MobileHeader />
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
      <button className="absolute bg-white cursor-pointer h-[40px] left-[223px] rounded-[8px] top-[66px] w-[162px]" data-name="Filter Dropdown">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[24px] relative size-full">
            <Frame1 />
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
      <Frame3 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[19px] not-italic text-[20px] text-black top-[151px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[24px]">Prehľad médií</p>
      </div>
    </div>
  );
}