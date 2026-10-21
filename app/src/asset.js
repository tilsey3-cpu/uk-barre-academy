// Relative, so the page works at a domain root or under a subpath, and so the
// pre-rendered HTML and the hydrating client produce identical URLs.
export const asset = (path) => `./${path}`;
