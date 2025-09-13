import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../lib/api";
import { useCart } from "../context/CartContext";

function Stars({ rate = 0 }) {
  const full = Math.round(rate);
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < full ? "fill-current" : "fill-gray-200"}`}>
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.954L10 0l2.951 5.956 6.561.954-4.756 4.635 1.122 6.545z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => { getProduct(id).then(setProduct); }, [id]);

  if (!product) return <div>Loading…</div>;

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-800">Home</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 grid place-items-center">
          <img src={product.image} alt={product.title} className="max-h-[480px] object-contain" />
        </div>

        <section>
          <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight">
            {product.title}
          </h1>
          <div className="mb-4 flex items-center gap-3">
            <Stars rate={product.rating?.rate} />
            <span className="text-sm text-gray-500">
              {product.rating?.rate ?? "—"} ({product.rating?.count ?? 0})
            </span>
          </div>

          <div className="mb-6 text-4xl font-extrabold tracking-tight">${product.price.toFixed(2)}</div>

          <p className="mb-8 text-gray-700">{product.description}</p>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="w-24 rounded-xl border px-3 py-2"
            />
            <button
              onClick={() => addItem(product, qty)}
              className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Add to cart
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
