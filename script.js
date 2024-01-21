add = (n1, n2) => n1 + n2;
subtract = (n1, n2) => n1 - n2;
multiply = (n1, n2) => n1 * n2;
divide = (n1, n2) => n1 / n2;

let n1, n2, op;
let newDisplay = false;
let displayValue = '0';

const ERROR_MESSAGE = 'OH NO!';
const MAX_DISPLAY_LENGTH = 8;
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

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

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        doButtonAction(button.id);
    });
});

showDisplay(displayValue);

function showDisplay(value) {
    // regex para tirar o 0 inicial
    displayValue = display.textContent = value.replace(/^0+(?!(\.|$))/g,'');
    if (displayValue == ERROR_MESSAGE) {
        displayValue = '0';
        newDisplay = false;
    }
    if (!validLength(displayValue)) {
        roundLongDisplay(displayValue);
    }
}

function roundLongDisplay(longValue) {
    const [integerPart, decimalPart] = longValue.split('.');
    const intLength = integerPart.replace(/\-/g, '').length;
    if (!longValue.includes('.') | (intLength > MAX_DISPLAY_LENGTH)) {
        displayValue = display.textContent = ERROR_MESSAGE;
    } else if (intLength == MAX_DISPLAY_LENGTH) {
        displayValue = display.textContent = integerPart;
    } else {
        displayValue = display.textContent= `${integerPart}.${decimalPart.slice(0, MAX_DISPLAY_LENGTH - intLength)}`;
    }
}

function validLength(s) {
    return s.replaceAll(/\.|\-/g, '').length <= MAX_DISPLAY_LENGTH;
}

function clearVariables() {
    op = n1 = n2 = undefined;
}

function validateAndUpdateDisplay() {
    n2 = parseFloat(displayValue);
    if (n2 == 0 & op == '/') {
        displayValue = ERROR_MESSAGE;
        return false;
    } else {
        n1 = operate(op, n1, n2);
        displayValue = n1.toString();
        return true;
    }
}

function doButtonAction(lastButton) {
    switch (lastButton) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (n1 == undefined) {
                n1 = parseFloat(displayValue);
                op = lastButton;
            } else {
                if (validateAndUpdateDisplay()) {
                    op = lastButton;
                } else {
                    clearVariables();
                }
            }
            newDisplay = true;
            break;
        case '=':
            if (op) {
                validateAndUpdateDisplay();
                clearVariables();
            }
            newDisplay = true;
            break;
        case '.':
            if (newDisplay) {
                displayValue = '0.';
                newDisplay = false;
            } else {
                if (!displayValue.includes('.') & validLength(displayValue+'1')) {
                    displayValue += lastButton;
                }
            }
            break;
        case 'clear':
            clearVariables();
            newDisplay = false;
            displayValue = '0';
            break;
        case 'backspace':
            displayValue = displayValue.slice(0, -1);
            if (displayValue == '') {
                displayValue = '0';
            }
            break;
        case 'sign':
            if (displayValue != '0') {
                if (displayValue.includes('-')) {
                    displayValue = displayValue.replace(/\-/g, '');
                } else {
                    displayValue = '-' + displayValue;
                }
            }
            break;
        case 'percent':
            displayValue = (parseFloat(displayValue)/100).toString();
            break;
        default:
            if (newDisplay) {
                displayValue = lastButton;
                newDisplay = false;
            } else {
                const nextDisplayValue = displayValue + lastButton;
                if (validLength(nextDisplayValue)) {
                    displayValue = nextDisplayValue;
                }
            }
            break;
    }
    showDisplay(displayValue);
}
