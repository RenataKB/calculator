add = (n1, n2) => n1 + n2;
subtract = (n1, n2) => n1 - n2;
multiply = (n1, n2) => n1 * n2;
divide = (n1, n2) => n1 / n2; // TODO: n/0 -> Infinity e 0/0 -> NaN

let n1, n2, op;
let newDisplay = false;

// str, float e float -> float
function operate(op, n1, n2) {
    switch (op) {
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case '*':
            return multiply(n1, n2);
        case '/':
            return divide(n1, n2);
        default:
            return;
    }
}

let displayValue = '0';
const display = document.querySelector('div.display');
const buttons = document.querySelectorAll('div.button');
const dotButton = document.querySelector('div.button.dot');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        populateDisplay(button.id);
    });
});

showDisplay(displayValue);

// str -> str
function showDisplay(value) {
    // regex para tirar o 0 inicial
    display.textContent = value.replace(/^0+(?!(\.|$))/g,'');
}

// str -> bool
function validLength(s) {
    // TODO: arrumar; coloquei para tirar o zero inicial que fica
    s = s.replace(/^0+(?!(\.|$))/g,'');
    // aceitar ate 8 digitos, sem contar o . ou -
    return s.replaceAll(/\.|\-/g, '').length <= 8
}

// str -> nada
function populateDisplay(lastButton) {
    switch (lastButton) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            if (n1 == undefined) {
                n1 = parseFloat(displayValue);
                op = lastButton;
            } else {
                n2 = parseFloat(displayValue);
                n1 = operate(op, n1, n2);
                op = lastButton;
                displayValue = 0
                display.textContent = n1;
                if (lastButton == '=') {
                    n1 = undefined;
                    displayValue = display.textContent;
                }
            }
            newDisplay = true;
            break;
        case '.':
            // TODO: só aceitar um ponto no número
            displayValue += lastButton;
            showDisplay(displayValue);
            break;
        case 'clear':
            // TODO na interface: botao clear. Backspace tbm?
            break;
        default:
            if (newDisplay) {
                displayValue = lastButton
                newDisplay = false;
            } else {
                const nextDisplayValue = displayValue + lastButton;
                if (validLength(nextDisplayValue)) {
                    displayValue = nextDisplayValue;
                }
            }
            showDisplay(displayValue);
            break;
    }
}
