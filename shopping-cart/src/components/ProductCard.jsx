import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="group rounded-2xl border bg-white p-4 shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <Link to={`/product/${product.id}`} className="flex h-56 items-center justify-center rounded-xl bg-gray-50">
        <img src={product.image} alt={product.title} className="max-h-48 object-contain transition group-hover:scale-[1.03]" />
      </Link>

      <div className="mt-4 space-y-2">
        <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-brand-700">
          {product.title}
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight">${product.price.toFixed(2)}</div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-600">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
