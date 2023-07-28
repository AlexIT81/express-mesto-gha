const Card = require('../models/card');

const {
  CREATED_OK_CODE,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/constants');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED_OK_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: `Карточка с указанным _id: ${cardId} не найдена.` });
      } else { res.send({ message: card }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: `Карточка с указанным _id: ${cardId} не найдена.`,
        });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Произошла внутренняя ошибка сервера' }); }
    });
};
