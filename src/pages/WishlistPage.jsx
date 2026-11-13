import { formatPeso } from "../utils/format";
import HeartButton from "../components/HeartButton";
import { useStore } from "../store/StoreContext";

export default function WishlistPage() {
  const {
    wishlistIds,
    getProductById,
    navigateTo,
    openProductDetail,
    handleClearOrRestoreWishlist
  } = useStore();

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111] leading-tight">
            Wishlist
          </h1>
          <p className="text-[13px] text-[#666666] mt-1">
            {wishlistIds.length} saved items
          </p>
        </div>
        <button
          type="button"
          onClick={handleClearOrRestoreWishlist}
          title={
            wishlistIds.length > 0
              ? "Clear Wishlist"
              : "Restore Default Wishlist"
          }
          className="p-2 mt-1 mr-2 text-[#222222] hover:text-[#EB5757] transition-colors rounded-lg hover:bg-black/5"
        >
          <svg
            className="w-[19px] h-[19px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
            />
          </svg>
        </button>
      </div>

      {wishlistIds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistIds.map(id => {
            const p = getProductById(id);
            return (
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
            );
          })}
        </div>
      ) : (
        <div className="bg-[#F8F8F8] rounded-[14px] p-12 text-center">
          <p className="text-[15px] font-medium text-[#222222]">
            Your wishlist is empty.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleClearOrRestoreWishlist}
              className="px-5 py-2.5 rounded-[8px] bg-[#0B465F] text-white text-[13px] font-medium"
            >
              Restore Saved Hoodies
            </button>
            <button
              type="button"
              onClick={() => navigateTo("catalog")}
              className="px-5 py-2.5 rounded-[8px] border border-[#0B465F] text-[#0B465F] text-[13px] font-medium"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
