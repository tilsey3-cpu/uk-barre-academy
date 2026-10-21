// Positioning.jsx — bridges the gap statement
function Positioning() {
  const points = [
    'Technique-led, not choreography-led',
    'Rooted in classical ballet principles',
    'Designed for qualified instructors',
  ];
  return (
    <section className="uba-section" id="positioning">
      <div className="uba-container">
        <div className="uba-section__head">
          <div className="uba-eyebrow">Positioning</div>
          <h2 className="uba-section__title">
            The UK Barre Academy Certification bridges the gap between traditional barre fitness and authentic ballet-based movement training.
          </h2>
        </div>
        <ul className="uba-points">
          {points.map((p, i) => (
            <li className="uba-point" key={p}>
              <span className="uba-mono uba-point__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="uba-point__body">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
window.Positioning = Positioning;
