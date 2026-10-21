import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import MobileMenu from './MobileMenu.jsx';
import BookDialog from './BookDialog.jsx';

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

// Owns the mobile menu and the "Before you book" dialog for a page. `home` is the
// prefix for links back to homepage sections: '' on the homepage, './' elsewhere.
export function SiteProvider({ home, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const opener = useRef(null);

  const openBook = useCallback((e) => {
    e.preventDefault();
    opener.current = e.currentTarget;
    setMenuOpen(false);
    setBookOpen(true);
  }, []);

  const value = useMemo(() => ({ home, menuOpen, setMenuOpen, openBook }), [home, menuOpen, openBook]);

  return (
    <SiteContext.Provider value={value}>
      {children}
      <MobileMenu />
      <BookDialog open={bookOpen} onOpenChange={setBookOpen} opener={opener} />
    </SiteContext.Provider>
  );
}
