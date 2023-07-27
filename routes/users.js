const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
