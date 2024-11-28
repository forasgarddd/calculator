let num1;
let result;
let operator = '';
let displayContent = '';

const display = document.querySelector("#display");
display.textContent = '';

const digits = document.querySelectorAll("#digit");
const operators = document.querySelectorAll("#operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

for (let i = 0; i < digits.length; i++) {
    digits[i].addEventListener("click", () => {
        // Set maximum display and number length
        if (parseFloat(displayContent + digits[i].textContent) > 1e9 || displayContent.length > 9) {
            return;
        }
        // Prevent from entering numbers that start with zero
        if (display.textContent === '0') {
            displayContent = '';
            display.textContent = '';
            displayContent += digits[i].textContent;
            display.textContent = displayContent;
        
        } else {
            displayContent += digits[i].textContent;
            display.textContent = displayContent;
        }
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", () => {
        // Change operator with no display
        if (display.textContent === '') {
            if(operator !== '') {
                operator = operators[i].textContent;
            }
        } else {
            // Start
            if (operator === '') {
                num1 = parseFloat(display.textContent);
                operator = operators[i].textContent;
                result = num1;
            } else {
                let equalClickEvent = new Event("click");
                equal.dispatchEvent(equalClickEvent);
                operator = operators[i].textContent;
            }
            displayContent = '';
            display.textContent = displayContent;
        }
    })
}

equal.addEventListener("click", (event) => {
    if (event.isTrusted) {
        if (!isNaN(parseFloat(displayContent))) {
            num1 = parseFloat(displayContent);
        } else {
            num1 = '';
            result = '';
            operator = '';
            return;
        }
        result = parseFloat((operate(result, num1, operator)).toFixed(3));
        operator = '';
    } else {
        if (!isNaN(parseFloat(displayContent))) {
            num1 = parseFloat(displayContent);
        }
        result = parseFloat((operate(result, num1, operator)).toFixed(3));
        }
    if (!isNaN(result)) {
        displayContent = result;
        display.textContent = displayContent;
    } else {
        displayContent = 'Error';
        display.textContent = displayContent;
    }
})

clear.addEventListener("click", () => {
    num1 = '';
    result = '';
    operator = '';
    displayContent = '';
    display.textContent = '';
})



function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}



function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
    }

    if (Math.abs(result) > 1e9) {
        return NaN;
    }

    return result;
}