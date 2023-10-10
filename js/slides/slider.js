import {
  slideOne,
  slideTwo,
  slideThree,
  page1,
  page2,
  page3,
  slideItemOne,
  slideItemTwo,
  slideItemThree,
  btnPage1,
  btnPage2,
  btnPage3,
} from "./trans.js";

slideItemOne.forEach((item) => {
  item.addEventListener("click", () => slideOne(page1, page2, page3));
});
slideItemTwo.forEach((item) => {
  item.addEventListener("click", () => slideTwo(page1, page2, page3));
});
slideItemThree.forEach((item) => {
  item.addEventListener("click", () => slideThree(page1, page2, page3));
});

// btnPage1.addEventListener("click", () => slideTwo(page1, page2, page3));
// btnPage2.addEventListener("click", () => slideThree(page1, page2, page3));
// btnPage3.addEventListener("click", () => {
//   window.location.href = "loginPage.html";
// });
