import { ZeroedDate } from "../libraries/handyFunctions.js";
import { ExercisePlan, Exercise } from "../modules/exercisePlanClass.js";
import { updateCalendarElements } from "./calendarLogic.js";
import { createExercisePlan } from "./exercisePlanCreator.js";

var exerciseData;
var exerciseDataJson;
let selectedBodyparts = [];

document.addEventListener("DOMContentLoaded", async () => {
    exerciseData = await fetch('assets/data/free-exercise-db/dist/exercises.json');
    exerciseDataJson = await exerciseData.json();
});

// Mouse cursor available anywhere on the page.
let clientX;
let clientY;

document.body.addEventListener('mousemove', (event) => {
    clientX = event.clientX;
    clientY = event.clientY;
});

async function UpdateBodypartInformation() {
        // Update list of bodyparts
        let exerciseLabels = document.getElementsByClassName("diagramExercise");
        for (let index = 0; index < exerciseLabels.length; index++) {
            exerciseLabels[index].innerText = (selectedBodyparts.length != 0) ? selectedBodyparts.join(", ") : "nothing";
        };
    
        // Update list of exercises
        let listOfExercises = [];
        exerciseDataJson.forEach(element => {
            if (selectedBodyparts.includes(element.primaryMuscles[0])) {
                listOfExercises.push(element.name);
            }
        });
        document.getElementById("diagramExerciseInformation").innerText = listOfExercises.join(", ");
};

// Handle clicking on the diagrams
async function SelectBodypart(action) {
    // Add the bodypart to the stack if it's not already in the stack
    if (!selectedBodyparts.includes(action)) {
        selectedBodyparts.push(action);
    }

    // Update selector location
    let selector = document.getElementById("selector");
    let parentDivRect = document.getElementById("diagram").getBoundingClientRect();
    selector.style.opacity = 0.7;
    selector.style.left = (clientX - parentDivRect.left) + "px";
    selector.style.top = (clientY - parentDivRect.top) + "px";
    
    updateButtonClickability();

    await UpdateBodypartInformation();
};

function updateButtonClickability() {
    if (selectedBodyparts.length > 0) {
        document.getElementById("removeBodypart").disabled = false;
        document.getElementById("submitExercises").disabled = false;
    } else {
        document.getElementById("removeBodypart").disabled = true;
        document.getElementById("submitExercises").disabled = true;
    }
}

// Diagram selector
document.getElementById("diagram").addEventListener("click", (event) => {
    const target = event.target.closest("area");

    if (target) {
        SelectBodypart(target.dataset.bodypart);
    }
});

document.getElementById("removeBodypart").addEventListener("click", () => {
    selectedBodyparts.pop();
    UpdateBodypartInformation();
    updateButtonClickability();
});

document.getElementById("submitExercises").addEventListener("click", async () => {
    if (selectedBodyparts == 0) {
        alert("You have not selected anything. Try clicking on a body part!");
        return;
    }
    
    createExercisePlan(exerciseDataJson, selectedBodyparts);

    // Close dialog
    document.getElementById("diagramPicker").open = false;
});

// Disable dragging image
document.getElementById("diagram").ondragstart = () => { return false; };