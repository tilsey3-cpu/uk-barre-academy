import * as Dialog from '@radix-ui/react-dialog';
import { sx } from '../lib/sx.js';
import { REVIEW_CAPTION, TESTIMONIALS } from '../testimonials.js';
import Picture from './Picture.jsx';
import CompletedCohorts from './CompletedCohorts.jsx';
import { Close, QuoteMark } from './Icons.jsx';

const TONES = {
  cream: { card: sx('background: var(--cream); color: var(--ink);'), mark: 'var(--ink)' },
  dark: { card: sx('background: #2a241f; color: var(--paper);'), mark: 'var(--cream)' },
  white: { card: sx('background: var(--paper); color: var(--ink);'), mark: 'var(--quiet)' },
};
const byTitle = (title) => TESTIMONIALS.find((t) => t.title === title);

// One half of each drifting row, in the reference's order. Each row renders its half twice,
// identically, so the -50% loop is seamless.
const ROW1 = [
  { photo: 'uk-barre-academy-cohort-celebrating-london', alt: 'Our latest cohort celebrating outside the studio', pos: '50% 40%', rot: 2 },
  { review: 'Well-balanced training', tone: 'cream', rot: -2.5 },
  { review: 'A clear, structured approach', tone: 'dark', rot: 1.8 },
  { photo: 'barre-instructor-training-standing-splits', alt: 'Two trainees holding standing splits at the barre', pos: '35% 45%', rot: -1.6 },
  { review: 'Music that motivates', tone: 'white', rot: -1.2 },
  { photo: 'uk-barre-academy-founding-cohort-group', alt: 'Our first cohort celebrating together', pos: '50% 35%', rot: 1.4 },
  { review: 'The value of a small group', tone: 'cream', rot: 2.6 },
  { review: 'Exceeded my expectations', tone: 'dark', rot: -1.8 },
  { photo: 'barre-instructor-training-plie-at-the-barre', alt: 'Trainees in a wide second position along the barre', pos: '55% 45%', rot: -2.2 },
  { review: 'Practical, module by module', tone: 'white', rot: -2.5 },
  { photo: 'barre-certification-training-mirror-studio', alt: 'Trainees facing the mirror at the barre', pos: '50% 55%', rot: 1.8 },
];
const ROW2_TONE = ['dark', 'cream', 'white'];
const ROW2_ROT = [-1.2, 2.6, -1.8, -2.5, 1.8, -1.2, 2.6, -1.8, -2.5, 1.8, -1.2, 2.6];
const ROW2 = ROW2_ROT.map((rot, i) => ({ t: TESTIMONIALS[i % TESTIMONIALS.length], tone: ROW2_TONE[i % 3], rot }));

const S = {
  section: sx('background: var(--warm); color: var(--paper); padding-left: 0; padding-right: 0; overflow: hidden;'),
  head: sx('margin-bottom: clamp(36px, 6vh, 64px);'),
  allBtn: sx('min-height: 48px; padding: 0 22px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.4); background: transparent; color: var(--paper); font: inherit; font-size: 14px; font-weight: 500; cursor: pointer;'),
  drift: sx('display: flex; flex-direction: column; gap: 22px; padding: 18px 0;'),
  photo: sx('margin: 0 22px 0 0; flex: 0 0 auto; width: clamp(260px, 26vw, 360px); height: clamp(200px, 22vh, 228px); border-radius: 16px; overflow: hidden;'),
  photoImg: sx('display: block; width: 100%; height: 100%; object-fit: cover;'),
  card: sx('margin: 0 22px 0 0; flex: 0 0 auto; width: clamp(260px, 26vw, 360px); min-height: clamp(200px, 22vh, 228px); padding: 22px 24px; border-radius: 16px; display: flex; flex-direction: column; gap: 10px; white-space: normal;'),
  cardTitle: sx('margin: 0; font-size: 16px; line-height: 1.3; font-weight: 600; letter-spacing: -0.01em;'),
  cardQuote: sx('margin: 0; font-size: 14px; line-height: 1.55; opacity: .86;'),
  cardCap: sx('margin-top: auto; font-size: 12px; line-height: 16px; opacity: .6;'),
  short: sx('margin: 0 22px 0 0; flex: 0 0 auto; width: clamp(240px, 22vw, 320px); padding: 20px 22px; border-radius: 16px; display: flex; flex-direction: column; gap: 8px; white-space: normal;'),
  shortQ: sx('margin: 0; font-size: 22px; line-height: 1.15; font-weight: 400; letter-spacing: -0.03em;'),
  shortCap: sx('font-size: 12px; line-height: 16px; opacity: .6;'),
  overlay: sx('position: fixed; inset: 0; z-index: 70; background: rgba(14,13,11,0.72); display: flex; align-items: center; justify-content: center; padding: 16px; animation: drawer .25s ease both;'),
  panel: sx('width: 100%; max-width: 920px; max-height: 88vh; overflow: auto; border-radius: 20px; background: var(--cream); padding: clamp(22px, 3vw, 36px); color: var(--ink);'),
  panelHead: sx('display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px;'),
  close: sx('width: 40px; height: 40px; border-radius: 9999px; border: 1px solid var(--ink); background: transparent; color: var(--ink); display: flex; align-items: center; justify-content: center; cursor: pointer;'),
  grid: sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;'),
  item: sx('margin: 0; padding: 22px; border-radius: 14px; background: var(--paper); display: flex; flex-direction: column; gap: 10px;'),
  itemTitle: sx('margin: 0; font-size: 16px; font-weight: 600; letter-spacing: -0.01em;'),
  itemQuote: sx('margin: 0; color: #3a342e;'),
  itemCap: sx('font-size: 12px; color: var(--muted);'),
};

