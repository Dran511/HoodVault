import { formatPeso } from "../utils/format";
import { useStore } from "../store/StoreContext";

export default function ConfirmationPage() {
  const { setOrdersModalOpen, navigateTo, latestOrder } = useStore();

  return (
    <div>
      <h1 className="text-[28px] font-semibold text-[#111111]">
        Order Confirmation
      </h1>

      <div className="flex items-center gap-20 sm:gap-36 text-[13px] mt-3 mb-7">
        <button
          type="button"
          onClick={() => navigateTo("checkout")}
          className="text-[#6E6E6E] hover:text-[#111111]"
        >
          1 &nbsp;Shipping &amp; payment
        </button>
        <span className="font-medium text-[#0B465F]">
          2 &nbsp;Confirmation
        </span>
      </div>

      <div className="flex flex-col items-center text-center my-6">
        <div className="w-[54px] h-[54px] rounded-full bg-[#0B465F] text-white flex items-center justify-center shadow-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-[25px] font-semibold text-[#111111] mt-4">
          {latestOrder.paymentMethod === "GCash" ? "Payment successful" : "Order placed"}
        </h2>
        <p className="text-[14px] text-[#666666] mt-1">
          {latestOrder.paymentMethod === "GCash"
            ? "Your order is confirmed."
            : "Your order is confirmed. Please prepare the exact amount on delivery."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-8">
        <div className="bg-[#F8F8F8] rounded-[14px] p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-medium text-[#111111]">
              Order Details
            </h3>
            <span className="text-[13px] font-medium text-[#0B465F]">
              {latestOrder.orderNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-[13.5px] mt-5">
            <span className="text-[#111111]">
              {latestOrder.itemCount} {latestOrder.itemCount === 1 ? "item" : "items"} · {latestOrder.paymentMethod}
            </span>
            <span className="font-medium text-[#0B465F]">
              {latestOrder.status}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3.5">
            <span className="text-[13.5px] text-[#111111]">
              {latestOrder.paymentMethod === "GCash" ? "Amount paid" : "Amount due on delivery"}
            </span>
            <span className="text-[24px] font-semibold text-[#111111]">
              {formatPeso(latestOrder.amountPaid)}
            </span>
          </div>

          <p className="text-[12px] text-[#666666] mt-4">
            Shipping included · ₱ 0.00
          </p>
        </div>

        <div className="bg-[#F8F8F8] rounded-[14px] p-6 sm:p-7">
          <h3 className="text-[18px] font-medium text-[#111111]">
            Shipping Address
          </h3>

          <p className="text-[13.5px] font-medium text-[#111111] mt-5">
            {latestOrder.shipping.fullName} &nbsp;·&nbsp;{" "}
            {latestOrder.shipping.mobile}
          </p>

          <p className="text-[13.5px] text-[#666666] mt-3 leading-relaxed">
            {latestOrder.shipping.street}
            <br />
            {latestOrder.shipping.city}, {latestOrder.shipping.postalCode}
          </p>
        </div>
      </div>

      <div className="text-center mt-10 mb-4">
        <h4 className="text-[15px] font-semibold text-[#111111]">
          What happens next?
        </h4>
        <p className="text-[13px] text-[#666666] mt-2 leading-relaxed">
          We&apos;ll prepare your {latestOrder.itemCount} items for
          shipment.
          <br />
          You can check delivery updates in My Orders.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-6">
          <button
            type="button"
            onClick={() => setOrdersModalOpen(true)}
            className="w-full sm:w-[215px] h-[44px] rounded-[8px] bg-[#0B465F] hover:bg-[#083548] text-white text-[13.5px] font-medium transition-colors"
          >
            View My Orders
          </button>
          <button
            type="button"
            onClick={() => navigateTo("home")}
            className="w-full sm:w-[215px] h-[44px] rounded-[8px] border border-[#3A6B80] text-[#0B465F] hover:bg-[#DCE7EC]/50 text-[13.5px] font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
