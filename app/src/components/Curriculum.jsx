const MODULES = [
  'Foundations, Warm-Up and Alignment',
  'Pilates Core Foundation',
  'Feet, Ankles, Knees and Hips',
  'Classical Barre Technique',
  'Barre Flow, Choreography and Cardiovascular Conditioning',
  'Upper Body Strength and Arm Definition',
  'Leg Strength and Barre Conditioning',
  'Barre Stretch, Mobility and Recovery',
];

function BarreMark() {
  return (
    <svg viewBox="0 0 120 40" className="w-16 h-auto text-white/25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="14" y1="20" x2="106" y2="20" />
      <circle cx="14" cy="20" r="6" />
      <circle cx="106" cy="20" r="6" />
    </svg>
  );
}

function ModuleCard({ n }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 h-36 sm:h-40 p-6 flex flex-col justify-between">
      <span className="font-mono text-4xl sm:text-5xl font-light text-white/25 leading-none">{n}</span>
      <BarreMark />
    </div>
  );
}

function ModuleBadge({ n }) {
  return (
    <div className="w-11 h-11 rounded-full bg-black border-2 border-white/40 flex items-center justify-center font-mono text-xs text-white shrink-0">
      {n}
    </div>
  );
}

export default function Curriculum() {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <p className="eyebrow eyebrow-inverted">The Curriculum</p>
          <h2 className="h-display max-w-2xl text-white">8 modules. 8 hours. One complete Barre teaching method.</h2>
          <p className="text-white/70">
            The course is completed in one intensive training day. Course time: 9:30am&ndash;6:30pm
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto mt-16">
          <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/15" />
          <div className="sm:hidden absolute left-5 top-0 bottom-0 w-px bg-white/15" />

          <div className="flex flex-col gap-10 sm:gap-6">
            {MODULES.map((title, i) => {
              const n = String(i + 1).padStart(2, '0');
              const cardLeft = i % 2 === 0;
              return (
                <div key={n} className="relative">
                  {/* mobile layout */}
                  <div className="sm:hidden flex gap-5 pl-0">
                    <div className="relative z-10"><ModuleBadge n={n} /></div>
                    <div className="flex-1 flex flex-col gap-3">
                      <ModuleCard n={n} />
                      <h3 className="text-lg font-light leading-snug">{title}</h3>
                    </div>
                  </div>

                  {/* desktop layout */}
                  <div className="hidden sm:grid grid-cols-[1fr_56px_1fr] items-center gap-6">
                    <div className={cardLeft ? '' : 'text-right'}>
                      {cardLeft ? <ModuleCard n={n} /> : <h3 className="text-xl font-light leading-snug">{title}</h3>}
                    </div>
                    <div className="flex justify-center relative z-10"><ModuleBadge n={n} /></div>
                    <div>
                      {cardLeft ? <h3 className="text-xl font-light leading-snug">{title}</h3> : <ModuleCard n={n} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
