const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

let currentInput = "";

/* ➕ Append value */
function appendValue(value) {
    if (value === "√") {
        currentInput = `Math.sqrt(${currentInput})`;
        display.value = "√(" + display.value + ")";
    } else {
        currentInput += value;
        display.value += value;
    }
}

/* ❌ Clear */
function clearDisplay() {
    currentInput = "";
    display.value = "";
}

/* ⌫ Delete last */
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = display.value.slice(0, -1);
}

/* 🧮 Calculate */
function calculate() {
    try {
        let result = eval(currentInput);

        // Save history
        addToHistory(display.value + " = " + result);

        display.value = result;
        currentInput = result.toString();
    } catch (error) {
        display.value = "Error";
        currentInput = "";
    }
}

/* 📜 History */
function addToHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li);
}
/* 🌙 Theme Toggle */
const toggleBtn = document.getElementById("themeToggle");
let isDark = false;

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    isDark = !isDark;
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
});

/* ⌨️ Keyboard Support */
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendValue(key);
    } 
    else if (key === "Enter") {
        calculate();
    } 
    else if (key === "Backspace") {
        deleteLast();
    } 
    else if (key === "Escape") {
        clearDisplay();
    }
});
