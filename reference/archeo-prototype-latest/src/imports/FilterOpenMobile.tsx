import svgPaths from "./svg-dlfyk2pyat";

function Container() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute content-stretch cursor-pointer flex gap-[8px] items-center left-0 p-[8px] rounded-[8px] top-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Close">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0008 15.0008">
              <path d={svgPaths.p3bbf7480} fill="var(--fill-0, #1A62FF)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Zavrieť filter</p>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex gap-[8px] items-center opacity-50 p-[8px] right-0 rounded-[8px] top-0" data-name="Button">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Reset</p>
        </div>
      </div>
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

function GpsFix() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="GpsFix">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_11_11355)" id="GpsFix">
          <path d={svgPaths.p36a8f280} fill="var(--fill-0, #737373)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_11_11355">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function GeographicFiltersHeader() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Geographic filters header">
      <GpsFix />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Geografické filtre</p>
      </div>
    </div>
  );
}

function FilterContainer3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Obec</p>
      </div>
    </div>
  );
}

function FilterContainer4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Kataster</p>
      </div>
    </div>
  );
}

function FilterContainer5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Okres</p>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[12px] text-left whitespace-nowrap">
          <p className="leading-[16px]">2 selected</p>
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

function FilterContainer6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Datovanie</p>
      </div>
      <div className="bg-[#a0c3ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[12px] text-left whitespace-nowrap">
          <p className="leading-[16px]">2 selected</p>
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

function FilterContainer7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Druh náleziska</p>
      </div>
    </div>
  );
}

function FilterContainer8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Stupeň lokalizácie</p>
      </div>
    </div>
  );
}

function GeographicFiltersList() {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Geographic filters list">
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer3 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer4 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer5 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-[#cde0ff] relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer6 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer7 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer8 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function GeographicFiltersContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Geographic filters container">
      <GeographicFiltersHeader />
      <GeographicFiltersList />
    </div>
  );
}

function Building() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Building">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Building">
          <path d={svgPaths.p36bddc00} fill="var(--fill-0, #737373)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function InstitutionalFiltersHeader() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Institutional filters header">
      <Building />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Inštitucionálne filtre</p>
      </div>
    </div>
  );
}

function FilterContainer9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Autor VS</p>
      </div>
    </div>
  );
}

function FilterContainer10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Inštitúcia</p>
      </div>
    </div>
  );
}

function FilterContainer11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Vedúci výskumu</p>
      </div>
    </div>
  );
}

function FilterContainer12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Filter container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Rok výskumu</p>
      </div>
    </div>
  );
}

function InstitutionalFiltersList() {
  return (
    <div className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Institutional filters list">
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer9 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer10 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer11 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Filter">
        <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative w-full">
            <FilterContainer12 />
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Caret icon">
              <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.00067 11.0006">
                  <path d={svgPaths.p1f520d80} fill="var(--fill-0, #171717)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function InstitutionalFiltersContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Institutional filters container">
      <InstitutionalFiltersHeader />
      <InstitutionalFiltersList />
    </div>
  );
}

function FilterContainer2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Filter container">
      <GeographicFiltersContainer />
      <InstitutionalFiltersContainer />
    </div>
  );
}

function FilterContainer1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Filter container">
      <FilterContainer2 />
    </div>
  );
}

function FilterContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Filter container">
      <FilterContainer1 />
    </div>
  );
}

function FilterOverlayModal() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[40px] items-start left-0 p-[16px] rounded-[12px] top-[110px] w-[393px]" data-name="Filter overlay modal">
      <FilterContainer />
      <div className="bg-[#1a62ff] cursor-pointer relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative w-full">
            <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-right text-white tracking-[-0.16px] whitespace-nowrap">
              <p className="leading-[24px]">Zobraziť 126 výsledkov</p>
            </div>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/GpsFix">
              <div className="absolute inset-[3.13%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
                  <path d={svgPaths.p2926400} fill="var(--fill-0, white)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FilterOpenMobile() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] size-full" data-name="Filter open mobile">
      <div className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col items-center left-1/2 pl-[8px] pr-[12px] py-[4px] top-[62px] w-[393px]" data-name="Mobile Header">
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
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[393px]" data-name="Status Bar">
        <Statusbar />
      </div>
      <FilterOverlayModal />
    </div>
  );
}