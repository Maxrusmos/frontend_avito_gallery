Задание

Необходимо сверстать адаптивную страницу со списком фотографий. ​

При клике на фотографии открывается модальное окно с фотографией, списком комментариев и формой добавления комментариев. ​

Список ручек:

GET https://boiling-refuge-66454.herokuapp.com/images - получение списка фотографий.
GET https://boiling-refuge-66454.herokuapp.com/images/:imageId - получения большого изображения и списка комментариев.
POST https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments - добавление комментария (204 – OK, комментарий не сохраняется).
​ Дизайн можно найти тут. ​

Ответы на вопросы по заданию можно найти тут. ​

Мы оценим если:

приложение будет работать локально после npm i && npm run start;
приложение написано на React;
не используются внешние компоненты, например, модальное окно;
учтен UX.
