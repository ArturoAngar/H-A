const fallbackProducts = [
  {
    name: "Acqua Di Gio",
    category: "fragancias",
    gender: "men",
    price: "$1,660",
    description: "Giorgio Armani 100ML EDT.",
    shape: "bottle",
  },
  {
    name: "Good Girl",
    category: "fragancias",
    gender: "women",
    price: "$2,215",
    description: "Carolina Herrera 80ML EDP.",
    shape: "bottle",
  },
  {
    name: "Skin Illusion",
    category: "belleza",
    gender: "women",
    price: "$660",
    description: "Base Clarins acabado natural.",
    shape: "compact",
  },
  {
    name: "Hydra Care",
    category: "belleza",
    gender: "women",
    price: "$790",
    description: "Tratamiento hidratante facial.",
    shape: "dropper",
  },
  {
    name: "Boss Bottled Set",
    category: "sets",
    gender: "men",
    price: "$1,675",
    description: "Set Hugo Boss 3 piezas.",
    shape: "set",
  },
  {
    name: "AX2047S",
    category: "lentes",
    gender: "men",
    price: "$1,785",
    description: "Armani Exchange gris plomo.",
    shape: "glasses",
  },
  {
    name: "Bright Crystal",
    category: "fragancias",
    gender: "women",
    price: "$1,325",
    description: "Versace 90ML EDT.",
    shape: "bottle",
  },
  {
    name: "Divine Set",
    category: "sets",
    gender: "women",
    price: "$2,785",
    description: "Jean Paul Gaultier 2 piezas.",
    shape: "set",
  },
  {
    name: "AX2054S",
    category: "lentes",
    gender: "men",
    price: "$1,410",
    description: "Armani Exchange negro mate.",
    shape: "glasses",
  },
  {
    name: "Facial Cleanse",
    category: "belleza",
    gender: "women",
    price: "$520",
    description: "Limpieza facial y cuidado diario.",
    shape: "jar",
  },
];

function isBlockedProduct(product) {
  return /christian dior|(^|\s)dior(\s|$)|sauvage|jadore|j'adore|miss dior|fahrenheit|poison/.test(normalize(product.name));
}

const productsSource = window.UFRA_PRODUCTS?.length ? window.UFRA_PRODUCTS : fallbackProducts;
const products = productsSource.filter((product) => !isBlockedProduct(product));

const intentCards = [
  { id: "elegante", title: "Para verte elegante", category: "all", hint: "Pulido, fino, buen gusto" },
  { id: "cita", title: "Para una cita", category: "fragancias", hint: "Cercano, atractivo, memorable" },
  { id: "regalo", title: "Regalar sin fallar", category: "all", hint: "Opciones seguras" },
  { id: "diario", title: "Diario", category: "all", hint: "Fácil de usar" },
  { id: "fiesta", title: "Fiesta / noche", category: "fragancias", hint: "Más presencia" },
  { id: "oficina", title: "Oficina", category: "fragancias", hint: "Limpio y profesional" },
  { id: "premium", title: "Verse más premium", category: "all", hint: "Efecto lujo" },
  { id: "dulce", title: "Fragancias dulces", category: "fragancias", hint: "Cálidas y coquetas" },
  { id: "fresco", title: "Fragancias frescas", category: "fragancias", hint: "Limpias y ligeras" },
  { id: "intenso", title: "Fragancias intensas", category: "fragancias", hint: "De impacto" },
  { id: "menos500", title: "Menos de $500", category: "all", hint: "Compra inteligente" },
  { id: "500a1000", title: "$500 a $1,000", category: "all", hint: "Mejor balance" },
  { id: "ultimo", title: "Regalos de último momento", category: "all", hint: "Bonito y fácil" },
];

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

const current = {
  gender: "all",
  category: "all",
  intent: "all",
};

