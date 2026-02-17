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

    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", email);
    console.log("Timestamp:", new Date().toISOString());

    try {
      console.log("Calling login mutation...");
      const res = await login({ email, password }).unwrap();
      console.log("=== LOGIN SUCCESS ===");
      console.log("Response:", res);
      console.log("Access token:", res.access ? "present" : "missing");
      console.log("Refresh token:", res.refresh ? "present" : "missing");
      console.log("User data:", res.user);

      // Store tokens first
      console.log("Dispatching setCredentials...");
      dispatch(
        setCredentials({ access: res.access, refresh: res.refresh, user: res.user || null })
      );
      console.log("Credentials stored in Redux");

      // If user data is already in login response, use it
      if (res.user) {
        console.log("User role:", res.user.role);
        console.log("Redirecting based on role...");

        // Small delay to ensure Redux state is updated before navigation
        await new Promise(resolve => setTimeout(resolve, 100));

        // redirect based on role using replace to avoid back button issues
        if (res.user.role === "candidate") {
          console.log("Redirecting to /dashboard/candidate");
          router.replace("/dashboard/candidate");
        } else if (res.user.role === "employer") {
          console.log("Redirecting to /dashboard/employer");
          router.replace("/dashboard/employer");
        } else {
          console.log("Redirecting to /dashboard");
          router.replace("/dashboard");
        }
        console.log("Router.replace called");
      } else {
        console.log("No user data in login response, fetching from /me...");
        // Fetch user data separately
        try {
          const me = await triggerGetMe().unwrap();
          console.log("User data from /me:", me);

          // update store with user
          dispatch(
            setCredentials({ access: res.access, refresh: res.refresh, user: me })
          );

          // Small delay to ensure Redux state is updated
          await new Promise(resolve => setTimeout(resolve, 100));

          // redirect based on role
          if (me.role === "candidate") {
            console.log("Redirecting to /dashboard/candidate");
            router.replace("/dashboard/candidate");
          } else if (me.role === "employer") {
            console.log("Redirecting to /dashboard/employer");
            router.replace("/dashboard/employer");
          } else {
            console.log("Redirecting to /dashboard");
            router.replace("/dashboard");
          }
        } catch (err: any) {
          console.error("=== GET ME ERROR ===", err);
          setError("Failed to fetch user data. Please try again.");
        }
      }
    } catch (e: any) {
      console.error("=== LOGIN ERROR ===");
      console.error("Error object:", e);
      console.error("Status:", e.status);
      console.error("Data:", e.data);

      // More detailed error messages
      if (e.status === 401) {
        setError("Invalid email or password.");
      } else if (e.status === 400) {
        setError("Please enter valid email and password.");
      } else if (e.data?.detail) {
        setError(e.data.detail);
      } else if (e.data?.non_field_errors) {
        setError(e.data.non_field_errors[0]);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
