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
            document.getElementById("exerciseViewerDescription").innerText = element.instructions.join("\n");
            let imgDir = "assets/data/free-exercise-db/exercises/";
            document.getElementById("exerciseViewerImage1").src = imgDir + element.images[0];
            document.getElementById("exerciseViewerImage2").src = imgDir + element.images[1];

            let tags = document.getElementById("exerciseViewerTags");
            while (tags.lastElementChild) {
                tags.removeChild(tags.lastElementChild);
            }
            tags.appendChild(createTag("Level", element.level, "red"));
            tags.appendChild(createTag("Equipment", element.equipment, "blue"));
            tags.appendChild(createTag("Category", element.category, "green"));


        };
        exerciseLabel.style.cursor = "pointer";

        sidebar.appendChild(exerciseLabel);
    });

    for (let index = 0; index < 10; index++) {
    }
});