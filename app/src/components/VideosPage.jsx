import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../asset.js';
import { EMAIL, ROUTES } from '../site.js';
import { ALL_CLIPS, VIDEO_GROUPS, clipMinutes, thumbSrc, videoSrc } from '../videos.js';

// The trainee practice library: each module as a row of Maggie's videos. A video opens in a
// full-screen player over the page. "Practised" ticks are kept in this browser only (no accounts).

const STORE = 'uba-practised-v1';
const mins = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const readStore = () => {
  try { return new Set(JSON.parse(localStorage.getItem(STORE) || '[]')); } catch { return new Set(); }
};
const writeStore = (set) => {
  try { localStorage.setItem(STORE, JSON.stringify([...set])); } catch { /* private mode: progress lasts this visit */ }
};
const clipsOf = (g) => ALL_CLIPS.filter((c) => c.group === g);

function Tick({ on, size = 22 }) {
  return (
    <svg className={`vl-tick${on ? ' on' : ''}`} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.8 10.4l2.7 2.7 5.7-6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const Arrow = ({ left }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {left ? <path d="M19 12H5M11 18l-6-6 6-6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
);

function Player({ clip, done, onToggle, onPick, onClose, onEnded }) {
  const g = clip.group;
  const idx = ALL_CLIPS.indexOf(clip);
  const prev = ALL_CLIPS[idx - 1];
  const next = ALL_CLIPS[idx + 1];
  const isDone = done.has(clip.id);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = before; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && next && e.target.tagName !== 'VIDEO') onPick(next);
      if (e.key === 'ArrowLeft' && prev && e.target.tagName !== 'VIDEO') onPick(prev);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [next, prev, onClose, onPick]);

  return (
    <div className="vl-ov dk" role="dialog" aria-modal="true" aria-label={`${g.title}, ${clip.title}`}>
      <div className="vl-ov-top">
        <p className="vl-ov-where">{g.title} · {g.name}</p>
        <button ref={closeRef} type="button" className="vl-ov-close" onClick={onClose} aria-label="Close video">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <div className={`vl-ov-stage${clip.wide ? ' is-wide' : ''}`}>
        <video key={clip.id} src={videoSrc(clip.file)} poster={thumbSrc(clip.file)} controls autoPlay playsInline preload="auto" controlsList="nodownload" onEnded={onEnded} />
      </div>

      <div className="vl-ov-bar">
        <button type="button" className="vl-ov-nav" onClick={() => prev && onPick(prev)} disabled={!prev} aria-label="Previous video"><Arrow left /></button>
        <div className="vl-ov-mid">
          <h2>{clip.title}</h2>
          <button type="button" className={`vl-done${isDone ? ' on' : ''}`} onClick={() => onToggle(clip.id)} aria-pressed={isDone}>
            <Tick on={isDone} size={20} />
            {isDone ? 'Practised' : 'Mark as practised'}
          </button>
        </div>
        <button type="button" className="vl-ov-nav" onClick={() => next && onPick(next)} disabled={!next} aria-label="Next video"><Arrow /></button>
      </div>
    </div>
  );
}

export default function VideosPage() {
  const [clip, setClip] = useState(null);
  const [done, setDone] = useState(() => new Set());
  const opener = useRef(null);

  // Progress lives in this browser only; read it after hydration so the server and client markup match.
  useEffect(() => { setDone(readStore()); }, []);

  const toggle = useCallback((id) => {
    setDone((cur) => {
      const n = new Set(cur);
      n.has(id) ? n.delete(id) : n.add(id);
      writeStore(n);
      return n;
    });
  }, []);

  const open = useCallback((c, e) => {
    if (e) opener.current = e.currentTarget;
    setClip(c);
  }, []);
  const close = useCallback(() => {
    setClip(null);
    opener.current?.focus({ preventScroll: true });
  }, []);

  // A finished video counts as practised.
  const ended = useCallback(() => {
    setDone((cur) => {
      if (!clip || cur.has(clip.id)) return cur;
      const n = new Set(cur).add(clip.id);
      writeStore(n);
      return n;
    });
  }, [clip]);

  const count = done.size;
  const total = ALL_CLIPS.length;
  const totalMins = useMemo(() => clipMinutes(ALL_CLIPS), []);
  const resume = ALL_CLIPS.find((c) => !done.has(c.id));

  return (
    <div id="top" className="u site vl-page">
      <header className="vl-bar dk">
        <div className="w vl-bar-in">
          <a href={ROUTES.home} className="vl-logo"><img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" /></a>
          <p className="vl-bar-t">Trainee practice library</p>
        </div>
      </header>

      <main className="w vl-main">
        <section className="vl-intro" aria-labelledby="vl-h1">
          <h1 id="vl-h1">Your practice library</h1>
          <div className="vl-intro-side">
            <p>Maggie’s demonstrations for all 8 UBA modules: {total} videos, {totalMins} minutes. Practise along and tick off each one. For the video assessment, one of the 3 modules taught must be Module 5 or Module 7.</p>
            <div className="vl-sum">
              <div className="vl-sum-row">
                <span className="vl-sum-n">{count} of {total} practised</span>
                {resume && (
                  <button type="button" className="vl-resume" onClick={(e) => open(resume, e)}>
                    {count ? 'Continue' : 'Start'} with {resume.group.title} →
                  </button>
                )}
              </div>
              <span className="vl-sum-bar" aria-hidden="true"><span style={{ transform: `scaleX(${count / total})` }} /></span>
            </div>
          </div>
        </section>

        {VIDEO_GROUPS.map((g) => {
          const clips = clipsOf(g);
          const d = clips.filter((c) => done.has(c.id)).length;
          const complete = d === clips.length;
          return (
            <section key={g.id} id={g.id} className="vl-mod" aria-labelledby={`${g.id}-h`}>
              <header className="vl-mod-h">
                <h2 id={`${g.id}-h`}>{g.title}</h2>
                <p className="vl-mod-n">{g.name}</p>
                <p className="vl-mod-m">
                  {clips.length} {clips.length === 1 ? 'video' : 'videos'} · {clipMinutes(clips) || 1} min
                </p>
                <p className={`vl-mod-p${complete ? ' ok' : ''}`}>
                  {complete ? <><Tick on size={18} /> Complete</> : `${d} of ${clips.length} practised`}
                </p>
                {g.assessment && <p className="vl-mod-a">Assessment module</p>}
              </header>
              <ul className="vl-strip">
                {clips.map((c) => (
                  <li key={c.id} className={c.wide ? 'is-wide' : ''}>
                    <button type="button" className="vl-thumb" onClick={(e) => open(c, e)} aria-label={`Play ${g.title}, ${c.title}`}>
                      <img src={thumbSrc(c.file)} alt="" loading="lazy" decoding="async" />
                      <span className="vl-play" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg></span>
                      <span className="vl-dur">{mins(c.secs)}</span>
                      {done.has(c.id) && <span className="vl-thumb-ok"><Tick on /></span>}
                    </button>
                    <p>{c.title}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <p className="vl-help">Ticks are saved on this device. Trouble playing a video? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </main>

      <footer className="vl-foot dk">
        <div className="w">
          <img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" loading="lazy" />
          <p>For UK Barre Academy trainees. Please keep this link to yourself.</p>
        </div>
      </footer>

      {clip && <Player clip={clip} done={done} onToggle={toggle} onPick={setClip} onClose={close} onEnded={ended} />}
    </div>
  );
}
