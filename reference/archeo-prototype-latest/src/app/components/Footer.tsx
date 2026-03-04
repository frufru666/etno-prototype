export function Footer() {
  return (
    <footer className="bg-[#171717] flex flex-col items-center justify-center py-12 md:py-24 text-white px-4">
      <h2 className="text-[24px] md:text-[44px] font-[600] tracking-[-0.44px] text-center">
        Archeo SAV Explorer
      </h2>
      <p className="text-[16px] md:text-[20px] font-[400] text-white/50 text-center mt-2 font-['Geist_Mono',monospace]">
        (obsah pripravujeme)
      </p>
      <div className="flex items-center gap-6 mt-8 text-[13px] text-white/40">
        <span>Slovenská akadémia vied</span>
        <span className="size-1 rounded-full bg-white/20" />
        <span>Archeologický ústav</span>
      </div>
    </footer>
  );
}
