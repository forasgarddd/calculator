let num1;
let num2;
let operator = '';
let result;
let displayContent = '';

const display = document.querySelector("#display");
display.textContent = '';

const digits = document.querySelectorAll("#digit");
const operators = document.querySelectorAll("#operator");
const equal = document.querySelector("#equal");
const clear = document.querySelector("#clear");

for (let i = 0; i < digits.length; i++) {
    digits[i].addEventListener("click", () => {
        if (parseFloat(displayContent + digits[i].textContent) > 1e9) {
            return;
        }
        if (display.textContent === '0') {
            displayContent = '';
            display.textContent = displayContent;
            displayContent += digits[i].textContent;
            display.textContent = displayContent;
        } else if(!(display.textContent === '0' && digits[i].textContent === '0')) {
                displayContent += digits[i].textContent;
                display.textContent = displayContent;
        }
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", () => {
        if (display.textContent === '') {
            if(operator !== '') {
                operator = operators[i].textContent;
                console.log("n1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));
            } else {
                console.log("n1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));
            }
        } else {
            
            // Start
            if (operator === '') {
                num1 = parseFloat(display.textContent);
                //console.log("P: n1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));
                operator = operators[i].textContent;
                result = num1;
                console.log("START:\nn1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));
            } else {
                let equalClickEvent = new Event("click");
                equal.dispatchEvent(equalClickEvent);
                operator = operators[i].textContent;
                console.log("DIGIT:\nn1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));
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
        console.log("EQUAL TRUSTED:\nn1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));

    } else {
        if (!isNaN(parseFloat(displayContent))) {
            num1 = parseFloat(displayContent);
        }
        result = parseFloat((operate(result, num1, operator)).toFixed(3));
        console.log("EQUAL NOT TRUSTED:\nn1: " + num1 + ", n2: " + num2 + ", op: " + operator + (", res: " + result));
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
    num1 = 0;
    num2 = 0;
    result = 0;
    operator = '';
    displayContent = '';
    display.textContent = displayContent;
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