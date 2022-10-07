'use strict';
//блок объявления переменных 

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',

  asking: function () {
    appData.title = prompt('Как называется Ваш проект?', 'Калькулятор верстки');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getRollBackMessage: function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5%';
    } else if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что-то пошло не так';
    }
  },
  getAllServicePrices: function () {
    let sum = 0;
    let servicePrice;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
      }
      do {
        servicePrice = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(servicePrice));
      sum += +servicePrice;
    }
    return sum;
  },
  getFullPrice: function (price1, price2) {
    return price1 + price2;
  },
  getTitle: (str) => {
    str = str.trim().toLowerCase();
    return str[0].toUpperCase() + str.substring(1);
  },
  getServicePercentPrices: (totalСost, partRefund) => {
    return totalСost - (totalСost * (partRefund / 100));
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.title = appData.getTitle(appData.title);
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + ' : ' + appData[key]);
    }
  }

};


//блок описания функций 


//блок функционала
appData.start();

// блок вывода в консоль
console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);