"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "../../store/api/authApi";

export default function VerifyEmailPage() {
  const { token } = useParams() as { token?: string };
  const router = useRouter();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let mounted = true;

    (async () => {
      try {
        await verifyEmail(token).unwrap();
        if (!mounted) return;
        setStatus("success");
        setMessage("Email verified successfully. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } catch (err: any) {
        if (!mounted) return;
        setStatus("error");
        const msg = err?.data || err?.error || "Verification failed.";
        setMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token, verifyEmail, router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {isLoading && <p className="text-gray-700">Verifying your email...</p>}
        {status === "success" && <p className="text-green-600">{message}</p>}
        {status === "error" && <p className="text-red-600">{message}</p>}
        {status === "idle" && !isLoading && <p className="text-gray-700">Processing...</p>}
      </div>
    </main>
  );
}
