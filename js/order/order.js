const API_URL = "http://localhost:3000";
const activeContainer = document.querySelector("#active-list");
const completeContainer = document.querySelector("#complete-list");
const activeButton = document.querySelector("#active-button");
const completeButton = document.querySelector("#complete-button");

const empty = (container, p) => {
  const html = `
  <div class="flex flex-col gap-2 items-center justify-center mt-14">
  <img src="./assets/images/logo/notfound.png" alt="notfound" style="width: 10rem;height: 10rem;">
  <h4 class="mt-6 font-bold">You don't have an order yet</h4>
      <p class="text-sm">
        you don't have an ${p} orders at this time.
      </p>
</div> 
        `;
  container.insertAdjacentHTML("beforeend", html);
};

const addToActive = (list) => {
  let activeProductCount = 0;
  let completeProductCount = 0;
  list.forEach((elem) => {
    const delivery = elem.delivery;
    if (!delivery) {
      activeProductCount += 1;
    } else {
      completeProductCount += 1;
    }
    const html = `
    <div
    class="p-1 rounded-2xl w-72 h-36 ml-3 mt-3"
    style="
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    "
  >
     <div class="mt-2 mb-2 ml-2 flex" >
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
        src="${elem.image}"    />
      <p class="text-sm font-bold ml-2 mt-2">${elem.name}...</p>
    </div>
    <div
      style="margin-left: 6rem; margin-top: -3rem; margin-bottom: 0.5rem"
      class="flex"
    >
      <div class="w-4 h-4 rounded-full" style="background-color:${
        elem.color
      } ;">
        <p
          class="text-xs flex"
          style="margin-left: 1.4rem; margin-top: -0.1rem; width: 9rem"
        >
          ${elem.color} | Size = ${elem.size} | Qty = ${elem.quantity}
        </p>
        <div class="text-xs bg-gray-200 w-20 h-5 mt-2 rounded-md text-center">${
          !delivery ? "In Delivery" : "Completed"
        }</div>
        <div class="flex w-screen gap-4">
        <p class="font-medium text-sm ml-2 mt-2">$${elem.totalPrice}</p>
        <butto class="text-sm mt-2 h-5 rounded-full p-3 text-center items-center flex bg-black text-white">
        ${!delivery ? "Track Order" : "Leave Review"}
        </button>
       </div>
      </div>
    </div>
  </div>
          `;
    if (!delivery) {
      activeContainer.insertAdjacentHTML("beforeend", html);
    } else {
      completeContainer.insertAdjacentHTML("beforeend", html);
    }
  });

  if (activeProductCount === 0) {
    empty(activeContainer, "active");
  }
  if (completeProductCount === 0) {
    empty(completeContainer, "complete");
  }
};

const readOrder = async () => {
  try {
    const res = await fetch(`${API_URL}/carts`);
    const data = await res.json();
    addToActive(data);
  } catch (error) {
    console.log(error);
  }
};
readOrder();

activeButton.addEventListener("click", () => {
  activeButton.classList.add("activ-header-button");
  completeButton.classList.remove("activ-header-button");
  activeContainer.style.display = "grid";
  completeContainer.style.display = "none";
});
completeButton.addEventListener("click", () => {
  activeButton.classList.remove("activ-header-button");
  completeButton.classList.add("activ-header-button");
  activeContainer.style.display = "none";
  completeContainer.style.display = "grid";
});
