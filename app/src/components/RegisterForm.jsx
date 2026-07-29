import { useState } from 'react';
import { DATE_GROUPS } from '../dates.js';

const ALL_DATES = DATE_GROUPS.flatMap((g) => g.dates);

export default function RegisterForm({ selectedDates, toggleDate }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', background: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.email.trim()) {
      setError('Please provide your name and email.');
      return;
    }
    setError('');
    // TODO: no backend/Typeform is wired up yet — this only confirms client-side.
    // Replace with a real submission (Typeform, form endpoint, etc.) when ready.
    console.log('Founding Instructor registration', { ...fields, dates: selectedDates });
    setSubmitted(true);
  };

  return (
    <section id="register" className="bg-black text-white py-24">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <p className="eyebrow eyebrow-inverted">Register Your Interest</p>
          <h2 className="h-display max-w-xl text-white">Reserve your place in the founding cohort.</h2>
          <p className="text-white/70 max-w-lg">
            Tell us which dates work for you and a little about your teaching background &mdash;
            we&rsquo;ll be in touch with next steps.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-lg mx-auto text-center rounded-2xl border border-white/20 bg-white/5 px-8 py-12">
            <p className="text-xl font-light">Thank you &mdash; your interest has been registered.</p>
            <p className="text-white/70 mt-3">We&rsquo;ll be in touch with next steps.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-white/60">Name</label>
                <input
                  id="name"
                  type="text"
                  value={fields.name}
                  onChange={update('name')}
                  className="bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                  placeholder="Your full name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-white/60">Email</label>
                <input
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={update('email')}
                  className="bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-xs uppercase tracking-widest text-white/60">Phone</label>
              <input
                id="phone"
                type="tel"
                value={fields.phone}
                onChange={update('phone')}
                className="bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white"
                placeholder="Optional"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="background" className="text-xs uppercase tracking-widest text-white/60">
                Teaching background
              </label>
              <textarea
                id="background"
                rows={4}
                value={fields.background}
                onChange={update('background')}
                className="bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white resize-none"
                placeholder="Your qualifications and relevant movement or teaching experience"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/60">Date preference</span>
              <div className="flex flex-wrap gap-2">
                {ALL_DATES.map((date) => {
                  const active = selectedDates.includes(date);
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => toggleDate(date)}
                      aria-pressed={active}
                      className={`pill px-4 py-2 text-xs border ${
                        active
                          ? 'bg-white text-black border-white'
                          : 'bg-transparent text-white/80 border-white/30 hover:border-white'
                      }`}
                    >
                      {date}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              className="pill self-start mt-2 px-7 py-4 text-sm bg-white text-black hover:opacity-85"
            >
              Register your interest &nbsp;&rarr;
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
