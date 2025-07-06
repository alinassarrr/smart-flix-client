window.onload = () => {
  let day = localStorage.getItem("day");
  console.log(day);
  if (!day) {
    console.log("Error day date");
    return;
  }
  axios
    .post(`${BASE_URL}/shows`, {
      date: day,
    })
    .then((response) => {
      console.log(response.data);
      const showList = document.querySelector(".shows");
      if (response.data.status == 200) {
        const shows = response.data.data.shows;
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
      } else {
        const card = document.createElement("div");
        card.classList.add("show-card");
        card.innerHTML = `<h2>${response.data.message}</h2>`;
        showList.appendChild(card);
      }
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
