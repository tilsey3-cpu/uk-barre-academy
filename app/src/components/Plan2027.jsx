import { sx } from '../lib/sx.js';
import { NEXT_YEAR, PLAN_2027, TYPEFORM_URL, external } from '../site.js';

const S = {
  wrap: sx('margin: clamp(32px, 5vh, 56px) 0 0; border-radius: 16px; background: var(--cream); color: var(--ink); padding: clamp(22px, 2.6vw, 36px); display: flex; flex-direction: column; gap: clamp(24px, 3vw, 36px);'),
  head: sx('display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px 40px;'),
  headText: sx('display: flex; flex-direction: column; gap: 10px; max-width: 720px;'),
  intro: sx('margin: 0; color: var(--muted);'),
  btn: sx('display: inline-flex; align-items: center; min-height: 48px; padding: 0 24px; border-radius: 9999px; background: var(--ink); color: var(--paper); font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap;'),
  col: sx('display: flex; flex-direction: column; gap: 10px; min-width: 0;'),
  colTitle: sx('margin: 0; font-size: 17px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
  list: sx('margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; flex: 1;'),
  row: sx('flex: 1; min-height: 52px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 18px; border-radius: 14px; background: var(--paper);'),
  rowMain: sx('font-size: 15px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
  rowSub: sx('flex: 0 0 auto; font-size: 12px; line-height: 1.4; color: var(--muted);'),
  fmt: sx('flex: 1; padding: 14px 18px; border-radius: 14px; background: var(--paper); display: flex; flex-direction: column; justify-content: center; gap: 2px;'),
  fmtName: sx('font-size: 15px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
  fmtDetail: sx('font-size: 14px; line-height: 1.45; color: var(--muted);'),
  small: sx('margin: auto 0 0; font-size: 12px; line-height: 1.5; color: var(--muted);'),
  fee: sx('border-radius: 14px; background: var(--paper); padding: clamp(18px, 2vw, 26px); display: flex; flex-direction: column; gap: 14px; min-width: 0;'),
  price: sx('font-size: clamp(34px, 3.6vw, 48px); line-height: 1; letter-spacing: -0.035em;'),
  incl: sx('margin: 0; font-size: 14px; line-height: 1.5; color: var(--muted);'),
  lines: sx('margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column;'),
  line: sx('display: flex; justify-content: space-between; align-items: baseline; gap: 16px; padding: 10px 0; border-top: 1px solid var(--line);'),
  total: sx('font-weight: 500;'),
  num: sx('flex: 0 0 auto;'),
  cpd: sx('border-radius: 14px; border: 1px solid var(--ink); padding: clamp(18px, 2vw, 26px); display: flex; flex-direction: column; gap: 10px; min-width: 0;'),
};

// The announced 2027 programme: provisional dates (venues TBC), the two formats under consideration, the
// full certification fee with its breakdown, and the training-day-only option. Every action goes to the
// interest form; nothing here is bookable.
export default function Plan2027() {
  const { dates, formats, breakdown, total, cpdOnly, intro, title, venue } = PLAN_2027;
  return (
    <div id="dates-2027" className="rv" style={S.wrap}>
      <div style={S.head}>
        <div style={S.headText}>
          <h3 className="t-h3" style={{ margin: 0 }}>{title}</h3>
          <p className="t-body" style={S.intro}>{intro}</p>
        </div>
        <a className="btn" href={TYPEFORM_URL} {...external} style={S.btn}>{NEXT_YEAR.cta} →</a>
      </div>
      <div className="plan-cols">
        <div style={S.col}>
          <p style={S.colTitle}>Our 2027 plans</p>
          <ul style={S.list} aria-label="2027 training dates">
            {dates.map((d) => (
              <li key={d} style={S.row}>
                <span style={S.rowMain}>{d}</span>
                <span style={S.rowSub}>{venue}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={S.col}>
          <p style={S.colTitle}>Two formats under consideration</p>
          <ul style={S.list} aria-label="Possible course formats">
            {formats.map((f) => (
              <li key={f.name} style={S.fmt}>
                <span style={S.fmtName}>{f.name}</span>
                <span style={S.fmtDetail}>{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p style={{ ...S.small, margin: '-12px 0 0' }}>Dates and formats are provisional. Nothing is bookable yet.</p>
      <div className="plan-cols">
        <div style={S.fee}>
          <p style={S.colTitle}>Full certification</p>
          <span className="t-stat" style={S.price}>{total.price}</span>
          <p style={S.incl}>Including the UK Barre Academy 50-page training manual and a one-hour class assessment with personalised feedback.</p>
          <ul style={S.lines}>
            {breakdown.map((b) => (
              <li key={b.label} className="t-small" style={S.line}>
                <span>{b.label}</span>
                <span style={S.num}>{b.price}</span>
              </li>
            ))}
            <li className="t-small" style={{ ...S.line, ...S.total }}>
              <span>{total.label}</span>
              <span style={S.num}>{total.price}</span>
            </li>
          </ul>
        </div>
        <div style={S.cpd}>
          <p style={S.colTitle}>{cpdOnly.label}</p>
          <span className="t-stat" style={S.price}>{cpdOnly.price}</span>
          <p style={S.incl}>{cpdOnly.detail}</p>
          <p style={S.small}>Choose this option when you register your interest.</p>
        </div>
      </div>
    </div>
  );
}
