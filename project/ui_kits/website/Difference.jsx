// Difference.jsx — ballet-informed approach
function Difference() {
  const principles = [
    { i: '01', title: 'Alignment first', body: 'Posture and placement come before pace. Every position has a reason.' },
    { i: '02', title: 'Control over repetition', body: 'Quality of movement is the metric. Volume is a by-product, not the goal.' },
    { i: '03', title: 'Precision in every movement', body: 'Cueing, correction, and restraint — taught as a craft, not a script.' },
    { i: '04', title: 'Built on 40+ years of teaching experience', body: 'Distilled from a career in ballet education, applied to the modern barre studio.' },
  ];
  return (
    <section className="uba-section" id="difference">
      <div className="uba-container">
        <div className="uba-section__head">
          <div className="uba-eyebrow">The Difference</div>
          <h2 className="uba-section__title">
            The ballet-informed approach.
          </h2>
          <p className="uba-section__lede">
            Most barre training focuses on choreography. This method focuses on technique.
          </p>
        </div>
        <ol className="uba-modules uba-modules--light">
          {principles.map((p) => (
            <li className="uba-module uba-module--light" key={p.i}>
              <span className="uba-module__index">{p.i}</span>
              <div className="uba-module__title">{p.title}</div>
              <p className="uba-module__body">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
window.Difference = Difference;
