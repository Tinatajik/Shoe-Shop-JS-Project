const API_URL = "http://localhost:3000";
// ------------------User Name--------------------------------------------------------------
const userName = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    addToHeader(data);
  } catch (error) {
    console.log(error);
  }
};
const userNameProfile = document.querySelector("#username");
const addToHeader = (list) => {
  userNameProfile.innerHTML = "";
  list.forEach((elem) => {
    const html = `
    <p class="text-sm">Good Morning 👋</p>
    <p class="font-medium">${elem.username}</p>
       `;
    userNameProfile.insertAdjacentHTML("beforeend", html);
  });
};
userName();
// ------------------Read Product-----------------------------------------------------------
const readProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};
const productsContainer = document.querySelector("#products");
export const addToDom = (list) => {
  productsContainer.innerHTML = "";
  list.forEach((elem) => {
    const html = `
      
        <div class="mt-5 ml-3 product" id="${elem.id}">
      <svg width="130" height="130" viewBox="0 0 182 182" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="182" height="182" rx="24" fill="#F3F3F3"/>
        </svg>
        <img class="absolute w-24 h-14 ml-4" style="margin-top: -6rem;" src="${elem.image}"/> 
        <p class="text-sm font-bold ml-2 mt-2">${elem.title}...</p>  
        <p class="text-sm font-semibold ml-2 mt-1">$${elem.price}</p>   
    </div>`;
    productsContainer.insertAdjacentHTML("beforeend", html);
  });
};
readProduct();
// ------------------Product Page-----------------------------------------------------------
productsContainer.addEventListener("click", (e) => {
  const selectedProduct = e.target.closest(".product");
  const id = selectedProduct.id;
  const quantity = selectedProduct.children[2].innerText;
  window.location.href = "productPage1.html?id=" + id;
});
// ------------------Filter by logo name-----------------------------------------------------------
const brandLogos = document.querySelectorAll(".brandLogo");
brandLogos.forEach((logo) => {
  logo.addEventListener("click", () => {
    const brandName = logo.dataset.brand;
    localStorage.setItem("selectedBrand", brandName);
    window.location.href = `homePage2.html?brand= + ${selectedBrand}`;
  });
});
const brandNameElement = document.getElementById("brandName");
const brandProductsElement = document.getElementById("products");

// const selectedBrand = localStorage.getItem("selectedBrand");
// brandNameElement.textContent = selectedBrand;
// console.log(selectedBrand);

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    const brandProducts = data.products.filter(
      (product) => product.brand === selectedBrand
    );

    addToDom(brandProducts);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
