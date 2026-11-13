import { useStore } from "../store/StoreContext";

export default function HeartButton({ productId, className = "" }) {
  const { wishlistIds, toggleWishlist } = useStore();
  const saved = wishlistIds.includes(productId);
  return (
    <button
      type="button"
      onClick={e => toggleWishlist(productId, e)}
      aria-label={saved ? "Remove from Wishlist" : "Save to Wishlist"}
      className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-transform active:scale-125 z-10 ${className}`}
    >
      {saved ? (
        <svg className="w-[18px] h-[18px] text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg className="w-[18px] h-[18px] text-[#222222]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.8l-1.35-1.23C5.6 15.02 2.2 12.03 2.2 8.4 2.2 5.5 4.48 3.2 7.4 3.2c1.66 0 3.25.77 4.6 2.02 1.35-1.25 2.94-2.02 4.6-2.02 2.92 0 5.2 2.3 5.2 5.2 0 3.63-3.4 6.62-8.45 11.17L12 20.8z" />
        </svg>
      )}
    </button>
  );
}
