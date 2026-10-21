import { sx } from '../lib/sx.js';
import { COURSE_DATES, NEXT_DATE, NEXT_YEAR, PRICE, ROUTES, TYPEFORM_URL, external } from '../site.js';
import Picture from './Picture.jsx';
import BookLink from './BookLink.jsx';
import { Check } from './Icons.jsx';

const FEE_INCLUDES = [
  'Eight hours of practical, in-person training',
  'The complete eight-module method and handbook',
  'UBA certification and Independent CPD Accreditation',
  'Founding Instructor recognition',
  'Priority access to future UBA training',
];

const S = {
  section: sx('background: var(--paper);'),
  head: sx('margin-bottom: clamp(28px, 5vh, 44px);'),
  intro: sx('margin: 0; max-width: 360px; color: var(--muted);'),
  hist: sx('margin: 0 0 16px; padding: 0; list-style: none;'),
  histRow: sx('display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-radius: 14px;'),
  histPast: sx('background: var(--cream); color: var(--ink);'),
  histOpen: sx('background: var(--ink); color: var(--paper);'),
  histText: sx('display: flex; flex-direction: column; gap: 2px; min-width: 0;'),
  histDate: sx('font-size: 15px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
  histNote: sx('font-size: 12px; line-height: 1.4; opacity: .7;'),
  histTag: sx('flex: 0 0 auto; font-size: 13px; line-height: 18px; font-weight: 500; padding: 6px 12px; border-radius: 9999px;'),
  soon: sx('margin: 0 0 16px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; padding: 18px 18px 18px 22px; border-radius: 14px; background: var(--cream); color: var(--ink);'),
  soonText: sx('display: flex; flex-direction: column; gap: 2px;'),
  soonTitle: sx('font-size: 17px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
  soonSub: sx('font-size: 14px; line-height: 1.45; color: var(--muted);'),
  soonBtn: sx('display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px; border-radius: 9999px; background: var(--ink); color: var(--paper); font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap;'),
  photoCard: sx('position: relative; border-radius: 16px; background: var(--ink); color: var(--paper); min-height: clamp(380px, 52vh, 480px); display: flex;'),
  photo: sx('position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 62% 25%; filter: saturate(0.8) contrast(1.05) brightness(0.99) sepia(0.08);'),
  photoShade: sx('position: absolute; inset: 0; background: linear-gradient(90deg, rgba(14,13,11,0.86) 0%, rgba(14,13,11,0.5) 55%, rgba(14,13,11,0.1) 100%);'),
  photoBody: sx('position: relative; width: 100%; padding: clamp(24px, 3vw, 40px); display: flex; flex-direction: column; justify-content: space-between; gap: 32px;'),
  badge: sx('align-self: flex-start; padding: 8px 14px; border-radius: 9999px; background: var(--cream); color: var(--ink);'),
  date: sx('font-size: clamp(30px, 3.4vw, 48px); line-height: 1.02; letter-spacing: -0.035em;'),
  where: sx('margin: 14px 0 0; color: rgba(255,255,255,0.85);'),
  btns: sx('margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px;'),
  book: sx('display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; border-radius: 9999px; background: var(--paper); color: var(--ink); font-size: 14px; font-weight: 500; text-decoration: none;'),
  interest: sx('display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.5); color: var(--paper); font-size: 14px; font-weight: 500; text-decoration: none;'),
  agreeNote: sx('margin: 14px 0 0; font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.7);'),
  agreeLink: sx('color: var(--paper);'),
  fee: sx('border-radius: 16px; border: 1px solid var(--ink); padding: clamp(22px, 2.4vw, 32px); display: flex; flex-direction: column; gap: 18px;'),
  feeTop: sx('display: flex; justify-content: space-between; align-items: center; gap: 12px;'),
  feePill: sx('padding: 8px 14px; border-radius: 9999px; background: var(--ink); color: var(--paper);'),
  feeKind: sx('font-size: 13px; color: var(--muted);'),
  price: sx('margin-top: 10px; display: flex; align-items: baseline; gap: 12px;'),
  was: sx('font-size: 20px; color: var(--muted-cream);'),
  list: sx('margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;'),
  li: sx('display: flex; gap: 10px; align-items: flex-start;'),
  tick: sx('flex: 0 0 auto; margin-top: 2px;'),
  read: sx('margin: auto 0 0; padding-top: 14px; border-top: 1px solid var(--line); font-size: 12px; line-height: 1.5; color: var(--muted);'),
  readLink: sx('color: var(--ink);'),
  small: sx('margin: 0; font-size: 12px; line-height: 1.5; color: var(--muted);'),
};

export default function DatesFee() {
  return (
    <section id="dates" className="panel" style={S.section}>
      <div className="w">
        <div className="split" style={S.head}>
          <div style={{ maxWidth: 640 }}>
            <h2 className="rv t-h2" style={{ margin: 0 }}>Dates &amp; fee</h2>
          </div>
          <p className="rv t-body" style={S.intro}>
            One day of attendance, limited to 6–10 places per cohort. Full arrival details are shared ahead of your session.
          </p>
        </div>
        <ol className="hist rv" aria-label="Course dates" style={S.hist}>
          {COURSE_DATES.map((d) => (
            <li key={d.date} style={{ ...S.histRow, ...(d.open ? S.histOpen : S.histPast) }}>
              <span style={S.histText}>
                <span style={S.histDate}>{d.date}</span>
                <span style={S.histNote}>{d.note}</span>
              </span>
              <span style={{ ...S.histTag, ...(d.open ? S.histPast : S.histOpen) }}>{d.open ? 'Booking now' : 'Sold out'}</span>
            </li>
          ))}
        </ol>
        <div className="rv" style={S.soon}>
          <div style={S.soonText}>
            <p style={{ ...S.soonTitle, margin: 0 }}>{NEXT_YEAR.title}</p>
            <p style={{ ...S.soonSub, margin: 0 }}>The {NEXT_YEAR.year} programme is being scheduled. Register your interest to hear first when booking opens.</p>
          </div>
          <a className="btn" href={TYPEFORM_URL} {...external} style={S.soonBtn}>{NEXT_YEAR.cta} →</a>
        </div>
        <div className="book">
          <div className="rv dk zoom" style={S.photoCard}>
            <Picture name="uba-059" alt="Trainees smiling along the barre" sizes="(max-width: 1080px) 100vw, 760px" style={S.photo} />
            <div style={S.photoShade} />
            <div style={S.photoBody}>
              <span className="t-label" style={S.badge}>Booking now</span>
              <div style={{ maxWidth: 460 }}>
                <div style={S.date}>{NEXT_DATE.long}</div>
                <p className="t-body" style={S.where}>
                  {NEXT_DATE.venue}, {NEXT_DATE.area}, London {NEXT_DATE.postcode} · <span style={{ whiteSpace: 'nowrap' }}>{NEXT_DATE.time}</span>
                </p>
                <div style={S.btns}>
                  <BookLink style={S.book}>Book this date →</BookLink>
                  <a className="btn ghost" href={TYPEFORM_URL} {...external} style={S.interest}>Show your interest</a>
                </div>
                <p style={S.agreeNote}>
                  By booking you agree to our <a href={ROUTES.terms} style={S.agreeLink}>Terms &amp; Conditions</a>.
                </p>
              </div>
            </div>
          </div>
          <div className="rv" style={S.fee}>
            <div style={S.feeTop}>
              <span className="t-label" style={S.feePill}>Founding rate</span>
              <span style={S.feeKind}>One-off enrolment</span>
            </div>
            <div>
              <p className="t-h3" style={{ margin: 0 }}>Founding Instructor Course</p>
              <div style={S.price}>
                <span className="t-stat">{PRICE.now}</span>
                <s style={S.was}>{PRICE.was}</s>
              </div>
            </div>
            <ul style={S.list}>
              {FEE_INCLUDES.map((item) => (
                <li key={item} className="t-small" style={S.li}>
                  <Check size={17} color="var(--success)" style={S.tick} />
                  {item}
                </li>
              ))}
            </ul>
            <p style={S.read}>
              Please read our <a href={ROUTES.terms} style={S.readLink}>Terms &amp; Conditions</a> (including cancellations
              and refunds) before booking.
            </p>
            <p style={S.small}>
              A 50% introductory rate for the inaugural cohort, in return for constructive feedback after the course.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
