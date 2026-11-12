"use client";

import React, { useState } from "react";
import { Reminder, UserCase } from "@/types";
import { addReminder, getCases } from "@/lib/storage";
import {
  X,
  Bell,
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newReminder: Reminder) => void;
  preselectedCaseId?: string;
}

export default function ReminderModal({ isOpen, onClose, onSuccess, preselectedCaseId }: Props) {
  const cases = getCases();
  const [title, setTitle] = useState("");
  const [caseId, setCaseId] = useState(preselectedCaseId || "");
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [dueTime, setDueTime] = useState("10:00 AM");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [type, setType] = useState<"document" | "challan" | "visit" | "followup">("visit");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a title for the reminder.");
      return;
    }

    const linkedCase = cases.find(c => c.id === caseId);

    const created = addReminder({
      userId: "usr-demo-1",
      caseId: caseId || undefined,
      caseTitle: linkedCase ? linkedCase.serviceTitle : undefined,
      title: title.trim(),
      dueDate,
      dueTime,
      priority,
      isCompleted: false,
      type
    });

    onSuccess(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Schedule Document Reminder</h3>
              <p className="text-xs text-blue-200">Never miss a deadline or token queue</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Reminder Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="e.g. Visit NADRA Mega at 8:00 AM, Pay Bank Challan"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Related Case (Optional)
            </label>
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
            >
              <option value="">No linked case</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.serviceTitle.slice(0, 30)}...
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Time (e.g. 09:30 AM)
              </label>
              <input
                type="text"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Activity Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "document" | "challan" | "visit" | "followup")}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white capitalize"
              >
                <option value="visit">Physical Office Visit</option>
                <option value="document">Document Preparation</option>
                <option value="challan">Fee / Challan Payment</option>
                <option value="followup">Online Portal Follow-up</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-blue-900 rounded-lg shadow-sm transition-colors"
            >
              Add Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

