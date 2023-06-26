function downloadCSV() {
    // Получение данных из Local Storage
    const jsonData = localStorage.getItem('parsedData');
    const errorElement = document.getElementById('error');
    if (jsonData) {
        errorElement.textContent = '';//очистить ошибку
        var words = JSON.parse(jsonData);
    } else {
        errorElement.textContent = 'Загрузить файл-словарь';
    }
    console.log(words);
    var csvContent = "data:text/csv;charset=utf-8,";

    words.forEach(function(rowArray) {
        var row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "words.csv");
    document.body.appendChild(link); // добавляем ссылку на элемент body
    link.click(); // нажимаем на ссылку для начала загрузки
}