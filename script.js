add = (n1, n2) => n1 + n2;
subtract = (n1, n2) => n1 - n2;
multiply = (n1, n2) => n1 * n2;
divide = (n1, n2) => n1 / n2;

let n1, n2, op;
let newDisplay = false;
let displayValue = '0';

const errorMessage = 'OH NO!';
const display = document.querySelector('div.display');
const buttons = document.querySelectorAll('div.button');

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
    // TODO: arrendondar saida para decimais longos
    // regex para tirar o 0 inicial
    displayValue = display.textContent = value.replace(/^0+(?!(\.|$))/g,'');
    if (displayValue == errorMessage) {
        displayValue = '0';
        newDisplay = false;
    }
}

function validLength(s) {
    // aceitar ate 8 digitos, sem contar o . ou -
    return s.replaceAll(/\.|\-/g, '').length <= 8;
}

function clearVariables() {
    op = n1 = n2 = undefined;
}

function validateAndUpdateDisplay() {
    n2 = parseFloat(displayValue);
    if (n2 == 0 & op == '/') {
        displayValue = errorMessage;
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
            // TODO na interface: botao clear
            clearVariables();
            newDisplay = false;
            displayValue = '0';
            break;
        case 'backspace':
            // TODO na interface: botao backspace
            displayValue = displayValue.slice(0, -1);
            if (displayValue == '') {
                displayValue = '0';
            }
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
