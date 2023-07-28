[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд
[ФРОНТЕНД](https://alexit81.github.io/react-mesto-auth/)
[БЭКЕНД](https://alexit81.github.io/express-mesto-gha/)

## Роуты пользователей и карточек
|  Роут  |  Запрос  |  Действие  |  Ошибки  | 
|  ---  |  ---  |  ---  |  ---  |  ---  |
<tbody><tr><td>/users</td><td><code class="code-inline code-inline_theme_light">GET POST</code></td><td><code class="code-inline code-inline_theme_light">GET</code>-запрос возвращает всех пользователей из базы данных;  <code class="code-inline code-inline_theme_light">POST</code>-запрос создаёт пользователя с переданными в теле запроса <code class="code-inline code-inline_theme_light">name</code>, <code class="code-inline code-inline_theme_light">about</code>, <code class="code-inline code-inline_theme_light">avatar</code></td><td><code class="code-inline code-inline_theme_light">400</code> — Переданы некорректные данные при создании пользователя.  <code class="code-inline code-inline_theme_light">500</code> — Ошибка по умолчанию.</td></tr><tr><td>/users/:userId</td><td><code class="code-inline code-inline_theme_light">GET</code></td><td><code class="code-inline code-inline_theme_light">GET</code>-запрос возвращает пользователя по переданному <code class="code-inline code-inline_theme_light">_id</code>.</td><td><code class="code-inline code-inline_theme_light">404</code> — Пользователь по указанному <code class="code-inline code-inline_theme_light">_id</code> не найден.  <code class="code-inline code-inline_theme_light">500</code> — Ошибка по умолчанию.</td></tr><tr><td>/users/me</td><td><code class="code-inline code-inline_theme_light">PATCH</code></td><td><code class="code-inline code-inline_theme_light">PATCH</code>-запрос обновляет информацию о пользователе.</td><td><code class="code-inline code-inline_theme_light">400</code> — Переданы некорректные данные при обновлении профиля.  <code class="code-inline code-inline_theme_light">404</code> — Пользователь с указанным <code class="code-inline code-inline_theme_light">_id</code> не найден.  <code class="code-inline code-inline_theme_light">500</code> — Ошибка по умолчанию.</td></tr><tr><td>/users/me/avatar</td><td><code class="code-inline code-inline_theme_light">PATCH</code></td><td><code class="code-inline code-inline_theme_light">PATCH</code>-запрос обновляет аватар пользователя.</td><td><code class="code-inline code-inline_theme_light">400</code> — Переданы некорректные данные при обновлении аватара.  <code class="code-inline code-inline_theme_light">404</code> — Пользователь с указанным <code class="code-inline code-inline_theme_light">_id</code> не найден.  <code class="code-inline code-inline_theme_light">500</code> — Ошибка по умолчанию.</td></tr><tr><td>/cards</td><td><code class="code-inline code-inline_theme_light">GET POST</code></td><td><code class="code-inline code-inline_theme_light">GET</code>-запрос возвращает все карточки из базы данных.  <code class="code-inline code-inline_theme_light">POST</code>-запрос создает новую карточку по переданным параметрам.</td><td><code class="code-inline code-inline_theme_light">400</code> — Переданы некорректные данные при создании карточки.  <code class="code-inline code-inline_theme_light">500</code> — Ошибка по умолчанию.</td></tr><tr><td>/cards/:cardId</td><td><code class="code-inline code-inline_theme_light">DELETE</code></td><td><code class="code-inline code-inline_theme_light">DELETE</code>-запрос удаляет карточку по <code class="code-inline code-inline_theme_light">_id</code>.</td><td><code class="code-inline code-inline_theme_light">404</code> — Карточка с указанным <code class="code-inline code-inline_theme_light">_id</code> не найдена.</td></tr><tr><td>/cards/:cardId/likes</td><td><code class="code-inline code-inline_theme_light">PUT DELETE</code></td><td><code class="code-inline code-inline_theme_light">PUT</code>-запрос добавляет лайк карточке.  <code class="code-inline code-inline_theme_light">DELETE</code>-запрос удаляет лайк с карточки.</td><td><code class="code-inline code-inline_theme_light">400</code> — Переданы некорректные данные для постановки/снятии лайка.  <code class="code-inline code-inline_theme_light">404</code> — Передан несуществующий <code class="code-inline code-inline_theme_light">_id</code> карточки.  <code class="code-inline code-inline_theme_light">500</code> — Ошибка по умолчанию.</td></tr></tbody></table>

## Основные использованные технологии
* Node.js;
* Nodemone;
* Express(framework);
* MongoDb;
* Mongoose;
* MongoDBCompass;
* Postman;

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### Стоит доработать:
1. Связать фронтенд и бэкенд.
2. Реализовать регистрацию и авторизацию позьзователя.

