'use strict';
const greetingSpan = document.getElementById('greeting');
const nameDayWeekSpan = document.getElementById('day-week');
const currentTimeSpan = document.getElementById('current-time');
const untilNewYearSpan = document.getElementById('until-new-year');

let idInterval;

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const declOfNum = (number, words) => {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 :
        [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
};

const getTimeInfo = () => {
    const today = new Date();
    const hour = today.getHours();
    const year = today.getFullYear();
    const dayName = today.toLocaleString('ru', { weekday: 'long' });
    const currentTime = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const newYear = new Date(`1 January ${year + 1}`);
    const leftDays = Math.floor((newYear.getTime() - today.getTime()) / 60 / 60 / 24 / 1000);
    let greeting;

    switch (true) {
        case (hour >= 0 || hour < 3):
            greeting = 'Доброй ночи!';
            break;
        case (hour >= 4 || hour < 12):
            greeting = 'Доброе утро!';
            break;
        case (hour >= 12 || hour < 17):
            greeting = 'Добрый день!';
            break;
        case (hour >= 17 || hour <= 23):
            greeting = 'Добрый вечер!';
            break;
    }

    return { greeting, dayName, currentTime, leftDays };
};

const updateClock = () => {
    const getTime = getTimeInfo();

    greetingSpan.textContent = getTime.greeting;
    nameDayWeekSpan.textContent = capitalizeFirstLetter(getTime.dayName);
    currentTimeSpan.textContent = getTime.currentTime;
    untilNewYearSpan.textContent = `${getTime.leftDays} ${declOfNum(getTime.leftDays, ['день', 'дня', 'дней'])}`;
    if (getTime.leftDays <= 0) {
        clearInterval(idInterval);
    }
};

idInterval = setInterval(updateClock, 1000);