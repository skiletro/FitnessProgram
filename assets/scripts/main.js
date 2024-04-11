// Mouse cursor available anywhere on the page.
let clientX;
let clientY;

document.body.addEventListener('mousemove', (event) => {
    clientX = event.clientX;
    clientY = event.clientY;
})

// Handle clicking on 

const Open = (action) => {
    document.getElementById("bodyLocation").innerText = action;

    let selector = document.getElementById("selector");
    let parentDivRect = document.getElementById("diagram").getBoundingClientRect();

    selector.style.opacity = 0.7;
    selector.style.left = (clientX - parentDivRect.left) + "px";
    selector.style.top = (clientY - parentDivRect.top) + "px";

    Parse(action);
}

const Parse = async (action) => {
    let response = await fetch('assets/data/exercises.json');
    let json = await response.json();
    let exercises = [];

    json.forEach(element => {
        if (element.primaryMuscles.includes(action)) {
            exercises.push(element.name);
        }
    });

    document.getElementById("exercises").innerText = exercises;
}

// Disable dragging image
document.getElementById('diagram').ondragstart = () => { return false; }

// https://github.com/davidjbradshaw/image-map-resizer
imageMapResize();