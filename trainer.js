function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function translateWords() {
    var errorElement = document.getElementById("error");
// Получение данных из Local Storage
    const jsonData = localStorage.getItem('parsedData');
    if (jsonData) {
        errorElement.textContent = '';//очистить ошибку
        var words = JSON.parse(jsonData);
    } else {
        errorElement.textContent = 'Загрузить файл-словарь';
        // console.log('Загрузить файл-словарь');
    }

    var wordElement = document.getElementById("word");
    var translationElement = document.getElementById("translation");
    var index = 0;
    var isRussianToEnglish = true;

    function showNextWord() {
        var currentWord = words[index][isRussianToEnglish ? 0 : 1];
        var currentTranslation = words[index][isRussianToEnglish ? 1 : 0];

        wordElement.textContent = currentWord;
        translationElement.textContent = ""; // Очистка перевода

        setTimeout(function () {
            translationElement.textContent = currentTranslation;

            setTimeout(function () {
                index++;
                if (index >= words.length) {
                    index = 0;
                    isRussianToEnglish = !isRussianToEnglish;
                }

                showNextWord(); // Показать следующее слово и перевод
            }, 5000);
        }, 3000);
    }

    showNextWord(); // Показать первое слово сразу же
}