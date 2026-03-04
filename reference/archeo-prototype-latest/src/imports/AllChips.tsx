import svgPaths from "./svg-vm2bu6sgw1";
import imgRectangle1427 from "figma:asset/54f71d81a7524e10d0fb26603540b6e2e29cd99c.png";
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

function Sliders() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Sliders">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Sliders">
          <path d={svgPaths.p1d7f7070} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Sliders />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Filter</p>
      </div>
    </div>
  );
}

function FIlterDropdown() {
  return (
    <div className="absolute bg-[#1a62ff] h-[36px] left-0 rounded-[8px] top-[2px] w-[88px]" data-name="FIlter Dropdown">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[24px] relative size-full">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[8px] items-center left-[calc(50%+24px)] top-[4px]">
      <div className="pointer-events-none relative rounded-[19.2px] shrink-0 size-[32px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[19.2px] size-full" src={imgRectangle1427} />
        <div aria-hidden="true" className="absolute border-[#171717] border-[0.8px] border-solid inset-[-0.8px] rounded-[20px]" />
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[18px] tracking-[-0.36px] whitespace-nowrap">
        <p className="leading-[32px]">Aktivity</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-end p-[4px] relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="List">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-1px_-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 2">
              <path d="M1 1H23" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[15.63%] right-[15.63%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-1px_-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 2">
              <path d="M1 1H23" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[15.63%] right-[15.63%] top-3/4" data-name="Vector">
          <div className="absolute inset-[-1px_-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 2">
              <path d="M1 1H23" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex items-center right-0 top-0">
      <Frame2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[40px] relative shrink-0 w-full">
      <FIlterDropdown />
      <Frame1 />
      <Frame10 />
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

function MapPinLine1() {
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

function Frame() {
  return <div className="absolute h-[108px] left-[62px] top-[248px] w-[255px]" />;
}

function IconContainer() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="Icon Container">
      <div className="bg-[#22c55e] rounded-[999px] shrink-0 size-[12px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px]">{`presná `}</p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Header">
      <p className="font-['Geist_Mono:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#034ae8] text-[14px]">31274</p>
      <IconContainer />
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0 text-[#171717] w-full whitespace-pre-wrap" data-name="Info">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] tracking-[-0.36px] w-full">Krátke Kesy · Marcelová</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[12px] w-full">okres Komárno</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Header />
      <Info />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <div className="bg-[#cde0ff] content-stretch flex h-[24px] items-center justify-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="Typ lokality">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#171717] text-[12px]">Areál kultový</p>
      </div>
      <div className="bg-[#cde0ff] content-stretch flex h-[24px] items-center justify-center px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="Typ lokality">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#171717] text-[12px]">Pohrebisko</p>
      </div>
    </div>
  );
}

function ArcheoCard() {
  return (
    <div className="bg-white mb-[-20px] relative rounded-[12px] shrink-0 w-full" data-name="Archeo Card">
      <div className="content-stretch flex flex-col gap-[14px] items-start p-[12px] relative w-full">
        <Container />
        <Frame6 />
        <div className="bg-[#1a62ff] cursor-pointer relative rounded-[6.4px] shrink-0 w-full" data-name="Button">
          <div className="flex flex-row items-end justify-center size-full">
            <div className="content-stretch flex gap-[6.4px] items-end justify-center p-[6.4px] relative w-full">
              <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e5f0ff] text-[12.8px] text-right tracking-[-0.128px] whitespace-nowrap">
                <p className="leading-[19.2px]">Zobraziť detail</p>
              </div>
              <div className="overflow-clip relative shrink-0 size-[19.2px]" data-name="Property 1=Right">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <g id="Vector" />
                </svg>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12px] left-1/2 top-[calc(50%+0.4px)] w-[6.4px]" data-name="Vector">
                  <div className="absolute inset-[-6.67%_-12.5%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 13.6">
                      <path d={svgPaths.p6e07b00} id="Vector" stroke="var(--stroke-0, #E6F0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[186px] items-center justify-center left-[52px] pb-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[177px] w-[276px]">
      <ArcheoCard />
      <div className="flex items-center justify-center mb-[-20px] relative shrink-0 size-[29.678px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="relative size-[20.985px]">
            <div className="absolute inset-[14.88%_3.7%_3.7%_14.88%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0873 17.0873">
                <path d={svgPaths.p27a02c80} fill="var(--fill-0, white)" id="Rectangle 1443" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Stack">
        <div className="absolute inset-[6.25%_9.33%_6.25%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2594 17.4999">
            <path d={svgPaths.p77c6300} fill="var(--fill-0, #171717)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Ortofoto</p>
      </div>
    </div>
  );
}

function FIlterDropdown1() {
  return (
    <div className="absolute bg-white h-[36px] left-[8px] rounded-[8px] top-[8px] w-[139px]" data-name="FIlter Dropdown">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[24px] relative size-full">
          <Frame4 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none">
              <div className="overflow-clip relative size-[16px]" data-name="CaretUp">
                <div className="absolute inset-[28.12%_15.62%_34.37%_15.62%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0007 6.00079">
                    <path d={svgPaths.p20ad0b80} fill="var(--fill-0, #171717)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapComponentMobile() {
  return (
    <div className="absolute h-[588px] left-0 overflow-clip top-[118px] w-[393px]" data-name="Map component mobile">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMapComponentMobile} />
      <button className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center justify-center left-[349px] p-[8px] rounded-[8px] size-[36px] top-[56px]" data-name="Button 42">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="GpsFix">
          <div className="absolute inset-[3.13%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
              <path d={svgPaths.p2926400} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
      </button>
      <div className="absolute bg-[#12b24d] content-stretch flex flex-col items-center justify-center left-[166px] px-[22.8px] py-[12px] rounded-[28.8px] size-[48px] top-[366px]" data-name="Map pin">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[28.8px]" />
        <MapPin />
      </div>
      <div className="absolute bg-[#ef4444] content-stretch flex flex-col items-center justify-center left-[223px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[450px]" data-name="Map pin">
        <MapPinArea />
      </div>
      <div className="absolute bg-[#f59e0b] content-stretch flex flex-col items-center justify-center left-[74px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[529px]" data-name="Map pin">
        <MapPinLine />
      </div>
      <div className="absolute bg-[#f59e0b] content-stretch flex flex-col items-center justify-center left-[255px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[71px]" data-name="Map pin">
        <MapPinLine1 />
      </div>
      <div className="absolute bg-[rgba(23,23,23,0.6)] content-stretch flex flex-col items-center justify-center left-[330px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[426px]" data-name="Map cluster/Opacity 60">
        <div aria-hidden="true" className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[19.2px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.14px] whitespace-nowrap">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] text-[14px]">8</p>
        </div>
      </div>
      <div className="absolute bg-[rgba(23,23,23,0.6)] content-stretch flex flex-col items-center justify-center left-[74px] px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-[88px]" data-name="Map cluster/Opacity 60">
        <div aria-hidden="true" className="absolute border-[0.8px] border-solid border-white inset-0 pointer-events-none rounded-[19.2px]" />
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.14px] whitespace-nowrap">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[22px] text-[14px]">2</p>
        </div>
      </div>
      <Frame />
      <Frame7 />
      <button className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center justify-center p-[8px] right-[8px] rounded-[8px] size-[36px] top-[8px]" data-name="Button 41">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="QuestionMark">
          <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[15.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 17.25">
              <path d={svgPaths.pcc000} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
      </button>
      <FIlterDropdown1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-center flex flex-wrap gap-[4px_8px] items-center left-[16px] top-[760px] w-[368px]">
      <div className="bg-[#cde0ff] content-stretch flex gap-[4px] h-[24px] items-center px-[8px] py-[4px] relative rounded-[999px] shrink-0" data-name="Filter Chip">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#034ae8] text-[0px] whitespace-nowrap">
          <p className="text-[12px]">
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">{`Mesto: `}</span>
            <span className="leading-[16px]">Bratislava</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Close">
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
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">{`Mesto: `}</span>
            <span className="leading-[16px]">Komárno</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Close">
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
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">{`Mesto: `}</span>
            <span className="leading-[16px]">Bratislava</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Close">
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
            <span className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic">{`Mesto: `}</span>
            <span className="leading-[16px]">Bratislava</span>
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Close">
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

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31276</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container2 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Sľažany</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Dolné Sľažany</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Zlaté Moravce</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">RD, Farská ul., p.č. 30/13</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container5 />
        <Container6 />
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[7px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">negatívne</p>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[19px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap items-start relative size-full">
        <Background />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container1 />
        <Container4 />
        <Margin />
        <Container10 />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31274</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container12 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container13 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Marcelová</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Krátke Kesy</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Komárno</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[4.5px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[17px] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full whitespace-pre-wrap">
            <p className="mb-0">INS FTTH Transport KOMA 03, Nad chotínskou cestou, p.č.</p>
            <p>1877/2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container19 />
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container15 />
        <Container16 />
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#cce1ff] h-full relative rounded-[4px] shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[7px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Eneolit - badenská</p>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[19px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap items-start relative size-full">
        <Background1 />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#cde0ff] relative rounded-[4px] self-stretch shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col h-full items-start px-[7px] py-[2px] relative">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Eneolit - badenská - sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[19px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap items-start relative size-full">
        <Background2 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container11 />
        <Container14 />
        <Margin1 />
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder1 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31386</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container23 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container24 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Modra</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Pezinok</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[23.02px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[17px] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full whitespace-pre-wrap">
            <p className="mb-0">Kaštieľ a park, Horná ul. č. 20, p.č. 373, 5564/2, 5566/1,</p>
            <p>5567, 5568, 5569/1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container29 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container26 />
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#cde0ff] content-stretch flex flex-col h-[19px] items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - neskorý - sídlisko</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#cde0ff] content-stretch flex flex-col h-[19px] items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 16. storočie - areál výrobný</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#cde0ff] content-stretch flex flex-col h-[19px] items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 17. storočie - areál výrobný</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#cde0ff] content-stretch flex flex-col h-[19px] items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 18. storočie - areál výrobný</p>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#cde0ff] content-stretch flex flex-col h-[19px] items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 19. storočie - areál výrobný</p>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#cde0ff] content-stretch flex flex-col h-[19px] items-start px-[7px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 20. storočie - areál výrobný</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start justify-center relative w-full">
        <Background3 />
        <Background4 />
        <Background5 />
        <Background6 />
        <Background7 />
        <Background8 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container22 />
        <Container25 />
        <Margin2 />
        <Container30 />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder2 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31341</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container32 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container33 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Jelšovce</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Nitra</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[38.74px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[17px] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full whitespace-pre-wrap">
            <p className="mb-0">Bogmaj Laz, výstavba 26 RD, komunikácia, siete, p.č.</p>
            <p>600/13</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container38 />
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container35 />
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[92px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Neolit - sídlisko</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[92px] content-stretch flex flex-col items-start left-[99.17px] px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Eneolit - lengyelská - sídlisko</p>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[69px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba bronzová - mladá - sídlisko</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[69px] content-stretch flex flex-col items-start left-[190.93px] px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba rímska - sídlisko</p>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[46px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[46px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 11. storočie - sídlisko</p>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[23px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[69px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 12. storočie - sídlisko</p>
      </div>
    </div>
  );
}

function Background15() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-[23px] content-stretch flex flex-col items-start left-[192.7px] px-[7px] py-[2px] rounded-[4px] top-[69px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Neolit - pohrebisko</p>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="absolute bg-[#cde0ff] bottom-0 content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[92px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Eneolit - lengyelská - pohrebisko</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[111px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background9 />
        <Background10 />
        <Background11 />
        <Background12 />
        <Background13 />
        <Background14 />
        <Background15 />
        <Background16 />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container31 />
        <Container34 />
        <Margin3 />
        <Container39 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder3 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31504</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#ef4444] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">orientačná</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container41 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container42 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Oravský Podzámok</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Dolný Kubín</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">Hrad, Palác hradný II - Korvínov palác, p.č. 1, 2, 4-6</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container47 />
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container44 />
        <Container45 />
        <Container46 />
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[138px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Eneolit</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[138px] content-stretch flex flex-col items-start left-[53.64px] px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba bronzová</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[138px] content-stretch flex flex-col items-start left-[151.32px] px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba halštatská</p>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[115px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba laténska</p>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[115px] content-stretch flex flex-col items-start left-[92.73px] px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba rímska</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[115px] content-stretch flex flex-col items-start left-[176.61px] px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Sťahovanie národov</p>
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[92px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[46px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - včasný</p>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[92px] content-stretch flex flex-col items-start left-[119.88px] px-[7px] py-[2px] rounded-[4px] top-[46px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 13. storočie</p>
      </div>
    </div>
  );
}

function Background25() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[69px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[69px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 15. storočie</p>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[69px] content-stretch flex flex-col items-start left-[141.8px] px-[7px] py-[2px] rounded-[4px] top-[69px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 16. storočie</p>
      </div>
    </div>
  );
}

function Background27() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[46px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[92px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 17. storočie</p>
      </div>
    </div>
  );
}

function Background28() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[46px] content-stretch flex flex-col items-start left-[133.08px] px-[7px] py-[2px] rounded-[4px] top-[92px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 18. storočie</p>
      </div>
    </div>
  );
}

function Background29() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[23px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[115px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 19. storočie</p>
      </div>
    </div>
  );
}

function Background30() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[23px] content-stretch flex flex-col items-start left-[134.81px] px-[7px] py-[2px] rounded-[4px] top-[115px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 20. storočie</p>
      </div>
    </div>
  );
}

function Background31() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-0 content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[138px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Novovek - 21. storočie</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[157px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background17 />
        <Background18 />
        <Background19 />
        <Background20 />
        <Background21 />
        <Background22 />
        <Background23 />
        <Background24 />
        <Background25 />
        <Background26 />
        <Background27 />
        <Background28 />
        <Background29 />
        <Background30 />
        <Background31 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container40 />
        <Container43 />
        <Margin4 />
        <Container48 />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder4 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31473</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container50 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container51 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Bratislava - Staré Mesto</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Staré Mesto</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Bratislava I</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">NKP Vodná veža, Nábr. arm. gen. L. Svobodu 2, p.č. 545/3</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container57 />
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container53 />
        <Container54 />
        <Container55 />
        <Container56 />
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function Background32() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[69px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Pravek</p>
      </div>
    </div>
  );
}

function Background33() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[69px] content-stretch flex flex-col items-start left-[54.06px] px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Doba laténska</p>
      </div>
    </div>
  );
}

function Background34() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[69px] content-stretch flex flex-col items-start left-[146.79px] px-[7px] py-[2px] rounded-[4px] top-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 11. storočie</p>
      </div>
    </div>
  );
}

function Background35() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[46px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 12. storočie</p>
      </div>
    </div>
  );
}

function Background36() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[46px] content-stretch flex flex-col items-start left-[142.23px] px-[7px] py-[2px] rounded-[4px] top-[23px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 13. storočie</p>
      </div>
    </div>
  );
}

function Background37() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[23px] content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[46px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 14. storočie</p>
      </div>
    </div>
  );
}

function Background38() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-[23px] content-stretch flex flex-col items-start left-[142.3px] px-[7px] py-[2px] rounded-[4px] top-[46px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Stredovek - 15. storočie</p>
      </div>
    </div>
  );
}

function Background39() {
  return (
    <div className="absolute bg-[#cce1ff] bottom-0 content-stretch flex flex-col items-start left-0 px-[7px] py-[2px] rounded-[4px] top-[69px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
        <p className="leading-[15px]">Nedatovateľné</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Background32 />
        <Background33 />
        <Background34 />
        <Background35 />
        <Background36 />
        <Background37 />
        <Background38 />
        <Background39 />
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container49 />
        <Container52 />
        <Margin5 />
        <Container58 />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder5 />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31268</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#ef4444] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">orientačná</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container60 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container61 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Svodín</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Nemecký Svodín</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Nové Zámky</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">Busahegy</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container67 />
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container63 />
        <Container64 />
        <Container65 />
        <Container66 />
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="h-[5px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[3px] relative size-full">
        <div className="bg-[#f5f5f5] h-px shrink-0 w-full" data-name="Horizontal Divider" />
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[13px] relative w-full">
        <Container59 />
        <Container62 />
        <Margin6 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Číslo aktivity</p>
      </div>
    </div>
  );
}

function FIlterDropdown2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[157px]" data-name="FIlter Dropdown">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[24px] relative size-full">
          <Frame5 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="overflow-clip relative size-[16px]" data-name="CaretUp">
                <div className="absolute inset-[28.12%_15.62%_34.37%_15.62%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0007 6.00079">
                    <path d={svgPaths.p20ad0b80} fill="var(--fill-0, #171717)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[223px] top-[837px]">
      <FIlterDropdown2 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-[#262626] bottom-0 content-stretch flex h-[646px] items-center justify-center left-0 p-[4px] w-[393px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.16px] whitespace-nowrap">
        <p className="mb-0">Footer</p>
        <p>(Potrebujeme obsah)</p>
      </div>
    </div>
  );
}

export default function AllChips() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] size-full" data-name="All chips">
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[402px]" data-name="Status Bar">
        <Statusbar />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center left-0 px-[12px] py-[8px] top-[62px] w-[393px]" data-name="Header Archeo">
        <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-[0_0_-2px_0] pointer-events-none" />
        <Frame11 />
      </div>
      <div className="-translate-x-1/2 absolute backdrop-blur-[12px] bg-[rgba(250,250,250,0.7)] bottom-[34px] content-stretch flex h-[32px] items-center justify-center left-1/2 px-[18px] py-[9px] rounded-[24px]" data-name="URL Scroll">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px] shadow-[0px_2px_40px_0px_rgba(0,0,0,0.1)]" />
        <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[normal] relative shrink-0 text-[12px] text-black tracking-[0.12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          metafori.com
        </p>
      </div>
      <MapComponentMobile />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[32px] left-[16px] not-italic text-[#0f172b] text-[14px] top-[722px] tracking-[0.0703px]">Aplikované filtre</p>
      <Frame9 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['General_Sans:Semibold',sans-serif] justify-center leading-[0] left-[14px] not-italic text-[20px] text-black top-[855px] tracking-[0.15px] whitespace-nowrap">
        <p className="leading-[20px]">{`30 Aktivít `}</p>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[12px] items-start left-[calc(50%+0.5px)] top-[887px] w-[366px]" data-name="Mobile content block">
        <Frame19 />
        <Frame12 />
        <Frame13 />
        <Frame14 />
        <Frame15 />
        <Frame16 />
        <Frame17 />
      </div>
      <Frame8 />
      <Frame18 />
    </div>
  );
}