const searchInput = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");
const notFound = document.getElementById("not-found-page");
const resaultFor = document.getElementById("resault-for");
const lengthFound = document.getElementById("lentgh-found");
const searchHistoryContainer = document.getElementById("searchHistory");

let debounceTimer;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(searchProduct, 1000);
});

function searchProduct() {
  const searchTerm = searchInput.value.toLowerCase();
  console.log(searchTerm.length);
  fetch(`http://localhost:3000/products`)
    .then((response) => response.json())
    .then((products) => {
      const searchProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      displaySearchResults(searchProducts, searchTerm);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  resaultFor.textContent = `${searchTerm}`;
  //------------------- Search History ----------------------------
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (searchTerm.length > 4) {
    searchHistory.push(searchTerm);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  if (searchHistory.length > 10) {
    searchHistory.shift();
  }

  displaySearchHistory(searchHistory);
  function displaySearchHistory(history) {
    searchHistoryContainer.innerHTML = "";
    history.forEach((term) => {
      const html = `
    <hr class="mt-3 w-11/12 ml-4" />
    <div
      class="grid grid-cols-1 gap-3 mt-3 ml-4 text-sm text-gray-500"
      <div class="flex justify-between">
        <p>${term}</p>
        <svg
          style="margin-left: 16rem;
          margin-top: -2rem;"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0,0,256,256"
        >
          <g
            fill="#000000"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(10.66667,10.66667)">
              <path
                d="M18,21h-12c-1.657,0 -3,-1.343 -3,-3v-12c0,-1.657 1.343,-3 3,-3h12c1.657,0 3,1.343 3,3v12c0,1.657 -1.343,3 -3,3z"
                opacity="0.35"
              ></path>
              <path
                d="M14.812,16.215l-7.027,-7.027c-0.384,-0.384 -0.384,-1.008 0,-1.392l0.011,-0.011c0.384,-0.384 1.008,-0.384 1.392,0l7.027,7.027c0.384,0.384 0.384,1.008 0,1.392l-0.011,0.011c-0.384,0.384 -1.008,0.384 -1.392,0z"
              ></path>
              <path
                d="M7.785,14.812l7.027,-7.027c0.384,-0.384 1.008,-0.384 1.392,0l0.011,0.011c0.384,0.384 0.384,1.008 0,1.392l-7.027,7.027c-0.384,0.384 -1.008,0.384 -1.392,0l-0.011,-0.011c-0.384,-0.384 -0.384,-1.008 0,-1.392z"
              ></path>
            </g>
          </g>
        </svg>
      </div>`;
      searchHistoryContainer.insertAdjacentHTML("beforeend", html);
    });
  }
}

function displaySearchResults(products, searchTerm) {
  searchResultsContainer.innerHTML = "";
  if (products.length === 0) {
    notFound.style.display = "block";
    lengthFound.textContent = `0 found`;
    resaultFor.style.display = "block";
    searchHistoryContainer.style.display = "none";
    searchResultsContainer.style.display = "none";
  } else {
    notFound.style.display = "none";
    lengthFound.textContent = ``;
    resaultFor.style.display = "block";
    searchHistoryContainer.style.display = "none";
    searchResultsContainer.style.display = "grid";
    addToSearch(products);
  }
  if (searchTerm.length === 0) {
    searchHistoryContainer.style.display = "grid";
    notFound.style.display = "none";
    resaultFor.style.display = "none";
    searchResultsContainer.style.display = "none";
  }
}
const addToSearch = (products) => {
  products.forEach((product) => {
    const html = `
  <div class="mt-5 ml-3">
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
    src="${product.image}"/>
  <p class="text-sm font-bold ml-2 mt-2">${product.title}...</p>
  <div class="flex mt-2 gap-1">
    <img
      src="./assets/images/star-icon/icons8-star-half-empty-24.png"
      alt="star-icon"
      class="w-5 h-5 ml-2"
      style="margin-top: -0.05rem"
    />
    <p class="text-xs">${product.rating}</p>
    <p class="text-xs">|</p>
    <div class="text-xs w-16 h-5  text-center rounded ml-1" style="background-color:${product.color} ;">
      ${product.soldCount}
    </div>
  </div>
  <p class="text-sm font-semibold ml-2 mt-1">$${product.price}</p>
</div>
  `;
    searchResultsContainer.insertAdjacentHTML("beforeend", html);
  });
};
// window.addEventListener("load", (event) => {
//   searchHistory.style.display = "block";
// });
