import MarqueeBanner from './components/MarqueeBanner.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import StatsStrip from './components/StatsStrip.jsx';
import Invitation from './components/Invitation.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Method from './components/Method.jsx';
import Founder from './components/Founder.jsx';
import Curriculum from './components/Curriculum.jsx';
import WhoFor from './components/WhoFor.jsx';
import WhatReceive from './components/WhatReceive.jsx';
import Fee from './components/Fee.jsx';
import Dates from './components/Dates.jsx';
import RegisterCta from './components/RegisterCta.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="bg-white text-black">
      <MarqueeBanner />
      <Header />
      <Hero />
      <StatsStrip />
      <Invitation />
      <HowItWorks />
      <Method />
      <Founder />
      <Curriculum />
      <WhoFor />
      <WhatReceive />
      <Dates />
      <Fee />
      <RegisterCta />
      <Footer />
    </div>
  );
}
