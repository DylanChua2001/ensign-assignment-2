import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  const linkCls = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <nav className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-black text-white font-bold">S</span>
          <span className="text-lg font-extrabold tracking-tight">Shop</span>
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/cart" className={linkCls}>
            <span className="relative inline-flex items-center">
              Cart
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -right-4 -top-2 grid h-5 min-w-[20px] place-items-center
                             rounded-full bg-red-600 px-1.5 text-xs font-bold text-white animate-bounce"
                >
                  {totalItems}
                </span>
              )}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
