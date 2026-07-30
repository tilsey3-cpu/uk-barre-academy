const ITEM = 'Website coming soon';
const ROW = Array.from({ length: 8 }, () => ITEM).join('  •  ');

export default function MarqueeBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-black overflow-hidden flex items-center">
      <div className="marquee-track flex whitespace-nowrap">
        <span className="marquee-row text-white text-xs uppercase tracking-widest font-medium px-4">
          {ROW}
        </span>
        <span className="marquee-row text-white text-xs uppercase tracking-widest font-medium px-4" aria-hidden="true">
          {ROW}
        </span>
      </div>
    </div>
  );
}
