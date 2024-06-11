import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/PaymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage(){
  await loadProductsFetch();

  await new Promise((resolve) => {
    loadCart(()=> {
      resolve();
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(()=> {
//       resolve();
//     });
//   })
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });
