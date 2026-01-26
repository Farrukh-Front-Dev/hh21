"use client";

import { useState } from "react";
import { useConversations, useConversation, useSendMessage } from "@/app/hooks/useApi";

export default function MessagesPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [messageText, setMessageText] = useState("");

  // Fetch conversations
  const { data: conversationsData, isLoading: conversationsLoading } =
    useConversations({ page_size: 50 });

  // Fetch selected conversation messages
  const { data: conversation, isLoading: conversationLoading } =
    useConversation(selectedConversationId);

  const [sendMessage, { isLoading: messageSending }] = useSendMessage();

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversationId) return;

    try {
      await sendMessage({
        conversation_id: selectedConversationId,
        content: messageText,
      }).unwrap();
      setMessageText("");
    } catch (error) {
      console.error("Xatoka chiqdi:", error);
    }
  };

  const conversations = conversationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Xabarlar</h1>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversationsLoading ? (
              <div className="p-4 text-center text-gray-500">
                Yuklanmoqda...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Suhbatlar yo&apos;q
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
                      <p className="font-semibold text-gray-900">
                        {conv.participants.join(", ")}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {conv.last_message || "Hozircha xabar yo&apos;q"}
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
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationLoading ? (
                  <div className="text-center text-gray-500 py-10">
                    Xabarlar yuklanmoqda...
                  </div>
                ) : conversation?.messages ? (
                  conversation.messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-gray-900">{msg.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString("uz-UZ")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    Xabar yo&apos;q
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder="Xabar yozing..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={messageSending || !messageText.trim()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                  >
                    Jo&apos;natish
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-500 text-lg">Suhbat tanlang</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
