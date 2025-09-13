import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div
      className="group rounded-2xl border border-gray-200 bg-white p-4
                 shadow-[0_4px_16px_rgba(0,0,0,0.06)]
                 transition-transform duration-200
                 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl bg-gray-50">
        <div className="grid h-56 place-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-48 object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="mt-3 space-y-2">
        <div className="text-[11px] uppercase tracking-wide text-gray-500">{product.category}</div>
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-medium text-gray-900 hover:underline"
        >
          {product.title}
        </Link>
        <div className="text-base font-semibold">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
}
