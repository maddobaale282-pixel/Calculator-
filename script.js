const display = document.getElementById('display');

function appendValue(val) {
    display.value += val;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let expression = display.value;
    
    try {
        // Automatically balance parenthesis for root functions if left open
        let openParentheses = (expression.match(/\(/g) || []).length;
        let closeParentheses = (expression.match(/\)/g) || []).length;
        while (openParentheses > closeParentheses) {
            expression += ')';
            closeParentheses++;
        }

        // Evaluate using a safe Function approach instead of raw eval
        if (expression.trim() !== "") {
            let result = new Function(`return ${expression}`)();
            display.value = Number(result.toFixed(8)); // Cleans up float issues
        }
    } catch (error) {
        display.value = 'Error';
    }
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker Registered"))
        .catch((err) => console.log("Service Worker Failed", err));
}
