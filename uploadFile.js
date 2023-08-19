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
    const regex = /(.*?)\s*=\s*(.*)/g;
    const data = [];

    let match;
    while ((match = regex.exec(fileContent)) !== null) {
      const key = match[1].trim()
          .replace(/📎/g, '')
          .replace(/🧩/g, '')
          .replace(/🔥/g, '')
          .replace(/🗣️/g, '');
      const value = match[2].trim();

      data.push([ key, value ]);
    }

    const jsonData = JSON.stringify(data);
    localStorage.setItem('parsedData', jsonData);
    console.log('File parsed and data saved to Local Storage.');
    translateWords();
  });
  }

function parseAndSaveFileWithoutCloud(file) {
  const content = file.text();
  readFile(file, function(fileContent) {
    const lines = fileContent.split('\n');

    const filteredLines = lines
        .filter(function(line) {
          return line.trim() !== '' && !line.includes('💭')
              && !line.includes('❌') && !line.includes('✅');
        })
        .map(function(line) {
          return line.trim();
        });

    const combinedLines = [];
    let negativeLine = '';

    lines.forEach(function(line) {
      if (line.startsWith('❌')) {
        negativeLine = line;
      } else if (line.startsWith('✅')) {
        if (negativeLine) {
          combinedLines.push(`${negativeLine} = ${line}`);
          negativeLine = '';
        }
      } else {
        negativeLine = '';
      }
    });
    const combined = combinedLines.join('\n');

    const combinedText = filteredLines.join('\n');
    localStorage.setItem('filteredData', combinedText + '\n' + combined);

    const savedText = localStorage.getItem('filteredData');
    const outputDiv = document.getElementById('output');

    if (savedText) {
      outputDiv.textContent = savedText;
    } else {
      outputDiv.textContent = 'Нет сохраненных данных.';
    }
  });
}

// Обработчик события загрузки файла
function handleFileUpload(event) {
  const file = event.target.files[0];
  parseAndSaveFile(file);
  parseAndSaveFileWithoutCloud(file);
}

// Обработчик события изменения поля загрузки файла
  document.getElementById('fileUpload').addEventListener('change', handleFileUpload);



