import { asset } from '../asset.js';
import Reveal from './Reveal.jsx';

const STATS = [
  { n: '40+', l: 'Years Teaching' },
  { n: '8', l: 'Method Modules' },
  { n: '01', l: 'Founding Cohort' },
];

export default function Founder() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        <Reveal as="p" className="eyebrow text-center mb-14">Trained Directly By</Reveal>
        <Reveal y={28} className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-center">
          <img
            src={asset('assets/maggie-paterson.png')}
            alt="Maggie Paterson"
            className="w-full aspect-[3/4] object-cover rounded-2xl"
          />
          <div className="flex flex-col gap-5">
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight">Maggie Paterson</h3>
            <p className="text-muted leading-relaxed">
              Founder of UK Barre Academy. More than 40 years of experience across ballet, dance,
              Pilates, yoga and fitness inform every module of the method &mdash; from alignment and
              core strength through to musicality and confident class delivery.
            </p>
            <div className="flex gap-10 pt-2">
              {STATS.map((s) => (
                <div key={s.l} className="flex flex-col gap-1">
                  <span className="text-2xl font-light">{s.n}</span>
                  <span className="text-xs uppercase tracking-widest text-muted">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
