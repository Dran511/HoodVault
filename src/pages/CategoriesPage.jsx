import { images } from "../data/products";
import { useStore } from "../store/StoreContext";

export default function CategoriesPage() {
  const { navigateTo } = useStore();

  return (
    <div>
      <h1 className="text-[28px] font-semibold text-[#111111] mb-6">
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: "Limited Edition",
            subtitle: "Exclusive drops",
            image: images.limited,
            filter: "Hoodies"
          },
          {
            title: "Graphic",
            subtitle: "Make a statement",
            image: images.graphic,
            filter: "Graphic"
          },
          {
            title: "Oversize",
            subtitle: "Relaxed fit. bigger vibe",
            image: images.oversize,
            filter: "Oversize"
          },
          {
            title: "Zip-Up",
            subtitle: "Versatile & Stylish",
            image: images.zipup,
            filter: "Zip-Up"
          }
        ].map(cat => (
          <div
            key={cat.title}
            onClick={() =>
              navigateTo("catalog", { catalogCategory: cat.filter })
            }
            className="hv-card p-5 pt-6 pb-6 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-full h-[230px] flex items-center justify-center overflow-hidden mb-5">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="max-h-[218px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <h2 className="text-[20px] font-semibold text-[#111111] mt-1">
                {cat.title}
              </h2>
              <p className="text-[13px] text-[#555555] mt-1.5">
                {cat.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between mt-7 pt-1">
              <span className="text-[13px] font-medium text-[#0B465F] group-hover:underline">
                Explore category
              </span>
              <svg
                className="w-4 h-4 text-[#111111] transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
