import svgPaths from "./svg-d9s2lh4m0e";

function Container() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center left-0 p-[8px] rounded-[8px] top-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/ArrowLeft">
          <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0006 15.0008">
              <path d={svgPaths.p33185f40} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[48px] not-italic text-[#171717] text-[18px] top-1/2 tracking-[-0.36px] whitespace-nowrap">
        <p className="leading-[24px]">Duration</p>
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

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container4 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container6 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container8 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container9 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container10 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container11 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container12 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container14 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container15 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container16 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container17 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container18 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container19 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container20 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container21 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container22 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium gap-[4px] items-start justify-end min-h-px min-w-px not-italic relative text-[14px] tracking-[-0.14px]" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px relative text-[#171717] text-left">
        <p className="leading-[24px] whitespace-pre-wrap">Placeholder</p>
      </div>
      <p className="leading-[24px] relative shrink-0 text-[#1a62ff] text-right w-[39px] whitespace-pre-wrap">2536</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex gap-[4px] items-start pl-[4px] pr-[8px] py-[8px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p39610df2} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
        <Container23 />
      </div>
    </div>
  );
}

function FilterListItemContainer() {
  return (
    <div className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-[578px] items-start min-h-px min-w-px relative" data-name="Filter list item container">
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame1 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame2 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame3 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame4 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame5 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame6 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame7 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame8 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame9 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame10 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame11 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame12 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame13 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame14 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame15 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame16 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame17 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame18 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame19 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame20 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame21 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame22 />
      </button>
      <button className="content-stretch flex items-start relative shrink-0 w-full" data-name="List Check">
        <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
        <Frame23 />
      </button>
    </div>
  );
}

function FilterListContainer() {
  return (
    <div className="absolute bg-white content-stretch flex items-center left-[8px] overflow-x-clip overflow-y-auto px-[3px] top-[179px] w-[377px]" data-name="Filter list container">
      <FilterListItemContainer />
    </div>
  );
}

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
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        <p className="leading-[24px]">Placeholder</p>
      </div>
    </div>
  );
}

export default function FilterListOpenScrollPrototype() {
  return (
    <div className="bg-white overflow-clip relative rounded-[16px] size-full" data-name="Filter list open (scroll prototype)">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[393px]" data-name="Search bar" />
      <div className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col items-center left-1/2 pl-[8px] pr-[12px] py-[4px] top-[62px] w-[393px]" data-name="Mobile Header">
        <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
        <Container />
      </div>
      <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-0 pb-[12px] pt-[14px] top-0 w-[393px]" data-name="Status Bar">
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
      <FilterListContainer />
      <div className="absolute bg-[#1a62ff] h-[148px] right-[2px] rounded-[4px] top-[300px] w-[5px]" data-name="Divider" />
      <div className="-translate-x-1/2 absolute bg-white content-stretch flex h-[40px] items-center justify-between left-1/2 px-[12px] py-[8px] rounded-[8px] top-[126px] w-[377px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#d4d4d4] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <Frame />
        <div className="opacity-0 overflow-clip relative shrink-0 size-[16px]" data-name="Icon/X">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #171717)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}