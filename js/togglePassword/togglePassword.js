const passwordField = document.getElementById("passwordField");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text"; // Change input type to text to reveal the password
  } else {
    passwordField.type = "password"; // Change input type back to password to hide the password
  }
});
