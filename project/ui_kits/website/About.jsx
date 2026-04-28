// About.jsx — Maggie Paterson, founder
function About() {
  return (
    <section className="uba-section uba-section--quiet" id="about">
      <div className="uba-container uba-about">
        <div className="uba-about__media" aria-hidden="true">
          <div className="uba-about__portrait" />
          <span className="uba-mono uba-about__caption">Maggie Paterson · Founder</span>
        </div>
        <div className="uba-about__copy">
          <div className="uba-eyebrow">About</div>
          <h2 className="uba-section__title">
            Maggie Paterson.<br/>Founder, UK Barre Academy.
          </h2>
          <p className="uba-section__lede">
            With over 40 years of experience in ballet and movement education,
            Maggie has trained students from beginner to professional level —
            and now brings this expertise into the fitness industry through
            the MAGPATS Barre Method.
          </p>
          <div className="uba-about__meta">
            <div><span className="uba-mono">40+</span><span>Years teaching</span></div>
            <div><span className="uba-mono">∞</span><span>Beginner to professional</span></div>
            <div><span className="uba-mono">UK</span><span>MAGPATS Barre Method</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;
