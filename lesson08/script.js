'use strict';
//блок объявления переменных 

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.getTitle(appData.title);
    appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    do {
      appData.title = prompt('Как называется Ваш проект?');
    }
    while (appData.isNumber(appData.title));


    for (let i = 0; i < 2; i++) {
      let price = 0;
      let name = '';
      do {
        name = prompt('Какие типы экранов нужно разработать?');
      }
      while (appData.isNumber(name));
      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));
      appData.screens.push({ id: i, name: name, price: price });
    }
    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;
      do {
        name = prompt('Какой дополнительный тип услуги нужен?');
      }
      while (appData.isNumber(name));
      do {
        price = prompt('Сколько будет стоить данная работа?');
      } while (!appData.isNumber(price));
      appData.services[name] = +price;
    }
    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
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
  getFullPrice: function (price1, price2) {
    appData.fullPrice = price1 + price2;
  },
  getServicePercentPrices: (totalСost, partRefund) => {
    appData.servicePercentPrice = totalСost - (totalСost * (partRefund / 100));
  },
  getTitle: (str) => {
    str = str.trim().toLowerCase();
    appData.title = str[0].toUpperCase() + str.substring(1);
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  }

};


//блок описания функций 


//блок функционала
appData.start();

// блок вывода в консоль
