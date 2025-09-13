import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <footer className="mt-auto border-t bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
