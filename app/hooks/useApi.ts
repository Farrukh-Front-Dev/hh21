import {
  useListCandidatesQuery,
  useGetCandidateQuery,
  useGetCurrentCandidateQuery,
  useCompleteProfileMutation,
  useUpdateCandidateMutation,
  useGetCandidateDashboardQuery,
} from "@/app/store/api/candidateApi";

import {
  useListEmployersQuery,
  useGetEmployerQuery,
  useGetCurrentEmployerQuery,
  useCompleteEmployerProfileMutation,
  useUpdateEmployerMutation,
  useGetEmployerDashboardQuery,
} from "@/app/store/api/employerApi";

import {
  useListPostingsQuery,
  useGetPostingQuery,
  useCreatePostingMutation,
  useUpdatePostingMutation,
  useDeletePostingMutation,
  useGetMyPostingsQuery,
  useTogglePostingStatusMutation,
} from "@/app/store/api/postingApi";

import {
  useListConversationsQuery,
  useGetConversationQuery,
  useStartConversationMutation,
  useListMessagesQuery,
  useSendMessageMutation,
} from "@/app/store/api/messageApi";

import {
  useListNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useGetUnreadCountQuery,
} from "@/app/store/api/notificationApi";

import {
  useListInvitationsQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
  useGetPendingInvitationsQuery,
} from "@/app/store/api/invitationApi";

import {
  useListLikesQuery,
  useToggleLikeMutation,
} from "@/app/store/api/likeApi";

import {
  useListCategoriesQuery,
} from "@/app/store/api/categoryApi";

import {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useVerifyEmailMutation,
} from "@/app/store/api/authApi";

import { logout } from "@/app/store/slices/authSlice";
import { useDispatch } from "react-redux";

// ==================== CANDIDATE HOOKS ====================

export const useCurrentCandidate = () => useGetCurrentCandidateQuery();

export const useCandidates = (params?: any) =>
  useListCandidatesQuery(params || {});

export const useCandidate = (id: number) => useGetCandidateQuery(id);

export const useCompleteCandidateProfile = () =>
  useCompleteProfileMutation();

export const useUpdateCandidate = () => useUpdateCandidateMutation();

export const useCandidateDashboard = () => useGetCandidateDashboardQuery();

// ==================== EMPLOYER HOOKS ====================

export const useCurrentEmployer = () => useGetCurrentEmployerQuery();

export const useEmployers = (params?: any) =>
  useListEmployersQuery(params || {});

export const useEmployer = (id: number) => useGetEmployerQuery(id);

export const useCompleteEmployerProfile = () =>
  useCompleteEmployerProfileMutation();

export const useUpdateEmployer = () => useUpdateEmployerMutation();

export const useEmployerDashboard = () => useGetEmployerDashboardQuery();

// ==================== POSTING HOOKS ====================

export const usePostings = (params?: any) =>
  useListPostingsQuery(params || {});

export const usePosting = (id: number) => useGetPostingQuery(id);

export const useCreatePosting = () => useCreatePostingMutation();

export const useUpdatePosting = () => useUpdatePostingMutation();

export const useDeletePosting = () => useDeletePostingMutation();

export const useMyPostings = () => useGetMyPostingsQuery();

export const useTogglePostingStatus = () => useTogglePostingStatusMutation();

// ==================== MESSAGE HOOKS ====================

export const useConversations = (params?: any) =>
  useListConversationsQuery(params || {});

export const useConversation = (id: number) =>
  useGetConversationQuery(id);

export const useStartConversation = () => useStartConversationMutation();

export const useMessages = (params?: any) =>
  useListMessagesQuery(params || {});

export const useSendMessage = () => useSendMessageMutation();

// ==================== NOTIFICATION HOOKS ====================

export const useNotifications = (params?: any) =>
  useListNotificationsQuery(params || {});

export const useMarkNotificationRead = () =>
  useMarkNotificationReadMutation();

export const useMarkAllNotificationsRead = () =>
  useMarkAllNotificationsReadMutation();

export const useUnreadCount = () => useGetUnreadCountQuery();

// ==================== INVITATION HOOKS ====================

export const useInvitations = (params?: any) =>
  useListInvitationsQuery(params || {});

export const useCreateInvitation = () => useCreateInvitationMutation();

export const useAcceptInvitation = () => useAcceptInvitationMutation();

export const useRejectInvitation = () => useRejectInvitationMutation();

export const usePendingInvitations = () => useGetPendingInvitationsQuery();

// ==================== LIKE HOOKS ====================

export const useLikes = (params?: any) => useListLikesQuery(params || {});

export const useToggleLike = () => useToggleLikeMutation();

// ==================== CATEGORY HOOKS ====================

export const useCategories = () => useListCategoriesQuery();

// ==================== AUTH HOOKS ====================

export const useLogin = () => useLoginMutation();

export const useRegister = () => useRegisterMutation();

export const useLogout = () => {
  const dispatch = useDispatch();
  return () => dispatch(logout());
};

export const useMe = () => useGetMeQuery();

export const useVerifyEmail = () => useVerifyEmailMutation();
