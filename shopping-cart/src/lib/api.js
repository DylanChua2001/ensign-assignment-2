const BASE = "https://fakestoreapi.com";

export async function getProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
