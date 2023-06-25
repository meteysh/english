// Функция для чтения содержимого файла
function readFile(file, callback) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const fileContent = event.target.result;
    callback(fileContent);
  };

  reader.readAsText(file);
}

// Функция для парсинга файла и сохранения данных в Local Storage
function parseAndSaveFile(file) {
  readFile(file, function(fileContent) {
    const regex = /\uD83D\uDD25(.*?)=(.*?(?:\r?\n|$))/g;
    const data = [];

    let match;
    while ((match = regex.exec(fileContent)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();

      data.push([ key, value ]);
    }

    const jsonData = JSON.stringify(data);
    localStorage.setItem('parsedData', jsonData);
    console.log('File parsed and data saved to Local Storage.');
    translateWords();
  });
}

// Обработчик события загрузки файла
function handleFileUpload(event) {
  const file = event.target.files[0];
  parseAndSaveFile(file);
}

// Обработчик события изменения поля загрузки файла
  document.getElementById('fileUpload').addEventListener('change', handleFileUpload);



