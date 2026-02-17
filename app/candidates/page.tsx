"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/store/hooks";
import { useTranslation } from "react-i18next";
import { useListCandidatesQuery, useCreateInvitationMutation } from "@/app/store/api";

export default function CandidatesPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const { t } = useTranslation("candidates");

  const { data: candidatesData, isLoading } = useListCandidatesQuery({ page });
  const [createInvitation] = useCreateInvitationMutation();

  const handleInvite = async (candidateId: number) => {
    if (user?.role !== "employer") return;
    try {
      const message = prompt("Enter invitation message:");
      if (!message) return;
      await createInvitation({ candidate: candidateId, message }).unwrap();
      alert("Invitation sent successfully!");
    } catch (error) {
      console.error("Error sending invitation:", error);
      alert("Failed to send invitation");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const candidates = candidatesData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-600 mt-2">
            {candidatesData?.count || 0} {t("totalCandidates")}
          </p>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="p-6">
                {/* Profile Image */}
                {candidate.profile_image && (
                  <img
                    src={candidate.profile_image}
                    alt={`${candidate.name} ${candidate.surname}`}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                )}

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {candidate.name} {candidate.surname}
                </h3>

                {/* Email */}
                <p className="text-sm text-gray-600 text-center mb-2">
                  {candidate.user_email}
                </p>

                {/* City */}
                <div className="text-sm text-gray-500 text-center mb-2">
                  📍 {candidate.city.replace(/_/g, " ")}
                </div>

                {/* Sphere */}
                {candidate.sphere && (
                  <div className="text-sm text-blue-600 text-center mb-2">
                    {candidate.sphere}
                  </div>
                )}

                {/* Availability Status */}
                <div className="text-center mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      candidate.availability_status === "actively_looking"
                        ? "bg-green-100 text-green-800"
                        : candidate.availability_status === "open_to_offers"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {candidate.availability_status.replace(/_/g, " ")}
                  </span>
                </div>

                {/* About Me */}
                {candidate.about_me && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {candidate.about_me}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex justify-center gap-3 mb-4">
                  {candidate.telegram_username && (
                    <a
                      href={`https://t.me/${candidate.telegram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      Telegram
                    </a>
                  )}
                  {candidate.github_username && (
                    <a
                      href={`https://github.com/${candidate.github_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 text-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/candidates/${candidate.id}`}
                    className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    {t("actions.viewProfile")}
                  </Link>
                  {user?.role === "employer" && (
                    <button
                      onClick={() => handleInvite(candidate.id)}
                      className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      {t("actions.sendInvitation")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {candidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t("empty")}</p>
          </div>
        )}

        {/* Pagination */}
        {candidatesData && (candidatesData.next || candidatesData.previous) && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!candidatesData.previous}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {t("pagination.previous")}
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!candidatesData.next}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {t("pagination.next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
