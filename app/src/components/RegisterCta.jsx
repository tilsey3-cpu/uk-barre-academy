import Reveal from './Reveal.jsx';
import { TYPEFORM_URL } from '../typeform.js';

export default function RegisterCta() {
  return (
    <section id="register" className="bg-black text-white py-24">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5">
          <p className="eyebrow eyebrow-inverted">Register Your Interest</p>
          <h2 className="h-display max-w-xl text-white text-balance">Reserve your place in the founding cohort.</h2>
          <p className="text-white/70 max-w-lg">
            Tell us which dates work for you and a little about your teaching background &mdash;
            we&rsquo;ll be in touch with next steps.
          </p>
          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill mt-2 inline-flex items-center px-7 py-4 text-sm bg-white text-black hover:opacity-85"
          >
            Register your interest &nbsp;&rarr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}
