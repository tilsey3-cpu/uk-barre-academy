import { FAQS, answerText } from './faqs.js';
import { EMAIL, INSTAGRAM_URL, MODULES, NEXT_DATE, NEXT_YEAR, PRICE, SITE_URL, TYPEFORM_URL } from './site.js';

// Structured data and the llms.txt summary, built from site.js so they change with the dates and prices.
// Only facts that appear on the page itself go in here.

const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#maggie-paterson`;

const COURSE_DESCRIPTION =
  'A one-day, CPD-accredited Barre instructor certification for movement professionals: eight modules combining classical Barre technique with intelligent movement, strength, alignment, musicality and confident teaching practice, followed by up to three months of practice and a video assessment.';

export function homeJsonLd() {
  const venue = {
    '@type': 'Place',
    name: NEXT_DATE.venue,
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${NEXT_DATE.area}, London`,
      postalCode: NEXT_DATE.postcode,
      addressCountry: 'GB',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': ORG_ID,
        name: 'UK Barre Academy',
        alternateName: 'UBA',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/media/uba-logo-black.png`,
        email: EMAIL,
        sameAs: [INSTAGRAM_URL],
        founder: { '@id': FOUNDER_ID },
        areaServed: 'GB',
        description: 'Independently CPD-accredited Barre instructor training in London, founded by Maggie Paterson.',
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: 'Maggie Paterson',
        jobTitle: 'Founder',
        worksFor: { '@id': ORG_ID },
        description: 'Founder of UK Barre Academy, with over 40 years of experience across ballet, dance, Pilates, yoga and fitness.',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'UK Barre Academy',
        inLanguage: 'en-GB',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'Course',
        '@id': `${SITE_URL}/#founding-instructor-course`,
        name: 'Founding Instructor Course',
        description: COURSE_DESCRIPTION,
        provider: { '@id': ORG_ID },
        inLanguage: 'en-GB',
        educationalCredentialAwarded: 'UK Barre Academy Founding Instructor certification (CPD accredited)',
        syllabusSections: MODULES.map((name) => ({ '@type': 'Syllabus', name })),
        offers: {
          '@type': 'Offer',
          category: 'Paid',
          price: PRICE.amount,
          priceCurrency: PRICE.currency,
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/#dates`,
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'Onsite',
          courseWorkload: 'PT8H',
          startDate: NEXT_DATE.startISO,
          endDate: NEXT_DATE.endISO,
          location: venue,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: answerText(f.a) },
        })),
      },
    ],
  };
}

// <script type="application/ld+json"> body; "<" is escaped so the JSON can never close the tag.
export const jsonLdScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// A plain-language summary for AI assistants and answer engines (https://llmstxt.org).
export function llmsTxt() {
  return `# UK Barre Academy

> UK Barre Academy (UBA) certifies Barre instructors in the UK. Its Founding Instructor Course is a one-day, independently CPD-accredited certification in London for qualified movement professionals, founded by Maggie Paterson (over 40 years of teaching across ballet, dance, Pilates, yoga and fitness).

## The course

- Format: one intensive day in person (${NEXT_DATE.time}), 8 modules, 8 CPD hours, cohorts of 6–10.
- After the day: up to 3 months to practise, then a practical video assessment and certification as a Founding Instructor.
- Fee: ${PRICE.now} founding rate (usually ${PRICE.was}), a one-off enrolment. No compulsory annual membership, licence or per-class fees.
- Includes: the training day, training manual and workbook, teaching resources and class planning, the video assessment and certification.
- Suitable for: Pilates instructors, yoga teachers, personal trainers, group exercise instructors, dance teachers, experienced dancers and other qualified fitness professionals adding Barre.

## Modules

${MODULES.map((m) => `- ${m}`).join('\n')}

## Next date

- ${NEXT_DATE.long}, ${NEXT_DATE.time}, at ${NEXT_DATE.venue}, ${NEXT_DATE.area}, London ${NEXT_DATE.postcode}.
- Book: ${SITE_URL}/#dates
- ${NEXT_YEAR.title}: register your interest at ${TYPEFORM_URL}

## Frequently asked questions

${FAQS.map((f) => `### ${f.q}\n\n${answerText(f.a)}`).join('\n\n')}

## Pages

- [Homepage](${SITE_URL}/): the method, Maggie Paterson, the curriculum, reviews, dates and fee
- [Terms and Conditions](${SITE_URL}/terms-and-conditions): booking, cancellations and refunds
- [Privacy Policy](${SITE_URL}/privacy-policy)
- [Complaints Policy](${SITE_URL}/complaints-policy)

## Contact

- Email: ${EMAIL}
- Instagram: ${INSTAGRAM_URL}
`;
}
