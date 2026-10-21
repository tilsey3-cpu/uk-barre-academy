import { useEffect, useRef, useState } from 'react';
import { sx } from '../lib/sx.js';

const STATS = [
  { n: '6–10', l: 'participants per cohort, so everyone gets individual feedback' },
  { n: '1', l: 'intensive training day, in person in London' },
  { n: '8', l: 'CPD hours, independently accredited' },
  { n: '40+', l: 'years of ballet, dance, Pilates and fitness behind the method' },
];
const FINALS = STATS.map((s) => s.n);

const S = {
  section: sx('background: var(--warm); color: var(--paper);'),
  h2: sx('margin: 0 auto; max-width: 820px;'),
  lead: sx('margin: 22px auto 0; max-width: 640px; color: rgba(255,255,255,0.72);'),
  stats: sx('margin: clamp(40px, 7vh, 72px) auto 0; max-width: 1080px;'),
  stat: sx('padding: 24px clamp(12px, 2vw, 28px);'),
  statLabel: sx('margin: 12px auto 0; max-width: 200px; color: rgba(255,255,255,0.72);'),
  ctas: sx('margin-top: clamp(32px, 6vh, 56px); display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;'),
  primary: sx('display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; border-radius: 9999px; background: var(--cream); color: var(--ink); font-size: 14px; font-weight: 500; text-decoration: none;'),
  ghost: sx('display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.4); color: var(--paper); font-size: 14px; font-weight: 500; text-decoration: none;'),
};

// Counts the digits in each stat up from zero the first time the row scrolls into view.
function useCountUp(ref) {
  const [values, setValues] = useState(FINALS);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let armed = false;
    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting && !armed) {
            armed = true;
            setValues(FINALS.map((f) => f.replace(/\d+/g, '0')));
          } else if (en.isIntersecting && armed) {
            io.disconnect();
            let t0 = null;
            const step = (t) => {
              if (t0 === null) t0 = t;
              const k = Math.min(1, (t - t0) / 1600);
              const e = 1 - Math.pow(1 - k, 3);
              setValues(FINALS.map((f) => f.replace(/\d+/g, (d) => String(Math.max(d === '1' ? 1 : 0, Math.round(+d * e))))));
              if (k < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return values;
}

export default function Invitation() {
  const statsRef = useRef(null);
  const values = useCountUp(statsRef);

  return (
    <section id="method" className="panel dk" style={S.section}>
      <div className="w" style={{ textAlign: 'center' }}>
        <h2 className="rv t-h2" style={S.h2}>
          A new standard for Barre education, from day one.
        </h2>
        <p className="rv t-lead" style={S.lead}>
          UK Barre Academy is inviting a small group of qualified movement professionals to its Founding Instructor
          Programme: classical Barre technique combined with intelligent movement, strength, alignment, musicality and
          confident teaching practice.
        </p>
        <div ref={statsRef} className="stats rv" style={S.stats}>
          {STATS.map((s, i) => (
            <div key={s.l} style={S.stat}>
              <div className="t-stat">{values[i]}</div>
              <p className="t-small" style={S.statLabel}>{s.l}</p>
            </div>
          ))}
        </div>
        <div className="rv" style={S.ctas}>
          <a className="btn" href="#dates" style={S.primary}>Become a Founding Instructor →</a>
          <a className="btn ghost" href="#how" style={S.ghost}>How it works</a>
        </div>
      </div>
    </section>
  );
}
