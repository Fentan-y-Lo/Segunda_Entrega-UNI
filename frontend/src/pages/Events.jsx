function Events() {
  return (
    <section className="page">
      <div className="page-toolbar">
        <h1 className="page-title no-margin">Eventos Universitarios</h1>
        <button className="primary-btn">Publicar evento</button>
      </div>

      <div className="surface-card tabs-surface slim-tabs">
        <div className="tabs-row top-tabs">
          <button className="active">Próximos</button>
          <button>Esta semana</button>
          <button>Este mes</button>
          <button>Pasados</button>
        </div>
      </div>

      <div className="surface-card event-card-large">
        <div className="event-banner">
          <div className="event-banner-text">
            <span className="small-script">Muestra de</span>
            <span className="big-title">TALENTOS</span>
          </div>
          <div className="event-date-badge">
            <span>ABR</span>
            <strong>29</strong>
          </div>
        </div>

        <div className="event-body">
          <p className="subtle">🗓️ Martes, 29 de abril de 2026 · 8:00 PM</p>
          <h2>Muestra de Talentos</h2>
          <p className="subtle">Universidad San Buenaventura</p>
          <p className="subtle">📍 Coliseo Universitario</p>
          <p className="event-description">
            Únete a la muestra anual de talentos donde estudiantes de todas las facultades demuestran sus habilidades artísticas, científicas y culturales.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Events;
