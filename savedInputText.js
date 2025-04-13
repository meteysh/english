function savedInputText() {
    let savedInputText = '';

    document.addEventListener('DOMContentLoaded', () => {
        const inputElement = document.getElementById('input');

        inputElement.addEventListener('input', () => {
            savedInputText = inputElement.value;

            const resultText = handleContent(savedInputText);
            localStorage.setItem('filteredData', resultText);

            const outputDiv = document.getElementById('output');
            outputDiv.textContent = resultText || 'No text.';
        });
    });

    return function getInputText() {
        return savedInputText;
    };
}

savedInputText();

