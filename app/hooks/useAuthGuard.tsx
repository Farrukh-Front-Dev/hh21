"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function useAuthGuard(requiredRole?: "candidate" | "employer") {
  const router = useRouter();
  const pathname = usePathname();
  const access = useSelector((s: RootState) => s.auth.accessToken);
  const user = useSelector((s: RootState) => s.auth.user);

  useEffect(() => {
    // If no token, redirect to login
    if (!access) {
      router.push("/login");
      return;
    }

    // If we have a requiredRole and user exists but role mismatches, redirect to correct dashboard
    if (requiredRole && user) {
      if (user.role !== requiredRole) {
        const target = user.role === "candidate" ? "/dashboard/candidate" : "/dashboard/employer";
        // avoid infinite redirect loop
        if (!pathname?.startsWith(target)) router.push(target);
      }
    }
  }, [access, user, requiredRole, router, pathname]);

  return { user, access };
}
