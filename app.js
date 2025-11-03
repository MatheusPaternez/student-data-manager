const nameInput = document.getElementById("name-input");
const gradeInput = document.getElementById("grade-input");
const buttonInput = document.getElementById("submit-button");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");
const average = document.getElementById("average-grade");
const main = document.querySelector("main");

const DATA_KEY = "dataNameGrade";
let dataList = [];
let namesSet = new Set();


const showData = () => {
    const nowData = main.querySelectorAll("div");
    nowData.forEach(div => div.remove())
    // It removes every div for instance, to avoid repeating the old data already on the screen

    dataList.forEach(item => {
        main.insertAdjacentHTML('beforeend', `<div>Name: ${item.name}; Grade: ${item.grade}</div>`);
        // Inserting the div into the HTML main
    });
}


const saveData = () => {
    localStorage.setItem(DATA_KEY, JSON.stringify(dataList));
    // Set item to Local Storage
}


const loadSavedData = () => {
    const SavedString = localStorage.getItem(DATA_KEY);
    // Get Item from Local Storage

    if (SavedString) {
        dataList = JSON.parse(SavedString);
        // If exists, then convert into an object
        namesSet = new Set(dataList.map(item => item.name));
        // Populate set with existing names
    } else {
        dataList = [];
        namesSet.clear();
        // If not exist, then return an empty array
    }
    calculateAverage();
    showData();
}

buttonInput.addEventListener("click", function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const grade = gradeInput.value;
    // When Submit Data button clicked, grab the user information writted in the input

    if (name && grade) {
        // Check if exist
        if (namesSet.has(name)) {
            alert("This name already exists!");
            return;
        }

        const newData = {
            name: name,
            grade: grade
        }; // If both data exist, then store into an object

        dataList.push(newData);
        namesSet.add(name);

        calculateAverage();
        showData();
        // Show data in screen
        nameInput.value = "";
        gradeInput.value = "";
        // Empty the input fields
    }
});

// Save Data Button
saveButton.addEventListener("click", function (e) {
    e.preventDefault();
    saveData();         
    // Save Data
    alert(`Saved ${dataList.length} entries.`);
    // Information for when data is saved
});

// Clear All Button
clearButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem(DATA_KEY);
    // Remove every data from local storage
    dataList = [];
    namesSet.clear();
    // Remove every data from datalist
    calculateAverage();
    showData();
    // Then, after all storage variables became empty, call the function for showing data
});

// Average Function
const calculateAverage = () => {
    // Calculate if data exist only
    if (dataList.length === 0) {
        average.innerHTML = "Average: 0.00";
        return;
    }

    // Sum the grades
    const total = dataList.reduce((sum, item) => sum + Number(item.grade), 0);

    // Calculate the average
    const avg = total / dataList.length;

    // Show the average in the h1 HTML element, with 2 decimal numbers
    average.innerHTML = `Average: ${avg.toFixed(2)}`;
}

loadSavedData();