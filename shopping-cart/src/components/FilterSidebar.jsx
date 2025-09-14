import { useMemo } from "react";

export default function FilterSidebar({ products = [], filters, setFilters, open, setOpen }) {
  const set = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  const Panel = (
    <div className="space-y-6">
      {/* Search */}
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-600">Search</span>
        <input
          value={filters.q}
          onChange={(e) => set("q", e.target.value)}
          placeholder="Search products…"
          className="rounded-xl border px-3 py-2"
        />
      </label>

      {/* Category */}
      <section>
        <h3 className="mb-2 text-xs font-semibold text-gray-600">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => set("category", "")}
            className={`rounded-full border px-3 py-1.5 text-sm ${!filters.category ? "bg-black text-white border-black" : ""}`}
          >
            All
          </button>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => set("category", c)}
              className={`rounded-full border px-3 py-1.5 text-sm ${filters.category===c ? "bg-black text-white border-black" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <h3 className="mb-2 text-xs font-semibold text-gray-600">Price</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min="0"
            value={filters.minPrice ?? ""}
            onChange={(e)=>set("minPrice", e.target.value===""?null:Number(e.target.value))}
            placeholder="Min"
            className="rounded-xl border px-3 py-2"
          />
          <input
            type="number"
            min="0"
            value={filters.maxPrice ?? ""}
            onChange={(e)=>set("maxPrice", e.target.value===""?null:Number(e.target.value))}
            placeholder="Max"
            className="rounded-xl border px-3 py-2"
          />
        </div>
      </section>

      <button
        onClick={()=>setFilters({ q:"", category:"", minPrice:null, maxPrice:null })}
        className="w-full rounded-xl border px-4 py-2 text-sm"
      >
        Clear filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sticky */}
      <aside className="hidden sm:block">
        <div className="sm:sticky sm:top-20 rounded-2xl border bg-white p-4 shadow-sm">
          {Panel}
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 bg-black/40 sm:hidden ${open ? "block" : "hidden"}`} onClick={()=>setOpen(false)} />
      <div className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white p-4 shadow-xl sm:hidden ${open ? "block" : "hidden"}`}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold">Filters</h3>
            <button onClick={()=>setOpen(false)} className="rounded-full border px-3 py-1 text-sm">Done</button>
          </div>
          {Panel}
        </div>
      </div>
    </>
  );
}
