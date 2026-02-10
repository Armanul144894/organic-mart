"use client";
import { useState, useRef, useEffect } from "react";
import {
  X, Phone, ChevronRight, ShieldCheck,
  ArrowLeft, Loader2, CheckCircle2, Smartphone
} from "lucide-react";

// ─── OTP Input ───────────────────────────────────────────────────────────────
function OtpInput({ value, onChange, disabled }) {
  const inputs = useRef([]);
  const digits = value.split("");

  const handleKey = (e, idx) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      if (digits[idx]) { next[idx] = ""; onChange(next.join("")); }
      else if (idx > 0) { next[idx - 1] = ""; onChange(next.join("")); inputs.current[idx - 1]?.focus(); }
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = [...digits];
    next[idx] = e.key;
    onChange(next.join(""));
    if (idx < 5) inputs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) { onChange(pasted.padEnd(6, "").slice(0, 6)); inputs.current[Math.min(pasted.length, 5)]?.focus(); }
    e.preventDefault();
  };

  return (
    <div className="flex gap-3 justify-center">
      {[0,1,2,3,4,5].map(i => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text" inputMode="numeric" maxLength={1}
          value={digits[i] || ""}
          disabled={disabled}
          onKeyDown={e => handleKey(e, i)}
          onPaste={handlePaste}
          onChange={() => {}}
          onFocus={e => e.target.select()}
          className={`w-11 h-14 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all
            ${digits[i] ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-gray-50 text-gray-800"}
            focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]
            disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      ))}
    </div>
  );
}

// ─── MAIN MODAL ───────────────────────────────────────────────────────────────
export default function SignInModal({ signInOpen, onClose, onSuccess }) {
  const [step, setStep] = useState("phone"); // phone | otp | success
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!signInOpen) { setStep("phone"); setPhone(""); setOtp(""); setError(""); }
  }, [signInOpen]);

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setTimeout(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [resendTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 11) { setError("Please enter a valid 11-digit mobile number"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep("otp");
    setResendTimer(30);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length < 6) { setError("Please enter the complete 6-digit OTP"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    // Simulate: 1234 = wrong, anything else = correct
    if (otp === "111111") { setError("Invalid OTP. Please try again."); return; }
    setStep("success");
    setTimeout(() => { onSuccess?.({ phone }); onClose?.(); }, 2000);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(""); setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setResendTimer(30);
  };

  if (!signInOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Decorative top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X size={18} className="text-gray-600" />
        </button>

        {/* ── PHONE STEP ─────────────────────────────── */}
        {step === "phone" && (
          <div className="p-8">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
              <Smartphone size={28} className="text-white" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Welcome Back! 👋</h2>
            <p className="text-gray-500 text-sm mb-8">Enter your mobile number to sign in or create an account</p>

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-3 flex-shrink-0">
                    <span className="text-lg">🇧🇩</span>
                    <span className="text-sm font-bold text-gray-700">+880</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setError(""); }}
                    placeholder="01XXX XXX XXX"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium text-base outline-none focus:border-emerald-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] transition-all placeholder:text-gray-400"
                    maxLength={11}
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <X size={12} /> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Get OTP <ChevronRight size={20} /></>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              By signing in, you agree to our{" "}
              <a href="#" className="text-emerald-600 font-semibold hover:underline">Terms</a> &{" "}
              <a href="#" className="text-emerald-600 font-semibold hover:underline">Privacy Policy</a>
            </p>
          </div>
        )}

        {/* ── OTP STEP ───────────────────────────────── */}
        {step === "otp" && (
          <div className="p-8">
            <button
              onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-200">
              <ShieldCheck size={28} className="text-white" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Check your phone</h2>
            <p className="text-gray-500 text-sm mb-2">
              We sent a 6-digit OTP to
            </p>
            <p className="text-emerald-600 font-bold text-base mb-8">+880 {phone}</p>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <OtpInput value={otp} onChange={setOtp} disabled={loading} />
                {error && (
                  <p className="text-red-500 text-xs mt-3 font-medium flex items-center justify-center gap-1">
                    <X size={12} /> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Verify & Continue <ChevronRight size={20} /></>}
              </button>
            </form>

            <div className="text-center mt-6">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend OTP in <span className="font-bold text-emerald-600">{resendTimer}s</span>
                </p>
              ) : (
                <button onClick={handleResend} className="text-sm text-emerald-600 font-bold hover:underline">
                  Didn't receive? Resend OTP
                </button>
              )}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 text-center font-medium">
              💡 Demo: Enter any 6-digit code (except 111111) to sign in
            </div>
          </div>
        )}

        {/* ── SUCCESS STEP ───────────────────────────── */}
        {step === "success" && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200" style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">You're in! 🎉</h2>
            <p className="text-gray-500">Signed in successfully. Redirecting you now...</p>
            <div className="mt-6 w-12 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ animation: "progress 2s linear forwards" }} />
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes popIn { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes progress { from { width: 0% } to { width: 100% } }
      `}</style>
    </div>
  );
}