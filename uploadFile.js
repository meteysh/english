// Функция для чтения содержимого файла
function readFile(file, callback) {
    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;
        callback(fileContent);
    };

    reader.readAsText(file);
}

function handleContent(fileContent) {
    const lines = fileContent.split('\n');

    const filteredLines = lines
        .filter(line =>
            line.trim() !== '' &&
            line.includes('=') &&
            !line.includes('💭') &&
            !line.includes('From Eugene') &&
            !line.includes('❌') &&
            !line.includes('✅')
        )
        .map(line => line.trim());

    const combinedLines = [];
    let negativeLine = '';

    lines.forEach(line => {
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

    const filteredText = filteredLines.join('\n');
    const combinedText = combinedLines.join('\n');

    return `${filteredText}\n${combinedText}`.trim();
}

// Обработчик события загрузки файла
function handleFileUpload(event) {
    const file = event.target.files[0];
    readFile(file, function (fileContent) {
        const resultText = handleContent(fileContent);
        localStorage.setItem('filteredData', resultText);

        const outputDiv = document.getElementById('output');
        outputDiv.textContent = resultText || 'No text.';
    });
}

async function copyAll() {
    const outputText = document.getElementById('output');
    const text = outputText.value;

    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard!');
    } catch (err) {
        console.error('Unable to copy text', err);
    }
}


async function pasteFromBuffer() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('input').value = text;
        console.log('Text pasted from clipboard!');
    } catch (err) {
        console.error('Unable to read clipboard contents', err);
    }
}

function updateData() {
    const savedText = localStorage.getItem('filteredData');
    const outputDiv = document.getElementById('output');

    if (savedText) {
        outputDiv.textContent = savedText;
    } else {
        outputDiv.textContent = 'No text.';
    }
}

updateData();

document.getElementById('fileUpload').addEventListener('change', handleFileUpload);



