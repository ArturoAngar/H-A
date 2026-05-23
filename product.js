function isBlockedProduct(product) {
  return /christian dior|(^|\s)dior(\s|$)|sauvage|jadore|j'adore|miss dior|fahrenheit|poison/.test(normalize(product.name));
}

const products = (window.UFRA_PRODUCTS || []).filter((product) => !isBlockedProduct(product));
const params = new URLSearchParams(window.location.search);
const productIndex = Number(params.get("id") || 0);
const product = products[productIndex] || products[0];
const whatsappNumber = "525586730688";
let selectedRating = 5;

const brandVibes = {
  armani: ["elegante", "limpio", "caro"],
  versace: ["sexy", "fiesta", "premium"],
  chanel: ["elegante", "caro", "premium"],
  prada: ["limpio", "elegante", "premium"],
  carolina: ["sexy", "dulce", "regalo"],
  herrera: ["sexy", "dulce", "regalo"],
  paco: ["juvenil", "fiesta", "intenso"],
  rabanne: ["juvenil", "fiesta", "intenso"],
  montblanc: ["elegante", "oficina", "limpio"],
  boss: ["oficina", "elegante", "limpio"],
  hugo: ["oficina", "juvenil", "fresco"],
  calvin: ["limpio", "fresco", "diario"],
  clinique: ["limpio", "diario", "suave"],
  clarins: ["elegante", "limpio", "premium"],
  mac: ["fiesta", "premium", "impacto"],
  lancome: ["elegante", "premium", "regalo"],
  ray: ["premium", "elegante", "regalo"],
  armani_exchange: ["juvenil", "premium", "diario"],
};

function moneyToNumber(value) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[char]));
}

function productProfile(item) {
  const name = normalize(item.name);
  const price = moneyToNumber(item.salePrice || item.price);
  const tags = new Set();

  Object.entries(brandVibes).forEach(([brand, vibes]) => {
    if (name.includes(brand.replace("_", " "))) vibes.forEach((tag) => tags.add(tag));
  });

  if (item.category === "fragancias") {
    if (/blue|aqua|eau|water|cool|fresh|sport|weekend|light|chrome/.test(name)) ["fresco", "limpio", "diario"].forEach((t) => tags.add(t));
    if (/night|black|dark|noir|intense|extreme|elixir|oud|leather|spice|parfum/.test(name)) ["intenso", "misterioso", "noche", "premium"].forEach((t) => tags.add(t));
    if (/sweet|candy|vanilla|girl|bloom|flower|rose|pink|love|passion/.test(name)) ["dulce", "sexy", "cita", "regalo"].forEach((t) => tags.add(t));
    if (/wood|cedar|vetiver|santal|boss|montblanc|legend|gentleman/.test(name)) ["amaderado", "elegante", "oficina"].forEach((t) => tags.add(t));
    if (/edt|cologne|body|mist/.test(name)) tags.add("ligero");
    if (/edp|parfum|elixir|intense/.test(name)) tags.add("duradero");
  }

  if (item.category === "belleza") ["elegante", "diario", "regalo", "limpio"].forEach((t) => tags.add(t));
  if (item.category === "lentes") ["premium", "regalo", "diario", "elegante"].forEach((t) => tags.add(t));
  if (item.gender === "men") tags.add("hombre");
  if (item.gender === "women") tags.add("mujer");
  if (price < 500) tags.add("menos500");
  if (price >= 500 && price <= 1000) tags.add("500a1000");
  if (price > 1200) tags.add("caro");
  if (!tags.size) tags.add("diario");

  const intensity = item.category !== "fragancias"
    ? "media"
    : tags.has("intenso") || tags.has("duradero")
      ? "alta"
      : tags.has("ligero") || tags.has("fresco")
        ? "ligera"
        : "media";

  return { tags: [...tags], intensity, price };
}

function vibeDescription(item) {
  const profile = productProfile(item);
  const tags = profile.tags;
  if (item.category === "fragancias") {
    const aroma = tags.includes("dulce")
      ? "dulce y atractivo"
      : tags.includes("amaderado")
        ? "amaderado y elegante"
        : tags.includes("intenso")
          ? "intenso y nocturno"
          : "fresco y versátil";
    const occasion = tags.includes("noche") ? "noche, fiesta o cita" : tags.includes("oficina") ? "oficina y trabajo" : "diario";
    return [
      ["Vibra", aroma],
      ["Para quién", item.gender === "men" ? "Hombre o regalo masculino" : "Mujer o regalo femenino"],
      ["Cuándo usarlo", occasion],
      ["Intensidad", profile.intensity],
    ];
  }
  if (item.category === "lentes") {
    return [
      ["Vibra", "premium, moderna y fácil de combinar"],
      ["Para quién", item.gender === "men" ? "Hombre con estilo sobrio" : "Mujer con look pulido"],
      ["Cuándo usarlo", "diario, viaje, oficina o regalo"],
      ["Efecto", "eleva el outfit de inmediato"],
    ];
  }
  return [
    ["Vibra", "limpia, práctica y cuidada"],
    ["Para quién", "rutina personal o regalo útil"],
    ["Cuándo usarlo", "diario, trabajo o eventos"],
    ["Resultado", "mejor presencia y acabado visual"],
  ];
}

