import { clearAllCalendarElements, createCalendarElements, updateText} from "./modules/calendarLogic.js";
import { SelectBodypart } from "./modules/diagramSelector.js";
import "./modules/exerciseViewer.js";

var selectedDate = new Date();
selectedDate.setHours(0,0,0,0);

document.addEventListener("DOMContentLoaded", () => {
    createCalendarElements(selectedDate);
    updateText(selectedDate);
});

function updateCalendarElements(date) {
    clearAllCalendarElements();
    createCalendarElements(date);
    updateText(date);
}

// Navigation Buttons
document.getElementById("navExercises").addEventListener("click", () => {
    document.getElementById("exerciseViewer").open = true;
});

// Calendar
document.getElementById("days").addEventListener("click", (event) => {
    const target = event.target.closest(".populated");

    if (target) {
        selectedDate.setDate(target.dataset.day);
        updateCalendarElements(selectedDate);
    };
});

document.getElementById("gotoPreviousMonth").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    updateCalendarElements(selectedDate);
});
document.getElementById("gotoToday").addEventListener("click", () => {
    selectedDate = new Date();
    selectedDate.setHours(0,0,0,0);
    updateCalendarElements(selectedDate);
});
document.getElementById("gotoNextMonth").addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    updateCalendarElements(selectedDate);
});

function openDiagramPicker() {
    document.getElementById("diagramPicker").open = true;
    imageMapResize();
}
document.getElementById("navAdd").addEventListener("click", openDiagramPicker);
document.getElementById("addButton").addEventListener("click", openDiagramPicker);

// Close button logic for every dialog that has a close button element
document.querySelectorAll(".closeButton").forEach(button => {
    button.addEventListener("click", (event) => {
        let parent = event.target.dataset.parent;
        console.log(parent);
        document.getElementById(parent).open = false;
    });
});