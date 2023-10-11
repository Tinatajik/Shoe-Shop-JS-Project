const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");
const notFound = document.getElementById("not-found-page");
const resaultFor = document.getElementById("resault-for");

let debounceTimer;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(searchProduct, 300);
});

function searchProduct() {
  const searchTerm = searchInput.value.toLowerCase();
  console.log(searchTerm);
  fetch(`http://localhost:3000/products?category=${searchTerm}`)
    .then((response) => response.json())
    .then((products) => {
      displaySearchResults(products);
      // addToSearch(products);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  resaultFor.textContent = `${searchTerm}`;
}

function displaySearchResults(products) {
  // searchResultsContainer.innerHTML = "";

  if (products.length === 0) {
    notFound.style.display = "block";
  } else {
    addToSearch();
  }
}
const addToSearch = (products) => {
  products.forEach((product) => {
    const html = `
  <!-- <div class="mt-5 ml-3">
  <svg
    width="130"
    height="130"
    viewBox="0 0 182 182"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="182" height="182" rx="24" fill="#F3F3F3" />
  </svg>
  <img
    class="absolute w-24 h-14 ml-4"
    style="margin-top: -6rem"
    src="https://s3-alpha-sig.figma.com/img/a629/ce53/76b7019ca8c73dbf4f6e12c310d1cc39?Expires=1696809600&Signature=mJBwxaBXtr8ieePSIoSXtng5zs5TiQzG-GUuj28zVn4iaEKuN2xdUAEg2TjSFsweBZEGnuMwxhuCHWR4KXIpjLc3t~O1Rt1S3lA0VdNF4tAZTP81GQ8W4P8uAthO2CkgizmkQIgrhRhnLmmOYThZrCcy1n88-Acj5ZXDfJ6d0J26dG4fcwWscmfOcboKGLVuWB3V1oD~hZA7ni4H4l3f-kNdSOXTYZJaStJ8MUu~SQc9w7lwks~50~CfVP-LIeuzybQPeoFLjN9StGO3kiaXKZJNMYqyCdY8GCzIWkjrKUAkXa~tdNfgBF9~61FeOzcan7aZh2dRzrIlyK3UGgoQmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  />
  <p class="text-sm font-bold ml-2 mt-2">${product.title}...</p>
  <div class="flex mt-2 gap-1">
    <img
      src="./assets/images/star-icon/icons8-star-half-empty-24.png"
      alt="star-icon"
      class="w-5 h-5 ml-2"
      style="margin-top: -0.05rem"
    />
    <p class="text-xs">4.5</p>
    <p class="text-xs">|</p>
    <div class="text-xs w-16 h-5 bg-gray-200 text-center rounded ml-1">
      5,371 sold
    </div>
  </div>
  <p class="text-sm font-semibold ml-2 mt-1">$ 85.00</p>
</div>
  `;
    searchResultsContainer.insertAdjacentHTML("beforeend", html);
  });
};
