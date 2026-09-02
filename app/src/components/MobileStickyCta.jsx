export default function MobileStickyCta({ onOpenDateModal }) {
  return (
    <div
      className="sm:hidden fixed bottom-0 inset-x-0 z-[65] bg-white/95 backdrop-blur border-t border-line px-4 pt-3"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <button
        type="button"
        onClick={onOpenDateModal}
        className="pill w-full flex items-center justify-center bg-black text-white px-6 py-3.5 text-sm"
      >
        Become a Founding Instructor &nbsp;&rarr;
      </button>
    </div>
  );
}
