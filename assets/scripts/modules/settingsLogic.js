import { ZeroedDate, getSelectValues } from "../libraries/handyFunctions.js";
import { updateCalendarElements } from "./calendarLogic.js";

// Reset Local Storage
document.getElementById("settingsResetLocalStorage").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the settings? It will return the app to default settings.")) {
        localStorage.clear();
        let currentDate = ZeroedDate();
        updateCalendarElements(currentDate);
        alert("Settings successfully reset. Reloading the page...");
        location.reload();
    } else {
        alert("Aborted.");
    }
});

// Export Local Storage
document.getElementById("settingsExport").addEventListener("click", () => {
    let dataToExport = JSON.stringify(localStorage);
    let blob = new Blob([dataToExport], { type: "application/json" });

    let element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.target = "_blank";
    element.download = "exerplan_exported_data.json";
    element.click();
});

// Import Local Storage
document.getElementById("settingsImport").addEventListener("click", () => {
    let filePicker = document.createElement("input");
    filePicker.setAttribute("type", "file");
    filePicker.addEventListener("change", (event) => {
        let file = event.target.files[0]; // Get the selected file

        // Read the file
        const reader = new FileReader();
        reader.onload = (e) => {
            let contents = e.target.result; // Get the file contents
            
            // Clear localStorage and import file
            try {
                const importedObject = JSON.parse(contents);
                localStorage.clear();
                Object.keys(importedObject).forEach((keyName) => {
                    localStorage.setItem(keyName, importedObject[keyName]);
                });
                alert("Imported successfully... Reloading the page to confirm the changes...");
                location.reload();
            } catch (error) {
                alert("There was an error importing the file. \n\n" + error + "\n\nThis is likely due to an error with the exported file, or you submitted an invalid file.");
            }

        };
        reader.readAsText(file); // Read file as text
    });

    // Trigger the file picker dialog
    filePicker.click();
});

// Accent Colour
function hex2rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return { r, g, b };
}

export function setAccentColor(inputColorPicker) {
    let input = inputColorPicker;

    let rgbValues = hex2rgb(input.value);
    let r = (rgbValues.r / 255) * 100;
    let g = (rgbValues.g / 255) * 100;
    let b = (rgbValues.b / 255) * 100;

    // luminance calculation - basically converts the colour to grayscale and we can use that to see if it is a suitable colour
    let constractValue  = 100 - ((r * 0.2126) + (g * 0.7152) + (b * 0.0722));

    if (constractValue >= 50) {
        input.classList.remove("invalid");
        localStorage.setItem("preferenceAccentColor", input.value);
        document.querySelector(":root").style.setProperty("--accent", input.value);
    } else {
        input.classList.add("invalid");
    }
}

const colorInput = document.getElementById("accentColorPicker");
colorInput.addEventListener("input", () => {
    setAccentColor(colorInput);
});

export function loadSettingsText() {
    document.getElementById("currentlySelectedDifficulty").innerText = localStorage.getItem("preferenceDifficulty");
    document.getElementById("currentlySelectedEquipment").innerText = localStorage.getItem("preferenceEquipment").split("|").join(", ");
    document.getElementById("routineLengthOptionSettings").value = localStorage.getItem("preferenceRoutineLength");
}

document.getElementById("submitSettings").addEventListener("click", () => {
    let difficultyOption = document.getElementById("difficultyOptionSettings");
    let equipmentOption = document.getElementById("equipmentOptionSettings");
    let routineLengthOption = document.getElementById("routineLengthOptionSettings");

    if (getSelectValues(equipmentOption).length > 0) {
        localStorage.setItem("preferenceOnboarding", true);
        localStorage.setItem("preferenceDifficulty", difficultyOption.value);
        localStorage.setItem("preferenceEquipment", getSelectValues(equipmentOption).join("|"));
        localStorage.setItem("preferenceRoutineLength", routineLengthOption.value);
        loadSettingsText();
    } else {
        alert("Please make sure you select at least one equipment option.");
    }

});