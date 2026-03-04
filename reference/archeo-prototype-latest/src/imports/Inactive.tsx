import svgPaths from "./svg-mxjbxdt155";
import imgMapComponentMobile from "figma:asset/67afffbbf52d5b38b4c3eec89522328b1e26acd5.png";

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[218px]">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/MagnifyingGlass">
        <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5211 19.5211">
            <path d={svgPaths.p26a8cbc0} fill="var(--fill-0, #171717)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Search in collection</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/GpsFix">
          <div className="absolute inset-[3.13%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
              <path d={svgPaths.p2926400} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-right text-white tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Filter</p>
        </div>
      </div>
      <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[8px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
            <Frame1 />
            <div className="opacity-0 overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
              <div className="absolute inset-[18.75%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
                  <path d={svgPaths.p2662980} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderArcheo() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center left-0 p-[8px] top-[118px] w-[393px]" data-name="Header Archeo">
      <Frame3 />
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

function Frame8() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[3px] top-1/2">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1" r="20" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[-0.36px] whitespace-nowrap">
        <p className="leading-[24px]">Etno Explorer SAV</p>
      </div>
    </div>
  );
}

function HeaderNav() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Header Nav">
      <div className="absolute bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center p-[8px] right-0 rounded-[8px] top-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/List">
          <div className="absolute inset-[21.88%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13.5">
              <path d={svgPaths.p186000} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <Frame8 />
    </div>
  );
}

function HeaderArcheo1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center left-0 p-[8px] top-[62px] w-[393px]" data-name="Header Archeo">
      <HeaderNav />
    </div>
  );
}

function MapPin() {
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

function Frame() {
  return <div className="absolute h-[108px] left-[62px] top-[248px] w-[255px]" />;
}

function MapComponentMobile() {
  return (
    <div className="absolute h-[600px] left-0 overflow-clip top-[118px] w-[393px]" data-name="Map component mobile">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMapComponentMobile} />
      <div className="absolute bg-[#12b24d] content-stretch flex flex-col items-center justify-center left-[166px] px-[22.8px] py-[12px] rounded-[28.8px] size-[48px] top-[402px]" data-name="Map pin">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[28.8px]" />
        <MapPin />
      </div>
      <div className="absolute bg-[#1a62ff] content-stretch flex flex-col items-center justify-center left-[323px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[529px]" data-name="Map pin">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="MapPinPlus">
          <div className="absolute inset-[6.25%_15.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 20.9998">
              <path d={svgPaths.p8a13600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#1a62ff] content-stretch flex flex-col items-center justify-center left-[74px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[529px]" data-name="Map pin">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="MapPinPlus">
          <div className="absolute inset-[6.25%_15.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 20.9998">
              <path d={svgPaths.p8a13600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(23,23,23,0.6)] content-stretch flex flex-col items-center justify-center left-[330px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[426px]" data-name="Map cluster/Opacity 60">
        <div aria-hidden="true" className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[19.2px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.14px] whitespace-nowrap">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] text-[14px]">8</p>
        </div>
      </div>
      <Frame />
      <button className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center justify-center p-[8px] right-[12px] rounded-[8px] size-[36px] top-[552px]" data-name="Button 42">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="GpsFix">
          <div className="absolute inset-[3.13%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
              <path d={svgPaths.p2926400} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full">
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">Filter name:</span>
            <span className="leading-[16px]">{` Placeholder`}</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #034AE8)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">Filter name:</span>
            <span className="leading-[16px]">{` Placeholder`}</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #034AE8)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">Filter name:</span>
            <span className="leading-[16px]">{` Placeholder`}</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #034AE8)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">Filter name:</span>
            <span className="leading-[16px]">{` Placeholder`}</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #034AE8)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">Filter name:</span>
            <span className="leading-[16px]">{` Placeholder`}</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #034AE8)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">Filter name:</span>
            <span className="leading-[16px]">{` Placeholder`}</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #034AE8)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[14px] top-[734px] w-[369px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#0f172b] text-[18px] tracking-[-0.36px] w-full whitespace-pre-wrap">Aplikované filtre</p>
      <Frame4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Stack">
        <div className="absolute inset-[6.25%_9.33%_6.25%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5113 20.9999">
            <path d={svgPaths.p16a42000} fill="var(--fill-0, #171717)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Čislo aktivity</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-between left-0 px-[16px] py-[8px] top-[118px] w-[393px]">
      <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['General_Sans:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[20px]">{`30 Aktivít `}</p>
      </div>
      <button className="bg-white cursor-pointer h-[36px] relative rounded-[8px] shrink-0 w-[160px]" data-name="Filter Dropdown">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[24px] relative size-full">
            <Frame2 />
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

function Frame7() {
  return (
    <div className="h-[170px] pointer-events-auto sticky top-0 w-[393px]">
      <Frame6 />
    </div>
  );
}

export default function Inactive() {
  return (
    <div className="bg-white overflow-clip relative rounded-[24px] size-full" data-name="Inactive">
      <HeaderArcheo />
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[393px]" data-name="Status Bar">
        <Statusbar />
      </div>
      <HeaderArcheo1 />
      <MapComponentMobile />
      <Frame5 />
      <div className="absolute bottom-0 h-[91px] left-0 pointer-events-none top-[761px]">
        <Frame7 />
      </div>
    </div>
  );
}