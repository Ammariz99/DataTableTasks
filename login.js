/*document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      var enteredUsernameEmail = document.getElementById("enterEmail").value;

      var enteredPassword = document.getElementById("enterPassword").value;

      var usersArray = localStorage.getItem("usersArray");

      if (usersArray) {
        usersArray = JSON.parse(usersArray);

        var loginSuccessful = false;

        for (var i = 0; i < usersArray.length; i++) {
          var userData = usersArray[i];

          if (
            (enteredUsernameEmail === userData.email ||
              enteredUsernameEmail === userData.username) &&
            enteredPassword === userData.password
          ) {
            loginSuccessful = true;

            break;
          }
        }

        if (loginSuccessful) {
          location.href = "../dataTable.html";
        } else {
          alert("Wrong email or password. Please try again.");
        }
      }
    });
});
*/
class LoginManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const loginBtn = document.getElementById("loginBtn");
      if (loginBtn) {
        loginBtn.addEventListener("click", this.login.bind(this));
      }
    });
  }

  login(event) {
    event.preventDefault();

    const enteredUsernameEmail = document.getElementById("enterEmail").value;
    const enteredPassword = document.getElementById("enterPassword").value;
    const usersArray = JSON.parse(localStorage.getItem("usersArray")) || [];

    const loginSuccessful = this.checkCredentials(usersArray, enteredUsernameEmail, enteredPassword);

    if (loginSuccessful) {
      location.href = "../dataTable.html";
    } else {
      alert("Wrong email or password. Please try again.");
    }
  }

  checkCredentials(usersArray, enteredUsernameEmail, enteredPassword) {
    for (const userData of usersArray) {
      if (
        (enteredUsernameEmail === userData.email ||
          enteredUsernameEmail === userData.username) &&
        enteredPassword === userData.password
      ) {
        return true;
      }
    }
    return false;
  }
}

const loginManager = new LoginManager();
