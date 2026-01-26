"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentCandidate, useCandidateDashboard } from "@/app/hooks/useApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function CandidateDashboardPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  // Fetch candidate data
  const {
    data: candidate,
    isLoading: candidateLoading,
    error: candidateError,
  } = useCurrentCandidate();

  const {
    data: stats,
    isLoading: statsLoading,
  } = useCandidateDashboard();

  // Redirect if not a candidate
  useEffect(() => {
    if (user && user.role !== "candidate") {
      router.push("/dashboard/employer");
    }
  }, [user, router]);

  if (candidateLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (candidateError) {
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
            Assalamu alaykum, {candidate?.full_name || "Nomzod"}
          </h1>
          <p className="text-gray-600 mt-2">
            Siz {candidate?.email || ""} akaunti bilan kirgansiz
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Job Postings Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Jami Postinglar</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.postings_count || 0}
                </p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </div>

          {/* Likes Count */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Menga Yoqtirilganlar</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.likes_count || 0}
                </p>
              </div>
              <div className="text-4xl">❤️</div>
            </div>
          </div>

          {/* Pending Invitations */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Kutilayotgan Takliflar</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.pending_invitations || 0}
                </p>
              </div>
              <div className="text-4xl">📧</div>
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
              Mening Postinglari
            </h3>
            <p className="text-gray-600 mb-4">
              O&apos;z jobasiz postinglarni ko&apos;rish va boshqarish
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
              Meni Yoqtirganlar
            </h3>
            <p className="text-gray-600 mb-4">
              Siz yoqtirgan ish beruvchilarni ko&apos;rish
            </p>
            <a
              href="/postings/liked"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ko&apos;rish
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Takliflar
            </h3>
            <p className="text-gray-600 mb-4">
              Ish beruvchilardan kelgan takliflarni ko&apos;rish
            </p>
            <a
              href="/invitations"
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
              Ish beruvchilar bilan suhbat qiling
            </p>
            <a
              href="/messages"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ko&apos;rish
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
