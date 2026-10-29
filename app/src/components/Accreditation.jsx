import { asset } from '../asset.js';
import { sx } from '../lib/sx.js';
import { Award } from './Icons.jsx';

// The two accreditation marks, shared by the hero, the accreditation band and the footer.
// CIMSPA: organisation-level Education Partner only; keep it away from course-specific claims.

const S = {
  cpd: sx('display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 9999px; background: linear-gradient(135deg, #f5e5a8 0%, var(--gold) 30%, var(--gold-deep) 55%, var(--gold) 85%); color: var(--paper); font-size: 12px; font-weight: 600; letter-spacing: 0.04em; text-shadow: 0 1px 2px rgba(120,80,0,0.4); white-space: nowrap;'),
  cimspa: sx('display: block; width: auto;'),
};

export function CpdBadge({ style }) {
  return <span style={{ ...S.cpd, ...style }}><Award />CPD accredited</span>;
}

export function CimspaLogo({ white = false, height = 48, eager = false, style }) {
  return (
    <img
      src={asset(`media/accreditation/cimspa-education-partner${white ? '-white' : ''}.png`)}
      alt="CIMSPA Education Partner"
      width="553"
      height="160"
      loading={eager ? 'eager' : 'lazy'}
      style={{ ...S.cimspa, height, ...style }}
    />
  );
}
