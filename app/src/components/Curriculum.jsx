import Reveal from './Reveal.jsx';

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

export default function Curriculum() {
  return (
    <section id="curriculum" className="bg-black text-white py-16 sm:py-20">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <p className="eyebrow eyebrow-inverted">The Curriculum</p>
          <h2 className="h-display max-w-2xl text-white text-balance">8 modules. 8 hours. One complete Barre teaching method.</h2>
          <p className="text-white/70">The course is completed in one intensive training day.</p>
          <p className="text-white/70">Course time: 9:30am&ndash;6:30pm</p>
        </div>

        <p className="text-center text-sm uppercase tracking-widest text-white/50 mb-6">The eight modules include:</p>

        <Reveal as="div" stagger={0.06} y={18} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((title, i) => (
            <div key={title} className="rounded-2xl p-6 border border-white/20 bg-black flex flex-col gap-4">
              <span className="text-sm font-mono text-white/40">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-base leading-snug">{title}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
