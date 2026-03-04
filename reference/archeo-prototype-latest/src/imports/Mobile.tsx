import svgPaths from "./svg-58rqjk86eq";
import imgMapaHeader from "figma:asset/67afffbbf52d5b38b4c3eec89522328b1e26acd5.png";
import imgContainer from "figma:asset/773e9aeaa4bc8b135d36fc0267dab079aa2cff8d.png";
import imgContainer1 from "figma:asset/3a28314f6074d5c4f7f47306b99185456f73c97f.png";
import imgContainer2 from "figma:asset/d3fda19c92264b79ac4f36850c687362bfd21151.png";

function Container() {
  return (
    <div className="cursor-pointer h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="absolute content-stretch flex gap-[8px] items-center left-0 p-[8px] rounded-[8px] top-0" data-name="Button">
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
      <div className="absolute bg-white content-stretch flex gap-[8px] items-center p-[8px] right-0 rounded-[8px] top-0" data-name="Button">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
          <p className="leading-[24px]">Menu</p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/List">
          <div className="absolute inset-[21.88%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 13.5">
              <path d={svgPaths.p186000} fill="var(--fill-0, #1A62FF)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
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

function Container1() {
  return (
    <div className="absolute h-[220px] left-0 top-0 w-[374px]" data-name="Container">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#12b24d] content-stretch flex flex-col items-center justify-center left-1/2 px-[15.2px] py-[8px] rounded-[19.2px] size-[32px] top-1/2" data-name="Map pin">
        <MapPin />
      </div>
    </div>
  );
}

function Icon() {
  return <div className="h-[32px] shrink-0 w-full" data-name="Icon" />;
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32px] items-start left-[175px] top-[78px] w-[24px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-white h-[24.5px] left-[8px] rounded-[4px] top-[187.5px] w-[165.602px]" data-name="Text">
      <p className="absolute font-['Geist_Mono:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#364153] text-[11px] top-[3.5px]">48.3847° N, 18.1429° E</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-white bottom-[8px] h-[28px] right-[8px] rounded-[8px] w-[93.883px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Fullscreen →</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[68px] items-start right-[8px] top-[8px] w-[32px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Text2() {
  return <div className="bg-[#00c950] rounded-[16777200px] shrink-0 size-[8px]" data-name="Text" />;
}

function Container5() {
  return (
    <div className="h-[16px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] h-full items-center relative">
        <Text2 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">1 – presná lokalizácia</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <p className="font-['Geist_Mono:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1a62ff] text-[14px]">č.a. 31341</p>
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[0.5px] tracking-[0.6145px] uppercase">Dokumenty</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3a382d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p678c080} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 6.75H6" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 9.75H6" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 12.75H6" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#1e2939] text-[13px] top-px tracking-[-0.0762px]">Výskumná správa</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['SFMono-Regular:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[-0.5px]">245 MB · 518 strán</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[168.398px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.805px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[-0.2px] not-italic text-[#034ae8] text-[12px] top-px">Otvoriť PDF</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white h-[62px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Container9 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3a382d00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p678c080} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 6.75H6" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 9.75H6" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 12.75H6" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#1e2939] text-[13px] top-px tracking-[-0.0762px]">Nálezová správa</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['SFMono-Regular:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[-0.5px]">51 MB</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[36px] relative shrink-0 w-[147px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-center relative size-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[83.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[31.56px] not-italic text-[#034ae8] text-[12px] top-[0.5px]">Vyžiadať</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[10px] w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[13px] py-px relative size-full">
          <Container15 />
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[132px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container14 />
    </div>
  );
}

function Container20() {
  return (
    <div className="font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16.5px] leading-[16.5px] not-italic relative shrink-0 text-[11px] tracking-[0.6145px] uppercase w-full" data-name="Container">
      <p className="absolute left-0 text-[#6a7282] top-[0.5px]">Obrázky (10)</p>
      <p className="absolute right-[108px] text-[#034ae8] top-[0.5px] translate-x-full">OTVORIŤ GALERIU</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 size-[81px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgContainer} />
    </div>
  );
}

function Container23() {
  return (
    <div className="pointer-events-none relative shrink-0 size-[81px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgContainer1} />
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
    </div>
  );
}

function Container24() {
  return (
    <div className="pointer-events-none relative shrink-0 size-[81px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgContainer2} />
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
    </div>
  );
}

function Container25() {
  return (
    <div className="pointer-events-none relative shrink-0 size-[81px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgContainer2} />
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[12px] h-[81px] items-start relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[0.5px] tracking-[0.6145px] uppercase">Video (YT EMBED)</p>
    </div>
  );
}

function Container28() {
  return <div className="absolute h-[192.375px] left-0 top-0 w-[342px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgb(49, 65, 88) 0%, rgb(29, 41, 61) 50%, rgb(15, 23, 43) 100%)" }} />;
}

function Container31() {
  return (
    <div className="h-[6px] relative shrink-0 w-[5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-b-3 border-l-5 border-solid border-t-3 border-white inset-0 pointer-events-none" />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[16777200px] shrink-0 size-[20px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[2px] relative size-full">
        <Container31 />
      </div>
    </div>
  );
}

function Container33() {
  return <div className="bg-[#fb2c36] h-[4px] rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container32() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] flex-[1_0_0] h-[4px] min-h-px min-w-px relative rounded-[16777200px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[222px] relative size-full">
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['SFMono-Regular:Regular',sans-serif] leading-[15px] left-0 not-italic text-[10px] text-[rgba(255,255,255,0.6)] top-[-0.5px]">0:00 / 3:16</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[20px] items-center left-[8px] top-[164.38px] w-[326px]" data-name="Container">
      <Container30 />
      <Container32 />
      <Text5 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[10px] relative shrink-0 w-[8px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-b-5 border-l-8 border-solid border-t-5 border-white inset-0 pointer-events-none" />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute bg-[#e7000b] content-stretch flex h-[36px] items-center justify-center left-[147px] pl-[2px] rounded-[10px] top-[78.19px] w-[48px]" data-name="Container">
      <Container35 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#101828] h-[192.375px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[0.5px] tracking-[0.6145px] uppercase">Datovanie a Druh náleziska</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Eneolit</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text7 />
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text6 />
        <Container39 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Doba bronzová</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text9 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text8 />
        <Container41 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Doba halštatská</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text11 />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text10 />
        <Container43 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Doba laténska</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text13 />
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text12 />
        <Container45 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Doba rímska</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#ffe2e2] content-stretch flex items-center justify-center left-0 px-[8px] py-[3px] rounded-[4px] top-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#c10007] text-[11px] tracking-[0.0645px]">Pohrebisko</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text15 />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text14 />
        <Container47 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Sťahovanie národov</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#ffe2e2] content-stretch flex items-center justify-center left-0 px-[8px] py-[3px] rounded-[4px] top-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#c10007] text-[11px] tracking-[0.0645px]">Pohrebisko</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text17 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text16 />
        <Container49 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Stredovek – slovanský</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#ffe2e2] content-stretch flex items-center justify-center left-0 px-[8px] py-[3px] rounded-[4px] top-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#c10007] text-[11px] tracking-[0.0645px]">Pohrebisko</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text19 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text18 />
        <Container51 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Stredovek – 13. storočie</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[#ffe2e2] content-stretch flex items-center justify-center left-0 px-[8px] py-[3px] rounded-[4px] top-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#c10007] text-[11px] tracking-[0.0645px]">Pohrebisko</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text21 />
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text20 />
        <Container53 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Stredovek – 15. storočie</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text23 />
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text22 />
        <Container55 />
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Novovek – 16. storočie</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text25 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text24 />
        <Container57 />
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Novovek – 17. storočie</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-[#dcfce7] h-[24.5px] left-0 rounded-[4px] top-0 w-[57.633px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#016630] text-[11px] top-[4.5px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text27 />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text26 />
        <Container59 />
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Novovek – 18. storočie</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex items-center justify-center left-0 px-[8px] py-[3px] rounded-[4px] top-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#016630] text-[11px] tracking-[0.0645px]">Sídlisko</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="col-2 h-[24.5px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Text29 />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text28 />
        <Container61 />
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Novovek – 19. storočie</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="bg-[#f3f4f6] col-2 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[3px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#4a5565] text-[11px] tracking-[0.0645px]">Pohrebisko, Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text30 />
        <Text31 />
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Novovek – 20. storočie</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="bg-[#f3f4f6] col-2 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[3px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#4a5565] text-[11px] tracking-[0.0645px]">Pohrebisko, Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text32 />
        <Text33 />
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="bg-[#e5f0ff] col-1 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[10px] not-italic text-[#1a62ff] text-[12px] top-[7px]">Novovek – 21. storočie</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="bg-[#f3f4f6] col-2 justify-self-stretch relative rounded-[4px] row-1 self-stretch shrink-0" data-name="Text">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[8px] py-[3px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] not-italic relative shrink-0 text-[#4a5565] text-[11px] tracking-[0.0645px]">Pohrebisko, Sídlisko</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] relative size-full">
        <Text34 />
        <Text35 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[532px] items-start relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Container40 />
      <Container42 />
      <Container44 />
      <Container46 />
      <Container48 />
      <Container50 />
      <Container52 />
      <Container54 />
      <Container56 />
      <Container58 />
      <Container60 />
      <Container62 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic text-[#262626] text-[14px] top-[9px] tracking-[0.55px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Údaje</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic text-[#404040] text-[12px] top-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Identifikačné údaje</p>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[17.328px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Číslo aktivity</p>
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="flex-[1_0_0] h-[17.328px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#171717] text-[13px] top-[-0.5px] tracking-[-0.0762px]">č.a. 31341</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[34.328px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text36 />
        <Text37 />
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[17.328px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">ČVS</p>
        </div>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="flex-[1_0_0] h-[17.328px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-[-0.5px] tracking-[-0.0762px]">21234</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[34.328px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text38 />
        <Text39 />
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Rok zaevidovania</p>
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">2024</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text40 />
        <Text41 />
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Rok aktivity</p>
        </div>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">2024</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text42 />
        <Text43 />
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Druh aktivity</p>
        </div>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">nálezová správa - interná</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text44 />
        <Text45 />
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Číslo akcie</p>
        </div>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">3/2024</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[35.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[8px] relative size-full">
        <Text46 />
        <Text47 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col h-[213.656px] items-start relative shrink-0 w-full" data-name="Container">
      <Container70 />
      <Container71 />
      <Container72 />
      <Container73 />
      <Container74 />
      <Container75 />
    </div>
  );
}

function Container67() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container68 />
        <Container69 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic text-[#404040] text-[12px] top-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Geografické údaje</p>
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Katastrálne územie</p>
        </div>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">Jelšovce</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text48 />
        <Text49 />
      </div>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Obec</p>
        </div>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">Jelšovce</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text50 />
        <Text51 />
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[39px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Poloha</p>
        </div>
      </div>
    </div>
  );
}

function Text53() {
  return (
    <div className="flex-[1_0_0] h-[39px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#1e2939] text-[13px] top-px tracking-[-0.0762px] w-[192px] whitespace-pre-wrap">Bogmaj Laz, výstavba 26 RD, komunikácia, siete, p.č. 600/13</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text52 />
        <Text53 />
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Okres</p>
        </div>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">Nitra</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[35.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[8px] relative size-full">
        <Text54 />
        <Text55 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col h-[164.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container79 />
      <Container80 />
      <Container81 />
      <Container82 />
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[185.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container77 />
        <Container78 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic text-[#404040] text-[12px] top-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Personálne údaje</p>
      </div>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Vedúci výskumu</p>
        </div>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">Gabulová M.</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text56 />
        <Text57 />
      </div>
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Autor – NS</p>
        </div>
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">Gabulová M.</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text58 />
        <Text59 />
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Inštitúcia</p>
        </div>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">ArÚ SAV</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[35.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[8px] relative size-full">
        <Text60 />
        <Text61 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col h-[108.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container86 />
      <Container87 />
      <Container88 />
    </div>
  );
}

function Container83() {
  return (
    <div className="h-[129.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container84 />
        <Container85 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic text-[#404040] text-[12px] top-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Lokalizácia</p>
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Stupeň lokalizácie</p>
        </div>
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">1</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text62 />
        <Text63 />
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Existuje GIS väzba</p>
        </div>
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">TRUE</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text64 />
        <Text65 />
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[17.328px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Súradnica X</p>
        </div>
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="flex-[1_0_0] h-[17.328px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#171717] text-[13px] top-[-0.5px] tracking-[-0.0762px]">-1261469,276</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[34.328px] relative shrink-0 w-[342px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px pt-[8px] relative size-full">
        <Text66 />
        <Text67 />
      </div>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[17.328px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Súradnica Y</p>
        </div>
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="flex-[1_0_0] h-[17.328px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#171717] text-[13px] top-[-0.5px] tracking-[-0.0762px]">-501192,4147</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[33.328px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[8px] relative size-full">
        <Text68 />
        <Text69 />
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col h-[140.656px] items-start relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Container93 />
      <Container94 />
      <Container95 />
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[161.656px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container90 />
        <Container91 />
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-0 not-italic text-[#404040] text-[12px] top-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">Formálne údaje</p>
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[140px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#737373] text-[14px] top-[9.5px] whitespace-nowrap">
          <p className="leading-[normal]">Malá/veľká NS</p>
        </div>
      </div>
    </div>
  );
}

function Text71() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#034ae8] text-[13px] top-px tracking-[-0.0762px]">veľká</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[8px] relative size-full">
        <Text70 />
        <Text71 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col h-[35.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container99 />
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[56.5px] relative shrink-0 w-[342px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start relative size-full">
        <Container97 />
        <Container98 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[831.813px] items-start relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Container76 />
      <Container83 />
      <Container89 />
      <Container96 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[49px] w-[393px]">
      <div className="h-[220px] overflow-clip relative shrink-0 w-full" data-name="Mapa header">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMapaHeader} />
        <Container1 />
        <Container2 />
        <Text />
        <Text1 />
        <Container3 />
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Hlavicka">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Container4 />
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] not-italic relative shrink-0 text-[#101828] text-[18px] tracking-[-0.4395px]">Jelšovce • Horný Val</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[19.25px] not-italic relative shrink-0 text-[#6a7282] text-[14px] tracking-[-0.1504px]">okres Nitra</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px]">Bogmaj Laz, výstavba 26 RD, komunikácia, siete, p.č. 600/13</p>
        </div>
      </div>
      <div className="content-stretch cursor-pointer flex gap-[12px] items-center px-[16px] relative shrink-0 w-[393px]" data-name="Buttons Block">
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
          <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative w-full">
              <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
                <p className="leading-[24px]">Kopírovať GPS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
          <div aria-hidden="true" className="absolute border-2 border-[#1a62ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center p-[8px] relative w-full">
              <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a62ff] text-[16px] text-right tracking-[-0.16px] whitespace-nowrap">
                <p className="leading-[24px]">Otvoriť v Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Dokumenty">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Container6 />
          <Container7 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Carousel">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Container20 />
          <Container21 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Video">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Container26 />
          <Container27 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-full" data-name="Datovanie">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Container36 />
          <Container37 />
        </div>
      </div>
      <div className="bg-white h-[856.313px] relative shrink-0 w-full" data-name="Metadata Categories">
        <div className="content-stretch flex flex-col gap-[8px] items-start px-[16px] relative size-full">
          <Container65 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

export default function Mobile() {
  return (
    <div className="bg-white relative size-full" data-name="Mobile">
      <div className="absolute bg-white content-stretch flex flex-col items-center left-0 pl-[8px] pr-[12px] py-[4px] top-0 w-[393px]" data-name="Mobile Header">
        <div aria-hidden="true" className="absolute border-[#a3a3a3] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
        <Container />
      </div>
      <Frame />
    </div>
  );
}