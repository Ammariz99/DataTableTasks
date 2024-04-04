
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

    location.href = "login.html";
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
