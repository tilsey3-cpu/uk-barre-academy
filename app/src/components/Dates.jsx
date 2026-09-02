import { ArrowRight } from 'lucide-react';
import { DATE_GROUPS } from '../dates.js';
import Reveal from './Reveal.jsx';

export default function Dates() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-4">
          <p className="eyebrow">Dates</p>
          <h2 className="h-display max-w-2xl text-balance">One day of attendance.</h2>
          <p className="text-muted max-w-lg">
            Book the date that works best for you &mdash; places are limited to the founding cohort.
          </p>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.06}
          y={12}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14 max-w-2xl mx-auto"
        >
          {DATE_GROUPS.map((d) => (
            <div key={d.date} className="card flex flex-col items-center text-center gap-2 py-10">
              <p className="text-xl">{d.date}</p>
              <p className="text-muted">{d.time}</p>
              <div className="flex flex-col gap-0.5 pt-2">
                <p className="text-sm font-medium">{d.venue}</p>
                <p className="text-sm text-muted">{d.address}</p>
              </div>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill mt-4 inline-flex items-center gap-1.5 px-6 py-3 text-sm bg-black text-white hover:opacity-85"
              >
                Book this date <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </Reveal>

        <div className="max-w-xl mx-auto text-center mt-14 pt-8 border-t border-line flex flex-col gap-2">
          <p className="text-sm text-muted">Full arrival details will be shared ahead of your session.</p>
        </div>
      </div>
    </section>
  );
}
