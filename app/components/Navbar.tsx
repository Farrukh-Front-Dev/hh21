"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUnreadCount } from "@/app/hooks/useApi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export function Navbar() {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  
  // Har doim hook chaqirish (rules)
  const unreadResult = useUnreadCount();
  const unreadData = unreadResult.isError ? null : unreadResult.data;
  
  // useTranslation hook ni mounted state'dan oldin ishlatish mumkin
  // lekin rendering'da faqat mounted bo'lganda ishlatamiz
  const { t } = useTranslation("common");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // hydration mismatch oldini oladi

  const isAuthenticated = Boolean(accessToken);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          HH21
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {isAuthenticated ? (
            <>
              {/* Home */}
              <Link href="/dashboard" className="hover:text-blue-100 transition">
                {t("navbar.home")}
              </Link>

              {/* Candidate Routes */}
              {user?.role === "candidate" && (
                <>
                  <Link href="/postings" className="hover:text-blue-100 transition">
                    {t("jobs.title")}
                  </Link>
                  <Link href="/invitations" className="hover:text-blue-100 transition">
                    {t("navbar.invitations")}
                  </Link>
                </>
              )}

              {/* Employer Routes */}
              {user?.role === "employer" && (
                <>
                  <Link href="/candidates" className="hover:text-blue-100 transition">
                    {t("navbar.candidates")}
                  </Link>
                  <Link href="/postings" className="hover:text-blue-100 transition">
                    {t("jobs.title")}
                  </Link>
                </>
              )}

              {/* Messages */}
              <Link
                href="/messages"
                className="hover:text-blue-100 transition relative"
              >
                {t("navbar.messages")}
              </Link>

              {/* Notifications */}
              <Link
                href="/notifications"
                className="hover:text-blue-100 transition relative flex items-center gap-1"
              >
                {t("navbar.notifications")}
                {(unreadData?.unread_count || 0) > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {unreadData?.unread_count}
                  </span>
                )}
              </Link>

              {/* Language Switcher */}
              <div className="border-l border-blue-400 pl-4">
                <LanguageSwitcher />
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-4">
                <span className="text-sm">
                  {user?.email || t("common.loading")}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  {t("navbar.logout")}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Language Switcher */}
              <div>
                <LanguageSwitcher />
              </div>

              <Link
                href="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
              >
                {t("navbar.login")}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border-2 border-white rounded-lg hover:bg-blue-700 transition"
              >
                {t("navbar.register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
