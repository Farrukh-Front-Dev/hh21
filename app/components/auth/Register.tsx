"use client";
import { useState } from "react";
import { useRegisterMutation, useLoginMutation, useLazyGetMeQuery } from "../../store/api/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [triggerGetMe] = useLazyGetMeQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setError(null);
  setFieldErrors({});

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const regRes = await register({
        email,
        password,
        password_confirm: passwordConfirm,
        role,
      }).unwrap();

      // If backend returned tokens on register, auto-login. Otherwise show verify message and redirect to login.
      if (regRes && (regRes.access || regRes.refresh)) {
        try {
          // If register returned tokens, use them
          const access = regRes.access;
          const refresh = regRes.refresh ?? "";
          dispatch(setCredentials({ access, refresh, user: null }));

          // fetch current user
          try {
            const me = await triggerGetMe().unwrap();
            dispatch(setCredentials({ access, refresh, user: me }));
            if (me.role === "candidate") router.push("/dashboard/candidate");
            else if (me.role === "employer") router.push("/dashboard/employer");
            else router.push("/dashboard");
          } catch (e) {
            router.push("/dashboard");
          }
        } catch (e) {
          router.push("/login");
        }
      } else {
        // No tokens returned: likely email verification flow. Show message and redirect to login.
        setError("Registration successful — check your email for a verification link.");
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch (err: any) {
      // Backend validation errors: set field-specific messages when possible
      if (err?.data && typeof err.data === "object") {
        const next: Record<string, string> = {};
        Object.keys(err.data).forEach((k) => {
          const v = err.data[k];
          if (Array.isArray(v)) next[k] = v.join(" ");
          else if (typeof v === "string") next[k] = v;
          else next[k] = JSON.stringify(v);
        });
        setFieldErrors(next);
      } else if (err?.data) {
        setError(String(err.data));
      } else setError("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {fieldErrors.email && <p className="text-red-600 text-sm">{fieldErrors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {fieldErrors.password && <p className="text-red-600 text-sm">{fieldErrors.password}</p>}
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className="border p-2 rounded"
        required
      />
      {fieldErrors.password_confirm && (
        <p className="text-red-600 text-sm">{fieldErrors.password_confirm}</p>
      )}
      <div>
        <p className="text-sm mb-2">Ro'yxatdan o'tayotganingiz qanday?</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={role === "candidate"}
            onClick={() => setRole("candidate")}
            className={
              "flex-1 border rounded p-3 text-center " +
              (role === "candidate" ? "border-blue-500 bg-blue-50" : "border-gray-200")
            }
          >
            Candidate
          </button>
          <button
            type="button"
            aria-pressed={role === "employer"}
            onClick={() => setRole("employer")}
            className={
              "flex-1 border rounded p-3 text-center " +
              (role === "employer" ? "border-blue-500 bg-blue-50" : "border-gray-200")
            }
          >
            Employer
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input type="hidden" name="role" value={role} />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded disabled:opacity-50"
        disabled={isRegistering || isLoggingIn}
      >
        {isRegistering || isLoggingIn ? "Processing..." : "Register"}
      </button>
    </form>
  );
}
