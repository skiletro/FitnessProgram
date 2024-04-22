var exerciseData;
var exerciseDataJson;

function createTag(name, value, color) {
    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.classList.add(color);
    tag.dataset.name = name;
    tag.innerText = value;
    return tag;
}

export function loadExerciseData(exercise) {
    document.getElementById("exerciseViewer").getElementsByClassName("main")[0].style.opacity = 1;
    document.getElementById("exerciseViewerTitle").innerText = exercise.name;
    document.getElementById("exerciseViewerDescription").innerText = exercise.instructions.join("\n");
    let imgDir = "assets/data/free-exercise-db/exercises/";
    document.getElementById("exerciseViewerImage1").src = imgDir + exercise.images[0];
    document.getElementById("exerciseViewerImage2").src = imgDir + exercise.images[1];

    let tags = document.getElementById("exerciseViewerTags");
    while (tags.lastElementChild) {
        tags.removeChild(tags.lastElementChild);
    }
    tags.appendChild(createTag("Level", exercise.level, "red"));
    tags.appendChild(createTag("Equipment", exercise.equipment, "blue"));
    tags.appendChild(createTag("Category", exercise.category, "green"));
}

export function getExerciseObjectFromName(name) {
    return exerciseDataJson.find(element => element.name == name);
}

document.addEventListener("DOMContentLoaded", async () => {
    let sidebar = document.getElementById("exerciseViewer").getElementsByClassName("sidebar")[0];

    exerciseData = await fetch('assets/data/free-exercise-db/dist/exercises.json');
    exerciseDataJson = await exerciseData.json();

    exerciseDataJson.forEach(element => {
        let exerciseLabel = document.createElement("li");

        exerciseLabel.textContent = element.name;
        exerciseLabel.dataset.exercise = element.name;
        exerciseLabel.onclick = () => {
            loadExerciseData(element);
        };
        exerciseLabel.style.cursor = "pointer";

        sidebar.appendChild(exerciseLabel);
    });

    for (let index = 0; index < 10; index++) {
    }
});