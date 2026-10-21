export const SITE_URL = 'https://ukbarreacademy.com';
export const STRIPE_URL = 'https://book.stripe.com/00w00j10O4gC64b20Dasg02';
export const TYPEFORM_URL = 'https://form.typeform.com/to/YTm9KDH0';
export const EMAIL = 'hello@ukbarreacademy.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/ukbarreacademy/';

export const NEXT_DATE = {
  long: 'Saturday 5 December 2026',
  medium: 'Saturday 5 December',
  dayMonth: '5 December',
  short: 'Sat 5 Dec',
  shortMonth: 'Sat 5 December',
  venue: 'The Manor',
  area: 'Finsbury Park',
  postcode: 'N4 3JP',
  time: '9:30am–6:30pm',
  // Machine-readable start and end, for search engines (UK time; December is GMT).
  startISO: '2026-12-05T09:30:00+00:00',
  endISO: '2026-12-05T18:30:00+00:00',
};

// The next year's programme, announced but not yet bookable: every mention links to the interest form.
export const NEXT_YEAR = { year: '2027', title: 'New 2027 dates coming soon', cta: 'Register your interest' };

export const SOLD_OUT = { date: 'Sunday 25 October', venue: 'City Academy', area: 'Clerkenwell', postcode: 'EC1R 5EG' };

// The "Dates & fee" strip, oldest first. `open` marks the bookable date.
export const COURSE_DATES = [
  { date: 'Sunday 4 October 2026', note: 'Founding cohort · Completed', open: false },
  { date: 'Sunday 25 October 2026', note: 'City Academy, Clerkenwell', open: false },
  { date: NEXT_DATE.long, note: `${NEXT_DATE.venue}, ${NEXT_DATE.area}`, open: true },
];

export const PRICE = { now: '£250', was: '£500', amount: 250, currency: 'GBP' };

// The eight modules of the training day, in teaching order.
export const MODULES = [
  'Foundations, Warm-Up and Alignment',
  'Pilates Core Foundation',
  'Feet, Ankles, Knees and Hips',
  'Classical Barre Technique',
  'Barre Flow, Choreography and Cardio Conditioning',
  'Upper Body Strength and Arm Definition',
  'Leg Strength and Barre Conditioning',
  'Barre Stretch, Mobility and Recovery',
];

// Page routes. Relative, so they work at the domain root and in local previews.
export const ROUTES = {
  home: './',
  privacy: './privacy-policy',
  complaints: './complaints-policy',
  terms: './terms-and-conditions',
};

export const NAV = [
  { href: '#method', label: 'The method' },
  { href: '#maggie', label: 'Maggie Paterson' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#dates', label: 'Dates & fee' },
];

export const external = { target: '_blank', rel: 'noopener' };
