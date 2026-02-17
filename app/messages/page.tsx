"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useListConversationsQuery,
  useGetConversationQuery,
  useSendMessageMutation,
} from "@/app/store/api";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const { t } = useTranslation("messages");

  const { data: conversationsData, isLoading: conversationsLoading } = useListConversationsQuery();
  const { data: conversation, isLoading: conversationLoading } = useGetConversationQuery(
    selectedConversationId!,
    { skip: !selectedConversationId }
  );
  const [sendMessage, { isLoading: messageSending }] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversationId) return;

    try {
      await sendMessage({
        conversation: selectedConversationId,
        content: messageText,
      }).unwrap();
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const conversations = conversationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{t("conversationsList.header")}</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversationsLoading ? (
              <div className="p-4 text-center text-gray-500">
                {t("conversationsList.loading")}
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {t("conversationsList.empty")}
              </div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversationId(conv.id)}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition ${
                    selectedConversationId === conv.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{conv.other_participant}</p>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        {conv.last_message || t("conversationsList.noLastMessage")}
                      </p>
                    </div>
                    {conv.unread_count > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex md:w-2/3 flex-col">
          {selectedConversationId ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationLoading ? (
                  <div className="text-center text-gray-500 py-10">
                    {t("chatArea.loading")}
                  </div>
                ) : conversation?.messages && conversation.messages.length > 0 ? (
                  conversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.is_own_message ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-xs lg:max-w-md`}>
                        <div
                          className={`rounded-lg p-3 ${
                            msg.is_own_message
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{msg.sender_name}</p>
                          <p>{msg.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    {t("chatArea.empty")}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder={t("chatArea.placeholder")}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={messageSending || !messageText.trim()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                  >
                    {t("chatArea.sendButton")}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-500 text-lg">{t("chatArea.selectConversation")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
