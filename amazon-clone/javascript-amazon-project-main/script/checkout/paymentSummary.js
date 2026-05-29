
import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";


// render the payment summary section with total price and item count

export function renderPaymentSummary(cart, products) {
    let totalItemPriceCents = 0;
    let totalProduct = 0;

     cart.forEach((item) => {

        const productId = item.productId

        const product = products.find((p) => p.id === productId);
            if (!product) return
            else{
                totalProduct ++;
                totalItemPriceCents += product.priceCents * item.quantity;
            }
  
        });


        document.querySelector('.payment-summary-money').innerHTML = formatCurrency(totalItemPriceCents);
        
        document.querySelector('.return-to-home-link').innerHTML =  `${cart.length} items`;

      return totalItemPriceCents;
};
const totalItemPriceCents = renderPaymentSummary(cart, products); 

// shipping total calculation
function calculateShippingTotal(cart, deliveryOptions) {
  let shippingTotalCents = 0;

  cart.forEach((item) => {
    const option = deliveryOptions.find(
      (opt) => opt.id === item.deliveryOptionId,
    );

    if (option) {
      shippingTotalCents += option.priceCents;
    }
  });

  return shippingTotalCents;
  
}

const shippingTotalCents = calculateShippingTotal(cart, deliveryOptions);
document.querySelector(".js-added-fee").innerHTML =
  formatCurrency(shippingTotalCents);
  

// before tax calculation of shipping total
function calcBeforeTaxTotal() {
  let totalBeforeTaxCents = 0;
  totalBeforeTaxCents = shippingTotalCents + totalItemPriceCents;
  console.log(totalBeforeTaxCents);
  return totalBeforeTaxCents;

}
const totalBeforeTax = calcBeforeTaxTotal();
document.querySelector(".js-before-tax").innerHTML =
  formatCurrency(totalBeforeTax);

// estimated tax calculation
function calcEstimatedTax() {
  let estimatedTaxCents = 0;
  estimatedTaxCents = Math.round(totalBeforeTax * 0.1);
  console.log(estimatedTaxCents);
  return estimatedTaxCents;
}

const estimatedTaxCents = calcEstimatedTax();
document.querySelector(".js-estimated-tax").innerHTML =
  formatCurrency(estimatedTaxCents);

// final total order
function calcFinalTotal() {
  let finalTotalCents = 0;
  finalTotalCents = totalBeforeTax + estimatedTaxCents;
  console.log(finalTotalCents);
  return finalTotalCents;
}
const finalTotalCents = calcFinalTotal();
document.querySelector(".js-final-total").innerHTML =
  formatCurrency(finalTotalCents);
