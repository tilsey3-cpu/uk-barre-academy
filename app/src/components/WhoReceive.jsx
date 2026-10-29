import { sx } from '../lib/sx.js';
import { ACCREDITATION } from '../site.js';
import { Check } from './Icons.jsx';
import { CimspaLogo, CpdBadge } from './Accreditation.jsx';

const SUITABLE = [
  'Pilates instructors',
  'Yoga teachers',
  'Personal trainers',
  'Group exercise instructors',
  'Dance teachers',
  'Experienced dancers',
  'Qualified fitness professionals adding Barre',
];

const INCLUDES = [
  'Full practical training day',
  '8-module UBA Method',
  'Training manual and workbook',
  'Teaching resources and class planning',
  'Up to 3 months to practise',
  'Practical video assessment',
  'Certification on successful assessment',
  'CPD-accredited specialist training',
  'No compulsory annual membership',
  'No ongoing licence or per-class fees',
];

const PROMISES = [
  {
    title: 'The framework, not a script',
    body: 'Combine the UBA formula with the Pilates, PT, yoga or dance experience you already bring.',
  },
  {
    title: 'No compulsory ongoing fees',
    body: 'No annual membership, licence or per-class fee to keep teaching the method.',
  },
];

const S = {
  section: sx('background: var(--paper);'),
  head: sx('margin-bottom: clamp(28px, 5vh, 44px);'),
  light: sx('border-radius: 16px; background: var(--cream); padding: clamp(22px, 2.4vw, 32px);'),
  list: sx('margin: 0; padding: 0; list-style: none;'),
  liLight: sx('display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid var(--line);'),
  liDark: sx('display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.12);'),
  tick: sx('flex: 0 0 auto; margin-top: 1px;'),
  note: sx('margin: 14px 0 0; font-size: 13px; line-height: 1.5; color: var(--muted);'),
  dark: sx('border-radius: 16px; background: var(--warm); color: var(--paper); padding: clamp(22px, 2.4vw, 32px); display: flex; flex-direction: column; gap: 18px;'),
  darkHead: sx('display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;'),
  accr: sx('margin-top: 16px; border-radius: 16px; background: var(--cream); padding: clamp(20px, 2.4vw, 28px) clamp(22px, 2.4vw, 32px); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 18px 40px;'),
  accrText: sx('margin: 0; max-width: 560px; color: var(--ink); text-wrap: balance;'),
  marks: sx('display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;'),
  promise: sx('padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.06);'),
  promiseT: sx('margin: 0 0 6px; font-size: 15px; font-weight: 600;'),
  promiseB: sx('margin: 0; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.68);'),
};

export default function WhoReceive() {
  return (
    <section className="panel" style={S.section}>
      <div className="w">
        <div className="split" style={S.head}>
          <div style={{ maxWidth: 640 }}>
            <h2 className="rv t-h2" style={{ margin: 0 }}>Movement professionals, ready to add Barre.</h2>
          </div>
        </div>
        <div className="boxes">
          <div className="rv" style={S.light}>
            <p className="t-h3" style={{ margin: '0 0 6px' }}>The programme is suitable for</p>
            <ul style={S.list}>
              {SUITABLE.map((item) => (
                <li key={item} className="t-small" style={S.liLight}>
                  <Check color="var(--success)" style={S.tick} />
                  {item}
                </li>
              ))}
            </ul>
            <p style={S.note}>Applicants are asked for their qualifications and relevant movement or teaching experience.</p>
          </div>
          <div className="rv dk" style={S.dark}>
            <div style={S.darkHead}>
              <p className="t-h3" style={{ margin: 0 }}>Your course fee includes</p>
              <CpdBadge />
            </div>
            <ul className="ticks2" style={S.list}>
              {INCLUDES.map((item) => (
                <li key={item} className="t-small" style={S.liDark}>
                  <Check color="var(--success-on-dark)" style={S.tick} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="prom" style={{ marginTop: 'auto' }}>
              {PROMISES.map((p) => (
                <div key={p.title} style={S.promise}>
                  <p style={S.promiseT}>{p.title}</p>
                  <p style={S.promiseB}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Organisation-level accreditation, kept apart from the course details: the course itself is not yet CIMSPA-endorsed */}
        <div className="rv accr" style={S.accr}>
          <p className="t-lead" style={S.accrText}>{ACCREDITATION}</p>
          <div style={S.marks}>
            <CimspaLogo />
            <CpdBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
