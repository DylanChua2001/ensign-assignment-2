import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const linkCls = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-brand-700" : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <nav className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-brand-600 text-white font-bold">S</span>
          <span className="text-lg font-extrabold tracking-tight">Shop</span>
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/cart" className={linkCls}>
            <span className="relative inline-flex items-center">
              Cart
              <span className="absolute -right-4 -top-2 h-5 min-w-5 rounded-full bg-brand-600 px-1.5 text-xs font-bold text-white grid place-items-center">
                {count}
              </span>
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
