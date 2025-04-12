function savedInputText() {
    let savedInputText = '';

    document.addEventListener('DOMContentLoaded', () => {
        const inputElement = document.getElementById('input');

        inputElement.addEventListener('input', () => {
            savedInputText = inputElement.value;

            const resultText = handleContent(savedInputText);
            localStorage.setItem('filteredData', resultText);

            console.log('File parsed and data saved to Local Storage.');
        });
    });

    return function getInputText() {
        return savedInputText;
    };
}

savedInputText();

