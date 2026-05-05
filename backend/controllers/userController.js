const pool = require('../config/db');

const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, career, bio, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const skills = await pool.query(
      'SELECT id, skill_name, level FROM skills WHERE user_id = $1 ORDER BY skill_name ASC',
      [req.user.id]
    );

    return res.json({ user: result.rows[0], skills: skills.rows });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, career, bio } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           career = COALESCE($2, career),
           bio = COALESCE($3, bio)
       WHERE id = $4
       RETURNING id, name, email, career, bio, created_at`,
      [name?.trim() || null, career?.trim() || null, bio?.trim() || null, req.user.id]
    );

    return res.json({ message: 'Perfil actualizado correctamente', user: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};

const addSkill = async (req, res) => {
  try {
    const { skill_name, level } = req.body;

    if (!skill_name) {
      return res.status(400).json({ message: 'El nombre de la habilidad es obligatorio' });
    }

    const normalizedSkill = skill_name.trim().toLowerCase();

    const exists = await pool.query(
      'SELECT id FROM skills WHERE user_id = $1 AND LOWER(skill_name) = $2',
      [req.user.id, normalizedSkill]
    );

    if (exists.rows.length > 0) {
      return res.status(409).json({ message: 'La habilidad ya fue registrada' });
    }

    const result = await pool.query(
      `INSERT INTO skills (user_id, skill_name, level)
       VALUES ($1, $2, $3)
       RETURNING id, user_id, skill_name, level`,
      [req.user.id, normalizedSkill, level?.trim() || 'intermedio']
    );

    return res.status(201).json({ message: 'Habilidad agregada', skill: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar habilidad', error: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const result = await pool.query(
      'DELETE FROM skills WHERE id = $1 AND user_id = $2 RETURNING id',
      [skillId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Habilidad no encontrada' });
    }

    return res.json({ message: 'Habilidad eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar habilidad', error: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { skill = '', career = '' } = req.query;

    const result = await pool.query(
      `SELECT DISTINCT u.id, u.name, u.email, u.career, u.bio, s.skill_name, s.level
       FROM users u
       LEFT JOIN skills s ON u.id = s.user_id
       WHERE ($1 = '' OR LOWER(s.skill_name) LIKE LOWER($1))
         AND ($2 = '' OR LOWER(u.career) LIKE LOWER($2))
       ORDER BY u.name ASC`,
      [`%${skill}%`, `%${career}%`]
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar usuarios', error: error.message });
  }
};

module.exports = { getMe, updateProfile, addSkill, deleteSkill, searchUsers };
