import { ZeroedDate } from "../libraries/handyFunctions.js";
import { updateCalendarElements } from "./calendarLogic.js";

// Reset Local Storage
function resetLocalStorage() {
    localStorage.clear();
    let currentDate = ZeroedDate();
    updateCalendarElements(currentDate);
    alert("Done!");
    location.reload();
}
document.getElementById("settingsResetLocalStorage").addEventListener("click", resetLocalStorage);

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