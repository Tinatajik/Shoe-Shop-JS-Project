const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("passwordField");
const checkbox = document.getElementById("checkbox");
const signinButton = document.getElementById("signin");

// Add input event listeners to both email and password fields
emailInput.addEventListener("input", toggleSigninButton);
passwordInput.addEventListener("input", toggleSigninButton);

// Add change event listener to the checkbox
checkbox.addEventListener("change", toggleSigninButton);

function toggleSigninButton() {
  // Check if both email and password are filled, and the checkbox is checked
  if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
    signinButton.removeAttribute("disabled");
    signinButton.style.backgroundColor = "#212529"; // Change the button color
  } else {
    signinButton.setAttribute("disabled", true);
    signinButton.style.backgroundColor = ""; // Reset the button color
  }
}
