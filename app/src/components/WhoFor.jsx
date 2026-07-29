import { CheckCircle2 } from 'lucide-react';

const ITEMS = [
  'Pilates instructors',
  'Yoga teachers',
  'Personal trainers',
  'Group exercise instructors',
  'Dance teachers',
  'Experienced dancers',
  'Qualified fitness professionals looking to add Barre to their teaching portfolio',
];

export default function WhoFor() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-12">
          <p className="eyebrow">Who Is the Course For?</p>
          <h2 className="h-display max-w-2xl">Qualified movement professionals, ready to add Barre.</h2>
          <p className="text-muted">The programme is suitable for:</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl mx-auto">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-muted max-w-xl mx-auto mt-12 pt-8 border-t border-line">
          Applicants will be asked to provide details of their qualifications and relevant movement or teaching experience.
        </p>
      </div>
    </section>
  );
}
