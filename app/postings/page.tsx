"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/app/store/hooks";
import { useTranslation } from "react-i18next";
import { useListPostingsQuery, useListCategoriesQuery, useToggleLikeMutation } from "@/app/store/api";

export default function PostingsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({
    search: "",
    category: undefined as number | undefined,
    page: 1,
  });
  const { t } = useTranslation("postings");

  // Fetch data
  const { data: postingsData, isLoading: postingsLoading } = useListPostingsQuery(filters);
  const { data: categoriesData } = useListCategoriesQuery();
  const [toggleLike] = useToggleLikeMutation();

  // Handle like toggle
  const handleLike = async (postingId: number) => {
    if (user?.role !== "employer") return;
    try {
      await toggleLike({ posting: postingId }).unwrap();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (postingsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const postings = postingsData?.results || [];
  const categories = categoriesData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-gray-600 mt-2">
              {postingsData?.count || 0} {t("totalPostings")}
            </p>
          </div>
          {user?.role === "candidate" && (
            <Link
              href="/postings/create"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              {t("createButton")}
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder={t("filters.search")}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Category Filter */}
            <select
              value={filters.category || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value ? Number(e.target.value) : undefined,
                  page: 1,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t("filters.category")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Postings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postings.map((posting) => (
            <div
              key={posting.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="p-6">
                {/* Title & Like Button */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {posting.title}
                  </h3>
                  {user?.role === "employer" && (
                    <button
                      onClick={() => handleLike(posting.id)}
                      className="text-2xl transition hover:scale-110"
                    >
                      ❤️
                    </button>
                  )}
                </div>

                {/* Category */}
                <div className="text-sm text-blue-600 mb-2">
                  {posting.category_name}
                </div>

                {/* Candidate Info */}
                <div className="text-sm text-gray-600 mb-4">
                  <div>{posting.candidate_name}</div>
                  <div>{posting.candidate_city}</div>
                </div>

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  {posting.years_of_experience && (
                    <div>
                      {t("postingCard.experience")}: {posting.years_of_experience}+ {t("postingCard.years")}
                    </div>
                  )}
                  <div className={`inline-block px-2 py-1 rounded text-xs ${posting.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {posting.is_active ? t("filters.statusOptions.active") : t("filters.statusOptions.inactive")}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mb-4 text-sm text-gray-600 border-t pt-4">
                  <div>❤️ {posting.like_count}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(posting.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/postings/${posting.id}`}
                  className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {t("actions.viewDetails")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {postings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t("empty")}</p>
          </div>
        )}

        {/* Pagination */}
        {postingsData && (postingsData.next || postingsData.previous) && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              disabled={!postingsData.previous}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {filters.page}</span>
            <button
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              disabled={!postingsData.next}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
