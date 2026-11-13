import authStudio from "../assets/images/auth-studio.jpg";

export default function AuthShowcase() {
  return (
    <div className="hidden lg:flex w-full lg:w-[445px] bg-[#E6E6E6] rounded-[14px] p-7 sm:p-9 flex-col justify-between shrink-0">
      <div>
        <h2 className="text-[26px] font-semibold text-[#111111] tracking-[-0.01em] leading-snug">
          Stay Cozy, Stay You.
        </h2>
        <p className="text-[13.5px] text-[#666666] mt-1.5">
          Timeless Styles. Everyday wear.
        </p>
      </div>
      <div className="mt-6 rounded-[10px] overflow-hidden shadow-sm bg-[#1A1918]">
        <img
          src={authStudio}
          alt="HoodVault Limited Edition Hoodie"
          className="w-full h-auto aspect-square object-cover block"
        />
      </div>
    </div>
  );
}
