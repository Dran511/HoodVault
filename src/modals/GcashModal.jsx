import { formatPeso } from "../utils/format";
import { useStore } from "../store/StoreContext";

export default function GcashModal() {
  const {
    shipping,
    gcashModalOpen,
    setGcashModalOpen,
    isProcessingPayment,
    cartSubtotal,
    finalizeOrder
  } = useStore();

  if (!gcashModalOpen) return null;

  return (
    <div
      onClick={() => !isProcessingPayment && setGcashModalOpen(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E0E0E0]"
      >
        <div className="bg-[#0B465F] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/80">
              Secure Express Checkout
            </p>
            <h3 className="text-[17px] font-semibold">GCash Payment</h3>
          </div>
          <button
            type="button"
            onClick={() => !isProcessingPayment && setGcashModalOpen(false)}
            className="text-white/80 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="bg-[#F8F8F8] rounded-xl p-4 mb-5 border border-[#EAEAEA]">
            <div className="flex justify-between text-[12.5px] text-[#666666] mb-1.5">
              <span>Merchant</span>
              <span className="font-medium text-[#111111]">HoodVault PH</span>
            </div>
            <div className="flex justify-between text-[12.5px] text-[#666666] mb-1.5">
              <span>GCash Number</span>
              <span className="font-medium text-[#111111]">
                {shipping.mobile}
              </span>
            </div>
            <div className="flex justify-between text-[14px] font-semibold text-[#0B465F] pt-2 border-t border-[#E0E0E0] mt-2">
              <span>Total Amount</span>
              <span>{formatPeso(cartSubtotal)}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={isProcessingPayment}
            onClick={() => finalizeOrder("GCash", "Paid")}
            className="w-full h-[44px] rounded-[8px] bg-[#0B465F] hover:bg-[#083548] disabled:opacity-60 text-white text-[13.5px] font-medium transition-colors"
          >
            {isProcessingPayment
              ? "Authorizing GCash Payment..."
              : `Confirm & Pay ${formatPeso(cartSubtotal)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
