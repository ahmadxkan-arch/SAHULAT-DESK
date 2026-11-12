"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Building2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Save,
  Check
} from "lucide-react";
import {
  getCases,
  updateCase,
  deleteCase,
  getServices,
  getRequiredDocuments,
  isClient
} from "@/lib/storage";
import { UserCase, CaseStatus, Service, RequiredDocument } from "@/types";
import CaseProgressBar from "@/components/CaseProgressBar";
import { useToast } from "@/components/Toast";

const STATUSES: (CaseStatus | "All")[] = [
  "All",
  "Not Started",
  "Documents Pending",
  "Ready to Submit",
  "Submitted",
  "Under Review",
  "Completed"
];

function CaseTrackerContent() {
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const initialCaseId = searchParams.get("case");

  const [cases, setCases] = useState<UserCase[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(initialCaseId);
  const [selectedStatusTab, setSelectedStatusTab] = useState<CaseStatus | "All">("All");
  const [services, setServices] = useState<Service[]>([]);
  const [allDocs, setAllDocs] = useState<RequiredDocument[]>([]);
  const [editedNotes, setEditedNotes] = useState("");

  const loadData = () => {
    if (!isClient()) return;
    const loadedCases = getCases();
    setCases(loadedCases);
    setServices(getServices());
    setAllDocs(getRequiredDocuments());

    if (!selectedCaseId && loadedCases.length > 0) {
      setSelectedCaseId(loadedCases[0].id);
      setEditedNotes(loadedCases[0].notes || "");
    } else if (selectedCaseId) {
      const active = loadedCases.find((c) => c.id === selectedCaseId);
      if (active) setEditedNotes(active.notes || "");
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("sahulat_cases_updated", loadData);
    return () => window.removeEventListener("sahulat_cases_updated", loadData);
  }, [selectedCaseId]);

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];
  const activeService = activeCase ? services.find((s) => s.id === activeCase.serviceId) : null;
  const activeCaseDocs = activeCase
    ? allDocs.filter((d) => activeCase.selectedDocumentIds?.includes(d.id))
    : [];

  const filteredCases = cases.filter((c) => {
    if (selectedStatusTab === "All") return true;
    return c.status === selectedStatusTab;
  });

  const handleStatusChange = (newStatus: CaseStatus) => {
    if (!activeCase) return;
    updateCase(activeCase.id, { status: newStatus });
    showToast(`Case status updated to "${newStatus}"`, "success");
    loadData();
  };

  const handleSaveNotes = () => {
    if (!activeCase) return;
    updateCase(activeCase.id, { notes: editedNotes });
    showToast("Case notes updated successfully!", "success");
    loadData();
  };

  const handleDeleteCase = (id: string) => {
    if (confirm("Are you sure you want to remove this case from tracking?")) {
      deleteCase(id);
      showToast("Case deleted.", "info");
      setSelectedCaseId(null);
      loadData();
    }
  };

  const toggleStepCompleted = (stepNumber: number) => {
    if (!activeCase) return;
    const currentCompleted = activeCase.completedStepNumbers || [];
    const updated = currentCompleted.includes(stepNumber)
      ? currentCompleted.filter((n) => n !== stepNumber)
      : [...currentCompleted, stepNumber];

    updateCase(activeCase.id, { completedStepNumbers: updated });
    loadData();
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
              <CheckSquare className="w-4 h-4 text-teal-600" /> 6-Stage Progression System
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Case Tracker & Progression
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Not Started → Documents Pending → Ready to Submit → Submitted → Under Review → Completed
            </p>
          </div>

          <Link
            href="/create-case"
            className="px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Start Another Case
          </Link>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusTab(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatusTab === st
                  ? "bg-[#1E3A8A] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {st}
              {st !== "All" && (
                <span className="ml-1.5 text-[10px] opacity-75">
                  ({cases.filter((c) => c.status === st).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {cases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <CheckSquare className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">No Cases Being Tracked</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t started any cases yet. Select a service to generate a checklist and track its official lifecycle.
            </p>
            <Link
              href="/create-case"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0D9488] text-white rounded-lg text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Create First Case
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Case List (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Tracked Dossiers ({filteredCases.length})
              </span>

              {filteredCases.map((c) => {
                const isSelected = activeCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setEditedNotes(c.notes || "");
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white border-[#1E3A8A] ring-2 ring-blue-100 shadow-md"
                        : "bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {c.city}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                      {c.serviceTitle}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span className="font-mono">#{c.trackingNumber || c.id}</span>
                      <span className="font-bold text-[#1E3A8A]">{c.progressPercent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Case View (8 cols) */}
            {activeCase && (
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
                {/* Case Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {activeCase.serviceCategory}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Ref: #{activeCase.trackingNumber || activeCase.id}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {activeCase.serviceTitle}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      City: <strong className="text-slate-700">{activeCase.city}</strong> • Purpose: <strong className="text-slate-700">{activeCase.purpose}</strong> • Target: <strong className="text-slate-700">{activeCase.targetDate || "Flexible"}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteCase(activeCase.id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                      title="Delete this case"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {activeService && (
                      <Link
                        href={`/services/${activeService.id}`}
                        className="px-3 py-1.5 text-xs font-bold text-[#1E3A8A] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Service Page <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* 6-Stage Progress Indicator */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Interactive Status Tracker (Click to update stage):
                    </span>
                    <span className="text-xs font-bold text-[#1E3A8A]">
                      Current: {activeCase.status}
                    </span>
                  </div>

                  <CaseProgressBar
                    status={activeCase.status}
                    progressPercent={activeCase.progressPercent}
                    interactive={true}
                    onStatusChange={handleStatusChange}
                  />

                  {/* Quick Status Buttons */}
                  <div className="pt-2 flex flex-wrap gap-1.5 justify-center">
                    {(
                      [
                        "Not Started",
                        "Documents Pending",
                        "Ready to Submit",
                        "Submitted",
                        "Under Review",
                        "Completed"
                      ] as CaseStatus[]
                    ).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold transition-all ${
                          activeCase.status === st
                            ? "bg-[#1E3A8A] text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Set: {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Execution List with Check-off */}
                {activeService && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900">
                        Process Steps & Completion Status
                      </h3>
                      <span className="text-xs text-slate-500">
                        {(activeCase.completedStepNumbers || []).length} of {activeService.steps.length} done
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activeService.steps.map((st) => {
                        const isDone = (activeCase.completedStepNumbers || []).includes(st.stepNumber);
                        return (
                          <div
                            key={st.stepNumber}
                            onClick={() => toggleStepCompleted(st.stepNumber)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isDone
                                ? "bg-emerald-50/60 border-emerald-200 text-slate-700"
                                : "bg-slate-50/80 border-slate-200 text-slate-800 hover:bg-slate-50"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                                isDone
                                  ? "bg-emerald-600 text-white"
                                  : "border border-slate-300 bg-white text-slate-400"
                              }`}
                            >
                              {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.stepNumber}
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="font-bold text-slate-900 flex items-center justify-between">
                                <span>{st.title}</span>
                                {st.duration && <span className="text-slate-400">{st.duration}</span>}
                              </div>
                              <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                                {st.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Required Documents Checklist for This Case */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-900">
                    Documents for this Case ({activeCaseDocs.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeCaseDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-800 truncate">{doc.name}</span>
                        </div>
                        {doc.isMandatory && (
                          <span className="text-[10px] text-rose-600 font-bold shrink-0">
                            Required
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Notes & Diary */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700">
                    Case Notes & Tracking Log
                  </label>
                  <textarea
                    rows={3}
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    placeholder="e.g. Visited AC office on Tuesday. Official asked to bring 2 witness CNIC copies tomorrow at 10 AM..."
                    className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      className="px-4 py-2 bg-[#0D9488] hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Case Notes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CaseTrackerPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Loading Case Tracker...</div>}>
      <CaseTrackerContent />
    </Suspense>
  );
}
