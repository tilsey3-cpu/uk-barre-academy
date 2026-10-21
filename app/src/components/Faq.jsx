import { sx } from '../lib/sx.js';
import { EMAIL } from '../site.js';
import { FAQS } from '../faqs.js';

const S = {
  section: sx('background: var(--cream);'),
  intro: sx('margin: 18px 0 0; max-width: 360px; color: var(--muted);'),
  mail: sx('color: var(--ink);'),
};

// Native <details> rows: every answer is in the HTML (search engines, no-JS) and opens without script.
export default function Faq() {
  return (
    <section id="faq" className="panel" style={S.section}>
      <div className="w faq">
        <div className="faq-side">
          <h2 className="rv t-h2" style={{ margin: 0 }}>Frequently asked questions</h2>
          <p className="rv t-body" style={S.intro}>
            What to know before you book. Anything else, email{' '}
            <a className="ul" href={`mailto:${EMAIL}`} style={S.mail}>{EMAIL}</a>.
          </p>
        </div>
        <div className="rv">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>
                <span>{f.q}</span>
                <span className="faq-ic" aria-hidden="true" />
              </summary>
              <div className="faq-a t-body">
                {f.a.map((block, i) =>
                  Array.isArray(block) ? (
                    <ul key={i}>{block.map((li) => <li key={li}>{li}</li>)}</ul>
                  ) : (
                    <p key={i}>{block}</p>
                  )
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
