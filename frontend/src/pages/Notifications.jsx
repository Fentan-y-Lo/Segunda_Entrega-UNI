const notifications = [
  { initials: 'MG', text: 'María González comentó tu publicación', time: 'hace 30 min', highlight: true },
  { initials: '📅', text: 'Nuevo evento: Muestra de Talentos · Hoy, 29 abr · 8:00 PM · Coliseo Universitario', time: 'hace 1h' },
  { initials: 'CR', text: 'Carlos Ruiz publicó en el grupo Desarrollo Web Moderno', time: 'hace 2h', highlight: true },
  { initials: 'AM', text: 'Ana Martínez te envió un mensaje', time: 'hace 3h' },
  { initials: '📅', text: 'Nuevo evento: Defensa de Proyectos de Grado · 5 may · 10:00 AM · Auditorio Principal', time: 'hace 5h', highlight: true },
];

function Notifications() {
  return (
    <section className="page">
      <h1 className="page-title">Notificaciones</h1>
      <div className="surface-card notifications-card">
        <div className="tabs-row top-tabs">
          <button className="active">Todas</button>
          <button>Menciones</button>
          <button>Grupos</button>
          <button>Mensajes</button>
          <button>Eventos</button>
        </div>
        <div className="notification-list">
          {notifications.map((item) => (
            <div key={item.text} className={`notification-item ${item.highlight ? 'highlight' : ''}`}>
              <div className={`avatar ${item.initials === '📅' ? 'soft' : 'orange'}`}>{item.initials}</div>
              <div className="notification-body">
                <p>{item.text}</p>
                <span className="subtle">{item.time}</span>
              </div>
              <span className="small-orange-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Notifications;
