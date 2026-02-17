"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/app/store/hooks";
import {
  useGetCurrentEmployerQuery,
  useGetEmployerDashboardQuery,
  useListConversationsQuery,
} from "@/app/store/api";

export default function EmployerDashboardPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation("dashboard");

  const {
    data: employer,
    isLoading: employerLoading,
    error: employerError,
  } = useGetCurrentEmployerQuery();

  const { data: stats, isLoading: statsLoading } = useGetEmployerDashboardQuery();
  const { data: conversations } = useListConversationsQuery();

  useEffect(() => {
    if (user && user.role !== "employer") {
      router.push("/dashboard/candidate");
    }
  }, [user, router]);

  if (employerLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (employerError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-lg">{t("errors.loadingError")}</div>
      </div>
    );
  }

  const conversationCount = conversations?.count || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("employer.greeting")}, {employer?.company_name || "Ish beruvchi"}
          </h1>
          <p className="text-gray-600 mt-2">
            {t("employer.loginInfo")} {employer?.user_email || ""}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Likes Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("employer.stats.likedCandidates")}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.likes_count || 0}
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          {/* Invitations Sent */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("employer.stats.invitationsSent")}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.invitations_sent || 0}
                </p>
              </div>
              <div className="text-4xl">📧</div>
            </div>
          </div>

          {/* Conversations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("employer.stats.conversations")}</p>
                <p className="text-3xl font-bold text-gray-900">{conversationCount}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t("employer.profileCompletion")}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all"
              style={{
                width: `${stats?.profile_completion_percentage || 0}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {stats?.profile_completion_percentage || 0}% {t("employer.profileCompletionDesc")}
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("employer.quickLinks.candidates")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("employer.quickLinks.candidatesDesc")}
            </p>
            <a
              href="/candidates"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {t("employer.viewButton")}
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("employer.quickLinks.postings")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("employer.quickLinks.postingsDesc")}
            </p>
            <a
              href="/postings"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {t("employer.viewButton")}
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("employer.quickLinks.messages")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("employer.quickLinks.messagesDesc")}
            </p>
            <a
              href="/messages"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {t("employer.viewButton")} ({conversationCount})
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("employer.quickLinks.notifications")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t("employer.quickLinks.notificationsDesc")}
            </p>
            <a
              href="/notifications"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {t("employer.viewButton")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
