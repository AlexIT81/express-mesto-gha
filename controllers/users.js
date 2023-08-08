const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATED_OK_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SECRET_KEY,
} = require('../utils/constants');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      console.log(newUser);
      res.status(CREATED_OK_CODE).send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else if (err.code === 11000) {
        res.status(CONFLICT_ERROR_CODE).send({ message: 'Ошибка базы данных!' });
      } else { res.status(SERVER_ERROR_CODE).send({ message: err }); }
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => { res.status(UNAUTHORIZED_ERROR_CODE).send({ message: 'Ошибка авторизации!' }); });
};

module.exports.getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(err)); // доработать контроль ошибок
};
