'use strict';
//блок объявления переменных 
const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type="range"]');
const spanRangeValue = document.querySelector('.rollback .range-value');

const costLayoutInput = document.getElementsByClassName('total-input')[0];
const numberScreensInput = document.getElementsByClassName('total-input')[1];
const costAdditionalServicesInput = document.getElementsByClassName('total-input')[2];
const totalCostInput = document.getElementsByClassName('total-input')[3];
const costIncludingRollbackInput = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  count: 0,

  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreensBlock);
    inputRange.addEventListener('input', appData.setRollback);
    document.querySelectorAll('.screen select').forEach((elem) => {
      elem.addEventListener('change', appData.blockBtn);
    });
    document.querySelectorAll('.screen input').forEach((elem) => {
      elem.addEventListener('input', appData.blockBtn);
    });

  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.blockBtn();
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showRersult();

  },
  showRersult: function () {
    costLayoutInput.value = appData.screenPrice;
    numberScreensInput.value = appData.count;
    costAdditionalServicesInput.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalCostInput.value = appData.fullPrice;
    costIncludingRollbackInput.value = appData.servicePercentPrice;
  },
  blockBtn: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      if ((select.selectedIndex === 0) || (input.value.length === 0)) {
        startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
    });
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    appData.count = 0;

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.count += (+input.value);

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
      });

    });
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreensBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    document.querySelectorAll('.screen select').forEach((elem) => {
      elem.addEventListener('change', appData.blockBtn);
    });
    document.querySelectorAll('.screen input').forEach((elem) => {
      elem.addEventListener('input', appData.blockBtn);
    });
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((sum, currentItem) => {
      sum += +currentItem.price;
      return sum;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

  },
  setRollback: function () {
    const value = +inputRange.value;
    spanRangeValue.textContent = `${value}%`;
    if (costIncludingRollbackInput.value === 0) {
      appData.rollback = value;
    } else {
      costIncludingRollbackInput.value = (appData.fullPrice - appData.fullPrice * (value / 100));
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  }

};


//блок описания функций 


//блок функционала
appData.init();

// блок вывода в консоль
