function Profile() {
  return (
    <section className="page">
      <div className="surface-card profile-card">
        <div className="profile-cover" />
        <div className="profile-content">
          <div className="profile-top-row">
            <div className="profile-id">
              <div className="profile-avatar-photo">
                <div className="profile-avatar-inner">JD</div>
              </div>
              <div>
                <h1>Juan Díaz</h1>
                <div className="profile-meta-row">
                  <span className="tag">Ing. de Sistemas</span>
                  <span className="time">· Semestre 6</span>
                </div>
                <p className="subtle">Universidad San Buenaventura</p>
              </div>
            </div>
            <button className="outline-btn">Editar perfil</button>
          </div>

          <p className="profile-bio">
            Apasionado por el desarrollo web y la inteligencia artificial. Siempre buscando aprender nuevas tecnologías y compartir conocimiento con la comunidad.
          </p>

          <div className="profile-stats">
            <div><strong>42</strong><span>Publicaciones</span></div>
            <div><strong>234</strong><span>Seguidores</span></div>
            <div><strong>189</strong><span>Seguidos</span></div>
          </div>

          <div className="tabs-row underline-tabs">
            <button className="active">Publicaciones</button>
            <button>Grupos</button>
            <button>Actividad</button>
          </div>
        </div>
      </div>

      <div className="surface-card simple-post">
        <p className="simple-post-text">Publicación de ejemplo 1. Contenido interesante sobre tecnología y desarrollo.</p>
        <div className="simple-post-footer">
          <span>💬 5 comentarios</span>
          <span>🧡 12 reacciones</span>
          <span>hace 2 días</span>
        </div>
      </div>
    </section>
  );
}

export default Profile;
