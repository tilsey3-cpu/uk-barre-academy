import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { pageFromPath } from './pages.js';
import './home.css';

const root = document.getElementById('root');
const page = root.dataset.page || pageFromPath(location.pathname);
const app = (
  <React.StrictMode>
    <App page={page} />
  </React.StrictMode>
);

// Built pages arrive pre-rendered; `npm run dev` serves an empty root instead.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
