import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { asset } from '../asset.js';
import { EMAIL, ROUTES } from '../site.js';
import { ALL_CLIPS, VIDEO_GROUPS, clipMinutes, thumbSrc, videoSrc } from '../videos.js';
import { POSITIONS, positionPhoto } from '../positions.js';
import Picture from './Picture.jsx';

// The UBA practice library. A sticky header (progress, Continue) and a pill menu to every section; the
// three full sessions as feature cards; then the class sessions and Maggie's 8 modules as rows.
// A video opens full-screen over the page. Ticks are kept in this browser only (no accounts).

const STORE = 'uba-practised-v1';
const mins = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const readStore = () => {
  try { return new Set(JSON.parse(localStorage.getItem(STORE) || '[]')); } catch { return new Set(); }
};
const writeStore = (set) => {
  try { localStorage.setItem(STORE, JSON.stringify([...set])); } catch { /* private mode: progress lasts this visit */ }
};
const clipsOf = (g) => ALL_CLIPS.filter((c) => c.group === g);
const SESSIONS = VIDEO_GROUPS.filter((g) => g.kind === 'session');
const ROWS = VIDEO_GROUPS.filter((g) => g.kind !== 'session');
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function Tick({ on, size = 22 }) {
  return (
    <svg className={`vl-tick${on ? ' on' : ''}`} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.8 10.4l2.7 2.7 5.7-6" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A small ring that fills as a section (or the whole library) is practised.
function Ring({ value, size = 36, stroke = 3, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="vl-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="vl-ring-bg" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="vl-ring-fg"
          strokeDasharray={c} strokeDashoffset={c * (1 - value)} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      {children}
    </span>
  );
}

const Play = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
);
const Arrow = ({ left }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {left ? <path d="M19 12H5M11 18l-6-6 6-6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
  </svg>
);

function Thumb({ c, done, onOpen, label }) {
  return (
    <button type="button" className={`vl-thumb${c.wide ? ' is-wide' : ''}`} onClick={(e) => onOpen(c, e)} aria-label={label}>
      <img src={thumbSrc(c.file)} alt="" loading="lazy" decoding="async" />
      <span className="vl-play" aria-hidden="true"><Play /></span>
      <span className="vl-dur">{mins(c.secs)}</span>
      {done.has(c.id) && <span className="vl-thumb-ok"><Tick on /></span>}
    </button>
  );
}

// Dancer positions viewer: one position large with its description, or (from the player) the full set.
function Positions({ start, onClose }) {
  const [i, setI] = useState(start);
  const closeRef = useRef(null);
  const p = i === null ? null : POSITIONS[i];
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = before; };
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); i !== null && start === null ? setI(null) : onClose(); }
      if (i === null) return;
      if (e.key === 'ArrowRight') setI((n) => Math.min(n + 1, POSITIONS.length - 1));
      if (e.key === 'ArrowLeft') setI((n) => Math.max(n - 1, 0));
    };
    addEventListener('keydown', onKey, true);
    return () => removeEventListener('keydown', onKey, true);
  }, [i, start, onClose]);

  return (
    <div className="vl-pos" role="dialog" aria-modal="true" aria-label={p ? p.title : 'Dancer positions'}>
      <div className="vl-pos-top">
        {p && start === null ? (
          <button type="button" className="vl-pos-back" onClick={() => setI(null)}><Arrow left /><span>All positions</span></button>
        ) : <p className="vl-pos-h">Dancer positions</p>}
        <button ref={closeRef} type="button" className="vl-icon" onClick={onClose} aria-label="Close positions">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      {p ? (
        <div className="vl-pos-body" key={p.id}>
          <div className="vl-pos-img">
            <Picture name={positionPhoto(p)} alt={`Maggie Paterson in ${p.title}`} sizes="(max-width: 760px) 100vw, 46vw" priority />
          </div>
          <div className="vl-pos-text">
            <span className="vl-pill vl-pill-dark">{i + 1} of {POSITIONS.length}</span>
            <h2>{p.title}</h2>
            <p className="vl-pos-sub">{p.sub}</p>
            <p>{p.text}</p>
            <div className="vl-pos-nav">
              <button type="button" className="vl-icon" onClick={() => setI(i - 1)} disabled={i === 0} aria-label="Previous position"><Arrow left /></button>
              <button type="button" className="vl-icon" onClick={() => setI(i + 1)} disabled={i === POSITIONS.length - 1} aria-label="Next position"><Arrow /></button>
              {POSITIONS[i + 1] && <span className="vl-pos-next">Next · {POSITIONS[i + 1].title}</span>}
            </div>
          </div>
        </div>
      ) : (
        <ul className="vl-pos-grid">
          {POSITIONS.map((q, n) => (
            <li key={q.id}>
              <button type="button" onClick={() => setI(n)}>
                <span className="vl-pos-ph"><Picture name={positionPhoto(q)} alt="" sizes="(max-width: 760px) 45vw, 180px" /></span>
                <span className="vl-pos-t">{q.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Player({ clip, done, onToggle, onPick, onClose, onEnded, onPositions }) {
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
      if (document.querySelector('.vl-pos')) return;
      if (e.key === 'Escape') onClose();
      if (e.target.tagName === 'VIDEO') return;
      if (e.key === 'ArrowRight' && next) onPick(next);
      if (e.key === 'ArrowLeft' && prev) onPick(prev);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [next, prev, onClose, onPick]);

  return (
    <div className="vl-ov" role="dialog" aria-modal="true" aria-label={`${g.title}, ${clip.title}`}>
      <div className="vl-ov-top">
        <span className="vl-pill vl-pill-dark">{g.nav}</span>
        <p className="vl-ov-where">{g.name}</p>
        <span className="vl-ov-count">{idx + 1} / {ALL_CLIPS.length}</span>
        <button type="button" className="vl-ov-pos" onClick={() => { document.querySelector('.vl-ov video')?.pause(); onPositions(); }}>Positions</button>
        <button ref={closeRef} type="button" className="vl-icon" onClick={onClose} aria-label="Close video">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <div className={`vl-ov-stage${clip.wide ? ' is-wide' : ''}`}>
        <video key={clip.id} src={videoSrc(clip.file)} poster={thumbSrc(clip.file)} controls autoPlay playsInline preload="auto" controlsList="nodownload" onEnded={onEnded} />
      </div>

      <div className="vl-ov-bar">
        <button type="button" className="vl-icon" onClick={() => prev && onPick(prev)} disabled={!prev} aria-label="Previous video"><Arrow left /></button>
        <div className="vl-ov-mid">
          <h2>{g.kind === 'session' ? clip.title : `${g.title} · ${clip.title}`}</h2>
          <button type="button" className={`vl-done${isDone ? ' on' : ''}`} onClick={() => onToggle(clip.id)} aria-pressed={isDone}>
            <Tick on={isDone} size={20} />
            <span>{isDone ? 'Practised' : 'Mark as practised'}</span>
          </button>
        </div>
        <button type="button" className="vl-icon" onClick={() => next && onPick(next)} disabled={!next} aria-label={next ? `Next: ${next.group.title}, ${next.title}` : 'Next video'}><Arrow /></button>
      </div>
      {next && (
        <p className="vl-ov-next">Up next · {next.group === g ? next.title : `${next.group.title}, ${next.title}`}</p>
      )}
    </div>
  );
}

function Library() {
  const [clip, setClip] = useState(null);
  const [done, setDone] = useState(() => new Set());
  const [active, setActive] = useState(VIDEO_GROUPS[0].id);
  const [pos, setPos] = useState(undefined); // undefined: closed; null: the full set; number: one position
  const [fab, setFab] = useState(false);
  const posOpener = useRef(null);
  const opener = useRef(null);
  const navRef = useRef(null);

  // Progress lives in this browser only; read it after hydration so the server and client markup match.
  useEffect(() => { setDone(readStore()); }, []);

  // Highlight the menu pill for the section in view, and keep that pill visible in the scrolling menu.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = (parseFloat(getComputedStyle(document.querySelector('.vl-page')).getPropertyValue('--head')) || 120) + 48;
      let id = VIDEO_GROUPS[0].id;
      for (const g of [...VIDEO_GROUPS, { id: 'positions' }]) {
        const el = document.getElementById(g.id);
        if (el && el.getBoundingClientRect().top <= line) id = g.id;
      }
      setActive(id);
      const intro = document.querySelector('.vl-teaser');
      const posEl = document.getElementById('positions');
      const past = intro ? intro.getBoundingClientRect().bottom < 0 : true;
      const atPositions = posEl ? posEl.getBoundingClientRect().top < innerHeight * 0.7 : false;
      setFab(past && !atPositions);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    const pill = navRef.current?.querySelector(`[data-id="${active}"]`);
    const bar = navRef.current;
    if (pill && bar) bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2, behavior: reduced() ? 'auto' : 'smooth' });
  }, [active]);

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
  const groupDone = (g) => clipsOf(g).filter((c) => done.has(c.id)).length;

  return (
    <div id="top" className="u site vl-page">
      <header className="vl-head">
        <div className="vl-bar dk">
          <div className="w vl-bar-in">
            <a href={ROUTES.home} className="vl-logo"><img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" /></a>
            <div className="vl-bar-r">
              <Ring value={count / total} size={34}>
                <span className="vl-ring-n">{count}</span>
              </Ring>
              <span className="vl-bar-n"><b>{count}</b> of {total} practised</span>
              {resume && (
                <button type="button" className="vl-cta" onClick={(e) => open(resume, e)}>
                  <Play size={14} /><span>{count ? 'Continue' : 'Start'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <nav className="vl-nav" aria-label="Library sections">
          <div ref={navRef} className="w vl-nav-in">
            {VIDEO_GROUPS.map((g) => {
              const d = groupDone(g);
              const all = clipsOf(g).length;
              return (
                <a key={g.id} data-id={g.id} href={`#${g.id}`} className={`vl-chip${active === g.id ? ' on' : ''}${g.opens ? ' gap' : ''}`} aria-current={active === g.id ? 'true' : undefined}>
                  {d === all ? <Tick on size={14} /> : g.assessment ? <span className="vl-chip-dot" aria-hidden="true" /> : null}
                  {g.nav}
                </a>
              );
            })}
            <a data-id="positions" href="#positions" className={`vl-chip gap${active === 'positions' ? ' on' : ''}`} aria-current={active === 'positions' ? 'true' : undefined}>Positions</a>
          </div>
        </nav>
      </header>

      <main className="w vl-main">
        <section className="vl-intro" aria-labelledby="vl-h1">
          <h1 id="vl-h1">Practice library</h1>
          <div className="vl-intro-side">
            <p>Maggie Paterson’s full sessions and every module of the UBA method, ready to practise along to. Tick off each video as you go.</p>
            <ul className="vl-facts">
              <li className="vl-pill">{total} videos</li>
              <li className="vl-pill">{totalMins} minutes</li>
              <li className="vl-pill vl-pill-gold"><span className="vl-chip-dot" aria-hidden="true" />Assessment: Module 5 or 7</li>
            </ul>
            <a href="#positions" className="vl-teaser">
              <span className="vl-stack" aria-hidden="true">
                {POSITIONS.slice(0, 5).map((q) => (
                  <span key={q.id}><Picture name={positionPhoto(q)} alt="" sizes="48px" /></span>
                ))}
              </span>
              <span className="vl-teaser-t">
                <b>Dancer positions</b>
                <span>{POSITIONS.length} positions to refer back to</span>
              </span>
              <Arrow />
            </a>
          </div>
        </section>

        <section className="vl-sessions" aria-label="Full sessions">
          {SESSIONS.map((g) => {
            const c = clipsOf(g)[0];
            const isDone = done.has(c.id);
            return (
              <article key={g.id} id={g.id} className="vl-card">
                <Thumb c={c} done={done} onOpen={open} label={`Play ${g.title}`} />
                <div className="vl-card-b">
                  <div>
                    <h2>{g.title}</h2>
                    <p>{g.name}</p>
                  </div>
                  <span className={`vl-state${isDone ? ' ok' : ''}`}>{isDone ? <><Tick on size={16} />Practised</> : mins(c.secs)}</span>
                </div>
              </article>
            );
          })}
        </section>

        {ROWS.map((g) => {
          const clips = clipsOf(g);
          const d = groupDone(g);
          const complete = d === clips.length;
          const H = g.opens || g.id.startsWith('m') ? 'h3' : 'h2';
          return (
            <Fragment key={g.id}>
              {g.opens && (
                <div className="vl-part">
                  <h2>{g.opens.title}</h2>
                  <p>{g.opens.text}</p>
                </div>
              )}
              <section id={g.id} className="vl-mod" aria-labelledby={`${g.id}-h`}>
                <header className="vl-mod-h">
                  <H id={`${g.id}-h`}>{g.title}</H>
                  <p className="vl-mod-n">{g.name}</p>
                  <div className="vl-mod-meta">
                    <Ring value={d / clips.length} size={22} stroke={2.5} />
                    <span className={complete ? 'ok' : ''}>{complete ? 'Complete' : `${d} of ${clips.length} practised`}</span>
                    <span className="vl-sep" aria-hidden="true">·</span>
                    <span>{clipMinutes(clips) || 1} min</span>
                  </div>
                  {g.assessment && <span className="vl-pill vl-pill-gold vl-mod-a"><span className="vl-chip-dot" aria-hidden="true" />Assessment module</span>}
                </header>
                <ul className="vl-strip">
                  {clips.map((c) => (
                    <li key={c.id} className={c.wide ? 'is-wide' : ''}>
                      <Thumb c={c} done={done} onOpen={open} label={`Play ${g.title}, ${c.title}`} />
                      <p>{c.title}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </Fragment>
          );
        })}

        <section id="positions" className="vl-positions" aria-labelledby="positions-h">
          <div className="vl-part">
            <h2 id="positions-h">Dancer positions</h2>
            <p>Maggie in each of the positions used in the videos. Choose one to see it larger, with a short description of the shape.</p>
          </div>
          <ul className="vl-pos-cards">
            {POSITIONS.map((p, n) => (
              <li key={p.id}>
                <button type="button" className="vl-pc" onClick={(e) => { posOpener.current = e.currentTarget; setPos(n); }}>
                  <span className="vl-pc-img"><Picture name={positionPhoto(p)} alt={`Maggie Paterson in ${p.title}`} sizes="(max-width: 760px) 44vw, (max-width: 1080px) 22vw, 160px" /></span>
                  <span className="vl-pc-t">{p.title}</span>
                  <span className="vl-pc-s">{p.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <p className="vl-help">Ticks are saved on this device. Trouble playing a video? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </main>

      <footer className="vl-foot dk">
        <div className="w">
          <img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" loading="lazy" />
          <p>For UK Barre Academy trainees. Please keep this link to yourself.</p>
        </div>
      </footer>

      <button type="button" className={`vl-fab${fab && !clip && pos === undefined ? ' on' : ''}`} onClick={(e) => { posOpener.current = e.currentTarget; setPos(null); }} aria-label="Open dancer positions" tabIndex={fab ? 0 : -1}>
        <span className="vl-stack" aria-hidden="true">
          {POSITIONS.slice(0, 3).map((q) => (
            <span key={q.id}><Picture name={positionPhoto(q)} alt="" sizes="40px" /></span>
          ))}
        </span>
        <span>Positions</span>
      </button>
      {clip && <Player clip={clip} done={done} onToggle={toggle} onPick={setClip} onClose={close} onEnded={ended} onPositions={() => setPos(null)} />}
      {pos !== undefined && <Positions start={pos} onClose={() => { setPos(undefined); if (!clip) posOpener.current?.focus({ preventScroll: true }); }} />}
    </div>
  );
}

// Password gate. The site is static, so this keeps out people who only have the link; it is not
// server-side security. The password (case doesn't matter) is checked against its SHA-256 hash, and
// a correct entry is remembered on this device.
const GATE_HASH = '108f45e00fba92764c7b8afcca686cdf285589ef7cc04a842f2c7ab4fae82fb8';
const GATE_KEY = 'uba-library-unlocked';
const sha256 = async (s) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

function Gate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(0);
  const input = useRef(null);
  useEffect(() => { input.current?.focus(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!value.trim() || busy) return;
    setBusy(true);
    const ok = (await sha256(value.trim().toLowerCase())) === GATE_HASH;
    setBusy(false);
    if (ok) {
      try { localStorage.setItem(GATE_KEY, GATE_HASH); } catch { /* remembered for this visit only */ }
      onUnlock();
    } else {
      setError(true);
      setShake((n) => n + 1);
      input.current?.select();
    }
  };

  return (
    <div className="u site vl-gate dk">
      <div className="vl-gate-in">
        <div className="vl-gate-main">
          <a href={ROUTES.home} className="vl-gate-logo"><img src={asset('media/uba-logo-white.png')} alt="UK Barre Academy" width="116" height="38" /></a>
          <h1>Practice library</h1>
          <p>Maggie’s practice videos and dancer positions for UK Barre Academy trainees. Enter the password from your training day.</p>
          <form className={`vl-gate-form${error ? ' err' : ''}`} onSubmit={submit} key={shake}>
            <label htmlFor="vl-pw" className="vl-vh">Password</label>
            <input
              ref={input}
              id="vl-pw"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              aria-invalid={error}
              aria-describedby="vl-pw-msg"
            />
            <button type="submit" disabled={busy} aria-label="Unlock the practice library">
              <Arrow />
            </button>
          </form>
          <p id="vl-pw-msg" className="vl-gate-msg" role="alert">{error ? 'That password isn’t right. Please try again.' : ''}</p>
        </div>
        <p className="vl-gate-foot">Need the password? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </div>
    </div>
  );
}

export default function VideosPage() {
  // null until checked in the browser, so the server render and first client render match (both show the gate).
  const [open, setOpen] = useState(null);
  useEffect(() => {
    let ok = false;
    try { ok = localStorage.getItem(GATE_KEY) === GATE_HASH; } catch { /* ignore */ }
    setOpen(ok);
  }, []);
  if (open) return <Library />;
  return <Gate onUnlock={() => { setOpen(true); scrollTo(0, 0); }} />;
}
