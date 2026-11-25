import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../asset.js';
import { EMAIL, ROUTES } from '../site.js';
import { ALL_CLIPS, VIDEO_GROUPS, clipMinutes, thumbSrc, videoSrc } from '../videos.js';

// The trainee's practice companion. The 8 modules sit at the top as a course map; choosing one
// opens it in the player, where its parts are listed beside the video. "Practised" ticks are kept
// in this browser only (no accounts), and the page reopens at the next video not yet practised.

const STORE = 'uba-practised-v1';
const mins = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const readStore = () => {
  try { return new Set(JSON.parse(localStorage.getItem(STORE) || '[]')); } catch { return new Set(); }
};
const writeStore = (set) => {
  try { localStorage.setItem(STORE, JSON.stringify([...set])); } catch { /* private mode: progress lasts this visit */ }
};
const clipsOf = (g) => ALL_CLIPS.filter((c) => c.group === g);
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function Tick({ on, size = 20 }) {
  return (
    <svg className={`vl-tick${on ? ' on' : ''}`} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.8 10.4l2.7 2.7 5.7-6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ModuleMap({ current, done, onOpen }) {
  return (
    <ol className="vl-map" aria-label="Modules">
      {VIDEO_GROUPS.map((g, i) => {
        const clips = clipsOf(g);
        const d = clips.filter((c) => done.has(c.id)).length;
        const complete = d === clips.length;
        const active = g === current;
        return (
          <li key={g.id}>
            <button type="button" className={`vl-mc${active ? ' on' : ''}`} onClick={() => onOpen(g)} aria-current={active || undefined}>
              <span className="vl-mc-top">
                <span className="vl-mc-t">Module {i + 1}</span>
                {complete ? <Tick on size={18} /> : <span className="vl-mc-c">{d}/{clips.length}</span>}
              </span>
              <span className="vl-mc-n">{g.name}</span>
              <span className="vl-mc-foot">
                <span className="vl-mc-bar" aria-hidden="true"><span style={{ transform: `scaleX(${d / clips.length})` }} /></span>
                <span className="vl-mc-m">{g.assessment ? 'Assessment' : `${clipMinutes(clips) || 1} min`}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Player({ clip, done, onToggle, onPick, autoplay, onEnded }) {
  const g = clip.group;
  const clips = clipsOf(g);
  const idx = ALL_CLIPS.indexOf(clip);
  const prev = ALL_CLIPS[idx - 1];
  const next = ALL_CLIPS[idx + 1];
  const isDone = done.has(clip.id);

  return (
    <div className={`vl-player${clip.wide ? ' is-wide' : ''}`}>
      <div className="vl-screen">
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

      <div className="vl-panel">
        <div className="vl-panel-head">
          <h2 className="vl-now">{g.title}: {clip.title}</h2>
          <p className="vl-meta-line">
            {g.name} · {mins(clip.secs)}
            {g.assessment && <span className="vl-gold"> · Assessment module</span>}
          </p>
        </div>

        <div className="vl-actions">
          <button type="button" className={`vl-done${isDone ? ' on' : ''}`} onClick={() => onToggle(clip.id)} aria-pressed={isDone}>
            <Tick on={isDone} />
            {isDone ? 'Practised' : 'Mark as practised'}
          </button>
          <div className="vl-step">
            <button type="button" onClick={() => prev && onPick(prev)} disabled={!prev} aria-label="Previous video">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={() => next && onPick(next)} disabled={!next} aria-label="Next video">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>

        <ol className="vl-parts" aria-label={`${g.title} videos`}>
          {clips.map((c, i) => {
            const cur = c.id === clip.id;
            return (
              <li key={c.id}>
                <button type="button" className={cur ? 'cur' : ''} aria-current={cur || undefined} onClick={() => onPick(c)}>
                  <span className="vl-pi"><img src={thumbSrc(c.file)} alt="" loading="lazy" decoding="async" /></span>
                  <span className="vl-pt">
                    <span>{c.title}</span>
                    <span className="vl-pm">{cur ? 'Playing' : mins(c.secs)}</span>
                  </span>
                  <Tick on={done.has(c.id)} />
                </button>
              </li>
            );
          })}
        </ol>

        {next && (
          <button type="button" className="vl-next" onClick={() => onPick(next)}>
            <span className="vl-next-i"><img src={thumbSrc(next.file)} alt="" loading="lazy" decoding="async" /></span>
            <span className="vl-next-t">
              <span className="vl-next-l">Up next</span>
              <span>{next.group === g ? next.title : `${next.group.title}: ${next.group.name}`}</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [clip, setClip] = useState(ALL_CLIPS[0]);
  const [done, setDone] = useState(() => new Set());
  const [autoplay, setAutoplay] = useState(false);
  const stage = useRef(null);

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

  const pick = useCallback((c) => {
    setClip(c);
    setAutoplay(true);
    const el = stage.current;
    if (el && Math.abs(el.getBoundingClientRect().top) > 80) el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' });
  }, []);

  // Opening a module starts at its first video not yet practised.
  const doneRef = useRef(done);
  doneRef.current = done;
  const openModule = useCallback((g) => {
    const clips = clipsOf(g);
    pick(clips.find((c) => !doneRef.current.has(c.id)) || clips[0]);
  }, [pick]);

  // A finished clip counts as practised; the trainee moves on when ready.
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
  const totalMins = useMemo(() => clipMinutes(ALL_CLIPS), []);

  return (
    <div id="top" className="u site vl-page">
      <div className="vl-dark dk">
        <header className="w vl-bar">
          <a href={ROUTES.home} className="vl-logo"><img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" /></a>
          <div className="vl-prog" aria-label={`${count} of ${total} videos practised`}>
            <span className="vl-prog-bar" aria-hidden="true"><span style={{ transform: `scaleX(${count / total})` }} /></span>
            <span className="vl-prog-n">{count} of {total} practised</span>
          </div>
        </header>

        <section className="w vl-intro" aria-labelledby="vl-h1">
          <div className="vl-intro-text">
            <h1 id="vl-h1">Your practice library</h1>
            <p>Maggie demonstrates each of the 8 UBA modules. {total} videos, {totalMins} minutes. Choose a module to begin, and tick off each video as it is practised.</p>
          </div>
          <ModuleMap current={clip.group} done={done} onOpen={openModule} />
        </section>

        <section ref={stage} className="w vl-stage" aria-label="Now playing">
          <Player clip={clip} done={done} onToggle={toggle} onPick={pick} autoplay={autoplay} onEnded={ended} />
        </section>
      </div>

      <main className="w vl-main">
        <section className="vl-assess" aria-labelledby="assess-h">
          <div className="vl-assess-text">
            <h2 id="assess-h">Preparing for your assessment</h2>
            <p>Film yourself teaching 3 UBA modules to at least 2 participants. One of the 3 must be Module 5 or Module 7.</p>
          </div>
          <div className="vl-assess-mods">
            {VIDEO_GROUPS.filter((g) => g.assessment).map((g) => {
              const clips = clipsOf(g);
              const d = clips.filter((c) => done.has(c.id)).length;
              return (
                <button key={g.id} type="button" onClick={() => openModule(g)}>
                  <span className="vl-am-t">{g.title}</span>
                  <span className="vl-am-n">{g.name}</span>
                  <span className="vl-am-p">
                    <span className="vl-mc-bar" aria-hidden="true"><span style={{ transform: `scaleX(${d / clips.length})` }} /></span>
                    {d} of {clips.length} practised
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="vl-mods" aria-labelledby="mods-h">
          <h2 id="mods-h" className="vl-mods-h">All modules</h2>
          {VIDEO_GROUPS.map((g) => {
            const clips = clipsOf(g);
            const d = clips.filter((c) => done.has(c.id)).length;
            const complete = d === clips.length;
            return (
              <article key={g.id} id={g.id} className="vl-mod">
                <header className="vl-mod-h">
                  <h3>{g.title}</h3>
                  <p className="vl-mod-n">{g.name}</p>
                  <p className="vl-mod-m">
                    {clips.length} {clips.length === 1 ? 'video' : 'videos'} · {clipMinutes(clips) || 1} min ·{' '}
                    <span className={complete ? 'ok' : ''}>{complete ? 'Complete' : `${d} of ${clips.length} practised`}</span>
                    {g.assessment && <span className="vl-gold-deep"> · Assessment module</span>}
                  </p>
                </header>
                <ul className="vl-strip">
                  {clips.map((c) => {
                    const cur = c.id === clip.id;
                    return (
                      <li key={c.id} className={c.wide ? 'is-wide' : ''}>
                        <button type="button" className={`vl-thumb${cur ? ' cur' : ''}`} onClick={() => pick(c)} aria-label={`Play ${g.title}, ${c.title}`}>
                          <img src={thumbSrc(c.file)} alt="" loading="lazy" decoding="async" />
                          {cur ? <span className="vl-thumb-now">Playing</span> : <span className="vl-dur">{mins(c.secs)}</span>}
                          {done.has(c.id) && <span className="vl-thumb-ok"><Tick on /></span>}
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

        <p className="vl-help">Ticks are saved on this device. Trouble playing a video? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
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
