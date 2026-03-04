import svgPaths from "./svg-tbjx8yxo17";
import imgRectangle1461 from "figma:asset/5a87c180c1bd15d72e24a7a2c8967bda377c30c1.png";
import imgScreenshot20260223At1218361 from "figma:asset/2470c313527fc326cca2b9d7c9a8469049335c29.png";

function Frame1() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-[7px] items-center right-[12px] top-[12px]">
      <div className="bg-white content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Info</p>
        </div>
      </div>
      <div className="bg-white content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">User</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[12px] top-[12px]">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1" r="20" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[-0.36px] whitespace-nowrap">
        <p className="leading-[24px]">Archeo Explorer SAV</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#034ae8] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31341</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="SVG">
          <path d={svgPaths.p7fa5b00} id="Vector" stroke="var(--stroke-0, #A3A3A3)" strokeWidth="1.21875" />
          <path d="M1.625 4.875H11.375" id="Vector_2" stroke="var(--stroke-0, #A3A3A3)" strokeWidth="1.21875" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[3px] items-center opacity-0 relative shrink-0" data-name="Container">
      <Svg />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] text-center whitespace-nowrap">
        <p className="leading-[normal]">6</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px pb-[3.5px] pt-[2px] relative" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container1 />
        <Container2 />
        <Container4 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#171717] text-[15px] tracking-[-0.15px]">
        <p className="leading-[20px] whitespace-pre-wrap">Jelšovce</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#737373] text-[13px]">
        <p className="leading-[20px] whitespace-pre-wrap">Nitra</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] whitespace-nowrap">
          <p className="leading-[17px]">Bogmaj Laz, výstavba 26 RD, komunikácia, siete, p.č. 600/13</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div className="content-stretch flex flex-col gap-[5px] items-start p-[12px] relative w-full">
        <Container />
        <Container5 />
        <Container8 />
      </div>
    </div>
  );
}

function TextContent() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Číslo aktivity</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">č.a. 31341</p>
      </div>
    </div>
  );
}

function TextContent1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">ČVS</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">21234</p>
      </div>
    </div>
  );
}

function TextContent2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Rok zaevidovania</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">2024</p>
      </div>
    </div>
  );
}

function TextContent3() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Rok aktivity</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">2024</p>
      </div>
    </div>
  );
}

function TextContent4() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Druh aktivity</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">nálezová správa - interná</p>
      </div>
    </div>
  );
}

function TextContent5() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Katastrálne územie</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">Jelšovce</p>
      </div>
    </div>
  );
}

function TextContent6() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Obec</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">Jelšovce</p>
      </div>
    </div>
  );
}

function TextContent7() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Poloha</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">Bogmaj Laz, výstavba 26 RD, komunikácia, siete, p.č. 600/13</p>
      </div>
    </div>
  );
}

function TextContent8() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Okres</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">Nitra</p>
      </div>
    </div>
  );
}

function TextContent9() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Vedúci výskumu</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">Gabulová M.</p>
      </div>
    </div>
  );
}

function TextContent10() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Autor - NS</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">Gabulová M.</p>
      </div>
    </div>
  );
}

function TextContent11() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Inštitúcia</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">ArÚ SAV</p>
      </div>
    </div>
  );
}

function TextContent12() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Číslo akcie</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">3/2024</p>
      </div>
    </div>
  );
}

function TextContent13() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[14px] w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Stupeň lokalizácie</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Bold',sans-serif] font-bold justify-center min-h-px min-w-px relative text-[16px]">
        <p className="leading-[20px] whitespace-pre-wrap">1</p>
      </div>
    </div>
  );
}

function TextContent14() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Existuje GIS väzba</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">TRUE</p>
      </div>
    </div>
  );
}

function TextContent15() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Malá/veľká NS</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">veľká</p>
      </div>
    </div>
  );
}

function TextContent16() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Súradnica X</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">-1261469,276</p>
      </div>
    </div>
  );
}

