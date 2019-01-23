//form fields
let email_login = document.getElementById("email-log");
let pass_login = document.getElementById("pass-log");
//button
let login = document.getElementById("login");
//event listener to the button
login.addEventListener("click", e => {
  e.preventDefault();
  let credentials = {
    email: email_login.value,
    pass: pass_login.value
  };
  let url = "http://localhost:8080/api/v1/auth/login";

  fetch(url, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(async res => {
      const body = await res.json();
      if (status === 200) {
        localStorage.setItem("token", body.token, body.user);
      }
      let { user_type } = body.user;
      (() => {
        if (user_type === "Client") {
          location.href = "/pages/dashboard.html";
        } else if (username === "Admin") {
          location.href = "/pages/admindash/html";
        }
      })();
    })
    .catch(error => console.error("Error:", error));
});
