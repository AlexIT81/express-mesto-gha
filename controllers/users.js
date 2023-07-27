const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Пользователь по указанному id:${userId} не найден.`,
        });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about, avatar } = req.body;
  User.findOneAndUpdate(
    { _id: owner },
    { $set: { name, about, avatar } },
    { returnOriginal: false },
    { runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: `Пользователь с указанным id:${owner} не найден.` });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findOneAndUpdate(
    { _id: owner },
    { $set: { avatar } },
    { returnOriginal: false },
    { runValidators: true },
  )
    .then((data) => res.send({ data }))
    .catch((err) => {
      res.send(avatar);
      if (!avatar) {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
        return;
      }
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: `Пользователь с указанным id:${owner} не найден.` });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};
