function getDaySuffix(day) {
    return day = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';
};

function getWrittenDate(date) {
    let day = date.getDate();
    let suffix = getDaySuffix(day);
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${day}${suffix} ${months[monthIndex]} ${year}`;
};

function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
};

function getStartingIndexOffset(date) {
    let rawIndex = getFirstDayOfMonth(date).getDay(); // 0 sunday, 1 monday, etc etc
    if (rawIndex == 0) {
        return 6;
    } else {
        return rawIndex - 1;
    }
};

export function generateCalendarArray(date) {
    let day = new Date(date);
    let daysOfTheMonth = [];
    let tempDate = getFirstDayOfMonth(day);
    let currentMonth = tempDate.getMonth();
    
    // Add all of the dates for the current month into an array
    while (tempDate.getMonth() == currentMonth) {
        daysOfTheMonth.push(new Date(tempDate));
        tempDate.setDate(tempDate.getDate() + 1);
    }

    // Append discardable dates to the front of the array
    for (let index = 0; index < getStartingIndexOffset(day); index++) {
        daysOfTheMonth.splice(0, 0, new Date(0));
    }

    // Pad the rest of the array out with discardable dates
    // This is done to make sure the array length is always 42. (6 weeks)
    while (daysOfTheMonth.length < 42) {
        daysOfTheMonth.push(new Date(0));
    }

    return daysOfTheMonth;
}

export function clearAllCalendarElements() {
    let daysContainer = document.getElementById("days");
    while (daysContainer.lastElementChild) {
        daysContainer.removeChild(daysContainer.lastElementChild);
    }
};

export function createCalendarElements(date) {
    let daysOfTheMonth = generateCalendarArray(new Date(date));

    let daysContainer = document.getElementById("days");
    daysOfTheMonth.forEach(element => {
        let dayElement = document.createElement("div");

        if (element.toString() != new Date(0).toString()) { // Converting to string bc javascript is fucking stupid
            dayElement.textContent = element.getDate() + getDaySuffix(element.getDate());
            dayElement.dataset.day = element.getDate();
            dayElement.dataset.date = element;
            dayElement.classList.add('populated');
        } else {
            dayElement.textContent = "0";
            dayElement.classList.add('empty');
        }

        if (element.toString() == date.toString()) { // same here
            dayElement.classList.add('currentday');
        }

        daysContainer.appendChild(dayElement);
    });
};

function changeDay(element) {
    now.setDate(element.dataset.day);
    updateCalendarElements(now);
};

export function updateText(date) {
    let day = new Date(date);
    document.getElementById("calendarMonth").innerText = day.toLocaleString('default', { month: 'long' });
    document.getElementById("calendarYear").innerText = day.getFullYear();

    document.getElementById("informationDayName").innerText = day.toLocaleString('default', { weekday: "long"})
    document.getElementById("informationDate").innerText = getWrittenDate(day);
};