import { useState } from 'react';
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
import RegisterForm from './components/RegisterForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [selectedDates, setSelectedDates] = useState([]);

  const toggleDate = (date) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <div className="bg-white text-black">
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
      <Fee />
      <Dates selectedDates={selectedDates} toggleDate={toggleDate} />
      <RegisterForm selectedDates={selectedDates} toggleDate={toggleDate} />
      <Footer />
    </div>
  );
}
