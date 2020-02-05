document.addEventListener('DOMContentLoaded', () => {

	let questionList = document.querySelector('.form__questions');

	/* Создаем список ответов, используя массив ответов answers */
	function createAnswersList (number) {
		let newAnswerList = document.createElement('ul');
		newAnswerList.setAttribute('class', 'form__answers');

		for (let i = 0; i < answers.length; i++) {
			let newAnswer = document.createElement('li');
			newAnswer.setAttribute('class', 'form__answer');
			newAnswer.innerHTML = `
			  <input class="visually-hidden" type="radio" name="question-${number}" id="question-${number}-${i}" value="${i}">
			  <label class="radiobutton-label" for="question-${number}-${i}">${answers[i]}</label>`;
			newAnswerList.append(newAnswer);
		}

		return newAnswerList;
	};

	/* Создаем список вопросов, используя массив вопросов questions + созданный выше список ответов */
	function createNewQuestion(number, text) {
		let newAnswersList = createAnswersList(number);

		let newQuestion = document.createElement('li');

		newQuestion.setAttribute('class','form__question-wrapper');
		newQuestion.innerHTML = `<p class="form__question">${number + 1}. ${text}</p>`;
		newQuestion.append(newAnswersList);
		questionList.append(newQuestion);
	};

	for (let i = 0; i < questions.length; i ++) {
		createNewQuestion(i, questions[i]);
	}

	/* ловим клик по списку с ответами */
	let answersList = document.querySelector('.form');
	answersList.addEventListener('click', saveAnswer, false);

	/* при клике по ответу, сохраняем выбранные результаты в массиве results */
	function saveAnswer (e) {
        if (e.target.tagName.toLowerCase() == 'input'.toLowerCase()) {
            answerNameArray = e.target.id.split('-');
            answerNumber = +answerNameArray[1];
			tempAnswerValue = e.target.value
            results[answerNumber] = +tempAnswerValue + 1;
            console.log(results);
        }
        return results['answerNumber'];
	}

    let submit = document.querySelector('.form__submit');
	submit.addEventListener('click', parseResult, false);

	/* при нажатии на кнопку "готово" начинаем обрабатывать результаты */
	function parseResult (e) {
		e.preventDefault();
		separateResult();
		calcResult();
		createWindow();
	}

	/* разбираем атветы в отдельные массивы в зависимости от категории, к которой они относятся */
	function separateResult () {
        for (let i = 0; i < scheme.length; i++ ) {
            scheme[i]['answers'] = [];
            for (let y = 0; y <= scheme[y]['numberQuestion'].length; y++) {
                let num = scheme[i]['numberQuestion'][y];
                scheme[i]['answers'][y] = results[num];
            }
        }
	}

	/* считаем суммы, получаем конечные результаты теста */
    function calcResult () {
        for (let i = 0; i < scheme.length; i++ ) {

            scheme[i].sum1 = 0;
            scheme[i]['answers'].forEach(function(item) {
                if (item === undefined) {item = 0};
                scheme[i].sum1 += +item;
            });

            scheme[i].sum2 = (scheme[i].sum1 - 5) / 25 * 100;

			let sum56 = 0;
			let num56 = 0;
			for (let y = 0; y <= scheme[i]['answers'].length; y++) {
				if (scheme[i]['answers'][y] >= 5) {
					sum56 += scheme[i]['answers'][y];
					num56 += 1;
				};
			};

			scheme[i].sum3 = sum56;
			scheme[i].sum4 = num56 / 5 * 100;
        }
    }

	let popup = document.querySelector('.popup');
	let btnClose = document.querySelector('.popup__close');
	let popupTable = document.querySelector('.popup__table');

	/* выводим результаты теста в новом окне */
	function createWindow() {
		popupOpen();

		for (let i = 0; i < scheme.length; i++ ) {
			let popupNewRow = document.createElement('tr');
			popupNewRow.innerHTML = `
				<td>${i+1}</td>
				<td>${scheme[i]['name']}</td>
				<td>${scheme[i]['showNumberQuestion']}</td>
				<td>${scheme[i]['answers']}</td>
				<td>${scheme[i]['sum1']}</td>
				<td>${scheme[i]['sum2']}</td>
				<td>${scheme[i]['sum3']}</td>
				<td>${scheme[i]['sum4']}</td>`;

			popupTable.append(popupNewRow);
		};

		console.log('scheme', scheme);
		btnClose.addEventListener('click', popupClose, false);
	}

	function popupOpen () {
		popup.style.display = "block";
	}

	function popupClose () {
		popup.style.display = "none";
		location.reload();
	}
});
