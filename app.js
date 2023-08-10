const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://localhost:27017/mestodb';
const app = express();
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { NotFoundError } = require('./errors');

const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})
  .then(() => console.log(`Подключена база данных по адресу ${DB_URL}`))
  .catch((err) => console.log(err));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9._]{1,}\.[a-zA-Z0-9]{1,8}\b([a-zA-Z0-9\-._~:/?#[\]@!$&%'()*+,;=]*)?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(50),
  }),
}), createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.all('*', () => {
  throw new NotFoundError('Такого не существует(');
});

app.use(errors()); // обработчик ошибок celebrate

app.use(handleError);

app.listen(PORT);
