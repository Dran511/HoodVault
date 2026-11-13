import { INITIAL_PRODUCTS } from "../data/products";
import { useStore } from "../store/StoreContext";

export default function CollectionModal() {
  const {
    collectedIds,
    collectionModalOpen,
    setCollectionModalOpen,
    navigateTo,
    openProductDetail,
    collectedCount
  } = useStore();

  if (!collectionModalOpen) return null;

  return (
    <div
      onClick={() => setCollectionModalOpen(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#F8F8F8] border border-[#DCDCDC] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0B465F]">
              Your Style Journey
            </p>
            <h3 className="text-[19px] font-semibold text-[#111111]">
              HoodVault Collector Progress ({collectedCount} / 10)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setCollectionModalOpen(false)}
            className="text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <p className="text-[12.5px] text-[#555555] mb-4">
          Every hoodie you order or unlock adds to your personal Vault. Collect
          all 10 styles to unlock VIP Archive access.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
          {INITIAL_PRODUCTS.map(p => {
            const unlocked = collectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => {
                  setCollectionModalOpen(false);
                  openProductDetail(p);
                }}
                className={`p-2 rounded-xl border text-center cursor-pointer transition-all ${
                  unlocked
                    ? "bg-white border-[#0B465F]"
                    : "bg-white/50 border-[#DCDCDC] opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-14 mx-auto object-contain"
                />
                <div className="text-[10.5px] font-medium text-[#111111] truncate mt-1">
                  {p.name}
                </div>
                <div className="text-[9.5px] text-[#0B465F] font-semibold">
                  {unlocked ? "Collected" : "Locked"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => {
              setCollectionModalOpen(false);
              navigateTo("wishlist");
            }}
            className="px-4 py-2 rounded-lg border border-[#0B465F] text-[#0B465F] text-[12.5px] font-medium"
          >
            Go to Wishlist
          </button>
          <button
            type="button"
            onClick={() => setCollectionModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-[#0B465F] text-white text-[12.5px] font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
