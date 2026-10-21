const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Check = ({ size = 18, color, style }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth="2.2" style={{ stroke: color || 'currentColor', ...style }}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Award = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" {...line} strokeWidth="2.2">
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </svg>
);

export const Sound = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" {...line} strokeWidth="2">
    <path d="M11 5 6 9H2v6h4l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 5a10 10 0 0 1 0 14" />
  </svg>
);

export const Clock = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" {...line} strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const Instagram = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" {...line} strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

export const Menu = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" {...line} strokeWidth="2">
    <path d="M4 8h16" />
    <path d="M4 16h16" />
  </svg>
);

export const Close = ({ size = 18 }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth="2">
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

export const Lock = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" {...line} strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const QuoteMark = ({ fill }) => (
  <svg aria-hidden="true" width="20" height="16" viewBox="0 0 20 16" style={{ fill }}>
    <path d="M0 16V9.6C0 4.3 2.7 1.1 8 0l.9 2.1C6 3 4.6 4.8 4.4 7.2H8V16H0zm11 0V9.6C11 4.3 13.7 1.1 19 0l.9 2.1C17 3 15.6 4.8 15.4 7.2H19V16h-8z" />
  </svg>
);
