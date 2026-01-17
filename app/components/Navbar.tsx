"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // hydration mismatch oldini oladi

  const isAuthenticated = Boolean(accessToken);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link href="/" className="font-semibold">HH21</Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => dispatch(logout())} className="text-red-600">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
