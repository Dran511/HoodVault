import { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import { INITIAL_PRODUCTS, DEFAULT_CART, DEFAULT_WISHLIST, DEFAULT_RECENT } from "../data/products";
import { formatOrderDate } from "../utils/format";
import { loadSavedState, saveState } from "../utils/storage";
import { isValidEmail, randomSalt, hashPassword } from "../utils/auth";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // which page is showing + browsing filters
  const [currentView, setCurrentView] = useState("home");
  const [heroSlide, setHeroSlide] = useState(0);
  const [catalogCategory, setCatalogCategory] = useState("Hoodies");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  // saved between visits
  const [wishlistIds, setWishlistIds] = useState(() =>
    loadSavedState("wishlist", DEFAULT_WISHLIST)
  );
  const [cart, setCart] = useState(() =>
    loadSavedState("cart", DEFAULT_CART)
  );
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() =>
    loadSavedState("recent", DEFAULT_RECENT)
  );
  const [collectedIds, setCollectedIds] = useState(() =>
    loadSavedState("collected", ["classic-grey", "classic-black"])
  );

  // accounts — kept in localStorage until there is a real backend
  const [accounts, setAccounts] = useState(() => loadSavedState("accounts", []));
  const [currentUserEmail, setCurrentUserEmail] = useState(() =>
    loadSavedState("currentUser", null)
  );
  const [authRedirect, setAuthRedirect] = useState(null);
  const currentAccount = accounts.find(a => a.email === currentUserEmail) || null;
  const isLoggedIn = !!currentAccount;
  const profile = currentAccount
    ? {
        name: currentAccount.name,
        email: currentAccount.email,
        bio: currentAccount.bio || "Set Now",
        gender: currentAccount.gender || "Set Now",
        birthday: currentAccount.birthday || "Set Now",
        phone: currentAccount.phone || "Set Now"
      }
    : {
        name: "Guest",
        email: "",
        bio: "Set Now",
        gender: "Set Now",
        birthday: "Set Now",
        phone: "Set Now"
      };

  function updateCurrentAccount(fields) {
    setAccounts(prev =>
      prev.map(a => (a.email === currentUserEmail ? { ...a, ...fields } : a))
    );
  }

  // login / signup form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPw, setSignupConfirmPw] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [signupError, setSignupError] = useState("");

  // checkout + orders
  const [shipping, setShipping] = useState(() =>
    loadSavedState("shipping", {
      fullName: "Alex Reyes",
      mobile: "0917 123 4567",
      street: "24 Mabini Street, Brgy. Poblacion",
      city: "Makati City",
      postalCode: "1210"
    })
  );
  const [shippingErrors, setShippingErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [gcashModalOpen, setGcashModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [orders, setOrders] = useState(() =>
    loadSavedState("orders", [
      {
        orderNumber: "#HV-10248",
        date: "Nov 13, 2026",
        itemCount: 4,
        paymentMethod: "GCash",
        status: "Paid",
        deliveryStep: 1,
        amountPaid: 8377,
        shippingFee: 0,
        items: DEFAULT_CART,
        shipping: {
          fullName: "Alex Reyes",
          mobile: "0917 123 4567",
          street: "24 Mabini Street, Brgy. Poblacion",
          city: "Makati City",
          postalCode: "1210"
        }
      }
    ])
  );

  // modals and toasts
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("L");
  const [editingProfileField, setEditingProfileField] = useState(null);
  const [editFieldValue, setEditFieldValue] = useState("");
  const [editFieldError, setEditFieldError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [forgotPwModalOpen, setForgotPwModalOpen] = useState(false);
  const [forgotEmailInput, setForgotEmailInput] = useState("");
  const [toasts, setToasts] = useState([]);

  const mainSearchInputRef = useRef(null);

  // persist to localStorage whenever these change
  useEffect(() => {
    saveState("wishlist", wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    saveState("cart", cart);
  }, [cart]);

  useEffect(() => {
    saveState("recent", recentlyViewedIds);
  }, [recentlyViewedIds]);

  useEffect(() => {
    saveState("collected", collectedIds);
  }, [collectedIds]);

  useEffect(() => {
    saveState("accounts", accounts);
  }, [accounts]);

  useEffect(() => {
    saveState("currentUser", currentUserEmail);
  }, [currentUserEmail]);

  useEffect(() => {
    saveState("shipping", shipping);
  }, [shipping]);

  useEffect(() => {
    saveState("orders", orders);
  }, [orders]);

  function pushToast(message) {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2400);
  }

  function getProductById(id) {
    return INITIAL_PRODUCTS.find(p => p.id === id) || INITIAL_PRODUCTS[0];
  }

  function navigateTo(view, opts = {}) {
    // guests get sent to login first, then back to their profile
    if (view === "profile" && !isLoggedIn) {
      setAuthRedirect("profile");
      setLoginError("");
      pushToast("Please log in to view your profile");
      view = "login";
    } else if ((view === "login" || view === "signup") && isLoggedIn) {
      view = "profile";
    }
    if (opts.catalogCategory) {
      setCatalogCategory(opts.catalogCategory);
    }
    if (opts.searchCategory) {
      setSearchCategory(opts.searchCategory);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function recordRecentlyViewed(productId) {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 4);
    });
  }

  function openProductDetail(product, e) {
    if (e) e.stopPropagation();
    recordRecentlyViewed(product.id);
    setSelectedProduct(product);
    setSelectedSize("L");
  }

  function toggleWishlist(productId, e) {
    if (e) e.stopPropagation();
    const prod = getProductById(productId);
    if (wishlistIds.includes(productId)) {
      setWishlistIds(prev => prev.filter(id => id !== productId));
      pushToast(`Removed ${prod.name} from Wishlist`);
    } else {
      setWishlistIds(prev => (prev.includes(productId) ? prev : [...prev, productId]));
      pushToast(`Saved ${prod.name} to Wishlist`);
    }
  }

  function handleClearOrRestoreWishlist() {
    if (wishlistIds.length > 0) {
      setWishlistIds([]);
      pushToast("Cleared all saved items from Wishlist");
    } else {
      setWishlistIds(DEFAULT_WISHLIST);
      pushToast("Restored 4 saved items to Wishlist");
    }
  }

  function addToCart(productId, size = "L", qty = 1, e = null) {
    if (e) e.stopPropagation();
    const prod = getProductById(productId);
    recordRecentlyViewed(productId);
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === productId && item.size === size);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
        return updated;
      }
      return [...prev, { id: productId, size, qty }];
    });
    pushToast(`Added ${prod.name} (${size}) to Cart`);
  }

  function updateCartQuantity(id, size, delta) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter(item => item.qty > 0)
    );
  }

  function updateCartSize(id, oldSize, newSize) {
    setCart(prev => {
      const target = prev.find(i => i.id === id && i.size === oldSize);
      if (!target) return prev;
      const existingNew = prev.find(i => i.id === id && i.size === newSize);
      if (existingNew && oldSize !== newSize) {
        return prev
          .filter(i => !(i.id === id && i.size === oldSize))
          .map(i =>
            i.id === id && i.size === newSize
              ? { ...i, qty: i.qty + target.qty }
              : i
          );
      }
      return prev.map(i =>
        i.id === id && i.size === oldSize ? { ...i, size: newSize } : i
      );
    });
  }

  function removeCartItem(id, size) {
    const prod = getProductById(id);
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
    pushToast(`Removed ${prod.name} from Cart`);
  }

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const prod = getProductById(item.id);
      return sum + prod.price * item.qty;
    }, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const filteredCatalogProducts = useMemo(() => {
    const base = INITIAL_PRODUCTS.filter(p => p.inCatalog).sort(
      (a, b) => a.catalogOrder - b.catalogOrder
    );
    if (catalogCategory === "All" || catalogCategory === "Hoodies") {
      return base;
    }
    return INITIAL_PRODUCTS.filter(
      p => p.category.toLowerCase() === catalogCategory.toLowerCase()
    );
  }, [catalogCategory]);

  const filteredSearchProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q && searchCategory === "All") {
      return INITIAL_PRODUCTS.filter(p => p.inSearchDefault).sort(
        (a, b) => a.searchOrder - b.searchOrder
      );
    }
    const uniquePool = INITIAL_PRODUCTS.filter(
      p => p.inSearchDefault || p.inCatalog
    );
    return uniquePool.filter(p => {
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));
      const matchesCat =
        searchCategory === "All" ||
        searchCategory === "Hoodies" ||
        p.category.toLowerCase() === searchCategory.toLowerCase();
      return matchesQ && matchesCat;
    });
  }, [searchQuery, searchCategory]);

  function validateShipping() {
    const errs = {};
    if (!shipping.fullName.trim()) errs.fullName = "Full name is required";
    if (!shipping.mobile.trim()) errs.mobile = "Mobile number is required";
    if (!shipping.street.trim()) errs.street = "Street address is required";
    if (!shipping.city.trim()) errs.city = "City is required";
    if (!shipping.postalCode.trim()) errs.postalCode = "Postal code is required";
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleInitiatePayment() {
    if (cart.length === 0) {
      pushToast("Your cart is empty. Add a hoodie first!");
      return;
    }
    if (!validateShipping()) {
      pushToast("Please complete all shipping address fields.");
      return;
    }
    if (paymentMethod === "GCash") {
      setGcashModalOpen(true);
    } else {
      finalizeOrder("Cash on delivery", "Confirmed");
    }
  }

  function finalizeOrder(methodUsed, statusLabel) {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const highest = orders.reduce((max, o) => {
        const n = parseInt(String(o.orderNumber).replace(/\D/g, ""), 10);
        return Number.isFinite(n) ? Math.max(max, n) : max;
      }, 10247);
      const nextNum = `#HV-${highest + 1}`;

      const newOrder = {
        orderNumber: nextNum,
        date: formatOrderDate(),
        itemCount: cartItemCount,
        paymentMethod: methodUsed,
        status: statusLabel,
        deliveryStep: 1,
        amountPaid: cartSubtotal,
        shippingFee: 0,
        items: [...cart],
        shipping: { ...shipping }
      };

      setOrders(prev => [newOrder, ...prev]);
      setCart([]);

      // ordered hoodies count toward the collection progress bar
      const newlyOrderedIds = cart.map(c => c.id);
      setCollectedIds(prev => {
        const merged = Array.from(new Set([...prev, ...newlyOrderedIds]));
        return merged.slice(0, 10);
      });

      setIsProcessingPayment(false);
      setGcashModalOpen(false);
      navigateTo("confirmation");
      pushToast(`Order ${newOrder.orderNumber} confirmed!`);
    }, 550);
  }

  // auth
  function finishAuth(email) {
    setCurrentUserEmail(email);
    const target = authRedirect || "home";
    setAuthRedirect(null);
    // can't use navigateTo here — it still sees the logged-out state until the next render
    setCurrentView(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (authBusy) return;
    setLoginError("");
    const email = loginEmail.trim().toLowerCase();
    const pw = loginPassword;
    if (!isValidEmail(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }
    if (!pw) {
      setLoginError("Please enter your password.");
      return;
    }
    const account = accounts.find(a => a.email === email);
    if (!account) {
      setLoginError("No account found with that email. Sign up to create one.");
      return;
    }
    setAuthBusy(true);
    try {
      const hash = await hashPassword(pw, account.salt);
      if (hash !== account.passwordHash) {
        setLoginError("Incorrect password. Please try again.");
        return;
      }
      setLoginPassword("");
      setShowLoginPw(false);
      pushToast(`Welcome back, ${account.name.split(" ")[0]}!`);
      finishAuth(email);
    } catch {
      setLoginError("Something went wrong while logging in. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    if (authBusy) return;
    setSignupError("");
    const name = signupName.trim().replace(/\s+/g, " ");
    const email = signupEmail.trim().toLowerCase();
    const pw = signupPassword;
    const confirm = signupConfirmPw;

    if (name.length < 2) {
      setSignupError("Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      setSignupError("Please enter a valid email address.");
      return;
    }
    if (accounts.some(a => a.email === email)) {
      setSignupError("An account with this email already exists. Log in instead.");
      return;
    }
    if (pw.length < 8) {
      setSignupError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) {
      setSignupError("Password must include at least one letter and one number.");
      return;
    }
    if (!confirm) {
      setSignupError("Please confirm your password.");
      return;
    }
    if (pw !== confirm) {
      setSignupError("Passwords do not match.");
      return;
    }

    setAuthBusy(true);
    try {
      const salt = randomSalt();
      const passwordHash = await hashPassword(pw, salt);
      setAccounts(prev => [
        ...prev,
        { name, email, salt, passwordHash, createdAt: new Date().toISOString() }
      ]);
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirmPw("");
      setShowSignupPw(false);
      pushToast(`Account created! Welcome to HoodVault, ${name.split(" ")[0]}.`);
      finishAuth(email);
    } catch {
      setSignupError("Something went wrong while creating your account. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  }

  function handleSocialLogin(provider) {
    pushToast(`${provider} sign-in isn't available yet. Please use your email instead.`);
  }

  function handleLogout() {
    setCurrentUserEmail(null);
    setAuthRedirect(null);
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    pushToast("You've been logged out");
  }

  function openProfileEditor(fieldKey, label, currentVal) {
    setEditingProfileField({ key: fieldKey, label });
    setEditFieldError("");
    setEditFieldValue(currentVal === "Set Now" ? "" : currentVal);
  }

  function saveProfileEdit(e) {
    e.preventDefault();
    if (!editingProfileField) return;
    const key = editingProfileField.key;
    const val = editFieldValue.trim();

    if (key === "name" && val.length < 2) {
      setEditFieldError("Name can't be empty.");
      return;
    }
    if (key === "email") {
      const email = val.toLowerCase();
      if (!isValidEmail(email)) {
        setEditFieldError("Please enter a valid email address.");
        return;
      }
      if (email !== currentUserEmail && accounts.some(a => a.email === email)) {
        setEditFieldError("Another account already uses this email.");
        return;
      }
      updateCurrentAccount({ email });
      setCurrentUserEmail(email);
    } else if (key === "phone" && val && !/^[+\d][\d\s-]{6,}$/.test(val)) {
      setEditFieldError("Please enter a valid phone number.");
      return;
    } else {
      updateCurrentAccount({ [key]: key === "name" ? val.replace(/\s+/g, " ") : val });
    }
    setEditingProfileField(null);
    pushToast(`${editingProfileField.label} updated`);
  }

  const isAuthView = currentView === "login" || currentView === "signup";
  const latestOrder = orders[0];
  const collectedCount = Math.max(2, collectedIds.length);

  const value = {
    currentView,
    setCurrentView,
    heroSlide,
    setHeroSlide,
    catalogCategory,
    setCatalogCategory,
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    wishlistIds,
    setWishlistIds,
    cart,
    setCart,
    recentlyViewedIds,
    setRecentlyViewedIds,
    collectedIds,
    setCollectedIds,
    accounts,
    setAccounts,
    currentUserEmail,
    setCurrentUserEmail,
    authRedirect,
    setAuthRedirect,
    currentAccount,
    isLoggedIn,
    profile,
    updateCurrentAccount,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    showLoginPw,
    setShowLoginPw,
    loginError,
    setLoginError,
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirmPw,
    setSignupConfirmPw,
    showSignupPw,
    setShowSignupPw,
    signupError,
    setSignupError,
    shipping,
    setShipping,
    shippingErrors,
    setShippingErrors,
    paymentMethod,
    setPaymentMethod,
    gcashModalOpen,
    setGcashModalOpen,
    isProcessingPayment,
    setIsProcessingPayment,
    orders,
    setOrders,
    selectedProduct,
    setSelectedProduct,
    selectedSize,
    setSelectedSize,
    editingProfileField,
    setEditingProfileField,
    editFieldValue,
    setEditFieldValue,
    editFieldError,
    setEditFieldError,
    authBusy,
    setAuthBusy,
    ordersModalOpen,
    setOrdersModalOpen,
    collectionModalOpen,
    setCollectionModalOpen,
    forgotPwModalOpen,
    setForgotPwModalOpen,
    forgotEmailInput,
    setForgotEmailInput,
    toasts,
    setToasts,
    mainSearchInputRef,
    pushToast,
    getProductById,
    navigateTo,
    recordRecentlyViewed,
    openProductDetail,
    toggleWishlist,
    handleClearOrRestoreWishlist,
    addToCart,
    updateCartQuantity,
    updateCartSize,
    removeCartItem,
    cartSubtotal,
    cartItemCount,
    filteredCatalogProducts,
    filteredSearchProducts,
    validateShipping,
    handleInitiatePayment,
    finalizeOrder,
    finishAuth,
    handleLoginSubmit,
    handleSignupSubmit,
    handleSocialLogin,
    handleLogout,
    openProfileEditor,
    saveProfileEdit,
    isAuthView,
    latestOrder,
    collectedCount
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside <StoreProvider>");
  return store;
}
