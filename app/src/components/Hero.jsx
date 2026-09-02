import { useEffect, useRef } from 'react';
import { asset } from '../asset.js';
import { gsap, prefersReducedMotion } from '../lib/gsapSetup.js';

export default function Hero({ onOpenDateModal }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || prefersReducedMotion()) return;

    const targets = gsap.utils.toArray(el.children);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex items-end pt-[152px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${asset('assets/founding-1.png')}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

      <div className="relative w-full max-w-container mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20">
        <div ref={bodyRef} className="max-w-xl flex flex-col gap-6 text-white">
          <p className="eyebrow text-white/70">Website coming soon</p>
          <h1 className="h-display text-white text-balance">
            A new standard for Barre education, starting with its instructors.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-white/85">
            UK Barre Academy is opening its doors. While the full site is
            built, register your interest in the Founding Instructor
            Programme 2026 &mdash; trained directly by Maggie Paterson.
          </p>
          <div>
            <button
              type="button"
              onClick={onOpenDateModal}
              className="pill inline-flex items-center px-7 py-4 text-sm bg-white/10 border border-white/60 text-white hover:bg-white hover:text-black transition-colors"
            >
              Become a Founding Instructor &nbsp;&rarr;
            </button>
          </div>
          <p className="text-sm text-white/60 pt-4 border-t border-white/20 mt-2">
            Founded by <span className="text-white">Maggie Paterson</span> &middot; 40+ years in ballet, Pilates and movement education
          </p>
        </div>
      </div>
    </section>
  );
}
