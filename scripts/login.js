const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
console.log(form);
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
      .post(
        "http://localhost:8080/smart-flix/smart-flix-server/controllers/auth/login_user.php",
        {
          email: email.value,
          password: password.value,
        }
      )
      .then((response) => {
        console.log(`RESPONSE: ${JSON.stringify(response.data)}`);
        if (response.data.status == 200) {
          alert(response.data.message);
          localStorage.setItem("user", response.data.userID);
          window.location.replace(
            "http://localhost:8080/smart-flix/smart-flix-client/index.html"
          );
        } else {
          alert(response.data.message);
        }
      });
  }
});
