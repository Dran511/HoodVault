import { formatBirthday } from "../utils/format";
import { useStore } from "../store/StoreContext";

export default function ProfilePage() {
  const {
    profile,
    orders,
    setOrdersModalOpen,
    navigateTo,
    handleLogout,
    openProfileEditor
  } = useStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-[28px] font-semibold text-[#111111]">
          Profile Settings
        </h1>
        <button
          type="button"
          onClick={() => openProfileEditor("name", "Name", profile.name)}
          aria-label="Edit Profile Settings"
          className="p-1.5 mr-1 text-[#111111] hover:text-[#0B465F] transition-colors rounded-lg hover:bg-black/5"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-11">
        {/* sidebar */}
        <div className="w-full md:w-[238px] bg-[#F8F8F8] rounded-[14px] p-6 shrink-0">
          <div className="w-[56px] h-[56px] rounded-full bg-[#CFCFCF] flex items-center justify-center text-[#000000]">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="8" r="4.2" />
              <path d="M4.5 20c0-3.8 3.4-6.2 7.5-6.2s7.5 2.4 7.5 6.2H4.5z" />
            </svg>
          </div>

          <h2 className="text-[19px] font-medium text-[#111111] mt-4">
            {profile.name}
          </h2>
          <p className="text-[12px] text-[#777777] mt-1 break-all">
            {profile.email}
          </p>

          <hr className="border-[#DFDFDF] my-5" />

          <div className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#DCE7EC] text-[#0B465F] text-[13px] font-medium">
            Profile Settings
          </div>

          <button
            type="button"
            onClick={() => setOrdersModalOpen(true)}
            className="w-full text-left px-3.5 py-2.5 mt-1 rounded-[8px] text-[#333333] hover:bg-black/5 text-[13px] font-medium transition-colors"
          >
            My Orders ({orders.length})
          </button>

          <div className="flex items-center justify-between text-[12px] text-[#555555] mt-6 pt-1">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => navigateTo("home")}
                className="hover:text-[#111111]"
              >
                Home
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => navigateTo("wishlist")}
                className="hover:text-[#111111]"
              >
                Wishlist
              </button>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-[#0B465F] font-medium hover:underline"
            >
              Log out
            </button>
          </div>
        </div>

        {/* personal info */}
        <div className="w-full md:flex-1 bg-[#F8F8F8] rounded-[14px] px-7 sm:px-9 py-7 sm:py-8">
          <h2 className="text-[19px] font-medium text-[#111111] mb-3">
            Personal Information
          </h2>

          <div>
            {[
              { key: "name", label: "Name", value: profile.name },
              { key: "bio", label: "Bio", value: profile.bio },
              { key: "gender", label: "Gender", value: profile.gender },
              { key: "birthday", label: "Birthday", value: formatBirthday(profile.birthday) },
              { key: "phone", label: "Phone", value: profile.phone },
              { key: "email", label: "Email", value: profile.email }
            ].map((row, index, arr) => {
              const isMuted = row.value === "Set Now";
              const isLast = index === arr.length - 1;
              return (
                <button
                  key={row.key}
                  type="button"
                  onClick={() =>
                    openProfileEditor(row.key, row.label, profile[row.key])
                  }
                  className={`w-full flex items-center justify-between py-5 ${
                    isLast ? "" : "border-b border-[#E0E0E0]"
                  } text-left group hover:bg-black/[0.015] px-1 rounded transition-colors`}
                >
                  <span className="text-[13.5px] text-[#111111]">
                    {row.label}
                  </span>
                  <div className="flex items-center gap-3 min-w-0 pl-4">
                    <span
                      className={`text-[13.5px] truncate ${
                        isMuted ? "text-[#7A7A7A]" : "text-[#222222]"
                      }`}
                    >
                      {row.value}
                    </span>
                    <svg
                      className="w-4 h-4 text-[#222222] transition-transform duration-150 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
