let display = document.querySelector(".display");
let buttons = Array.from(document.querySelectorAll(".button"));

let currentInput = ""; // Текущий ввод
let lastResult = null; // Последний результат после "="
let newExpression = false; // Флаг для отслеживания начала нового выражения

// Функция для обновления дисплея
function updateDisplay(value) {
    display.innerText = value;
}

// Функция для обработки нажатий кнопок
function handleButtonClick(value) {
    switch (value) {
        case "AC":
            currentInput = "";
            lastResult = null;
            newExpression = false;
            updateDisplay("0");
            break;

        case "=":
            try {
                if (currentInput) {
                    lastResult = eval(currentInput);
                    currentInput = String(lastResult);
                    updateDisplay(currentInput);
                    newExpression = true; // Устанавливаем флаг, что нужно начать новое выражение
                }
            } catch (e) {
                updateDisplay("Error!");
                currentInput = "";
            }
            break;

        case "%":
            if (currentInput) {
                currentInput = eval(currentInput + "/100").toString();
                updateDisplay(currentInput);
            }
            break;

        case "+/-":
            if (currentInput) {
                if (currentInput.startsWith("-")) {
                    currentInput = currentInput.slice(1);
                } else {
                    currentInput = "-" + currentInput;
                }
                updateDisplay(currentInput);
            }
            break;

        default:
            handleInput(value);
    }
}

// Функция для обработки ввода цифр и операторов
function handleInput(value) {
    // Если только что было "=" и вводится число, начинаем новое выражение
    if (newExpression) {
        if (!Number.isNaN(Number(value))) {  // если число
            currentInput = value;
        } else {
            currentInput += value; // Если это оператор, продолжаем с lastResult
        }
        newExpression = false;
    } else {
        // Блокировка ввода первого символа `+`, `/`, `*`
        if (currentInput === "" && ["+", "/", "*"].includes(value)) {
            return;
        }


        // Обнаружение ввода отрицательного числа
        let lastChar = currentInput.slice(-1);
        if (value === "-" && ["+", "-", "*", "/"].includes(lastChar)) {
            currentInput += "(-";
            updateDisplay(currentInput);
            return;
        }

        // Закрытие скобки после ввода числа
        if (currentInput.endsWith("(-") && !isNaN(value)) {
            currentInput += value + ")";
            updateDisplay(currentInput);
            return;
        }
        

        // Запрет на ввод нескольких `.` в одном числе
        if (value === ".") {
            let lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
            if (lastNumber.includes(".")) {
                return;
            }
            if (lastNumber === "") {
                value = "0."; // Если первым символом ".", добавляем "0."
            }
        }

        currentInput += value;
    }

    updateDisplay(currentInput);
}

// Добавление событий для кнопок
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleButtonClick(e.target.innerText);
    });
});

// Ввод с клавиатуры
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/[\d+\-*/.=%]/.test(key)) {
        handleButtonClick(key);
    } else if (key === "Enter") {
        handleButtonClick("=");
    } else if (key === "Escape") {
        handleButtonClick("AC");
    } else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1) || "0";
        updateDisplay(currentInput);
    }
});
