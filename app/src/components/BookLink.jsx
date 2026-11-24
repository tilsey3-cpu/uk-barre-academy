import { SOLD_OUT, STRIPE_URL, WAITLIST_URL, external } from '../site.js';
import { useSite } from './Site.jsx';

// Every Book button opens the "Before you book" terms step. The Stripe href is the no-JavaScript fallback.
export default function BookLink({ className = 'btn', style, children }) {
  const { openBook } = useSite();
  // While the next date is sold out, every Book button goes straight to the waitlist form (no terms step: nothing is being paid for).
  if (SOLD_OUT) {
    return (
      <a className={className} href={WAITLIST_URL} {...external} style={style}>
        {children}
      </a>
    );
  }
  return (
    <a className={className} href={STRIPE_URL} {...external} aria-haspopup="dialog" onClick={openBook} style={style}>
      {children}
    </a>
  );
}
