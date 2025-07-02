window.onload = () => {
  let day = localStorage.getItem("day");
  console.log(day);
  if (!day) {
    console.log("Error day date");
    return;
  }
  axios
    .post(
      "http://localhost:8080/smart-flix/smart-flix-server/controllers/shows/get_shows.php",
      {
        date: day,
      }
    )
    .then((response) => {
      const shows = response.data.shows;
      const showList = document.querySelector(".shows");
      const url = "http://localhost:8080/smart-flix/smart-flix-server";
      shows.forEach((item) => {
        console.log(item);
        const show = item["show"];
        const movie = item["movie"];
        const aud = item["auditorium"]["name"];
        const genre = item["categories"];
        const card = document.createElement("div");
        card.classList.add("show-card");
        card.innerHTML = `<div class="show-movie">
          <img src="${url}${movie.cover_image}" alt="" />
          <div class="show-title">
            <h2>${movie.title}</h2>
            <p>${genre.map((g) => g.name).join(", ")}</p>
          </div>
        </div>
        <div class="show-time">
          <h2>${formatDate(show.startTime)}</h2>
          <p>Hall ${aud}</p>
        </div>
        <div class="price">$${show.price}</div>
        <a href="./show-page.html" class="book">Book Now</a>
      </div>`;
        showList.appendChild(card);
        const bookBtn = card.querySelector(".book");

        bookBtn.addEventListener("click", (e) => {
          const data = {
            movie,
            show,
            auditorium: aud,
            genres: genre,
          };
          localStorage.setItem("selectedShow", JSON.stringify(data));
        });
      });
    });
};

function formatDate(dateString) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", options);
}
