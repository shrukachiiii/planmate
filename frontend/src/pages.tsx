import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const schedule = [
  { time: '09:00', period: 'AM', title: 'Review calculus notes', category: 'Mathematics', color: 'violet', length: '50 min' },
  { time: '10:30', period: 'AM', title: 'Read chapter 4', category: 'Biology', color: 'mint', length: '1 hr' },
  { time: '01:00', period: 'PM', title: 'Prepare seminar slides', category: 'Research', color: 'peach', length: '45 min' },
];

const tasks = [
  { title: 'Review calculus notes', category: 'Mathematics', time: 'Today · 9:00 AM', status: 'In progress' },
  { title: 'Read chapter 4', category: 'Biology', time: 'Today · 10:30 AM', status: 'Pending' },
  { title: 'Prepare seminar slides', category: 'Research', time: 'Today · 1:00 PM', status: 'Pending' },
  { title: 'Submit problem set 3', category: 'Mathematics', time: 'Tomorrow · 11:59 AM', status: 'Pending' },
];

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: ReactNode; description: string; action?: ReactNode }) {
  return (
    <section className="welcome-row page-heading">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="subtitle">{description}</p></div>
      {action}
    </section>
  );
}

export function OverviewPage() {
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <div className="page-content">
      <PageHeading eyebrow="WEDNESDAY, NOVEMBER 4, 2026" title={<>Good morning, Jamie <span className="wave">✳</span></>} description="A fresh week, a clear mind. Let’s make it count." action={<Link className="primary-button" to="/tasks"><span>＋</span> New task</Link>} />
      <section className="stats-grid" aria-label="Study progress">
        <article className="stat-card"><div className="stat-top"><span className="stat-icon lavender">◷</span><span className="trend">↗ 12%</span></div><p className="stat-label">Study time this week</p><div className="stat-value">8.5 <small>hrs</small></div><div className="mini-bars" aria-label="Weekly study time"><i style={{ height: '38%' }} /><i style={{ height: '62%' }} /><i style={{ height: '48%' }} /><i style={{ height: '82%' }} /><i className="bar-today" style={{ height: '68%' }} /><i style={{ height: '28%' }} /><i style={{ height: '18%' }} /></div><div className="bar-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div></article>
        <article className="stat-card"><div className="stat-top"><span className="stat-icon green">✓</span><span className="trend">Great pace</span></div><p className="stat-label">Tasks completed</p><div className="stat-value">12 <small>/ 16</small></div><div className="progress-track"><span style={{ width: '75%' }} /></div><p className="stat-foot">You’re 4 tasks from your weekly goal</p></article>
        <article className="stat-card focus-card"><div className="stat-top"><span className="stat-icon amber">✧</span><span className="focus-tag">ON A ROLL</span></div><p className="stat-label">Current focus streak</p><div className="stat-value">4 <small>days</small></div><p className="stat-foot">Your longest streak is 9 days. Keep it up!</p><div className="streak-dots"><i /><i /><i /><i className="current" /><i /><i /><i /></div></article>
      </section>
      <section className="content-grid">
        <article className="panel schedule-panel">
          <div className="panel-header"><div><h2>Your schedule</h2><p>A little structure, a lot of possibility.</p></div><Link className="text-link compact-link" to="/timetable">Full timetable <span>→</span></Link></div>
          <div className="date-strip"><button aria-label="Previous day">‹</button><div><strong>Wednesday, November 4</strong><span>3 planned sessions</span></div><button aria-label="Next day">›</button></div>
          <div className="schedule-list">{schedule.map((task) => <div className="schedule-item" key={task.title}><div className="schedule-time"><strong>{task.time}</strong><span>{task.period}</span></div><div className={`task-color ${task.color}`} /><div className="schedule-task"><strong>{task.title}</strong><span>{task.category}<b>·</b>{task.length}</span></div><button className={`task-check ${checked.includes(task.title) ? 'done' : ''}`} aria-label={`Mark ${task.title} ${checked.includes(task.title) ? 'pending' : 'complete'}`} onClick={() => setChecked((current) => current.includes(task.title) ? current.filter((item) => item !== task.title) : [...current, task.title])}>{checked.includes(task.title) ? '✓' : ''}</button></div>)}</div>
        </article>
        <article className="panel rooms-panel">
          <div className="panel-header"><div><h2>Study rooms</h2><p>Better together.</p></div><Link className="more-button" to="/rooms" aria-label="View study rooms">···</Link></div>
          <RoomCard name="Bio buddies" subtitle="Biology · Chapter 4" members="5 members" online="3 online" tone="lilac" avatars={['JD', 'AK', 'ML', '+2']} />
          <RoomCard name="Thesis crew" subtitle="Research · Weekly check-in" members="3 members" online="1 online" tone="peach" avatars={['JD', 'SR', '+1']} />
          <Link className="text-link" to="/rooms">Explore all rooms <span>→</span></Link>
        </article>
      </section>
      <footer className="page-footer"><span>Small steps add up. You’ve got this <span className="footer-heart">♥</span></span><span>Made for your next big idea.</span></footer>
    </div>
  );
}

