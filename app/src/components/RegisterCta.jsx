import Reveal from './Reveal.jsx';

export default function RegisterCta({ onOpenDateModal }) {
  return (
    <section id="register" className="bg-black text-white py-24">
      <div className="max-w-container mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal className="flex flex-col items-center text-center gap-5">
          <p className="eyebrow eyebrow-inverted">Become a Founding Instructor</p>
          <h2 className="h-display max-w-xl text-white text-balance">Reserve your place in the founding cohort.</h2>
          <p className="text-white/70 max-w-lg">
            Choose the date that works for you and complete your booking securely online.
          </p>
          <button
            type="button"
            onClick={onOpenDateModal}
            className="pill mt-2 inline-flex items-center px-7 py-4 text-sm bg-white text-black hover:opacity-85"
          >
            Become a Founding Instructor &nbsp;&rarr;
          </button>
        </Reveal>
      </div>
    </section>
  );
}
