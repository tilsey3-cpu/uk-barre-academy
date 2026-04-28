// Cta.jsx — closing call to action
function Cta({ onEnquire }) {
  return (
    <section className="uba-section uba-section--inverse uba-cta" id="enquire">
      <div className="uba-container uba-cta__inner">
        <div className="uba-eyebrow">CTA</div>
        <h2 className="uba-cta__title">
          Become a certified<br/>barre instructor.
        </h2>
        <p className="uba-section__lede">
          Enquire to join the next training, or request the full course details.
        </p>
        <button className="uba-btn uba-btn--bone uba-btn--lg" onClick={onEnquire}>Enquire now →</button>
      </div>
    </section>
  );
}
window.Cta = Cta;
