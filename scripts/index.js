window.onload = () => {
  console.log(BASE_URL);
  axios.post(`${BASE_URL}/showsNum`, { date: dateInDB }).then((response) => {
    console.log(response.data);
    const totalShows = document.querySelector(".showing-num");
    totalShows.innerText =
      response.data.status == 200 ? response.data.data : response.data.message;
  });
};
const book = document.querySelector(".book");
const options = document.getElementById("options");
book.addEventListener("click", () => {
  options.scrollIntoView({ behavior: "smooth" });
});

const date = new Date();
console.log(date);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function matchDB(m) {
  if (m.toString().length == 1) {
    return `0${m}`;
  }
  return m.toString();
}
const month = months[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();
const today = `Today, ${month} ${day} ${year}`;

const dateInDB = `${year}-${matchDB(date.getMonth() + 1)}-${matchDB(day)}`;

console.log(dateInDB);

function time() {
  let hr = matchDB(date.getHours()); // 0 -> 23
  let min = matchDB(date.getMinutes());
  let shift;
  if (hr < 12) {
    shift = "am";
  } else {
    shift = "pm";
  }
  return `${hr}:${min} ${shift}`;
}

function updateDate() {
  const dateElement = document.querySelector(".date");
  const timeElement = document.querySelector(".time");

  dateElement.innerText = today;
  timeElement.innerText = time();

  localStorage.setItem("day", dateInDB);
}

setInterval(updateDate, 1000);

const showing = document.querySelector(".showing");
const todayShows = document.querySelector(".today-shows");
const upcoming = document.querySelector(".upcoming-shows");
showing.addEventListener("click", () => {
  window.location.href =
    "http://localhost:8080/smart-flix/smart-flix-client/pages/today-shows.html";
});
todayShows.addEventListener("click", () => {
  window.location.href =
    "http://localhost:8080/smart-flix/smart-flix-client/pages/today-shows.html";
});
upcoming.addEventListener("click", () => {
  window.location.href =
    "http://localhost:8080/smart-flix/smart-flix-client/pages/upcoming-shows.html";
});

const userNav = document.querySelector(".button");
if (localStorage.getItem("user")) {
  userNav.innerHTML = "<div>Your Profile</div>";
  userNav.addEventListener("click", () => {
    console.log("Nav to Profile");
  });
}
