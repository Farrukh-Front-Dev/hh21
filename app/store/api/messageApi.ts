import { baseApi } from "./baseApi";

export interface Message {
  id: number;
  conversation: number;
  sender: number;
  sender_name: string;
  content: string;
  is_read: boolean;
  is_own_message: boolean;
  created_at: string;
}

export interface Conversation {
  id: number;
  participant_one: number;
  participant_two: number;
  other_participant: string;
  last_message: string;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
}

export interface ConversationCreate {
  participant_one: number;
  participant_two: number;
}

export interface MessageCreate {
  conversation: number;
  content: string;
}

export interface ListConversationsParams {
  page?: number;
}

export interface ListMessagesParams {
  page?: number;
}

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listConversations: builder.query<
      {
        results: Conversation[];
        count: number;
        next?: string | null;
        previous?: string | null;
      },
      ListConversationsParams | void
    >({
      query: (params) => ({
        url: "/conversations/",
        params,
      }),
    }),

    getConversation: builder.query<ConversationDetail, number>({
      query: (id) => `/conversations/${id}/`,
    }),

    createConversation: builder.mutation<Conversation, ConversationCreate>({
      query: (body) => ({
        url: "/conversations/",
        method: "POST",
        body,
      }),
    }),

    startConversation: builder.mutation<Conversation, ConversationCreate>({
      query: (body) => ({
        url: "/conversations/start/",
        method: "POST",
        body,
      }),
    }),

    updateConversation: builder.mutation<Conversation, { id: number; body: Partial<ConversationCreate> }>({
      query: ({ id, body }) => ({
        url: `/conversations/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteConversation: builder.mutation<void, number>({
      query: (id) => ({
        url: `/conversations/${id}/`,
        method: "DELETE",
      }),
    }),

    listMessages: builder.query<
      { results: Message[]; count: number; next?: string | null; previous?: string | null },
      ListMessagesParams | void
    >({
      query: (params) => ({
        url: "/messages/",
        params,
      }),
    }),

    getMessage: builder.query<Message, number>({
      query: (id) => `/messages/${id}/`,
    }),

    sendMessage: builder.mutation<Message, MessageCreate>({
      query: (body) => ({
        url: "/messages/",
        method: "POST",
        body,
      }),
    }),

    updateMessage: builder.mutation<Message, { id: number; body: Partial<MessageCreate> }>({
      query: ({ id, body }) => ({
        url: `/messages/${id}/`,
        method: "PATCH",
        body,
      }),
    }),

    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/messages/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useListConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useStartConversationMutation,
  useUpdateConversationMutation,
  useDeleteConversationMutation,
  useListMessagesQuery,
  useGetMessageQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
