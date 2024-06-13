import {getOrder} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function renderTrackedProduct(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const order = getOrder(orderId);
  const productId = url.searchParams.get('productId');
  const product = getProduct(productId);
  const container = document.querySelector('.js-order-tracking');

  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === productId) {
      productDetails = details;
    }
  });

  container.innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;
}

renderTrackedProduct();