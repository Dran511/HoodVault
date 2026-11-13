import { formatPeso } from "../utils/format";
import { useStore } from "../store/StoreContext";

export default function CheckoutPage() {
  const {
    cart,
    shipping,
    setShipping,
    shippingErrors,
    paymentMethod,
    setPaymentMethod,
    getProductById,
    cartSubtotal,
    cartItemCount,
    handleInitiatePayment
  } = useStore();

  return (
    <div>
      <h1 className="text-[28px] font-semibold text-[#111111]">
        Checkout
      </h1>

      <div className="flex items-center gap-8 sm:gap-36 text-[13px] mt-3 mb-6">
        <span className="font-medium text-[#0B465F]">
          1 &nbsp;Shipping &amp; payment
        </span>
        <button
          type="button"
          onClick={handleInitiatePayment}
          className="text-[#6E6E6E] hover:text-[#111111]"
        >
          2 &nbsp;Confirmation
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-10">
        <div className="w-full lg:flex-1 flex flex-col gap-5">
          {/* shipping address */}
          <div className="bg-[#F8F8F8] rounded-[14px] p-6 sm:p-7">
            <h2 className="text-[18px] font-medium text-[#111111] mb-4">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11.5px] text-[#666666] mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={shipping.fullName}
                  onChange={e =>
                    setShipping({ ...shipping, fullName: e.target.value })
                  }
                  className={`w-full h-[42px] bg-white border ${
                    shippingErrors.fullName
                      ? "border-[#EB5757]"
                      : "border-[#DCDCDC]"
                  } rounded-[8px] px-3.5 text-[13.5px] text-[#111111] focus:outline-none focus:border-[#0B465F]`}
                />
              </div>
              <div>
                <label className="block text-[11.5px] text-[#666666] mb-1.5">
                  Mobile number
                </label>
                <input
                  type="text"
                  value={shipping.mobile}
                  onChange={e =>
                    setShipping({ ...shipping, mobile: e.target.value })
                  }
                  className={`w-full h-[42px] bg-white border ${
                    shippingErrors.mobile
                      ? "border-[#EB5757]"
                      : "border-[#DCDCDC]"
                  } rounded-[8px] px-3.5 text-[13.5px] text-[#111111] focus:outline-none focus:border-[#0B465F]`}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[11.5px] text-[#666666] mb-1.5">
                Street address
              </label>
              <input
                type="text"
                value={shipping.street}
                onChange={e =>
                  setShipping({ ...shipping, street: e.target.value })
                }
                className={`w-full h-[42px] bg-white border ${
                  shippingErrors.street
                    ? "border-[#EB5757]"
                    : "border-[#DCDCDC]"
                } rounded-[8px] px-3.5 text-[13.5px] text-[#111111] focus:outline-none focus:border-[#0B465F]`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11.5px] text-[#666666] mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={shipping.city}
                  onChange={e =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  className={`w-full h-[42px] bg-white border ${
                    shippingErrors.city
                      ? "border-[#EB5757]"
                      : "border-[#DCDCDC]"
                  } rounded-[8px] px-3.5 text-[13.5px] text-[#111111] focus:outline-none focus:border-[#0B465F]`}
                />
              </div>
              <div>
                <label className="block text-[11.5px] text-[#666666] mb-1.5">
                  Postal code
                </label>
                <input
                  type="text"
                  value={shipping.postalCode}
                  onChange={e =>
                    setShipping({
                      ...shipping,
                      postalCode: e.target.value
                    })
                  }
                  className={`w-full h-[42px] bg-white border ${
                    shippingErrors.postalCode
                      ? "border-[#EB5757]"
                      : "border-[#DCDCDC]"
                  } rounded-[8px] px-3.5 text-[13.5px] text-[#111111] focus:outline-none focus:border-[#0B465F]`}
                />
              </div>
            </div>
          </div>

          {/* payment */}
          <div className="bg-[#F8F8F8] rounded-[14px] p-6 sm:p-7">
            <h2 className="text-[18px] font-medium text-[#111111] mb-4">
              Payment Method
            </h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("GCash")}
                className={`w-full h-[46px] px-4 rounded-[8px] flex items-center justify-between text-left transition-all ${
                  paymentMethod === "GCash"
                    ? "bg-[#E6EEF2] border border-[#3A6B80]"
                    : "bg-[#FBFBFB] border border-[#D8D8D8] hover:border-[#999999]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      paymentMethod === "GCash"
                        ? "bg-[#0B465F]"
                        : "border border-[#999999] bg-white"
                    }`}
                  >
                    {paymentMethod === "GCash" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-[13.5px] font-medium text-[#111111]">
                    GCash
                  </span>
                </div>
                <span className="text-[12px] text-[#666666]">
                  Pay securely
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Cash on delivery")}
                className={`w-full h-[46px] px-4 rounded-[8px] flex items-center justify-between text-left transition-all ${
                  paymentMethod === "Cash on delivery"
                    ? "bg-[#E6EEF2] border border-[#3A6B80]"
                    : "bg-[#FBFBFB] border border-[#D8D8D8] hover:border-[#999999]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      paymentMethod === "Cash on delivery"
                        ? "bg-[#0B465F]"
                        : "border border-[#999999] bg-white"
                    }`}
                  >
                    {paymentMethod === "Cash on delivery" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-[13.5px] font-medium text-[#111111]">
                    Cash on delivery
                  </span>
                </div>
                <span className="text-[12px] text-[#666666]">
                  Pay on arrival
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="w-full lg:w-[350px] bg-[#F8F8F8] rounded-[14px] p-6 sm:p-7 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-medium text-[#111111]">
              Order Summary
            </h2>
            <span className="text-[12px] text-[#666666]">
              {cartItemCount} items
            </span>
          </div>

          <div className="flex flex-col gap-1.5 mb-5">
            {cart.map(item => {
              const p = getProductById(item.id);
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-[42px] h-[42px] object-contain"
                    />
                    <span className="text-[13px] text-[#111111]">
                      {p.name}
                    </span>
                  </div>
                  <span className="text-[12.5px] text-[#666666]">
                    × {item.qty}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#222222] mb-2.5">
            <span>Subtotal</span>
            <span className="font-medium">{formatPeso(cartSubtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#222222] pb-4 border-b border-[#D8D8D8]">
            <span>Shipping</span>
            <span className="font-medium">₱ 0.00</span>
          </div>

          <div className="flex items-center justify-between pt-4 mb-5">
            <span className="text-[15.5px] font-medium text-[#111111]">
              Total
            </span>
            <span className="text-[20px] font-semibold text-[#111111]">
              {formatPeso(cartSubtotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleInitiatePayment}
            className="w-full h-[44px] rounded-[8px] bg-[#0B465F] hover:bg-[#083548] text-white text-[13px] font-medium transition-colors shadow-sm"
          >
            {paymentMethod === "GCash"
              ? `Pay ${formatPeso(cartSubtotal)} with GCash`
              : `Pay ${formatPeso(cartSubtotal)} with Cash on delivery`}
          </button>
        </div>
      </div>
    </div>
  );
}
