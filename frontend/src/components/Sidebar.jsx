import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/profile', label: 'Perfil', icon: 'user' },
  { to: '/groups', label: 'Grupos', icon: 'users' },
  { to: '/messages', label: 'Mensajes', icon: 'message', badge: 3 },
  { to: '/notifications', label: 'Notificaciones', icon: 'bell', badge: 5 },
  { to: '/events', label: 'Eventos', icon: 'calendar', badge: 2 },
  { to: '/search', label: 'Buscar personas', icon: 'search' },
];

function Icon({ name }) {
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9.5 21v-6h5v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
      );
    case 'user':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M5.5 19.2c1.4-3 4-4.7 6.5-4.7s5.1 1.7 6.5 4.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="16.5" cy="9.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M3.8 18.8c1.2-2.8 3.3-4.4 5.7-4.4s4.6 1.5 5.8 4.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M14.1 18.2c.8-1.9 2.2-3.1 4.1-3.1 1 0 2 .3 2.8 1.1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5c0 4.1-3.8 7.5-8.5 7.5-1 0-2-.2-2.9-.5L4 20l1.6-4.1A7 7 0 0 1 3.5 11c0-4.1 3.8-7.5 8.5-7.5S20 7.1 20 11.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
      );
    case 'bell':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10.5a5 5 0 0 1 10 0v3.4l1.6 2.6H5.4L7 13.9z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 18.5a2.2 2.2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M8 3.8v3.4M16 3.8v3.4M4 9.2h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      );
    default:
      return null;
  }
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo-mark">
          <span className="logo-u">u</span>
          <span className="logo-i">i</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon"><Icon name={item.icon} /></span>
            <span className="nav-label">{item.label}</span>
            {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
