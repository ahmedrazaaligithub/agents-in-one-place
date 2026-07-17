import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "@/lib/api/axios";
import type { ChatEntry, ChatMessage, RecommendResponse } from "@/lib/ai/types";
import type { RootState } from "@/lib/store/store";

const WELCOME_ENTRY: ChatEntry = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! Tell me what you're trying to do — like “write blog posts faster” or “best free note-taking tool” — and I'll recommend a few tools from the directory.",
};

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

type ChatState = {
  entries: ChatEntry[];
  loading: boolean;
};

const initialState: ChatState = {
  entries: [WELCOME_ENTRY],
  loading: false,
};

export const sendChatMessage = createAsyncThunk<
  RecommendResponse,
  string,
  { state: RootState }
>("chat/sendMessage", async (_message, { getState }) => {
  // `pending` (below) already pushed the user's message into state before this
  // payload creator runs, so `getState()` here reflects it — no need to re-add it.
  const history: ChatMessage[] = getState()
    .chat.entries.filter((entry) => entry.id !== "welcome")
    .map((entry) => ({ role: entry.role, content: entry.content }));

  const { data } = await api.post<RecommendResponse>("/recommend", { history });
  return data;
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state, action) => {
        state.loading = true;
        state.entries.push({
          id: nextId(),
          role: "user",
          content: action.meta.arg,
        });
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.push({
          id: nextId(),
          role: "assistant",
          content: action.payload.message || "Here's what I found:",
          recommendations: action.payload.recommendations,
        });
      })
      .addCase(sendChatMessage.rejected, (state) => {
        state.loading = false;
        state.entries.push({
          id: nextId(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
          isError: true,
        });
      });
  },
});

export default chatSlice.reducer;
