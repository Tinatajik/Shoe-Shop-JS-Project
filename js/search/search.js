const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = data.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );

      displayResults(filteredProducts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function displayResults(products) {
  searchResults.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.textContent = product.name;
    searchResults.appendChild(productElement);
  });
}
