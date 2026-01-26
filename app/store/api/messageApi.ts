import { baseApi } from "./baseApi";

export interface Message {
  id: string;
  conversation: string;
  sender: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  last_message?: string;
  last_message_date?: string;
  unread_count: number;
  created_at: string;
}

export interface ListConversationsParams {
  page?: number;
  page_size?: number;
}

export interface ListMessagesParams {
  page?: number;
  page_size?: number;
}

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listConversations: builder.query<
      {
        results: Conversation[];
        count: number;
        next?: string;
        previous?: string;
      },
      ListConversationsParams
    >({
      query: (params) => ({
        url: "/conversations/",
        params,
      }),
    }),

    getConversation: builder.query<
      Conversation & { messages: Message[] },
      string
    >({
      query: (id) => `/conversations/${id}/`,
    }),

    startConversation: builder.mutation<
      Conversation,
      { participant_id: string }
    >({
      query: (body) => ({
        url: "/conversations/",
        method: "POST",
        body,
      }),
    }),

    listMessages: builder.query<
      { results: Message[]; count: number; next?: string; previous?: string },
      { conversationId: string; params?: ListMessagesParams }
    >({
      query: ({ conversationId, params }) => ({
        url: `/conversations/${conversationId}/messages/`,
        params,
      }),
    }),

    sendMessage: builder.mutation<
      Message,
      { conversation_id: string; content: string }
    >({
      query: (body) => ({
        url: "/messages/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useListConversationsQuery,
  useGetConversationQuery,
  useStartConversationMutation,
  useListMessagesQuery,
  useSendMessageMutation,
} = messageApi;
