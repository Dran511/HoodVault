import { useStore } from "../store/StoreContext";

export default function Footer() {
  const { navigateTo } = useStore();

  return (
    <footer className="w-full px-4 sm:px-8 pb-8 mt-auto">
      <div className="max-w-[1060px] mx-auto pt-5 border-t border-[#D5D5D5] flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-3 sm:gap-4 text-[12.5px]">
        <div className="flex items-center gap-6 sm:gap-20">
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className="font-medium text-[#0B465F] hover:underline"
          >
            HoodVault
          </button>
          <span className="text-[#6E6E6E]">Stay Cozy, Stay You.</span>
        </div>
        <div className="flex items-center gap-2.5 text-[#6E6E6E]">
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className="hover:text-[#111111] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => navigateTo("categories")}
            className="hover:text-[#111111] transition-colors"
          >
            Categories
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => navigateTo("wishlist")}
            className="hover:text-[#111111] transition-colors"
          >
            Wishlist
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => navigateTo("profile")}
            className="hover:text-[#111111] transition-colors"
          >
            Profile
          </button>
        </div>
      </div>
    </footer>
  );
}
