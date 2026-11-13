import { formatPeso } from "../utils/format";
import { useStore } from "../store/StoreContext";

export default function OrdersModal() {
  const { orders, ordersModalOpen, setOrdersModalOpen } = useStore();

  if (!ordersModalOpen) return null;

  return (
    <div
      onClick={() => setOrdersModalOpen(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#F8F8F8] border border-[#DCDCDC] rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[82vh] flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-semibold text-[#111111]">
            My Orders ({orders.length})
          </h3>
          <button
            type="button"
            onClick={() => setOrdersModalOpen(false)}
            className="text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {orders.map(ord => (
            <div
              key={ord.orderNumber}
              className="p-4 rounded-xl bg-white border border-[#E0E0E0]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13.5px] font-semibold text-[#0B465F]">
                  {ord.orderNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#DCE7EC] text-[#0B465F]">
                  {ord.status} · Preparing Shipment
                </span>
              </div>
              <p className="text-[13px] text-[#222222]">
                {ord.itemCount} items · {ord.paymentMethod} ·{" "}
                <strong>{formatPeso(ord.amountPaid)}</strong>
              </p>
              <p className="text-[12px] text-[#666666] mt-1">
                Delivering to {ord.shipping.fullName} ({ord.shipping.mobile}),{" "}
                {ord.shipping.street}, {ord.shipping.city}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={() => setOrdersModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-[#0B465F] text-white text-[13px] font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
