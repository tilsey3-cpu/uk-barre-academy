import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { sx } from '../lib/sx.js';
import { EMAIL, NEXT_DATE, NEXT_YEAR, PRICE, ROUTES, STRIPE_URL, TYPEFORM_URL, external } from '../site.js';
import { Close, Lock } from './Icons.jsx';

const S = {
  overlay: sx('position: fixed; inset: 0; z-index: 80; background: rgba(14,13,11,0.72); display: flex; align-items: center; justify-content: center; padding: 16px; animation: drawer .25s ease both;'),
  panel: sx('width: 100%; max-width: 520px; max-height: 90vh; overflow: auto; border-radius: 20px; background: var(--paper); color: var(--ink); padding: clamp(22px, 3vw, 32px); box-shadow: 0 40px 120px -30px rgba(0,0,0,0.6);'),
  head: sx('display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;'),
  title: sx('margin: 0; font-size: 26px; line-height: 1.1; font-weight: 400; letter-spacing: -0.03em;'),
  meta: sx('margin: 6px 0 0; color: var(--muted);'),
  close: sx('flex: 0 0 auto; width: 40px; height: 40px; border-radius: 9999px; border: 1px solid var(--line); background: transparent; color: var(--ink); display: flex; align-items: center; justify-content: center; cursor: pointer;'),
  terms: sx('margin: 20px 0 0; padding: 16px 18px; list-style: none; border-radius: 14px; background: var(--cream); display: flex; flex-direction: column; gap: 8px; font-size: 14px; line-height: 1.5;'),
  agree: sx('margin-top: 18px; display: flex; gap: 12px; align-items: flex-start; font-size: 14px; line-height: 1.5; cursor: pointer;'),
  box: sx('flex: 0 0 auto; width: 20px; height: 20px; margin: 1px 0 0; accent-color: var(--ink);'),
  link: sx('color: var(--ink);'),
  pay: sx('margin-top: 20px; display: flex; justify-content: center; align-items: center; gap: 10px; min-height: 52px; border-radius: 9999px; background: var(--ink); color: var(--paper); font-size: 15px; font-weight: 500; text-decoration: none; transition: opacity .2s ease;'),
  note: sx('margin: 12px 0 0; font-size: 13px; line-height: 1.5; color: var(--muted); text-align: center;'),
  later: sx('margin: 20px 0 0; font-size: 14px; line-height: 1.5; color: var(--muted); text-align: center;'),
};

// CIMSPA requires customers to accept the terms before paying, so every Book button lands here first.
export default function BookDialog({ open, onOpenChange, opener }) {
  const [agreed, setAgreed] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (open) setAgreed(false);
  }, [open]);

  const returnFocus = (e) => {
    e.preventDefault();
    const el = opener.current;
    // The opener may have been inside the (now closed) mobile menu.
    const target = el && el.isConnected && el.offsetParent !== null ? el : document.querySelector('[aria-label="Open menu"]');
    target?.focus();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="u" style={S.overlay}>
          <Dialog.Content
            aria-describedby={undefined}
            onOpenAutoFocus={(e) => {
              e.preventDefault();
              boxRef.current?.focus();
            }}
            onCloseAutoFocus={returnFocus}
            style={S.panel}
          >
            <div style={S.head}>
              <div>
                <Dialog.Title style={S.title}>{NEXT_DATE.long}</Dialog.Title>
                <p className="t-small" style={S.meta}>
                  {NEXT_DATE.venue}, {NEXT_DATE.area} · {NEXT_DATE.time} · {PRICE.now} founding rate
                </p>
              </div>
              <Dialog.Close asChild>
                <button type="button" aria-label="Close" style={S.close}><Close size={16} /></button>
              </Dialog.Close>
            </div>
            <ul style={S.terms}>
              <li>Your place is confirmed once payment is received and we confirm your date.</li>
              <li>
                Cancellations: full refund more than 28 days before, 50% at 14–28 days, normally non-refundable under 14
                days. Your statutory rights are unaffected.
              </li>
              <li>Certification follows a successful practical assessment, normally within three months.</li>
            </ul>
            <label style={S.agree}>
              <input
                ref={boxRef}
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={S.box}
              />
              <span>
                I have read and agree to the{' '}
                <a href={ROUTES.terms} {...external} style={S.link}>Terms &amp; Conditions</a> and have read the{' '}
                <a href={ROUTES.privacy} {...external} style={S.link}>Privacy Policy</a>.
              </span>
            </label>
            <a
              href={STRIPE_URL}
              {...external}
              aria-disabled={!agreed}
              tabIndex={agreed ? 0 : -1}
              onClick={(e) => {
                if (!agreed) e.preventDefault();
                else onOpenChange(false);
              }}
              style={{ ...S.pay, opacity: agreed ? 1 : 0.35, pointerEvents: agreed ? 'auto' : 'none' }}
            >
              <Lock />
              Continue to secure payment
            </a>
            <p style={S.note}>
              Payment is taken securely by Stripe. Questions? <a href={`mailto:${EMAIL}`} style={S.link}>{EMAIL}</a>
            </p>
            <p style={S.later}>
              Can’t make this date? {NEXT_YEAR.title}.{' '}
              <a href={TYPEFORM_URL} {...external} style={S.link}>{NEXT_YEAR.cta}</a>
            </p>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
