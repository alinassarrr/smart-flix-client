const form = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const age = document.getElementById("age");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .post(
      "http://localhost:8080/smart-flix/smart-flix-server/controllers/auth/create_user.php",
      {
        username: username.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        age: age.value,
      }
    )
    .then((response) => {
      console.log(`RESPONSE: ${JSON.stringify(response.data)}`);
      if (response.data.status == 200) {
        alert(`$response.data.message}, Time to Login!`);

        window.location.replace(
          "http://localhost:8080/smart-flix/smart-flix-client/pages/login.html"
        );
      } else {
        alert(response.data.message);
      }
    });
});
