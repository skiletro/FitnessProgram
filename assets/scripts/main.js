import { ZeroedDate, getSelectValues } from "./libraries/handyFunctions.js";
import "./libraries/imageMapResizer.min.js";
import { createCalendarElements, updateText, updateCalendarElements } from "./modules/calendarLogic.js";
import "./modules/diagramSelector.js";
import "./modules/exerciseViewer.js";
import "./modules/settingsLogic.js";
import { loadSettingsText, setAccentColor } from "./modules/settingsLogic.js";

var selectedDate = ZeroedDate();

document.addEventListener("DOMContentLoaded", () => {
    // Create the calendar (without this, the calendar won't be loaded at all)
    createCalendarElements(selectedDate);
    // Update the text in relation to the calendar and the current day
    updateText(selectedDate);

    // Set the preference color
    if ("preferenceAccentColor" in localStorage) {
        let accentColor = localStorage.getItem("preferenceAccentColor");
        document.querySelector(":root").style.setProperty("--accent", accentColor)
    }

    // If the user needs to be onboarded, then open the onboarding dialog
    if (("preferenceOnboarding" in localStorage) == false) {
        document.getElementById("onboarding").open = true;
    }
});

// Navigation Buttons
document.getElementById("navExercises").addEventListener("click", () => {
    document.getElementById("exerciseViewer").open = true;
});

function openDiagramPicker() {
    document.getElementById("diagramPicker").open = true;
    imageMapResize();
}
document.getElementById("navAdd").addEventListener("click", openDiagramPicker);
document.getElementById("addButton").addEventListener("click", openDiagramPicker);

document.getElementById("navSettings").addEventListener("click", () => {
    document.getElementById("settingsDialog").open = true;
    loadSettingsText();
});

document.getElementById("navHelp").addEventListener("click", () => {
    document.getElementById("helpPrompt").open = true;
});

// Onboarding
let onboardingColorPicker = document.getElementById("accentOption");
onboardingColorPicker.addEventListener("input", () => {
    setAccentColor(onboardingColorPicker);
});

document.getElementById("submitOnboarding").addEventListener("click", () => {
    let difficultyOption = document.getElementById("difficultyOption");
    let equipmentOption = document.getElementById("equipmentOption");

    if (getSelectValues(equipmentOption).length > 0) {
        localStorage.setItem("preferenceOnboarding", true);
        localStorage.setItem("preferenceDifficulty", difficultyOption.value);
        localStorage.setItem("preferenceEquipment", getSelectValues(equipmentOption).join("|"));
        localStorage.setItem("preferenceRoutineLength", 28);
        document.getElementById("onboarding").open = false;
    } else {
        alert("Please make sure you select at least one equipment option.");
    }
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
    selectedDate = ZeroedDate();
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