const shapeStyles = {
  bottle: {
    "--shape-w": "76px",
    "--shape-h": "148px",
    "--shape-radius": "34px 34px 14px 14px",
    "--shape-bg": "linear-gradient(145deg, #fff, #dcb25e 62%, #7b581d)",
  },
  compact: {
    "--shape-w": "130px",
    "--shape-h": "130px",
    "--shape-radius": "50%",
    "--shape-bg": "conic-gradient(from 80deg, #fff, #dcb25e, #fff, #ead4a3)",
  },
  dropper: {
    "--shape-w": "66px",
    "--shape-h": "158px",
    "--shape-radius": "18px 18px 28px 28px",
    "--shape-bg": "linear-gradient(180deg, #171411 0 18%, #fff 19% 58%, #dcb25e 59%)",
  },
  watch: {
    "--shape-w": "140px",
    "--shape-h": "140px",
    "--shape-radius": "50%",
    "--shape-bg": "radial-gradient(circle, #090807 0 38%, #dcb25e 39% 48%, #16110c 49%)",
  },
  set: {
    "--shape-w": "148px",
    "--shape-h": "110px",
    "--shape-radius": "24px",
    "--shape-bg": "linear-gradient(90deg, #0b0a09 0 32%, #dcb25e 33% 48%, #fff 49% 62%, #dcb25e 63% 76%, #0b0a09 77%)",
  },
  glasses: {
    "--shape-w": "168px",
    "--shape-h": "70px",
    "--shape-radius": "999px",
    "--shape-bg": "linear-gradient(90deg, transparent 0 8%, #dcb25e 9% 16%, #111 17% 42%, #dcb25e 43% 57%, #111 58% 83%, #dcb25e 84% 91%, transparent 92%)",
  },
  jar: {
    "--shape-w": "118px",
    "--shape-h": "98px",
    "--shape-radius": "22px 22px 36px 36px",
    "--shape-bg": "linear-gradient(180deg, #dcb25e 0 18%, #0b0a09 19% 100%)",
  },
};

let currentGender = "all";
let currentCategory = "all";
let currentIntent = "all";
let currentSlide = 0;
let visibleLimit = 36;
let selectedProduct = null;
const whatsappNumber = "525586730688";

const header = document.querySelector(".site-header");
const heroPanels = [...document.querySelectorAll(".hero-panel")];
const dots = [...document.querySelectorAll(".switch-dot")];
const productGrid = document.querySelector("#productGrid");
const filterButtons = [...document.querySelectorAll(".filter")];
const categoryButtons = [...document.querySelectorAll(".category-filter-button")];
const productCount = document.querySelector("#productCount");
const loadMoreButton = document.querySelector("#loadMoreButton");
const intentGrid = document.querySelector("#intentGrid");
const intentButtons = [...document.querySelectorAll(".intent-filter-button")];
const modal = document.querySelector("#productModal");
const modalMedia = document.querySelector("#modalMedia");
const modalMeta = document.querySelector("#modalMeta");
const modalTitle = document.querySelector("#modalTitle");
const modalPrice = document.querySelector("#modalPrice");
const modalTags = document.querySelector("#modalTags");
const modalDescription = document.querySelector("#modalDescription");
const contactProductButton = document.querySelector("#contactProductButton");
const advisorSubmit = document.querySelector("#advisorSubmit");
const advisorResults = document.querySelector("#advisorResults");
const advisorCategory = document.querySelector("#advisorCategory");
const advisorGender = document.querySelector("#advisorGender");
const advisorOccasion = document.querySelector("#advisorOccasion");
const advisorVibe = document.querySelector("#advisorVibe");
const advisorBudget = document.querySelector("#advisorBudget");
const advisorScent = document.querySelector("#advisorScent");
const advisorLongevity = document.querySelector("#advisorLongevity");
const advisorBrand = document.querySelector("#advisorBrand");
const advisorSet = document.querySelector("#advisorSet");
const advisorBeautyBrand = document.querySelector("#advisorBeautyBrand");
const advisorSkinHair = document.querySelector("#advisorSkinHair");
const advisorCosmetic = document.querySelector("#advisorCosmetic");
const advisorTreatment = document.querySelector("#advisorTreatment");
const advisorPresentation = document.querySelector("#advisorPresentation");
const advisorLensUse = document.querySelector("#advisorLensUse");
const advisorLensStyle = document.querySelector("#advisorLensStyle");
const curatedGrid = document.querySelector("#curatedGrid");

function setSlide(index) {
  currentSlide = index;
  heroPanels.forEach((panel, panelIndex) => {
    panel.classList.toggle("active", panelIndex === index);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });
  header.dataset.theme = heroPanels[index].dataset.theme;
  header.querySelector(".brand-logo").src =
    heroPanels[index].dataset.theme === "men" ? "logo-men.png" : "logo-women.png";
}

