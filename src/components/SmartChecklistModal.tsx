"use client";

import React, { useState } from "react";
import { Service, RequiredDocument, UserCase } from "@/types";
import { getRequiredDocuments, createCase } from "@/lib/storage";
import {
  X,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  AlertCircle,
  Download,
  Share2,
  Sparkles,
  MapPin,
  Briefcase,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const CITIES = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Faisalabad",
  "Multan",
  "Other City"
];

const PURPOSES = [
  { id: "education", label: "University / Higher Education", urdu: "تعلیمی داخلہ یا ڈگری" },
  { id: "job", label: "Job / Employment Verification", urdu: "ملازمت یا نوکری" },
  { id: "travel", label: "Foreign Travel / Visa / Immigration", urdu: "بیرون ملک سفر یا ویزہ" },
  { id: "family", label: "Family / Marriage / Civil Record", urdu: "خاندانی یا قانونی ضروریات" },
  { id: "other", label: "Other Official Purpose", urdu: "دیگر دفتری ضرورت" },
];

const APPLICANT_TYPES = [
  { id: "Student", label: "Student", desc: "College or University Enrolled" },
  { id: "Employed", label: "Salaried Employee", desc: "Private or Government Staff" },
  { id: "Self-Employed", label: "Self-Employed / Business", desc: "Freelancer, Trader, Professional" },
  { id: "Unemployed", label: "Fresh Graduate / Job Seeker", desc: "Applying for initial certificates" },
];

