import { formatPeso } from "../utils/format";
import HeartButton from "../components/HeartButton";
import { useStore } from "../store/StoreContext";

export default function SearchPage() {
  const {
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    mainSearchInputRef,
    openProductDetail,
    filteredSearchProducts
  } = useStore();

  return (
    <div>
      <h1 className="text-[28px] font-semibold text-[#111111] mb-5">
        Search
      </h1>

      <div className="relative w-full">
        <svg
          className="w-[18px] h-[18px] text-[#111111] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
        </svg>
        <input
          ref={mainSearchInputRef}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full h-[50px] pl-12 pr-12 bg-[#FBFBFB] border border-[#F3A6A1] rounded-[10px] text-[14px] text-[#111111] placeholder-[#8E8E8E] focus:outline-none focus:border-[#EB5757]"
        />
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            mainSearchInputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-[#EB5757] hover:bg-[#D64545] text-white flex items-center justify-center text-[10px] leading-none"
        >
          ✕
        </button>
      </div>

      {/* category tabs (scroll sideways on small screens) */}
      <div className="flex items-center gap-7 sm:gap-14 mt-5 mb-6 pl-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
        {["All", "Hoodies", "Graphic", "Oversize", "Zip-Up"].map(tab => {
          const isActive = tab === searchCategory;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setSearchCategory(tab)}
              className={`relative inline-block pb-1.5 text-[14px] transition-colors ${
                isActive
                  ? "text-[#EB5757] font-medium"
                  : "text-[#222222] hover:text-[#EB5757]"
              }`}
            >
              <span>{tab}</span>
              {isActive && (
                <span className="absolute left-0 right-0 bottom-0 w-full h-[1.5px] bg-[#EB5757]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredSearchProducts.length > 0 ? (
          filteredSearchProducts.map(p => (
            <div
              key={p.id}
              onClick={() => openProductDetail(p)}
              className="hv-card p-4 pb-5 relative cursor-pointer group"
            >
              <HeartButton
                productId={p.id}
                className="absolute top-3.5 right-3.5"
              />
              <div className="w-full h-[215px] flex items-center justify-center overflow-hidden mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-[205px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-1">
                <h3 className="text-[15px] font-medium text-[#111111]">
                  {p.name}
                </h3>
                <p className="text-[13px] font-semibold text-[#111111] mt-1">
                  {formatPeso(p.price)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-[#F8F8F8] rounded-[14px] p-12 text-center">
            <p className="text-[15px] font-medium text-[#222222]">
              No hoodies found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSearchCategory("All");
              }}
              className="mt-3 text-[13px] font-medium text-[#0B465F] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
