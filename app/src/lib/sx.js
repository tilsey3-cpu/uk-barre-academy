// Turns a CSS declaration string into a React style object, so styles can be
// copied verbatim from the approved reference design. Call at module level.
const camel = (prop) => {
  if (prop.startsWith('--')) return prop;
  if (prop.startsWith('-webkit-')) return 'Webkit' + camel(prop.slice(8)).replace(/^./, (c) => c.toUpperCase());
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
};

export function sx(css) {
  const out = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    if (prop) out[camel(prop)] = decl.slice(i + 1).trim();
  }
  return out;
}
