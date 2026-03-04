function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31276</p>
      </div>
    </div>
  );
}

function Container2() {
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
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Sľažany</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Dolné Sľažany</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Zlaté Moravce</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">RD, Farská ul., p.č. 30/13</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container4 />
        <Container5 />
        <Container6 />
        <Container7 />
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

function Container9() {
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
        <Container />
        <Container3 />
        <Margin />
        <Container9 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31274</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container11 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container12 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Marcelová</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Krátke Kesy</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Komárno</p>
      </div>
    </div>
  );
}

function Container18() {
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

function Container17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container14 />
        <Container15 />
        <Container16 />
        <Container17 />
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

function Container19() {
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

function Container20() {
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
        <Container10 />
        <Container13 />
        <Margin1 />
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder1 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31386</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container22 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container23 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Modra</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Pezinok</p>
      </div>
    </div>
  );
}

function Container28() {
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

function Container27() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container28 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container25 />
        <Container26 />
        <Container27 />
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

function Container29() {
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
        <Container21 />
        <Container24 />
        <Margin2 />
        <Container29 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31341</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container31 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container32 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Jelšovce</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Nitra</p>
      </div>
    </div>
  );
}

function Container37() {
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

function Container36() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container37 />
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container34 />
        <Container35 />
        <Container36 />
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

function Container38() {
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
        <Container30 />
        <Container33 />
        <Margin3 />
        <Container38 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder3 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31504</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#ef4444] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">orientačná</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container40 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container41 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Oravský Podzámok</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Dolný Kubín</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">Hrad, Palác hradný II - Korvínov palác, p.č. 1, 2, 4-6</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container46 />
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container43 />
        <Container44 />
        <Container45 />
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

function Container47() {
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
        <Container39 />
        <Container42 />
        <Margin4 />
        <Container47 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder4 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31473</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#22c55e] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">presná</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container49 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container50 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Bratislava - Staré Mesto</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Staré Mesto</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Bratislava I</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">NKP Vodná veža, Nábr. arm. gen. L. Svobodu 2, p.č. 545/3</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container56 />
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container52 />
        <Container53 />
        <Container54 />
        <Container55 />
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

function Container57() {
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
        <Container48 />
        <Container51 />
        <Margin5 />
        <Container57 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder5 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a62ff] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">31268</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#ef4444] rounded-[3.5px] shrink-0 size-[7px]" data-name="Emphasis" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#737373] text-[11px] whitespace-nowrap">
        <p className="leading-[normal]">orientačná</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <Container59 />
        <div className="flex-[1_0_0] h-[0.01px] min-h-px min-w-px" data-name="Rectangle" />
        <Container60 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#171717] text-[15px] tracking-[-0.15px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Svodín</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#525252] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Nemecký Svodín</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[13px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Nové Zámky</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] w-full">
        <p className="leading-[17px] whitespace-pre-wrap">Busahegy</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container66 />
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative w-full">
        <Container62 />
        <Container63 />
        <Container64 />
        <Container65 />
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
        <Container58 />
        <Container61 />
        <Margin6 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <BackgroundBorder6 />
    </div>
  );
}

export default function MobileContentBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="Mobile content block">
      <Frame6 />
      <Frame />
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}