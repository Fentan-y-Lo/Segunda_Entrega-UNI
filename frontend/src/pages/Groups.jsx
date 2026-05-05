const myGroups = [
  { initials: 'DW', title: 'Desarrollo Web Moderno', members: '234 miembros' },
  { initials: 'IA', title: 'Inteligencia Artificial', members: '189 miembros' },
  { initials: 'ET', title: 'Emprendimiento y Tecnología', members: '142 miembros' },
];

const exploreGroups = [
  'Redes Neuronales',
  'Química Orgánica',
  'Programación Competitiva',
  'Diseño UX/UI',
];

function Groups() {
  return (
    <section className="page">
      <h1 className="page-title">Grupos Académicos</h1>
      <div className="search-input large-search">
        <span>⌕</span>
        <input placeholder="Buscar grupos..." />
      </div>

      <h2 className="section-title">Mis grupos</h2>
      <div className="card-grid three">
        {myGroups.map((group) => (
          <div className="surface-card group-card" key={group.title}>
            <div className="avatar orange large">{group.initials}</div>
            <h3>{group.title}</h3>
            <p className="subtle">{group.members}</p>
            <button className="primary-btn full">Ver grupo</button>
          </div>
        ))}
      </div>

      <h2 className="section-title space-top">Explorar grupos</h2>
      <div className="chips-row">
        <button className="chip filled">Todos</button>
        <button className="chip">Ingeniería</button>
        <button className="chip">Ciencias</button>
        <button className="chip">Arte</button>
        <button className="chip">Humanidades</button>
        <button className="chip">Deportes</button>
      </div>

      <div className="card-grid two explore-grid">
        {exploreGroups.map((group, index) => (
          <div className="surface-card mini-group" key={group}>
            <div className="avatar orange">{group.slice(0, 2).toUpperCase()}</div>
            <div>
              <h3>{group}</h3>
              <p className="subtle">{120 + index * 21} miembros</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Groups;
