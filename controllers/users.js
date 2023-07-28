const User = require('../models/user');

const {
  CREATED_OK_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_OK_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((data) => {
      if (data === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: `Пользователь по указанному id:${userId} не найден.` });
      } else { res.send({ message: data }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: `Пользователь по указанному id:${userId} не найден.`,
        });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};

module.exports.updateProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findOneAndUpdate(
    { _id: owner },
    { $set: { name, about } },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      } else if (err.name === 'CastError') {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: `Пользователь с указанным id:${owner} не найден.` });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};

module.exports.updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id: owner },
    { $set: { avatar } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      } else if (err.name === 'CastError') {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: `Пользователь с указанным id:${owner} не найден.` });
      } else { res.status(SERVER_ERROR_CODE).send({ message: err }); }
    });
};
