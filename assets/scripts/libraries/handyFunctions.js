// https://stackoverflow.com/questions/5866169/how-to-get-all-selected-values-of-a-multiple-select-box
// Rewritten a little bit to be more readable
export function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let currentOption;

    for (let i = 0; i < options.length; i++) {
        currentOption = options[i];

        if (currentOption.selected) {
            result.push(currentOption.value || currentOption.text);
        }
    }
  return result;
}

export function ZeroedDate(value) {
    if (value) {
        let date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date;
    } else {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }
}

export function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}