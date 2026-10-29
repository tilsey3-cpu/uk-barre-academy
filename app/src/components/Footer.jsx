import { asset } from '../asset.js';
import { sx } from '../lib/sx.js';
import { ACCREDITATION, EMAIL, INSTAGRAM_URL, NAV, NEXT_DATE, NEXT_YEAR, PAST_VENUE, ROUTES, TYPEFORM_URL, external } from '../site.js';
import { useSite } from './Site.jsx';
import { Instagram } from './Icons.jsx';
import { CimspaLogo } from './Accreditation.jsx';

const S = {
  footer: sx('background: var(--ink); color: var(--paper);'),
  inner: sx('padding-top: 64px; padding-bottom: 28px;'),
  logo: sx('height: 42px; width: auto; display: block;'),
  cimspa: sx('margin-top: 20px;'),
  about: sx('margin: 20px 0 0; max-width: 320px; color: rgba(255,255,255,0.65);'),
  label: sx('margin: 0 0 14px; color: var(--quiet);'),
  list: sx('margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px;'),
  link: sx('text-decoration: none;'),
  dim: sx('color: rgba(255,255,255,0.6);'),
  insta: sx('margin-top: 16px; display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 18px 0 12px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.25); font-weight: 500; text-decoration: none;'),
  base: sx('margin-top: 48px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.14); display: flex; flex-wrap: wrap; gap: 10px 28px; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.55);'),
  baseLinks: sx('display: flex; flex-wrap: wrap; gap: 8px 22px;'),
};

export default function Footer() {
  const { home } = useSite();
  return (
    <footer className="dk" style={S.footer}>
      <div className="w" style={S.inner}>
        <div className="foot">
          <div>
            <img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="128" height="42" style={S.logo} loading="lazy" />
            <p className="t-small" style={S.about}>
              A new standard for Barre education, founded by Maggie Paterson. {ACCREDITATION}
            </p>
            <CimspaLogo white height={40} style={S.cimspa} />
          </div>
          <nav aria-label="Footer" className="t-small">
            <p className="t-label" style={S.label}>Explore</p>
            <ul style={S.list}>
              {NAV.map((n) => (
                <li key={n.href}><a href={home + n.href} style={S.link}>{n.label}</a></li>
              ))}
              <li><a href={ROUTES.terms} style={S.link}>Terms &amp; Conditions</a></li>
            </ul>
          </nav>
          <div className="t-small">
            <p className="t-label" style={S.label}>Venues</p>
            <p style={{ margin: 0 }}>
              {NEXT_DATE.venue}
              <br />
              <span style={S.dim}>{NEXT_DATE.area}, {NEXT_DATE.postcode}</span>
            </p>
            <p style={{ margin: '12px 0 0' }}>
              {PAST_VENUE.venue}
              <br />
              <span style={S.dim}>{PAST_VENUE.area}, {PAST_VENUE.postcode}</span>
            </p>
          </div>
          <div className="t-small">
            <p className="t-label" style={S.label}>Contact</p>
            <p style={{ margin: 0 }}><a className="ul" href={`mailto:${EMAIL}`} style={S.link}>{EMAIL}</a></p>
            <p style={{ margin: '12px 0 0' }}>
              <a href={TYPEFORM_URL} {...external} style={S.link}>Register for {NEXT_YEAR.year} dates →</a>
            </p>
            <a className="btn" href={INSTAGRAM_URL} {...external} style={S.insta}><Instagram />@ukbarreacademy</a>
          </div>
        </div>
        <div style={S.base}>
          <span>© 2026 UK Barre Academy</span>
          <span style={S.baseLinks}>
            <a href={ROUTES.privacy} style={S.link}>Privacy Policy</a>
            <a href={ROUTES.complaints} style={S.link}>Complaints Policy</a>
            <a href={ROUTES.terms} style={S.link}>Terms &amp; Conditions</a>
            <a href="#top" style={S.link}>Back to top ↑</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
