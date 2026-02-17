"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useListInvitationsQuery,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from "@/app/store/api";

export default function InvitationsPage() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation("invitations");

  const { data: invitationsData, isLoading } = useListInvitationsQuery({ page });
  const [acceptInvitation, { isLoading: acceptLoading }] = useAcceptInvitationMutation();
  const [rejectInvitation, { isLoading: rejectLoading }] = useRejectInvitationMutation();

  const handleAccept = async (invitationId: number) => {
    try {
      await acceptInvitation(invitationId).unwrap();
      alert("Invitation accepted!");
    } catch (error) {
      console.error("Error accepting invitation:", error);
      alert("Failed to accept invitation");
    }
  };

  const handleReject = async (invitationId: number) => {
    try {
      await rejectInvitation(invitationId).unwrap();
      alert("Invitation rejected!");
    } catch (error) {
      console.error("Error rejecting invitation:", error);
      alert("Failed to reject invitation");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const invitations = invitationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-600 mt-2">
            {invitationsData?.count || 0} {t("subtitle")}
          </p>
        </div>

        {/* Invitations List */}
        <div className="space-y-4">
          {invitations.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">{t("empty")}</p>
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
                      {t("invitationCard.employer")}: {invitation.employer_company || "N/A"}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {t("invitationCard.candidate")}: {invitation.candidate_name}
                    </p>
                    <p className="text-gray-700 mt-3 bg-gray-50 p-3 rounded">
                      {invitation.message}
                    </p>

                    {/* Status Badge */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm font-medium">{t("invitationCard.status")}:</span>
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
                          ? t("invitationCard.statusPending")
                          : invitation.status === "accepted"
                          ? t("invitationCard.statusAccepted")
                          : t("invitationCard.statusRejected")}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(invitation.created_at).toLocaleString()}
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
                        {t("actions.accept")}
                      </button>
                      <button
                        onClick={() => handleReject(invitation.id)}
                        disabled={rejectLoading}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 whitespace-nowrap"
                      >
                        {t("actions.reject")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {invitationsData && (invitationsData.next || invitationsData.previous) && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!invitationsData.previous}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={!invitationsData.next}
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
