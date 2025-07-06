const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
console.log(form);
const BASE_URL = "http://localhost:8080/smart-flix/smart-flix-server";
window.onload = () => {
  if (localStorage.getItem("user")) {
    window.location.replace(
      "http://localhost:8080/smart-flix/smart-flix-client/index.html"
    );
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!email || !password) {
    alert("Please fill the fields");
  } else {
    axios
      .post(`${BASE_URL}/login`, {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          alert("Welcome Back!");
          localStorage.setItem("user", response.data.data);
          window.location.replace(
            "http://localhost:8080/smart-flix/smart-flix-client/index.html"
          );
        } else {
          alert(response.data.message);
        }
      });
  }
});
