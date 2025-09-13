import { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getProducts().then(setData).finally(() => setLoading(false)); }, []);

  if (loading) {
    return <div className="text-gray-600">Loading products…</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold tracking-tight">Products</h1>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
