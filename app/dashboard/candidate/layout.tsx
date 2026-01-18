"use client";

import React from "react";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { Navbar } from "../../components/Navbar";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  useAuthGuard("candidate");

  return (
    <>
      <Navbar />
      <div className="p-8">{children}</div>
    </>
  );
}
