"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Send,
  User,
  Bot,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Copy,
  Plus,
  RefreshCw,
  Clock,
  ArrowRight
} from "lucide-react";
import { askSahulatAI, AIMessage } from "@/lib/gemini";
import { useToast } from "@/components/Toast";

const QUICK_PROMPTS = [
  "Domicile ke liye kya documents chahiye?",
  "CNIC renewal ka process aur fees kya hai?",
  "University character certificate kaise banwate hain?",
  "Driving license learner permit ke baad test kaise hota hai?",
  "HEC degree attestation TCS se kaise hoti hai?",
  "FBR NTN filer banne ka tarika kya hai?"
];

function AIHelperContent() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: "assistant",
      content: `**Assalam-o-Alaikum! Main hoon Sahulat AI (سہولت دوست) 🇵🇰**

Main aap ko Pakistan ke kisi bhi sarkari ya university paperwork ke baray mein mukammal checklist aur process guide faraham kar sakta hoon.

Aap mujh se Urdu, Roman Urdu, ya English mein sawal poch sakte hain:
- *"Domicile ke liye kon kon se documents attest karwane hotay hain?"*
- *"NADRA smart card renewal ka normal aur urgent fee kya hai?"*
- *"HEC degree attestation ke liye kiya original sanad zaroori hai?"*

Neeche diye gaye kisi bhi sawal par click karein ya apna sawal type karein!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle URL query prompt if coming from landing page
  useEffect(() => {
    if (initialQuery && messages.length === 1) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: AIMessage = {
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await askSahulatAI(text, messages);
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Maazrat, rabta qayem nahi ho saka. Barah-e-karam dobara koshish karein.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Response copied to clipboard!", "success");
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" /> Bilingual Urdu & English Assistant
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sahulat AI Helper (سہولت دوست)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Get structured document checklists, next steps, and realistic processing guidance.
            </p>
          </div>

          <button
            onClick={() => {
              setMessages([messages[0]]);
              showToast("Chat conversation cleared.", "info");
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Chat
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Suggested Citizen Questions:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200 text-xs font-medium text-slate-700 whitespace-nowrap shadow-2xs hover:border-blue-300 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Stream Window */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[580px] overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                      isUser
                        ? "bg-[#1E3A8A] text-white"
                        : "bg-teal-600 text-white"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                      isUser
                        ? "bg-[#1E3A8A] text-white rounded-tr-sm"
                        : "bg-slate-50 text-slate-800 border border-slate-200/90 rounded-tl-sm shadow-2xs"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>

                    {/* Interactive Checklist Pills if Generated */}
                    {msg.checklist && msg.checklist.length > 0 && (
                      <div className="pt-2 border-t border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                          Quick Checklist Summary:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {msg.checklist.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-700 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Metadata & Copy */}
                    <div className="flex items-center justify-between pt-1 text-[10px] opacity-75">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.content)}
                          className="hover:opacity-100 flex items-center gap-1 text-slate-500"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm p-4 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse delay-150"></span>
                  <span>Generating structured paperwork checklist...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything in Urdu or English (e.g. Domicile ke liye kya documents chahiye?)..."
                className="flex-1 px-4 py-3 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-3 rounded-xl bg-[#0D9488] hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              ⚠️ Yeh information general guidance ke liye hai. Final requirement official authority se confirm karein.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIHelperPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Loading AI Assistant...</div>}>
      <AIHelperContent />
    </Suspense>
  );
}
