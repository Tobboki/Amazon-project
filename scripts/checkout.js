import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/PaymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage(){
  try {
    await loadProductsFetch();
  
    await new Promise((resolve, reject) => {
      loadCart(()=> {
        // reject('error');
        resolve();
      });
    });
  } catch (error){
    console.log('Unexpected error. please try again later.');
  }
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
