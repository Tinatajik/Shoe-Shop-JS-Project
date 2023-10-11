const checkoutButton = document.getElementById("checkoutButton");
const shippingInputs = document.querySelectorAll('input[name="shipping-type"]');

checkoutButton.addEventListener("click", () => {
  const selectedShipping = Array.from(shippingInputs).find(
    (input) => input.checked
  );
  if (selectedShipping) {
    localStorage.setItem("selectedShipping", selectedShipping.value);
    window.location.href = "checkout.html";
  } else {
    alert("Please select a shipping option.");
  }
});
