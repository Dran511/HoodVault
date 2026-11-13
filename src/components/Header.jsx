import { useStore } from "../store/StoreContext";

export default function Header() {
  const {
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    isLoggedIn,
    profile,
    mainSearchInputRef,
    navigateTo,
    cartItemCount,
    isAuthView
  } = useStore();

  return (
    <header className="w-full pt-6 pb-2 px-4 sm:px-8">
      <div className="max-w-[1060px] mx-auto">
        <div
          className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-4 pb-3 lg:pb-5 ${
            isAuthView ? "" : "border-b border-[#D5D5D5]"
          }`}
        >
          {/* logo */}
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className="order-1 flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-[#222222] transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 28 24"
              fill="currentColor"
            >
              <circle cx="3" cy="6" r="1.4" />
              <circle cx="8.5" cy="4.2" r="1.4" />
              <circle cx="14" cy="2.8" r="1.5" />
              <circle cx="19.5" cy="4.2" r="1.4" />
              <circle cx="25" cy="6" r="1.4" />
              <path d="M4 16L2.5 8.2L8.8 11.8L9.2 6.8L14 11.2L18.8 6.8L19.2 11.8L25.5 8.2L24 16H4Z" />
              <rect x="4" y="17.5" width="20" height="2.2" rx="1" />
            </svg>
            <span className="brand-serif text-[24px] font-semibold text-[#111111] leading-none">
              HoodVault
            </span>
          </button>

          {/* main nav — on phones it drops to its own row */}
          {!isAuthView && (
            <nav className="order-3 w-full flex items-center justify-between sm:justify-start sm:gap-11 lg:order-2 lg:w-auto" aria-label="Main Navigation">
              {[
                { id: "home", label: "Home", match: ["home"] },
                { id: "categories", label: "Categories", match: ["categories", "catalog"] },
                { id: "wishlist", label: "Wishlist", match: ["wishlist"] },
                { id: "profile", label: "Profile", match: ["profile"] }
              ].map(tab => {
                const isActive = tab.match.includes(currentView);
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => navigateTo(tab.id)}
                    className={`relative inline-block py-1.5 px-0 text-[14px] transition-colors ${
                      isActive
                        ? "text-[#0B465F] font-medium"
                        : "text-[#2B2B2B] hover:text-[#0B465F]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute left-0 right-0 -bottom-[6px] w-full h-[2px] bg-[#0B465F] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* search, cart, account */}
          {!isAuthView && (
            <div className="order-2 lg:order-3 flex items-center gap-4 sm:gap-7">
              <button
                type="button"
                onClick={() => {
                  setCurrentView("search");
                  setTimeout(() => mainSearchInputRef.current?.focus(), 40);
                }}
                aria-label="Search hoodies"
                className={`md:hidden p-1 transition-colors ${
                  currentView === "search" ? "text-[#0B465F]" : "text-[#111111]"
                }`}
              >
                <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
                </svg>
              </button>
              <div className="relative hidden md:block w-[210px] lg:w-[265px]">
                <svg
                  className="w-4 h-4 text-[#222222] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M20 20l-3.8-3.8" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search hoodies"
                  onFocus={() => {
                    if (currentView !== "search") {
                      setCurrentView("search");
                      setTimeout(() => mainSearchInputRef.current?.focus(), 40);
                    }
                  }}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    if (currentView !== "search") {
                      setCurrentView("search");
                    }
                  }}
                  className="w-full h-[38px] pl-10 pr-4 bg-[#FBFBFB] border border-[#D8D8D8] rounded-[9px] text-[13px] text-[#111111] placeholder-[#8E8E8E] focus:outline-none focus:border-[#0B465F] transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={() => navigateTo("cart")}
                className={`flex items-center gap-2 text-[13.5px] transition-colors relative ${
                  currentView === "cart" || currentView === "checkout"
                    ? "text-[#0B465F] font-medium"
                    : "text-[#111111] hover:text-[#0B465F]"
                }`}
              >
                <svg className="w-[21px] h-[21px]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.2 10.2a1.8 1.8 0 001.8 1.4h8.8a1.8 1.8 0 001.7-1.3L21 7H6.2" />
                  <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
                  <circle cx="17.5" cy="19.5" r="1.4" fill="currentColor" />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="-ml-0.5 px-1.5 py-0.2 text-[10px] font-semibold bg-[#0B465F] text-white rounded-full leading-tight">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigateTo(isLoggedIn ? "profile" : "login")}
                className={`flex items-center gap-2 text-[13.5px] hover:text-[#0B465F] transition-colors ${
                  currentView === "profile" ? "text-[#0B465F] font-medium" : "text-[#111111]"
                }`}
                title={isLoggedIn ? "Your profile" : "Log in / Sign up"}
                aria-label={isLoggedIn ? `Account: ${profile.name}` : "Account: log in or sign up"}
              >
                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20c1.6-3.6 4.3-5.5 7.5-5.5s5.9 1.9 7.5 5.5" />
                </svg>
                <span className="hidden sm:inline max-w-[110px] truncate">
                  {isLoggedIn ? profile.name.split(" ")[0] : "Log in"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
