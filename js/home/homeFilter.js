import { addToDom } from "./home.js";
// const API_URL = "http://localhost:3000";
// const $ = document;

// //========= Dom variables =========
// const brand = $.querySelector("#title-text");

// // get company name
// const paramString = window.location.search;
// const searchParams = new URLSearchParams(paramString);
// const productModel = searchParams.get("brand");

// //========= functions =========
// // request to server
// const filterProduct = async (brand) => {
//   try {
//     const res = await fetch(`${API_URL}/products?brand=${brand}`);
//     const data = await res.json();
//     addToDom(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// //========= events =========
// brand.innerText = productModel;

// filterProduct(productModel);
const API_URL = "http://localhost:3000";
const $ = document;

//========= Dom variables =========
const model = $.querySelector("#title-text");

// get company name
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const productModel = searchParams.get("model");

//========= functions =========
// request to server
const filterProduct = async (model) => {
  try {
    const res = await fetch(`${API_URL}/products?model-name=${model}`);
    const data = await res.json();
    addToDom(data);
  } catch (error) {
    console.log(error);
  }
};
//========= events =========
model.innerText = productModel;

filterProduct(productModel);
