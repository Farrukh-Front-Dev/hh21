"use client";

import { useState } from "react";
import {
  useInvitations,
  useAcceptInvitation,
  useRejectInvitation,
} from "@/app/hooks/useApi";
import { useTranslation } from "react-i18next";

export default function InvitationsPage() {
  const [filter, setFilter] = useState<string>("all");
  const { t } = useTranslation('invitations');

  // Fetch invitations
  const { data: invitationsData, isLoading: invitationsLoading } = useInvitations({
    status: filter === "all" ? undefined : filter,
  });

  const [acceptInvitation, { isLoading: acceptLoading }] =
    useAcceptInvitation();
  const [rejectInvitation, { isLoading: rejectLoading }] =
    useRejectInvitation();

  // Handle accept
  const handleAccept = async (invitationId: string) => {
    try {
      await acceptInvitation(invitationId).unwrap();
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
    }
  };

  // Handle reject
  const handleReject = async (invitationId: string) => {
    try {
      await rejectInvitation(invitationId).unwrap();
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
    }
  };

  const invitations = invitationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600 mt-2">
            {t('subtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-8 p-4 flex gap-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {t('filters.all')} ({invitationsData?.count || 0})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "pending"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {t('filters.pending')}
          </button>
          <button
            onClick={() => setFilter("accepted")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "accepted"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {t('filters.accepted')}
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "rejected"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {t('filters.rejected')}
          </button>
        </div>

        {/* Invitations List */}
        <div className="space-y-4">
          {invitationsLoading ? (
            <div className="text-center text-gray-500 py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : invitations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">{t('empty')}</p>
            </div>
          ) : (
            invitations.map((invitation) => (
              <div
                key={invitation.id}
                className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                  invitation.status === "pending"
                    ? "border-yellow-500"
                    : invitation.status === "accepted"
                      ? "border-green-500"
                      : "border-red-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('invitationCard.posting')}: {invitation.posting}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {t('invitationCard.employer')}: {invitation.employer}
                    </p>
                    <p className="text-gray-600">
                      {t('invitationCard.candidate')}: {invitation.candidate}
                    </p>

                    {/* Status Badge */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm font-medium">{t('invitationCard.status')}:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          invitation.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : invitation.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {invitation.status === "pending"
                          ? t('invitationCard.statusPending')
                          : invitation.status === "accepted"
                            ? t('invitationCard.statusAccepted')
                            : t('invitationCard.statusRejected')}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(invitation.created_at).toLocaleString("uz-UZ")}
                    </p>
                  </div>

                  {/* Actions */}
                  {invitation.status === "pending" && (
                    <div className="ml-4 flex gap-2">
                      <button
                        onClick={() => handleAccept(invitation.id)}
                        disabled={acceptLoading}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50 whitespace-nowrap"
                      >
                        {t('actions.accept')}
                      </button>
                      <button
                        onClick={() => handleReject(invitation.id)}
                        disabled={rejectLoading}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 whitespace-nowrap"
                      >
                        {t('actions.reject')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
