#!/usr/bin/env python3
"""Update H&A product prices from UFRA product pages.

The script is dependency-free on purpose so it can run inside GitHub Actions.
It keeps the existing curated metadata and refreshes prices/images from each
known UFRA product URL. New URLs can be discovered from the seed pages below.
"""

from __future__ import annotations

import html
import json
import re
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_FILE = ROOT / "products-data.js"
TARGET_MARGIN = 0.40
MIN_MARGIN = 0.35
MAX_MARGIN = 0.45
USER_AGENT = "Mozilla/5.0 (compatible; HA-Essence-Catalog-Updater/1.0)"

SEED_URLS = [
    "https://ufra.com.mx/",
    "https://ufra.com.mx/perfumes.html",
    "https://ufra.com.mx/lentes.html",
    "https://ufra.com.mx/maquillaje.html",
    "https://ufra.com.mx/skincare.html",
]


def money_to_int(value: str | int | float | None) -> int | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return int(round(value))
    clean = re.sub(r"[^\d.]", "", value)
    if not clean:
        return None
    return int(round(float(clean)))


def money(value: int | None) -> str:
    return "" if value is None else f"${value:,}"


def slug_category(name: str) -> str:
    low = name.lower()
    if any(word in low for word in ["lente", "sunglass", "eyewear"]):
        return "lentes"
    if any(word in low for word in ["lip", "cream", "crema", "serum", "base", "mascara", "shampoo", "tratamiento"]):
        return "belleza"
    return "fragancias"


def infer_gender(name: str) -> str:
    low = name.lower()
    if any(word in low for word in [" woman", " women", " dama", "femme", "lady", "her "]):
        return "women"
    if any(word in low for word in [" man", " men", "hombre", "homme", "him "]):
        return "men"
    return "unisex"


def price_with_margin(provider: int | None, regular: int | None) -> tuple[int | None, int | None, float | None, str]:
    if not provider:
        return None, None, None, "SIN PRECIO PROVEEDOR"
    suggested = int(round((provider / (1 - TARGET_MARGIN)) / 10) * 10)
    if regular and suggested > regular:
        suggested = regular
    profit = suggested - provider
    margin = profit / suggested if suggested else 0
    if MIN_MARGIN <= margin <= MAX_MARGIN:
        status = "OK 35-45%"
    elif margin < MIN_MARGIN:
        status = "BAJO: TOPE PRECIO LISTA"
    else:
        status = "REVISAR: MARGEN ALTO"
    return suggested, profit, margin, status


def fetch(url: str) -> str:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=25) as response:
        return response.read().decode("utf-8", errors="ignore")


def extract_json_ld(page: str) -> dict:
    for raw in re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', page, flags=re.I | re.S):
        try:
            data = json.loads(html.unescape(raw.strip()))
        except json.JSONDecodeError:
            continue
        candidates = data if isinstance(data, list) else [data]
        for item in candidates:
            if isinstance(item, dict) and item.get("@type") == "Product":
                return item
            if isinstance(item, dict) and "@graph" in item:
                for graph_item in item["@graph"]:
                    if isinstance(graph_item, dict) and graph_item.get("@type") == "Product":
                        return graph_item
    return {}


def parse_product_page(url: str) -> dict:
    page = fetch(url)
    data = extract_json_ld(page)
    name = html.unescape(str(data.get("name") or "")).strip()
    image = data.get("image")
    if isinstance(image, list):
        image = image[0] if image else ""
    if not image:
        match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)', page, flags=re.I)
        image = html.unescape(match.group(1)) if match else ""
    offer = data.get("offers") or {}
    if isinstance(offer, list):
        offer = offer[0] if offer else {}
    provider = money_to_int(offer.get("price"))

    regular_candidates = [
        *re.findall(r'old-price[^$]{0,200}\$([\d,]+(?:\.\d+)?)', page, flags=re.I | re.S),
        *re.findall(r'Precio anterior[^$]{0,200}\$([\d,]+(?:\.\d+)?)', page, flags=re.I | re.S),
        *re.findall(r'price[^$]{0,80}\$([\d,]+(?:\.\d+)?)', page, flags=re.I | re.S),
    ]
    regular_values = [money_to_int(value) for value in regular_candidates]
    regular_values = [value for value in regular_values if value]
    regular = max(regular_values) if regular_values else provider

    return {"name": name, "provider": provider, "regular": regular, "image": image}


def discover_product_urls() -> set[str]:
    urls: set[str] = set()
    for seed in SEED_URLS:
        try:
            page = fetch(seed)
        except URLError:
            continue
        urls.update(re.findall(r'https://ufra\.com\.mx/[^"\']+?\.html', page))
        urls.update("https://ufra.com.mx/" + path.lstrip("/") for path in re.findall(r'href=["\'](/[^"\']+?\.html)', page))
        time.sleep(0.5)
    return {url.split("?")[0] for url in urls if "christian" not in url.lower() and "dior" not in url.lower()}


def load_products() -> list[dict]:
    text = PRODUCTS_FILE.read_text()
    match = re.search(r"window\.UFRA_PRODUCTS\s*=\s*(\[.*\]);?\s*$", text, flags=re.S)
    if not match:
        raise RuntimeError("No pude leer window.UFRA_PRODUCTS")
    return json.loads(match.group(1))


def save_products(products: list[dict]) -> None:
    payload = json.dumps(products, ensure_ascii=False, indent=2)
    PRODUCTS_FILE.write_text(f"window.UFRA_PRODUCTS = {payload};\n")


def main() -> None:
    products = [item for item in load_products() if "dior" not in item.get("name", "").lower()]
    by_url = {item.get("url"): item for item in products if item.get("url")}
    for url in discover_product_urls():
        by_url.setdefault(url, {"name": "", "url": url, "description": "", "shape": "bottle"})

    updated: list[dict] = []
    for url, product in sorted(by_url.items(), key=lambda pair: pair[1].get("name") or pair[0]):
        try:
            fresh = parse_product_page(url)
        except Exception as exc:  # noqa: BLE001 - keep weekly job resilient
            print(f"warning: {url}: {exc}")
            fresh = {}
        name = fresh.get("name") or product.get("name") or url.rsplit("/", 1)[-1].replace("-", " ").replace(".html", "").upper()
        provider = fresh.get("provider") or money_to_int(product.get("providerPrice"))
        regular = fresh.get("regular") or money_to_int(product.get("regularPrice"))
        sale, profit, margin, status = price_with_margin(provider, regular)
        product.update(
            {
                "name": name.upper(),
                "category": product.get("category") or slug_category(name),
                "gender": product.get("gender") or infer_gender(name),
                "price": money(sale),
                "providerPrice": money(provider),
                "regularPrice": money(regular),
                "salePrice": money(sale),
                "profit": money(profit),
                "margin": "" if margin is None else f"{margin * 100:.1f}%",
                "pricingStatus": status,
                "url": url,
                "image": fresh.get("image") or product.get("image", ""),
            }
        )
        if "dior" not in product["name"].lower():
            updated.append(product)
        time.sleep(0.5)

    save_products(updated)
    print(f"updated {len(updated)} products")


if __name__ == "__main__":
    main()
