let title = "Glo первый проект JS",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 1989,
  rollback = 89,
  fullPrice = 2590500,
  adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(
  `Стоимость верстки экранов ${screenPrice} рублей/ долларов/гривен/юани`
);
console.log(
  `Стоимость разработки сайта ${fullPrice} рублей/ долларов/гривен/юани`
);
console.log(screens.toLowerCase().split(""));
console.log(fullPrice * (rollback / 100));
