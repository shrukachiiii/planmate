import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { OverviewPage, ProfilePage, RoomsPage, TasksPage, TimetablePage } from './pages';

const navigation = [
  { icon: '◫', label: 'Overview', to: '/' },
  { icon: '▦', label: 'My timetable', to: '/timetable' },
  { icon: '◉', label: 'Study rooms', to: '/rooms', count: '2' },
  { icon: '☷', label: 'My tasks', to: '/tasks' },
];

const pageNames: Record<string, string> = {
  '/': 'Overview',
  '/timetable': 'My timetable',
  '/rooms': 'Study rooms',
  '/tasks': 'My tasks',
  '/profile': 'Profile',
};

function App() {
  const { pathname } = useLocation();
  const pageName = pageNames[pathname] ?? 'Overview';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="PlanMate home">
          <span className="brand-mark">p</span><span>planmate</span>
        </Link>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ icon, label, to, count }) => (
            <NavLink
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
              title={label}
              aria-label={label}
            >
              <span className="nav-icon" aria-hidden="true">{icon}</span>
              <span className="nav-label">{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-spark">✦</span><strong>A little progress<br />goes a long way.</strong><span>Keep showing up for yourself.</span></div>
          <NavLink className={({ isActive }) => `profile-button ${isActive ? 'active' : ''}`} to="/profile" title="Profile" aria-label="Open profile">
            <span className="avatar">JD</span><span className="profile-copy"><strong>Jamie Davis</strong><small>Personal space</small></span><span className="profile-more">···</span>
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><strong>{pageName}</strong></div>
          <div className="topbar-actions"><button className="icon-button" aria-label="Search">⌕</button><button className="icon-button notification-button" aria-label="Notifications">♧<i /></button><Link className="top-avatar" to="/profile" aria-label="Open profile">JD</Link></div>
        </header>

        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
