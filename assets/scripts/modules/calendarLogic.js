import { ZeroedDate } from "../libraries/handyFunctions.js";
import { loadExerciseData, getExerciseObjectFromName } from "./exerciseViewer.js";

function emptyElement(element) {
    while (element.lastElementChild) {
        element.removeChild(element.lastElementChild);
    }
}

function getDaySuffix(day) {
    return day = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';
};

function getWrittenDate(date) {
    let day = date.getDate();
    let suffix = getDaySuffix(day);
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day}${suffix} ${months[monthIndex]} ${year}`;
};

function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
};

function getStartingIndexOffset(date) {
    let rawIndex = getFirstDayOfMonth(date).getDay(); // 0 sunday, 1 monday, etc etc
    if (rawIndex == 0) {
        return 6;
    } else {
        return rawIndex - 1;
    }
};

export function generateCalendarArray(date) {
    let day = new Date(date);
    let daysOfTheMonth = [];
    let tempDate = getFirstDayOfMonth(day);
    let currentMonth = tempDate.getMonth();
    
    // Add all of the dates for the current month into an array
    while (tempDate.getMonth() == currentMonth) {
        daysOfTheMonth.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
    }

    // Append discardable dates to the front of the array
    for (let index = 0; index < getStartingIndexOffset(day); index++) {
        daysOfTheMonth.splice(0, 0, new Date(0));
    }

    // Pad the rest of the array out with discardable dates
    // This is done to make sure the array length is always 42. (6 weeks)
    while (daysOfTheMonth.length < 42) {
        daysOfTheMonth.push(new Date(0));
    }

    return daysOfTheMonth;
}

export function createCalendarElements(date) {
    let daysOfTheMonth = generateCalendarArray(new Date(date));

    let daysContainer = document.getElementById("days");
    daysOfTheMonth.forEach(element => {
        let dayElement = document.createElement("div");

        if (element.toString() != new Date(0).toString()) { // Converting to string bc JavaScript types are stupid
            dayElement.textContent = element.getDate() + getDaySuffix(element.getDate());
            dayElement.dataset.day = element.getDate();
            dayElement.dataset.date = element;
            dayElement.classList.add('populated');

            if (element in localStorage) { // If an entry for it exists in local storage...
                let orb = document.createElement("div");
                orb.classList.add('orb');
                dayElement.appendChild(orb);
            }
            

        } else {
            dayElement.textContent = "0";
            dayElement.classList.add('empty');
        }

        if (element.toString() == date.toString()) { // same here
            dayElement.classList.add('currentday');
        }

        daysContainer.appendChild(dayElement);
    });
};

export function updateCalendarElements(date) {
    emptyElement(document.getElementById("days"));
    createCalendarElements(date);
    updateText(date);
};

export function updateText(date) {
    let day = ZeroedDate(date);
    document.getElementById("calendarMonth").innerText = day.toLocaleString('default', { month: 'long' });
    document.getElementById("calendarYear").innerText = day.getFullYear();

    document.getElementById("informationDayName").innerText = day.toLocaleString('default', { weekday: "long"})
    document.getElementById("informationDate").innerText = getWrittenDate(day);


    let dayObject = JSON.parse(localStorage.getItem(day));
    let name = document.getElementById("informationExerciseNames");
    let desc = document.getElementById("informationExerciseDescriptions");

    // Empty the description element, ready for new information.
    emptyElement(desc);

    if (dayObject != null ) { // If there is deta at that day
        name.innerText = dayObject.bodyPart.join(", ");

        dayObject.exercises.forEach(exercise => {
            let exerciseElement = document.createElement("a");
            exerciseElement.onclick = () => {
                let object = getExerciseObjectFromName(exercise.exerciseName);
                loadExerciseData(object);
                document.getElementById("exerciseViewer").open = true;
            };
            
            let repsElement = document.createElement("span");
            repsElement.innerText = exercise.reps + "x";
            repsElement.classList.add("accent");

            let nameElement = document.createElement("span");
            nameElement.innerText = exercise.exerciseName;

            exerciseElement.appendChild(repsElement);
            exerciseElement.appendChild(nameElement);

            desc.appendChild(exerciseElement);
        });
    } else {
        name.innerText = "nothing"
    }
};