function categoryLabel(category) {
  if (category === "belleza") return "cuidado personal";
  if (category === "fragancias") return "perfumes";
  return category;
}

function productWhatsappUrl(item) {
  const message = `Hola! Estoy interesado en este producto: ${item.name}. ¿Cree que me pudiera dar más información acerca del pago y envío?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function contactProduct(item) {
  window.open(productWhatsappUrl(item), "_blank", "noopener");
}

function reviewKey(item) {
  return `haReviews:${normalize(item.name)}`;
}

function getReviews(item) {
  return JSON.parse(localStorage.getItem(reviewKey(item)) || "[]");
}

function saveReviews(item, reviews) {
  localStorage.setItem(reviewKey(item), JSON.stringify(reviews));
}

function starsMarkup(rating) {
  const value = Math.round(Number(rating) || 0);
  return Array.from({ length: 5 }, (_, index) => `<span class="${index < value ? "filled" : ""}">★</span>`).join("");
}

function syncStarPicker() {
  document.querySelectorAll("#starPicker button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.rating) <= selectedRating);
    button.setAttribute("aria-checked", String(Number(button.dataset.rating) === selectedRating));
  });
}

function renderReviews() {
  const reviews = getReviews(product);
  const average = reviews.length
    ? reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length
    : 5;
  document.querySelector("#reviewAverage").textContent = average.toFixed(1);
  document.querySelector("#reviewStarsSummary").innerHTML = starsMarkup(average);
  document.querySelector("#reviewCount").textContent = reviews.length
    ? `${reviews.length} reseña${reviews.length === 1 ? "" : "s"} de clientes.`
    : "Sé el primero en dejar una reseña.";

  const list = document.querySelector("#reviewsList");
  list.replaceChildren();
  reviews.slice(-8).reverse().forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-card-head">
        <strong>${escapeHtml(review.name)}</strong>
        <span>${starsMarkup(review.rating)}</span>
      </div>
      <p>${escapeHtml(review.comment)}</p>
    `;
    list.append(card);
  });
}

function renderProduct() {
  if (!product) return;
  const profile = productProfile(product);
  document.querySelector("#detailImage").innerHTML = `<img src="${product.image || "logo-women.png"}" alt="${product.name}" />`;
  document.querySelector("#detailMeta").textContent = `${categoryLabel(product.category)} / ${product.gender === "men" ? "Hombre" : "Mujer"}`;
  document.querySelector("#detailTitle").textContent = product.name;
  document.querySelector("#detailPrice").textContent = product.salePrice || product.price;
  document.querySelector("#regularPrice").textContent = product.regularPrice && product.regularPrice !== product.salePrice
    ? product.regularPrice
    : "";
  const tags = document.querySelector("#detailTags");
  tags.replaceChildren();
  profile.tags.slice(0, 7).forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    tags.append(span);
  });
  document.querySelector("#detailDescription").innerHTML = vibeDescription(product)
    .map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  const related = products
    .map((item, index) => ({ item, index, score: productProfile(item).tags.filter((tag) => profile.tags.includes(tag)).length }))
    .filter((entry) => entry.item !== product && entry.item.category === product.category)
    .sort((a, b) => b.score - a.score || productProfile(a.item).price - productProfile(b.item).price)
    .slice(0, 8);
  const relatedGrid = document.querySelector("#relatedGrid");
  relatedGrid.replaceChildren();
  related.forEach(({ item, index }) => {
    const card = document.createElement("a");
    card.className = "related-card";
    card.href = `product.html?id=${index}`;
    card.innerHTML = `<img src="${item.image}" alt="${item.name}" /><strong>${item.name}</strong><span>${item.salePrice || item.price}</span>`;
    relatedGrid.append(card);
  });
}

document.querySelector("#detailContactButton").addEventListener("click", () => contactProduct(product));
document.querySelectorAll("#starPicker button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedRating = Number(button.dataset.rating);
    syncStarPicker();
  });
});

document.querySelector("#reviewForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#reviewName");
  const commentInput = document.querySelector("#reviewComment");
  const name = nameInput.value.trim() || "Cliente H&A";
  const comment = commentInput.value.trim();
  if (!comment) return;
  const reviews = getReviews(product);
  reviews.push({ name, comment, rating: selectedRating, createdAt: new Date().toISOString() });
  saveReviews(product, reviews);
  nameInput.value = "";
  commentInput.value = "";
  selectedRating = 5;
  syncStarPicker();
  renderReviews();
});

renderProduct();
syncStarPicker();
renderReviews();
