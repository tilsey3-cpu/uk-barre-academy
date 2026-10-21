import { useCallback, useRef } from 'react';
import { SiteProvider } from './Site.jsx';
import Hero from './Hero.jsx';
import Film from './Film.jsx';
import Invitation from './Invitation.jsx';
import Maggie from './Maggie.jsx';
import HowItWorks from './HowItWorks.jsx';
import Curriculum from './Curriculum.jsx';
import WhoReceive from './WhoReceive.jsx';
import Reviews from './Reviews.jsx';
import DatesFee from './DatesFee.jsx';
import Faq from './Faq.jsx';
import Cta from './Cta.jsx';
import Footer from './Footer.jsx';
import BookingBar from './BookingBar.jsx';

export default function HomePage() {
  const filmFullRef = useRef(false);
  const barUpdateRef = useRef(null);
  const onFilmUpdate = useCallback(() => barUpdateRef.current?.(), []);

  return (
    <SiteProvider home="">
      <div id="top" className="u site">
        <main id="main">
          <Hero />
          <Film filmFullRef={filmFullRef} onUpdate={onFilmUpdate} />
          <Invitation />
          <Maggie />
          <HowItWorks />
          <Curriculum />
          <WhoReceive />
          <Reviews />
          <DatesFee />
          <Faq />
          <Cta />
        </main>
        <Footer />
        <BookingBar filmFullRef={filmFullRef} updateRef={barUpdateRef} />
      </div>
    </SiteProvider>
  );
}
