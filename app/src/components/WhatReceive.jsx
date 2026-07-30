import { CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal.jsx';

const ITEMS = [
  'Eight hours of practical, in-person training',
  'The complete UK Barre Academy eight-module method',
  'A comprehensive course handbook',
  'Practical teaching guidance',
  'Cueing and class-planning support',
  'Individual feedback and coaching',
  'Continuous practical assessment',
  'Final teaching assessment',
  'UK Barre Academy certification upon successful completion',
  'Founding Instructor recognition',
  'Priority access to future UK Barre Academy training',
  'Ongoing post-course support',
];

export default function WhatReceive() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-12">
          <p className="eyebrow">What Will I Receive?</p>
          <h2 className="h-display max-w-2xl text-balance">Founding Instructors will receive:</h2>
        </Reveal>

        <Reveal as="ul" stagger={0.04} y={12} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {ITEMS.map((item) => (
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
