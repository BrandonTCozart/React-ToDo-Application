//sets up classes
const calendar = $(".calendar");
const date = $(".date");
const daysContainer = $(".days");
const prev = $(".prev");
const next = $(".next");
const todayButton = $(".today-button");
const gotoButton = document.querySelector(".goto-button");
const dateInput = document.querySelector(".date-input");

//Creates dates
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

//converts month num to String
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//adds days for prev, current, and next month
function createCalendar() {
  const firtsDay = new Date(year, month, 1);
  const day = firtsDay.getDay();

  const lastDay = new Date(year, month + 1, 0);
  const lastDate = lastDay.getDate();

  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();

  const nextDays = 7 - lastDay.getDay() - 1;

  date.html(months[month] + " " + year);

  let days = "";

  //prev days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
  }

  for (let y = 1; y <= lastDate; y++) {
    if (
      y === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      y;
      days += `<div class="day today" >${y}</div>`;
    } else {
      days += `<div class="day" >${y}</div>`;
    }
  }

  for (let z = 1; z <= nextDays; z++) {
    days += `<div class="day next-date" >${z}</div>`;
  }

  daysContainer.html(days);
}
createCalendar();

//creates previous and next months changer

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  createCalendar();
}
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  createCalendar();
}
$(".next").on("click", nextMonth);
$(".prev").on("click", prevMonth);

//Date Go to button
$(".today-button").on("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  createCalendar();
});

//Date input

dateInput.addEventListener("input", (e) => {
  // Remove non-numeric characters from the input value
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }

  //sets a limit to 7 characters
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }

  // deletes the slash and the second number for the month
  dateInput.addEventListener("input", function (e) {
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 1);
        //NOTE this part is also deleting the fist number in year
      }
    }
  });
});

gotoButton.addEventListener("click", gotoDate);


function gotoDate() {
  const dateArray = dateInput.value.split("/");

  if (dateArray.length === 2) {
    if (dateArray[0] > 0 && dateArray[0] < 13 && dateArray[1].length === 4) {
      month == dateArray[0] - 1;
      year = dateArray[1];
      createCalendar();
      return;
    }
  }

  //alert for invalid dates
  alert("invalid date");
}
