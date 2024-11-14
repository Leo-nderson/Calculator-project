let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const backspaceButton = document.querySelector('.backspace');
const toggleSignButton = document.querySelector('.toggle-sign');

digitButtons.forEach(button => button.addEventListener('click', () => appendDigit(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => setOperator(button.dataset.operator)));
clearButton.addEventListener('click', clear);
equalButton.addEventListener('click', evaluate);
decimalButton.addEventListener('click', addDecimal);
backspaceButton.addEventListener('click', backspace);
toggleSignButton.addEventListener('click', toggleSign);
window.addEventListener('keydown', handleKeyboardInput);

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

function appendDigit(digit) {
  if (shouldResetDisplay) resetDisplay();
  displayValue = displayValue === '0' ? digit : displayValue + digit;
  updateDisplay();
}

function resetDisplay() {
  displayValue = '';
  shouldResetDisplay = false;
}

function setOperator(operator) {
  if (currentOperator) evaluate();
  firstOperand = displayValue;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (!currentOperator || shouldResetDisplay) return;
  secondOperand = displayValue;
  displayValue = operate(currentOperator, firstOperand, secondOperand).toString();
  if (displayValue === 'Error') {
    display.textContent = 'Cannot divide by 0';
  } else {
    updateDisplay();
  }
  currentOperator = null;
}

function addDecimal() {
  if (shouldResetDisplay) resetDisplay();
  if (!displayValue.includes('.')) displayValue += '.';
  updateDisplay();
}

function clear() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay();
}