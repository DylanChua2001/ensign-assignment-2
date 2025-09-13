import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters + mobile drawer state
  const [filters, setFilters] = useState({ q:"", category:"", minPrice:null, maxPrice:null });
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { getProducts().then(setData).finally(() => setLoading(false)); }, []);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return data.filter(p => {
      if (q && !(p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.minPrice != null && p.price < filters.minPrice) return false;
      if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
      return true;
    });
  }, [data, filters]);

  if (loading) return <div className="text-gray-600 p-4">Loading products…</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Header + mobile filter button */}
      <div className="mb-4 flex items-end justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <button
          onClick={()=>setFiltersOpen(true)}
          className="sm:hidden rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Filters
        </button>
      </div>

      {/* Two-column layout: left sticky filters, right grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[16rem_1fr]">
        <FilterSidebar
          products={data}
          filters={filters}
          setFilters={setFilters}
          open={filtersOpen}
          setOpen={setFiltersOpen}
        />

        <section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            {filtered.length === 0 && (
              <div className="col-span-full rounded-xl border bg-white p-6 text-center text-gray-600">
                No products match your filters.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
