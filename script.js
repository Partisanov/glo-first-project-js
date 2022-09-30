// 1) Следующим переменным присвоить значения

//      title- строка с названием проекта,
//      screens - строка с названиями типов экранов через запятую ("Простые, Сложные, Интерактивные"),
//      screenPrice- любое число,
//      rollback - любое число от 1 до 100,
//      fullPrice- любое число (сколько хотите заработать),
//      adaptive- булевое значение

let title = "Glo первый проект JS",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 1989,
  rollback = 89,
  fullPrice = 2590500,
  adaptive = true;

// 2) Используя методы и свойства:

// Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// Вывести в консоль длину строки из переменной screens
console.log(screens.length);

// Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани” и
// “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
console.log(
  `Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`
);
console.log(
  `Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`
);

// Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log(screens.toLowerCase().split(""));

// Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))
console.log(fullPrice * (rollback / 100));
