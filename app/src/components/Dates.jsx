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
            Please select every date you could attend. The final course date or dates will be
            confirmed according to demand.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-14 max-w-xl mx-auto">
          {DATE_GROUPS.map((group) => (
            <div key={group.month}>
              <p className="text-xs uppercase tracking-widest text-muted border-b border-line pb-3 mb-4 text-center">
                {group.month}
              </p>
              <div className="flex flex-col gap-3">
                {group.dates.map((date) => (
                  <div
                    key={date}
                    className="pill w-full text-center px-5 py-3 text-sm border bg-white text-black border-line"
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto text-center mt-14 pt-8 border-t border-line flex flex-col gap-2">
          <p className="text-sm text-muted">
            All courses run from 9:30am until 6:30pm at a professional dance studio in London.
          </p>
          <p className="text-sm text-muted">The confirmed venue will be provided before payment is requested.</p>
        </div>
      </div>
    </section>
  );
}
