const API_URL = "http://localhost:3000";
const image1 = document.querySelector("#image-one");
const image2 = document.querySelector("#image-two");
const image3 = document.querySelector("#image-three");
const productName = document.querySelector("#product-name");
const productSold = document.querySelector("#product-sold");
const productRating = document.querySelector("#product-rating");
const productSize = document.querySelector("#sizes");
const productColor = document.querySelector("#colors");
const productQuantity = document.querySelector("#quantity");
const productNumber = document.querySelector("#product-number");
let totalPrice = document.querySelector("#total-price");
let addToCartButton = document.querySelector("#add-to-cart");
let userSelectedProperties = {
  name: "",
  image: "",
  size: "",
  color: "",
  quantity: 1,
  price: "",
  totalPrice: "",
  delivery: false,
  id: "",
};
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const productId = searchParams.get("id");
const readProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    fillUserSelectedProperties(data);
    totalPrice.innerText = "$" + data.price;
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};

const addToDom = (product) => {
  productName.innerText = product.title;
  productSold.innerText = product.soldCount;
  productRating.innerText = product.rating;
  productNumber.innerText = product.quantity;
  image1.src = `${product.image}`;
  image2.src = `${product.image}`;
  image3.src = `${product.image}`;
};

const fillUserSelectedProperties = (data) => {
  userSelectedProperties.name = data.title;
  userSelectedProperties.image = data.image;
  userSelectedProperties.price = data.price;
  console.log(data.price);
  userSelectedProperties.totalPrice = data.price;
};
const addToCard = async (data) => {
  console.log(data);
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
readProduct(productId);

// ------------------------------------------------------------
// user selected properties
// Get all size options
const sizeOptions = document.querySelectorAll(".size-option");
// Add click event listeners to each size option
sizeOptions.forEach((sizeOption) => {
  sizeOption.addEventListener("click", () => {
    // Deselect all options
    sizeOptions.forEach((option) => {
      option.classList.remove("selected");
    });

    // Select the clicked option
    sizeOption.classList.add("selected");

    // Get the selected size
    const selectedSize = sizeOption.textContent;
    console.log(`Selected Size: ${selectedSize}`);
    userSelectedProperties.size = selectedSize;
  });
});

// ------------------------------------------------------------
// Get all color options
const colorOptions = document.querySelectorAll(".color-option");
// Add click event listeners to each color option
colorOptions.forEach((colorOption) => {
  colorOption.addEventListener("click", () => {
    // Check if the option is already selected
    if (colorOption.classList.contains("selected")) {
      colorOption.classList.remove("selected");
    } else {
      // Deselect all options
      colorOptions.forEach((option) => {
        option.classList.remove("selected");
      });

      // Select the clicked option
      colorOption.classList.add("selected");

      // Get the selected color
      const selectedColor = colorOption.getAttribute("data-color");
      console.log(`Selected Color: ${selectedColor}`);
      userSelectedProperties.color = selectedColor;
    }
  });
});
// ------------------------------------------------------------
productQuantity.addEventListener("click", (e) => {
  if (e.target.innerText === "-") {
    if (+userSelectedProperties.quantity === 1) return;
    productNumber.innerText = Number(productNumber.innerText) - 1;
    userSelectedProperties.quantity = productNumber.innerText;
  }
  if (e.target.innerText === "+") {
    productNumber.innerText = Number(productNumber.innerText) + 1;
    userSelectedProperties.quantity = productNumber.innerText;
  }
  console.log(userSelectedProperties.price);
  console.log(userSelectedProperties.quantity);
  totalPrice.innerText = `$ ${
    userSelectedProperties.quantity * userSelectedProperties.price
  }.00`;
  userSelectedProperties.totalPrice = `${
    userSelectedProperties.quantity * userSelectedProperties.price
  }.00`;
});
// // -------------------------- Add to cart -----------------------
addToCartButton.addEventListener("click", () => {
  addToCard(userSelectedProperties);
  window.location.href = "cartPage.html";
});
