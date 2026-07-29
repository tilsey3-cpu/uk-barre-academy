import { CheckCircle2 } from 'lucide-react';

const ITEMS = [
  'Ballet technique and alignment',
  'Pilates-based core strength',
  'Functional fitness and conditioning',
  'Light hand-weight training',
  'Barre choreography and cardiovascular flow',
  'Musicality, cueing and class structure',
  'Adaptations for different abilities',
  'Safe and effective teaching practice',
];

export default function Method() {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <p className="eyebrow eyebrow-inverted">A New Standard for Barre Education</p>
          <h2 className="h-display max-w-2xl text-white">How to perform it, and how to teach it.</h2>
          <p className="max-w-2xl text-white/70 leading-relaxed">
            The UK Barre Academy method is designed to help instructors understand not only how to
            perform Barre exercises, but how to teach them safely, effectively and confidently. The
            programme combines:
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl mx-auto">
          {ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-3 text-white/90">
              <CheckCircle2 size={20} className="text-green-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
