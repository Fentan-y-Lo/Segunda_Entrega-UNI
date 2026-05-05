import { useEffect, useState } from 'react';
import api from '../services/api';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ title: '', description: '', type: 'solicitud' });

  const loadPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'No se pudieron cargar las publicaciones');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/posts', form);
      setForm({ title: '', description: '', type: 'solicitud' });
      loadPosts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Debes iniciar sesión para publicar');
    }
  };

  return (
    <section className="grid-2">
      <div className="card">
        <h2>Nueva publicación</h2>
        <form onSubmit={createPost} className="form">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" required />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe tu solicitud u oferta" rows="5" required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="solicitud">Solicitud de ayuda</option>
            <option value="oferta">Oferta de ayuda</option>
          </select>
          <button className="btn">Publicar</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="card">
        <h2>Publicaciones recientes</h2>
        <div className="results-list">
          {posts.length === 0 ? (
            <p>No hay publicaciones todavía.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="card muted">
                <h3>{post.title}</h3>
                <p><strong>Tipo:</strong> {post.type}</p>
                <p>{post.description}</p>
                <p><strong>Autor:</strong> {post.name} - {post.career}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Posts;
