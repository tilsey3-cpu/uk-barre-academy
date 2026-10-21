// Hero.jsx — full-bleed editorial hero
function Hero({ onEnquire, onDownload }) {
  return (
    <section className="uba-hero">
      <div className="uba-hero__media" aria-hidden="true">
        <div className="uba-hero__media-img" />
        <div className="uba-hero__scrim" />
      </div>
      <div className="uba-hero__content">
        <div className="uba-eyebrow uba-hero__eyebrow">UK Barre Academy <span>·</span> Certification</div>
        <h1 className="uba-hero__title">
          A new standard for<br/>barre education<br/>in the UK.
        </h1>
        <p className="uba-hero__lede">
          A premium training platform for the next generation of instructors —
          built on ballet technique, strength training, and intelligent movement.
        </p>
        <p className="uba-hero__sub">
          A specialist certification designed to bring technical precision,
          alignment, and control into modern barre training.
        </p>
        <div className="uba-hero__cta">
          <button className="uba-btn uba-btn--primary" onClick={onEnquire}>Enquire about training →</button>
          <button className="uba-btn uba-btn--ghost-light" onClick={onDownload}>Download course overview →</button>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
