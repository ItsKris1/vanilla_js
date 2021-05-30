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
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function format(num) {
  if (num < 10) {
    return `0${num}`;
  }

  return num;
}
const giveawayDate = document.querySelector(".giveaway");
// Todays date
const tempDate = new Date();
const tYear = tempDate.getFullYear();
const tMonth = tempDate.getMonth();
const tDate = tempDate.getDate();

// Add 10 days to the current date, so the countdown will never end;
const futureDate = new Date(tYear, tMonth, tDate + 10, 14, 40);
const fDays = weekdays[futureDate.getDay()];
const fMonth = months[futureDate.getMonth()];
const fMinutes = format(futureDate.getMinutes());
const fHours = format(futureDate.getHours());
giveawayDate.textContent = `
giveaway ends on ${fDays}, 
${futureDate.getDate()} ${fMonth} ${futureDate.getFullYear()}, 
${fHours}:${fMinutes}`;

const deadline = document.querySelector(".deadline");
function getDifference() {
  const date = new Date();
  const difference = futureDate - date;

  if (difference < 0) {
    deadline.innerHTML = `<h4 class="expired">giveaway is over </p>`;
    clearInterval(countdown);
  }
  // milliseconds in seconds, minutes, hours, days
  const oneMin = 1000 * 60;
  const oneHour = 1000 * 60 * 60;
  const oneDay = 1000 * 60 * 60 * 24;

  const difDays = Math.floor(difference / oneDay);
  const difHours = Math.floor((difference % oneDay) / oneHour);
  const difMinutes = Math.floor((difference % oneHour) / oneMin);
  const difSeconds = Math.floor((difference % oneMin) / 1000);

  const values = [difDays, difHours, difMinutes, difSeconds];
  const deadlineTime = document.querySelectorAll(".deadline-format h4");

  deadlineTime.forEach((time, idx) => {
    time.innerHTML = values[idx];
  });
}

setInterval(getDifference, 1000);
getDifference();
