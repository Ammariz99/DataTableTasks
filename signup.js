// sign up
/*
document.addEventListener("DOMContentLoaded", function () {
  var usersArray = localStorage.getItem("usersArray");

  if (!usersArray) {
    usersArray = [];
  } else {
    usersArray = JSON.parse(usersArray);
  }

  document
    .getElementById("signupBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      var username = document.getElementById("username").value;

      var email = document.getElementById("email").value;

      var password = document.getElementById("password").value;

      var userData = {
        username: username,

        email: email,

        password: password,
      };

      usersArray.push(userData);

      var jsonData = JSON.stringify(usersArray);

      localStorage.setItem("usersArray", jsonData);

      alert("Sign up successful!");

      document.getElementById("username").value = "";

      document.getElementById("email").value = "";

      document.getElementById("password").value = "";
      location.href = "../Login/login.html";
    });
});
*/
class SignupManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const signupBtn = document.getElementById("signupBtn");
      if (signupBtn) {
        signupBtn.addEventListener("click", this.signup.bind(this));
      }
    });
  }

  signup(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userData = {
      username,
      email,
      password
    };

    const usersArray = this.getUsersArray();
    usersArray.push(userData);
    this.saveUsersArray(usersArray);

    alert("Sign up successful!");

    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    location.href = "/login.html";
  }

  getUsersArray() {
    const usersArrayString = localStorage.getItem("usersArray");
    return usersArrayString ? JSON.parse(usersArrayString) : [];
  }

  saveUsersArray(usersArray) {
    const jsonData = JSON.stringify(usersArray);
    localStorage.setItem("usersArray", jsonData);
  }
}

const signupManager = new SignupManager();
