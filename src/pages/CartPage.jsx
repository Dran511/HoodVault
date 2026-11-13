import { DEFAULT_CART } from "../data/products";
import { formatPeso } from "../utils/format";
import { useStore } from "../store/StoreContext";

export default function CartPage() {
  const {
    cart,
    setCart,
    pushToast,
    getProductById,
    navigateTo,
    openProductDetail,
    updateCartQuantity,
    updateCartSize,
    removeCartItem,
    cartSubtotal,
    cartItemCount
  } = useStore();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[28px] font-semibold text-[#111111] leading-tight">
          Cart
        </h1>
        <p className="text-[13px] text-[#666666] mt-1">
          {cartItemCount} items
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-11">
        <div className="w-full lg:flex-1">
          <div className="hidden sm:grid grid-cols-12 text-[12px] text-[#555555] pb-3 border-b border-[#D5D5D5]">
            <div className="col-span-6 sm:col-span-5">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2 sm:col-span-3 pl-2">Total</div>
          </div>

          {cart.length > 0 ? (
            cart.map(item => {
              const p = getProductById(item.id);
              const rowTotal = p.price * item.qty;
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="relative grid grid-cols-12 items-center py-4 border-b border-[#D5D5D5] gap-x-2 gap-y-3 sm:border-t-0 first:border-t sm:first:border-t-0"
                >
                  <div className="col-span-12 sm:col-span-5 flex items-center gap-4 pr-8 sm:pr-0">
                    <div
                      onClick={() => openProductDetail(p)}
                      className="w-[82px] h-[82px] rounded-[10px] bg-[#F8F8F8] flex items-center justify-center p-1.5 shrink-0 cursor-pointer"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-[72px] w-auto object-contain"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => openProductDetail(p)}
                        className="text-[14px] font-medium text-[#111111] hover:text-[#0B465F] text-left"
                      >
                        {p.name}
                      </button>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[11px] text-[#666666]">Size:</span>
                        <select
                          value={item.size}
                          onChange={e =>
                            updateCartSize(item.id, item.size, e.target.value)
                          }
                          aria-label={`Size for ${p.name}`}
                          className="text-[11px] font-medium bg-white border border-[#D8D8D8] rounded px-1.5 py-0.5 text-[#111111] focus:outline-none focus:border-[#0B465F]"
                        >
                          {["S", "M", "L", "XL", "XXL"].map(sz => (
                            <option key={sz} value={sz}>
                              {sz}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:hidden text-[12px] text-[#666666] mt-1.5">
                        {formatPeso(p.price)} each
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block col-span-2 text-[13.5px] font-medium text-[#111111]">
                    {formatPeso(p.price)}
                  </div>

                  <div className="col-span-6 sm:col-span-2 flex items-center">
                    <div className="border border-[#F3B9B6] bg-[#F6F1F1] rounded-[8px] h-[36px] w-[98px] inline-flex items-center justify-between px-2.5 select-none">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.id, item.size, -1)
                        }
                        className="text-[14px] text-[#222222] hover:text-[#0B465F] px-1 font-medium"
                      >
                        −
                      </button>
                      <span className="text-[13px] font-medium text-[#111111]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.id, item.size, 1)
                        }
                        className="text-[14px] text-[#222222] hover:text-[#0B465F] px-1 font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex items-center justify-end sm:justify-between pl-2 pr-1">
                    <span className="text-[14px] sm:text-[13.5px] font-semibold sm:font-medium text-[#111111]">
                      {formatPeso(rowTotal)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCartItem(item.id, item.size)}
                      aria-label={`Remove ${p.name}`}
                      className="absolute top-3 right-0 sm:static text-[#222222] hover:text-[#EB5757] p-1 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6l12 12M6 18L18 6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center border-b border-[#D5D5D5]">
              <p className="text-[15px] text-[#444444]">Your cart is empty.</p>
              <button
                type="button"
                onClick={() => {
                  setCart(DEFAULT_CART);
                  pushToast("Restored 4 hoodies to Cart");
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-[#0B465F] text-white text-[12.5px] font-medium"
              >
                Restore Default 4 Hoodies
              </button>
            </div>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigateTo("catalog")}
              className="text-[13px] font-medium text-[#0B465F] hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* summary */}
        <div className="w-full lg:w-[305px] bg-[#F8F8F8] rounded-[14px] p-6 sm:p-7 shrink-0">
          <h2 className="text-[18px] font-medium text-[#111111] mb-5">
            Order Summary
          </h2>

          <div className="flex items-center justify-between text-[13px] text-[#222222] mb-3.5">
            <span>Subtotal</span>
            <span className="font-medium">{formatPeso(cartSubtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#222222] pb-4 border-b border-[#D8D8D8]">
            <span>Shipping</span>
            <span className="font-medium">₱ 0.00</span>
          </div>

          <div className="flex items-center justify-between pt-4 mb-6">
            <span className="text-[15.5px] font-medium text-[#111111]">
              Total
            </span>
            <span className="text-[20px] font-semibold text-[#111111]">
              {formatPeso(cartSubtotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigateTo("checkout")}
            className="w-full h-[44px] rounded-[8px] bg-[#0B465F] hover:bg-[#083548] text-white text-[13.5px] font-medium transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
