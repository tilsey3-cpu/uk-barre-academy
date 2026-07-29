import { asset } from '../asset.js';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end sm:items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${asset('assets/founding-1.png')}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/55" />

      <div className="relative max-w-container mx-auto px-6 pt-40 pb-20 sm:py-40">
        <div className="max-w-xl flex flex-col gap-6 text-white">
          <p className="eyebrow text-white/70">Website coming soon</p>
          <h1 className="h-display text-white">
            A new standard for Barre education, starting with its instructors.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-white/85">
            UK Barre Academy is opening its doors. While the full site is
            built, register your interest in the Founding Instructor
            Programme 2026 &mdash; trained directly by Maggie Paterson.
          </p>
          <div>
            <a
              href="#register"
              className="pill inline-flex items-center px-7 py-4 text-sm bg-white/10 border border-white/60 text-white hover:bg-white hover:text-black"
            >
              Register your interest &nbsp;&rarr;
            </a>
          </div>
          <p className="text-sm text-white/60 pt-4 border-t border-white/20 mt-2">
            Founded by <span className="text-white">Maggie Paterson</span> &middot; 40+ years in ballet, Pilates and movement education
          </p>
        </div>
      </div>
    </section>
  );
}