function moneyToNumber(value) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function productKey(product) {
  return `${product.name}-${product.url || product.image || product.price}`;
}

function productIndex(product) {
  return products.findIndex((item) => productKey(item) === productKey(product));
}

function categoryLabel(category) {
  if (category === "belleza") return "cuidado personal";
  if (category === "fragancias") return "perfumes";
  return category;
}

function goToProduct(product) {
  const index = Math.max(0, productIndex(product));
  window.location.href = `product.html?id=${index}`;
}

function productWhatsappUrl(product) {
  const message = `Hola! Estoy interesado en este producto: ${product.name}. ¿Cree que me pudiera dar más información acerca del pago y envío?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function contactProduct(product) {
  window.open(productWhatsappUrl(product), "_blank", "noopener");
}

function productProfile(product) {
  if (product._profile) return product._profile;
  const name = normalize(product.name);
  const price = moneyToNumber(product.salePrice || product.price);
  const tags = new Set();

  Object.entries(brandVibes).forEach(([brand, vibes]) => {
    const brandName = brand.replace("_", " ");
    if (name.includes(brandName)) vibes.forEach((vibe) => tags.add(vibe));
  });

  if (product.category === "fragancias") {
    if (/blue|aqua|eau|water|cool|fresh|sport|weekend|light|ck one|chrome/.test(name)) {
      ["fresco", "limpio", "diario", "gym", "escuela"].forEach((tag) => tags.add(tag));
    }
    if (/night|black|dark|noir|intense|extreme|elixir|oud|leather|spice|parfum/.test(name)) {
      ["intenso", "misterioso", "noche", "fiesta", "premium"].forEach((tag) => tags.add(tag));
    }
    if (/sweet|candy|vanilla|girl|bloom|flower|rose|pink|love|passion|fantasy/.test(name)) {
      ["dulce", "sexy", "cita", "regalo"].forEach((tag) => tags.add(tag));
    }
    if (/wood|cedar|vetiver|santal|boss|montblanc|legend|gentleman/.test(name)) {
      ["amaderado", "elegante", "oficina", "trabajo"].forEach((tag) => tags.add(tag));
    }
    if (/citrus|citron|orange|bergamot|lemon|green|lime/.test(name)) {
      ["citrico", "fresco", "limpio"].forEach((tag) => tags.add(tag));
    }
    if (/edt|cologne|body|mist/.test(name)) tags.add("ligero");
    if (/edp|parfum|elixir|intense/.test(name)) tags.add("duradero");
  }

  if (product.category === "belleza") {
    ["elegante", "diario", "regalo"].forEach((tag) => tags.add(tag));
    if (/lip|labial|gloss|rouge|mascara|sombra|blush/.test(name)) ["cita", "fiesta"].forEach((tag) => tags.add(tag));
    if (/serum|cream|moisture|treatment|clean|repair|eye/.test(name)) ["limpio", "trabajo", "premium"].forEach((tag) => tags.add(tag));
    if (/dry|hydra|moist|cream|crema|lotion/.test(name)) ["piel seca", "hidratante", "skincare"].forEach((tag) => tags.add(tag));
    if (/oil|matte|clarifying|clean|foam|gel/.test(name)) ["piel grasa", "limpieza", "skincare"].forEach((tag) => tags.add(tag));
    if (/sensitive|gentle|calm|repair/.test(name)) ["piel sensible", "reparador", "skincare"].forEach((tag) => tags.add(tag));
    if (/hair|shampoo|conditioner|capilar/.test(name)) ["cabello"].forEach((tag) => tags.add(tag));
    if (/lip|labial|gloss|rouge/.test(name)) ["labios", "maquillaje", "acabado"].forEach((tag) => tags.add(tag));
    if (/eye|mascara|lash|shadow|sombra/.test(name)) ["ojos", "maquillaje", "acabado"].forEach((tag) => tags.add(tag));
    if (/set|kit|duo|cofre|gift/.test(name)) tags.add("set");
    if (/routine|rutina|day|night/.test(name)) tags.add("rutina");
  }

  if (product.category === "lentes") {
    ["premium", "regalo", "diario", "elegante"].forEach((tag) => tags.add(tag));
    if (/black|negro|matte|aviator|pilot/.test(name)) ["misterioso", "fiesta"].forEach((tag) => tags.add(tag));
    if (/gold|metal|armani|ray/.test(name)) ["caro", "premium"].forEach((tag) => tags.add(tag));
    if (/aviator|pilot|metal|gold/.test(name)) ["viaje", "manejar"].forEach((tag) => tags.add(tag));
    if (/black|negro|matte/.test(name)) tags.add("sobrio");
    if (/armani|ray|coach|mk|michael/.test(name)) tags.add("premium");
    if (/youth|sport|casual|exchange/.test(name)) tags.add("juvenil");
  }

  if (product.gender === "men") tags.add("hombre");
  if (product.gender === "women") tags.add("mujer");
  if (price < 500) tags.add("menos500");
  if (price >= 500 && price <= 1000) tags.add("500a1000");
  if (price > 1800) tags.add("impacto");
  if (price > 1200) tags.add("caro");
  ["regalo", "ultimo"].forEach((tag) => {
    if (price <= 1800) tags.add(tag);
  });
  if (!tags.size) tags.add("diario");

  const intensity = product.category !== "fragancias"
    ? "media"
    : tags.has("intenso") || tags.has("duradero")
      ? "alta"
      : tags.has("ligero") || tags.has("fresco")
        ? "ligera"
        : "media";

  product._profile = {
    tags: [...tags],
    intensity,
    price,
  };
  return product._profile;
}

function hasTag(product, tag) {
  return productProfile(product).tags.includes(tag);
}

function vibeDescription(product) {
  const profile = productProfile(product);
  const tags = profile.tags;
  const gender = product.gender === "men" ? "hombre" : "mujer";
  if (product.category === "fragancias") {
    const aroma = tags.includes("dulce")
      ? "dulce y atractivo"
      : tags.includes("amaderado")
        ? "amaderado y elegante"
        : tags.includes("intenso")
          ? "intenso y nocturno"
          : tags.includes("citrico")
            ? "cítrico y limpio"
            : "fresco y versátil";
    const occasion = tags.includes("noche") || tags.includes("fiesta")
      ? "noche, fiesta o cita"
      : tags.includes("oficina")
        ? "oficina, trabajo o diario"
        : "diario, escuela o planes casuales";
    return {
      summary: `Vibra ${aroma}. Lo recomiendo para ${gender} que quiere oler bien sin complicarse.`,
      details: [
        ["Para quién", product.gender === "men" ? "Hombre o regalo masculino" : "Mujer o regalo femenino"],
        ["Cuándo usarlo", occasion],
        ["Intensidad", profile.intensity],
        ["Sensación", tags.includes("caro") ? "Pulida, premium y con presencia" : "Fácil de usar, agradable y comercial"],
      ],
    };
  }

  if (product.category === "lentes") {
    return {
      summary: "Accesorio de presencia inmediata: eleva el outfit sin verse exagerado.",
      details: [
        ["Para quién", product.gender === "men" ? "Hombre con estilo sobrio" : "Mujer que busca un look pulido"],
        ["Cuándo usarlo", "Diario, viaje, oficina o regalo"],
        ["Vibra", tags.includes("misterioso") ? "Misteriosa y moderna" : "Premium y fácil de combinar"],
        ["Compra inteligente", profile.price <= 1000 ? "Excelente valor por precio" : "Pieza de mayor impacto visual"],
      ],
    };
  }

  return {
    summary: "Cuidado personal práctico con acabado fino: ideal para mejorar rutina o regalar sin fallar.",
    details: [
      ["Para quién", "Mujer que busca verse más arreglada con poco esfuerzo"],
      ["Cuándo usarlo", tags.includes("fiesta") ? "Cita, noche o eventos" : "Diario, trabajo o rutina personal"],
      ["Vibra", tags.includes("premium") ? "Fina y de cuidado personal premium" : "Limpia, útil y comercial"],
      ["Resultado", "Mejor presencia, piel o acabado visual más cuidado"],
    ],
  };
}

function productCard(product, index) {
  const article = document.createElement("article");
  article.className = `product-card ${product.gender} reveal visible`;
  article.style.animationDelay = `${index * 55}ms`;
  article.dataset.key = productKey(product);

  const art = document.createElement("div");
  art.className = "product-art";
  Object.entries(shapeStyles[product.shape]).forEach(([key, value]) => {
    art.style.setProperty(key, value);
  });
  if (product.image) {
    art.classList.add("has-image");
    art.innerHTML = `<img class="product-photo" src="${product.image}" alt="${product.name}" loading="lazy" />`;
  }

  article.innerHTML = `
    <div class="product-info">
      <div class="product-meta">
        <span>${product.gender === "men" ? "Hombre" : "Mujer"}</span>
        <span>${categoryLabel(product.category)}</span>
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-bottom">
        <span class="price">${product.salePrice || product.price}</span>
        <button class="mini-action" type="button">Ver producto</button>
      </div>
    </div>
  `;
  article.prepend(art);
  article.addEventListener("click", () => goToProduct(product));
  return article;
}

function renderProducts() {
  const filtered = products.filter((product) => {
    const genderMatch = currentGender === "all" || product.gender === currentGender;
    const categoryMatch = currentCategory === "all" || product.category === currentCategory;
    const intentMatch = currentIntent === "all" || hasTag(product, currentIntent);
    return genderMatch && categoryMatch && intentMatch;
  });
  const visibleProducts = filtered.slice(0, visibleLimit);

  productGrid.replaceChildren();
  if (productCount) productCount.textContent = `${visibleProducts.length} de ${filtered.length}`;
  visibleProducts.forEach((product, index) => productGrid.append(productCard(product, index)));
  if (loadMoreButton) {
    loadMoreButton.hidden = visibleProducts.length >= filtered.length;
  }
}

function setCategory(category) {
  currentCategory = category;
  visibleLimit = 36;
  categoryButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === currentCategory);
  });
}

function setIntent(intent) {
  currentIntent = intent;
  visibleLimit = 36;
  intentButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.intent === currentIntent);
  });
}

function renderIntentCards() {
  if (!intentGrid) return;
  intentGrid.replaceChildren();
  intentCards.forEach((intent) => {
    const button = document.createElement("button");
    button.className = "intent-card";
    button.type = "button";
    button.innerHTML = `<span>${intent.category === "all" ? "H&A" : intent.category}</span><strong>${intent.title}</strong><small>${intent.hint}</small>`;
    button.addEventListener("click", () => {
      if (intent.category !== "all") setCategory(intent.category);
      setIntent(intent.id);
      goToCatalog();
      renderProducts();
    });
    intentGrid.append(button);
  });
}

function bestProducts(predicate, count = 4, sortMode = "score") {
  const list = products.filter(predicate);
  const sorted = list.sort((a, b) => {
    if (sortMode === "price") return productProfile(a).price - productProfile(b).price;
    if (sortMode === "premium") return productProfile(b).price - productProfile(a).price;
    return productProfile(b).tags.length - productProfile(a).tags.length || productProfile(a).price - productProfile(b).price;
  });
  return sorted.slice(0, count);
}

function renderCuratedRows() {
  if (!curatedGrid) return;
  const rows = [
    ["Los más regalados", bestProducts((p) => hasTag(p, "regalo") && productProfile(p).price <= 1800)],
    ["Top perfumes para hombres jóvenes", bestProducts((p) => p.category === "fragancias" && p.gender === "men" && (hasTag(p, "juvenil") || hasTag(p, "fresco")))],
    ["Top perfumes para mujer elegante", bestProducts((p) => p.category === "fragancias" && p.gender === "women" && (hasTag(p, "elegante") || hasTag(p, "premium")))],
    ["Los que más parecen de lujo", bestProducts((p) => hasTag(p, "premium") || hasTag(p, "caro"), 4, "premium")],
  ];
  curatedGrid.replaceChildren();
  rows.forEach(([title, items]) => {
    const row = document.createElement("article");
    row.className = "curated-row";
    row.innerHTML = `<h3>${title}</h3><div class="curated-products"></div>`;
    const container = row.querySelector(".curated-products");
    items.forEach((product) => {
      const button = document.createElement("button");
      button.className = "curated-product";
      button.type = "button";
      button.innerHTML = `
        <img src="${product.image || "logo-women.png"}" alt="${product.name}" loading="lazy" />
        <div>
          <strong>${product.name}</strong>
          <span>${product.salePrice || product.price}</span>
        </div>
      `;
      button.addEventListener("click", () => goToProduct(product));
      container.append(button);
    });
    curatedGrid.append(row);
  });
}

function openProduct(product) {
  selectedProduct = product;
  const description = vibeDescription(product);
  const profile = productProfile(product);
  modalMedia.innerHTML = product.image
    ? `<img src="${product.image}" alt="${product.name}" />`
    : "";
  modalMeta.textContent = `${categoryLabel(product.category)} / ${product.gender === "men" ? "Hombre" : "Mujer"}`;
  modalTitle.textContent = product.name;
  modalPrice.textContent = product.salePrice || product.price;
  modalTags.replaceChildren();
  profile.tags.slice(0, 6).forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    modalTags.append(span);
  });
  modalDescription.innerHTML = `
    <p>${description.summary}</p>
    ${description.details.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join("")}
  `;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal?.classList.remove("open");
  modal?.setAttribute("aria-hidden", "true");
}

function goToCatalog() {
  const catalog = document.querySelector("#catalogo");
  if (!catalog) return;
  if (window.haScrollTo) {
    window.haScrollTo(catalog.offsetTop);
  } else {
    window.scrollTo({ top: catalog.offsetTop, behavior: "smooth" });
  }
}

function scoreProduct(product, answers) {
  const profile = productProfile(product);
  const name = normalize(product.name);
  let score = 0;
  if (product.category === answers.category) score += 8;
  if (answers.gender === "all" || answers.gender === "unisex" || product.gender === answers.gender) score += 6;
  if (profile.price <= answers.budget) score += 6;
  if (profile.tags.includes(answers.occasion)) score += 5;
  if (profile.tags.includes(answers.vibe)) score += 5;
  if (answers.brand && answers.brand !== "all" && name.includes(answers.brand)) score += 7;
  if (answers.set === "set" && (/set|kit|cofre|duo|gift/.test(name) || product.category === "sets")) score += 6;
  if (answers.set === "individual" && !/set|kit|cofre|duo|gift/.test(name)) score += 3;
  if (product.category === "fragancias" && profile.tags.includes(answers.scent)) score += 5;
  if (product.category === "fragancias" && profile.tags.includes(answers.longevity)) score += 3;
  [answers.skinHair, answers.cosmetic, answers.treatment, answers.presentation, answers.lensUse, answers.lensStyle]
    .filter((value) => value && value !== "all")
    .forEach((value) => {
      if (profile.tags.includes(value) || name.includes(value)) score += 6;
    });
  if (profile.tags.includes("regalo") && answers.gender === "all") score += 2;
  if (answers.vibe === "caro" && profile.price > 1200) score += 2;
  return score;
}

function advisorRecommendations() {
  if (!advisorCategory.value) return [];
  const answers = {
    category: advisorCategory.value,
    gender: advisorGender.value,
    occasion: advisorOccasion.value,
    vibe: advisorVibe.value,
    budget: Number(advisorBudget.value),
    scent: advisorScent.value,
    longevity: advisorLongevity.value,
    brand: advisorCategory.value === "fragancias" ? advisorBrand.value : advisorCategory.value === "belleza" ? advisorBeautyBrand.value : "all",
    set: advisorSet.value,
    skinHair: advisorSkinHair.value,
    cosmetic: advisorCosmetic.value,
    treatment: advisorTreatment.value,
    presentation: advisorPresentation.value,
    lensUse: advisorLensUse.value,
    lensStyle: advisorLensStyle.value,
  };
  const pool = products
    .filter((product) => product.category === answers.category)
    .filter((product) => answers.gender === "all" || answers.gender === "unisex" || product.gender === answers.gender)
    .filter((product) => productProfile(product).price <= answers.budget || answers.budget > 5000)
    .map((product) => ({ product, score: scoreProduct(product, answers) }))
    .sort((a, b) => b.score - a.score || productProfile(a.product).price - productProfile(b.product).price);

  const safe = pool[0]?.product;
  const budget = [...pool].sort((a, b) => productProfile(a.product).price - productProfile(b.product).price || b.score - a.score)[0]?.product;
  const premium = [...pool]
    .filter((item) => productProfile(item.product).price <= answers.budget || answers.budget > 5000)
    .sort((a, b) => b.score - a.score || productProfile(b.product).price - productProfile(a.product).price)[0]?.product;

  return [
    ["Opción segura", safe],
    ["Mejor precio", budget],
    ["Impacto / regalo premium", premium],
    ["Alternativa versátil", pool[1]?.product],
    ["Buen regalo", pool.find((item) => hasTag(item.product, "regalo"))?.product],
    ["Mayor presencia", pool.find((item) => hasTag(item.product, "premium") || hasTag(item.product, "impacto"))?.product],
  ].filter(([, product], index, arr) => product && arr.findIndex(([, p]) => productKey(p) === productKey(product)) === index);
}

function renderAdvisorResults() {
  if (!advisorCategory.value) {
    advisorResults.hidden = true;
    advisorResults.replaceChildren();
    return;
  }
  advisorResults.hidden = false;
  const results = advisorRecommendations();
  advisorResults.replaceChildren();
  if (!results.length) {
    advisorResults.innerHTML = `<p class="advisor-empty">No encontré opciones con esos filtros. Sube el presupuesto o cambia la ocasión.</p>`;
    return;
  }
  results.forEach(([label, product]) => {
    const card = document.createElement("button");
    card.className = "advisor-result";
    card.type = "button";
    card.innerHTML = `
      <img src="${product.image || "logo-women.png"}" alt="${product.name}" loading="lazy" />
      <div>
        <span>${label}</span>
        <strong>${product.name}</strong>
        <small>${product.salePrice || product.price}</small>
      </div>
    `;
    card.addEventListener("click", () => goToProduct(product));
    advisorResults.append(card);
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => setSlide(Number(dot.dataset.slide)));
});

document.querySelectorAll("[data-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    currentGender = link.dataset.filter;
    visibleLimit = 36;
    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.gender === currentGender);
    });
    renderProducts();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentGender = button.dataset.gender;
    visibleLimit = 36;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
    renderProducts();
  });
});

document.querySelectorAll(".collection-pill").forEach((card) => {
  card.addEventListener("click", () => {
    setCategory(card.dataset.category);
    goToCatalog();
    renderProducts();
  });
});

intentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setIntent(button.dataset.intent);
    renderProducts();
  });
});

loadMoreButton?.addEventListener("click", () => {
  visibleLimit += 36;
  renderProducts();
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

contactProductButton?.addEventListener("click", () => {
  if (!selectedProduct) return;
  contactProduct(selectedProduct);
});

function syncAdvisorQuestions() {
  const category = advisorCategory.value;
  document.querySelectorAll(".advisor-question").forEach((question) => {
    const groups = (question.dataset.advisorGroup || "").split(" ");
    question.hidden = !category || !groups.includes(category);
  });
  advisorSubmit.hidden = !category;
  advisorResults.hidden = !category;
  if (!category) advisorResults.replaceChildren();
}

advisorCategory?.addEventListener("change", () => {
  syncAdvisorQuestions();
  renderAdvisorResults();
});
advisorSubmit?.addEventListener("click", renderAdvisorResults);

[
  advisorGender,
  advisorOccasion,
  advisorVibe,
  advisorBudget,
  advisorScent,
  advisorLongevity,
  advisorBrand,
  advisorSet,
  advisorBeautyBrand,
  advisorSkinHair,
  advisorCosmetic,
  advisorTreatment,
  advisorPresentation,
  advisorLensUse,
  advisorLensStyle,
].forEach((control) => control?.addEventListener("change", renderAdvisorResults));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

setInterval(() => {
  setSlide((currentSlide + 1) % heroPanels.length);
}, 7000);

function initSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (reduceMotion || coarsePointer) return;

  let target = window.scrollY;
  let current = window.scrollY;
  let ticking = false;

  function clampScroll(value) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(value, max));
  }

  function animate() {
    current += (target - current) * 0.18;
    window.scrollTo(0, current);

    if (Math.abs(target - current) > 0.35) {
      requestAnimationFrame(animate);
      return;
    }

    current = target;
    ticking = false;
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      target = clampScroll(target + event.deltaY * 1.18);

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(animate);
      }
    },
    { passive: false }
  );

  window.addEventListener("keydown", () => {
    target = window.scrollY;
    current = window.scrollY;
  });

  window.haSyncSmoothScroll = () => {
    target = window.scrollY;
    current = window.scrollY;
  };

  window.haScrollTo = (value) => {
    target = clampScroll(value);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(animate);
    }
  };
}

initSmoothScroll();
document.querySelectorAll('a[href="#catalogo"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    goToCatalog();
  });
});
renderIntentCards();
renderCuratedRows();
syncAdvisorQuestions();
renderProducts();
