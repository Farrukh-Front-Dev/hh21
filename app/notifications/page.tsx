"use client";

import { useState } from "react";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useUnreadCount,
} from "@/app/hooks/useApi";
import { useTranslation } from "react-i18next";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const { t } = useTranslation('notifications');

  // Fetch notifications
  const { data: notificationsData, isLoading: notificationsLoading } =
    useNotifications({ page, page_size: 20 });

  const { data: unreadData } = useUnreadCount();
  const [markRead] = useMarkNotificationRead();
  const [markAllRead] = useMarkAllNotificationsRead();

  // Handle mark as read
  const handleMarkRead = async (notificationId: string) => {
    try {
      await markRead(notificationId).unwrap();
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
    }
  };

  // Handle mark all as read
  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
    }
  };

  const notifications = notificationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('title')}
            </h1>
            <p className="text-gray-600 mt-2">
              {unreadData?.unread_count || 0} {t('unreadCount')}
            </p>
          </div>
          {(unreadData?.unread_count || 0) > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {t('markAllAsRead')}
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notificationsLoading ? (
            <div className="text-center text-gray-500 py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">{t('empty')}</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow p-6 border-l-4 transition ${
                  notification.is_read
                    ? "border-gray-300"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString(
                        "uz-UZ"
                      )}
                    </p>
                  </div>

                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkRead(notification.id)}
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm whitespace-nowrap"
                    >
                      {t('markAsRead')}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {notificationsData?.count && notificationsData.count > 20 && (
          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              {t('pagination.previous')}
            </button>
            <span className="px-4 py-2">{page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={
                !notificationsData?.next
              }
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              {t('pagination.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
