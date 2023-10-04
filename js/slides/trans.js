const slideOne = (item1, item2, item3) => {
  item1.style.transform = "translateX(0)";
  item2.style.transform = "translateX(100%)";
  item3.style.transform = "translateX(200%)";
};
const slideTwo = (item1, item2, item3) => {
  item1.style.transform = "translateX(-100%)";
  item2.style.transform = "translateX(0)";
  item3.style.transform = "translateX(100%)";
};
const slideThree = (item1, item2, item3) => {
  item1.style.transform = "translateX(-200%)";
  item2.style.transform = "translateX(-100%)";
  item3.style.transform = "translateX(0)";
};
const page1 = document.querySelector("#page-one");
const page2 = document.querySelector("#page-two");
const page3 = document.querySelector("#page-three");

const slideItemOne = document.querySelectorAll(".slide-item-one");
const slideItemTwo = document.querySelectorAll(".slide-item-two");
const slideItemThree = document.querySelectorAll(".slide-item-three");

const btnPage1 = document.querySelector("#btn-page-one");
const btnPage2 = document.querySelector("#btn-page-two");
const btnPage3 = document.querySelector("#btn-page-three");

export {
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
};
