import { useStore } from "./store/StoreContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Toasts from "./components/Toasts";

import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CatalogPage from "./pages/CatalogPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import ProductModal from "./modals/ProductModal";
import GcashModal from "./modals/GcashModal";
import ProfileEditModal from "./modals/ProfileEditModal";
import OrdersModal from "./modals/OrdersModal";
import CollectionModal from "./modals/CollectionModal";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";

const PAGES = {
  home: HomePage,
  categories: CategoriesPage,
  catalog: CatalogPage,
  search: SearchPage,
  wishlist: WishlistPage,
  cart: CartPage,
  checkout: CheckoutPage,
  confirmation: ConfirmationPage,
  profile: ProfilePage,
  login: LoginPage,
  signup: SignupPage
};

export default function App() {
  const { currentView } = useStore();
  const Page = PAGES[currentView] || HomePage;

  return (
    <div className="min-h-screen bg-[#EFEFEF] text-[#111111] flex flex-col font-sans antialiased selection:bg-[#0B465F] selection:text-white">
      <Header />

      <main className="flex-1 w-full px-4 sm:px-8 pt-6 pb-16">
        <div className="max-w-[1060px] mx-auto">
          <Page />
        </div>
      </main>

      <Footer />

      <ProductModal />
      <GcashModal />
      <ProfileEditModal />
      <OrdersModal />
      <CollectionModal />
      <ForgotPasswordModal />

      <Toasts />
    </div>
  );
}
