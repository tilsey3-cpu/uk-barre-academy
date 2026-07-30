import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsapSetup.js';

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
  const gridWrapRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const wrap = gridWrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top 78%', end: 'bottom 65%', scrub: true },
      });

      gsap.fromTo(
        gsap.utils.toArray(cardsRef.current.children),
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-black text-white py-16 sm:py-20">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <p className="eyebrow eyebrow-inverted">The Curriculum</p>
          <h2 className="h-display max-w-2xl text-white">8 modules. 8 hours. One complete Barre teaching method.</h2>
          <p className="text-white/70">
            The course is completed in one intensive training day. Course time: 9:30am&ndash;6:30pm
          </p>
        </div>

        <div ref={gridWrapRef} className="relative">
          <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-white/15">
            <div ref={lineRef} className="w-full h-full bg-white" />
          </div>
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.map((title, i) => (
              <div key={title} className="rounded-2xl p-6 border border-white/20 bg-black flex flex-col gap-4">
                <span className="text-sm font-mono text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-base leading-snug">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
