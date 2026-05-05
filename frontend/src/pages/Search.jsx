const people = [
  { initials: 'SR', name: 'Sofía Ramírez', career: 'Ing. de Sistemas', semester: 'Semestre 6', friends: '3 amigos en común' },
  { initials: 'DM', name: 'Diego Morales', career: 'Medicina', semester: 'Semestre 8', friends: '5 amigos en común' },
  { initials: 'AL', name: 'Ana López', career: 'Psicología', semester: 'Semestre 4', friends: '2 amigos en común' },
  { initials: 'VT', name: 'Valentina Torres', career: 'Derecho', semester: 'Semestre 7', friends: '4 amigos en común' },
];

function Search() {
  return (
    <section className="page">
      <div className="search-input giant-search">
        <span>⌕</span>
        <input placeholder="Busca estudiantes por nombre, carrera o usuario..." />
      </div>

      <div className="chips-row">
        <button className="chip filled">Todos</button>
        <button className="chip">Ingeniería</button>
        <button className="chip">Ciencias</button>
        <button className="chip">Arte</button>
        <button className="chip">Humanidades</button>
        <button className="chip">Deportes</button>
      </div>

      <h2 className="section-title">Estudiantes que quizás conozcas</h2>
      <div className="card-grid three">
        {people.map((person) => (
          <div className="surface-card person-card" key={person.name}>
            <div className="avatar orange xl">{person.initials}</div>
            <h3>{person.name}</h3>
            <span className="tag large-tag">{person.career}</span>
            <p className="subtle center">{person.semester}</p>
            <p className="subtle center">{person.friends}</p>
            <button className="primary-btn full">Seguir</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Search;
