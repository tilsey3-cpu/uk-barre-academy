import HomePage from './components/HomePage.jsx';
import PolicyPage from './components/PolicyPage.jsx';
import VideosPage from './components/VideosPage.jsx';
import { VIDEOS_SLUG } from './videos.js';

export default function App({ page }) {
  if (page === 'home') return <HomePage />;
  if (page === VIDEOS_SLUG) return <VideosPage />;
  return <PolicyPage slug={page} />;
}
