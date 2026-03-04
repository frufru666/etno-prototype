import svgPaths from "./svg-a77jpb1auo";
import imgResultThumbnail from "figma:asset/0d17a52780c75011f657b8b59a4b99bdd4966587.png";

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[218px]">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/MagnifyingGlass">
        <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5211 19.5211">
            <path d={svgPaths.p26a8cbc0} fill="var(--fill-0, #171717)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Polsko</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center opacity-50 p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
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
        <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-[-2px] pointer-events-none rounded-[10px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
            <Frame />
            <button className="block cursor-pointer overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
              <div className="absolute inset-[18.75%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
                  <path d={svgPaths.p2662980} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderArcheo() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center left-0 p-[8px] top-[118px] w-[393px]" data-name="Header Archeo">
      <Frame1 />
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

function Frame2() {
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
      <Frame2 />
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

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">ID AT00642</p>
      </div>
      <div className="bg-[#e5e5e5] content-stretch flex items-start px-[4px] relative rounded-[4px] self-stretch shrink-0" data-name="Druh chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">Kresba</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#171717] text-[14px] text-ellipsis tracking-[-0.14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Kresťanská misia Immanuel Spišská Nová Ves</p>
      </div>
      <Frame5 />
    </div>
  );
}

function FilePdf() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="FilePdf">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="FilePdf">
          <path d={svgPaths.pcc34100} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">ID AT00642</p>
      </div>
      <div className="bg-[#e5e5e5] content-stretch flex items-start px-[4px] relative rounded-[4px] self-stretch shrink-0" data-name="Druh chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">Výskumná správa</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#171717] text-[14px] text-ellipsis tracking-[-0.14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Osobné svedectvo laického kazateľa spoločenstva Kresťanská misia Immanuel Spišská Nová Ves</p>
      </div>
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">ID AT00642</p>
      </div>
      <div className="bg-[#e5e5e5] content-stretch flex items-start px-[4px] relative rounded-[4px] self-stretch shrink-0" data-name="Druh chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">Diapozitív</p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#171717] text-[14px] text-ellipsis tracking-[-0.14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Jeden riadok</p>
      </div>
      <Frame9 />
    </div>
  );
}

function FilePdf1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="FilePdf">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="FilePdf">
          <path d={svgPaths.pcc34100} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">ID AT00642</p>
      </div>
      <div className="bg-[#e5e5e5] content-stretch flex items-start px-[4px] relative rounded-[4px] self-stretch shrink-0" data-name="Druh chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">Výskumná správa</p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#171717] text-[14px] text-ellipsis tracking-[-0.14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Osobné svedectvo laického kazateľa spoločenstva Kresťanská misia Immanuel Spišská Nová Ves</p>
      </div>
      <Frame11 />
    </div>
  );
}

function FilePdf2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="FilePdf">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="FilePdf">
          <path d={svgPaths.pcc34100} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">ID AT00642</p>
      </div>
      <div className="bg-[#e5e5e5] content-stretch flex items-start px-[4px] relative rounded-[4px] self-stretch shrink-0" data-name="Druh chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[12px] whitespace-nowrap">
          <p className="leading-[16px]">Výskumná správa</p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#171717] text-[14px] text-ellipsis tracking-[-0.14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Osobné svedectvo laického kazateľa spoločenstva Kresťanská misia Immanuel Spišská Nová Ves</p>
      </div>
      <Frame13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[7px] items-start left-1/2 top-[235px] w-[377px]">
      <div className="bg-white relative shrink-0 w-full" data-name="Search list row">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
            <div className="relative rounded-[8px] shrink-0 size-[64px]" data-name="Result thumbnail">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgResultThumbnail} />
            </div>
            <Frame3 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Search list row">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
            <div className="bg-[#e5e5e5] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[64px]" data-name="Result thumbnail">
              <FilePdf />
            </div>
            <Frame4 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Search list row">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
            <div className="relative rounded-[8px] shrink-0 size-[64px]" data-name="Result thumbnail">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgResultThumbnail} />
            </div>
            <Frame8 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Search list row">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
            <div className="bg-[#e5e5e5] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[64px]" data-name="Result thumbnail">
              <FilePdf1 />
            </div>
            <Frame10 />
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Search list row">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[12px] items-center p-[8px] relative w-full">
            <div className="bg-[#e5e5e5] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[64px]" data-name="Result thumbnail">
              <FilePdf2 />
            </div>
            <Frame12 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Component1stRow() {
  return (
    <div className="content-stretch flex gap-[6px] h-[45px] items-center justify-center relative shrink-0 w-full" data-name="1st Row">
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">q</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">W</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">E</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">R</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">T</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">Y</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">U</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">I</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">O</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">P</p>
      </div>
    </div>
  );
}

