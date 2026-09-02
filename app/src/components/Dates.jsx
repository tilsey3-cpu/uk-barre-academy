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
            </div>
          ))}
        </Reveal>

        <div className="max-w-xl mx-auto text-center mt-14 pt-8 border-t border-line flex flex-col gap-2">
          <p className="text-sm text-muted">All courses take place at a professional dance studio in London.</p>
          <p className="text-sm text-muted">The confirmed venue will be provided before payment is requested.</p>
        </div>
      </div>
    </section>
  );
}
