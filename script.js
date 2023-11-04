add = (n1, n2) => n1 + n2;
substract = (n1, n2) => n1 - n2;
multiply = (n1, n2) => n1 * n2;
divide = (n1, n2) => n1 / n2;

let n1, n2, op;

function operate(op, n1, n2) {
    switch (op) {
        case '+':
            return add(n1, n2);
        case '-':
            return substract(n1, n2);
        case '*':
            return multiply(n1, n2);
        case '/':
            return divide(n1, n2);
        default:
            return;
    }
}