import { isValidEmail } from "../utils/auth";
import { useStore } from "../store/StoreContext";

export default function ForgotPasswordModal() {
  const {
    forgotPwModalOpen,
    setForgotPwModalOpen,
    forgotEmailInput,
    setForgotEmailInput,
    pushToast
  } = useStore();

  if (!forgotPwModalOpen) return null;

  return (
    <div
      onClick={() => setForgotPwModalOpen(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          const email = forgotEmailInput.trim().toLowerCase();
          if (!isValidEmail(email)) {
            pushToast("Please enter a valid email address.");
            return;
          }
          setForgotPwModalOpen(false);
          pushToast(
            "Password reset emails aren't available yet. Please contact support@hoodvault.ph."
          );
        }}
        onClick={e => e.stopPropagation()}
        className="bg-[#F8F8F8] border border-[#DCDCDC] rounded-2xl max-w-sm w-full p-6 shadow-2xl"
      >
        <h3 className="text-[17px] font-semibold text-[#111111] mb-1.5">
          Reset Password
        </h3>
        <p className="text-[12.5px] text-[#666666] mb-4">
          Enter the email you signed up with and we&apos;ll help you get back into your account.
        </p>
        <input
          type="email"
          required
          value={forgotEmailInput}
          onChange={e => setForgotEmailInput(e.target.value)}
          placeholder="Enter your email"
          className="w-full h-[42px] bg-white border border-[#DCDCDC] rounded-[8px] px-3.5 text-[13px] text-[#111111] mb-4 focus:outline-none focus:border-[#0B465F]"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setForgotPwModalOpen(false)}
            className="px-4 py-2 rounded-lg border border-[#CCCCCC] text-[12.5px] text-[#333333]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#0B465F] text-white text-[12.5px] font-medium"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
}
