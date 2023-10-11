const checkoutButton = document.getElementById("checkoutButton");
const shippingInputs = document.querySelectorAll('input[name="shipping-type"]');
const shippingContainer = document.querySelector(".container");

shippingContainer.addEventListener("click", (e) => {
  const parent = e.target.closest(".shipping-container");
  const price = parent.querySelector(".price").innerHTML;
  console.log(parent.querySelector(".price").innerHTML);
  const photo = parent.querySelector("img");
  console.log(parent.querySelector("img"));
  const selectedItems = { photo, price };
  const selectedItemsString = JSON.stringify(selectedItems);
  localStorage.setItem("selectedItems", selectedItemsString);
});

checkoutButton.addEventListener("click", () => {
  const selectedShipping = Array.from(shippingInputs).find(
    (input) => input.checked
  );
  console.log(selectedShipping);
  if (selectedShipping) {
    localStorage.setItem("selectedShipping", selectedShipping.value);
    window.location.href = "checkout.html";
  } else {
    alert("Please select a shipping option.");
  }
});
