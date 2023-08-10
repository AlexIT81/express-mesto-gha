const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/', getAllUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9._]{1,}\.[a-zA-Z0-9]{1,8}\b([a-zA-Z0-9\-._~:/?#[\]@!$&%'()*+,;=]*)?$/),
  }),
}), updateAvatar);

module.exports = router;
