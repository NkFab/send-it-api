//form fields
let username = document.getElementById("username");
let pass = document.getElementById("pass");
let email = document.getElementById("email");
//button
let signup = document.getElementById("sign-up");
//event listener to the button
signup.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    username: username.value,
    pass: pass.value,
    email: email.value,
    user_type: "Client"
  };
  let url = "http://localhost:8080/api/v1/auth/signup";

  fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => (location.href = "/pages/login.html"))
    .catch(error => console.error("Error:", error));
});
