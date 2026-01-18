"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoginMutation, useLazyGetMeQuery } from "../../store/api/authApi";
import { setCredentials } from "../../store/slices/authSlice";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
  const [triggerGetMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password }).unwrap();

      // Store tokens first (user will be fetched next)
      dispatch(
        setCredentials({ access: res.access, refresh: res.refresh, user: null })
      );

      try {
        const me = await triggerGetMe().unwrap();
        // update store with user
        dispatch(
          setCredentials({ access: res.access, refresh: res.refresh, user: me })
        );

        // redirect based on role
        if (me.role === "candidate") router.push("/dashboard/candidate");
        else if (me.role === "employer") router.push("/dashboard/employer");
        else router.push("/dashboard");
      } catch (err) {
        // If fetching user failed, fallback to generic dashboard
        router.push("/dashboard");
      }
    } catch (e: any) {
      setError("Login failed. Please check your credentials and try again.");
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
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
