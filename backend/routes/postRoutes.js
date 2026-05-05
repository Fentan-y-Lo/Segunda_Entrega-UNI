const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getPosts } = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);

module.exports = router;
