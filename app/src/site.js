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
};

export const SOLD_OUT = { date: 'Sunday 25 October', venue: 'City Academy', area: 'Clerkenwell', postcode: 'EC1R 5EG' };

// The "Dates & fee" strip, oldest first. `open` marks the bookable date.
export const COURSE_DATES = [
  { date: 'Sunday 4 October 2026', note: 'Founding cohort · Completed', open: false },
  { date: 'Sunday 25 October 2026', note: 'City Academy, Clerkenwell', open: false },
  { date: NEXT_DATE.long, note: `${NEXT_DATE.venue}, ${NEXT_DATE.area}`, open: true },
];

export const PRICE = { now: '£250', was: '£500' };

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
