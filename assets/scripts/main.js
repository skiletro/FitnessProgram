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
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    updateCalendarElements(selectedDate);
});

document.getElementById("addButton").addEventListener("click", () => {
    document.getElementById("diagramPicker").open = true;
    imageMapResize();
});

// Make a close button for each dialog
document.querySelectorAll(".closeButton").forEach(button => {
    button.addEventListener("click", (event) => {
        let parent = event.target.dataset.parent;
        console.log(parent);
        document.getElementById(parent).open = false;
    });
});

// Diagram selector
document.getElementById("diagram").addEventListener("click", (event) => {
    const target = event.target.closest("area");

    if (target) {
        SelectBodypart(target.dataset.bodypart);
    }
});

function createTag(name, value, color) {
    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.classList.add(color);
    tag.dataset.name = name;
    tag.innerText = value;
    return tag;
}

document.addEventListener("DOMContentLoaded", async () => {
    let sidebar = document.getElementById("exerciseViewer").getElementsByClassName("sidebar")[0];

    let response = await fetch('assets/data/free-exercise-db/dist/exercises.json');
    let json = await response.json();
    json.forEach(element => {
        let exerciseLabel = document.createElement("li");

        exerciseLabel.textContent = element.name;
        exerciseLabel.dataset.exercise = element.name;
        exerciseLabel.onclick = () => {
            document.getElementById("exerciseViewer").getElementsByClassName("main")[0].style.opacity = 1;
            document.getElementById("exerciseViewerTitle").innerText = element.name;
            document.getElementById("exerciseViewerDescription").innerText = element.instructions;
            document.getElementById("exerciseViewerImage").src = "assets/data/free-exercise-db/exercises/" + element.images[0];

            let tags = document.getElementById("exerciseViewerTags");
            while (tags.lastElementChild) {
                tags.removeChild(tags.lastElementChild);
            }
            tags.appendChild(createTag("Level", element.level, "red"));
            tags.appendChild(createTag("Equipment", element.equipment, "blue"))


        };
        exerciseLabel.style.cursor = "pointer";

        sidebar.appendChild(exerciseLabel);
    });

    for (let index = 0; index < 10; index++) {
    }
});