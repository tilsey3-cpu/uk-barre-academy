import { STRIPE_URL, external } from '../site.js';
import { useSite } from './Site.jsx';

// Every Book button opens the "Before you book" terms step. The Stripe href is the no-JavaScript fallback.
export default function BookLink({ className = 'btn', style, children }) {
  const { openBook } = useSite();
  return (
    <a className={className} href={STRIPE_URL} {...external} aria-haspopup="dialog" onClick={openBook} style={style}>
      {children}
    </a>
  );
}
