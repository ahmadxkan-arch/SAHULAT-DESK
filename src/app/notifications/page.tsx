"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  FolderCheck,
  Building2,
  Filter
} from "lucide-react";
import {
  getReminders,
  toggleReminderComplete,
  deleteReminder,
  isClient
} from "@/lib/storage";
import { Reminder } from "@/types";
import ReminderModal from "@/components/ReminderModal";
import { useToast } from "@/components/Toast";

export default function NotificationsPage() {
  const { showToast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = () => {
    if (!isClient()) return;
    setReminders(getReminders());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("sahulat_reminders_updated", loadData);
    return () => window.removeEventListener("sahulat_reminders_updated", loadData);
  }, []);

  const handleToggle = (id: string) => {
    toggleReminderComplete(id);
    loadData();
    showToast("Reminder updated!", "info");
  };

  const handleDelete = (id: string) => {
    deleteReminder(id);
    loadData();
    showToast("Reminder removed.", "info");
  };

  const filtered = reminders.filter((r) => {
    if (filter === "pending") return !r.isCompleted;
    if (filter === "completed") return r.isCompleted;
    return true;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 text-amber-500" /> Case Alerts & Timers
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Reminders & Follow-ups
            </h1>
            <p className="text-sm text-slate-500">
              Timely alerts for challan deposits, counter visits, and document collection.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Reminder
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {(["all", "pending", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                filter === tab
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab} Reminders ({reminders.filter((r) => tab === "all" ? true : tab === "pending" ? !r.isCompleted : r.isCompleted).length})
            </button>
          ))}
        </div>

        {/* Reminders List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">All Caught Up!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No reminders in this tab. Set reminders for upcoming government bank payments or collection dates.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
              >
                Schedule New Reminder
              </button>
            </div>
          ) : (
            filtered.map((rem) => (
              <div
                key={rem.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  rem.isCompleted
                    ? "bg-slate-50/70 border-slate-200 opacity-60"
                    : "bg-white border-slate-200 shadow-sm hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={rem.isCompleted}
                    onChange={() => handleToggle(rem.id)}
                    className="mt-1 rounded text-[#1E3A8A] focus:ring-[#1E3A8A] w-4 h-4 cursor-pointer"
                  />

                  <div className="space-y-1">
                    <h3
                      className={`text-sm font-bold ${
                        rem.isCompleted ? "line-through text-slate-400" : "text-slate-900"
                      }`}
                    >
                      {rem.title}
                    </h3>

                    {rem.caseTitle && (
                      <div className="text-xs text-[#0D9488] font-semibold flex items-center gap-1">
                        <span>Case: {rem.caseTitle}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {rem.dueDate} ({rem.dueTime || "10:00 AM"})
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          rem.priority === "High"
                            ? "bg-rose-100 text-rose-800"
                            : rem.priority === "Medium"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {rem.priority} Priority
                      </span>
                      <span className="capitalize text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {rem.type}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(rem.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          loadData();
          showToast("Reminder scheduled!", "success");
        }}
      />
    </div>
  );
}

