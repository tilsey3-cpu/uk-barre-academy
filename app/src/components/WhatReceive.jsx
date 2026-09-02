import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal.jsx';

const FRAMEWORK_EXAMPLES = [
  { role: 'A Pilates instructor', brings: 'may naturally bring precision and core control.' },
  { role: 'A PT', brings: 'may bring strength and progression.' },
  { role: 'A yoga teacher', brings: 'may bring mobility, breath and flow.' },
  { role: 'A dance teacher', brings: 'may bring musicality, artistry and choreography.' },
];

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
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-20">
          <p className="eyebrow">What Will I Receive?</p>
          <h2 className="h-display max-w-2xl text-balance">Founding Instructors will receive:</h2>
        </Reveal>

        <Reveal className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-20">
          <p className="eyebrow">UK Barre Academy Certification</p>
          <p className="text-muted leading-relaxed">
            Following successful completion of your practical assessment, you&rsquo;ll become a:
          </p>
          <p className="h-display max-w-xl text-balance pt-2">UK Barre Academy Certified Instructor</p>
          <p className="text-muted leading-relaxed pt-1">having completed CPD-accredited specialist Barre training.</p>
        </Reveal>

        <Reveal className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto mb-10">
          <h3 className="text-xl sm:text-2xl">The framework &mdash; not a script</h3>
          <p className="text-muted leading-relaxed">
            UK Barre Academy isn&rsquo;t about learning one choreographed class and repeating it.
          </p>
          <p className="text-muted leading-relaxed">
            We give you the formula, technique, structure and teaching framework &mdash; and show you how to
            combine these with the professional experience and personality you already have.
          </p>
        </Reveal>

        <Reveal
          as="div"
          stagger={0.05}
          y={12}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 max-w-2xl mx-auto mb-10"
        >
          {FRAMEWORK_EXAMPLES.map((item) => (
            <p key={item.role} className="text-muted leading-relaxed">
              <span className="text-black">{item.role}</span> {item.brings}
            </p>
          ))}
        </Reveal>

        <Reveal className="text-center max-w-xl mx-auto mb-20">
          <p className="text-xl sm:text-2xl text-balance">
            The formula gives you the framework.
            <br />
            Your experience makes it your class.
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto mb-20">
          <h3 className="text-xl sm:text-2xl">No compulsory ongoing fees</h3>
          <p className="text-muted leading-relaxed">
            Once certified, there is no compulsory annual UK Barre Academy membership or ongoing licence fee
            simply to continue teaching using the training you&rsquo;ve received.
          </p>
          <p className="text-muted leading-relaxed">There is also no per-class fee payable to UK Barre Academy.</p>
          <p className="text-muted leading-relaxed">
            As the Academy develops, we plan to offer further workshops, advanced training and continuing
            professional development for instructors who want to continue learning with us, but these will
            be optional opportunities.
          </p>
          <p className="text-sm text-muted pt-4 mt-2 border-t border-line">
            Individual employers, venues and insurers may have their own qualification and insurance
            requirements.
          </p>
        </Reveal>

        <Reveal className="flex flex-col items-center text-center gap-3 mb-12">
          <h3 className="text-xl sm:text-2xl">Your course fee includes</h3>
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
