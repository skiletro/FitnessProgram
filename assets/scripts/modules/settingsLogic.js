import { updateCalendarElements } from "./calendarLogic.js";

document.getElementById("settingsResetLocalStorage").addEventListener("click", () => {
    localStorage.clear();
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    updateCalendarElements(currentDate);
    alert("Done!");
});