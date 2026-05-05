import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className="auth-page">
      <div className="auth-card wide">
        <div className="logo-mark auth-logo">
          <span className="logo-u">u</span>
          <span className="logo-i">i</span>
        </div>
        <h1>Crear cuenta</h1>
        <p className="subtle center">Regístrate para conectar con la comunidad estudiantil</p>
        <form className="auth-form two-col">
          <input placeholder="Nombre completo" />
          <input type="email" placeholder="Correo institucional" />
          <input placeholder="Carrera" />
          <input placeholder="Semestre" />
          <textarea placeholder="Cuéntanos sobre ti" rows="4" className="full-span" />
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
          <button type="button" className="primary-btn full full-span">Crear cuenta</button>
        </form>
        <p className="auth-link-text">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </section>
  );
}

export default Register;
