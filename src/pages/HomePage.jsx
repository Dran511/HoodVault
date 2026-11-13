import { HERO_SLIDES } from "../data/products";
import { formatPeso } from "../utils/format";
import HeartButton from "../components/HeartButton";
import { useStore } from "../store/StoreContext";

export default function HomePage() {
  const {
    heroSlide,
    setHeroSlide,
    recentlyViewedIds,
    setCollectionModalOpen,
    getProductById,
    navigateTo,
    openProductDetail,
    collectedCount
  } = useStore();

  return (
    <div>
      <h1 className="text-[26px] font-semibold text-[#111111] tracking-[-0.01em] mb-5">
        Stay Cozy, Stay You.
      </h1>

      {/* hero carousel */}
      {(() => {
        const slide = HERO_SLIDES[heroSlide] || HERO_SLIDES[0];
        return (
          <div
            style={{ background: slide.gradient }}
            className="relative rounded-[14px] min-h-[248px] px-6 sm:px-11 pt-7 pb-10 sm:py-8 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-sm transition-all duration-300"
          >
            <div className="z-10 w-full md:w-auto max-w-[410px] text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#1E1E1E]">
                {slide.tag}
              </p>
              <h2 className="text-[30px] sm:text-[38px] font-semibold text-[#0F0F0F] leading-[1.12] mt-3.5">
                {slide.title}
              </h2>
              <p className="text-[15px] text-[#222222] mt-2.5">
                {slide.subtitle}
              </p>
              <button
                type="button"
                onClick={() =>
                  navigateTo("catalog", {
                    catalogCategory: slide.targetCategory
                  })
                }
                className="mt-6 px-7 py-2.5 rounded-[8px] bg-[#0B465F] hover:bg-[#083548] text-white text-[13px] font-medium transition-colors shadow-sm"
              >
                {slide.cta}
              </button>
            </div>

            <div className="mt-6 md:mt-0 md:mr-2 w-full md:w-auto flex items-center justify-center z-10">
              <img
                src={slide.image}
                alt={slide.title}
                onClick={() =>
                  navigateTo("catalog", {
                    catalogCategory: slide.targetCategory
                  })
                }
                className={`${
                  slide.isTwin
                    ? "h-[205px] sm:h-[222px]"
                    : "h-[200px] sm:h-[214px]"
                } w-auto max-w-full object-contain select-none cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
              />
            </div>

            {/* slide dots */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setHeroSlide(idx)}
                  aria-label={`Hero slide ${idx + 1}`}
                  className={`w-[6.5px] h-[6.5px] rounded-full transition-all ${
                    idx === heroSlide
                      ? "bg-[#0B465F] scale-110"
                      : "bg-[#B2BFC6] hover:bg-[#7A919D]"
                  }`}
                />
              ))}
            </div>
          </div>
        );
      })()}

      {/* collection progress */}
      <div className="mt-6 rounded-[14px] bg-[#07435C] text-white px-6 sm:px-9 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-[360px]">
          <p className="text-[10px] uppercase tracking-[0.06em] text-white/80 font-medium">
            YOUR STYLE YOUR JOURNEY
          </p>
          <h2 className="text-[22px] font-medium text-white mt-1.5 leading-snug">
            Build Your Collection
          </h2>
          <p className="text-[12.5px] text-white/85 mt-2 leading-relaxed">
            Save your favorite styles. track your progress.
            <br className="hidden sm:inline" />
            and get closer to your next hoodie.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:flex-nowrap items-stretch sm:items-center gap-5 sm:gap-9 w-full md:w-auto justify-between md:justify-end self-end md:self-center">
          <button
            type="button"
            onClick={() => setCollectionModalOpen(true)}
            className="w-full sm:w-auto px-7 py-2.5 rounded-[8px] bg-white hover:bg-[#F0F4F6] text-[#0B465F] text-[12.5px] font-medium transition-colors shadow-sm sm:mt-6"
          >
            View Collection
          </button>

          <div className="w-full sm:w-auto sm:min-w-[175px]">
            <div className="text-[18px] font-semibold leading-tight">
              {collectedCount} / 10
            </div>
            <div className="text-[11.5px] text-white/85 mt-1">
              Hoodies Collected
            </div>
            <div className="w-full sm:w-[175px] h-[5px] bg-white/65 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, collectedCount * 10)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* recently viewed */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-semibold text-[#111111]">
            Recently Viewed
          </h2>
          <button
            type="button"
            onClick={() =>
              navigateTo("catalog", { catalogCategory: "Hoodies" })
            }
            className="text-[12.5px] text-[#555555] hover:text-[#0B465F] transition-colors pr-2"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentlyViewedIds.map(id => {
            const p = getProductById(id);
            return (
              <div
                key={id}
                onClick={() => openProductDetail(p)}
                className="hv-card p-4 pb-5 relative cursor-pointer group"
              >
                <HeartButton
                  productId={p.id}
                  className="absolute top-3.5 right-3.5"
                />
                <div className="w-full h-[188px] flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-[178px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-0.5">
                  <h3 className="text-[14.5px] font-medium text-[#111111] leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-[12.5px] font-semibold text-[#111111] mt-1">
                    {formatPeso(p.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