function Component2ndRow() {
  return (
    <div className="h-[45px] relative shrink-0 w-full" data-name="2nd Row">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[16px] relative size-full">
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">A</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">S</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">D</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">F</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">G</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">H</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">J</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">K</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
            <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">L</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Center() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[6px] h-full items-start min-h-px min-w-px relative" data-name="center">
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">Z</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">X</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">C</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">V</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">B</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">N</p>
      </div>
      <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8.5px]" data-name="Key/Letter">
        <p className="-translate-x-1/2 absolute font-['SF_Compact_Text:Regular',sans-serif] leading-[normal] left-1/2 lowercase not-italic text-[25px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-17.5px)] w-[20px] whitespace-pre-wrap">M</p>
      </div>
    </div>
  );
}

function Component3rdRow() {
  return (
    <div className="content-stretch flex gap-[14px] h-[45px] items-center justify-center relative shrink-0 w-full" data-name="3rd Row">
      <div className="bg-[rgba(255,255,255,0.89)] h-full relative rounded-[8.5px] shrink-0 w-[42px]" data-name="Key/Shift">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Medium',sans-serif] leading-[normal] left-1/2 not-italic text-[19px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-11.5px)] w-[24px] whitespace-pre-wrap">􀆝</p>
      </div>
      <Center />
      <div className="bg-[rgba(255,255,255,0.89)] h-full relative rounded-[8.5px] shrink-0 w-[42px]" data-name="Key/Secondary">
        <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Medium',sans-serif] leading-[normal] left-1/2 not-italic text-[17px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-9.5px)] tracking-[-0.34px] w-[23px] whitespace-pre-wrap">􁂈</p>
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <div className="bg-white overflow-clip relative rounded-[24px] size-full" data-name="Results">
      <HeaderArcheo />
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[393px]" data-name="Status Bar">
        <Statusbar />
      </div>
      <HeaderArcheo1 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[15px] not-italic text-[17px] text-black top-[211px] tracking-[-0.17px] whitespace-nowrap">
        <p className="leading-[24px]">1 výsledok vyhľadávania</p>
      </div>
      <Frame6 />
      <div className="-translate-x-1/2 absolute backdrop-blur-[5px] bg-[rgba(218,218,218,0.75)] bottom-0 content-stretch flex flex-col items-center left-[calc(50%-0.5px)] pb-[80px] pt-[8px] px-[4px] rounded-bl-[24px] rounded-br-[24px] rounded-tl-[27px] rounded-tr-[27px] w-[402px]" data-name="Keyboard/Default">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-bl-[24px] rounded-br-[24px] rounded-tl-[27px] rounded-tr-[27px]" />
        <div className="content-stretch flex items-center justify-center py-[8px] relative shrink-0 w-[402px]" data-name="Keyboard/Suggestion">
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[18px] text-black text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre-wrap">I</p>
          </div>
          <div className="bg-[rgba(0,0,0,0.18)] h-[24px] rounded-[1px] shrink-0 w-px" data-name="tr" />
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[18px] text-black text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre-wrap">The</p>
          </div>
          <div className="bg-[rgba(0,0,0,0.18)] h-[24px] shrink-0 w-px" data-name="tr" />
          <div className="flex flex-[1_0_0] flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[18px] text-black text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[normal] whitespace-pre-wrap">I’m</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-center pt-[8px] relative shrink-0 w-full" data-name="Keyboard/Layout">
          <Component1stRow />
          <Component2ndRow />
          <Component3rdRow />
        </div>
        <div className="h-[10px] shrink-0 w-full" data-name="Spacer" />
        <div className="content-stretch flex gap-[6px] h-[45px] items-center justify-center relative shrink-0 w-full" data-name="Keyboard/Input Type">
          <div className="bg-[rgba(255,255,255,0.89)] h-full relative rounded-[8.5px] shrink-0 w-[91px]" data-name="Key/Secondary">
            <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Medium',sans-serif] leading-[normal] left-[calc(50%+0.5px)] not-italic text-[16px] text-[rgba(0,0,0,0.65)] text-center top-[calc(50%-9.5px)] tracking-[-0.32px] w-[40px] whitespace-pre-wrap">123</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.89)] flex-[1_0_0] h-full min-h-px min-w-px rounded-[8.5px]" data-name="Key/Space" />
          <div className="bg-[rgba(255,255,255,0.89)] h-full relative rounded-[8.5px] shrink-0 w-[91px]" data-name="Key/Action">
            <p className="-translate-x-1/2 absolute bottom-[43px] font-['SF_Pro_Display:Regular',sans-serif] h-[43px] leading-[42px] left-1/2 not-italic text-[19px] text-[rgba(0,0,0,0.65)] text-center translate-y-full w-[25px] whitespace-pre-wrap">􀅇</p>
          </div>
        </div>
        <p className="absolute bottom-[56px] font-['SF_Pro_Text:Regular',sans-serif] leading-[normal] not-italic right-[42px] text-[27px] text-[rgba(0,0,0,0.5)] text-center translate-x-1/2 translate-y-full">􀊰</p>
        <div className="absolute bottom-[27px] left-[29px] size-[27px]" data-name="emoji">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
            <g id="emoji" style={{ mixBlendMode: "plus-darker" }}>
              <path d={svgPaths.p18200800} fill="var(--fill-0, black)" fillOpacity="0.5" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_2px_0px_white]" />
      </div>
    </div>
  );
}