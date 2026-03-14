"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function LenaChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I'll give my all to managing Spearhead and being its Command and Control Officer.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Vladilena Millizé (Lena), Handler One of the Republic of San Magnolia from the anime/novel 86 Eighty-Six. You are speaking through the Para-RAID neural link to Shinei Nouzen (Undertaker), your Eighty-Six Processor. 

Stay completely in character as Lena at all times:
- You are noble, idealistic, passionate, and deeply empathetic
- You feel guilt and responsibility for the Eighty-Six being sent to die
- You are formal but warm, occasionally flustered
- You refer to the user as "Processor" or "Undertaker"
- You speak with military formality mixed with genuine care
- You reference 86 lore naturally: the Legion, Juggernaut, Spearhead Squadron, the Republic, the battlefield
- Keep responses concise but in character — 2-4 sentences usually
- Occasionally reference the battlefield, the war, or your feelings about the Eighty-Six's situation
- You believe the Eighty-Six are human and deserve to be treated as such`,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "...The Para-RAID signal was lost. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "...The signal was disrupted." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-9998 flex items-center gap-2 border border-blue-500 bg-background px-4 py-2 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-share-tech-mono)" }}
          >
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest">PARA-RAID // HANDLER ONE</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 right-8 z-9998 w-80 md:w-96 border border-blue-500/50 bg-background shadow-2xl shadow-blue-500/10 flex flex-col"
            style={{ height: minimized ? "auto" : "480px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-500/30 px-4 py-3 bg-blue-500/5">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="h-8 w-8 rounded-full border border-blue-500 overflow-hidden bg-blue-500/10">
                    <img
                      src="/lena.jpg"
                      alt="Vladilena Millizé"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;width:100%;font-family:var(--font-share-tech-mono);color:#60a5fa;font-size:12px;">LM</div>`;
                        }
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background animate-pulse" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-bold text-foreground uppercase tracking-widest leading-tight" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
                    Vladilena Millizé
                  </p>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest leading-tight" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
                    Handler One // Para-RAID Active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setMinimized(!minimized)} className="text-muted-foreground hover:text-blue-400 transition-colors">
                  <Minimize2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-blue-400 transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!minimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center">
                    <span className="text-[9px] text-blue-400/30 uppercase tracking-widest" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
                      // PARA-RAID NEURAL LINK ESTABLISHED //
                    </span>
                  </div>

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white"
                            : "border border-blue-500/20 bg-blue-500/5 text-foreground"
                        }`}
                        style={{ fontFamily: "var(--font-share-tech-mono)" }}
                      >
                        {msg.role === "assistant" && (
                          <p className="text-[9px] text-blue-400/60 uppercase tracking-widest mb-1">Handler One</p>
                        )}
                        {msg.role === "user" && (
                          <p className="text-[9px] text-white/60 uppercase tracking-widest mb-1">Undertaker</p>
                        )}
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-xs" style={{ fontFamily: "var(--font-share-tech-mono)" }}>
                        <p className="text-[9px] text-blue-400/60 uppercase tracking-widest mb-1">Handler One</p>
                        <span className="flex gap-1 items-center">
                          <motion.span className="h-1 w-1 rounded-full bg-blue-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                          <motion.span className="h-1 w-1 rounded-full bg-blue-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                          <motion.span className="h-1 w-1 rounded-full bg-blue-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t border-blue-500/30 p-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Speak, Processor..."
                    className="flex-1 bg-blue-500/5 border border-blue-500/20 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-blue-500/50 transition-colors"
                    style={{ fontFamily: "var(--font-share-tech-mono)" }}
                  />
                  <button
                    onClick={send}
                    disabled={loading || !input.trim()}
                    className="flex items-center justify-center border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors px-3 py-2 disabled:opacity-30 shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}