import { sx } from '../lib/sx.js';
import { COURSE_DATES } from '../site.js';
import Picture from './Picture.jsx';

// The completed cohorts with the group photo of a finished cohort; sits under the founding cohort reviews.
const COMPLETED = COURSE_DATES.filter((d) => !d.open);

const S = {
  fig: sx('margin: 0; border-radius: 16px; overflow: hidden; background: var(--warm2);'),
  photo: sx('display: block; width: 100%; height: 100%; aspect-ratio: 3 / 2; object-fit: cover; object-position: 50% 45%;'),
  card: sx('border-radius: 16px; background: var(--cream); color: var(--ink); padding: clamp(22px, 2.4vw, 32px); display: flex; flex-direction: column; justify-content: space-between; gap: 24px;'),
  text: sx('margin: 10px 0 0; color: var(--muted);'),
  list: sx('margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;'),
  row: sx('display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px 12px 16px; border-radius: 12px; background: var(--paper);'),
  rowText: sx('display: flex; flex-direction: column; gap: 2px; min-width: 0;'),
  date: sx('font-size: 15px; line-height: 1.3; font-weight: 500; letter-spacing: -0.01em;'),
  note: sx('font-size: 13px; line-height: 1.4; color: var(--muted);'),
  tag: sx('flex: 0 0 auto; font-size: 13px; line-height: 18px; font-weight: 500; padding: 6px 12px; border-radius: 9999px; background: var(--ink); color: var(--paper);'),
};

export default function CompletedCohorts() {
  return (
    <div className="w">
      <div className="done">
        <figure className="rv zoom" style={S.fig}>
          <Picture
            name="uk-barre-academy-founding-instructors-course-completed"
            alt="UK Barre Academy Founding Instructors at the barre at the end of their training day, holding a UBA Certificate of Completion"
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1080px) calc(100vw - 80px), 760px"
            style={S.photo}
          />
        </figure>
        <div className="rv" style={S.card}>
          <div>
            <h3 className="t-h3" style={{ margin: 0 }}>Completed cohorts</h3>
            <p className="t-body" style={S.text}>Our first Founding Instructors, at the end of their training day.</p>
          </div>
          <ul style={S.list}>
            {COMPLETED.map((d) => (
              <li key={d.date} style={S.row}>
                <span style={S.rowText}>
                  <span style={S.date}>{d.date}</span>
                  <span style={S.note}>{d.note}</span>
                </span>
                <span style={S.tag}>Completed</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
