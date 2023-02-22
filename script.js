const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
const resetButton = document.querySelector('#reset-button');
let numOfCompletedItems = 0;

// Loop through each checkbox and an add event listener to update progress bar and text when clicked.
function addCheckboxEventListeners() {
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            updateCompletedItems(this);
            updateProgressBar();
        });
    });
}

// Based on the state of the checkbox add/remove 'completed' css class and update the items counter.
function updateCompletedItems(checkbox) {
    if (checkbox.checked) {
        checkbox.parentNode.classList.add('completed');
        numOfCompletedItems++;
    } else {
        checkbox.parentNode.classList.remove('completed');
        numOfCompletedItems--;
    }
}

function updateProgressBar() {
    const percentComplete = Math.round((numOfCompletedItems / checkboxes.length) * 100);
    progressBar.style.width = percentComplete + '%';
    progressText.innerText = percentComplete + '% Complete';
}

// Add event listener to the reset button to uncheck all checkboxes and reset items counter.
function addResetButtonEventListener() {
    resetButton.addEventListener('click', function () {
        resetCheckboxes();
        updateProgressBar();
    });
}

function resetCheckboxes() {
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkbox.parentNode.classList.remove('completed');
    });
    numOfCompletedItems = 0;
}

function initializeApp() {
    addCheckboxEventListeners();
    addResetButtonEventListener();
    updateProgressBar();
}

initializeApp();