export default function SmartChecklistModal({ service, isOpen, onClose }: Props) {
  const router = useRouter();
  const allDocs = getRequiredDocuments();
  const relevantDocs = allDocs.filter(d => service.requiredDocumentIds.includes(d.id));

  // Wizard state: 1: City & Purpose, 2: Applicant Status & Available Docs, 3: Generated Checklist Result
  const [step, setStep] = useState<number>(1);
  const [city, setCity] = useState<string>("Islamabad");
  const [purpose, setPurpose] = useState<string>("education");
  const [applicantType, setApplicantType] = useState<string>("Student");
  const [alreadyHaveIds, setAlreadyHaveIds] = useState<string[]>([]);
  const [savedCaseId, setSavedCaseId] = useState<string | null>(null);
  const [isCreatingCase, setIsCreatingCase] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleHaveDoc = (docId: string) => {
    setAlreadyHaveIds(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const handleCreateCase = () => {
    setIsCreatingCase(true);
    const purposeObj = PURPOSES.find(p => p.id === purpose);
    const missingDocs = relevantDocs.filter(d => !alreadyHaveIds.includes(d.id));

    const newCase = createCase({
      userId: "usr-demo-1",
      serviceId: service.id,
      serviceTitle: service.title,
      serviceCategory: service.category,
      city,
      purpose: purposeObj?.label || purpose,
      applicantType,
      status: missingDocs.length === 0 ? "Ready to Submit" : "Documents Pending",
      progressPercent: missingDocs.length === 0 ? 50 : 25,
      selectedDocumentIds: relevantDocs.map(d => d.id),
      completedStepNumbers: [1],
      notes: `Generated via Smart Checklist for ${city}. Missing ${missingDocs.length} documents.`
    });

    setSavedCaseId(newCase.id);
    setIsCreatingCase(false);
  };

  const missingDocs = relevantDocs.filter(d => !alreadyHaveIds.includes(d.id));
  const availableDocs = relevantDocs.filter(d => alreadyHaveIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                Smart Checklist Generator
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-normal">
                  Step {step} of 3
                </span>
              </h3>
              <p className="text-xs text-blue-100">
                Tailored for {service.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" /> Which city are you currently in?
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Checklist requirements and office centers vary according to your district.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-all ${
                        city === c
                          ? "bg-blue-50 border-[#1E3A8A] text-[#1E3A8A] ring-2 ring-blue-100"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-teal-600" /> What is the primary purpose?
                </label>
                <div className="space-y-2">
                  {PURPOSES.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setPurpose(p.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        purpose === p.id
                          ? "bg-teal-50 border-teal-600 ring-2 ring-teal-100 text-teal-900"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{p.label}</div>
                        <div className="text-[11px] text-slate-500 font-urdu">{p.urdu}</div>
                      </div>
                      <input
                        type="radio"
                        name="purpose"
                        checked={purpose === p.id}
                        onChange={() => setPurpose(p.id)}
                        className="text-teal-600 focus:ring-teal-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  What is your applicant status?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {APPLICANT_TYPES.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => setApplicantType(a.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        applicantType === a.id
                          ? "bg-blue-50 border-[#1E3A8A] ring-2 ring-blue-100 text-[#1E3A8A]"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-bold">{a.label}</div>
                      <div className="text-[11px] text-slate-500">{a.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1 flex items-center justify-between">
                  <span>Which documents do you already have?</span>
                  <span className="text-xs text-slate-500 font-normal">
                    {alreadyHaveIds.length} of {relevantDocs.length} selected
                  </span>
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Check off any documents you already possess so we can filter what you still need to obtain:
                </p>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {relevantDocs.map((doc) => {
                    const checked = alreadyHaveIds.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleHaveDoc(doc.id)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                          checked
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-bold flex items-center justify-between">
                            <span>{doc.name}</span>
                            {doc.isMandatory && (
                              <span className="text-[10px] text-rose-600 font-medium">Mandatory</span>
                            )}
                          </div>
                          {doc.nameUrdu && (
                            <div className="text-[10px] text-slate-500 font-urdu">{doc.nameUrdu}</div>
                          )}
                          <div className="text-[11px] text-slate-500 mt-0.5">{doc.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in slide-in-from-right-4 duration-200">
              {/* Summary Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Applicant: </span>
                  <span className="font-bold text-slate-800">{applicantType}</span>
                </div>
                <div>
                  <span className="text-slate-500">Target City: </span>
                  <span className="font-bold text-slate-800">{city}</span>
                </div>
                <div>
                  <span className="text-slate-500">Purpose: </span>
                  <span className="font-bold text-slate-800 capitalize">{purpose}</span>
                </div>
              </div>

              {/* Missing Documents Alert */}
              {missingDocs.length > 0 ? (
                <div className="border border-amber-200 bg-amber-50/70 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    You still need to collect {missingDocs.length} document(s):
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {missingDocs.map((doc) => (
                      <li key={doc.id} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <div>
                          <span className="font-semibold">{doc.name}</span>
                          <span className="text-[11px] text-amber-800 ml-1">
                            ({doc.issuingAuthority})
                          </span>
                          {doc.notes && (
                            <p className="text-[11px] text-amber-700">{doc.notes}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">
                      Great News! You have all required documents ready.
                    </h4>
                    <p className="text-xs text-emerald-700">
                      Your file is ready to submit to the concerned department office.
                    </p>
                  </div>
                </div>
              )}

              {/* Already Available Documents */}
              {availableDocs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Available in your personal file ({availableDocs.length}):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {availableDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-2 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="truncate">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Creation CTA */}
              <div className="pt-3 border-t border-slate-200">
                {savedCaseId ? (
                  <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-center space-y-2">
                    <div className="font-bold text-sm">🎉 Case Created Successfully!</div>
                    <p className="text-xs text-teal-700">
                      Your personalized case #{savedCaseId} is now active in your Case Tracker.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <Link
                        href="/tracker"
                        className="px-4 py-1.5 bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Go to Case Tracker
                      </Link>
                      <button
                        onClick={onClose}
                        className="px-4 py-1.5 bg-white border border-teal-300 text-teal-800 text-xs font-semibold rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/70 p-4 rounded-xl border border-blue-100">
                    <div>
                      <div className="text-xs font-bold text-[#1E3A8A]">
                        Save as an active case in your tracker?
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Track progress step-by-step, set reminders, and upload your documents.
                      </div>
                    </div>
                    <button
                      onClick={handleCreateCase}
                      disabled={isCreatingCase}
                      className="px-4 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow-sm whitespace-nowrap transition-colors"
                    >
                      {isCreatingCase ? "Creating Case..." : "Save to Case Tracker"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-lg bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

