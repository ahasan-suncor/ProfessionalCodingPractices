/* Created by: Ahmed
 * Created: Wed Feb 15 2023 
 * Description: Update the web page based on the checklist and categories selected.
 * Notes: 0. I am amazing annnnd hakuna matata!
 */

const categoryFilters = document.querySelectorAll('.filter');
const checklistContainer = document.getElementById('checklist-container');
const checklist = document.getElementById('checklist');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
const resetButton = document.querySelector('#reset-button');

let checkedItems = {};

// The key in this JSON needs to match the checkbox element ID tag in the HTML.
// This is so the correct list can be displayed based on what's selected.
let checklistCategoryItems;
fetch('checkListItems.json')
  .then(response => response.json())
  .then(data => {checklistCategoryItems = data})

// Retrieves all selected category filters from the UI and returns them as an array.
function getSelectedCategories() {
    const selectedCategories = [];
    categoryFilters.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.id);
        }
    });
    return selectedCategories;
}

function clearCheckedItems() {
    checkedItems = {};
}

function clearProgressText() {
    progressText.innerText = '';
}

// Called whenever a checklist checkbox is clicked, either removes the checked item or adds it.
function updateCheckedItem(categoryName, checklistItem) {
    const categoryItemsChecked = checkedItems[categoryName] || [];
    const itemIndex = categoryItemsChecked.indexOf(checklistItem);
    const itemExists = itemIndex !== -1;

    if (itemExists) {
        categoryItemsChecked.splice(itemIndex, 1);
    } else {
        categoryItemsChecked.push(checklistItem);
    }

    checkedItems[categoryName] = categoryItemsChecked;
    updateChecklistProgress();
}

// Updates the progress bar and progress text based on the current state of the items.
function updateChecklistProgress() {
    const filters = getSelectedCategories();
    let totalNumOfChecklistItems = 0;
    let numOfCompletedItems = 0;
    for (const filter of filters) {
        if (checklistCategoryItems[filter]) {
            totalNumOfChecklistItems += checklistCategoryItems[filter].length;
            numOfCompletedItems += checkedItems[filter] ? checkedItems[filter].length : 0;
        }
    }
    const percentComplete = Math.round((numOfCompletedItems / totalNumOfChecklistItems) * 100);
    progressBar.style.width = percentComplete + '%';
    progressText.innerText = percentComplete + '% Complete';
}

// Based on the state of the checkbox add/remove 'completed' css class.
function updateItemCompletionStatus(checkboxElement) {
    if (checkboxElement.checked) {
        checkboxElement.parentNode.classList.add('completed');
    } else {
        checkboxElement.parentNode.classList.remove('completed');
    }
}

// Updates the UI with the latest selected category checklist.
// If a new category checklist is added, the state of the old ones remain the same.
function createChecklistOnPage() {
    const selectedCategories = getSelectedCategories();

    if (selectedCategories.length === 0) {
        clearCheckedItems();
        clearProgressText();
        checklistContainer.style.display = 'none';
        checklist.innerHTML = '';
        return;
    }

    clearUnselectedChecklist(selectedCategories);

    let checklistItemsHTML = generateChecklistItems(selectedCategories);
    checklist.innerHTML = checklistItemsHTML;
    checklistContainer.style.display = 'block';

    updateChecklistProgress();
}

// For every category filter, if its not selected and it had items checked in its list, then clear it.
function clearUnselectedChecklist(selectedCategories) {
    for (const categoryFilterName in checklistCategoryItems) {
        const categoryChecklist = checklistCategoryItems[categoryFilterName];
        if (!selectedCategories.includes(categoryFilterName)) {
            categoryChecklist.forEach(item => {
                if (checkedItems[categoryFilterName] && checkedItems[categoryFilterName].includes(item)) {
                    updateCheckedItem(categoryFilterName, item);
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
    let checklistItems = '';
    categoryChecklist.forEach(item => {
        const isItemChecked = checkedItems[categoryName] && checkedItems[categoryName].includes(item);
        const itemClass = isItemChecked ? 'completed' : '';
        const itemAttribute = isItemChecked ? 'checked' : '';

        let checklistItemHTML = `<li class="${itemClass}">
                                     <label>
                                        <input type="checkbox" ${itemAttribute}
                                          onchange="updateCheckedItem('${categoryName}', '${item}'); 
                                                    updateItemCompletionStatus(this);">
                                         ${item}
                                     </label>
                                 </li>
                                `;

        checklistItems += checklistItemHTML;
    });
    return checklistItems;
}

// Adds an event listener to the reset button to clear the checked items and update the UI when clicked.
function addResetButtonEventListener() {
    resetButton.addEventListener('click', function () {
        clearCheckedItems();
        clearProgressText();
        createChecklistOnPage();
    });
}

// Add an event listener to add the checklist for the category selected.
function addCategoryFiltersEventListener() {
    categoryFilters.forEach(checkbox => {
        checkbox.addEventListener('change', createChecklistOnPage);
    });
}

function initializeApp() {
    addCategoryFiltersEventListener();
    addResetButtonEventListener();
    createChecklistOnPage();
}

initializeApp();