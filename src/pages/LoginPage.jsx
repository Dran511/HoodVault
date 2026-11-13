import AuthShowcase from "../components/AuthShowcase";
import EyeIcon from "../components/EyeIcon";
import { useStore } from "../store/StoreContext";

export default function LoginPage() {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    showLoginPw,
    setShowLoginPw,
    loginError,
    setLoginError,
    setSignupError,
    authBusy,
    setForgotPwModalOpen,
    setForgotEmailInput,
    navigateTo,
    handleLoginSubmit,
    handleSocialLogin
  } = useStore();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-2 max-w-[960px] mx-auto">
      <AuthShowcase />

      <div className="w-full max-w-[380px] mx-auto lg:mx-0">
        <h1 className="text-[28px] font-semibold text-[#111111] tracking-[-0.01em]">
          Welcome Back
        </h1>
        <p className="text-[13.5px] text-[#666666] mt-1.5 mb-7">
          Log in to continue shopping.
        </p>

        {loginError && (
          <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-[#FDECEC] border border-[#F5BDBA] text-[12.5px] text-[#C93B3B]">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="block text-[12px] font-medium text-[#222222] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <svg
                className="w-4 h-4 text-[#555555] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
              </svg>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={loginEmail}
                onChange={e => {
                  setLoginEmail(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Enter your email"
                className="w-full h-[42px] pl-10 pr-4 bg-[#F7F7F7] focus:bg-white border border-[#D8D8D8] focus:border-[#0B465F] rounded-[8px] text-[13px] text-[#111111] placeholder-[#8E8E8E] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="block text-[12px] font-medium text-[#222222]">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmailInput(loginEmail);
                  setForgotPwModalOpen(true);
                }}
                className="text-[11.5px] text-[#0B465F] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <svg
                className="w-4 h-4 text-[#555555] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 018 0v4" />
              </svg>
              <input
                id="login-password"
                name="password"
                type={showLoginPw ? "text" : "password"}
                autoComplete="current-password"
                value={loginPassword}
                onChange={e => {
                  setLoginPassword(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Enter your password"
                className="w-full h-[42px] pl-10 pr-10 bg-[#F7F7F7] focus:bg-white border border-[#D8D8D8] focus:border-[#0B465F] rounded-[8px] text-[13px] text-[#111111] placeholder-[#8E8E8E] focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowLoginPw(!showLoginPw)}
                aria-label={showLoginPw ? "Hide password" : "Show password"}
                aria-pressed={showLoginPw}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#111111] p-1"
              >
                <EyeIcon open={showLoginPw} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={authBusy}
            className="w-full h-[44px] mt-2 rounded-[8px] bg-[#0B465F] hover:bg-[#083548] disabled:opacity-60 text-white text-[13.5px] font-medium transition-colors shadow-sm"
          >
            {authBusy ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-[#DADADA] flex-1" />
          <span className="text-[11.5px] text-[#7A7A7A]">
            or continue with
          </span>
          <div className="h-px bg-[#DADADA] flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="h-[42px] px-4 rounded-[8px] bg-[#FBFBFB] hover:bg-white border border-[#DCDCDC] hover:border-[#BDBDBD] flex items-center justify-center gap-2.5 text-[13px] font-medium text-[#111111] transition-all"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.3-2 3l3.2 2.5c1.9-1.7 3-4.3 3-7.4 0-.7-.1-1.4-.2-2H12z" />
              <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6C4.8 19.8 8.1 22 12 22z" />
              <path fill="#FBBC05" d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H3.1C2.4 8.9 2 10.4 2 12s.4 3.1 1.1 4.5l3.3-2.6z" />
              <path fill="#4285F4" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C17 2.9 14.7 2 12 2 8.1 2 4.8 4.2 3.1 7.5l3.3 2.6c.8-2.3 3-4.2 5.6-4.2z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("Facebook")}
            className="h-[42px] px-4 rounded-[8px] bg-[#FBFBFB] hover:bg-white border border-[#DCDCDC] hover:border-[#BDBDBD] flex items-center justify-center gap-2.5 text-[13px] font-medium text-[#111111] transition-all"
          >
            <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        <p className="text-center text-[12.5px] text-[#666666] mt-6">
          Don&apos;t have an account?
          <button
            type="button"
            onClick={() => {
              setSignupError("");
              navigateTo("signup");
            }}
            className="text-[#0B465F] font-medium hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
