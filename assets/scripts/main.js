import "./libraries/imageMapResizer.min.js";
import { clearAllCalendarElements, createCalendarElements, updateText, updateCalendarElements } from "./modules/calendarLogic.js";
import "./modules/diagramSelector.js";
import "./modules/exerciseViewer.js";
import "./modules/settingsLogic.js";

var selectedDate = new Date();
selectedDate.setHours(0,0,0,0);

document.addEventListener("DOMContentLoaded", () => {
    createCalendarElements(selectedDate);
    updateText(selectedDate);
});

// Navigation Buttons
document.getElementById("navExercises").addEventListener("click", () => {
    document.getElementById("exerciseViewer").open = true;
});

document.getElementById("navAbout").addEventListener("click", () => {
    document.getElementById("aboutDialog").open = true;
});

function openDiagramPicker() {
    document.getElementById("diagramPicker").open = true;
    imageMapResize();
}
document.getElementById("navAdd").addEventListener("click", openDiagramPicker);
document.getElementById("addButton").addEventListener("click", openDiagramPicker);

document.getElementById("navSettings").addEventListener("click", () => {
    document.getElementById("settingsDialog").open = true;
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

// Close button logic for every dialog that has a close button element
document.querySelectorAll(".closeButton").forEach(button => {
    button.addEventListener("click", (event) => {
        let parent = event.target.dataset.parent;
        document.getElementById(parent).open = false;
    });
});