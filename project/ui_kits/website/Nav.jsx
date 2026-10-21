// Nav.jsx — UBA top navigation
const { useState, useEffect } = React;

function Nav({ onApply }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Positioning', 'Certification', 'The Difference', 'About'];

  return (
    <nav className={`uba-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="uba-nav__inner">
        <a href="#" className="uba-nav__logo">
          UBA<sup>©</sup>
        </a>
        <div className="uba-nav__links">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`}>{l}</a>
          ))}
        </div>
        <button className="uba-btn uba-btn--primary uba-btn--sm" onClick={onApply}>
          Enquire now
        </button>
      </div>
    </nav>
  );
}

window.Nav = Nav;
