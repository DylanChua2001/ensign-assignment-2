import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, updateQty, removeItem, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="grid place-items-center py-20 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <Link to="/" className="inline-block rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-card">
            <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
            <div className="flex-1">
              <div className="line-clamp-2 font-medium">{item.title}</div>
              <div className="text-sm text-gray-600">${item.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.id, item.qty - 1)}
                className="h-9 w-9 rounded-lg border grid place-items-center"
                aria-label="Decrease quantity"
              >−</button>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value) || 1))}
                className="w-16 rounded-lg border px-2 py-1 text-center"
              />
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="h-9 w-9 rounded-lg border grid place-items-center"
                aria-label="Increase quantity"
              >+</button>
            </div>
            <div className="w-24 text-right font-semibold">${(item.price * item.qty).toFixed(2)}</div>
            <button
              onClick={() => removeItem(item.id)}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <aside className="md:sticky md:top-24 h-fit rounded-2xl border bg-white p-5 shadow-card">
        <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>${total.toFixed(2)}</dd></div>
          <div className="flex justify-between text-gray-500"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
          <div className="flex justify-between text-gray-500"><dt>Tax</dt><dd>—</dd></div>
          <div className="my-3 border-t"></div>
          <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
        </dl>
        <button className="mt-5 w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700">
          Checkout
        </button>
        <button onClick={clear} className="mt-3 w-full rounded-xl border px-4 py-3 font-medium hover:bg-gray-50">
          Clear cart
        </button>
      </aside>
    </div>
  );
}
