import { ExercisePlan, Exercise } from "../modules/exercisePlanClass.js";
import { updateCalendarElements } from "./calendarLogic.js";

var exerciseData;
var exerciseDataJson;
const selectedBodyparts = [];

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

    await UpdateBodypartInformation();
};

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
});

document.getElementById("submitExercises").addEventListener("click", async () => {
    var today = new Date();
    today.setHours(0,0,0,0);

    if (selectedBodyparts != 0) {
        let difficulty = document.getElementById("difficultyOption").value;

        let date = new Date();
        date.setHours(0, 0, 0, 0);

        let exercises =  [];
        selectedBodyparts.forEach(bodypart => {
            let exercisesThatMatchFilter = [];
            exerciseDataJson.forEach(element => {
                // Put every exercise that matches the filter into an array
                if (element.primaryMuscles.includes(bodypart) && element.level == difficulty) {
                    exercisesThatMatchFilter.push(element.name);
                }
            });

            for (let index = 0; index < 3; index++) {
                let randomNumber = Math.floor(Math.random() * exercisesThatMatchFilter.length);
                // Start with 3 reps
                let min = 1;
                let max = 5;
                let amountOfReps = Math.floor(Math.random() * (max - min + 1)) + min
                let exercise = new Exercise(amountOfReps, exercisesThatMatchFilter[randomNumber]);
                exercises.push(exercise);                
            }
        });
    
        for (let index = 0; index < 28; index++) {
            let exercisePlan = new ExercisePlan(difficulty, selectedBodyparts, exercises);

            localStorage.setItem(date, JSON.stringify(exercisePlan));

            // Increment date            
            date.setDate(date.getDate() + 1);
        }


        // Refresh calendar and set the date back to todays date
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        updateCalendarElements(currentDate);

        // Close dialog
        document.getElementById("diagramPicker").open = false;
    } else {
        alert("You have not selected anything. Try clicking on a body part!");
    }
});

// Disable dragging image
document.getElementById("diagram").ondragstart = () => { return false; };