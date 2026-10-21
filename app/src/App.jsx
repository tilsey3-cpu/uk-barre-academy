import HomePage from './components/HomePage.jsx';
import PolicyPage from './components/PolicyPage.jsx';

export default function App({ page }) {
  return page === 'home' ? <HomePage /> : <PolicyPage slug={page} />;
}
