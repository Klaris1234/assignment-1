

//FAQ
function toggleAnswer(answerId, buttonId) {
  var answer = document.getElementById(answerId);
  var button = document.getElementById(buttonId);

  if (answer.style.display === 'none' || answer.style.display === '') {
    answer.style.display = 'block';
    button.innerHTML = '-';
  } else {
    answer.style.display = 'none';
    button.innerHTML = '+';
  }
}

//SHOP-items
let cartQuantity = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartQuantity() {
  cartQuantity = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const cartQuantitySpan = document.getElementById('cart-quantity');
  if (cartQuantitySpan) {
    cartQuantitySpan.textContent = cartQuantity;
  }
}

function addToCart(productName, price, quantity) {
  if (productName && price !== undefined && quantity !== undefined) {
    const newItem = {
      productName: productName,
      price: price,
      quantity: parseInt(quantity, 10) || 1
    };

    cart.push(newItem);
    updateCartQuantity();
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemsList();
  } else {
    console.error('Invalid item added to cart:', { productName, price, quantity });
  }
}

function toggleCartTab() {
  const cartTab = document.getElementById('cart-tab');
  cartTab.classList.toggle('show', !cartTab.classList.contains('show'));
  if (cartTab.classList.contains('show')) {
    updateCartItemsList();
  }
}

function editCartItem(productName) {
  const quantity = parseInt(prompt('Enter new quantity:'), 10) || 0;
  if (quantity >= 0) {
    const itemIndex = cart.findIndex(item => item.productName === productName);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = quantity;
      updateCartItemsList();
      updateCartQuantity();
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}

function deleteCartItem(productName) {
  const itemIndex = cart.findIndex(item => item.productName === productName);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartItemsList();
    updateCartQuantity();
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function updateCartItemsList() {
  const cartItemsList = document.getElementById('cart-items-list');

  // Clear existing items
  cartItemsList.innerHTML = '';

  // Populate the cart items list
  cart.forEach(item => {
    const listItem = document.createElement('li');
    
    // Calculate total price based on quantity
    const totalItemPrice = item.quantity * item.price;

    listItem.textContent = `${item.productName} - Quantity: ${item.quantity} - Total Price: $${totalItemPrice.toFixed(2)}`;

    // Add buttons to edit quantity and delete item
    const editButton = createButton('Edit', () => editCartItem(item.productName));
    const deleteButton = createButton('Delete', () => deleteCartItem(item.productName));

    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    cartItemsList.appendChild(listItem);
  });
}


function createButton(text, onClickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', onClickHandler);
  return button;
}


