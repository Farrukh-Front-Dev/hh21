"use client";

import { useState } from "react";
import Link from "next/link";
import { useCandidates, useCreateInvitation } from "@/app/hooks/useApi";
import { useAppSelector } from "@/app/store/hooks";
import { useTranslation } from "react-i18next";

export default function CandidatesPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
  });
  const { t } = useTranslation('candidates');

  // Fetch candidates
  const { data: candidatesData, isLoading: candidatesLoading } = useCandidates(
    filters
  );

  const [createInvitation] = useCreateInvitation();

  const handleInvite = async (candidateId: string) => {
    // This would need posting ID - simplified for now
    try {
      console.log("Inviting:", candidateId);
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
    }
  };

  const candidates = candidatesData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600 mt-2">
            {candidatesData?.count || 0} {t('totalCandidates')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder={t('filters.search')}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              defaultValue=""
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('filters.experienceLevel')}</option>
              <option value="0">{t('filters.levels.junior')}</option>
              <option value="1">{t('filters.levels.middle')}</option>
              <option value="3">{t('filters.levels.senior')}</option>
            </select>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidatesLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : candidates.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">{t('empty')}</p>
            </div>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  {candidate.photo && (
                    <div className="mb-4">
                      <img
                        src={candidate.photo}
                        alt={candidate.full_name}
                        className="w-20 h-20 rounded-full mx-auto"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 text-center">
                    {candidate.full_name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm mt-1">
                    {candidate.email}
                  </p>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3 text-sm text-gray-600">
                  {candidate.experience_years && (
                    <div>
                      <span className="font-semibold">{t('candidateCard.experience')}:</span>{" "}
                      {candidate.experience_years}+ {t('candidateCard.years')}
                    </div>
                  )}
                  {candidate.location && (
                    <div>
                      <span className="font-semibold">{t('candidateCard.location')}:</span>{" "}
                      {candidate.location}
                    </div>
                  )}
                  {candidate.education && (
                    <div>
                      <span className="font-semibold">{t('candidateCard.education')}:</span>{" "}
                      {candidate.education}
                    </div>
                  )}
                  {candidate.skills && candidate.skills.length > 0 && (
                    <div>
                      <span className="font-semibold">{t('candidateCard.skills')}:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {candidate.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="p-6 border-t border-gray-200">
                  {user?.role === "employer" ? (
                    <button
                      onClick={() => handleInvite(candidate.id)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      {t('actions.sendInvitation')}
                    </button>
                  ) : (
                    <Link
                      href={`/candidates/${candidate.id}`}
                      className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      {t('actions.viewProfile')}
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {candidatesData?.count && candidatesData.count > 20 && (
          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              disabled={filters.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              {t('pagination.previous')}
            </button>
            <span className="px-4 py-2">{filters.page}</span>
            <button
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              {t('pagination.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
