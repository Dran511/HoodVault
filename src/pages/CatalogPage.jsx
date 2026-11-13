import { formatPeso } from "../utils/format";
import HeartButton from "../components/HeartButton";
import { useStore } from "../store/StoreContext";

export default function CatalogPage() {
  const {
    catalogCategory,
    setCatalogCategory,
    openProductDetail,
    addToCart,
    filteredCatalogProducts
  } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-semibold text-[#111111]">
          {catalogCategory === "All" ? "All Hoodies" : catalogCategory}
        </h1>
        <span className="text-[13px] text-[#555555] pr-4">
          {filteredCatalogProducts.length} items
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <aside className="w-full md:w-[190px] shrink-0">
          <h2 className="text-[14px] font-semibold text-[#111111] px-1 mb-3">
            Categories
          </h2>
          <div className="flex flex-row md:flex-col gap-1 overflow-x-auto">
            {["All", "Hoodies", "Graphic", "Oversize", "Zip-Up"].map(
              item => {
                const isActive = item === catalogCategory;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCatalogCategory(item)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-[8px] text-[13.5px] transition-colors ${
                      isActive
                        ? "bg-[#DCE7EC] text-[#0B465F] font-medium"
                        : "text-[#333333] hover:bg-black/5"
                    }`}
                  >
                    {item}
                  </button>
                );
              }
            )}
          </div>
        </aside>

        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCatalogProducts.map(p => {
            const shownPrice = p.catalogPrice || p.price;
            return (
              <div
                key={p.id}
                onClick={() => openProductDetail(p)}
                className="hv-card p-4 pb-5 relative cursor-pointer group"
              >
                <button
                  type="button"
                  onClick={e => addToCart(p.id, "L", 1, e)}
                  aria-label={`Quick add ${p.name} to Cart`}
                  title="Quick add to Cart"
                  className="absolute top-3.5 left-3.5 w-6 h-6 rounded-full bg-white hover:bg-[#0B465F] text-[#222222] hover:text-white flex items-center justify-center shadow-sm transition-colors z-10 text-[15px] leading-none font-medium"
                >
                  +
                </button>

                <HeartButton
                  productId={p.id}
                  className="absolute top-3 right-3"
                />

                <div className="w-full h-[200px] flex items-center justify-center overflow-hidden my-1">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-[190px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-2 px-0.5">
                  <h3 className="text-[14.5px] font-medium text-[#111111]">
                    {p.name}
                  </h3>
                  <p className="text-[12.5px] font-semibold text-[#111111] mt-1">
                    {formatPeso(shownPrice)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
