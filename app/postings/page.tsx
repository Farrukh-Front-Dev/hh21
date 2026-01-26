"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  usePostings,
  useCategories,
  useToggleLike,
  useMyPostings,
} from "@/app/hooks/useApi";
import { useAppSelector } from "@/app/store/hooks";

export default function PostingsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    page: 1,
  });
  const [liked, setLiked] = useState<Set<string>>(new Set());

  // Fetch data
  const { data: postingsData, isLoading: postingsLoading } = usePostings(filters);
  const { data: categoriesResponse } = useCategories();
  const [toggleLike] = useToggleLike();

  // Handle like toggle
  const handleLike = async (postingId: string) => {
    try {
      await toggleLike(postingId).unwrap();
      setLiked((prev) => {
        const newLiked = new Set(prev);
        if (newLiked.has(postingId)) {
          newLiked.delete(postingId);
        } else {
          newLiked.add(postingId);
        }
        return newLiked;
      });
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Ish Postinglari
            </h1>
            <p className="text-gray-600 mt-2">
              {postingsData?.count || 0} ta posting mavjud
            </p>
          </div>
          {user?.role === "candidate" && (
            <Link
              href="/postings/create"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              + Yangi Posting
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Qidirish..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value, page: 1 })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Barcha Kategoriyalar</option>
              {(categoriesResponse || []).map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              defaultValue=""
              onChange={(e) =>
                setFilters({
                  ...filters,
                  page: 1,
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Barcha Postinglar</option>
              <option value="true">Aktiv</option>
              <option value="false">Faol emas</option>
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
                      className={`text-2xl transition ${
                        liked.has(posting.id) ? "text-red-500" : "text-gray-300"
                      }`}
                    >
                      ❤️
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {posting.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  {posting.required_experience && (
                    <div>Tajriba: {posting.required_experience}+ yil</div>
                  )}
                  {posting.location && (
                    <div>Joylashuvi: {posting.location}</div>
                  )}
                  {posting.salary_min && posting.salary_max && (
                    <div>
                      Maosh: ${posting.salary_min} - ${posting.salary_max}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex gap-4 mb-4 text-sm text-gray-600 border-t pt-4">
                  <div>👁️ {posting.views_count || 0}</div>
                  <div>❤️ {posting.likes_count || 0}</div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/postings/${posting.id}`}
                  className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Batafsil
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {postings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Postinglar topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
}
