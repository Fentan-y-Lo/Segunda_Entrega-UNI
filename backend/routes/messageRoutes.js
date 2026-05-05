const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { sendMessage, getConversation } = require('../controllers/messageController');

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/:userId', authMiddleware, getConversation);

module.exports = router;
