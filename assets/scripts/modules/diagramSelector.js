// Mouse cursor available anywhere on the page.
let clientX;
let clientY;

const selectedBodyparts = [];

document.body.addEventListener('mousemove', (event) => {
    clientX = event.clientX;
    clientY = event.clientY;
});

async function UpdateBodypartInformation() {
        // Get json data
        let response = await fetch('assets/data/free-exercise-db/dist/exercises.json');
        let json = await response.json();
    
        // Update list of bodyparts
        let exerciseLabels = document.getElementsByClassName("diagramExercise");
        for (let index = 0; index < exerciseLabels.length; index++) {
            exerciseLabels[index].innerText = (selectedBodyparts.length != 0) ? selectedBodyparts.join(", ") : "nothing";
        };
    
        // Update list of exercises
        let listOfExercises = [];
        json.forEach(element => {
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

// Disable dragging image
document.getElementById("diagram").ondragstart = () => { return false; };