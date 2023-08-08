const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://localhost:27017/mestodb';
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {
  NOT_FOUND_ERROR_CODE,
} = require('./utils/constants');

const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.all('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({
    message: 'Такого не существует(',
  });
});

app.listen(PORT);
