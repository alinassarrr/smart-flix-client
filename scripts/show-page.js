const selectedShow = JSON.parse(localStorage.getItem("selectedShow"));
console.log(selectedShow);

const container = document.querySelector(".selected-show");
const show = document.createElement("div");
show.classList.add("selected-show-details");

const back = document.querySelector(".back");
back.addEventListener("click", () => {
  window.location.href = "../pages/today-shows.html";
});

if (selectedShow) {
  const showContainer = document.querySelector(".selected-show");
  if (showContainer) {
    const url = "http://localhost:8080/smart-flix/smart-flix-server";
    const movie = selectedShow.movie;
    const genres = selectedShow.genres.map((g) => g.name).join(", ");
    const duration = movie.duration;
    const rating = movie.rating;
    const releaseYear = new Date(movie.release_date).getFullYear();
    const durationFormatted = `${Math.floor(duration / 60)}h ${duration % 60}m`;

    show.innerHTML = `
      <div class="upcoming-card">
          <img src="${url}${movie.cover_image}" alt="" />
        </div>
        <div class="show-text">
          <div class="show-title">
            <h1>${movie.title}</h1>
          </div>
          <div class="show-data">
            <p>${durationFormatted} • ${genres} • ${rating} • ${releaseYear}</p>
          </div>
          <div class="show-desc">
            <p>
             ${movie.description}
            </p>
          </div>
          <div class="show-buttons">
            <div class="select-seat book">Book a Seat</div>
            <a class="show-trailer book" href="${movie.trailer_url} target="_blank">Watch Trailer</a>
          </div>
    `;

    container.appendChild(show);
  }
}
