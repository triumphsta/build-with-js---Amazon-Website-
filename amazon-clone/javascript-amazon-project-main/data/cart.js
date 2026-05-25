// Load cart from localStorage or initialize as empty array
export let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Migration: Ensure all existing cart items have a deliveryOptionId
// This handles cases where old items in localStorage don't have this property
cart.forEach((item) => {
  if (!item.deliveryOptionId) {
    item.deliveryOptionId = 1; // Default to first delivery option
  }
});

// Save cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart or increase quantity if already in cart
export function addCart(productId) {
  let matchingItem;

  // Find if product already exists in cart
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    // If product exists, increase quantity
    matchingItem.quantity += 1;
  } else {
    // If product doesn't exist, add it to cart with default delivery option
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: 1, // Default delivery option
    });
  }

  saveToStorage();
}

// Remove item from cart by product ID
export function removeItem(productDelId) {
  // Use splice to mutate the array in place (preserves export reference)
  // Loop backwards to safely remove items while iterating
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].productId === productDelId) {
      cart.splice(i, 1);
    }
  }

  saveToStorage();
}

// Update the delivery option for a specific product
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  // Find the item in cart
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  // Update the delivery option ID if item found
  if (matchingItem) {
    matchingItem.deliveryOptionId = Number(deliveryOptionId);
  }

  saveToStorage();
}

// Clear all cart data and reload the page
export function resetStorage() {
  localStorage.clear();
  location.reload();
}

// Log cart for debugging
console.log("Current cart:", cart);
