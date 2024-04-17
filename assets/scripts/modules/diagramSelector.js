// Mouse cursor available anywhere on the page.
let clientX;
let clientY;

document.body.addEventListener('mousemove', (event) => {
    clientX = event.clientX;
    clientY = event.clientY;
})

// Handle clicking on the diagrams
export function SelectBodypart(action) {
    let exerciseLabels = document.getElementsByClassName("diagramExercise");
    for (let index = 0; index < exerciseLabels.length; index++) {
        exerciseLabels[index].innerText = action;
    }

    let selector = document.getElementById("selector");
    let parentDivRect = document.getElementById("diagram").getBoundingClientRect();

    selector.style.opacity = 0.7;
    selector.style.left = (clientX - parentDivRect.left) + "px";
    selector.style.top = (clientY - parentDivRect.top) + "px";

    ParseExerciseDataset(action);
}

async function ParseExerciseDataset(action) {
    let response = await fetch('assets/data/free-exercise-db/dist/exercises.json');
    let json = await response.json();
    let exercises = [];

    json.forEach(element => {
        if (element.primaryMuscles.includes(action)) {
            exercises.push(" " + element.name);
        }
    });

    document.getElementById("diagramExerciseInformation").innerText = exercises;
}

//document.getElementById("toggleAnnotations").addEventListener('change', (event) => {
//    let img = document.getElementById("diagramImage");
//    if (event.target.checked) {
//        img.src = "assets/diagrams/unannotated.svg";
//    } else {
//        img.src = "assets/diagrams/blank.svg";
//    }
//})

// Disable dragging image
document.getElementById("diagram").ondragstart = () => { return false; }