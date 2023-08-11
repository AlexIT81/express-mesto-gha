const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  userIdValidation,
  updateProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.get('/', getAllUsers);
router.get('/:userId', userIdValidation, getUser);
router.patch('/me', updateProfileValidation, updateProfile);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
