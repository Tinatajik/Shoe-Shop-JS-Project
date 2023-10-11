const btnContinue = document.querySelector("#btn-continue");
const btnCancel = document.querySelector("#btn-cancel");
const modalSuccess = document.querySelector("#modal-success");
const modalUnsuccess = document.querySelector("#modal-unsuccess");

btnContinue.addEventListener("click", () => {
  modalSuccess.style.display = "block";
  //   setTimeout(function () {
  //     modalSuccess.style.display = "none";
  //   }, 3500);
});

btnCancel.addEventListener("click", () => {
  modalUnsuccess.style.display = "block";
});
