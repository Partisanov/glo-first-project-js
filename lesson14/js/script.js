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
const cms = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.querySelector('#cms-select');
const cmsOther = cmsVariants.querySelector('.main-controls__input');
const cmsOtherInput = cmsVariants.querySelector('#cms-other-input');
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
  cmsPercent: 0,
  isBlocked: true,

  init: function () {
    this.addTitle();
    startBtn.addEventListener('click', this.start.bind(appData));
    buttonPlus.addEventListener('click', this.addScreensBlock);
    inputRange.addEventListener('input', this.setRollback.bind(appData));
    resetBtn.addEventListener('click', this.reset.bind(appData));
    cms.addEventListener('click', this.openCms);
    cmsSelect.addEventListener('click', this.cmsChange.bind(appData));
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {

    this.blockBtn();
    if (!this.isBlocked) {
      this.addScreens();
      this.addServices();
      this.addPrices();
      this.showRersult();
      this.disabledAll();
    } else {
      alert('Выберите тип экрана и заполните все поля');
    }
  },
  reset: function () {
    this.resetData();
    this.resetForm();
  },
  resetData: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.count = 0;
    this.isBlocked = true;
    this.cmsPercent = 0;
  },
  resetForm: function () {
    const mainControls = document.querySelector('.main-controls');
    const screenWrapper = mainControls.querySelector('.main-controls__views.element');
    const checkboxList = mainControls.querySelectorAll('input[type=checkbox]');
    screenWrapper.innerHTML = `<h3>Расчет по типу экрана</h3>
                              <div class="main-controls__item screen">
                                  <div class="main-controls__select">
                                      <select name="views-select">
                                          <option value="" selected>Тип экранов</option>
                                          <option value="500">Простых 500руб * n</option>
                                          <option value="700">Сложных 700руб * n</option>
                                          <option value="800">Интерактивных 800руб * n</option>
                                          <option value="100">Форм 100руб * n</option>
                                          <option value="300">Слайдеров 300руб * n</option>
                                          <option value="200">Модальные окна 200руб * n</option>
                                          <option value="100">Анимация в блоках 100руб * n</option>
                                      </select>
                                  </div>
                                  <div class="main-controls__input">
                                      <input type="text" placeholder="Количество экранов">
                                  </div>
                              </div>`;
    checkboxList.forEach(item => {
      item.disabled = false;
      item.checked = false;
    });
    buttonPlus.disabled = false;
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
    cmsVariants.style.display = 'none';
    cmsSelect.disabled = false;
    cmsSelect.selectedIndex = 0;
    cmsOtherInput.disabled = false;
    cmsOtherInput.value = 0;
  },
  showRersult: function () {
    costLayoutInput.value = this.screenPrice;
    numberScreensInput.value = this.count;
    costAdditionalServicesInput.value = this.servicePricesPercent + this.servicePricesNumber;
    totalCostInput.value = this.fullPrice;
    costIncludingRollbackInput.value = this.servicePercentPrice;
  },
  openCms: function () {
    cmsVariants.style.display = (cms.checked) ? 'flex' : 'none';
  },
  cmsChange: function () {
    const value = cmsSelect.value;
    if (value === 'other') {

      cmsOtherInput.addEventListener('input', () => {
        this.cmsPercent = +cmsOtherInput.value;
      });
      cmsOther.style.display = 'flex';

    } else {
      cmsOther.style.display = 'none';
      if (value) {

        this.cmsPercent = +value;
      }
    }
  },

  blockBtn: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      this.isBlocked = ((select.selectedIndex === 0) || (input.value.length === 0)) ? true : false;
    });
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    this.count = 0;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.count += (+input.value);

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
      });

    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addScreensBlock: function () {
    screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, currentItem) => {
      sum += +currentItem.price;
      return sum;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
    this.fullPrice = (this.cmsPercent > 0) ? this.fullPrice + (this.fullPrice * (this.cmsPercent / 100))
      : this.fullPrice;
    this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

  },
  setRollback: function () {

    const value = +inputRange.value;
    spanRangeValue.textContent = `${value}%`;
    this.rollback = value;
    if (costIncludingRollbackInput.value === 0) {
      this.rollback = value;
    } else {
      costIncludingRollbackInput.value = (this.fullPrice - this.fullPrice * (value / 100));
    }
  },
  disabledAll: function () {
    const mainControls = document.querySelector('.main-controls');
    const inputList = mainControls.querySelectorAll('input[type=text]');
    const selectList = mainControls.querySelectorAll('select');
    const checkboxList = mainControls.querySelectorAll('input[type=checkbox]');
    inputList.forEach(item => item.disabled = true);
    selectList.forEach(item => item.disabled = true);
    checkboxList.forEach(item => item.disabled = true);
    buttonPlus.disabled = true;
    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  }
};


//блок описания функций 


//блок функционала
appData.init();


// блок вывода в консоль
