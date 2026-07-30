import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal.jsx';

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
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-12">
          <p className="eyebrow">Who Is the Course For?</p>
          <h2 className="h-display max-w-2xl text-balance">Qualified movement professionals, ready to add Barre.</h2>
          <p className="text-muted">The programme is suitable for:</p>
        </Reveal>

        <Reveal as="ul" stagger={0.05} y={12} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {ITEMS.map((item) => (
            <li key={item} className="card flex items-start gap-3 transition-transform duration-300 hover:-translate-y-0.5">
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </Reveal>

        <p className="text-center text-sm text-muted max-w-xl mx-auto mt-12 pt-8 border-t border-line">
          Applicants will be asked to provide details of their qualifications and relevant movement or teaching experience.
        </p>
      </div>
    </section>
  );
}
