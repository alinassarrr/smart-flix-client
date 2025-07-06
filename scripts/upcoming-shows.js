const userNav = document.querySelector(".button");
if (localStorage.getItem("user")) {
  userNav.innerHTML = "<div>Your Profile</div>";
  userNav.addEventListener("click", () => {
    console.log("Nav to Profile");
  });
}
