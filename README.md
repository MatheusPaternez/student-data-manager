# Grade Tracker App

A basic web application built with **HTML, CSS, and vanilla JavaScript** to track names and corresponding grades, calculate the average, and manage data persistence using Local Storage.

## Overview

This project provides a simple interface to:

* **Input Data:** Enter a student's name and their grade.
* **Prevent Duplicates:** Names must be unique for submission.
* **Display:** Show the list of submitted names and grades on the screen.
* **Calculate Average:** Automatically update and display the average of all entered grades.
* **Data Management:**
    * **Save All:** Store the current list of names and grades in the browser's **Local Storage** to persist data across sessions.
    * **Clear All:** Remove all data from both the list and Local Storage.
* **External Data:** Fetches and displays a list of users from a public API (`https://jsonplaceholder.typicode.com/users`).

## 💻 Code Explanation

### `index.html` (The structure)

* Sets up the basic webpage layout.
* Includes input fields for **Name** (`#name-input`) and **Grade** (`#grade-input`).
* Contains three buttons: **Submit Data** (`#submit-button`), **Save All** (`#save-button`), and **Clear All** (`#clear-button`).
* A header (`#average-grade`) displays the calculated average.
* Links to the **CSS file** (`style.css`) and the **JavaScript file** (`app.js`).

### `style.css` (The look)

* Provides basic styling for the form elements, inputs, buttons, and the displayed data entries (`div` elements).
* Uses `box-sizing: border-box` for consistent layout.

### `app.js` (The logic)

* **Initialization:** Selects necessary HTML elements and loads any previously saved data from Local Storage on startup using `loadSavedData()`.
* **Data Storage:** Uses two main structures:
    * `dataList`: An array of objects to hold `{name, grade}` pairs.
    * `namesSet`: A `Set` for quick validation to ensure names are unique.
* **`Submit Data` Logic:**
    * Adds a new `{name, grade}` object to `dataList` if both fields are filled and the name is **not a duplicate**.
    * Calls `calculateAverage()` and `showData()` to update the UI.
* **`Save All` Logic:** The `saveData()` function serializes `dataList` to a JSON string and stores it in Local Storage under the key `"dataNameGrade"`.
* **`Clear All` Logic:** Removes the data from Local Storage, clears `dataList` and `namesSet`, and updates the UI.
* **`calculateAverage()`:** Iterates over `dataList`, sums the grades, and updates the `#average-grade` header element.
* **`loadUsers()`:** An `async` function that fetches user data from a public API and dynamically appends the total count and usernames to the main section.