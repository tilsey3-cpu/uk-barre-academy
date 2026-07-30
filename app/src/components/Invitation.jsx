import Reveal from './Reveal.jsx';

export default function Invitation() {
  return (
    <section className="bg-white py-24">
      <Reveal className="max-w-container mx-auto px-6 flex flex-col items-center text-center gap-5">
        <p className="eyebrow">The Invitation</p>
        <h2 className="h-display max-w-2xl text-balance">A new standard for Barre education, from day one.</h2>
        <div className="max-w-2xl flex flex-col gap-4 text-muted text-base leading-relaxed pt-2">
          <p>UK Barre Academy is inviting a small group of qualified movement professionals to join its inaugural Founding Instructor Programme.</p>
          <p>Created by Maggie Paterson and built on more than 40 years of experience in ballet, dance, Pilates, yoga and fitness, this intensive one-day certification programme combines classical Barre technique with intelligent movement, strength, alignment, musicality and confident teaching practice.</p>
          <p>The Founding Instructor Programme is limited to just 6&ndash;10 participants and is offered at an exclusive introductory price.</p>
        </div>
      </Reveal>
    </section>
  );
}
