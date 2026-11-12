"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  FolderOpen,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  Compass,
  AlertCircle,
  FileCheck,
  ChevronRight,
  UploadCloud
} from "lucide-react";
import {
  getUserProfile,
  getCases,
  getUserDocuments,
  getReminders,
  toggleReminderComplete,
  isClient
} from "@/lib/storage";
import { UserProfile, UserCase, UserDocument, Reminder } from "@/types";
import CaseProgressBar from "@/components/CaseProgressBar";
import ReminderModal from "@/components/ReminderModal";
import DocumentUploadModal from "@/components/DocumentUploadModal";
import { useToast } from "@/components/Toast";

export default function DashboardPage() {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [cases, setCases] = useState<UserCase[]>([]);
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);

  const loadData = () => {
    if (!isClient()) return;
    setProfile(getUserProfile());
    setCases(getCases());
    setDocuments(getUserDocuments());
    setReminders(getReminders());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("sahulat_cases_updated", loadData);
    window.addEventListener("sahulat_docs_updated", loadData);
    window.addEventListener("sahulat_reminders_updated", loadData);

    return () => {
      window.removeEventListener("sahulat_cases_updated", loadData);
      window.removeEventListener("sahulat_docs_updated", loadData);
      window.removeEventListener("sahulat_reminders_updated", loadData);
    };
  }, []);

  const activeCases = cases.filter((c) => c.status !== "Completed");
  const completedCases = cases.filter((c) => c.status === "Completed");
  const pendingReminders = reminders.filter((r) => !r.isCompleted);

  const handleToggleReminder = (id: string) => {
    toggleReminderComplete(id);
    loadData();
    showToast("Reminder updated!", "info");
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#0D9488] rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Citizen Case Management Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Khush Amdeed, {profile.name}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              Track your government documentation, manage your verified documents vault, and stay ahead of deadlines.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/create-case"
              className="px-4 py-2.5 rounded-xl bg-white text-[#1E3A8A] hover:bg-blue-50 font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Start New Case
            </Link>
            <button
              onClick={() => setIsDocModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-4 h-4" /> Upload Document
            </button>
            <Link
              href="/ai-helper"
              className="px-4 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white border border-blue-400/40 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Ask AI
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Cases
              </p>
              <h3 className="text-2xl font-extrabold text-[#1E3A8A] mt-1">
                {activeCases.length}
              </h3>
              <p className="text-[11px] text-teal-600 font-medium mt-0.5">
                In progress
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Completed
              </p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">
                {completedCases.length}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Successfully resolved
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Saved Docs
              </p>
              <h3 className="text-2xl font-extrabold text-[#0D9488] mt-1">
                {documents.length}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                In personal vault
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold">
              <FolderOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Reminders
              </p>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
                {pendingReminders.length}
              </h3>
              <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                Due upcoming
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Bell className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Main Grid: Cases & Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Active Cases (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Your Active Documentation Cases
                </h2>
                <p className="text-xs text-slate-500">
                  Track ongoing steps and update documents for official submission.
                </p>
              </div>
              <Link
                href="/tracker"
                className="text-xs font-bold text-[#1E3A8A] hover:text-blue-800 flex items-center gap-1"
              >
                Open Full Tracker <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {cases.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
                <FileCheck className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700 text-sm">No Active Cases Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Get started by generating your first personalized checklist for CNIC, Domicile, or Driving License.
                </p>
                <Link
                  href="/create-case"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" /> Create First Case
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cases.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-300 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {c.serviceCategory}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            #{c.trackingNumber || c.id}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base">
                          {c.serviceTitle}
                        </h3>
                        <p className="text-xs text-slate-500">
                          City: <span className="font-medium text-slate-700">{c.city}</span> • Purpose: <span className="font-medium text-slate-700">{c.purpose}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            c.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : c.status === "Under Review"
                              ? "bg-purple-100 text-purple-800"
                              : c.status === "Submitted"
                              ? "bg-blue-100 text-blue-800"
                              : c.status === "Ready to Submit"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {c.status}
                        </span>
                        <Link
                          href={`/tracker?case=${c.id}`}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                        >
                          Details
                        </Link>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <CaseProgressBar
                        status={c.status}
                        progressPercent={c.progressPercent}
                      />
                    </div>

                    {/* Case Notes Snippet */}
                    {c.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-700">Latest Note: </span>
                        {c.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Reminders & Quick Links */}
          <div className="space-y-6">
            {/* Reminders Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-sm text-slate-900">
                    Follow-up Reminders
                  </h3>
                </div>
                <button
                  onClick={() => setIsReminderModalOpen(true)}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-0.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {reminders.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">
                  No scheduled reminders.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {reminders.slice(0, 4).map((rem) => (
                    <div
                      key={rem.id}
                      className={`p-3 rounded-lg border transition-all text-xs flex items-start gap-3 ${
                        rem.isCompleted
                          ? "bg-slate-50 border-slate-200 text-slate-400 line-through"
                          : "bg-amber-50/40 border-amber-200/80 text-slate-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={rem.isCompleted}
                        onChange={() => handleToggleReminder(rem.id)}
                        className="mt-0.5 rounded text-[#1E3A8A] focus:ring-[#1E3A8A]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{rem.title}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> {rem.dueDate} ({rem.dueTime})
                          </span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                              rem.priority === "High"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {rem.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/notifications"
                className="block text-center text-xs font-bold text-[#1E3A8A] hover:underline pt-2 border-t border-slate-100"
              >
                View All Reminders & Alerts
              </Link>
            </div>

            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl border border-blue-200/60 p-5 space-y-3">
              <h3 className="font-bold text-sm text-[#1E3A8A] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Quick Citizen Actions
              </h3>
              <div className="space-y-2 text-xs">
                <Link
                  href="/create-case"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200/80 text-slate-800 font-semibold transition-colors"
                >
                  <span>Smart Checklist Questionnaire</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/documents"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200/80 text-slate-800 font-semibold transition-colors"
                >
                  <span>Manage Vault Documents</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/offices"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200/80 text-slate-800 font-semibold transition-colors"
                >
                  <span>Find Nearest Government Markaz</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
                <Link
                  href="/community"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200/80 text-slate-800 font-semibold transition-colors"
                >
                  <span>Read Community Queue Tips</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        onSuccess={() => {
          loadData();
          showToast("Reminder added successfully!", "success");
        }}
      />

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        onSuccess={() => {
          loadData();
          showToast("Document saved to your vault!", "success");
        }}
      />
    </div>
  );
}

