import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="brand">USB Connect</Link>
      </div>
      <div className="nav-links">
        <Link to="/search">Buscar</Link>
        <Link to="/posts">Publicaciones</Link>
        {token ? (
          <>
            <Link to="/profile">Perfil</Link>
            <span className="welcome">Hola, {user?.name}</span>
            <button onClick={logout} className="btn small danger">Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
