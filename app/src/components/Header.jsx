import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-white border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
        <span
          className={`font-semibold tracking-tight text-base transition-colors duration-300 ${
            solid ? 'text-black' : 'text-white'
          }`}
        >
          UK Barre Academy
        </span>

        <a
          href="#register"
          className={`pill hidden sm:inline-flex items-center px-6 py-3 text-sm ${
            solid ? 'bg-black text-white hover:opacity-80' : 'bg-white/95 text-black hover:bg-white'
          }`}
        >
          Register your interest &nbsp;&rarr;
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={`sm:hidden ${solid ? 'text-black' : 'text-white'}`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-line px-6 py-6">
          <a
            href="#register"
            onClick={() => setMenuOpen(false)}
            className="pill block text-center bg-black text-white px-6 py-3 text-sm"
          >
            Register your interest &nbsp;&rarr;
          </a>
        </div>
      )}
    </header>
  );
}
