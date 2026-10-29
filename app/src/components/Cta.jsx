import { sx } from '../lib/sx.js';
import { NEXT_DATE, NEXT_YEAR, PRICE, TYPEFORM_URL, external } from '../site.js';
import Picture from './Picture.jsx';
import BookLink from './BookLink.jsx';

const S = {
  section: sx('position: relative; min-height: clamp(460px, 64vh, 620px); display: flex; align-items: flex-end; overflow: hidden; background: var(--ink); color: var(--paper);'),
  photo: sx('position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; filter: saturate(0.8) contrast(1.05) brightness(0.99) sepia(0.08);'),
  shade: sx('position: absolute; inset: 0; background: linear-gradient(0deg, rgba(14,13,11,0.86) 0%, rgba(14,13,11,0.3) 55%, rgba(14,13,11,0.1) 100%);'),
  inner: sx('position: relative; padding-top: 64px; padding-bottom: clamp(40px, 7vh, 72px);'),
  h2: sx('margin: 0; font-size: clamp(36px, 5vw, 76px); line-height: .98; font-weight: 400; letter-spacing: -0.045em; text-wrap: balance;'),
  side: sx('display: flex; flex-direction: column; gap: 14px; max-width: 320px;'),
  body: sx('margin: 0; color: rgba(255,255,255,0.85);'),
  book: sx('align-self: flex-start; display: inline-flex; align-items: center; min-height: 52px; padding: 0 26px; border-radius: 9999px; background: var(--paper); color: var(--ink); font-size: 14px; font-weight: 500; text-decoration: none;'),
  soon: sx('margin: 4px 0 0; font-size: 14px; line-height: 1.5; color: rgba(255,255,255,0.85);'),
  soonLink: sx('color: var(--paper); text-underline-offset: 4px;'),
};

export default function Cta() {
  return (
    <section className="dk" style={S.section}>
      <Picture name="barre-instructor-training-arabesque-at-the-barre" alt="The cohort in arabesque along the barre, arms lifted" sizes="100vw" style={S.photo} />
      <div style={S.shade} />
      <div className="w split" style={S.inner}>
        <div style={{ maxWidth: 760 }}>
          <h2 className="rv cta-h" style={S.h2}>Reserve your place in the founding cohort.</h2>
        </div>
        <div className="rv" style={S.side}>
          <p className="t-body" style={S.body}>
            {NEXT_DATE.medium} · {NEXT_DATE.venue}, {NEXT_DATE.area}. Complete your booking securely online.
          </p>
          <BookLink style={S.book}>Secure your place · {PRICE.now} →</BookLink>
          <p style={S.soon}>
            {NEXT_YEAR.title}. <a href={TYPEFORM_URL} {...external} style={S.soonLink}>{NEXT_YEAR.cta}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
