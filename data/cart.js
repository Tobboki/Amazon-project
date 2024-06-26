export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
};

export function addToCart(productId){
  let matchingItem;

  const productQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

  cart.forEach(cartItem =>{
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    };
  });

  if (matchingItem){
    matchingItem.quantity += Number(productQuantity);
  } else {
    cart.push({
      productId,
      quantity: Number(productQuantity),
      deliveryOptionId: '1'
    });
  };

  saveCartToStorage();
};

function saveCartToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function updateQuantity(productId, newQuantity){
  cart.forEach( cartItem => {
    if (cartItem.productId === productId){
      cartItem.quantity = newQuantity
    }
  });

  saveCartToStorage();
};

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveCartToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach(cartItem =>{
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    };
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveCartToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. please try again later.')
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart/');
  xhr.send();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart/');
  const text = await response.text();

  console.log(text);
}
