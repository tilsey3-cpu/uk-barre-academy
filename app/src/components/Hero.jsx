import { useEffect, useRef } from 'react';
import { asset } from '../asset.js';
import { sx } from '../lib/sx.js';
import { NEXT_DATE, NEXT_YEAR, PRICE, SOLD_OUT, TYPEFORM_URL, external } from '../site.js';
import Picture from './Picture.jsx';
import BookLink from './BookLink.jsx';

const S = {
  section: sx('background: var(--warm); color: var(--paper);'),
  shade1: sx('position: absolute; inset: 0; background: rgba(16,13,10,0.28);'),
  shade2: sx('position: absolute; inset: 0; background: linear-gradient(180deg, rgba(16,13,10,0.62) 0%, rgba(16,13,10,0.12) 28%, rgba(16,13,10,0.14) 52%, rgba(16,13,10,0.78) 100%);'),
  shade3: sx('position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 18% 85%, rgba(20,16,12,0.35) 0%, rgba(20,16,12,0) 100%);'),
  main: sx('position: relative; z-index: 2;'),
  h1: sx('margin: 0; max-width: 900px;'),
  lead: sx('margin: 18px 0 0; max-width: 460px; color: rgba(255,255,255,0.9); animation-delay: .65s;'),
  card: sx('display: block; text-decoration: none; color: var(--paper); padding: 20px; border-radius: 18px; background: var(--warm); border: 1px solid rgba(255,255,255,0.14);'),
  cardTop: sx('display: flex; justify-content: space-between; align-items: center; gap: 10px;'),
  cardLabel: sx('color: rgba(255,255,255,0.75);'),
  badge: sx('display: inline-flex; align-items: center; gap: 7px; padding: 5px 11px; border-radius: 9999px; background: var(--cream); color: var(--ink); font-size: 13px; line-height: 18px; font-weight: 500;'),
  dot: sx('width: 6px; height: 6px; border-radius: 9999px; background: var(--success);'),
  date: sx('display: block; margin-top: 12px; font-size: clamp(22px, 1.9vw, 27px); line-height: 1.1; letter-spacing: -0.03em;'),
  meta: sx('display: block; margin-top: 6px; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.8);'),
  was: sx('color: rgba(255,255,255,0.5);'),
  now: sx('font-weight: 600; color: var(--paper);'),
  cta: sx('display: flex; justify-content: center; align-items: center; margin-top: 16px; min-height: 44px; border-radius: 9999px; background: var(--paper); color: var(--ink); font-size: 14px; font-weight: 500;'),
  next: sx('margin-top: 10px; display: flex; flex-direction: column; gap: 14px; padding: 18px 20px 20px; border-radius: 18px; background: var(--warm); border: 1px solid rgba(255,255,255,0.14); color: var(--paper); text-decoration: none;'),
  nextText: sx('display: flex; flex-direction: column; gap: 2px; min-width: 0;'),
  nextTitle: sx('font-size: 17px; line-height: 1.25; letter-spacing: -0.01em;'),
  nextSub: sx('font-size: 13px; line-height: 1.4; color: rgba(255,255,255,0.75);'),
  nextCta: sx('display: flex; justify-content: center; align-items: center; min-height: 44px; border-radius: 9999px; background: var(--cream); color: var(--ink); font-size: 14px; font-weight: 500;'),
  soldOut: sx('display: block; margin-top: 10px; font-size: 12px; line-height: 16px; color: rgba(255,255,255,0.6); text-align: center;'),
};

const MOBILE = '(max-width: 760px)';

export default function Hero() {
  const videoRef = useRef(null);

  // The poster is the first paint; the film loads afterwards, and never under reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.muted = true;
    v.src = asset(matchMedia(MOBILE).matches ? 'media/uba-hero-web-mobile.mp4' : 'media/uba-hero-web.mp4');
    const show = () => v.classList.add('on');
    v.addEventListener('playing', show);
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    return () => v.removeEventListener('playing', show);
  }, []);

  return (
    <section className="hero dk" style={S.section}>
      <Picture
        name="uba-hero-poster-1080"
        alt=""
        sizes="(max-width: 760px) 200vw, 100vw"
        priority
        className="hero-media"
      />
      <video ref={videoRef} className="hero-media hero-vid" autoPlay muted loop playsInline preload="none" aria-hidden="true" />
      <div style={S.shade1} />
      <div style={S.shade2} />
      <div style={S.shade3} />

      {/* Room for the fixed header, which HomePage renders once. */}
      <div aria-hidden="true" style={{ height: 80, flex: '0 0 auto' }} />

      <div className="w wide hero-main" style={S.main}>
        <div className="hero-foot">
          <div className="hero-head" style={{ minWidth: 0 }}>
            <h1 className="t-hero" style={S.h1}>
              <span className="ln"><span style={{ animationDelay: '.3s' }}>A new standard</span></span>
              <span className="ln"><span style={{ animationDelay: '.45s' }}>for Barre education.</span></span>
            </h1>
            <p className="rise t-lead" style={S.lead}>
              CPD-accredited Barre instructor certification. One intensive day, eight modules, trained in person by an
              expert UBA instructor.
            </p>
          </div>
          <div className="rise hero-card" style={{ animationDelay: '.8s' }}>
          <BookLink className="btn hc" style={S.card}>
            <span style={S.cardTop}>
              <span className="t-label" style={S.cardLabel}>Next cohort</span>
              <span style={S.badge}><span aria-hidden="true" style={S.dot} />Booking now</span>
            </span>
            <span className="hc-date" style={S.date}>{NEXT_DATE.long}</span>
            <span style={S.meta}>
              {NEXT_DATE.venue}, {NEXT_DATE.area} · <span style={{ whiteSpace: 'nowrap' }}>{NEXT_DATE.time}</span>
              <br />
              6–10 places · <s style={S.was}>{PRICE.was}</s> <b style={S.now}>{PRICE.now}</b> founding rate
            </span>
            <span className="hc-cta" style={S.cta}>Book this date →</span>
            <span className="hc-sold" style={S.soldOut}><s>{SOLD_OUT.date}</s> · Sold out</span>
          </BookLink>
          <a className="btn hc-next" href={TYPEFORM_URL} {...external} style={S.next}>
            <span style={S.nextText}>
              <span className="hc-next-title" style={S.nextTitle}>{NEXT_YEAR.title}</span>
              <span className="hc-next-sub" style={S.nextSub}>Hear first when booking opens</span>
            </span>
            <span className="hc-next-cta" style={S.nextCta}>{NEXT_YEAR.cta} →</span>
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
