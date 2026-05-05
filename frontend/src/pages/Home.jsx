function PostActions() {
  return (
    <div className="post-actions">
      <button>💬 Comentar</button>
      <button>♡ Reaccionar</button>
      <button>↗ Compartir</button>
    </div>
  );
}

function Home() {
  return (
    <section className="page feed-page">
      <div className="composer-card surface-card">
        <div className="composer-top">
          <div className="avatar orange">JD</div>
          <input className="composer-input" placeholder="¿Qué está pasando en la U?" />
        </div>
        <div className="composer-bottom">
          <button className="ghost-icon">🖼️</button>
          <button className="primary-btn">Publicar</button>
        </div>
      </div>

      <article className="surface-card post-card">
        <div className="post-header">
          <div className="avatar orange">MG</div>
          <div>
            <div className="post-name-row">
              <h3>María González</h3>
              <span className="tag">Ing. Industrial</span>
              <span className="time">· hace 2h</span>
            </div>
            <p className="post-user">@mariag</p>
          </div>
        </div>
        <p className="post-text">
          ¿Alguien más está trabajando en el proyecto de optimización de procesos? Me
          gustaría formar un grupo de estudio para discutir los algoritmos de programación lineal.
        </p>
        <PostActions />
      </article>

      <article className="surface-card post-card">
        <div className="post-header">
          <div className="avatar orange">CR</div>
          <div>
            <div className="post-name-row">
              <h3>Carlos Ruiz</h3>
              <span className="tag">Ciencias</span>
              <span className="time">· hace 4h</span>
            </div>
            <p className="post-user">@carlosr</p>
          </div>
        </div>
        <p className="post-text">
          Increíble la feria Empresarial ambiental que se acerca muchachos, ¿quienes asistirán?, los esperamos. 🌿
        </p>
        <div className="post-image-card">
          <div className="eco-banner">Eco</div>
        </div>
        <PostActions />
      </article>
    </section>
  );
}

export default Home;
