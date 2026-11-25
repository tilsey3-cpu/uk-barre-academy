import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../asset.js';
import { EMAIL, ROUTES } from '../site.js';
import { ALL_CLIPS, VIDEO_GROUPS, clipMinutes, thumbSrc, videoSrc } from '../videos.js';

// The trainee's practice companion: one clip plays large, the module's other parts sit beside it,
// and each trainee's "practised" ticks are remembered on their own device.

const STORE = 'uba-practised-v1';
const mins = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const readStore = () => {
  try { return new Set(JSON.parse(localStorage.getItem(STORE) || '[]')); } catch { return new Set(); }
};
const writeStore = (set) => {
  try { localStorage.setItem(STORE, JSON.stringify([...set])); } catch { /* private mode: progress lasts this visit */ }
};

function Tick({ on }) {
  return (
    <svg className={`vl-tick${on ? ' on' : ''}`} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.8 10.4l2.7 2.7 5.7-6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stage({ clip, done, onToggle, onPick, autoplay, onEnded }) {
  const g = clip.group;
  const idx = ALL_CLIPS.indexOf(clip);
  const prev = ALL_CLIPS[idx - 1];
  const next = ALL_CLIPS[idx + 1];
  const partNo = g.videos.findIndex((v) => v.file === clip.file) + 1;

  return (
    <section className="vl-stage dk" aria-label="Now playing">
      <div className={`w vl-stage-grid${clip.wide ? ' is-wide' : ''}`}>
        <div className={`vl-screen${clip.wide ? ' is-wide' : ''}`}>
          <video
            key={clip.id}
            src={videoSrc(clip.file)}
            poster={thumbSrc(clip.file)}
            controls
            playsInline
            preload="metadata"
            autoPlay={autoplay}
            controlsList="nodownload"
            onEnded={onEnded}
          />
        </div>

        <div className="vl-info">
          <h2 className="vl-now">{g.title}: {clip.title}</h2>
          <p className="vl-clip">
            {g.name} · Part {partNo} of {g.videos.length} · {mins(clip.secs)}
            {g.assessment && <span className="vl-assess-tag"> · Assessment module</span>}
          </p>

          <div className="vl-actions">
            <button type="button" className={`vl-done${done.has(clip.id) ? ' on' : ''}`} onClick={() => onToggle(clip.id)} aria-pressed={done.has(clip.id)}>
              <Tick on={done.has(clip.id)} />
              {done.has(clip.id) ? 'Practised' : 'Mark as practised'}
            </button>
            <div className="vl-step">
              <button type="button" onClick={() => prev && onPick(prev, true)} disabled={!prev} aria-label="Previous video">←</button>
              <button type="button" onClick={() => next && onPick(next, true)} disabled={!next} aria-label="Next video">→</button>
            </div>
          </div>

          <ol className="vl-parts" aria-label={`${g.title} videos`}>
            {g.videos.map((v, i) => {
              const c = ALL_CLIPS.find((x) => x.group === g && x.file === v.file);
              const cur = c.id === clip.id;
              return (
                <li key={c.id}>
                  <button type="button" className={cur ? 'cur' : ''} aria-current={cur || undefined} onClick={() => onPick(c, true)}>
                    <img src={thumbSrc(v.file)} alt="" loading="lazy" decoding="async" />
                    <span className="vl-pt">
                      <span>{v.title}</span>
                      <span className="vl-pm">{cur ? 'Now playing' : v.title.startsWith('Part') ? mins(v.secs) : `Part ${i + 1} · ${mins(v.secs)}`}</span>
                    </span>
                    <Tick on={done.has(c.id)} />
                  </button>
                </li>
              );
            })}
          </ol>
          {next && next.group !== g && (
            <button type="button" className="vl-nextmod" onClick={() => onPick(next, true)}>
              Up next: {next.group.title} →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default function VideosPage() {
  const [clip, setClip] = useState(ALL_CLIPS[0]);
  const [done, setDone] = useState(() => new Set());
  const [autoplay, setAutoplay] = useState(false);
  const top = useRef(null);

  // Progress lives in this browser only; read it after hydration so the server and client markup match.
  useEffect(() => {
    const saved = readStore();
    setDone(saved);
    const first = ALL_CLIPS.find((c) => !saved.has(c.id));
    if (first) setClip(first);
  }, []);

  const toggle = useCallback((id) => {
    setDone((cur) => {
      const n = new Set(cur);
      n.has(id) ? n.delete(id) : n.add(id);
      writeStore(n);
      return n;
    });
  }, []);

  const pick = useCallback((c, play) => {
    setClip(c);
    setAutoplay(play);
    const el = top.current;
    if (el && el.getBoundingClientRect().top < -40) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, []);

  // A finished clip counts as practised; the trainee moves on when they are ready.
  const ended = useCallback(() => {
    setDone((cur) => {
      if (cur.has(clip.id)) return cur;
      const n = new Set(cur).add(clip.id);
      writeStore(n);
      return n;
    });
  }, [clip]);

  const count = done.size;
  const total = ALL_CLIPS.length;
  const pct = Math.round((count / total) * 100);
  const totalMins = useMemo(() => clipMinutes(ALL_CLIPS), []);

  return (
    <div id="top" className="u site vl-page">
      <header className="vl-bar dk">
        <div className="w vl-bar-in">
          <a href={ROUTES.home} className="vl-logo"><img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" /></a>
          <div className="vl-prog" aria-label={`${count} of ${total} videos practised`}>
            <span className="vl-prog-n">{count} of {total} practised</span>
            <span className="vl-prog-bar" aria-hidden="true"><span style={{ transform: `scaleX(${count / total})` }} /></span>
          </div>
        </div>
      </header>

      <div className="vl-intro dk">
        <div className="w vl-intro-in">
          <h1>Your practice library</h1>
          <p>Maggie demonstrates every part of the eight UBA modules: {total} videos, about {totalMins} minutes. Practise along, tick each one off, and build towards your video assessment.</p>
        </div>
      </div>

      <div ref={top} className="vl-anchor" />
      <Stage clip={clip} done={done} onToggle={toggle} onPick={pick} autoplay={autoplay} onEnded={ended} />

      <main className="w vl-main">
        <section className="vl-assess" aria-labelledby="assess-h">
          <div>
            <h2 id="assess-h">Preparing for your assessment</h2>
            <p>Film yourself teaching three UBA modules to at least two participants. One of the three must be Module 5 or Module 7, so give those extra time.</p>
          </div>
          <div className="vl-assess-mods">
            {VIDEO_GROUPS.filter((g) => g.assessment).map((g) => {
              const clips = ALL_CLIPS.filter((c) => c.group === g);
              const d = clips.filter((c) => done.has(c.id)).length;
              return (
                <button key={g.id} type="button" onClick={() => pick(clips.find((c) => !done.has(c.id)) || clips[0], true)}>
                  <span className="vl-am-t">{g.title}</span>
                  <span className="vl-am-n">{g.name}</span>
                  <span className="vl-am-p">{d} of {clips.length} practised</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="vl-mods" aria-labelledby="mods-h">
          <div className="vl-mods-h">
            <h2 id="mods-h">All modules</h2>
            <p>{pct}% practised</p>
          </div>
          {VIDEO_GROUPS.map((g) => {
            const clips = ALL_CLIPS.filter((c) => c.group === g);
            const d = clips.filter((c) => done.has(c.id)).length;
            const complete = d === clips.length;
            return (
              <article key={g.id} id={g.id} className="vl-mod">
                <header className="vl-mod-h">
                  <h3>{g.title}</h3>
                  <p className="vl-mod-n">{g.name}</p>
                  <p className="vl-mod-m">
                    {clips.length} {clips.length === 1 ? 'video' : 'videos'} · {clipMinutes(clips) || '<1'} min
                    <span className={complete ? 'ok' : ''}>{complete ? ' · Complete' : ` · ${d} of ${clips.length} practised`}</span>
                    {g.assessment && <span className="vl-assess-tag"> · Assessment module</span>}
                  </p>
                </header>
                <ul className="vl-strip">
                  {clips.map((c) => {
                    const cur = c.id === clip.id;
                    return (
                      <li key={c.id} className={c.wide ? 'is-wide' : ''}>
                        <button type="button" className={`vl-thumb${cur ? ' cur' : ''}`} onClick={() => pick(c, true)} aria-label={`Play ${g.title}, ${c.title}`}>
                          <img src={thumbSrc(c.file)} alt="" loading="lazy" decoding="async" />
                          <span className="vl-dur">{mins(c.secs)}</span>
                          {done.has(c.id) && <span className="vl-thumb-ok"><Tick on /></span>}
                          {cur && <span className="vl-thumb-now">Now playing</span>}
                        </button>
                        <p>{c.title}</p>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </section>

        <p className="vl-help">Your ticks are saved on this device. Trouble playing a video? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </main>

      <footer className="vl-foot dk">
        <div className="w">
          <img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" loading="lazy" />
          <p>For UK Barre Academy trainees. Please keep this link to yourself.</p>
        </div>
      </footer>
    </div>
  );
}
