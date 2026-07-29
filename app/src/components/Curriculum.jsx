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
    <section className="bg-black text-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <p className="eyebrow eyebrow-inverted">The Curriculum</p>
          <h2 className="h-display max-w-2xl text-white">8 modules. 8 hours. One complete Barre teaching method.</h2>
          <p className="text-white/70">
            The course is completed in one intensive training day. Course Time &middot; 9:30am&ndash;6:30pm
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {MODULES.map((m, i) => (
            <div key={m} className="rounded-2xl p-6 border border-white/20 bg-black flex flex-col gap-4">
              <span className="text-sm font-mono text-white/40">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-base leading-snug">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
