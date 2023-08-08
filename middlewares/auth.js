const jwt = require('jsonwebtoken');

const {
  UNAUTHORIZED_ERROR_CODE,
  SECRET_KEY,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: 'Необходима авторизация!' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: 'Необходима авторизация!' });
  }

  req.user = payload;
  next();
};
