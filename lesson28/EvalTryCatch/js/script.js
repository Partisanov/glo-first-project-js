//Создаем функцию filterByType( Отсортировать по типу) в аргументы передаем тип и значания,
// значения фильтруем по указанному типу
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	//создаём функцию Скрыть все блоки ответов
	hideAllResponseBlocks = () => {
		//создаём массив объектов(блоков), которые ищем по Тегу Див с классом dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// перебираем массив блоков методом forEach и 
		//у каждого блока ставим свойство стиля Дисплэй - нон(т.е. скрываем его) 
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	//создаем функцию Показать блок Ответа ,в аргументы 
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//выполняем функцию Скрыть все блоки ответа
		hideAllResponseBlocks();
		//находим объект с селектором который передаём в качестве равгумента, и устанавливаем свойству стиля - значение Блок
		document.querySelector(blockSelector).style.display = 'block';
		//если в аргументы функции передан спанСелетор ,то
		if (spanSelector) {
			//находим по селектору этот объект и присваиваем свойству текстКонтент текстСообщения,переданный вторым аргументом
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//создаем функцию "показать ошибку", в качестве аргумента принимаем текст сообщения 
	// выполняем функцию "показать блок ответа" с аргументами
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//создаём функцию "показать результат"в качестве аргумента принимаем текст сообщения 
	// выполняем функцию "показать блок ответа" с аргументами 
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//создаём функцию "показать нет результата", и выполняем функцию "показать блок ответа" 
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//создаём функцию "выполнить фильрацию по типу", в качесте аргументов передаём "тип" и "значения"
	tryFilterByType = (type, values) => {
		//если нет ошибок, то 
		try {
			//создаём переменную "массив значений" в которую сохраняем результат 
			//выполнения функции "фильтровать по типу" с аргументами(тип и значения),
			//а результаты выполнения соединяем через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//создаём переменную "предупреждающее сообщение",  в которую сохраняем значение, 
			//если переменная "Массив значений" пустая,то записываем "Отсутствуют данные типа "Тип"",
			//иначе записываем "Данные с типом "Тип" :  содержимое переменной "массив Значений""
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
			//если ошибки 	
		} catch (e) {
			//выполняем функцию Показать ошибку с сообщением "Ошибка:...и ошибкой,которую перехватываем"
			showError(`Ошибка: ${e}`);
		}
	};
//получаем кнопку Фильтровать по id filter-btn
const filterButton = document.querySelector('#filter-btn');

// вешаем на кнопку Фильтровать прослушку на событие Клик
filterButton.addEventListener('click', e => {
	//получаем инпут по селектору #type
	const typeInput = document.querySelector('#type');
	//получаем инпут по селектору #data
	const dataInput = document.querySelector('#data');

	//Проверяем Инпут с данными на заполнение
	//Если в Инпут дата - пусто, то
	if (dataInput.value === '') {
		// устанавливаем сообщение (Поле не должно быть пустым) в сплывающую подсказку Инпута-Данные
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//выполняем функцию Показать нет результата
		showNoResults();
		//Иначе
	} else {
		// очищаем сообщение в сплывающую подсказку Инпута-Данные
		dataInput.setCustomValidity('');
		//отменяем стандарное поведение
		e.preventDefault();
		//выполняем функцию Отфильровать по типу ,в параметры передаём значения Ипутов Тип и Дата,
		// предварительно убрав знаки пробела в начале и конце значений
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

