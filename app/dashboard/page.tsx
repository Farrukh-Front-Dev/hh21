"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/navigation";
import { Navbar } from "../components/Navbar";

export default function Dashboard() {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  if (!token) redirect("/login");

  return (
    <>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Faqat login bo‘lgan foydalanuvchilar ko‘ra oladi.</p>
      </main>
    </> 
  );
}
