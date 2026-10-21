import { useEffect, useRef } from 'react';
import { asset } from '../asset.js';
import { sx } from '../lib/sx.js';
import { NAV, NEXT_DATE, ROUTES } from '../site.js';
import BookLink from './BookLink.jsx';
import { useSite } from './Site.jsx';
import { Menu } from './Icons.jsx';

const S = {
  header: sx('position: relative; z-index: 3;'),
  row: sx('height: 80px; display: flex; align-items: center; justify-content: space-between; gap: 16px;'),
  logoLink: sx('display: flex; align-items: center;'),
  logo: sx('height: 38px; width: auto; display: block;'),
  link: sx('text-decoration: none;'),
  book: sx('display: inline-flex; align-items: center; min-height: 44px; padding: 0 22px; border-radius: 9999px; background: var(--paper); color: var(--ink); text-decoration: none;'),
  compact: sx('align-items: center; gap: 8px;'),
  compactBook: sx('display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px; border-radius: 9999px; background: var(--paper); color: var(--ink); font-size: 14px; font-weight: 500; text-decoration: none;'),
  menuBtn: sx('width: 44px; height: 44px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.55); background: transparent; color: var(--paper); display: flex; align-items: center; justify-content: center; cursor: pointer;'),
};

// On the homepage the header is `floating`: fixed to the top, clear over the hero photo, a solid bar once the
// page scrolls, and out of the way while the promo film fills the screen. Policy pages use the sticky .ph wrapper.
export default function Header({ floating = false, filmFullRef, updateRef }) {
  const { home, setMenuOpen } = useSite();
  const ref = useRef(null);

  useEffect(() => {
    if (!floating) return undefined;
    const el = ref.current;
    const update = () => {
      const hide = !!filmFullRef?.current;
      el.dataset.solid = scrollY > 24 ? 'true' : 'false';
      el.dataset.hidden = hide ? 'true' : 'false';
      el.inert = hide;
    };
    if (updateRef) updateRef.current = update;
    addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      removeEventListener('scroll', update);
      if (updateRef) updateRef.current = null;
    };
  }, [floating, filmFullRef, updateRef]);

  return (
    <header ref={ref} className={floating ? 'topbar dk' : undefined} style={floating ? undefined : S.header}>
      <div className="w wide" style={S.row}>
        <a href={home ? ROUTES.home : '#top'} style={S.logoLink}>
          <img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" style={S.logo} />
        </a>
        <nav aria-label="Main" className="nav t-small" style={{ fontWeight: 500 }}>
          {NAV.map((n) => (
            <a key={n.href} href={home + n.href} style={S.link}>{n.label}</a>
          ))}
          <BookLink style={S.book}>Book {NEXT_DATE.dayMonth} →</BookLink>
        </nav>
        <div className="nav-m" style={S.compact}>
          <BookLink style={S.compactBook}>Book</BookLink>
          <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)} style={S.menuBtn}>
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