export function TimetablePage() {
  const [view, setView] = useState<'Day' | 'Week'>('Day');
  return (
    <div className="page-content">
      <PageHeading eyebrow="YOUR STUDY PLAN" title="My timetable" description="Plan your sessions and make room for focused work." action={<Link className="primary-button" to="/tasks"><span>＋</span> Add a session</Link>} />
      <section className="panel full-page-panel">
        <div className="panel-header"><div><h2>Schedule</h2><p>Wednesday, November 4, 2026</p></div><div className="segmented-control">{(['Day', 'Week'] as const).map((item) => <button key={item} className={view === item ? 'selected' : ''} onClick={() => setView(item)}>{item}</button>)}</div></div>
        {view === 'Week' && <div className="week-strip">{['Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6', 'Sat 7', 'Sun 8'].map((day, index) => <div className={index === 2 ? 'today' : ''} key={day}>{day}<small>{index === 2 ? '3 sessions' : index < 5 ? '1 session' : 'Free'}</small></div>)}</div>}
        <div className="date-strip"><button aria-label="Previous day">‹</button><div><strong>{view === 'Day' ? 'Wednesday, November 4' : 'Week of November 2'}</strong><span>{schedule.length} planned sessions</span></div><button aria-label="Next day">›</button></div>
        <div className="schedule-list">{schedule.map((task) => <div className="schedule-item" key={task.title}><div className="schedule-time"><strong>{task.time}</strong><span>{task.period}</span></div><div className={`task-color ${task.color}`} /><div className="schedule-task"><strong>{task.title}</strong><span>{task.category}<b>·</b>{task.length}</span></div><span className="status-pill">Scheduled</span></div>)}</div>
        <p className="demo-note">Sample timetable content for this frontend phase.</p>
      </section>
    </div>
  );
}

export function TasksPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  return (
    <div className="page-content">
      <PageHeading eyebrow="STAY ON TRACK" title="My tasks" description="Keep your next steps in one clear, manageable list." action={<button className="primary-button" onClick={() => window.alert('Task creation will be connected to saved data in a later phase.')}><span>＋</span> New task</button>} />
      <section className="panel full-page-panel">
        <div className="panel-header"><div><h2>Upcoming tasks</h2><p>{tasks.length - completed.length} still to do</p></div><span className="status-pill">{completed.length} completed</span></div>
        <div className="task-list">{tasks.map((task) => <article className={`task-row ${completed.includes(task.title) ? 'task-row-done' : ''}`} key={task.title}><button className={`task-check ${completed.includes(task.title) ? 'done' : ''}`} aria-label={`${completed.includes(task.title) ? 'Reopen' : 'Complete'} ${task.title}`} onClick={() => setCompleted((current) => current.includes(task.title) ? current.filter((title) => title !== task.title) : [...current, task.title])}>{completed.includes(task.title) ? '✓' : ''}</button><div className="task-row-copy"><strong>{task.title}</strong><span>{task.category} <b>·</b> {task.time}</span></div><span className="status-pill">{completed.includes(task.title) ? 'Completed' : task.status}</span></article>)}</div>
        <p className="demo-note">Task changes are temporary in this demo and are not saved to a backend.</p>
      </section>
    </div>
  );
}

export function RoomsPage() {
  return (
    <div className="page-content">
      <PageHeading eyebrow="LEARN TOGETHER" title="Study rooms" description="Shared spaces to keep each other motivated." action={<button className="primary-button" onClick={() => window.alert('Room creation will be connected to accounts in a later phase.')}><span>＋</span> Create room</button>} />
      <section className="room-list-grid">
        <article className="panel room-detail-card"><RoomCard name="Bio buddies" subtitle="Biology · Chapter 4" members="5 members" online="3 online" tone="lilac" avatars={['JD', 'AK', 'ML', '+2']} /><div className="room-detail-body"><h3>Up next</h3><p>Read chapter 4 <span>Today · 10:30 AM</span></p><div className="member-status"><strong>Member progress</strong><span>Alex completed “Review lecture notes”</span><span>Jamie and 2 others are still working</span></div><button className="secondary-button" onClick={() => window.alert('Room sharing will be enabled when room accounts are implemented.')}>Invite members</button></div></article>
        <article className="panel room-detail-card"><RoomCard name="Thesis crew" subtitle="Research · Weekly check-in" members="3 members" online="1 online" tone="peach" avatars={['JD', 'SR', '+1']} /><div className="room-detail-body"><h3>Up next</h3><p>Weekly check-in <span>Thursday · 2:00 PM</span></p><div className="member-status"><strong>Room focus</strong><span>Share progress and discuss research milestones.</span></div><button className="secondary-button" onClick={() => window.alert('Room sharing will be enabled when room accounts are implemented.')}>Invite members</button></div></article>
      </section>
      <p className="demo-note">These room cards contain sample content only; membership and shared status are not connected to a backend yet.</p>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="page-content">
      <PageHeading eyebrow="YOUR ACCOUNT" title="Profile" description="Your personal study space and preferences." />
      <section className="panel full-page-panel profile-panel"><div className="profile-hero"><span className="profile-large-avatar">JD</span><div><h2>Jamie Davis</h2><p>jamie.davis@example.com</p></div><span className="status-pill">Personal space</span></div><div className="profile-fields"><div><span>Display name</span><strong>Jamie Davis</strong></div><div><span>Study goal</span><strong>12 hours per week</strong></div><div><span>Time zone</span><strong>Local time</strong></div></div><p className="demo-note">Profile settings will be editable after authentication and persistence are added.</p></section>
    </div>
  );
}

function RoomCard({ name, subtitle, members, online, tone, avatars }: { name: string; subtitle: string; members: string; online: string; tone: 'lilac' | 'peach'; avatars: string[] }) {
  return <div className={`room-card room-${tone}`}><div className="room-top"><span className="room-symbol">{tone === 'lilac' ? '✳' : '⌘'}</span><span className="online-dot" /><small>{online}</small></div><strong>{name}</strong><span className="room-subtitle">{subtitle}</span><div className="room-bottom"><div className="avatar-stack">{avatars.map((avatar) => <i key={avatar}>{avatar}</i>)}</div><span>{members}</span></div></div>;
}
