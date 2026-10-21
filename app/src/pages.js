import { NEXT_DATE } from './site.js';
import { POLICIES, POLICY_ORDER } from './policies.js';

// Every route that gets pre-rendered. `file` is the HTML written to dist/ (served at the extensionless path).
export const PAGES = {
  home: {
    file: 'index.html',
    path: '/',
    title: 'UK Barre Academy — Barre Instructor Certification, CPD Accredited',
    description: `UK Barre Academy’s one-day, CPD-accredited Barre instructor certification in London, with the next cohort on ${NEXT_DATE.long} at ${NEXT_DATE.venue}, ${NEXT_DATE.area}.`,
  },
  ...Object.fromEntries(
    POLICY_ORDER.map((slug) => [
      slug,
      { file: `${slug}.html`, path: `/${slug}`, title: POLICIES[slug].docTitle, description: POLICIES[slug].description },
    ])
  ),
};

export const pageFromPath = (pathname) => {
  const slug = pathname.replace(/^.*\//, '').replace(/\.html$/, '');
  return PAGES[slug] ? slug : 'home';
};
