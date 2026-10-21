import { useEffect, useRef } from 'react';
import { sx } from '../lib/sx.js';
import { NEXT_DATE, PRICE } from '../site.js';
import BookLink from './BookLink.jsx';

const S = {
  wrap: sx('position: sticky; bottom: 0; height: 0; z-index: 40; pointer-events: none; transform: translate3d(0, 120px, 0); opacity: 0; transition: transform .5s cubic-bezier(.2,.7,.1,1), opacity .4s ease;'),
  bar: sx('position: absolute; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom)); pointer-events: auto; max-width: 820px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 8px 8px 20px; border-radius: 9999px; background: var(--ink); color: var(--paper); border: 1px solid rgba(255,255,255,0.14); box-shadow: 0 12px 40px -12px rgba(0,0,0,0.45);'),
  info: sx('display: flex; align-items: center; gap: 10px; min-width: 0;'),
  dot: sx('flex: 0 0 auto; width: 8px; height: 8px; border-radius: 9999px; background: var(--success-on-dark);'),
  text: sx('white-space: nowrap; overflow: hidden; text-overflow: ellipsis;'),
  b: sx('font-weight: 600;'),
  was: sx('color: rgba(255,255,255,0.5);'),
  book: sx('flex: 0 0 auto; display: inline-flex; align-items: center; min-height: 44px; padding: 0 22px; border-radius: 9999px; background: var(--paper); color: var(--ink); font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap;'),
};

// Takes no space in the page (height 0): floats in after the hero and hides while the promo film fills the screen.
export default function BookingBar({ filmFullRef, updateRef }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const update = () => {
      const on = scrollY > innerHeight * 0.6 && !filmFullRef.current;
      el.style.transform = `translate3d(0,${on ? '0' : '120px'},0)`;
      el.style.opacity = on ? '1' : '0';
      el.inert = !on;
    };
    updateRef.current = update;
    addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      removeEventListener('scroll', update);
      updateRef.current = null;
    };
  }, [filmFullRef, updateRef]);

  return (
    <div ref={ref} data-bar="" role="region" aria-label="Book the next date" style={S.wrap}>
      <div className="dk" style={S.bar}>
        <span className="t-small" style={S.info}>
          <span aria-hidden="true" style={S.dot} />
          <span className="bar-l" style={S.text}>
            <b style={S.b}>{NEXT_DATE.medium}</b> · {NEXT_DATE.venue}, {NEXT_DATE.area} · <s style={S.was}>{PRICE.was}</s> {PRICE.now}
          </span>
          <span className="bar-s" style={S.text}>
            <b style={S.b}>{NEXT_DATE.short}</b> · {PRICE.now}
          </span>
        </span>
        <BookLink style={S.book}>Book now →</BookLink>
      </div>
    </div>
  );
}
