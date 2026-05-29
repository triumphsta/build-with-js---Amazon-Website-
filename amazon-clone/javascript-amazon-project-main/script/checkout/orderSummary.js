import {
  cart,
  removeItem,
  resetStorage,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js"; 

// Render the cart with all items
export function renderCart() {
  const cartHtml = cart.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);

      if (!product) return "";

      const matchingProduct = product;

      // Find the delivery date for this item based on saved deliveryOptionId
      const deliveryOption = deliveryOptions.find(
        (opt) => opt.id === cartItem.deliveryOptionId,
      );
      const today = dayjs();
      const deliveryDays = deliveryOption ? deliveryOption.deliveryDays : 7;
      const deliveryDate = today
        .add(deliveryDays, "day")
        .format("dddd, MMMM D");

      return `
        <div class="cart-item-container js-cart-item-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${deliveryDate}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>

              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>

              <div class="product-quantity">
                <span>
                  Quantity:
                  <span class="quantity-label">
                    ${cartItem.quantity}
                  </span>
                </span>

                <span class="update-quantity-link link-primary">
                  Update
                </span>

                <span 
                  class="delete-quantity-link link-primary js-delete"
                  data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
            ${deliveryOptionsRender(matchingProduct, cartItem.deliveryOptionId)}
          </div>
        </div>
        
      `;
    }).join("");

  document.querySelector(".order-summary").innerHTML = cartHtml;

  // Attach event listeners after DOM is rendered
  renderPaymentSummary(cart, products)
  attachDeleteListeners();
  attachDeliveryOptionListeners();
}

// Render delivery options for a product
function deliveryOptionsRender(matchingProduct, selectedDeliveryOptionId) {
  const today = dayjs();

  const html = deliveryOptions
    .map((deliveryOption) => {
      const deliveryDate = today
        .add(deliveryOption.deliveryDays, "day")
        .format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(deliveryOption.priceCents)} Shipping`;

      // Check if this delivery option was previously selected
      const isChecked =
        deliveryOption.id === selectedDeliveryOptionId ? "checked" : "";

      return `
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input js-delivery-option"
            name="delivery-${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}"
            data-product-id="${matchingProduct.id}"
            ${isChecked}
          >

          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>

            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${html}
    </div>
  `;
}

// Attach delete button event listeners
function attachDeleteListeners() {
  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const productDelId = button.dataset.productId;

      const askDelete = confirm(
        "Are you sure you want to remove this product?",
      );

      if (askDelete) {
        removeItem(productDelId);
        document.querySelector(`.js-cart-item-${productDelId}`).remove();
        alert("Product removed");
      }
    });
  });
}

// Attach delivery option radio button event listeners
function attachDeliveryOptionListeners() {
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = Number(element.dataset.deliveryOptionId);

      // Find the delivery option details
      const deliveryOption = deliveryOptions.find(
        (opt) => opt.id === deliveryOptionId,
      );

      // Calculate the new delivery date
      const today = dayjs();
      const newDeliveryDate = today
        .add(deliveryOption.deliveryDays, "day")
        .format("dddd, MMMM D");

      // Update the delivery date at the top of the cart item dynamically
      const cartItemContainer = document.querySelector(
        `.js-cart-item-${productId}`,
      );
      if (cartItemContainer) {
        cartItemContainer.querySelector(".delivery-date").textContent =
          `Delivery date: ${newDeliveryDate}`;
      }

      // Save the selected delivery option to localStorage
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });
}




// Initial render when page loads
renderCart();

// Reset button event listener
const resetButton = document.querySelector(".resetStorage");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    resetStorage();
  });
}
