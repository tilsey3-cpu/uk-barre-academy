import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal.jsx';

const INCLUDED_ITEMS = [
  'Full practical training day',
  '8-module UBA Method',
  'Training manual and workbook',
  'Teaching resources and class-planning guidance',
  'Up to 3 months to practise',
  'Practical video assessment',
  'Certification following successful assessment',
  'CPD-accredited specialist Barre training',
  'No compulsory annual membership',
  'No ongoing licence or per-class fees',
];

export default function WhatReceive() {
  return (
    <section id="what-will-i-receive" className="bg-white py-24 scroll-mt-36">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-14">
          <p className="eyebrow">What Will I Receive?</p>
          <h2 className="h-display max-w-2xl text-balance">Founding Instructors will receive:</h2>
        </Reveal>

        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xl sm:text-2xl leading-snug text-balance">
            Following successful completion of your practical assessment, you&rsquo;ll be recognised as a{' '}
            <span className="font-medium">UK Barre Academy Certified Instructor</span> &mdash; CPD accredited.
          </p>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.06}
          y={16}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto mb-16"
        >
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-lg">The framework, not a script</h3>
            <p className="text-muted leading-relaxed">
              UBA gives you the formula, technique and teaching structure, then shows you how to combine it
              with the experience you already bring &mdash; whether that&rsquo;s Pilates precision, PT
              progression, yoga flow or dance artistry.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-lg">No compulsory ongoing fees</h3>
            <p className="text-muted leading-relaxed">
              Once certified, there&rsquo;s no annual membership, licence fee or per-class fee to keep
              teaching the method. Individual employers, venues and insurers may have their own requirements.
            </p>
          </div>
        </Reveal>

        <Reveal className="flex flex-col items-center text-center gap-3 mb-8">
          <h3 className="text-lg">Your course fee includes</h3>
        </Reveal>

        <Reveal as="ul" stagger={0.04} y={12} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {INCLUDED_ITEMS.map((item) => (
            <li key={item} className="card flex items-start gap-3 transition-transform duration-300 hover:-translate-y-0.5">
              <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
