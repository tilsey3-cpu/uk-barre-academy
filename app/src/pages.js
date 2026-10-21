import { NEXT_DATE, NEXT_YEAR, PRICE } from './site.js';
import { POLICIES, POLICY_ORDER } from './policies.js';

// Every route that gets pre-rendered. `file` is the HTML written to dist/ (served at the extensionless path).
export const PAGES = {
  home: {
    file: 'index.html',
    path: '/',
    // Google shows about 60 characters of a title and 155 of a description.
    title: 'UK Barre Academy | Barre Instructor Certification, London',
    description: `One-day, CPD-accredited Barre instructor certification in London with Maggie Paterson. Next cohort ${NEXT_DATE.dayMonth}, ${PRICE.now}. Register your interest in ${NEXT_YEAR.year} dates.`,
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
