import { useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { asset } from '../asset.js';
import { sx } from '../lib/sx.js';
import { EMAIL, NAV, NEXT_DATE, PRICE } from '../site.js';
import BookLink from './BookLink.jsx';
import { useSite } from './Site.jsx';
import { Close } from './Icons.jsx';

const LINKS = [{ href: '#film', label: 'Watch the film' }, ...NAV];

const S = {
  overlay: sx('position: fixed; inset: 0; z-index: 60; background: var(--warm); animation: drawer .3s ease both;'),
  panel: sx('position: absolute; inset: 0; color: var(--paper); display: flex; flex-direction: column; overflow-y: auto;'),
  top: sx('height: 80px; display: flex; align-items: center; justify-content: space-between;'),
  logo: sx('height: 36px; width: auto; display: block;'),
  close: sx('width: 44px; height: 44px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.4); background: transparent; color: var(--paper); display: flex; align-items: center; justify-content: center; cursor: pointer;'),
  nav: sx('flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center; gap: 6px;'),
  link: sx('text-decoration: none; font-size: 34px; line-height: 1.25; letter-spacing: -0.03em; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1);'),
  foot: sx('padding-bottom: 28px; display: flex; flex-direction: column; gap: 14px;'),
  book: sx('display: flex; justify-content: center; align-items: center; min-height: 52px; border-radius: 9999px; background: var(--cream); color: var(--ink); font-size: 15px; font-weight: 500; text-decoration: none;'),
  contact: sx('color: rgba(255,255,255,0.6); text-align: center;'),
};

export default function MobileMenu() {
  const { home, menuOpen, setMenuOpen } = useSite();
  const target = useRef(null);

  // On the homepage, close the menu first, then jump to the section (rather than letting focus return
  // to the menu button at the top). Elsewhere the links navigate back to the homepage normally.
  const go = (e, href) => {
    if (home) return;
    e.preventDefault();
    target.current = href;
    setMenuOpen(false);
  };

  const onCloseAutoFocus = (e) => {
    if (!target.current) return;
    e.preventDefault();
    const href = target.current;
    target.current = null;
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView();
      history.replaceState(null, '', href);
    }, 0);
  };

  return (
    <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="u" style={S.overlay}>
          <Dialog.Content className="dk" aria-describedby={undefined} onCloseAutoFocus={onCloseAutoFocus} style={S.panel}>
            <Dialog.Title className="sr-only">Menu</Dialog.Title>
            <div className="w" style={S.top}>
              <img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="110" height="36" style={S.logo} />
              <Dialog.Close asChild>
                <button type="button" aria-label="Close menu" style={S.close}><Close /></button>
              </Dialog.Close>
            </div>
            <nav aria-label="Mobile" className="w" style={S.nav}>
              {LINKS.map((l) => (
                <a key={l.href} href={home + l.href} onClick={(e) => go(e, l.href)} style={S.link}>{l.label}</a>
              ))}
            </nav>
            <div className="w" style={S.foot}>
              <BookLink style={S.book}>Book {NEXT_DATE.shortMonth} · {PRICE.now} →</BookLink>
              <span className="t-small" style={S.contact}>{EMAIL} · @ukbarreacademy</span>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
