import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsapSetup.js';

export default function Reveal({ children, className = '', y = 22, delay = 0, stagger = 0, as = 'div' }) {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const targets = stagger ? gsap.utils.toArray(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