const tilt = (deg) => ({ transform: `rotate(${deg}deg)` });

function Row1Item({ item, copy }) {
  const hidden = copy || undefined;
  if (item.photo) {
    return (
      <figure className="lift" aria-hidden={hidden} style={{ ...S.photo, ...tilt(item.rot) }}>
        <Picture name={item.photo} alt={copy ? '' : item.alt} sizes="360px" style={{ ...S.photoImg, objectPosition: item.pos }} />
      </figure>
    );
  }
  const t = byTitle(item.review);
  const tone = TONES[item.tone];
  return (
    <figure className="lift" aria-hidden={hidden} style={{ ...S.card, ...tone.card, ...tilt(item.rot) }}>
      <QuoteMark fill={tone.mark} />
      <p style={S.cardTitle}>{t.title}</p>
      <blockquote style={S.cardQuote}>“{t.quote}”</blockquote>
      <figcaption style={S.cardCap}>{REVIEW_CAPTION}</figcaption>
    </figure>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="panel dk" style={S.section}>
      <Dialog.Root>
        <div className="w split" style={S.head}>
          <div>
            <h2 className="rv t-h2" style={{ margin: 0 }}>Founding cohort reviews</h2>
          </div>
          <Dialog.Trigger asChild>
            <button type="button" className="btn ghost rv" style={S.allBtn}>Read all reviews →</button>
          </Dialog.Trigger>
        </div>

        <div className="drift" style={S.drift}>
          <div className="mq">
            {[0, 1].map((copy) =>
              ROW1.map((item, i) => <Row1Item key={`${copy}-${i}`} item={item} copy={copy === 1} />)
            )}
          </div>
          <div className="mqr">
            {[0, 1].map((copy) =>
              ROW2.map(({ t, tone, rot }, i) => (
                <figure
                  key={`${copy}-${i}`}
                  className="lift"
                  aria-hidden={copy === 1 || undefined}
                  style={{ ...S.short, ...TONES[tone].card, ...tilt(rot) }}
                >
                  <p style={S.shortQ}>“{t.short}”</p>
                  <figcaption style={S.shortCap}>{t.title}</figcaption>
                </figure>
              ))
            )}
          </div>
        </div>

        <CompletedCohorts />

        <Dialog.Portal>
          <Dialog.Overlay className="u" style={S.overlay}>
            <Dialog.Content aria-describedby={undefined} style={S.panel}>
              <div style={S.panelHead}>
                <Dialog.Title asChild>
                  <p className="t-h3" style={{ margin: 0 }}>Founding cohort reviews</p>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button type="button" aria-label="Close reviews" style={S.close}><Close size={16} /></button>
                </Dialog.Close>
              </div>
              <div style={S.grid}>
                {TESTIMONIALS.map((t) => (
                  <figure key={t.title} style={S.item}>
                    <p style={S.itemTitle}>{t.title}</p>
                    <blockquote className="t-small" style={S.itemQuote}>“{t.quote}”</blockquote>
                    <figcaption style={S.itemCap}>{REVIEW_CAPTION}</figcaption>
                  </figure>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
