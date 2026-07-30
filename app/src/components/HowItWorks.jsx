import { useEffect, useRef } from 'react';
import { asset } from '../asset.js';
import { gsap, prefersReducedMotion } from '../lib/gsapSetup.js';
import Reveal from './Reveal.jsx';

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
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top 70%', end: 'bottom 55%', scrub: true },
      });

      badgeRefs.current.forEach((badge) => {
        if (!badge) return;
        ScrollTriggerToggle(badge);
      });
    }, wrap);

    function ScrollTriggerToggle(badge) {
      gsap.timeline({ scrollTrigger: { trigger: badge, start: 'top 68%', toggleActions: 'play none none reverse' } })
        .to(badge, { backgroundColor: '#000000', color: '#ffffff', duration: 0.3, ease: 'power2.out' });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-20">
          <p className="eyebrow">How It Works</p>
          <h2 className="h-display max-w-2xl text-balance">From application to certified Founding Instructor.</h2>
        </Reveal>

        <div ref={wrapRef} className="relative max-w-5xl mx-auto">
          <div className="absolute left-10 sm:left-1/2 sm:-translate-x-1/2 top-2 bottom-2 w-px bg-line">
            <div ref={lineRef} className="w-full h-full bg-black" />
          </div>

          <div className="flex flex-col gap-24 sm:gap-32">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.n}
                y={24}
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[1fr_88px_1fr] gap-x-4 sm:gap-x-10 items-start"
              >
                <img
                  src={step.img}
                  alt={step.title}
                  className="hidden sm:block sm:justify-self-end w-[300px] h-[300px] object-cover rounded-2xl"
                />
                <div className="relative z-10 flex sm:justify-center">
                  <div
                    ref={(el) => (badgeRefs.current[i] = el)}
                    className="w-20 h-20 rounded-full bg-[#EDEDED] text-black flex items-center justify-center text-2xl shrink-0"
                  >
                    {Number(step.n)}
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-1">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="sm:hidden w-full aspect-square object-cover rounded-2xl mb-2"
                  />
                  <h3 className="h-display max-w-md">{step.title}</h3>
                  <p className="text-lg text-muted leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
