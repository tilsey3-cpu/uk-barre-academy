import { sx } from '../lib/sx.js';
import { MODULES, NEXT_DATE } from '../site.js';
import { Clock } from './Icons.jsx';

const COMBINES = [
  'Ballet technique and alignment',
  'Pilates-based core strength',
  'Functional fitness and conditioning',
  'Light hand-weight training',
  'Barre choreography and cardiovascular flow',
  'Musicality, cueing and class structure',
  'Adaptations for different abilities',
  'Safe and effective teaching practice',
];

const S = {
  section: sx('background: var(--ink); color: var(--paper); padding-top: 0;'),
  ticker: sx('overflow: hidden; border-bottom: 1px solid rgba(255,255,255,0.12); margin-bottom: clamp(48px, 8vh, 88px);'),
  track: sx('padding: 18px 0; white-space: nowrap; font-size: 15px; line-height: 22px; color: rgba(255,255,255,0.8);'),
  item: sx('display: inline-flex; align-items: center; gap: 40px; padding-right: 40px;'),
  bullet: sx('width: 5px; height: 5px; border-radius: 9999px; background: rgba(255,255,255,0.35);'),
  body: sx('margin: 20px 0 0; max-width: 440px; color: rgba(255,255,255,0.7);'),
  pill: sx('margin-top: 28px; display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 18px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.3); font-weight: 500;'),
  list: sx('margin: 0; padding: 0; list-style: none;'),
  mod: sx('min-height: 92px; padding: 16px 18px; border-radius: 14px; background: var(--warm); border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; justify-content: space-between; gap: 10px;'),
  modNum: sx('font-size: 12px; font-weight: 500; font-variant-numeric: tabular-nums; letter-spacing: .02em; color: rgba(255,255,255,0.55);'),
  modTitle: sx('font-size: 15px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
};

export default function Curriculum() {
  return (
    <section id="curriculum" className="panel dk" style={S.section}>
      <div aria-label="What the programme combines" style={S.ticker}>
        <div className="mq" style={S.track}>
          {[...COMBINES, ...COMBINES].map((c, i) => (
            <span key={i} aria-hidden={i >= COMBINES.length ? 'true' : undefined} style={S.item}>
              {c}
              <span aria-hidden="true" style={S.bullet} />
            </span>
          ))}
        </div>
      </div>
      <div className="w cur">
        <div>
          <h2 className="rv t-h2" style={{ margin: 0 }}>8 modules, 8 hours, one complete method.</h2>
          <p className="rv t-body" style={S.body}>
            Designed to help instructors understand not only how to perform Barre exercises, but how to teach them safely,
            effectively and confidently.
          </p>
          <span className="rv t-small" style={S.pill}>
            <Clock />
            One intensive day · {NEXT_DATE.time}
          </span>
        </div>
        <ol className="mods rv" style={S.list}>
          {MODULES.map((m, i) => (
            <li key={m} style={S.mod}>
              <span style={S.modNum}>{String(i + 1).padStart(2, '0')}</span>
              <span style={S.modTitle}>{m}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
