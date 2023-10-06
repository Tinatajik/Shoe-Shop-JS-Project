document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Fetch user data from the JSON server
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${email}`
      );
      const userData = await response.json();

      if (userData.length === 1 && userData[0].password === password) {
        // Successful login
        window.location.href = "homePage1.html"; // Redirect to the home page
      } else {
        // Failed login
        errorMessage.textContent = "Invalid email or password";
      }
    } catch (error) {
      console.error(error);
      errorMessage.textContent =
        "An error occurred while processing your request";
    }
  });
});
