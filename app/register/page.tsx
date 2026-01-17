import { RegisterForm } from "@app/components/auth/Register";
import { Navbar } from "../components/Navbar";
import Link from "@node_modules/next/link";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center h-screen">
        <RegisterForm />
        <p className="text-sm text-gray-600">
          Allaqachon ro‘yxatdan o‘tganmisiz?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </main>
    </>
  );
}
