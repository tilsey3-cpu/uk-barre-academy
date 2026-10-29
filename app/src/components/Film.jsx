import { useEffect, useRef, useState } from 'react';
import { asset } from '../asset.js';
import { sx } from '../lib/sx.js';
import { NEXT_DATE, PRICE } from '../site.js';
import Picture from './Picture.jsx';
import { Sound } from './Icons.jsx';
import BookLink from './BookLink.jsx';

const S = {
  section: sx('position: relative; background: var(--ink); color: var(--paper); --fs:0.5;--fr:28px;--frd:36px;--tin:0;--hv:1;--ty:24px;--bgo:0'),
  bg: sx('position: absolute; inset: -40px; width: calc(100% + 80px); height: calc(100% + 80px); object-fit: cover; filter: blur(48px) saturate(0.8) brightness(0.32);'),
  grid: sx('position: relative; height: 100%;'),
  h2: sx('margin: 0; font-size: clamp(28px, 2.6vw, 40px); line-height: 1.06; font-weight: 400; letter-spacing: -0.035em; text-wrap: balance;'),
  copy: sx('margin: 18px 0 0; max-width: 360px; color: rgba(255,255,255,0.7);'),
  video: sx('position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;'),
  ctl: sx('position: absolute; left: 0; right: 0; bottom: 0; padding: 14px; display: flex; align-items: center; gap: 10px; background: linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0));'),
  sound: sx('display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 16px 0 12px; border-radius: 9999px; border: 0; background: rgba(255,255,255,0.92); color: var(--ink); font: inherit; font-size: 13px; font-weight: 500; cursor: pointer;'),
  track: sx('flex: 1 1 auto; height: 2px; border-radius: 2px; background: rgba(255,255,255,0.25); overflow: hidden;'),
  prog: sx('display: block; height: 100%; width: 0%; background: var(--paper);'),
  rSmall: sx('margin: 0; color: rgba(255,255,255,0.7);'),
  rDate: sx('margin: 6px 0 0; font-size: 22px; line-height: 1.15; letter-spacing: -0.03em;'),
  rVenue: sx('margin: 6px 0 0; color: rgba(255,255,255,0.7);'),
  rBook: sx('margin-top: 18px; display: inline-flex; align-items: center; min-height: 46px; padding: 0 22px; border-radius: 9999px; background: var(--cream); color: var(--ink); font-size: 14px; font-weight: 500; text-decoration: none;'),
};

const clamp = (x) => Math.max(0, Math.min(1, x));

