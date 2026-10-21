import { sx } from '../lib/sx.js';
import Picture from './Picture.jsx';

const GRADE = 'filter: saturate(0.8) contrast(1.05) brightness(0.99) sepia(0.08);';
const CHIP = 'position: absolute; padding: 12px 16px; border-radius: 12px; background: var(--warm); color: var(--paper); text-align: center;';

const PHOTOS = [
  {
    name: 'uba-006',
    alt: 'Maggie Paterson demonstrating a port de bras',
    img: sx(`display: block; width: 100%; aspect-ratio: 4 / 4.4; max-height: 340px; object-fit: cover; object-position: 52% 18%; ${GRADE}`),
    chip: sx(`${CHIP} right: -10px; bottom: -14px;`),
    n: '40+',
    l: 'Years teaching',
    sizes: '(max-width: 760px) calc(100vw - 40px), 34vw',
  },
  {
    name: 'uba-185',
    alt: 'The cohort lined up at the barre, arms lifted',
    img: sx(`display: block; width: 100%; aspect-ratio: 4 / 3.6; max-height: 400px; object-fit: cover; object-position: 55% 30%; ${GRADE}`),
    chip: sx(`${CHIP} left: 16px; top: 16px;`),
    n: '8',
    l: 'Method modules',
    sizes: '(max-width: 760px) calc(50vw - 26px), 40vw',
  },
  {
    name: 'uba-086',
    alt: 'Maggie correcting a trainee’s position at the barre',
    img: sx(`display: block; width: 100%; aspect-ratio: 4 / 4.4; max-height: 340px; object-fit: cover; object-position: 50% 28%; ${GRADE}`),
    chip: sx(`${CHIP} left: -10px; top: -14px;`),
    n: '01',
    l: 'Founding cohort',
    sizes: '(max-width: 760px) calc(50vw - 26px), 34vw',
  },
];

const S = {
  section: sx('background: var(--cream);'),
  h2: sx('margin: 0 auto; max-width: 900px;'),
  body: sx('margin: 20px auto 0; max-width: 600px; color: var(--muted);'),
  photos: sx('margin-top: clamp(32px, 6vh, 56px);'),
  figure: sx('margin: 0; position: relative;'),
  zoom: sx('border-radius: 16px;'),
  chipN: sx('display: block; font-size: 22px; line-height: 1.1; letter-spacing: -0.03em;'),
  chipL: sx('display: block; font-size: 12px; color: rgba(255,255,255,0.75);'),
};

export default function Maggie() {
  return (
    <section id="maggie" className="panel" style={S.section}>
      <div className="w">
        <div style={{ textAlign: 'center' }}>
          <h2 className="rv t-h2" style={S.h2}>Forty years of movement, in one method.</h2>
          <p className="rv t-body" style={S.body}>
            Maggie Paterson, founder of UK Barre Academy, brings her experience across ballet, dance, Pilates, yoga and
            fitness to every module, from alignment and core strength to musicality and confident class delivery.
          </p>
        </div>
        <div className="mag-photos" style={S.photos}>
          {PHOTOS.map((p) => (
            <figure key={p.name} className="rv" style={S.figure}>
              <div className="zoom" style={S.zoom}>
                <Picture name={p.name} alt={p.alt} sizes={p.sizes} style={p.img} />
              </div>
              <span className="mag-chip" style={p.chip}>
                <span style={S.chipN}>{p.n}</span>
                <span style={S.chipL}>{p.l}</span>
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
