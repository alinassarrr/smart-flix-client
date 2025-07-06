const form = document.getElementById("register-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const age = document.getElementById("age");
console.log(BASE_URL);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .post(`${BASE_URL}/register`, {
      username: username.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      age: age.value,
    })
    .then((response) => {
      console.log(response.data);

      if (response.data.status == 200) {
        alert(`${response.data.data}, Time to Login!`);

        window.location.replace(`${BASE_URL}/pages/login.html`);
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    });
});
