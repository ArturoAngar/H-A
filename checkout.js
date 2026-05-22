function moneyToNumber(value) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function getCart() {
  return JSON.parse(localStorage.getItem("haCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("haCart", JSON.stringify(cart));
  renderCheckout();
}

function renderCheckout() {
  const cart = getCart();
  const checkoutItems = document.querySelector("#checkoutItems");
  const checkoutTotal = document.querySelector("#checkoutTotal");
  const checkoutSubtotal = document.querySelector("#checkoutSubtotal");
  const cartCount = document.querySelector("#cartCount");
  checkoutItems.replaceChildren();
  let total = 0;

  if (!cart.length) {
    checkoutItems.innerHTML = `<p class="empty-checkout">Tu carrito está vacío.</p>`;
  }

  cart.forEach((entry, index) => {
    const price = moneyToNumber(entry.product.salePrice || entry.product.price);
    total += price * entry.quantity;
    const line = document.createElement("div");
    line.className = "checkout-line rich";
    line.innerHTML = `
      <div class="checkout-thumb">
        <img src="${entry.product.image || "logo-women.png"}" alt="${entry.product.name}" />
        <span>${entry.quantity}</span>
      </div>
      <div>
        <span>${entry.product.name}</span>
        <small>${entry.product.category || "Producto H&A"}</small>
        <button type="button">Quitar</button>
      </div>
      <strong>${entry.product.salePrice || entry.product.price}</strong>
    `;
    line.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart(cart);
    });
    checkoutItems.append(line);
  });

  cartCount.textContent = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const formattedTotal = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(total);
  checkoutTotal.textContent = formattedTotal;
  checkoutSubtotal.textContent = formattedTotal;
}

const paymentCopy = {
  card: {
    title: "Pago con tarjeta",
    text: "Al confirmar, se procesa el pago y apartamos el producto. Después validamos inventario, preparamos el pedido y enviamos guía de seguimiento. Si hubiera algún ajuste de disponibilidad, te contactamos antes del envío.",
  },
  transfer: {
    title: "Pago por transferencia",
    text: "Al confirmar, te enviamos los datos bancarios. El pedido queda reservado por 12 horas; cuando recibamos tu comprobante, se libera preparación, empaque y envío con seguimiento.",
  },
  cod: {
    title: "Pago contra entrega",
    text: "Al confirmar, revisamos cobertura y disponibilidad. Si tu zona aplica, se agenda entrega y pagas al recibir. Para productos de alto valor podemos pedir anticipo de apartado.",
  },
};

function updatePaymentDetail(method = "card") {
  const detail = document.querySelector("#paymentDetail");
  const copy = paymentCopy[method] || paymentCopy.card;
  detail.innerHTML = `<strong>${copy.title}</strong><p>${copy.text}</p>`;
}

document.querySelectorAll(".payment-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".payment-chip").forEach((item) => item.classList.toggle("active", item === chip));
    updatePaymentDetail(chip.dataset.method);
  });
});

document.querySelector("#confirmOrderButton").addEventListener("click", () => {
  const message = document.querySelector("#checkoutMessage");
  message.textContent = "Pedido recibido. Te contactaremos para confirmar disponibilidad, pago y envío.";
  message.classList.add("visible");
});

updatePaymentDetail();
renderCheckout();
