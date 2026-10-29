import { sx } from '../lib/sx.js';
import Picture from './Picture.jsx';

const GRADE = 'filter: saturate(0.8) contrast(1.05) brightness(0.99) sepia(0.08);';
const IMG = sx(`display: block; width: 100%; aspect-ratio: 16 / 10; max-height: 240px; object-fit: cover; ${GRADE}`);

const STEPS = [
  {
    title: 'Register your interest',
    desc: 'Tell us about your teaching background, qualifications and the date that works for you.',
    img: 'barre-instructor-trainee-london-studio',
    alt: 'A trainee at the barre between exercises',
    pos: '50% 25%',
  },
  {
    title: 'Train for one intensive day',
    desc: 'Eight modules, eight hours, delivered in person by Maggie Paterson in a professional London studio.',
    img: 'barre-instructor-training-studio-sequence',
    alt: 'Trainees moving through a sequence across the studio',
    pos: '50% 30%',
  },
  {
    title: 'Assess, certify, teach',
    desc: 'Practise for up to three months, submit your video assessment, then certify as a Founding Instructor.',
    img: 'barre-instructor-training-london-trainees',
    alt: 'Trainees laughing together along the barre',
    pos: '55% 22%',
  },
];

const S = {
  section: sx('background: var(--paper);'),
  intro: sx('margin: 0; max-width: 360px; color: var(--muted);'),
  list: sx('margin: clamp(32px, 5vh, 48px) 0 0; padding: 0; list-style: none;'),
  card: sx('border: 1px solid var(--line); border-radius: 16px; background: var(--paper); padding: 22px; display: flex; flex-direction: column; gap: 16px; overflow: hidden;'),
  top: sx('display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;'),
  num: sx('flex: 0 0 auto; width: 36px; height: 36px; border-radius: 10px; background: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600;'),
  desc: sx('color: var(--muted);'),
  imgWrap: sx('display: block; margin-top: auto; border-radius: 12px;'),
};

export default function HowItWorks() {
  return (
    <section id="how" className="panel" style={S.section}>
      <div className="w">
        <div className="split">
          <div style={{ maxWidth: 640 }}>
            <h2 className="rv t-h2" style={{ margin: 0 }}>From application to Founding Instructor.</h2>
          </div>
          <p className="rv t-body" style={S.intro}>
            Three steps, one day in the studio, and up to three months to practise before your assessment.
          </p>
        </div>
        <ol className="steps" style={S.list}>
          {STEPS.map((s, i) => (
            <li key={s.title} className="rv lift" style={S.card}>
              <span style={S.top}>
                <span className="t-h3">{s.title}</span>
                <span style={S.num}>{i + 1}</span>
              </span>
              <span className="t-small" style={S.desc}>{s.desc}</span>
              <span className="step-img zoom" style={S.imgWrap}>
                <Picture name={s.img} alt={s.alt} sizes="(max-width: 760px) calc(100vw - 84px), (max-width: 1080px) 33vw, 400px" style={{ ...IMG, objectPosition: s.pos }} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
