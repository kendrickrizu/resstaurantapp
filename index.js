import { menuArray } from '/data.js';

const itemSection = document.getElementById("items-section")
const paymentSection = document.getElementById("payment-section")
const paymentForm = document.getElementById("payment-form");
const paymentBox = document.getElementById("payment-box");
const payerNameInput = document.getElementById("payer-name-input");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    addItem(parseInt(e.target.dataset.add))
  } else if (e.target.dataset.inc) {
    updateQuantity(parseInt(e.target.dataset.inc), 1);
  } else if (e.target.dataset.dec) {
    updateQuantity(parseInt(e.target.dataset.dec), -1);
  }
})

paymentForm.addEventListener("submit", function(e) {
  e.preventDefault()
  enableAllAddButtons()
  paymentBox.style.display ="none"
  cartItems = []
  const customerName = payerNameInput.value.trim()
  paymentSection.innerHTML = `<p class="payment-message">Thanks ${customerName}, Your order is on its way 🚚</p>`
})

let cartItems = []

function addItem(itemId) {
  const selectedItem = menuArray.find((item) => item.id === itemId)
  cartItems.push({ ...selectedItem, quantity: 1 })
  renderOrder()
  disableAddButton(itemId)
}

function updateQuantity(itemId, change) {
  const item = cartItems.find(item => item.id === itemId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cartItems = cartItems.filter(i => i.id !== itemId);
    enableAddButton(itemId);
  }

  renderOrder();
}


function renderOrder() {
    if (cartItems.length === 0) {
    paymentSection.innerHTML = ""
    return
  }

  let totalPrice = 0
  let orderedItem = ""

  for (const item of cartItems) {
    let cost = item.price * item.quantity
      orderedItem += 
       `<p class="order">
          <span id="item-name">${item.emoji}${item.name}</span>
          <span id="item-btns">
              <button id="add-btn" data-inc=${item.id}>+</button>
              <button id="subtract-btn" data-dec=${item.id}>-</button>
              <span id="item-quantity">${item.quantity}</span>
          </span>
          <span id="item-price">₦${cost}</span>

        </p>`
        totalPrice += cost
  }

  paymentSection.innerHTML = 
        `<h1 class="order-header">YOUR ORDER</h1>
        <div class="order-summary">
            ${orderedItem}
        </div>

        <p class="total-price">
            <span>TOTAL PRICE <b>:</b></span>
            <span>₦${totalPrice}</span>
        </p>

        <div class="order-btn">
            <button type="submit" id="compute-order-btn">Compute Order</button>
        </div>`
        const computeOrderBtn = document.getElementById("compute-order-btn")
        computeOrderBtn.addEventListener("click", displayPaymentBox)

}

function renderItems() {
  let itemsHtml = "";

  for (const item of menuArray) {
    itemsHtml += `
      <div class="${item.name} item">
        <p class="item-pic">${item.emoji}</p>
        <div>
          <h2 class="item-title">${item.name}</h2>
          <p class="item-description">${item.ingredients.join(", ")}</p>
          <p class="item-price">₦${item.price}</p>
        </div>
        <button class="add-btn" id="add-btn-${item.id}" data-add= "${item.id}">+</button>
      </div>
    `;
  }

  itemSection.innerHTML = itemsHtml;
}

renderItems();
 function displayPaymentBox(){
  document.getElementById("payment-box").style.display = "block"
}

function disableAddButton(id){
const btn = document.getElementById(`add-btn-${id}`)
if (btn) {
  btn.disabled = true
  btn.classList.add("disabled")
}}

function enableAddButton(id) {
  const btn = document.getElementById(`add-btn-${id}`)
  if (btn) {
    btn.disabled = false
    btn.classList.remove("disabled")
  }
}

function enableAllAddButtons(){
  const allAddButtons = document.querySelectorAll(".add-btn.disabled")
  allAddButtons.forEach((btn) => {
    btn.disabled = false
    btn.classList.remove("disabled")
  })
}

