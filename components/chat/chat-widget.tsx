"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { sendChatMessage } from "@/lib/store/chat-slice";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.chat.entries);
  const loading = useAppSelector((state) => state.chat.loading);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, loading]);

  function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput("");
    dispatch(sendChatMessage(trimmed));
  }

  return (
    <div className="fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute right-0 bottom-16 flex h-128 max-h-[70vh] w-88 max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10 sm:w-96"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">Find a tool</p>
                <p className="text-xs text-muted-foreground">Powered by Gemini</p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {entries.map((entry) => (
                <ChatMessageBubble key={entry.id} entry={entry} />
              ))}
              {loading && (
                <div className="flex items-center gap-2 pl-1 text-xs text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" />
                  Thinking…
                </div>
              )}
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What are you trying to do?"
                className="h-9 flex-1"
                disabled={loading}
                aria-label="Message"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setOpen((v) => !v)}
        className="size-12 rounded-full shadow-lg"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>
    </div>
  );
}
