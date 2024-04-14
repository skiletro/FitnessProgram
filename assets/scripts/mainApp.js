const getDaySuffix = (day) => {
    return day = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';
};

const getWrittenDate = (date) => {
    let day = date.getDate();
    let suffix = getDaySuffix(day);
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day}${suffix} ${months[monthIndex]} ${year}`;
};

const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
};

const getStartingIndexOffset = (date) => {
    let rawIndex = getFirstDayOfMonth(date).getDay(); // 0 sunday, 1 monday, etc etc
    if (rawIndex == 0) {
        return 6;
    } else {
        return rawIndex - 1;
    }
};

const generateCalendarArray = (date) => {
    let daysOfTheMonth = [];
    let tempDate = getFirstDayOfMonth(date);
    let currentMonth = tempDate.getMonth();
    
    // Add all of the dates for the current month into an array
    while (tempDate.getMonth() == currentMonth) {
        daysOfTheMonth.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
    }

    // Append discardable dates to the front of the array
    for (let index = 0; index < getStartingIndexOffset(now); index++) {
        daysOfTheMonth.splice(0, 0, new Date(0));
    }

    // Pad the rest of the array out with discardable dates
    // This is done to make sure the array length is always 42. (6 weeks)
    while (daysOfTheMonth.length < 42) {
        daysOfTheMonth.push(new Date(0));
    }

    return daysOfTheMonth;
}

const clearAllCalendarElements = () => {
    let daysContainer = document.getElementById("days");
    while (daysContainer.lastElementChild) {
        daysContainer.removeChild(daysContainer.lastElementChild);
    }
};

const createCalendarElements = (daysOfTheMonth) => {
    let daysContainer = document.getElementById("days");
    daysOfTheMonth.forEach(element => {
        let dayElement = document.createElement("div");

        if (element.toString() != new Date(0).toString()) { // Converting to string bc javascript is fucking stupid
            dayElement.textContent = element.getDate() + getDaySuffix(element.getDate());
            dayElement.classList.add('day');
            dayElement.dataset.day = element.getDate();
            dayElement.dataset.date = element;
            dayElement.addEventListener('click', () => {
                changeDay(dayElement);
            });
        } else {
            dayElement.textContent = "0";
            dayElement.classList.add('empty');
        }

        if (element.toString() == now.toString()) { // same here
            dayElement.classList.add('currentday');
        }

        daysContainer.appendChild(dayElement);
    });
};

const updateCalendarElements = (date) => {
    clearAllCalendarElements();
    createCalendarElements(generateCalendarArray(date));
    updateText();
};

const changeDay = (element) => {
    now.setDate(element.dataset.day);
    updateCalendarElements(now);
};

const updateText = () => {
    document.getElementById("calendarMonth").innerText = now.toLocaleString('default', { month: 'long' });
    document.getElementById("calendarYear").innerText = now.getFullYear();

    document.getElementById("informationDayName").innerText = now.toLocaleString('default', { weekday: "long"})
    document.getElementById("informationDate").innerText = getWrittenDate(now);
};

let now = new Date();
now.setHours(0,0,0,0); // Very important otherwise some comparisons fail
//now.setDate(now.getDate() + 169);

const PreviousMonth = () => {
    now.setMonth(now.getMonth() - 1);
    updateCalendarElements(now);
};

const NextMonth = () => {
    now.setMonth(now.getMonth() + 1);
    updateCalendarElements(now);
};

const GoBackToToday = () => {
    now = new Date();
    now.setHours(0,0,0,0);
    updateCalendarElements(now);
};

document.addEventListener("DOMContentLoaded", () => {
    createCalendarElements(generateCalendarArray(now));
    updateText();
});