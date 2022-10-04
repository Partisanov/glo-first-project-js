'use strict';
//блок объявления переменных 
let title = prompt('Как называется Ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
let rollback = 10;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));
let allServicePrices = 0;

//блок описания функций 
const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollBackMessage = function (price) {
  if (price >= 30000) {
    return 'Даем скидку в 10%';
  } else if (price >= 15000 && price < 30000) {
    return 'Даем скидку в 5%';
  } else if (price >= 0 && price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что-то пошло не так';
  }
};
//1) Объявить функцию getAllServicePrices. Функция возвращает сумму всех дополнительных услуг. 
//Результат сохраняем в переменную allServicePrices. Тип - function expression
const getAllServicePrices = function () {
  let result = 0;
  for (let item of arguments) {
    result += item;
  }
  return result;
};

// 2) Объявить функцию getFullPrice. Функция возвращает сумму стоимости верстки и 
//стоимости дополнительных услуг (screenPrice + allServicePrices). 
// Результат сохраняем в переменную fullPrice. Тип - function declaration
function getFullPrice(price1, price2) {
  return price1 + price2;
}

// 3) Объявить функцию getTitle. Функция возвращает title меняя его таким образом: 
// первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка
//  может начинаться с пустых символов. " КаЛьКулятор Верстки"
const getTitle = (str) => {
  str = str.trim().toLowerCase();
  return str[0].toUpperCase() + str.substring(1);
};

// 4) Объявить функцию getServicePercentPrices. Функция возвращает итоговую
//  стоимость за вычетом процента отката. Результат сохраняем в переменную
//   servicePercentPrice (итоговая стоимость минус сумма отката)
const getServicePercentPrices = (totalСost, partRefund) => {
  return totalСost - (totalСost * (partRefund / 100));
};

//блок функционала
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

// блок вывода в консоль
console.log(screens);
console.log(getRollBackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));