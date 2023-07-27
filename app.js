const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
})
  .then(() => console.log(`Подключена база данных по адресу ${DB_URL}`))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  req.user = {
    _id: '64c15992edab62ed20ff49a7', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT);
