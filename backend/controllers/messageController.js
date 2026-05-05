const pool = require('../config/db');

const sendMessage = async (req, res) => {
  try {
    const { receiver_id, content } = req.body;

    if (!receiver_id || !content) {
      return res.status(400).json({ message: 'Destinatario y contenido son obligatorios' });
    }

    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, receiver_id, content.trim()]
    );

    return res.status(201).json({ message: 'Mensaje enviado', data: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error al enviar mensaje', error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT m.*, su.name AS sender_name, ru.name AS receiver_name
       FROM messages m
       INNER JOIN users su ON su.id = m.sender_id
       INNER JOIN users ru ON ru.id = m.receiver_id
       WHERE (m.sender_id = $1 AND m.receiver_id = $2)
          OR (m.sender_id = $2 AND m.receiver_id = $1)
       ORDER BY m.sent_at ASC`,
      [req.user.id, userId]
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener conversación', error: error.message });
  }
};

module.exports = { sendMessage, getConversation };
