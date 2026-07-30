import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { asset } from '../asset.js';

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
      className={`fixed top-9 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-white border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16 h-24 flex items-center justify-between">
        <a href="#" aria-label="UK Barre Academy" className="relative block h-10 w-40 shrink-0">
          <img
            src={asset('assets/UBA-logo-white.png')}
            alt="UK Barre Academy"
            className="absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300"
            style={{ opacity: solid ? 0 : 1 }}
          />
          <img
            src={asset('assets/UBA-logo-black.png')}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300"
            style={{ opacity: solid ? 1 : 0 }}
          />
        </a>

        <a
          href="#register"
          className={`pill hidden sm:inline-flex items-center px-6 py-3 text-sm ${
            solid ? 'bg-black text-white hover:opacity-80' : 'bg-white/95 text-black hover:bg-white'
          }`}
        >
          Register your interest &nbsp;&rarr;
        </a>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Toggle menu"
              className={`sm:hidden ${solid ? 'text-black' : 'text-white'}`}
            >
              <Menu size={24} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 sm:hidden" />
            <Dialog.Content className="fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white p-6 flex flex-col gap-8 sm:hidden focus:outline-none">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-semibold tracking-tight text-base text-black">
                  UK Barre Academy
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button type="button" aria-label="Close menu" className="text-black">
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">
                Register your interest in the Founding Instructor Programme.
              </Dialog.Description>
              <Dialog.Close asChild>
                <a href="#register" className="pill text-center bg-black text-white px-6 py-3 text-sm">
                  Register your interest &nbsp;&rarr;
                </a>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
