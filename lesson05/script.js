'use strict';
//блок объявления переменных 
const rollback = 10;

let title,
  screens,
  screenPrice,
  adaptive,
  fullPrice,
  servicePercentPrice,
  service1,
  service2,
  allServicePrices;

//блок описания функций 
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt('Как называется Ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice));
  screenPrice = +screenPrice;
  adaptive = confirm('Нужен ли адаптив на сайте?');
};

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

const getAllServicePrices = function () {
  let sum = 0;
  let servicePrice;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }
    do {
      servicePrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(servicePrice));
    sum += +servicePrice;
  }
  return sum;
};

function getFullPrice(price1, price2) {
  return price1 + price2;
}

const getTitle = (str) => {
  str = str.trim().toLowerCase();
  return str[0].toUpperCase() + str.substring(1);
};

const getServicePercentPrices = (totalСost, partRefund) => {
  return totalСost - (totalСost * (partRefund / 100));
};

//блок функционала
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

// блок вывода в консоль
console.log(screens);
console.log(getRollBackMessage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback));