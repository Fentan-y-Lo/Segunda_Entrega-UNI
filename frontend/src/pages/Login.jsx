import { Link } from 'react-router-dom';

function Login() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="logo-mark auth-logo">
          <span className="logo-u">u</span>
          <span className="logo-i">i</span>
        </div>
        <h1>Iniciar sesión</h1>
        <p className="subtle center">Accede a UNI APP</p>
        <form className="auth-form">
          <input type="email" placeholder="Correo institucional" />
          <input type="password" placeholder="Contraseña" />
          <button type="button" className="primary-btn full">Ingresar</button>
        </form>
        <p className="auth-link-text">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </section>
  );
}

export default Login;
