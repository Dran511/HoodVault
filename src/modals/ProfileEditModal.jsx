import { useStore } from "../store/StoreContext";

export default function ProfileEditModal() {
  const {
    editingProfileField,
    setEditingProfileField,
    editFieldValue,
    setEditFieldValue,
    editFieldError,
    setEditFieldError,
    saveProfileEdit
  } = useStore();

  if (!editingProfileField) return null;

  return (
    <div
      onClick={() => setEditingProfileField(null)}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    >
      <form
        onSubmit={saveProfileEdit}
        noValidate
        onClick={e => e.stopPropagation()}
        className="bg-[#F8F8F8] border border-[#DCDCDC] rounded-2xl max-w-md w-full p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-semibold text-[#111111]">
            Update {editingProfileField.label}
          </h3>
          <button
            type="button"
            onClick={() => setEditingProfileField(null)}
            className="text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <label className="block text-[12px] text-[#555555] mb-1.5">
          {editingProfileField.label}
        </label>

        {editingProfileField.key === "gender" ? (
          <select
            value={editFieldValue || "Male"}
            onChange={e => setEditFieldValue(e.target.value)}
            className="w-full h-[42px] bg-white border border-[#DCDCDC] rounded-[8px] px-3.5 text-[13.5px] text-[#111111] mb-5 focus:outline-none focus:border-[#0B465F]"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        ) : editingProfileField.key === "birthday" ? (
          <input
            type="date"
            value={editFieldValue}
            onChange={e => setEditFieldValue(e.target.value)}
            className="w-full h-[42px] bg-white border border-[#DCDCDC] rounded-[8px] px-3.5 text-[13.5px] text-[#111111] mb-5 focus:outline-none focus:border-[#0B465F]"
          />
        ) : (
          <input
            type={
              editingProfileField.key === "email"
                ? "email"
                : editingProfileField.key === "phone"
                ? "tel"
                : "text"
            }
            autoFocus
            value={editFieldValue}
            onChange={e => {
              setEditFieldValue(e.target.value);
              if (editFieldError) setEditFieldError("");
            }}
            placeholder={`Enter ${editingProfileField.label.toLowerCase()}`}
            className="w-full h-[42px] bg-white border border-[#DCDCDC] rounded-[8px] px-3.5 text-[13.5px] text-[#111111] mb-5 focus:outline-none focus:border-[#0B465F]"
          />
        )}
        {editFieldError && (
          <p className="-mt-3 mb-4 text-[12px] text-[#C93B3B]">{editFieldError}</p>
        )}

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setEditingProfileField(null)}
            className="px-4 py-2 rounded-lg border border-[#CCCCCC] text-[13px] text-[#333333] hover:bg-black/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#0B465F] text-white text-[13px] font-medium hover:bg-[#083548]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
