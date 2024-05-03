import { ZeroedDate, randomNumberGenerator } from "../libraries/handyFunctions.js";
import { updateCalendarElements } from "./calendarLogic.js";
import { Exercise, ExercisePlan } from "./exercisePlanClass.js";

function difficultyNameToNumber(difficultyName) {
    if (difficultyName == "beginner") {
        return 0;
    } else if (difficultyName == "intermediate") {
        return 1;
    } else {
        return 2;
    }
}

export function createExercisePlan(dataset, selectedBodyparts) {
    let difficulty = localStorage.getItem("preferenceDifficulty");
    let equipment = localStorage.getItem("preferenceEquipment").split("|");

    let date = ZeroedDate();

    let listOfExercises = [];
    selectedBodyparts.forEach(bodypart => {
        let exercisesThatMatchFilter = [];
        dataset.forEach(element => {
            // Put every exercise that matches the filter into an array
            let includesBodypart = element.primaryMuscles.includes(bodypart);
            let userHasMachines = (equipment.includes(element.equipment) || element.equipment == "body only");
            let matchesDifficulty = (difficultyNameToNumber(element.level) <= difficultyNameToNumber(difficulty));

            if (includesBodypart && userHasMachines && matchesDifficulty) {
                exercisesThatMatchFilter.push(element.name);
            }
        });

        // Add 3 (or less) unique exercises to the list of exercises
        let amountOfExercisesForBodypart = Math.min(3, exercisesThatMatchFilter.length);
        let index = 0;
        while (index < amountOfExercisesForBodypart) {
            let exercise = exercisesThatMatchFilter[randomNumberGenerator(0, exercisesThatMatchFilter.length - 1)];
            if (!listOfExercises.includes(exercise)) {
                listOfExercises.push(exercise);
                index++;
            }
        }

    });

    // For each day...
    let routineLength = localStorage.getItem("preferenceRoutineLength");
    for (let index = 0; index < routineLength; index++) {
        let listOfExercisesToDo = [];

        // Sources vary massively depending on the amount of reps is best... This code should try and ramp up the amount of exercises done throughout the month
        let lowerEndOfReps;
        let upperEndOfReps;
        if (index >= 18) {
            lowerEndOfReps = 4;
            upperEndOfReps = 8;
        } else if (index >= 9) {
            lowerEndOfReps = 3;
            upperEndOfReps = 7;
        } else {
            lowerEndOfReps = 2;
            upperEndOfReps = 6;
        }

        // Generate a new exercise regiment
        listOfExercises.forEach(exercise => {
            let amountOfReps = randomNumberGenerator(lowerEndOfReps, upperEndOfReps);
            listOfExercisesToDo.push(new Exercise(amountOfReps, exercise))
        });

        let exercisePlan = new ExercisePlan(difficulty, selectedBodyparts, listOfExercisesToDo);

        localStorage.setItem(date, JSON.stringify(exercisePlan));

        // Increment date            
        date.setDate(date.getDate() + 1);
    }

    // Refresh calendar and set the date back to todays date
    let currentDate = ZeroedDate();
    updateCalendarElements(currentDate);
}