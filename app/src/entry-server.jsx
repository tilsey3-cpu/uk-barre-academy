import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { PAGES } from './pages.js';
export { homeJsonLd, jsonLdScript, llmsTxt } from './seo.js';

export const render = (page) =>
  renderToString(
    <React.StrictMode>
      <App page={page} />
    </React.StrictMode>
  );
