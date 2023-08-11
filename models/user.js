const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: true,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неправильные почта и/или пароль!');
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта и/или пароль!');
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
