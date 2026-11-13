import { formatPeso } from "../utils/format";
import HeartButton from "../components/HeartButton";
import { useStore } from "../store/StoreContext";

export default function ProductModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    selectedSize,
    setSelectedSize,
    navigateTo,
    addToCart
  } = useStore();

  if (!selectedProduct) return null;

  return (
    <div
      onClick={() => setSelectedProduct(null)}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#F8F8F8] border border-[#DCDCDC] rounded-2xl max-w-[680px] w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-center"
      >
        <div className="bg-white rounded-xl p-6 flex items-center justify-center h-[260px] relative">
          <HeartButton
            productId={selectedProduct.id}
            className="absolute top-3 right-3"
          />
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="max-h-[225px] w-auto object-contain"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B465F] bg-[#DCE7EC] px-2.5 py-0.5 rounded-full">
              {selectedProduct.category}
            </span>
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="text-gray-400 hover:text-gray-700 text-sm"
            >
              ✕
            </button>
          </div>

          <h3 className="text-[22px] font-semibold text-[#111111] mt-2.5">
            {selectedProduct.name}
          </h3>
          <p className="text-[18px] font-semibold text-[#0B465F] mt-1">
            {formatPeso(selectedProduct.price)}
          </p>

          <p className="text-[12.5px] text-[#555555] mt-3 leading-relaxed">
            {selectedProduct.description}
          </p>

          <div className="mt-3 text-[11.5px] text-[#666666] space-y-0.5">
            <div>• {selectedProduct.fabric}</div>
            <div>• {selectedProduct.fit}</div>
          </div>

          {/* sizes */}
          <div className="mt-4">
            <label className="block text-[11.5px] font-medium text-[#222222] mb-1.5">
              Select Size
            </label>
            <div className="flex items-center gap-2">
              {["S", "M", "L", "XL", "XXL"].map(sz => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`w-9 h-9 rounded-lg text-[12px] font-medium border transition-colors ${
                    selectedSize === sz
                      ? "bg-[#0B465F] text-white border-[#0B465F]"
                      : "bg-white text-[#222222] border-[#D8D8D8] hover:border-[#0B465F]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                addToCart(selectedProduct.id, selectedSize, 1);
                setSelectedProduct(null);
              }}
              className="flex-1 h-[42px] rounded-[8px] bg-[#0B465F] hover:bg-[#083548] text-white text-[13px] font-medium transition-colors"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(selectedProduct.id, selectedSize, 1);
                setSelectedProduct(null);
                navigateTo("checkout");
              }}
              className="px-4 h-[42px] rounded-[8px] border border-[#0B465F] text-[#0B465F] hover:bg-[#DCE7EC]/50 text-[13px] font-medium transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
