//sets up classes
const calendar = $(".calendar");
const date = $(".date");
const daysContainer = $(".days");
const prev = $(".prev");
const next = $(".next");

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

//creates previous and next months

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
