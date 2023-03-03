/* Created by: Ahmed
 * Created: Wed Feb 15 2023 
 * Description: Update the web page based on the checklist and categories selected.
 * Notes: 0. I am amazing annnnd hakuna matata!
          1. The key in checklistCategoryItems JSON needs to match the checkbox element ID tag in the HTML.
             This is so the correct list can be displayed based on what's selected.
 */

const categoryCheckboxes = document.querySelectorAll('.filter');
const checklistContainer = document.getElementById('checklist-container');
const checklist = document.getElementById('checklist');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
const resetButton = document.querySelector('#reset-button');

// Remember the checklist items that have been checked.
let completedItems = {};

let checklistCategoryItems = {};

// Use the fetch API and async/await to retrieve the checklist items from an external file.
// This is to ensure the data is fully loaded before executing the rest of the code.
async function loadChecklistCategoryItems() {
    try {
        const response = await fetch('checkListItems.json');
        const data = await response.json();
        checklistCategoryItems = data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

function clearCheckedItems() {
    completedItems = {};
}

function clearProgressText() {
    progressText.innerText = '';
}

// Updates the UI with the latest selected category checklist.
function renderChecklist() {
    const selectedCategories = getSelectedCategories();

    if (selectedCategories.length === 0) {
        clearUI();
        return;
    }

    // Remove the checklist items from categories not selected and display the new list.
    clearUnselectedCategoryChecklist(selectedCategories);
    checklist.innerHTML = generateChecklistItems(selectedCategories);
    checklistContainer.style.display = 'block';
    updateChecklistCompletionStatus();
}

// Retrieves all selected category filters from the UI and returns them as an array.
function getSelectedCategories() {
    const selectedCategories = [];
    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.id);
        }
    });
    return selectedCategories;
}
function clearUI() {
    clearCheckedItems();
    clearProgressText();
    checklistContainer.style.display = 'none';
    checklist.innerHTML = '';
}

// For every category filter, if it's not selected, and it had items checked in its list, then clear it.
function clearUnselectedCategoryChecklist(selectedCategories) {
    for (const category in checklistCategoryItems) {
        const categoryChecklist = checklistCategoryItems[category];
        if (!selectedCategories.includes(category)) {
            categoryChecklist.forEach(item => {
                if (completedItems[category] && completedItems[category].includes(item)) {
                    updateCheckedItem(category, item);
                }
            });
        }
    }
}

// For every category filter, if its selected, create html list for its checklist items.
function generateChecklistItems(selectedCategories) {
    let checklistItemsHTML = '';
    for (const categoryFilterName in checklistCategoryItems) {
        const categoryChecklist = checklistCategoryItems[categoryFilterName];
        if (selectedCategories.includes(categoryFilterName)) {
            checklistItemsHTML += generateChecklistItemHTML(categoryChecklist, categoryFilterName);
        }
    }
    return checklistItemsHTML;
}

// Helper function to create the HTML for the checklist.
function generateChecklistItemHTML(categoryChecklist, categoryName) {
    let checklistHTML = '';
    categoryChecklist.forEach(item => {
        const isItemChecked = completedItems[categoryName] && completedItems[categoryName].includes(item);
        const itemClass = isItemChecked ? 'completed' : '';
        const itemAttribute = isItemChecked ? 'checked' : '';

        let checklistItemHTML = `<li class="${itemClass}">
                                     <label>
                                        <input type="checkbox" ${itemAttribute}
                                          onchange="updateCheckedItem('${categoryName}', '${item}'); 
                                                    updateChecklistCompletionStatus();
                                                    updateChecklistItemsStyle(this);
                                                    ">
                                         ${item}
                                     </label>
                                 </li>
                                `;

        checklistHTML += checklistItemHTML;
    });
    return checklistHTML;
}

// Called whenever a checklist checkbox is clicked: either persists the checked item's state or removes it.
function updateCheckedItem(categoryName, checklistItem) {
    const categoryItemsChecked = completedItems[categoryName] || [];
    const itemIndex = categoryItemsChecked.indexOf(checklistItem);
    const itemExists = itemIndex !== -1;

    if (itemExists) {
        categoryItemsChecked.splice(itemIndex, 1);
    } else {
        categoryItemsChecked.push(checklistItem);
    }

    completedItems[categoryName] = categoryItemsChecked;
}

// Updates the progress bar and progress text based on the current state of the items.
function updateChecklistCompletionStatus() {
    const selectedCategories = getSelectedCategories();
    let totalNumOfChecklistItems = 0;
    let numOfCompletedItems = 0;
    let percentComplete = 0;

    for (const category of selectedCategories) {
        if (checklistCategoryItems[category]) {
            totalNumOfChecklistItems += checklistCategoryItems[category].length;
            numOfCompletedItems += completedItems[category] ? completedItems[category].length : 0;
        }
    }
    if (totalNumOfChecklistItems > 0) {
        percentComplete = Math.round((numOfCompletedItems / totalNumOfChecklistItems) * 100);
    }
    progressBar.style.width = percentComplete + '%';
    progressText.innerText = percentComplete + '% Complete';
}

// Based on the state of the checkbox, add/remove 'completed' css class.
function updateChecklistItemsStyle(checkboxElement) {
    if (checkboxElement.checked) {
        checkboxElement.parentNode.classList.add('completed');
    } else {
        checkboxElement.parentNode.classList.remove('completed');
    }
}

// Adds an event listener to the reset button to clear the checked items and update the UI when clicked.
// Note: The reset button only clears the checklist and not the category filters.
function addResetButtonEventListener() {
    resetButton.addEventListener('click', function () {
        clearCheckedItems();
        clearProgressText();
        renderChecklist();
    });
}

// Add an event listener to add the checklist for the category selected.
function addCategoryFilterEventListener() {
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', renderChecklist);
    });
}

function initializeApp() {
    addCategoryFilterEventListener();
    addResetButtonEventListener();
    renderChecklist();
}

// The program waits till the list is loaded before initializing the app.
loadChecklistCategoryItems()
    .then(() => {
        initializeApp();
    });