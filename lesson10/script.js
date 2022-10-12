'use strict';
const booksWrapper = document.querySelector('.books');
const books = booksWrapper.querySelectorAll('.book');
const book02ListElems = books[0].querySelectorAll('li');
const book05ListElems = books[5].querySelectorAll('li');
const book06LastElem = books[2].querySelectorAll('li')[9];
const li = document.createElement('li');

// Восстановить порядок книг.
booksWrapper.prepend(books[1]);
booksWrapper.append(books[2]);
books[3].before(books[4]);
// Заменить картинку заднего фона на другую из папки image
document.body.style.background = 'url("./image/bg.jpg")';
// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
books[4].querySelector('h2').querySelector('a').text = "Книга 3. this и Прототипы Объектов";
// Удалить рекламу со страницы
document.querySelector('.adv').remove();
// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
book02ListElems[9].after(book02ListElems[2]);
book02ListElems[5].after(book02ListElems[7]);
book02ListElems[8].after(book02ListElems[4]);
book02ListElems[4].after(book02ListElems[5]);
book02ListElems[5].after(book02ListElems[7]);

book05ListElems[2].before(book05ListElems[9]);
book05ListElems[8].before(book05ListElems[5]);
book05ListElems[6].before(book05ListElems[2]);
// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
li.textContent = "Глава 8: За пределами ES6";
book06LastElem.insertAdjacentElement('beforebegin', li);