export default function Film({ filmFullRef, onUpdate }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const progRef = useRef(null);
  const interacted = useRef(false);
  const userMuted = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const film = sectionRef.current;
    const promo = videoRef.current;
    const prog = progRef.current;
    const sync = () => setMuted(promo.muted);
    const onInteract = () => { interacted.current = true; };
    const interactions = ['pointerdown', 'keydown', 'touchstart'];
    interactions.forEach((t) => addEventListener(t, onInteract, { passive: true }));

    promo.muted = true;
    const onTime = () => { if (promo.duration) prog.style.width = (promo.currentTime / promo.duration) * 100 + '%'; };
    promo.addEventListener('timeupdate', onTime);
    promo.addEventListener('volumechange', sync);

    const cleanupBase = () => {
      interactions.forEach((t) => removeEventListener(t, onInteract));
      promo.removeEventListener('timeupdate', onTime);
      promo.removeEventListener('volumechange', sync);
    };

    // Reduced motion: no scroll-linked zoom, no snapping, no autoplay. The film sits at full size.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const st = film.style;
      st.setProperty('--fs', '1');
      st.setProperty('--fr', '20px');
      st.setProperty('--frd', '18px');
      st.setProperty('--tin', '1');
      st.setProperty('--hv', '1');
      st.setProperty('--ty', '0px');
      st.setProperty('--bgo', '1');
      return cleanupBase;
    }

    // Same maths as the reference's inline script: rise in, hold for 30% of the sticky distance, then ease out.
    function fq() {
      const r = film.getBoundingClientRect();
      const vh = innerHeight;
      const hold = Math.max(1, film.offsetHeight - vh);
      const a = clamp((vh - r.top) / vh);
      const o = clamp((-r.top - hold * 0.3) / (hold * 0.7));
      const ei = 1 - Math.pow(1 - a, 3);
      const eo = o * o;
      const sc = 0.5 + 0.5 * ei - 0.42 * eo;
      const tin = clamp((a - 0.5) / 0.35) * (1 - Math.min(1, o * 1.6));
      const hv = Math.max(1 - clamp((a - 0.5) / 0.35), clamp((o - 0.45) / 0.45));
      const st = film.style;
      st.setProperty('--fs', sc.toFixed(4));
      st.setProperty('--fr', Math.round(20 + 12 * (1 - ei) + 12 * eo) + 'px');
      st.setProperty('--frd', Math.round(36 - 18 * ei + 18 * eo) + 'px');
      st.setProperty('--tin', tin.toFixed(3));
      st.setProperty('--hv', hv.toFixed(3));
      st.setProperty('--ty', Math.round(24 * (1 - tin)) + 'px');
      st.setProperty('--bgo', Math.min(1, a * 1.4 * (1 - eo * 0.6)).toFixed(3));
      filmFullRef.current = a >= 0.98 && o < 0.25;

      const inView = a > 0.6 && o < 0.9 && r.bottom > vh * 0.3;
      if (inView && promo.paused) {
        promo.muted = !(interacted.current && !userMuted.current);
        const p = promo.play();
        if (p && p.catch) {
          // Browsers refuse audible autoplay without a prior gesture: fall back to muted.
          p.catch(() => {
            promo.muted = true;
            const p2 = promo.play();
            if (p2 && p2.catch) p2.catch(() => {});
            sync();
          });
        }
        sync();
      }
      if (!inView && !promo.paused) promo.pause();
      onUpdate();
    }

    const onScroll = () => requestAnimationFrame(fq);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', fq);
    fq();

    // If scrolling stops while the film is 60–98% of the way in, finish the zoom.
    let snapT;
    let snapping = false;
    const onSnap = () => {
      clearTimeout(snapT);
      snapT = setTimeout(() => {
        if (snapping) return;
        const r = film.getBoundingClientRect();
        const q = (innerHeight - r.top) / innerHeight;
        if (q > 0.6 && q < 0.985) {
          snapping = true;
          scrollTo({ top: scrollY + r.top + 1, behavior: 'smooth' });
          setTimeout(() => { snapping = false; }, 700);
        }
      }, 140);
    };
    addEventListener('scroll', onSnap, { passive: true });

    return () => {
      cleanupBase();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', fq);
      removeEventListener('scroll', onSnap);
      clearTimeout(snapT);
    };
  }, [filmFullRef, onUpdate]);

  const toggleSound = () => {
    const promo = videoRef.current;
    interacted.current = true;
    promo.muted = !promo.muted;
    userMuted.current = promo.muted;
    if (!promo.muted) {
      const p = promo.play();
      if (p && p.catch) p.catch(() => {});
    }
    setMuted(promo.muted);
  };

  const soundLabel = muted ? 'Tap for sound' : 'Sound off';

  return (
    <section id="film" ref={sectionRef} className="film dk" style={S.section}>
      <div className="film-stick">
        <Picture name="uk-barre-academy-instructor-training-film" alt="" sizes="480px" className="film-bg" style={S.bg} />
        <div className="w wide film-grid" style={S.grid}>
          <div className="film-l">
            <h2 style={S.h2}>UK Barre Academy, in two minutes.</h2>
            <p className="t-body film-copy" style={S.copy}>
              The method, the training day, Maggie Paterson’s 40 years of experience, and our upcoming courses.
            </p>
          </div>
          <div className="film-frame">
            <Picture name="uk-barre-academy-instructor-training-film" alt="" sizes="480px" className="film-fill" />
            <video
              ref={videoRef}
              src={asset('media/uba-promo.mp4')}
              poster={asset('media/uk-barre-academy-instructor-training-film.jpg')}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Promotional film: Maggie Paterson introduces UK Barre Academy"
              onClick={toggleSound}
              style={S.video}
            />
            <div className="film-ctl" style={S.ctl}>
              <button type="button" className="btn" aria-label={soundLabel} onClick={toggleSound} style={S.sound}>
                <Sound />
                {soundLabel}
              </button>
              <span style={S.track}><span ref={progRef} style={S.prog} /></span>
            </div>
          </div>
          <div className="film-r">
            <p className="t-small" style={S.rSmall}>Next cohort</p>
            <p style={S.rDate}>{NEXT_DATE.medium}</p>
            <p className="t-small" style={S.rVenue}>{NEXT_DATE.venue}, {NEXT_DATE.area}</p>
            <BookLink style={S.rBook}>Book · {PRICE.now} →</BookLink>
          </div>
        </div>
      </div>
    </section>
  );
}
