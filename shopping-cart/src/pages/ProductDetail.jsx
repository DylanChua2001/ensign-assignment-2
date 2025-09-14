import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../lib/api";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";

function Stars({ rate = 0 }) {
  const full = Math.round(rate);
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < full ? "fill-current" : "fill-gray-200"}`}
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.954L10 0l2.951 5.956 6.561.954-4.756 4.635 1.122 6.545z" />
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

  const [toast, setToast] = useState(false);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <div className="p-10 text-gray-600">Loading…</div>;

  const handleAdd = () => {
    addItem(product, qty);
    setToast(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/">Home</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Product Image */}
        <div className="rounded-2xl border bg-white p-6 grid place-items-center">
          <img src={product.image} alt={product.title} className="max-h-[500px] object-contain" />
        </div>

        {/* Product Info */}
        <section className="space-y-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tight">{product.title}</h1>

          <div className="flex items-center gap-3">
            <Stars rate={product.rating?.rate} />
            <span className="text-sm text-gray-500">
              {product.rating?.rate ?? "—"} ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <div className="text-4xl font-extrabold tracking-tight text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="h-12 w-24 rounded-xl border border-gray-300 px-3 text-center text-base
                         focus:border-black focus:ring-1 focus:ring-black"
            />
            <button
              onClick={handleAdd}
              className="h-12 rounded-xl border border-black bg-white px-6 font-semibold text-black
                         shadow-sm cursor-pointer
                         transition-transform duration-150
                         hover:bg-gray-100 hover:scale-105 hover:shadow-md
                         active:scale-95"
            >
              Add to cart
            </button>
          </div>
        </section>
      </div>

      {/* Toast */}
      <Toast
        message="✅ Item added to cart"
        show={toast}
        onClose={() => setToast(false)}
      />
    </div>
  );
}
