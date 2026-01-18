"use client";

import Link from "next/link";
import { LoginForm } from "../components/auth/LoginForm";
import { Navbar } from "../components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center h-screen">
        <LoginForm />
        <p className="text-sm text-gray-600">
          Ro‘yxatdan o‘tmaganmisiz?{" "}
          <Link href="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </main>
    </>
  );
}
