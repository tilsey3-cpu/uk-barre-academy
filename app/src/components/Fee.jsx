import { Check } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { TYPEFORM_URL } from '../typeform.js';

const INCLUDED = [
  'Eight hours of practical, in-person training',
  'The complete UK Barre Academy eight-module method',
  'A comprehensive course handbook',
  'UK Barre Academy certification upon successful completion',
  'Founding Instructor recognition',
  'Priority access to future UK Barre Academy training',
];

export default function Fee() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5 mb-12">
          <p className="eyebrow">Founding Instructor Course Fee</p>
          <h2 className="h-display max-w-2xl text-balance">An exclusive introductory rate.</h2>
        </Reveal>

        <Reveal y={18} className="card max-w-md mx-auto flex flex-col gap-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs uppercase tracking-widest text-muted font-semibold">One-off enrolment</p>
            <span className="pill bg-black text-white text-xs uppercase tracking-widest font-semibold px-4 py-2 whitespace-nowrap">
              Founding rate
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-light tracking-tight mb-2">Founding Instructor Course</h3>
            <p className="text-muted leading-relaxed">
              One intensive training day with Maggie Paterson &mdash; the complete method, certification and
              ongoing support included.
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-light tracking-tight">&pound;250</span>
            <span className="text-xl text-muted line-through">&pound;500</span>
          </div>
          <p className="text-sm text-muted -mt-4">One-time &middot; limited to the founding cohort</p>

          <div className="border-t border-line pt-6 flex flex-col gap-4">
            {INCLUDED.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check size={18} className="text-black shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <a href="#curriculum" className="text-sm underline underline-offset-4 self-start">
            View the full curriculum
          </a>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill text-center bg-black text-white px-6 py-4 text-sm hover:opacity-85"
          >
            Register your interest
          </a>
        </Reveal>

        <p className="text-center text-muted leading-relaxed max-w-lg mx-auto mt-8">
          Founding Instructors receive an exclusive 50% introductory rate in recognition of joining
          the academy&rsquo;s inaugural cohort and providing constructive feedback following the course.
          Places are limited to the first Founding Instructor cohort only.
        </p>
      </div>
    </section>
  );
}
