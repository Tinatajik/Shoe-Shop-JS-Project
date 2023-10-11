const API_URL = "http://localhost:3000";
const listContainer = document.querySelector("#list-container");
const addToOrder = (list) => {
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
      class="absolute w-16 h-8 ml-1"
      style="margin-top: 1.25rem"
      src="${elem.image}" />
    <p class="text-sm font-bold ml-2 mt-2">${elem.name}...</p>
  </div>
  <div
    style="margin-left: 6rem; margin-top: -3rem; margin-bottom: 0.5rem"
    class="flex"
  >
    <div class="w-4 h-4 rounded-full" style="background-color:${elem.color} ;">
      <p
        class="text-sm"
        style="margin-left: 1.4rem; margin-top: -0.17rem; width: 9rem"
      >
        ${elem.color} | Size = ${elem.size}
      </p>
      <p class="font-medium text-sm ml-2 mt-2">$${elem.totalPrice}</p>
    </div>
    <div class="flex font-bold mt-5 gap-3">
      <div class="bg-gray-200 flex gap-4 px-2 ml-32 mt-1 rounded-full">
        <p>${elem.quantity}</p>
      </div>
    </div>
  </div>
</div> `;
    listContainer.insertAdjacentHTML("beforeend", html);
  });
};
const readProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/carts`);
    const data = await res.json();
    addToOrder(data);
  } catch (error) {
    console.log(error);
  }
};
readProduct();
//----------------- Choose Shipping---------------------
const selectedShipping = localStorage.getItem("selectedShipping");
const selectedShippingContainer = document.getElementById("selectedShipping");

if (selectedShipping) {
  selectedShippingContainer.innerHTML = `
  <div class="flex gap-3">
  <img
    src="./assets/images/chooseshipping/2.png"
    alt="regular-icon"
    class="w-10 h-10"
  />
  <div>
    <h5 class="font-medium">${selectedShipping}</h5>
    <p class="text-xs text-zinc-600">Estimated Arrival. Dec 20-22</p>
  </div>
  <div class="flex gap-2 font-medium">
    <label for="economy" class="mt-2 ml-3"></label>
  </div>
</div>
</div>`;
  localStorage.removeItem("selectedShipping");
} else {
  selectedShippingContainer.innerHTML = `   <img src="./assets/images/chooseshipping/truck.png" alt="truck-icon" class="w-5 h-5 ml-2">
  <div>
    <h5 class="font-medium text-sm">Choose Shipping Type</h5>
  </div>
   <div>
    <a href="./chooseShipping.html">
    <img src="./assets/images/arrow-icon/nexticon.png" alt="next-icon" class="w-3 h-3 mt-1 ml-12 ">
</a>
   </div>
</div>`;
}
///////////////// promo code ////////////////////////////
const addPromoCode = document.querySelector("#add-promo-code");
const userCode = document.querySelector("#user-code");
const promoPriceRow = document.querySelector("#promo-price-row");
const lastPrice = document.querySelector("#last-price");
const userSelectedPromoCode = document.querySelector(
  "#user-selected-promo-code"
);

const calculateDiscount = (value) => {
  userCode.value = `Discount ${value}% Off`;
  userCode.classList.add("input-bold-style");

  // =================calculate whole cost =================
  const totalCostBeforDiscount = lastPrice.innerText.match(/\d+/)[0];
  const discountCost = Math.round((totalCostBeforDiscount * value) / 100);
  const totalCostAfterDiscount = totalCostBeforDiscount - discountCost;
  lastPrice.innerText = `$${totalCostAfterDiscount}`;
  // ================= end calculate whole cost =================
  userSelectedPromoCode.innerText = `-$${discountCost}`;
  promoPriceRow.style.display = "flex";
};
const searchForEnterPromoCode = async (code) => {
  try {
    const res = await fetch(`${API_URL}/promoCode?codeNumber_like=${code}`);
    const data = await res.json();
    if (data.length === 1) {
      calculateDiscount(data[0].value);
    }
  } catch (error) {
    console.log(error);
  }
};
// promo code
addPromoCode.addEventListener("click", () => {
  searchForEnterPromoCode(userCode.value);
});
//----------------- Button-------------------
const paymentButton = document.getElementById("payment-button");
paymentButton.addEventListener("click", () => {
  window.location.href = "paymentMethods.html";
});
