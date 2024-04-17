import { clearAllCalendarElements, createCalendarElements, updateText} from "./modules/calendarLogic.js";
import { SelectBodypart } from "./modules/diagramSelector.js";

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
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    updateCalendarElements(selectedDate);
});

document.getElementById("addButton").addEventListener("click", () => {
    document.getElementById("diagramPicker").open = true;
    imageMapResize();
});

document.querySelector(".closeButton").addEventListener("click", () => {
    document.getElementById("diagramPicker").open = false;
});

// Diagram selector
document.getElementById("diagram").addEventListener("click", (event) => {
    const target = event.target.closest("area");

    if (target) {
        SelectBodypart(target.dataset.bodypart);
    }
});