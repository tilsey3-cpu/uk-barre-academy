const STATS = [
  { n: '6–10', l: 'Participants' },
  { n: '1', l: 'Training Day' },
  { n: '8', l: 'CPD Hours' },
  { n: '40+', l: 'Years Experience' },
];

export default function StatsStrip() {
  return (
    <section className="bg-white border-b border-line">
      <div className="max-w-container mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-line">
        {STATS.map((s) => (
          <div key={s.l} className="px-6 py-10 flex flex-col items-center text-center gap-2">
            <span className="text-3xl sm:text-4xl font-light tracking-tight">{s.n}</span>
            <span className="text-xs uppercase tracking-widest text-muted">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
