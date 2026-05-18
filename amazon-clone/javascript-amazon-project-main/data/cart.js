export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveToStorage();
}

export function removeItem() {
  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const productDelId = button.dataset.delId;
      console.log("worked");

      const askDelete = confirm(
        "Are you sure you want to remove this product?",
      );
      if (askDelete) {
        cart = cart.filter((cartItem) => {
          return cartItem.productId !== productDelId;
        });
        console.log(cart);
        document.querySelector(`.js-cart-item-${productDelId}`).remove();
        alert("Product removed");
      }
      saveToStorage();
    });
  });
}

export function resetStorage() {
  localStorage.clear();
  location.reload();
}
console.log(cart);
