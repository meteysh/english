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
    }

    var wordElement = document.getElementById("word");
    var translationElement = document.getElementById("translation");
    var isRussianToEnglish = true;

    function showNextWord() {
        var index = getRandomIndex(words); // Получить рандомный индекс
        var currentWord = words[index][isRussianToEnglish ? 0 : 1];
        var currentTranslation = words[index][isRussianToEnglish ? 1 : 0];

        wordElement.textContent = currentWord;
        translationElement.textContent = "";

        setTimeout(function () {
            translationElement.textContent = currentTranslation;

            setTimeout(function () {
                showNextWord();
            }, 5000);
        }, 3000);
    }

    showNextWord();
}