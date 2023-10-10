const API_URL = "http://localhost:3000";
const cardsContainer = document.querySelector("#product-card");
const showTotalPrice = document.querySelector("#total-price");
const productQuantity = document.querySelector("#quantity");
//-------------------------Add to cart -----------------------
const addToCards = (list, listContainer) => {
  list.forEach((elem) => {
    const html = `
        <div
        class="p-1 rounded-2xl w-72 ml-3 mt-3"
        style="
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        "
      >
        <div class="mt-2 mb-2 ml-2 flex">
          <svg
            width="80"
            height="80"
            viewBox="0 0 182 182"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="182" height="182" rx="24" fill="#F3F3F3" />
          </svg>
          <img
            class="absolute w-14 h-8 ml-1"
            style="margin-top: 1.25rem"
            src="${elem.image}"
          />
          <p class="text-sm font-bold ml-2 mt-2">${elem.name}...</p>
          <svg
          id="modal-button"
            class="mt-2 ml-5"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <path
              d="M 28 11 C 26.895 11 26 11.895 26 13 L 26 14 L 13 14 C 11.896 14 11 14.896 11 16 C 11 17.104 11.896 18 13 18 L 14.160156 18 L 16.701172 48.498047 C 16.957172 51.583047 19.585641 54 22.681641 54 L 41.318359 54 C 44.414359 54 47.041828 51.583047 47.298828 48.498047 L 49.839844 18 L 51 18 C 52.104 18 53 17.104 53 16 C 53 14.896 52.104 14 51 14 L 38 14 L 38 13 C 38 11.895 37.105 11 36 11 L 28 11 z M 18.173828 18 L 45.828125 18 L 43.3125 48.166016 C 43.2265 49.194016 42.352313 50 41.320312 50 L 22.681641 50 C 21.648641 50 20.7725 49.194016 20.6875 48.166016 L 18.173828 18 z"
            ></path>
          </svg>
        </div>
        <div
          style="margin-left: 5rem;
          margin-top: -1.75rem; margin-bottom: 0.5rem"
          class="flex"
        >
          <div class="w-4 h-4 rounded-full ml-4" style="background-color:${elem.color} ;">
            <p
              class="text-sm"
              style="margin-left: 1.4rem; margin-top: -0.17rem; width: 7rem"
            >
              ${elem.color} | Size = ${elem.size}
            </p>
            <p class="font-medium text-sm ml-2 mt-2 w-16 total-price-items">${elem.totalPrice}</p>
          </div>
          <div class="flex font-bold mt-5 gap-3">
            <div class="bg-gray-200 flex gap-4 px-2 ml-20
             mt-1 rounded-full"  id="quantity">
              <p>-</p>
              <p>${elem.quantity}</p>
              <p>+</p>
            </div>
          </div>
        </div>
      </div>
        `;
    listContainer.insertAdjacentHTML("beforeend", html);
  });
};
// ---------------------------Total Price ----------------------------
const changeTotalPrice = () => {
  const totalPriceItems = document.querySelectorAll(".total-price-items");
  let userTotalPrice = 0;
  totalPriceItems.forEach((item) => {
    userTotalPrice += Number(item.innerText);
  });
  showTotalPrice.innerText = `$${userTotalPrice}.00`;
};
//--------------------------- Quantity -----------------------------------

// read data from server
const readCarts = async () => {
  try {
    const res = await fetch(`${API_URL}/carts`);
    const data = await res.json();
    addToCards(data, cardsContainer);
    changeTotalPrice();
    // changeQuantity();
  } catch (error) {
    console.log(error);
  }
};
readCarts();
