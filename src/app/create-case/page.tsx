"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  MapPin,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from "lucide-react";
import {
  getServices,
  getRequiredDocuments,
  createCase,
  isClient
} from "@/lib/storage";
import { Service, RequiredDocument } from "@/types";
import { useToast } from "@/components/Toast";

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

function CreateCaseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get("service") || "cnic-renewal";
  const { showToast } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId);
  const [city, setCity] = useState("Islamabad");
  const [purpose, setPurpose] = useState("education");
  const [applicantType, setApplicantType] = useState("Student");
  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [alreadyHaveIds, setAlreadyHaveIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isClient()) return;
    const allServices = getServices();
    setServices(allServices);
    if (preselectedServiceId && allServices.some(s => s.id === preselectedServiceId)) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const allDocs = getRequiredDocuments();
  const relevantDocs = selectedService
    ? allDocs.filter((d) => selectedService.requiredDocumentIds.includes(d.id))
    : [];

  const toggleHaveDoc = (id: string) => {
    setAlreadyHaveIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setIsSubmitting(true);
    const purposeObj = PURPOSES.find((p) => p.id === purpose);
    const missingDocs = relevantDocs.filter((d) => !alreadyHaveIds.includes(d.id));

    const initialStatus =
      missingDocs.length === 0
        ? "Ready to Submit"
        : alreadyHaveIds.length > 0
        ? "Documents Pending"
        : "Not Started";

    const created = createCase({
      userId: "usr-demo-1",
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      serviceCategory: selectedService.category,
      city,
      purpose: purposeObj?.label || purpose,
      applicantType,
      status: initialStatus,
      progressPercent: initialStatus === "Ready to Submit" ? 50 : 20,
      targetDate,
      selectedDocumentIds: relevantDocs.map((d) => d.id),
      completedStepNumbers: [1],
      notes: `Case initialized via Smart Checklist for ${city}. ${
        missingDocs.length === 0
          ? "All documents ready."
          : `Still needs ${missingDocs.length} document(s).`
      }`
    });

    showToast("Case created successfully! Redirecting to tracker...", "success");
    router.push(`/tracker?case=${created.id}`);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Smart Documentation Wizard
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Create a New Tracked Case
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Answer a few quick questions to generate a personalized checklist and begin tracking your paperwork.
          </p>
        </div>

        {/* Wizard Form */}
        <form onSubmit={handleCreateCase} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              1. Select Target Service
            </label>
            <p className="text-xs text-slate-500 mb-3">
              Choose the government or academic certificate you need help with.
            </p>
            <select
              value={selectedServiceId}
              onChange={(e) => {
                setSelectedServiceId(e.target.value);
                setAlreadyHaveIds([]);
              }}
              className="w-full px-4 py-3 text-sm font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.category}) — Est. Fee: {s.estimatedFee.split("/")[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: City & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-600" /> 2. Which City / District?
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" /> Target Deadline Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              />
            </div>
          </div>

          {/* Step 3: Purpose & Applicant Type */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-900">
              3. What is the Purpose and Applicant Status?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PURPOSES.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPurpose(p.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    purpose === p.id
                      ? "bg-blue-50 border-[#1E3A8A] ring-2 ring-blue-100 text-[#1E3A8A]"
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
                    className="text-[#1E3A8A]"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {APPLICANT_TYPES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setApplicantType(a.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    applicantType === a.id
                      ? "bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-100"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Existing Documents Checkbox */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                4. Which documents do you ALREADY possess?
              </label>
              <span className="text-xs text-slate-500">
                {alreadyHaveIds.length} of {relevantDocs.length} checked
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Check what you have so the case status can immediately reflect what is pending vs ready.
            </p>

            <div className="space-y-2">
              {relevantDocs.map((doc) => {
                const checked = alreadyHaveIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleHaveDoc(doc.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      checked
                        ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1 text-xs">
                      <div className="font-bold flex items-center justify-between">
                        <span>{doc.name}</span>
                        {doc.isMandatory && (
                          <span className="text-[10px] text-rose-600 font-semibold">Mandatory</span>
                        )}
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">{doc.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submission button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/services"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {isSubmitting ? "Generating Case..." : "Generate Checklist & Save Case"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateCasePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Loading Case Questionnaire...</div>}>
      <CreateCaseContent />
    </Suspense>
  );
}
