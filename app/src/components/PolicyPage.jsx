import { useEffect, useRef, useState } from 'react';
import { EMAIL } from '../site.js';
import { POLICIES, POLICY_ORDER } from '../policies.js';
import { SiteProvider } from './Site.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const HEAD = { background: 'var(--ink)', color: 'var(--paper)' };

export default function PolicyPage({ slug }) {
  const policy = POLICIES[slug];
  const [active, setActive] = useState(policy.toc[0].id);
  const tabsRef = useRef(null);

  useEffect(() => {
    // Land at the top of the page when arriving from a link (not at the previous scroll position).
    try { history.scrollRestoration = 'manual'; } catch { /* unsupported */ }
    if (!location.hash) scrollTo(0, 0);
    const onShow = () => { if (!location.hash) scrollTo(0, 0); };
    addEventListener('pageshow', onShow);

    // "Back to top" and links to this same page scroll up smoothly instead of jumping.
    const onClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === '#top' || href === `./${slug}`) {
        e.preventDefault();
        scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', onClick);

    // On phones the policy switcher scrolls sideways: bring the current tab into view.
    const tabs = tabsRef.current;
    const current = tabs?.querySelector('[aria-current]');
    if (current && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = current.offsetLeft - 20;

    // Highlight the section being read: the last heading above 30% of the screen, or the last one at the very end.
    const heads = policy.toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    const pick = () => {
      let cur = heads[0];
      heads.forEach((h) => { if (h.getBoundingClientRect().top < innerHeight * 0.3) cur = h; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = heads[heads.length - 1];
      setActive(cur.id);
    };
    const onScroll = () => requestAnimationFrame(pick);
    addEventListener('scroll', onScroll, { passive: true });
    pick();

    return () => {
      removeEventListener('pageshow', onShow);
      document.removeEventListener('click', onClick);
      removeEventListener('scroll', onScroll);
    };
  }, [policy, slug]);

  return (
    <SiteProvider home="./">
      <div id="top" className="u site policy-page">
        <div className="ph dk" style={HEAD}>
          <Header />
        </div>
        <main>
          <section className="phead">
            <div className="w">
              <h1>{policy.title}</h1>
              <p className="lede">{policy.lede}</p>
              <nav ref={tabsRef} className="ptabs" aria-label="Policies">
                {POLICY_ORDER.map((s) => (
                  <a key={s} href={`./${s}`} aria-current={s === slug ? 'page' : undefined}>{POLICIES[s].title}</a>
                ))}
              </nav>
            </div>
          </section>
          <div className="w">
            <div className="pgrid">
              <aside className="ptoc">
                <p>On this page</p>
                <ol>
                  {policy.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} aria-current={t.id === active ? 'true' : undefined}>{t.label}</a>
                    </li>
                  ))}
                </ol>
              </aside>
              <article className="prose">
                {/* Approved legal wording, rendered verbatim from src/policies.js (our own static content). */}
                <div dangerouslySetInnerHTML={{ __html: policy.html }} />
                <aside className="pask" aria-label="Questions">
                  <div>
                    <h3>Questions about this policy?</h3>
                    <p>Email us and we’ll help.</p>
                  </div>
                  <a className="cta" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </aside>
              </article>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </SiteProvider>
  );
}
