// Certification.jsx — the offering
function Certification({ onView }) {
  const features = [
    'Practical, in-person training',
    'Clear teaching framework',
    'Assessment-based certification',
  ];
  return (
    <section className="uba-section uba-section--inverse" id="certification">
      <div className="uba-container uba-cert">
        <div className="uba-cert__copy">
          <div className="uba-eyebrow">The Certification</div>
          <h2 className="uba-section__title">
            UK Barre Academy<br/>Certification.
          </h2>
          <p className="uba-section__lede">
            An 8-hour CPD programme built for instructors who want to deliver
            structured, technically sound barre classes.
          </p>
          <button className="uba-btn uba-btn--bone" onClick={onView}>View certification →</button>
        </div>
        <ul className="uba-cert__features">
          {features.map((f, i) => (
            <li key={f}>
              <span className="uba-mono">{String(i + 1).padStart(2, '0')}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
window.Certification = Certification;
