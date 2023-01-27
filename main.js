const questions = [
	{
		question: "Какой футболист изображен на картинке?",
		answers: ["Френки де Йонг", "Донни ван де Бек", "Дейли Блинд", "Вирджил Ван Дейк"],
		correct: 4,
	},
	{
		question: "Какой футболист изображен на картинке?",
		answers: [
			"Эрлинг Холланд",
			"Златан Ибрагимович",
			"Кристиан Ериксен",
			"Дейли Блинд",
		],
		correct: 2,
	},
	{
		question: "Какой футболист изображен на картинке?",
		answers: [
			"Лионель Месси",
			"Хулиан Альварес",
			"Кун Агуэро",
			"Гонсало Игуаин",
		],
		correct: 1,
	},
	{
		question: "Какой футболист изображен на картинке?",
		answers: ["Данило", "Рафинья", "Неймар", "Роналдо"],
		correct: 3,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const imageContainer = document.querySelector('#image')

let score = 0; //количество правильных ответов
let questionIndex = 0; //номер вопроса

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
	imageContainer.innerHTML = '';
}

function showQuestion() {
	//вывод вопроса
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	let img = document.createElement('img');
	img.src = 'Images/football players/' + questionIndex + '.jpg';
	imageContainer.append(img);

	//вывод ответов
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
			<label>
				<input value='%number%' type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`
		const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);
		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	//находим выбранную кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	// узнаем номер пользователя
	const userAnswer = parseInt(checkedRadio.value);

	// увеличение счета
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}

	// вывод результата
	function showResults() {
		const resultTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
		`;

		let title, message;

		if (score === questions.length) {
			title = 'Поздравляем';
			message = 'Вы ответили на все вопросы';
		} else if ((score * 100) / questions.length >= 50) {
			title = 'Поздравляем';
			message = 'Вы ответили на более половины ответов';
		} else {
			title = 'Поздравляем';
			message = 'Вы ответили на менее половины ответов';
		}

		let result = `${score} из ${questions.length}`;

		const finalMessage = resultTemplate
			.replace('%title%', title)
			.replace('%message%', message)
			.replace('%result%', result);

		headerContainer.innerHTML = finalMessage;

		// Начать заново
		submitBtn.blur;
		submitBtn.innerText = 'Начать заново';
		submitBtn.onclick = () => history.go();
	}

}
