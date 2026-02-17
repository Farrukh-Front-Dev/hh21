"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { Navbar } from "../components/Navbar";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t, ready } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center h-screen">
        <div className="text-center">
          <LoginForm />
          <p className="text-sm text-gray-600 mt-4">
            {t("auth.noAccount")}{" "}
            <Link href="/register" className="text-blue-600 underline">
              {t("navbar.register")}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
