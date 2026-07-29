import { asset } from '../asset.js';

const STEPS = [
  {
    n: '01',
    title: 'Register your interest',
    desc: 'Tell us about your teaching background and the dates that work for you. Applicants are asked to share their qualifications and relevant movement experience.',
    img: asset('assets/certification-1.png'),
  },
  {
    n: '02',
    title: 'Train for one intensive day',
    desc: 'Eight modules, eight hours, one complete Barre teaching method — delivered in person by Maggie Paterson at a professional dance studio in London.',
    img: asset('assets/founding-2.png'),
  },
  {
    n: '03',
    title: 'Assess, certify, teach',
    desc: 'Continuous and final teaching assessment, followed by UK Barre Academy certification and recognition as a Founding Instructor.',
    img: asset('assets/manual-1.png'),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <p className="eyebrow">How It Works</p>
          <h2 className="h-display max-w-2xl">From application to certified Founding Instructor.</h2>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28">
          {STEPS.map((step, i) => (
            <div key={step.n} className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className={i % 2 === 1 ? 'sm:order-2' : 'sm:order-1'}>
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />
              </div>
              <div className={`flex flex-col gap-4 ${i % 2 === 1 ? 'sm:order-1' : 'sm:order-2'}`}>
                <span className="text-6xl sm:text-7xl font-light text-line leading-none">{step.n}</span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight">{step.title}</h3>
                <p className="text-muted leading-relaxed max-w-md">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
