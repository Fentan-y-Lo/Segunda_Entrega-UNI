const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getMe,
  updateProfile,
  addSkill,
  deleteSkill,
  searchUsers,
} = require('../controllers/userController');

const router = express.Router();

router.get('/search', searchUsers);
router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateProfile);
router.post('/me/skills', authMiddleware, addSkill);
router.delete('/me/skills/:skillId', authMiddleware, deleteSkill);

module.exports = router;
