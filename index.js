display = document.getElementById("display");
numberBtns = document.getElementById("buttons").getElementsByClassName("numberBtn");
preview = document.getElementById("preview");

for (i = 0; i < numberBtns.length; i++) {
    const button = numberBtns.item(i);
    button.onclick = () => appendNumber(button.textContent);
}

const maxDisplayLength = 12;

function appendNumber(character) {
    if (resetDisplay) {
        display.value = "";
        resetDisplay = false;
    }

    const val = display.value;
    if (val === "" && character === "0")
        return;
    if (exceedsMaxLength(val + "0"))
        return;

    display.value = (val + character);
}
function flipSign() {
    display.value *= -1;
    display.value = validateInput(display.value);
}
function appendPeriod() {
    if (resetDisplay) {
        display.value = "";
        resetDisplay = false;
    }

    const val = display.value;
    //If empty, add a 0 before the period
    if (val === "") {
        display.value = "0";
    }

    //Add only one period at the end
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}
function validateInput(input) {
    if (isNaN(input) || input === "0" || input === "-0") {
        return "";
    }
    return input;
}
function exceedsMaxLength(input) {
    //If there's a period or minus sign, allow for extra characters on the display
    let extraCharacters = 0;
    if (input.includes(".")) {
        extraCharacters++;
    }
    if (input.includes("-")) {
        extraCharacters++;
    }

    if (input.length > maxDisplayLength + extraCharacters) {
        return true;
    }

    return false;
}

function backspace() {
    if (resetDisplay) {
        display.value = "";
        resetDisplay = false;
    }

    display.value = display.value.slice(0, -1);
    display.value = validateInput(display.value);
}
function clearAll() {
    display.value = "";
    previousNumber = 0;
    preview.textContent = "";
    multipleOperations = false;
}
function clearEntry() {
    display.value = "";
}

let previousNumber = 0;
let answer = 0;
let operationName = "";
let operatorSymbol = "";
let multipleOperations = false;
let resetDisplay = false;
let foundResult = false;
function performOperation(op) {
    if (multipleOperations && !resetDisplay) {
        calculate();
    }

    operationName = op;
    previousNumber = +validateInput(display.value);

    switch (op) {
        case "add":
            operatorSymbol = "+";
            break;
        case "subtract":
            operatorSymbol = "-"
            break;
        case "multiply":
            operatorSymbol = "×"
            break;
        case "divide":
            operatorSymbol = "÷"
            break;
    }
    preview.textContent = `${addBracketsIfNegative(previousNumber)} ${operatorSymbol}`;

    resetDisplay = true;

    multipleOperations = true;
}

function calculate() {
    preview.textContent = `${addBracketsIfNegative(previousNumber)} ${operatorSymbol} ${addBracketsIfNegative(+display.value)} =`;

    switch (operationName) {
        case "add":
            answer = previousNumber + +display.value;
            break;
        case "subtract":
            answer = previousNumber - +display.value;
            break;
        case "multiply":
            answer = previousNumber * +display.value;
            break;
        case "divide":
            answer = previousNumber / +display.value;
            break;
        default:
            answer = +display.value;
            break;
    }

    display.value = +answer.toPrecision(maxDisplayLength);
    display.value = validateInput(display.value);

    const val = display.value;
    if (exceedsMaxLength(val)) {
        display.value = "E" + val.slice(0, maxDisplayLength - 1);
    }

    operationName = "";
    multipleOperations = false;
    resetDisplay = true;
}
function addBracketsIfNegative(num) {
    return num < 0 ? `(${num})` : `${num}`;
}