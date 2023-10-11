// address.js
const addressList = document.querySelector(".address-list");
const applyButton = document.getElementById("apply-button");
let selectedAddress = null;

addressList.addEventListener("click", (event) => {
  selectedAddress = event.target.value;
});

applyButton.addEventListener("click", () => {
  if (selectedAddress) {
    // Send the selected address to the server (JSON Server)
    // using an HTTP request (e.g., POST or PUT)
    // This would depend on your server implementation.
    // For example, using the Fetch API:

    fetch("http://localhost:3000/addresses", {
      method: "POST",
      body: JSON.stringify({ selectedAddress }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Please select an address before applying.");
  }
});
