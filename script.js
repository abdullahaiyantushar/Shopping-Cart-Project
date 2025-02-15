const cartIcon = document.querySelector('#shopping-icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#close-cart');

cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

// Add to cart 
const addCartButtons = document.querySelectorAll('.add-cart');
const cartContent = document.querySelector('.cart-content');
const totalPriceElement = document.querySelector('.total-price');

let cartItems = [];

// Function to update the total price
const updateTotalPrice = () => {
  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });
  totalPriceElement.textContent = `$${total.toFixed(2)}`;
};

// Function to add product to cart
const addToCart = (productBox) => {
  const productImgSrc = productBox.querySelector('img').src;
  const productTitle = productBox.querySelector('.product-title').textContent;
  const productPrice = parseFloat(productBox.querySelector('.price').textContent.replace('$', ''));

  // Check if the product is already in the cart
  const existingItem = cartItems.find(item => item.title === productTitle);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      title: productTitle,
      price: productPrice,
      quantity: 1,
      imgSrc: productImgSrc,
    });
  }

  // Render cart items
  renderCartItems();
  updateTotalPrice();
};

// Function to render cart items
const renderCartItems = () => {
  cartContent.innerHTML = ''; 
  cartItems.forEach((item, index) => {
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    cartBox.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.title}">
      <div class="cart-detail">
        <h2 class="cart-product-title">${item.title}</h2>
        <span class="cart-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <div class="product-quantity">
          <button class="decrease">-</button>
          <span class="number">${item.quantity}</span>
          <button class="increase">+</button>
        </div>
      </div>
      <i class="ri-delete-bin-5-line cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    // Add event listeners for quantity buttons
    const increaseButton = cartBox.querySelector('.increase');
    const decreaseButton = cartBox.querySelector('.decrease');
    const removeButton = cartBox.querySelector('.cart-remove');

    increaseButton.addEventListener('click', () => {
      item.quantity += 1;
      renderCartItems();
      updateTotalPrice();
    });

    decreaseButton.addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        renderCartItems();
        updateTotalPrice();
      }
    });

    removeButton.addEventListener('click', () => {
      cartItems.splice(index, 1); 
      renderCartItems();
      updateTotalPrice();
    });
  });
};

// Add event listeners to all "Add to Cart" buttons
addCartButtons.forEach(button => {
  button.addEventListener('click', event => {
    const productBox = event.target.closest('.product-box');
    addToCart(productBox);
  });
});