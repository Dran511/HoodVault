import { useStore } from "../store/StoreContext";

export default function Toasts() {
  const { toasts } = useStore();

  return (
    <div className="fixed top-5 right-5 z-50 pointer-events-none flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className="px-4 py-2.5 rounded-lg bg-[#0B465F] text-white text-[12.5px] font-medium shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
