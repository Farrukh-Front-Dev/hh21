"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrentEmployer, useEmployerDashboard, useConversations } from "@/app/hooks/useApi";
import { useAppSelector } from "@/app/store/hooks";

export default function EmployerDashboardPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [conversationCount, setConversationCount] = useState(0);

  // Fetch employer data
  const {
    data: employer,
    isLoading: employerLoading,
    error: employerError,
  } = useCurrentEmployer();

  const {
    data: stats,
    isLoading: statsLoading,
  } = useEmployerDashboard();

  const {
    data: conversations,
  } = useConversations({ page_size: 100 });

  // Count conversations
  useEffect(() => {
    if (conversations?.results) {
      setConversationCount(conversations.results.length);
    }
  }, [conversations]);

  // Redirect if not an employer
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
        <div className="text-red-500 text-lg">Xatoka chiqdi</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Assalamu alaykum, {employer?.company_name || "Ish beruvchi"}
          </h1>
          <p className="text-gray-600 mt-2">
            Siz {employer?.email || ""} akaunti bilan kirgansiz
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Postings Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Jami Postinglar</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.postings_count || 0}
                </p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>

          {/* Liked Candidates */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Yoqtirilgan Nomzodlar</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.liked_candidates || 0}
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Suhbatlar</p>
                <p className="text-3xl font-bold text-gray-900">
                  {conversationCount}
                </p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Profil To&apos;ldirilishi
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
            {stats?.profile_completion_percentage || 0}% to&apos;ldirilgan
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Yangi Posting Qo&apos;shish
            </h3>
            <p className="text-gray-600 mb-4">
              Yangi ish postingi yarating va nomzodlarni qidiring
            </p>
            <a
              href="/postings/create"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Qo&apos;shish
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mening Postinglari
            </h3>
            <p className="text-gray-600 mb-4">
              Qo&apos;shgan postinglarni boshqarish
            </p>
            <a
              href="/postings/my"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ko&apos;rish
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nomzodlar
            </h3>
            <p className="text-gray-600 mb-4">
              Barcha nomzodlarni ko&apos;rish va qidirishish
            </p>
            <a
              href="/candidates"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ko&apos;rish
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Xabarlar
            </h3>
            <p className="text-gray-600 mb-4">
              Nomzodlar bilan suhbat qiling
            </p>
            <a
              href="/messages"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ko&apos;rish ({conversationCount})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
