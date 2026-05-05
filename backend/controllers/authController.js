const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, career, bio } = req.body;

    if (!name || !email || !password || !career) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
    }

    if (!email.endsWith('@tau.usbmed.edu.co')) {
      return res.status(400).json({ message: 'Solo se permite correo institucional USB' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, career, bio)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, career, bio, created_at`,
      [name.trim(), email.toLowerCase().trim(), hashedPassword, career.trim(), bio?.trim() || null]
    );

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al registrar usuario', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        career: user.career,
        bio: user.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al iniciar sesión', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
