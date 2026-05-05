const pool = require('../config/db');

const createPost = async (req, res) => {
  try {
    const { title, description, type } = req.body;

    if (!title || !description || !type) {
      return res.status(400).json({ message: 'Título, descripción y tipo son obligatorios' });
    }

    const result = await pool.query(
      `INSERT INTO posts (user_id, title, description, type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, title.trim(), description.trim(), type.trim().toLowerCase()]
    );

    return res.status(201).json({ message: 'Publicación creada correctamente', post: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear publicación', error: error.message });
  }
};

const getPosts = async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.title, p.description, p.type, p.created_at,
              u.id AS user_id, u.name, u.career
       FROM posts p
       INNER JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Error al listar publicaciones', error: error.message });
  }
};

module.exports = { createPost, getPosts };