function TextContent17() {
  return (
    <div className="content-stretch flex gap-[24px] items-start leading-[0] not-italic relative shrink-0 text-[#130039] text-[14px] w-full" data-name="Text content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 w-[156px]">
        <p className="leading-[20px] whitespace-pre-wrap">Súradnica Y</p>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center min-h-px min-w-px relative">
        <p className="leading-[20px] whitespace-pre-wrap">-501192,4147</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent1 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent2 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent3 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent4 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent5 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent6 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent7 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent8 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent9 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent10 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent11 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent12 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent13 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent14 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-full" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent15 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-[361px]" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent16 />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start justify-center py-[8px] relative shrink-0 w-[361px]" data-name="Row">
        <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
        <TextContent17 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[361px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-black tracking-[-0.44px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Metadata</p>
      </div>
      <Frame3 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-center justify-between leading-[0] not-italic relative shrink-0 w-full whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0 text-[22px] text-black tracking-[-0.44px]">
        <p className="leading-[28px]">Datovanie</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#1a62ff] text-[13px] tracking-[-0.26px]">
        <p className="leading-[28px]">15 období</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-center justify-between leading-[0] not-italic relative shrink-0 text-[17px] text-black tracking-[-0.34px] w-[300px]">
      <div className="flex flex-col justify-center opacity-50 relative shrink-0 w-[85px]">
        <p className="leading-[28px] whitespace-pre-wrap">Obdobie</p>
      </div>
      <div className="flex flex-col justify-center opacity-50 relative shrink-0 whitespace-nowrap">
        <p className="leading-[28px]">Druh náleziska</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Eneolit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Doba bronzová</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Doba halštatská</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Doba laténska</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Doba rímska</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Sťahovanie národov</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Stredovek - včasný</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Stredovek - 13. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Stredovek - 15. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Novovek - 16. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Novovek - 17. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Novovek - 18. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Novovek - 19. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Novovek - 20. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[7px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
            <p className="leading-[15px]">Novovek - 21. storočie</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[401px] items-start justify-center relative shrink-0 w-[175px]">
      <Background />
      <Background1 />
      <Background2 />
      <Background3 />
      <Background4 />
      <Background5 />
      <Background6 />
      <Background7 />
      <Background8 />
      <Background9 />
      <Background10 />
      <Background11 />
      <Background12 />
      <Background13 />
      <Background14 />
    </div>
  );
}

function Background15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko</p>
        </div>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko</p>
        </div>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko</p>
        </div>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko</p>
        </div>
      </div>
    </div>
  );
}

function Background23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko, Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko, Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Background29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[7px] py-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#262626] text-[11px] whitespace-nowrap">
          <p className="leading-[15px]">Pohrebisko, Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[401px] items-start relative shrink-0 w-[175px]">
      <Background15 />
      <Background16 />
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
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-[350px]">
      <Frame10 />
      <div className="bg-[#d9d9d9] h-px shrink-0 w-full" />
      <Frame9 />
      <Frame8 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-center justify-between leading-[0] not-italic relative shrink-0 text-[#3c3c3c] text-[16px] tracking-[-0.32px] w-[302px] whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[28px]">nalezova sprava</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[28px]">51 mb</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#d9d9d9] h-[63px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[26px] py-[17px] relative size-full">
        <Frame18 />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-center justify-between leading-[0] not-italic relative shrink-0 text-[#3c3c3c] text-[16px] tracking-[-0.32px] w-[311px] whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[28px]">vyskumna sprava</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[28px]">{`245mb `}</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#d9d9d9] h-[63px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[17px] relative size-full">
        <Frame16 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
      <Frame19 />
      <Frame17 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[360px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[21px] text-black tracking-[-0.42px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Dokumenty</p>
      </div>
      <Frame20 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex font-['Inter:Semi_Bold',sans-serif] font-semibold items-center justify-between leading-[0] not-italic relative shrink-0 w-[364px] whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0 text-[21px] text-black tracking-[-0.42px]">
        <p className="leading-[28px]">Images (10)</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#1a62ff] text-[16px] tracking-[-0.32px]">
        <p className="leading-[28px]">Open gallery</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pointer-events-none relative shrink-0 w-full">
      <div className="relative shrink-0 size-[126px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px]" />
      </div>
      <div className="relative shrink-0 size-[126px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px]" />
      </div>
      <div className="relative shrink-0 size-[126px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px]" />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0 w-[399px]">
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-[363px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[21px] text-black tracking-[-0.42px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Video (YT Embed)</p>
      </div>
      <div className="aspect-[862/478] relative shrink-0 w-full" data-name="Screenshot 2026-02-23 at 12.18.36 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot20260223At1218361} />
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[38px] items-center left-[1001px] top-[89px] w-[420px]">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <BackgroundBorder />
      <Frame7 />
      <Frame11 />
      <Frame21 />
      <Frame15 />
      <Frame12 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-[#171717] content-stretch flex items-center justify-center left-[685px] p-[8px] top-[595px]">
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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[0px] text-left tracking-[-0.14px] whitespace-nowrap">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] text-[14px]">Nálezisko / Terén (18)</p>
      </div>
    </div>
  );
}

function ImageContainer() {
  return (
    <div className="absolute bg-[#e5e5e5] h-[736px] left-[21px] top-[87px] w-[960px]" data-name="Image container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute h-[518px] left-[231px] top-[105px] w-[549px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1461} />
        </div>
        <Frame6 />
        <div className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center left-[904px] p-[8px] rounded-[8px] top-[307px]" data-name="Button">
          <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Plus">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <path d={svgPaths.pc4f6100} fill="var(--fill-0, #1A62FF)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center left-[904px] p-[8px] rounded-[8px] top-[354px]" data-name="Button">
          <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Minus">
            <div className="absolute inset-[46.88%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 1.5">
                <path d={svgPaths.p185fdf40} fill="var(--fill-0, #1A62FF)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
        <button className="absolute bg-[#1a62ff] content-stretch cursor-pointer flex gap-[8px] items-center left-[896px] p-[8px] rounded-[8px] top-[678px]" data-name="Button">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Info">
            <div className="absolute inset-[9.38%_9.38%_9.37%_9.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
                <path d={svgPaths.p18982200} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
          </div>
        </button>
        <button className="absolute bg-white cursor-pointer h-[40px] left-[701px] rounded-[8px] top-[19px] w-[243px]" data-name="Filter Dropdown">
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
      <div aria-hidden="true" className="absolute border-2 border-[#8f8f8f] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

export default function ImageViewerDesktop() {
  return (
    <div className="bg-white relative size-full" data-name="Image viewer desktop">
      <div className="absolute h-[64px] left-[-2px] top-0 w-[1443px]" data-name="Desktop Nav">
        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none" />
        <div className="absolute bg-white content-stretch cursor-pointer flex gap-[8px] items-center left-[261px] p-[8px] rounded-[8px] top-[12px]" data-name="Button">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/ArrowLeft">
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0006 15.0008">
                <path d={svgPaths.p33185f40} fill="var(--fill-0, #1A62FF)" id="Vector" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
            <p className="leading-[24px]">Späť do Explore</p>
          </div>
        </div>
        <Frame1 />
        <div className="absolute bg-white h-[64px] left-0 top-0 w-[1443px]" />
        <Frame2 />
      </div>
      <Frame22 />
      <div className="absolute border border-[#5e5e5e] border-solid h-[811px] left-[21px] top-[90px] w-[960px]" />
      <ImageContainer />
      <div className="absolute left-[41px] pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px]" />
      </div>
      <div className="absolute left-[97px] opacity-30 pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[153px] opacity-30 pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[209px] opacity-30 pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[265px] opacity-30 pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[321px] opacity-30 pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute left-[377px] opacity-30 pointer-events-none size-[48px] top-[837px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgRectangle1461} />
        <div aria-hidden="true" className="absolute border border-[#b5b5b5] border-solid inset-[-1px]" />
      </div>
      <div className="absolute content-stretch cursor-pointer flex gap-[8px] items-center left-[33px] p-[8px] rounded-[8px] top-[105px]" data-name="Button">
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
    </div>
  );
}