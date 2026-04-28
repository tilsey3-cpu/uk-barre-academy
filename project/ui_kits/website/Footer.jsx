// Footer.jsx — quiet 4-col
function Footer() {
  return (
    <footer className="uba-footer">
      <div className="uba-container uba-footer__inner">
        <div className="uba-footer__brand">
          <div className="uba-footer__logo">UBA<sup>©</sup></div>
          <p>UK Barre Academy — a training platform for instructors. London &amp; Manchester.</p>
        </div>
        <div>
          <div className="uba-eyebrow">Programme</div>
          <ul><li>The Method</li><li>Modules</li><li>Cohorts</li><li>Fees</li></ul>
        </div>
        <div>
          <div className="uba-eyebrow">Studio</div>
          <ul><li>Studios</li><li>Health clubs</li><li>Independent</li><li>Partnerships</li></ul>
        </div>
        <div>
          <div className="uba-eyebrow">Contact</div>
          <ul><li>hello@ukbarreacademy.com</li><li>+44 20 0000 0000</li><li>21 Welbeck St, London</li></ul>
        </div>
      </div>
      <div className="uba-container uba-footer__base">
        <span className="uba-mono">© 2026 UK Barre Academy</span>
        <span className="uba-mono">A new standard for barre education.</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
