import { NEXT_DATE, NEXT_YEAR, PRICE, SOLD_OUT } from './site.js';
import { POLICIES, POLICY_ORDER } from './policies.js';
import { VIDEOS_SLUG } from './videos.js';

// Every route that gets pre-rendered. `file` is the HTML written to dist/ (served at the extensionless path).
export const PAGES = {
  home: {
    file: 'index.html',
    path: '/',
    // Google shows about 60 characters of a title and 155 of a description.
    title: 'UK Barre Academy | Barre Instructor Certification, London',
    description: `One-day, CPD-accredited Barre instructor certification in London with Maggie Paterson. ${SOLD_OUT ? `${NEXT_DATE.dayMonth} cohort sold out, join the waitlist.` : `Next cohort ${NEXT_DATE.dayMonth}, ${PRICE.now}.`} Register your interest in ${NEXT_YEAR.year} dates.`,
  },
  ...Object.fromEntries(
    POLICY_ORDER.map((slug) => [
      slug,
      { file: `${slug}.html`, path: `/${slug}`, title: POLICIES[slug].docTitle, description: POLICIES[slug].description },
    ])
  ),
  // Hidden: only reachable by its link. Left out of the sitemap and marked noindex.
  [VIDEOS_SLUG]: {
    file: `${VIDEOS_SLUG}.html`,
    path: `/${VIDEOS_SLUG}`,
    hidden: true,
    title: 'Practice library | UK Barre Academy',
    description: 'Practice videos from Maggie Paterson for UK Barre Academy trainees.',
  },
};

export const pageFromPath = (pathname) => {
  const slug = pathname.replace(/^.*\//, '').replace(/\.html$/, '');
  return PAGES[slug] ? slug : 'home';
};
